import { test, expect } from "@playwright/test";

test("a visitor can browse published bakeries without signing in", async ({ page }) => {
  await page.goto("/bakeries");
  await expect(page.getByRole("heading", { name: /Independent cake shops|ነጻ የኬክ ሱቆች/ })).toBeVisible();
  await expect(page.getByText("Cakely Counter")).toBeVisible();
  await page.getByRole("link", { name: /View shop|ሱቁን ይመልከቱ/ }).first().click();
  await expect(page).toHaveURL(/\/bakeries\/cakely-counter/);
  await expect(page.getByText(/Published menu|የታተመ ምናሌ/).first()).toBeVisible();
});

test("the owner workspace is protected and exposes operations after owner sign-in", async ({ page }) => {
  await page.goto("/owner");
  await expect(page).toHaveURL(/\/login/);
  await expect(page.getByRole("button", { name: /Open demo owner dashboard|የማሳያ ባለቤት ዳሽቦርድን ክፈት/ })).toBeVisible();
  await page.getByRole("button", { name: /Open demo owner dashboard|የማሳያ ባለቤት ዳሽቦርድን ክፈት/ }).click();
  await expect(page).toHaveURL(/\/owner/);
  await expect(page.getByText(/Owner workspace|የባለቤት የስራ ቦታ/).first()).toBeVisible();
  await expect(page.getByRole("button", { name: /Finance|ፋይናንስ/ })).toBeVisible();
  await page.getByRole("button", { name: /Finance|ፋይናንስ/ }).click();
  await expect(page.getByText(/Gross sales|ጠቅላላ ሽያጭ/)).toBeVisible();
});

test("mobile quick navigation remains visible and routes to the shop", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const bottomNav = page.getByRole("navigation", { name: /Quick navigation/ });
  await expect(bottomNav).toBeVisible();
  await bottomNav.getByRole("link", { name: /Shop|ኬኮች/ }).click();
  await expect(page).toHaveURL(/\/shop/);
});

test("owner can update an order to Done and review finance charts", async ({ page }) => {
  await page.goto("/owner");
  await page.getByRole("button", { name: /Open demo owner dashboard|የማሳያ ባለቤት ዳሽቦርድን ክፈት/ }).click();
  await page.getByRole("button", { name: /Orders|ትዕዛዞች/ }).first().click();
  const status = page.locator(".status-select").first();
  await status.selectOption("done");
  await expect(status).toHaveValue("done");
  await page.getByRole("button", { name: /Finance|ፋይናንስ/ }).click();
  await expect(page.getByRole("img", { name: /Monthly revenue|ወርሃዊ ገቢ/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Top-selling cakes|በብዛት የሚሸጡ ኬኮች/ })).toBeVisible();
});
