import { test, expect } from "@playwright/test";

test("home page shows the blog and its posts", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Mini Blog");
  await expect(page.getByRole("heading", { name: "Latest posts" })).toBeVisible();
});

test("clicking a post opens its page", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("heading", { level: 2 }).first().click();

  await expect(page).toHaveURL(/\/posts\/\d+/);
});
