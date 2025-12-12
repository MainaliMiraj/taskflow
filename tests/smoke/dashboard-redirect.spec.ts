import {test, expect} from "@playwright/test";

test("Unauthenticated user should be redirected from /dashboard to /login", async ({page}) => {
    await page.goto("/dashboard");

    await expect(page).toHaveURL(/\/login$/);
});
