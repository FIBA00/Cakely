import { expect, test } from "@playwright/test";

const screens = [
  ["home", "/"],
  ["shop", "/shop"],
  ["custom-cake", "/custom-cake"],
  ["policies", "/policies"],
];

for (const [name, route] of screens) {
  test(`${name} mobile visual baseline`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route);
    await expect(page).toHaveScreenshot(`${name}-mobile.png`, {
      fullPage: true,
      animations: "disabled",
      caret: "hide",
      scale: "css",
    });
  });

  test(`${name} desktop visual baseline`, async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(route);
    await expect(page).toHaveScreenshot(`${name}-desktop.png`, {
      fullPage: true,
      animations: "disabled",
      caret: "hide",
      scale: "css",
    });
  });
}
