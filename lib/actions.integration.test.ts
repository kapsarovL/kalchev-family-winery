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
    values: vi.fn().mockResolvedValue(undefined),
  },
}));

vi.mock("@/lib/email", () => ({
  createEmailSender: vi.fn(),
  getNotificationEmail: vi.fn(),
  contactNotificationHtml: vi.fn(),
}));

import { contactFormAction } from "./actions";
import { headers } from "next/headers";
import { checkRateLimit } from "@/lib/rate-limit";
import { createEmailSender, getNotificationEmail } from "@/lib/email";

const mockedHeaders = vi.mocked(headers);
const mockedCheckRateLimit = vi.mocked(checkRateLimit);
const mockedCreateEmailSender = vi.mocked(createEmailSender);
const mockedGetNotificationEmail = vi.mocked(getNotificationEmail);

function makeFormData(data: Record<string, string>): FormData {
  const fd = new FormData();
  for (const [key, value] of Object.entries(data)) {
    fd.append(key, value);
  }
  return fd;
}

beforeEach(() => {
  vi.clearAllMocks();
  mockedHeaders.mockResolvedValue({
    get: (name: string) => (name === "x-forwarded-for" ? "192.168.1.1, 10.0.0.1" : null),
  } as Awaited<ReturnType<typeof headers>>);
  mockedCheckRateLimit.mockReturnValue({ allowed: true, retryAfterSecs: 0 });
  mockedCreateEmailSender.mockReturnValue(null);
  mockedGetNotificationEmail.mockReturnValue(null);
});

describe("contactFormAction", () => {
  it("returns field errors for invalid input", async () => {
    const fd = makeFormData({ name: "J", email: "bad", message: "x" });
    const result = await contactFormAction(null, fd);

    expect(result.success).toBe(false);
    expect(result.errors).toHaveProperty("name");
    expect(result.errors).toHaveProperty("email");
    expect(result.errors).toHaveProperty("message");
  });

  it("returns rate-limit error when rate limited", async () => {
    mockedCheckRateLimit.mockReturnValue({ allowed: false, retryAfterSecs: 45 });

    const fd = makeFormData({
      name: "John",
      email: "john@example.com",
      message: "Hello there",
    });
    const result = await contactFormAction(null, fd);

    expect(result.success).toBe(false);
    expect(result.errors?._form).toContain("Too many requests");
    expect(result.errors?._form).toContain("45s");
  });

  it("succeeds without DB when DATABASE_URL is not set", async () => {
    const original = process.env.DATABASE_URL;
    delete process.env.DATABASE_URL;

    const fd = makeFormData({
      name: "John Doe",
      email: "john@example.com",
      message: "I would like to visit your winery.",
    });
    const result = await contactFormAction(null, fd);

    expect(result.success).toBe(true);
    expect(result.errors).toBeNull();
    expect(result.defaultValues.name).toBe("");

    process.env.DATABASE_URL = original;
  });

  it("uses first IP from x-forwarded-for for rate limiting", async () => {
    await contactFormAction(
      null,
      makeFormData({
        name: "John",
        email: "john@example.com",
        message: "Hello",
      }),
    );

    expect(mockedCheckRateLimit).toHaveBeenCalledWith("192.168.1.1");
  });

  it("falls back to anonymous when no x-forwarded-for header", async () => {
    mockedHeaders.mockResolvedValue({
      get: () => null,
    } as never);

    await contactFormAction(
      null,
      makeFormData({
        name: "John",
        email: "john@example.com",
        message: "Hello",
      }),
    );

    expect(mockedCheckRateLimit).toHaveBeenCalledWith("anonymous");
  });

  it("returns default values on validation failure", async () => {
    const fd = makeFormData({ name: "X", email: "bad", message: "Y" });
    const result = await contactFormAction(null, fd);

    expect(result.defaultValues.name).toBe("X");
    expect(result.defaultValues.email).toBe("bad");
    expect(result.defaultValues.message).toBe("Y");
  });

  it("sends notification email when configured", async () => {
    const mockSend = vi.fn().mockResolvedValue(undefined);
    mockedCreateEmailSender.mockReturnValue({ emails: { send: mockSend } } as never);
    mockedGetNotificationEmail.mockReturnValue("owner@winery.com");

    const fd = makeFormData({
      name: "Jane",
      email: "jane@example.com",
      message: "Do you ship internationally?",
    });
    const result = await contactFormAction(null, fd);

    expect(result.success).toBe(true);
    expect(mockSend).toHaveBeenCalledTimes(1);
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "owner@winery.com",
        subject: expect.stringContaining("Jane"),
      }),
    );
  });

  it("still succeeds when email sending fails", async () => {
    const mockSend = vi.fn().mockRejectedValue(new Error("Resend down"));
    mockedCreateEmailSender.mockReturnValue({ emails: { send: mockSend } } as never);
    mockedGetNotificationEmail.mockReturnValue("owner@winery.com");

    const fd = makeFormData({
      name: "Jane",
      email: "jane@example.com",
      message: "Hello!",
    });
    const result = await contactFormAction(null, fd);

    expect(result.success).toBe(true);
  });
});
