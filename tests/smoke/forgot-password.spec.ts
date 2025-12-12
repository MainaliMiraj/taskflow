import {test, expect} from "@playwright/test";


test.describe('Forgot password- Smoke validation', () => {
    test("should render all forgot password elements", async ({page}) => {

        await page.goto("/forgot-password");
        await expect(page).toHaveURL(/\/forgot-password$/, {timeout: 10000})


        await expect(page.getByRole("heading", {name: /reset password/i})).toBeVisible();

        await expect(page.getByLabel(/email/i)).toBeVisible();
        await expect(page.getByPlaceholder(/enter your email/i)).toBeVisible();

        await expect(page.getByRole("button", {name: /send reset link/i})).toBeEnabled();
        await expect(page.getByRole('link', {name: /back to login/i})).toBeVisible();


    });

})
