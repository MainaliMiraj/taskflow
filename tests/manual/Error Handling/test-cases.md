# Error Handling Test Cases

### TC-ERR-01 Backend unavailable
- Title: Friendly error when DB/server down
- Environment: Chrome (latest) on macOS
- Severity: High | Priority: P1 | Type: Error handling
- Preconditions: Temporarily stop DB or API
- Steps to Reproduce:
  1. Attempt dashboard load or task create while backend is down
- Expected Result: User-friendly error; no stack traces; UI remains usable
- Actual Result: Not run yet

### TC-ERR-02 Network failure during create/edit
- Title: Form retains data on failure
- Environment: Chrome (latest) on macOS
- Severity: Medium | Priority: P2 | Type: Resilience
- Preconditions: Induce offline/throttling
- Steps to Reproduce:
  1. Start creating or editing a task
  2. Cut network; submit
- Expected Result: Spinner clears; toast shows failure; form data preserved
- Actual Result: Not run yet

### TC-ERR-03 Expired session mid-use
- Title: Expired auth redirects gracefully
- Environment: Firefox (latest) on Windows 10
- Severity: Medium | Priority: P2 | Type: Session handling
- Preconditions: Let token expire or remove server-side
- Steps to Reproduce:
  1. While on dashboard, trigger an API call after expiry
- Expected Result: API 401; UI redirects to `/login` without crash
- Actual Result: Not run yet
