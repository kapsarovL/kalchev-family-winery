export function getJwtSecret(): Uint8Array {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("ADMIN_SESSION_SECRET must be set in production");
    }
    console.warn("[admin-auth] ADMIN_SESSION_SECRET not set — using development fallback");
    return new TextEncoder().encode("dev-only-fallback-do-not-deploy");
  }
  return new TextEncoder().encode(secret);
}
