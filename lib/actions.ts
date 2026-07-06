"use server";

import { contactFormSchema } from "@/lib/schema";
import { checkRateLimit } from "@/lib/rate-limit";
import { contactSubmissions } from "@/lib/db/schema";
import { headers } from "next/headers";
import { z } from "zod";

export async function contactFormAction(
  _prevState: unknown,
  formData: FormData
) {
  const rawHeaders = await headers();
  const rawIp = rawHeaders.get("x-forwarded-for");
  const ip = rawIp?.split(",")[0]?.trim() ?? "anonymous";
  const { allowed, retryAfterSecs } = checkRateLimit(ip);
  if (!allowed) {
    return {
      defaultValues: { name: "", email: "", message: "" },
      success: false,
      errors: { _form: `Too many requests. Please try again in ${retryAfterSecs}s.` },
    };
  }

  const raw = Object.fromEntries(formData);

  try {
    const data = contactFormSchema.parse(raw);

    if (process.env.DATABASE_URL) {
      const { db } = await import("@/lib/db");
      if (db) {
        try {
          await db.insert(contactSubmissions).values({
            name: data.name,
            email: data.email,
            subject: data.subject ?? null,
            message: data.message,
          });
        } catch {
          // Log silently — form success doesn't depend on DB
        }
      }
    }

    return {
      defaultValues: { name: "", email: "", message: "" },
      success: true,
      errors: null,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        defaultValues: { name: raw.name as string, email: raw.email as string, message: raw.message as string },
        success: false,
        errors: Object.fromEntries(
          Object.entries(error.flatten().fieldErrors).map(([key, value]) => [
            key,
            value?.join(", "),
          ])
        ),
      };
    }

    return {
      defaultValues: { name: "", email: "", message: "" },
      success: false,
      errors: { _form: "An unexpected error occurred. Please try again later." },
    };
  }
}
