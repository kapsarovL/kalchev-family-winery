import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("next/headers", () => ({
  headers: vi.fn(),
}));

vi.mock("@/lib/rate-limit", () => ({
  checkRateLimit: vi.fn(),
}));

vi.mock("@/lib/db", () => ({
  db: {
    insert: vi.fn().mockReturnThis(),
    values: vi.fn().mockReturnThis(),
    onConflictDoNothing: vi.fn().mockResolvedValue(undefined),
  },
}));

vi.mock("@/lib/email", () => ({
  createEmailSender: vi.fn(),
  getNotificationEmail: vi.fn(),
  newsletterNotificationHtml: vi.fn(),
}));

import { subscribeToNewsletter } from "./newsletter";
import { headers } from "next/headers";
import { checkRateLimit } from "@/lib/rate-limit";
import { createEmailSender, getNotificationEmail } from "@/lib/email";

const mockedHeaders = vi.mocked(headers);
const mockedCheckRateLimit = vi.mocked(checkRateLimit);
const mockedCreateEmailSender = vi.mocked(createEmailSender);
const mockedGetNotificationEmail = vi.mocked(getNotificationEmail);

function makeFormData(email: string): FormData {
  const fd = new FormData();
  fd.append("email", email);
  return fd;
}

beforeEach(() => {
  vi.clearAllMocks();
  mockedHeaders.mockResolvedValue({
    get: (name: string) => (name === "x-forwarded-for" ? "10.0.0.1" : null),
  } as never);
  mockedCheckRateLimit.mockReturnValue({ allowed: true, retryAfterSecs: 0 });
  mockedCreateEmailSender.mockReturnValue(null);
  mockedGetNotificationEmail.mockReturnValue(null);
});

describe("subscribeToNewsletter", () => {
  it("rejects invalid email", async () => {
    const fd = makeFormData("not-an-email");
    const result = await subscribeToNewsletter(null, fd);

    expect(result.success).toBe(false);
    expect(result.message).toContain("valid email");
  });

  it("rejects empty email", async () => {
    const fd = makeFormData("");
    const result = await subscribeToNewsletter(null, fd);

    expect(result.success).toBe(false);
    expect(result.message).toContain("valid email");
  });

  it("returns rate-limit error when rate limited", async () => {
    mockedCheckRateLimit.mockReturnValue({ allowed: false, retryAfterSecs: 30 });

    const fd = makeFormData("test@example.com");
    const result = await subscribeToNewsletter(null, fd);

    expect(result.success).toBe(false);
    expect(result.message).toContain("Too many requests");
    expect(result.message).toContain("30");
  });

  it("succeeds without DB when DATABASE_URL is not set", async () => {
    const original = process.env.DATABASE_URL;
    delete process.env.DATABASE_URL;

    const fd = makeFormData("subscriber@example.com");
    const result = await subscribeToNewsletter(null, fd);

    expect(result.success).toBe(true);
    expect(result.message).toContain("subscribed");

    process.env.DATABASE_URL = original;
  });

  it("sends notification email when configured", async () => {
    const original = process.env.DATABASE_URL;
    process.env.DATABASE_URL = "postgresql://fake";

    const mockSend = vi.fn().mockResolvedValue(undefined);
    mockedCreateEmailSender.mockReturnValue({ emails: { send: mockSend } } as never);
    mockedGetNotificationEmail.mockReturnValue("owner@winery.com");

    const fd = makeFormData("new@example.com");
    const result = await subscribeToNewsletter(null, fd);

    expect(result.success).toBe(true);
    expect(mockSend).toHaveBeenCalledTimes(1);
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "owner@winery.com",
        subject: "New newsletter subscriber",
      }),
    );

    process.env.DATABASE_URL = original;
  });

  it("still succeeds when email sending fails", async () => {
    const original = process.env.DATABASE_URL;
    process.env.DATABASE_URL = "postgresql://fake";

    const mockSend = vi.fn().mockRejectedValue(new Error("Resend down"));
    mockedCreateEmailSender.mockReturnValue({ emails: { send: mockSend } } as never);
    mockedGetNotificationEmail.mockReturnValue("owner@winery.com");

    const fd = makeFormData("new@example.com");
    const result = await subscribeToNewsletter(null, fd);

    expect(result.success).toBe(true);

    process.env.DATABASE_URL = original;
  });

  it("uses x-real-ip as fallback for rate limiting", async () => {
    mockedHeaders.mockResolvedValue({
      get: (name: string) => (name === "x-real-ip" ? "172.16.0.1" : null),
    } as never);

    await subscribeToNewsletter(null, makeFormData("test@example.com"));

    expect(mockedCheckRateLimit).toHaveBeenCalledWith("172.16.0.1");
  });

  it("uses unknown when no IP headers present", async () => {
    mockedHeaders.mockResolvedValue({
      get: () => null,
    } as never);

    await subscribeToNewsletter(null, makeFormData("test@example.com"));

    expect(mockedCheckRateLimit).toHaveBeenCalledWith("unknown");
  });
});
