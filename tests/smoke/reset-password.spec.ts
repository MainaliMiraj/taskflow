import {test, expect} from "@playwright/test";

test.describe("Reset Password Page – Smoke Validation", () => {
    test("should render reset password UI elements", async ({page}) => {

        await page.goto("/reset-password/dummy-token");

        await expect(
            page.getByRole("heading", {name: /create new password/i})
        ).toBeVisible();


        await expect(
            page.getByText(/enter your new password:/i)
        ).toBeVisible();


        await expect(
            page.getByPlaceholder(/enter new password/i)
        ).toBeVisible();


        await expect(
            page.getByRole("button", {name: /reset password/i})
        ).toBeEnabled();
    });
});
