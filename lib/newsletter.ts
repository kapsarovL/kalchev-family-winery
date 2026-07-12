"use server";

import { headers } from "next/headers";
import { newsletterSubscribers } from "@/lib/db/schema";
import { checkRateLimit } from "@/lib/rate-limit";
import { z } from "zod";
import { sendAdminNotification, newsletterNotificationHtml, formatDate } from "@/lib/email";

const emailSchema = z.string().email();

export async function subscribeToNewsletter(
  _prevState: unknown,
  formData: FormData,
): Promise<{ success: boolean; message: string }> {
  const headerStore = await headers();
  const rawIp = headerStore.get("x-forwarded-for");
  const ip = rawIp?.split(",")[0]?.trim() ?? headerStore.get("x-real-ip") ?? "unknown";
  const { allowed, retryAfterSecs } = await checkRateLimit(ip);
  if (!allowed) {
    return {
      success: false,
      message: `Too many requests. Try again in ${retryAfterSecs} seconds.`,
    };
  }

  const email = formData.get("email");
  const parsed = emailSchema.safeParse(email);

  if (!parsed.success) {
    return { success: false, message: "Please enter a valid email address." };
  }

  if (!process.env.DATABASE_URL) {
    return { success: true, message: "You're subscribed! Welcome to the Kalchev family." };
  }

  const { db } = await import("@/lib/db");
  if (!db) {
    return { success: true, message: "You're subscribed! Welcome to the Kalchev family." };
  }

  try {
    await db.insert(newsletterSubscribers).values({ email: parsed.data }).onConflictDoNothing();

    await sendAdminNotification(
      "New newsletter subscriber",
      newsletterNotificationHtml({
        email: parsed.data,
        date: formatDate(),
      }),
    );

    return { success: true, message: "You're subscribed! Welcome to the Kalchev family." };
  } catch {
    return { success: false, message: "Something went wrong. Please try again." };
  }
}
