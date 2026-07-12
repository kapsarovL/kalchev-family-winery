import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import { getJwtSecret } from "@/lib/jwt";
import { LoginForm } from "./login-form";

export const metadata = {
  title: "Admin Login | Kalchev Family Winery",
};

export default async function AdminLoginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;

  if (token) {
    try {
      const { payload } = await jwtVerify(token, getJwtSecret());
      if (payload.role === "admin") {
        redirect("/admin/dashboard");
      }
    } catch {
      // invalid token — show login form
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-50 px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-deepBrown-100">Admin Login</h1>
          <p className="text-sm text-deepBrown-100/60 mt-1">Kalchev Family Winery</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
