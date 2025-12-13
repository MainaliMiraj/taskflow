import {test, expect} from "@playwright/test";
import {apiLogin} from "@/tests/helpers/uiLogin.helper";

test.describe("Dashboard core functionality testing", () => {

    test.beforeEach(async ({page, request, context}) => {
        await apiLogin(request, context);
        await page.goto("/dashboard");
    })

    test("should create a task successfully", async ({page}) => {
        const taskTitle = "Playwright smoke test title";

        // Open modal
        const addTaskButton = page.getByTestId('add-task')
        await expect(addTaskButton).toBeVisible()
        await addTaskButton.click()

        const modalHeading = page.getByTestId("create-task-header")
        await expect(modalHeading).toBeVisible()

        // Fill form
        await page.getByPlaceholder('Enter task title').fill(taskTitle)
        await page.getByPlaceholder("Write task details...").fill("This task was created by an automated smoke test.")
        await page.locator('input[type="datetime-local"]').fill("2025-12-31T10:30")
        await page.locator("select").selectOption("High")

        // Submit
        await page.getByTestId('create-task').click()

        // Close modal and wait for it to disappear
        await page.getByTestId('close-modal').click()

        // Verify task in dashboard
        const newTaskCard = page.getByText(taskTitle) // ✅ More specific
        await expect(newTaskCard).toBeVisible()
        await expect(newTaskCard).toContainText(taskTitle)
    })

})