import {test, expect} from "@playwright/test";
import {apiLogin} from "@/tests/helpers/uiLogin";


test.describe("Dashboard Header – Smoke Validation", () => {

    test.beforeEach(async ({request, context}) => {
        await apiLogin(request, context);
    });

    test("should render header with user info and actions", async ({page}) => {
        await page.goto("/dashboard");

        const header = page.locator("header");
        await expect(header).toBeVisible();

        await expect(
            header.getByRole("img", {name: /taskflow logo/i})
        ).toBeVisible();

        await expect(
            header.getByRole("link", {name: /task flow/i})
        ).toBeVisible();

        const username = header.getByTestId("username");
        await expect(username).toBeVisible();

        const email = header.getByTestId("user-email");
        await expect(email).toContainText("@");


        const profileContainer = header.getByLabel("Profile menu");
        const avatar = profileContainer.locator("span").first();

        await expect(avatar).toBeVisible();
        await avatar.click();

        const dropdown = page.getByTestId("profile-dropdown");
        await expect(dropdown).toBeVisible();

        const logoutButton = header.locator("[aria-label=logout]")
        await expect(logoutButton).toBeVisible()
    });
});
