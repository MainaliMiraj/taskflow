import {test, expect} from "@playwright/test";


test("Forgot password page should navigate to login when 'Back to Login' is clicked", async ({page}) => {
    await page.goto("/forgot-password");

    await page.getByRole("link", {name: /back to login/i}).click();

    await expect(page).toHaveURL(/\/login$/);
});
