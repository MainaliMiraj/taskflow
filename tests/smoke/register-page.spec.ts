import {expect, test} from "@playwright/test";


test.describe("Register Page-Smoke Validation", () => {
    test("should render all primary ui elements", async ({page}) => {

        await page.goto("/register")
        await expect(page).toHaveURL(/\/register$/, {timeout: 5000})

        await expect(page.getByRole("heading", {name: /welcome to taskflow/i})).toBeVisible()

        await expect(page.getByPlaceholder(/enter your username/i)).toBeVisible()
        await expect(page.getByPlaceholder(/enter your email/i)).toBeVisible()

        await expect(page.getByLabel(/password/i)).toBeVisible()
        await expect(page.getByRole("button", {name: /sign up/i})).toBeVisible()

        await expect(page.getByRole("link", {name: /login/i})).toBeVisible();


    })
})