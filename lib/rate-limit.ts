import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let ratelimit: Ratelimit | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, "60 s"),
    analytics: true,
    prefix: "kalchev:ratelimit",
  });
}

export async function checkRateLimit(
  ip: string | null,
): Promise<{ allowed: boolean; retryAfterSecs: number }> {
  if (!ratelimit) {
    return { allowed: true, retryAfterSecs: 0 };
  }

  const clientIp = ip ?? "anonymous";

  return ratelimit
    .limit(clientIp)
    .then((result) => ({
      allowed: result.success,
      retryAfterSecs: result.success ? 0 : Math.ceil((result.reset - Date.now()) / 1000) || 60,
    }))
    .catch(() => ({ allowed: true, retryAfterSecs: 0 }));
}
