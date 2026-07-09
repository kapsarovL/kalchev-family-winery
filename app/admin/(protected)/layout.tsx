import { type ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const authed = cookieStore.get("admin_authenticated")?.value === "true";

  if (!authed) {
    redirect("/admin");
  }

  return <>{children}</>;
}
