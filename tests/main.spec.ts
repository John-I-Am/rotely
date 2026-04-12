import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
	await page.goto("http://localhost:3000/");

	await expect(page).toHaveTitle("TanStack Start Starter");
});

test("login flow", async ({ page }) => {
	await page.goto("http://localhost:3000/login");
	await page.waitForLoadState("networkidle");

	await page.getByRole("textbox", { name: "Email" }).fill("test@example.com");
	await page
		.getByRole("textbox", { name: "Password", exact: true })
		.fill("12345678");

	await page.getByRole("button", { name: "Sign In" }).click();
	await page.waitForURL("**/app/dashboard");
	await page.waitForLoadState("networkidle");

	await expect(
		page.getByRole("heading", { name: "Active decks" }),
	).toBeVisible();
});

test("navigation", async ({ page }) => {
	await page.goto("http://localhost:3000/login");
	await page.waitForLoadState("networkidle");

	await page.getByRole("textbox", { name: "Email" }).fill("test@example.com");
	await page
		.getByRole("textbox", { name: "Password", exact: true })
		.fill("12345678");
	await page
		.getByRole("textbox", { name: "Password", exact: true })
		.fill("12345678");

	await page.getByRole("button", { name: "Sign In" }).click();
	await page.waitForURL("**/app/dashboard");
	await page.waitForLoadState("networkidle");

	await page.getByRole("link", { name: "Study" }).click();
	await expect(
		page.getByRole("link", { name: "Back To Dashboard" }),
	).toBeVisible();
	await page.getByRole("link", { name: "Dashboard", exact: true }).click();
	await expect(
		page.getByRole("heading", { name: "Active decks" }),
	).toBeVisible();
	await page.getByRole("link", { name: "Decks", exact: true }).click();
	await expect(page.getByRole("link", { name: "My Decks" })).toBeVisible();
	await page.getByRole("link", { name: "Community Decks" }).click();
	await page.getByRole("link", { name: "Settings" }).click();
	await expect(page.getByText('Hello "/app/settings"!')).toBeVisible();
});
