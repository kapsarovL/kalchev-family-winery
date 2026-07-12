import { type ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";

const COOKIE_NAME = "admin_session";
const JWT_SECRET = new TextEncoder().encode(process.env.ADMIN_SESSION_SECRET || "default-secret-change-me");

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    redirect("/admin");
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (payload.role !== "admin") {
      redirect("/admin");
      return null;
    }
  } catch {
    redirect("/admin");
    return null;
  }

  return <>{children}</>;
}