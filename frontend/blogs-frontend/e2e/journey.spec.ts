import { test, expect } from "@playwright/test";

test("user can sign up, log in and write a post", async ({ page }) => {
  const username = `tester${Date.now()}`;
  const password = "secret123";
  const title = `Post by ${username}`;

  // 1. Sign up
  await page.goto("/signup");
  await page.getByPlaceholder("Username").fill(username);
  await page.getByPlaceholder("Email").fill(`${username}@test.com`);
  await page.getByPlaceholder("Password").fill(password);
  await page.getByRole("button", { name: "Create account" }).click();
  await expect(page).toHaveURL("/login");

  // 2. Log in
  await page.getByPlaceholder("Username").fill(username);
  await page.getByPlaceholder("Password").fill(password);
  await page.getByRole("button", { name: "Log in" }).click();
  await expect(page.getByText(username)).toBeVisible();

  // 3. Write a post
  await page.getByRole("link", { name: "Write" }).click();
  await page.getByPlaceholder("Post title").fill(title);
  await page.getByPlaceholder("Write your post...").fill("Written by Playwright 🤖");
  await page.getByRole("button", { name: "Publish" }).click();

  // 4. Check the post page shows it
  await expect(page.getByRole("heading", { name: title })).toBeVisible();
});
