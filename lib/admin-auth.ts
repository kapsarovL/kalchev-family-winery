"use server";

import { cookies, headers } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { NextRequest } from "next/server";
import { getJwtSecret } from "@/lib/jwt";
import { checkRateLimit } from "@/lib/rate-limit";

const COOKIE_NAME = "admin_session";

async function getClientIp(): Promise<string | null> {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? h.get("x-real-ip") ?? null;
}

export async function login(
  formData: FormData,
): Promise<{ ok: true } | { ok: false; error: string }> {
  let secret: Uint8Array;
  try {
    secret = getJwtSecret();
  } catch {
    return { ok: false, error: "Server configuration error — admin login is unavailable" };
  }

  const ip = await getClientIp();
  const { allowed } = await checkRateLimit(ip ? `login:${ip}` : null);
  if (!allowed) {
    return { ok: false, error: "Too many attempts — try again in 60 seconds" };
  }

  const password = formData.get("password") as string;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || password !== adminPassword) {
    return { ok: false, error: "Invalid password" };
  }

  const token = await new SignJWT({ role: "admin", timestamp: Date.now() })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: 60 * 60 * 24,
  });

  return { ok: true };
}

export async function logout(): Promise<{ ok: true }> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  return { ok: true };
}

export async function verifyAdminSession(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;

  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    return payload.role === "admin";
  } catch {
    return false;
  }
}
