"use server";

import { db } from "@/lib/db";
import { newsletterSubscribers } from "@/lib/db/schema";
import { z } from "zod";

const emailSchema = z.string().email();

export async function subscribeToNewsletter(
  _prevState: unknown,
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  const email = formData.get("email");
  const parsed = emailSchema.safeParse(email);

  if (!parsed.success) {
    return { success: false, message: "Please enter a valid email address." };
  }

  if (!process.env.DATABASE_URL) {
    return { success: true, message: "You're subscribed! Welcome to the Kalchev family." };
  }

  try {
    await db
      .insert(newsletterSubscribers)
      .values({ email: parsed.data })
      .onConflictDoNothing();

    return { success: true, message: "You're subscribed! Welcome to the Kalchev family." };
  } catch {
    return { success: false, message: "Something went wrong. Please try again." };
  }
}
