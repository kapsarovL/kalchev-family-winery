import { test, expect } from "@playwright/test";

test.describe("Smoke Tests", { tag: "@smoke" }, () => {
  test("homepage loads successfully", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.ok()).toBe(true);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("page title is correct", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Kalchev/);
  });
});
