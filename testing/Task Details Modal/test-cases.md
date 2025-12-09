# Task Details Modal Test Cases

### TC-TASK-11 Open/close modal
- Title: Task details modal opens and closes correctly
- Environment: Chrome (latest) on macOS
- Severity: Medium | Priority: P2 | Type: UI/Functional
- Preconditions: At least one task
- Steps to Reproduce:
  1. Click a task card
  2. Press Esc or click X
- Expected Result: Modal shows title/desc/dates/priority/status; closes via Esc/X
- Actual Result: Not run yet

### TC-TASK-12 Description toggle
- Title: Long descriptions can expand/collapse
- Environment: Firefox (latest) on Windows 10
- Severity: Low | Priority: P3 | Type: UX
- Preconditions: Task with >200 chars description
- Steps to Reproduce:
  1. Open modal
  2. Click “See more/less”
- Expected Result: Text toggles between truncated and full
- Actual Result: Not run yet

### TC-TASK-13 Change status from modal
- Title: Modal status buttons update task
- Environment: Chrome (latest) on macOS
- Severity: High | Priority: P1 | Type: Functional
- Preconditions: Task not already in target status
- Steps to Reproduce:
  1. Open modal
  2. Click a different status button
- Expected Result: Status updates; button disabled for active status; dashboard counts refresh
- Actual Result: Not run yet

### TC-TASK-14 Delete from modal
- Title: Modal delete removes task after confirm
- Environment: Chrome (latest) on macOS
- Severity: High | Priority: P1 | Type: Functional
- Preconditions: Existing task
- Steps to Reproduce:
  1. Open modal
  2. Click Delete; confirm
- Expected Result: Task removed from board; counts update
- Actual Result: Not run yet

### TC-TASK-15 Edit from modal
- Title: Modal Edit navigates to edit page
- Environment: Firefox (latest) on Windows 10
- Severity: Medium | Priority: P2 | Type: Navigation
- Preconditions: Existing task
- Steps to Reproduce:
  1. Open modal
  2. Click Edit Task
- Expected Result: Navigates to `/edit/{id}` with data loaded
- Actual Result: Not run yet
