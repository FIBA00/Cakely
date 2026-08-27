import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("public storefront meets the critical accessibility smoke check", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  expect(results.violations, results.violations.map((violation) => `${violation.id}: ${violation.nodes.map((node) => node.html).join(", ")}`).join("\\n")).toEqual([]);
});

test("a guest can browse a cake and add it to their cart", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("main").getByRole("link", { name: "Shop cakes" }).click();
  const raspberryCake = page.getByRole("link", { name: /View Raspberry Veil/ });
  await expect(raspberryCake).toHaveAttribute("href", "/shop/raspberry-veil");
  await page.goto("/shop/raspberry-veil");
  await expect(page.getByRole("heading", { name: "Raspberry Veil" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "No customer notes yet." })).toBeVisible();
  await page.getByRole("button", { name: "Add to cart" }).click();
  await page.getByRole("link", { name: /Cart with 1 item/ }).click();
  await expect(page.getByRole("heading", { name: "A good choice." })).toBeVisible();
});

test("a guest can find dietary cakes and see a custom-cake preview update", async ({ page }) => {
  await page.goto("/shop");
  await page.getByLabel("Dietary requirement").selectOption("Vegan");
  await expect(page.getByRole("link", { name: "View Citrus Bloom", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "View Raspberry Veil" })).toHaveCount(0);

  await page.goto("/custom-cake");
  await page.getByRole("button", { name: "Vanilla ivory" }).click();
  await page.getByRole("button", { name: "Heart" }).click();
  await page.getByRole("button", { name: "Fresh fruit" }).click();
  await page.getByLabel("Cake message (optional)").fill("For Amara");
  await expect(page.locator(".top-vanilla.top-shape-heart.top-fresh")).toBeVisible();
  await expect(page.locator(".top-cake-message")).toHaveText("For Amara");
});

test("a guest can switch the custom builder between English and Amharic", async ({ page }) => {
  await page.goto("/custom-cake");
  await page.getByRole("button", { name: "አማ" }).click();
  await expect(page.getByText("ታሪኩን ይንገሩን።")).toBeVisible();
  await expect(page.getByText("ከላይ የሚታይ የጌጥ ሰሌዳ")).toBeVisible();
  await page.goto("/shop");
  await expect(page.getByText("የኬክ ጠረጴዛ")).toBeVisible();
  await page.goto("/cart");
  await expect(page.getByRole("heading", { name: "ቅርጫትዎ", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "EN", exact: true }).click();
  await page.goto("/custom-cake");
  await expect(page.getByText("Tell us the story.")).toBeVisible();
});

test("a guest sees every advanced cake-board choice update in real time and can export it", async ({ page }) => {
  await page.goto("/custom-cake");
  await page.getByRole("button", { name: /6 inch.*serves 6–8/ }).click();
  await expect(page.locator(".top-cake.cake-size-6")).toBeVisible();
  await page.getByRole("button", { name: /10 inch.*serves 18–22/ }).click();
  await expect(page.locator(".top-cake.cake-size-10")).toBeVisible();
  await page.getByRole("button", { name: "Wedding cake" }).click();
  await expect(page.locator(".top-cake.cake-type-wedding")).toBeVisible();
  await page.getByRole("button", { name: "Dark chocolate" }).click();
  await expect(page.locator(".top-cake.flavour-chocolate")).toBeVisible();
  await page.getByLabel("Cake message (optional)").fill("For Hana");
  await page.getByRole("button", { name: "Top arc" }).click();
  await expect(page.locator(".top-cake-message.message-top-arc")).toHaveText("For Hana");
  await page.getByRole("button", { name: "Corners" }).click();
  await expect(page.locator(".top-cake.decoration-corners")).toBeVisible();
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export board" }).click();
  expect((await download).suggestedFilename()).toBe("cakely-cake-design.svg");
});

test("checkout validation follows the Amharic locale", async ({ page }) => {
  await page.goto("/shop/raspberry-veil");
  await page.getByRole("button", { name: "Add to cart" }).click();
  await page.goto("/checkout");
  await page.getByRole("button", { name: "አማ", exact: true }).click();
  await page.getByRole("button", { name: "ትዕዛዝ ያስገቡ", exact: true }).click();
  await expect(page.getByText("እባክዎ ስምዎን ያስገቡ።")).toBeVisible();
  await expect(page.getByText("እባክዎ ቀን ይምረጡ።")).toBeVisible();
  await page.getByLabel("ስም").fill("ሳራ አበበ");
  await page.getByLabel("ስልክ").fill("0912345678");
  await page.getByLabel("ኢሜይል").fill("sara@example.com");
  await page.getByLabel("የሚመረጥ ቀን").fill("2030-09-20");
  await page.getByLabel("የሚመረጥ ሰዓት").selectOption({ label: "10:00–12:00" });
  await page.getByRole("button", { name: "ትዕዛዝ ያስገቡ", exact: true }).click();
  await expect(page.getByText("እባክዎ የማድረሻ አድራሻ ያክሉ።")).toBeVisible();
  await expect(page.getByText("እባክዎ የትዕዛዝ ዝርዝሮችን ያረጋግጡ።")).toBeVisible();
});

test("top-view decorations stay anchored to their selected geometry", async ({ page }) => {
  await page.goto("/custom-cake");
  const toppings = page.locator(".top-toppings i");
  await page.getByRole("button", { name: "Corners", exact: true }).click();
  await expect(toppings).toHaveCount(4);
  await expect(toppings.first()).toHaveAttribute("style", /left: 21%.*top: 21%/);
  await page.getByRole("button", { name: "Centre", exact: true }).click();
  await expect(toppings).toHaveCount(4);
  await expect(toppings.first()).toHaveAttribute("style", /left: 44%.*top: 44%/);
  await page.getByRole("button", { name: "Scatter", exact: true }).click();
  await expect(toppings).toHaveCount(6);
  await page.getByRole("button", { name: "Border", exact: true }).click();
  await expect(toppings).toHaveCount(8);
  await expect(toppings.first()).toHaveAttribute("style", /left: 50%.*top: 8%/);
});

test("an authenticated customer can manage an address and preferences", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("cakely-app", JSON.stringify({ state: { user: { id: "u-customer", name: "Sara Abebe", email: "sara@example.com", phone: "0912345678", initials: "SA", role: "user" }, favorites: [] }, version: 0 })));
  await page.goto("/account/addresses");
  await page.getByRole("button", { name: "Add an address" }).first().click();
  await page.getByLabel("Address label").fill("Home");
  await page.getByLabel("Street address").fill("Bole Road");
  await page.getByLabel("City").fill("Addis Ababa");
  await page.getByRole("button", { name: "Save address" }).click();
  await expect(page.getByRole("heading", { name: "Home" })).toBeVisible();
  await page.goto("/account/settings");
  await page.getByLabel("Order updates by SMS").check();
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page.getByText("Preferences saved.")).toBeVisible();
});

test("a guest can review policies and contact support", async ({ page }) => {
  await page.goto("/policies");
  await expect(page.getByRole("heading", { name: "Policies and trust" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Allergy and food safety" })).toBeVisible();
  await page.goto("/support");
  await expect(page.getByRole("heading", { name: "Need a hand?" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Email support" })).toHaveAttribute("href", /mailto:/);
});

test("an authenticated customer can reorder a previous cake", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("cakely-app", JSON.stringify({ state: { user: { id: "u-customer", name: "Sara Abebe", email: "sara@example.com", phone: "0912345678", initials: "SA", role: "user" }, favorites: [] }, version: 0 })));
  await page.goto("/account/orders");
  await page.getByRole("button", { name: "Reorder" }).first().click();
  await expect(page.getByText("Items added to your cart.")).toBeVisible();
  await page.goto("/cart");
  await expect(page.getByRole("heading", { name: "A good choice.", exact: true })).toBeVisible();
});

test("checkout exposes transparent promotion and delivery integration states", async ({ page }) => {
  await page.goto("/shop/raspberry-veil");
  await page.getByRole("button", { name: "Add to cart" }).click();
  await page.goto("/checkout");
  await expect(page.getByRole("heading", { name: "Make it yours" })).toBeVisible();
  await expect(page.getByText("Delivery zones, address autocomplete, and ETA will be confirmed by the bakery service.")).toBeVisible();
  await page.getByPlaceholder("Enter a code").fill("WELCOME");
  await page.getByRole("button", { name: "Apply" }).click();
  await expect(page.getByText("Codes will be validated after the promotions API is connected.")).toBeVisible();
});
