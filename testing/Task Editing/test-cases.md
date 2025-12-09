# Task Editing Test Cases

### TC-TASK-07 Edit form loads existing task
- Title: Edit page shows skeleton then populated form
- Environment: Chrome (latest) on macOS
- Severity: Medium | Priority: P2 | Type: Functional
- Preconditions: Existing task ID
- Steps to Reproduce:
  1. Visit `/edit/{id}`
- Expected Result: Loader shown; fields prefilled with task data
- Actual Result: Not run yet

### TC-TASK-08 Edit and save task
- Title: Task updates persist
- Environment: Chrome (latest) on macOS
- Severity: High | Priority: P1 | Type: Functional
- Preconditions: Existing task ID
- Steps to Reproduce:
  1. Modify title/description/status/priority/due date
  2. Confirm update when prompted
  3. Submit
- Expected Result: Success; redirect to `/dashboard`; card reflects updates
- Actual Result: Not run yet

### TC-TASK-09 Cancel edit
- Title: Edit cancel confirms and discards changes
- Environment: Firefox (latest) on Windows 10
- Severity: Low | Priority: P3 | Type: UX
- Preconditions: Editing existing task
- Steps to Reproduce:
  1. Make changes
  2. Click Cancel; confirm discard
- Expected Result: Returns to `/dashboard`; task unchanged
- Actual Result: Not run yet

### TC-TASK-10 Invalid task ID
- Title: Edit page handles missing task gracefully
- Environment: Chrome (latest) on macOS
- Severity: Medium | Priority: P2 | Type: Error handling
- Preconditions: Nonexistent task ID
- Steps to Reproduce:
  1. Visit `/edit/badid`
- Expected Result: “Task Not Found” view; Back to Dashboard button works
- Actual Result: Not run yet
