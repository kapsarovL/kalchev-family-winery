import { test, expect } from "@playwright/test";

test.describe("Mobile Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
  });

  test("hamburger button is visible on mobile", async ({ page }) => {
    const hamburger = page.getByRole("button", { name: "Open menu" });
    await expect(hamburger).toBeVisible();
  });

  test("opens mobile menu on hamburger click", async ({ page }) => {
    const hamburger = page.getByRole("button", { name: "Open menu" });
    await hamburger.click();

    await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible();
  });

  test("closes mobile menu on close button click", async ({ page }) => {
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("button", { name: "Close menu" }).click();

    await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
  });

  test("nav link scrolls to wines section", async ({ page }) => {
    await page.getByRole("button", { name: "Open menu" }).click();
    await page
      .getByRole("button", { name: /Our Wines/i })
      .first()
      .click();

    await expect(page.locator("#wines")).toBeVisible();
  });
});
