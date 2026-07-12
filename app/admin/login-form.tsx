"use client";

import { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/admin-auth";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await login(formData);
      if (result.ok) {
        router.push("/admin/dashboard");
      } else {
        setError(result.error);
      }
    });
  }

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="username"
        autoComplete="username"
        tabIndex={-1}
        aria-hidden="true"
        className="sr-only"
      />
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-deepBrown-100 mb-1">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          className="w-full px-3 py-2 border border-deepBrown-100/20 rounded-md bg-white-100 text-deepBrown-100 placeholder:text-deepBrown-100/40 focus:outline-hidden focus:ring-2 focus:ring-wineRed-100"
        />
      </div>
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full py-2 px-4 bg-wineRed-100 text-white-100 rounded-md font-medium hover:bg-wineRed-100/90 disabled:opacity-50 transition-colors"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
