# Drag & Drop Test Cases

### TC-TASK-16 Move task between columns
- Title: Drag-and-drop updates status and persists
- Environment: Chrome (latest) on macOS
- Severity: High | Priority: P1 | Type: Functional
- Preconditions: Task in Pending; logged in
- Steps to Reproduce:
  1. Drag task from Pending to In Progress/Completed
  2. Refresh page
- Expected Result: Task appears in new column; counts updated; status persisted
- Actual Result: Not run yet

### TC-TASK-17 Invalid drop no-op
- Title: Dragging to same column does nothing
- Environment: Firefox (latest) on Windows 10
- Severity: Low | Priority: P3 | Type: Functional
- Preconditions: Task present
- Steps to Reproduce:
  1. Drag task within same column or outside drop target
- Expected Result: No status change; no errors
- Actual Result: Not run yet

### TC-TASK-18 Drag highlight resets
- Title: Column highlight clears on drag end
- Environment: Chrome (latest) on macOS
- Severity: Low | Priority: P3 | Type: UX
- Preconditions: Any draggable task
- Steps to Reproduce:
  1. Start drag over column
  2. End drag without drop
- Expected Result: Highlight/hover state clears; UI returns to idle
- Actual Result: Not run yet
