import {expect, test} from "@playwright/test";


test.describe("OTP Verification page", () => {
    test("should render OTP verification ui", async ({page}) => {

        await page.goto("/verify-otp?email=test@example.com")

        await expect(page.getByRole("heading", {name: /verify your email/i})).toBeVisible()

        await expect(page.getByText(/Enter the 6-digit code sent to/i)).toBeVisible()

        for (let i = 0; i < 6; i++) {
            await expect(page.locator(`#otp-${i}`)).toBeVisible()
        }

        await expect(
            page.getByRole("button", {name: /verify otp/i})
        ).toBeEnabled();

    })
})