import { test } from "@playwright/test"

test("screenshot capture", async ({ page }) => {
  await page.goto("https://www.google.com")
  await page.screenshot({ path: "google.png" })
});