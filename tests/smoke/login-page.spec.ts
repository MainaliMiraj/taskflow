import {test, expect} from "@playwright/test";


test.describe('Login Page-Smoke Validation', () => {
    test("should render all primary UI elements", async ({page}) => {

        await page.goto("/login");
        await expect(page).toHaveURL(/\/login$/, {timeout: 5000})


        await expect(page.getByRole("heading", {name: /welcome back/i})).toBeVisible();

        await expect(page.getByPlaceholder(/enter your email/i)).toBeVisible();
        await expect(page.getByPlaceholder(/enter your password/i)).toBeVisible();

        await expect(page.getByRole("button", {name: /login/i})).toBeEnabled();
        await expect(page.getByRole('link', {name: /create one/i})).toBeVisible();
        await expect(page.getByRole('link', {name: /reset password/i})).toBeVisible();

    });

})
