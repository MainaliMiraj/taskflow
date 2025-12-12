import {test, expect} from "@playwright/test";

test("OTP route should redirect to /register when no email is present", async ({page}) => {
    await page.goto("/verify-otp");
    
    await expect(page).toHaveURL(/\/register$/);
});
