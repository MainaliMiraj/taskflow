# Security & Ownership Test Cases

### TC-SEC-01 Task ownership enforced
- Title: User cannot access another user’s tasks
- Environment: Chrome (latest) on macOS
- Severity: Critical | Priority: P0 | Type: Security
- Preconditions: User A and User B accounts; known task ID of User B
- Steps to Reproduce:
  1. Login as User A
  2. Call `/api/tasks/{userBTaskId}` GET/PUT/DELETE
- Expected Result: 401/404; no data returned or modified
- Actual Result: Not run yet

### TC-SEC-02 Tampered token rejected
- Title: Invalid JWT denied by APIs and middleware
- Environment: Chrome (latest) on macOS
- Severity: Critical | Priority: P0 | Type: Security
- Preconditions: Tampered/expired token
- Steps to Reproduce:
  1. Set invalid `token` cookie
  2. Visit `/dashboard` and call task APIs
- Expected Result: Redirect to `/login`; APIs return 401
- Actual Result: Not run yet

### TC-SEC-03 Authenticated profile
- Title: `/api/me` returns only current user when authenticated
- Environment: Chrome (latest) on macOS
- Severity: Medium | Priority: P2 | Type: Security
- Preconditions: Logged in
- Steps to Reproduce:
  1. Call `/api/me`
  2. Clear cookies; call again
- Expected Result: First call returns user name/email; second returns 401
- Actual Result: Not run yet
