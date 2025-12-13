// tests/smoke/dashboard/dashboard.spec.ts
import {test, expect} from '@playwright/test';
import {setupAuthCookie, setupApiMocks} from '@/tests/mocks/api-mocks.helper';

test.beforeEach(async ({page, context}) => {
    // Setup authentication
    await setupAuthCookie(context);

    // Setup API mocks
    await setupApiMocks(page);

    // Navigate to dashboard
    await page.goto('/dashboard');

    // Wait and log
    await page.waitForTimeout(2000);
    console.log('Final URL:', page.url());
});

test('Dashboard UI smoke test', async ({page}) => {
    const currentUrl = page.url();
    console.log('Current URL:', currentUrl);

    if (currentUrl.includes('/login')) console.error('❌ Still on login page!')


    // Verify we're on dashboard
    await expect(page).toHaveURL(/\/dashboard/);
    await page.waitForLoadState('networkidle');

    // Check UI elements are visible
    await expect(page.getByRole('heading', {name: /Task Dashboard/i})).toBeVisible();
    await expect(page.getByText(/Manage your tasks/i)).toBeVisible();

    // Check Add Task button is visible and clickable
    const addButton = page.getByTestId('add-task');
    await expect(addButton).toBeVisible();
    await expect(addButton).toBeEnabled();

    // Check search bar is visible
    await expect(page.getByPlaceholder(/Search tasks/i)).toBeVisible();

    // Check all three columns are visible
    await expect(page.getByRole('heading', {name: 'Pending'})).toBeVisible();
    await expect(page.getByRole('heading', {name: 'In Progress'})).toBeVisible();
    await expect(page.getByRole('heading', {name: 'Completed'})).toBeVisible();

    // Check task count is visible
    await expect(page.getByText(/Showing \d+ task/i)).toBeVisible();

    console.log('✅ All UI elements are visible and working!');
});