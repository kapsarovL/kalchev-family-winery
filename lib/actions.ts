"use server";

import { contactFormSchema } from "@/lib/schema";
import { db } from "@/lib/db";
import { contactSubmissions } from "@/lib/db/schema";
import { checkRateLimit } from "@/lib/rate-limit";
import { headers } from "next/headers";
import { z } from "zod";

export async function contactFormAction(
  _prevState: unknown,
  formData: FormData
) {
  const defaultValues = z
    .record(z.string(), z.string())
    .parse(Object.fromEntries(formData.entries()));

  const ip = (await headers()).get("x-forwarded-for") ?? "anonymous";
  const { allowed, retryAfterSecs } = checkRateLimit(ip);
  if (!allowed) {
    return {
      defaultValues,
      success: false,
      errors: { _form: `Too many requests. Please try again in ${retryAfterSecs}s.` },
    };
  }

  try {
    const data = contactFormSchema.parse(Object.fromEntries(formData));

    if (process.env.DATABASE_URL) {
      const subject = formData.get("subject")?.toString() || null;
      await db.insert(contactSubmissions).values({
        name: data.name,
        email: data.email,
        subject,
        message: data.message,
      });
    }

    return {
      defaultValues: {
        name: "",
        email: "",
        message: "",
      },
      success: true,
      errors: null,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        defaultValues,
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
      defaultValues,
      success: false,
      errors: null,

      errorMessage:
        error instanceof z.ZodError
          ? error.errors
          : "An unexpected error occurred.",

      logError: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
      additionalInfo: "Please contact support if the issue persists.",
    };
  }
}
