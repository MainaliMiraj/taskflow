# Task Creation Test Cases

### TC-TASK-04 Create task happy path
- Title: Task can be created with valid data
- Environment: Chrome (latest) on macOS
- Severity: High | Priority: P1 | Type: Functional
- Preconditions: Logged in
- Steps to Reproduce:
  1. Go to `/add`
  2. Fill title, description, priority, status, future due date
  3. Submit
- Expected Result: Success; redirect to `/dashboard`; new card shows correct fields
- Actual Result: Not run yet

### TC-TASK-05 Create validation
- Title: Creation enforces required fields and date rules
- Environment: Chrome (latest) on macOS
- Severity: High | Priority: P1 | Type: Validation
- Preconditions: Logged in
- Steps to Reproduce:
  1. Submit with blank title
  2. Submit with empty due date
  3. Submit with past due date
- Expected Result: Errors: “Title is required”; “Due date is required”; “Due date cannot be in the past”; no task created
- Actual Result: Not run yet

### TC-TASK-06 Cancel creation
- Title: Cancel leaves no task created
- Environment: Firefox (latest) on Windows 10
- Severity: Low | Priority: P3 | Type: UX
- Preconditions: On `/add` with partially filled form
- Steps to Reproduce:
  1. Click Cancel
- Expected Result: Returns to `/dashboard`; no new task saved
- Actual Result: Not run yet
