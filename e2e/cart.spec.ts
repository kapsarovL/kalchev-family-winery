import { test, expect } from "@playwright/test";

const CART_HEADER = '[class*="fixed"][class*="right-0"] h2';

test.describe("Cart Operations", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => localStorage.removeItem("kalchev-cart"));
    await page.goto("/");
  });

  test("add wine to cart opens drawer", async ({ page }) => {
    const addBtn = page.getByRole("button", { name: /Add to Cart: Vranec Barrique/i }).first();
    await addBtn.scrollIntoViewIfNeeded();
    await addBtn.click();

    await expect(page.locator(CART_HEADER)).toContainText("Your Cart (1)");
  });

  test("shows wine name and price in cart", async ({ page }) => {
    const addBtn = page.getByRole("button", { name: /Add to Cart: Vranec Barrique/i }).first();
    await addBtn.scrollIntoViewIfNeeded();
    await addBtn.click();

    await expect(page.getByText("Vranec Barrique").first()).toBeVisible();
    await expect(page.getByText("€6.00").first()).toBeVisible();
  });

  test("increase quantity updates count", async ({ page }) => {
    const addBtn = page.getByRole("button", { name: /Add to Cart: Vranec Barrique/i }).first();
    await addBtn.scrollIntoViewIfNeeded();
    await addBtn.click();
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
    await expect(page.locator(CART_HEADER)).toContainText("Your Cart (1)");

    await page
      .getByRole("button", { name: "Increase quantity of Vranec Barrique", exact: true })
      .click();
    await page
      .getByRole("button", { name: "Decrease quantity of Vranec Barrique", exact: true })
      .click();
    await expect(page.locator(CART_HEADER)).toContainText("Your Cart (1)");
  });

  test("remove item empties cart", async ({ page }) => {
    const addBtn = page.getByRole("button", { name: /Add to Cart: Vranec Barrique/i }).first();
    await addBtn.scrollIntoViewIfNeeded();
    await addBtn.click();

    await page.getByRole("button", { name: /Remove Vranec Barrique/i }).click();
    await expect(page.getByText("Your cart is empty")).toBeVisible();
  });

  test("add multiple different wines", async ({ page }) => {
    const vranec = page.getByRole("button", { name: /Add to Cart: Vranec Barrique/i }).first();
    await vranec.scrollIntoViewIfNeeded();
    await vranec.click();
    await page.getByRole("button", { name: "Close cart" }).click();

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

    await page.reload();
    await page.getByRole("button", { name: "Open cart" }).click();
    await expect(page.getByText("Vranec Barrique").first()).toBeVisible();
  });

  test("close cart via backdrop click", async ({ page }) => {
    const addBtn = page.getByRole("button", { name: /Add to Cart: Vranec Barrique/i }).first();
    await addBtn.scrollIntoViewIfNeeded();
    await addBtn.click();

    await expect(page.locator(CART_HEADER)).toContainText("Your Cart (1)");
    await page.locator(".fixed.inset-0.bg-black\\/40").click({ force: true });
    await expect(page.locator(CART_HEADER)).not.toBeVisible();
  });
});
