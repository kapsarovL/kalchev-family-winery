import { test, expect } from "@playwright/test";

const CART_HEADER = '[class*="fixed"][class*="right-0"] h2';
const DRAWER = '[class*="fixed"][class*="right-0"][class*="max-w-sm"]';

test.describe("Cart Operations", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.removeItem("kalchev-cart"));
    await page.reload();
  });

  test("add wine to cart opens drawer", async ({ page }) => {
    const addBtn = page.getByRole("button", { name: /Add to Cart: Vranec Barrique/i }).first();
    await addBtn.scrollIntoViewIfNeeded();
    await addBtn.click();

    await expect(page.locator(DRAWER)).toBeVisible();
    await expect(page.locator(CART_HEADER)).toContainText("Your Cart (1)");
  });

  test("shows wine name and price in cart", async ({ page }) => {
    const addBtn = page.getByRole("button", { name: /Add to Cart: Vranec Barrique/i }).first();
    await addBtn.scrollIntoViewIfNeeded();
    await addBtn.click();
    await expect(page.locator(DRAWER)).toBeVisible();

    const drawer = page.locator(DRAWER);
    await expect(drawer.getByText("Vranec Barrique")).toBeVisible();
    await expect(drawer.locator("p.text-gold-100").first()).toContainText("€6.00");
  });

  test("increase quantity updates count", async ({ page }) => {
    const addBtn = page.getByRole("button", { name: /Add to Cart: Vranec Barrique/i }).first();
    await addBtn.scrollIntoViewIfNeeded();
    await addBtn.click();
    await expect(page.locator(DRAWER)).toBeVisible();
    await expect(page.locator(CART_HEADER)).toContainText("Your Cart (1)");

    await page
      .getByRole("button", { name: "Increase quantity of Vranec Barrique", exact: true })
      .click();
    await expect(page.locator(CART_HEADER)).toContainText("Your Cart (2)");
  });

  test("decrease quantity updates count", async ({ page }) => {
    const addBtn = page.getByRole("button", { name: /Add to Cart: Vranec Barrique/i }).first();
    await addBtn.scrollIntoViewIfNeeded();
    await addBtn.click();
    await expect(page.locator(DRAWER)).toBeVisible();
    await expect(page.locator(CART_HEADER)).toContainText("Your Cart (1)");

    await page
      .getByRole("button", { name: "Increase quantity of Vranec Barrique", exact: true })
      .click();
    await expect(page.locator(CART_HEADER)).toContainText("Your Cart (2)");

    await page
      .getByRole("button", { name: "Decrease quantity of Vranec Barrique", exact: true })
      .click();
    await expect(page.locator(CART_HEADER)).toContainText("Your Cart (1)");
  });

  test("remove item empties cart", async ({ page }) => {
    const addBtn = page.getByRole("button", { name: /Add to Cart: Vranec Barrique/i }).first();
    await addBtn.scrollIntoViewIfNeeded();
    await addBtn.click();
    await expect(page.locator(DRAWER)).toBeVisible();

    await page.getByRole("button", { name: /Remove Vranec Barrique from cart/i }).click();
    await expect(page.getByText("Your cart is empty")).toBeVisible();
  });

  test("add multiple different wines", async ({ page }) => {
    const vranec = page.getByRole("button", { name: /Add to Cart: Vranec Barrique/i }).first();
    await vranec.scrollIntoViewIfNeeded();
    await vranec.click();
    await expect(page.locator(DRAWER)).toBeVisible();
    await page.getByRole("button", { name: "Close cart" }).click();
    await expect(page.locator(DRAWER)).not.toBeVisible();

    const merlot = page
      .getByRole("button", { name: /Add to Cart: Thracian Valley Merlot/i })
      .first();
    await merlot.scrollIntoViewIfNeeded();
    await merlot.click();

    await expect(page.locator(CART_HEADER)).toContainText("Your Cart (2)");
  });

  test("cart persists across page reload", async ({ page }) => {
    const addBtn = page.getByRole("button", { name: /Add to Cart: Vranec Barrique/i }).first();
    await addBtn.scrollIntoViewIfNeeded();
    await addBtn.click();
    await expect(page.locator(DRAWER)).toBeVisible();

    await page.reload();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
    await page.getByRole("button", { name: "Open cart" }).click();
    await expect(page.locator(DRAWER).getByText("Vranec Barrique")).toBeVisible();
  });

  test("close cart via close button", async ({ page }) => {
    const addBtn = page.getByRole("button", { name: /Add to Cart: Vranec Barrique/i }).first();
    await addBtn.scrollIntoViewIfNeeded();
    await addBtn.click();

    await expect(page.locator(DRAWER)).toBeVisible();
    await page.getByRole("button", { name: "Close cart" }).click();
    await expect(page.locator(DRAWER)).not.toBeVisible();
  });
});