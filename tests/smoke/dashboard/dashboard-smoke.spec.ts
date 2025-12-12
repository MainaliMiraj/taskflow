import {test, expect} from "@playwright/test";
import {apiLogin} from "@/tests/helpers/uiLogin";


test.describe("Dashboard – Smoke Suite (API Auth)", () => {

    test.beforeEach(async ({request, context}) => {
        // Authenticate using backend; context becomes logged in
        await apiLogin(request, context);
    });

    test("should render all core dashboard components", async ({page}) => {

        await page.goto("/dashboard");

        await expect(page).toHaveURL(/\/dashboard/);


        await expect(
            page.getByRole("heading", {name: /task dashboard/i})
        ).toBeVisible();

        await expect(
            page.getByText(/manage your tasks efficiently/i)
        ).toBeVisible();

        await expect(
            page.getByRole("button", {name: /^\+ add task$/i})
        ).toBeVisible();

        await expect(
            page.getByPlaceholder(/search tasks/i)
        ).toBeVisible();

        await expect(page.getByText(/showing/i)).toBeVisible();

        const columns = ["Pending", "In Progress", "Completed"];
        for (const name of columns) {
            await expect(
                page.getByRole("heading", {name: new RegExp(name, "i")})
            ).toBeVisible();
        }
    });
});
