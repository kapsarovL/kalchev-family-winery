"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const password = formData.get("password") as string;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || password !== adminPassword) {
    return "Invalid password";
  }

  const cookieStore = await cookies();
  cookieStore.set("admin_authenticated", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: 60 * 60 * 24,
  });

  redirect("/admin/dashboard");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_authenticated");
  redirect("/admin");
}
