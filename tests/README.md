# Testing Guide

This directory contains test files for the Task Management App. The app is designed to be test-friendly with comprehensive `data-testid` attributes throughout the UI.

## Test Structure

```
tests/
├── example.spec.ts       # Example test file with common test scenarios
├── dashboard.spec.ts     # Dashboard-specific tests (create this)
├── add-task.spec.ts      # Add task form tests (create this)
├── edit-task.spec.ts     # Edit task form tests (create this)
└── README.md            # This file
```

## Running Tests

### Install Playwright
```bash
npx playwright install
```

### Run All Tests
```bash
npm test
```

### Run Tests in UI Mode
```bash
npm test -- --ui
```

### Run Tests in Headed Mode
```bash
npm test -- --headed
```

### Run Specific Test File
```bash
npm test -- tests/dashboard.spec.ts
```

### Run Tests on Specific Browser
```bash
npm test -- --project=chromium
npm test -- --project=firefox
npm test -- --project=webkit
```

## Test Data

The app comes with pre-loaded mock data:
- 5 sample tasks with different priorities and statuses
- Tasks have realistic titles, descriptions, and due dates
- All data is reset on page refresh (no persistence)

## Test Scenarios

### Dashboard Tests
- [ ] Verify header navigation
- [ ] Test task card display
- [ ] Test filtering by status
- [ ] Test filtering by priority
- [ ] Test search functionality
- [ ] Test sorting options
- [ ] Test responsive design

### Add Task Tests
- [ ] Form validation (required fields)
- [ ] Date validation (no past dates)
- [ ] Successful task creation
- [ ] Cancel button functionality
- [ ] Form reset after submission

### Edit Task Tests
- [ ] Pre-populated form fields
- [ ] Form validation
- [ ] Successful task update
- [ ] Cancel button functionality
- [ ] Non-existent task handling

### Task Operations Tests
- [ ] Status change functionality
- [ ] Delete task with confirmation
- [ ] Edit task navigation
- [ ] Task card interactions

## Test Data Attributes

All interactive elements have `data-testid` attributes for reliable test selection:

### Navigation
- `app-header` - Main header
- `nav-dashboard` - Dashboard link
- `nav-add-task` - Add task link

### Task Cards
- `task-card-{id}` - Individual task card
- `task-title-{id}` - Task title
- `task-description-{id}` - Task description
- `task-priority-{id}` - Priority badge
- `task-status-{id}` - Status badge
- `task-due-date-{id}` - Due date
- `task-created-date-{id}` - Created date
- `edit-task-{id}` - Edit button
- `delete-task-{id}` - Delete button
- `change-status-{id}` - Status change button

### Forms
- `task-form` - Main form
- `task-title-input` - Title input field
- `task-description-input` - Description textarea
- `task-priority-select` - Priority dropdown
- `task-status-select` - Status dropdown
- `task-due-date-input` - Due date picker
- `submit-button` - Form submit button
- `cancel-button` - Form cancel button

### Filters and Search
- `status-filter` - Status filter dropdown
- `priority-filter` - Priority filter dropdown
- `clear-filters` - Clear filters button
- `search-input` - Search input field
- `clear-search` - Clear search button
- `sort-by-select` - Sort dropdown
- `sort-order-button` - Sort order toggle

## Writing New Tests

1. Create a new test file in the `tests/` directory
2. Import necessary modules from Playwright
3. Use `data-testid` selectors for element interaction
4. Follow the existing test patterns in `example.spec.ts`
5. Add descriptive test names and comments

### Example Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should do something', async ({ page }) => {
    // Arrange
    await page.click('[data-testid="some-button"]');
    
    // Act
    await page.fill('[data-testid="some-input"]', 'test value');
    await page.click('[data-testid="submit-button"]');
    
    // Assert
    await expect(page.locator('[data-testid="result"]')).toHaveText('expected result');
  });
});
```

## Best Practices

1. **Use data-testid selectors** instead of CSS classes or text content
2. **Wait for elements** before interacting with them
3. **Use descriptive test names** that explain what is being tested
4. **Group related tests** using describe blocks
5. **Clean up after tests** if they modify data
6. **Test both positive and negative scenarios**
7. **Include accessibility tests** where appropriate

## Troubleshooting

### Tests are flaky
- Add explicit waits: `await page.waitForSelector('[data-testid="element"]')`
- Use `page.waitForLoadState()` after navigation
- Increase timeout for slow operations

### Elements not found
- Verify the `data-testid` attribute exists
- Check if the element is in a different frame
- Ensure the page has fully loaded

### Tests fail in CI but pass locally
- Check browser versions match
- Verify environment variables
- Increase timeouts for slower CI environment

## Additional Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Next.js Testing Documentation](https://nextjs.org/docs/testing)
- [Testing Library Documentation](https://testing-library.com/docs/)

## Support

For testing-related questions:
1. Check the Playwright documentation
2. Review existing test files for examples
3. Open an issue for test framework problems