import { test, expect } from "@playwright/test";

test.describe("Locale Switching", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("defaults to English", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Wine Made with Soul");
  });

  test("switches to Macedonian", async ({ page }) => {
    await page.getByRole("button", { name: "Switch language" }).click();

    await expect(page.locator("h1")).toContainText("Вино создадено со душа");
  });

  test("switches from Macedonian to Greek", async ({ page }) => {
    await page.getByRole("button", { name: "Switch language" }).click();
    await expect(page.locator("h1")).toContainText("Вино создадено со душа");

    await page.getByRole("button", { name: "Switch language" }).click();
    await expect(page.locator("h1")).toContainText("Κρασί φτιαγμένο με ψυχή");
  });

  test("cycles back to English from Greek", async ({ page }) => {
    const langBtn = page.getByRole("button", { name: "Switch language" });

    await langBtn.click(); // en → mk
    await expect(page.locator("h1")).toContainText("Вино создадено со душа");

    await langBtn.click(); // mk → gr
    await expect(page.locator("h1")).toContainText("Κρασί φτιαγμένο με ψυχή");

    await langBtn.click(); // gr → en
    await expect(page.locator("h1")).toContainText("Wine Made with Soul");
  });

  test("persists locale across page reload", async ({ page }) => {
    await page.getByRole("button", { name: "Switch language" }).click();
    await expect(page.locator("h1")).toContainText("Вино создадено со душа");

    await page.reload();
    await expect(page.locator("h1")).toContainText("Вино создадено со душа");
  });
});
