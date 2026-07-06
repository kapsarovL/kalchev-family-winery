const store = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 3;
let lastCleanup = Date.now();

function maybeCleanup(): void {
  const now = Date.now();
  if (now - lastCleanup < 300_000) return;
  lastCleanup = now;
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key);
  }
}

export function checkRateLimit(ip: string | null): { allowed: boolean; retryAfterSecs: number } {
  maybeCleanup();
  const now = Date.now();
  const clientIp = ip ?? "unknown";
  const entry = store.get(clientIp);

  if (!entry || now > entry.resetAt) {
    store.set(clientIp, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSecs: 0 };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false, retryAfterSecs: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count++;
  return { allowed: true, retryAfterSecs: 0 };
}
