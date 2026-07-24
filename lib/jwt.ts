export function getJwtSecret(): Uint8Array {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET must be set. Generate one with: openssl rand -base64 32");
  }
  return new TextEncoder().encode(secret);
}
