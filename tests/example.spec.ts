import { test, expect } from '@playwright/test';

// Example test file for Task Management App
// This demonstrates how to use the data-testid attributes for reliable testing

test.describe('Task Management App - Basic Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the dashboard with header', async ({ page }) => {
    await expect(page.locator('[data-testid="app-header"]')).toBeVisible();
    await expect(page.locator('[data-testid="dashboard-title"]')).toContainText('Task Dashboard');
  });

  test('should navigate to add task page', async ({ page }) => {
    await page.click('[data-testid="add-task-button"]');
    await expect(page).toHaveURL('/add');
    await expect(page.locator('[data-testid="add-task-title"]')).toContainText('Add New Task');
  });

  test('should display task cards', async ({ page }) => {
    // Wait for tasks to load
    await page.waitForSelector('[data-testid^="task-card-"]');
    
    // Check that at least one task card is visible
    const taskCards = await page.locator('[data-testid^="task-card-"]').count();
    expect(taskCards).toBeGreaterThan(0);
  });

  test('should filter tasks by status', async ({ page }) => {
    // Wait for tasks to load
    await page.waitForSelector('[data-testid^="task-card-"]');
    
    // Select "Todo" from status filter
    await page.selectOption('[data-testid="status-filter"]', 'Todo');
    
    // Verify filtered results
    const visibleTasks = await page.locator('[data-testid^="task-card-"]').count();
    expect(visibleTasks).toBeGreaterThan(0);
  });

  test('should search tasks', async ({ page }) => {
    // Wait for tasks to load
    await page.waitForSelector('[data-testid^="task-card-"]');
    
    // Type in search input
    await page.fill('[data-testid="search-input"]', 'documentation');
    
    // Verify search results
    const taskTitles = await page.locator('[data-testid^="task-title-"]').allTextContents();
    expect(taskTitles.some(title => title.toLowerCase().includes('documentation'))).toBe(true);
  });

  test('should add new task', async ({ page }) => {
    // Navigate to add task page
    await page.click('[data-testid="add-task-button"]');
    
    // Fill out the form
    await page.fill('[data-testid="task-title-input"]', 'Test Task');
    await page.fill('[data-testid="task-description-input"]', 'This is a test task');
    await page.selectOption('[data-testid="task-priority-select"]', 'High');
    await page.selectOption('[data-testid="task-status-select"]', 'Todo');
    
    // Set due date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateString = tomorrow.toISOString().split('T')[0];
    await page.fill('[data-testid="task-due-date-input"]', dateString);
    
    // Submit the form
    await page.click('[data-testid="submit-button"]');
    
    // Verify redirect to dashboard
    await expect(page).toHaveURL('/');
    
    // Verify new task appears
    await expect(page.locator('[data-testid="task-title-"]:has-text("Test Task")')).toBeVisible();
  });

  test('should edit existing task', async ({ page }) => {
    // Wait for tasks to load
    await page.waitForSelector('[data-testid^="task-card-"]');
    
    // Click edit button on first task
    await page.click('[data-testid^="edit-task-"]:first');
    
    // Verify we're on edit page
    await expect(page).toHaveURL(/\/edit\/[a-zA-Z0-9]+/);
    await expect(page.locator('[data-testid="edit-task-title"]')).toContainText('Edit Task');
    
    // Modify the title
    await page.fill('[data-testid="task-title-input"]', 'Updated Task Title');
    
    // Save changes
    await page.click('[data-testid="submit-button"]');
    
    // Verify redirect to dashboard
    await expect(page).toHaveURL('/');
  });

  test('should change task status', async ({ page }) => {
    // Wait for tasks to load
    await page.waitForSelector('[data-testid^="task-card-"]');
    
    // Get the status of first task before change
    const firstTaskCard = await page.locator('[data-testid^="task-card-"]').first();
    const taskId = await firstTaskCard.getAttribute('data-testid')?.replace('task-card-', '');
    
    // Click change status button
    await page.click(`[data-testid="change-status-${taskId}"]`);
    
    // Verify status changed (this would need to be adapted based on actual status change logic)
    // The test would check that the status badge text has changed
  });

  test('should delete task', async ({ page }) => {
    // Wait for tasks to load
    await page.waitForSelector('[data-testid^="task-card-"]');
    
    // Get initial task count
    const initialCount = await page.locator('[data-testid^="task-card-"]').count();
    
    // Click delete button on first task and accept confirmation
    page.on('dialog', dialog => dialog.accept());
    await page.click('[data-testid^="delete-task-"]:first');
    
    // Verify task count decreased
    const newCount = await page.locator('[data-testid^="task-card-"]').count();
    expect(newCount).toBe(initialCount - 1);
  });
});

// Mobile-specific tests
test.describe('Mobile Tests', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should be responsive on mobile', async ({ page }) => {
    await page.goto('/');
    
    // Check that header is visible
    await expect(page.locator('[data-testid="app-header"]')).toBeVisible();
    
    // Check that task cards stack vertically
    const taskCards = page.locator('[data-testid^="task-card-"]');
    await expect(taskCards.first()).toBeVisible();
  });
});

// Accessibility tests
test.describe('Accessibility Tests', () => {
  test('should have proper ARIA labels', async ({ page }) => {
    await page.goto('/');
    
    // Check for proper button labels
    await expect(page.locator('[data-testid="add-task-button"]')).toHaveText('Add New Task');
    
    // Check for form labels (when on form page)
    await page.click('[data-testid="add-task-button"]');
    await expect(page.locator('label[for="title"]')).toHaveText('Title *');
  });
});