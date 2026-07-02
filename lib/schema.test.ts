import { describe, it, expect } from "vitest";
import { contactFormSchema } from "./schema";

describe("contactFormSchema", () => {
  it("accepts valid input", () => {
    const result = contactFormSchema.safeParse({
      name: "John",
      email: "john@example.com",
      message: "Hello, I would like to know more.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects short name", () => {
    const result = contactFormSchema.safeParse({
      name: "J",
      email: "john@example.com",
      message: "Hello",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = contactFormSchema.safeParse({
      name: "John",
      email: "not-an-email",
      message: "Hello",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty message", () => {
    const result = contactFormSchema.safeParse({
      name: "John",
      email: "john@example.com",
      message: "H",
    });
    expect(result.success).toBe(false);
  });
});
