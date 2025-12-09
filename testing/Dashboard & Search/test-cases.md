# Dashboard & Search Test Cases

### TC-TASK-01 Dashboard initial state
- Title: Dashboard loads counts and empty states
- Environment: Chrome (latest) on macOS
- Severity: Medium | Priority: P2 | Type: Functional/UI
- Preconditions: Logged in; optionally zero tasks
- Steps to Reproduce:
  1. Visit `/dashboard`
- Expected Result: Columns render with counts; empty-state messaging for empty columns
- Actual Result: Not run yet

### TC-TASK-02 Search returns matches
- Title: Search filters by title/description (case-insensitive)
- Environment: Chrome (latest) on macOS
- Severity: Medium | Priority: P2 | Type: Functional
- Preconditions: Tasks exist with known keywords
- Steps to Reproduce:
  1. Enter keyword in search bar; submit or press Enter
  2. Observe list
- Expected Result: Only matching tasks displayed; counts reflect filtered set
- Actual Result: Not run yet

### TC-TASK-03 Search no results
- Title: Search shows empty state when no matches
- Environment: Firefox (latest) on Windows 10
- Severity: Low | Priority: P3 | Type: UX
- Preconditions: Any tasks
- Steps to Reproduce:
  1. Enter gibberish query
  2. Submit
- Expected Result: Zero results; empty-state message; counts zero
- Actual Result: Not run yet
