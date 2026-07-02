import { describe, it, expect } from "vitest";
import { contactFormSchema } from "./schema";

describe("contactFormSchema (integration)", () => {
  it("validates a full contact form submission", () => {
    const result = contactFormSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      message: "I would like to visit your winery.",
    });
    expect(result.success).toBe(true);
  });
});
