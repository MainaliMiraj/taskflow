import {test, expect} from "@playwright/test";

test.describe("Landing Page – Smoke Validation", () => {
    test("should render all primary landing page elements", async ({page}) => {
        await page.goto("/");
        await expect(page).toHaveURL(/\/$/);

        await expect(page.getByAltText(/brand-logo/i)).toBeVisible();
        await expect(page.getByRole("link", {name: /taskflow/i})).toBeVisible();

        const navbar = page.locator("nav");
        await expect(navbar.getByRole("link", {name: /sign in/i})).toBeVisible()
        await expect(navbar.getByRole("link", {name: /sign up/i})).toBeVisible()
        
        await expect(
            page.getByText(/helps with your daily tasks management/i)
        ).toBeVisible();

        await expect(
            page.getByRole("heading", {name: /manage your tasks/i})
        ).toBeVisible();

        await expect(
            page.getByText(/a simple and smart task manager/i)
        ).toBeVisible();

        const hero = page.locator('section')
        await expect(hero.getByRole("link", {name: /get started free/i})).toBeVisible()
        await expect(hero.getByRole("link", {name: /sign in$/i})).toBeVisible()

    });
});
