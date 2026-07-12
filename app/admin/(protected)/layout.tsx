import { type ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import { getJwtSecret } from "@/lib/jwt";

const COOKIE_NAME = "admin_session";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    redirect("/admin");
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
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
