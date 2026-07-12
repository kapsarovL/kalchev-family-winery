import { test, expect } from "@playwright/test";

test.describe("Contact Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("#name")).toBeVisible();
  });

  test("form fields are visible", async ({ page }) => {
    await expect(page.locator("#name")).toBeVisible();
    await expect(page.locator("#email")).toBeVisible();
    await expect(page.locator("#subject")).toBeVisible();
    await expect(page.locator("#message")).toBeVisible();
  });

  test("shows validation errors on empty submit", async ({ page }) => {
    await page.getByRole("button", { name: /Send Message/i }).scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: /Send Message/i }).click();

    await expect(page.locator("#error-name")).toBeVisible({ timeout: 10000 });
  });

  test("shows error for invalid email", async ({ page }) => {
    await page.locator("#name").fill("Test User");
    await page.locator("#email").fill("not-an-email");
    await page.locator("#message").fill("Hello there");
    await page.getByRole("button", { name: /Send Message/i }).scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: /Send Message/i }).click();

    await expect(page.locator("#error-email")).toBeVisible({ timeout: 10000 });
  });

  test("submits successfully with valid data", async ({ page }) => {
    await page.locator("#name").fill("Test User");
    await page.locator("#email").fill("test@example.com");
    await page.locator("#subject").selectOption("General Inquiry");
    await page.locator("#message").fill("This is a test message from E2E");
    await page.getByRole("button", { name: /Send Message/i }).scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: /Send Message/i }).click();

    await expect(page.getByRole("status")).toContainText("Your message has been sent", {
      timeout: 10000,
    });
  });
});
