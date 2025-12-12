# Login & Session Test Cases

### TC-AUTH-07 Login success
- Title: Verified user can log in
- Environment: Chrome (latest) on macOS
- Severity: High | Priority: P1 | Type: Functional
- Preconditions: Verified user exists
- Steps to Reproduce:
  1. Go to `/login`
  2. Enter correct email/password
  3. Submit
- Expected Result: Success toast; redirected to `/dashboard`; httpOnly `token` set
- Actual Result: Not run yet

### TC-AUTH-08 Unverified user blocked
- Title: Unverified accounts cannot log in
- Environment: Chrome (latest) on macOS
- Severity: High | Priority: P1 | Type: Security/Validation
- Preconditions: User registered but not verified
- Steps to Reproduce:
  1. Attempt login with unverified account
- Expected Result: 403 message “verify your email”; no cookie set
- Actual Result: Not run yet

### TC-AUTH-09 Wrong credentials
- Title: Invalid email/password rejected
- Environment: Firefox (latest) on Windows 10
- Severity: Medium | Priority: P2 | Type: Validation
- Preconditions: None
- Steps to Reproduce:
  1. Go to `/login`
  2. Enter incorrect email or password
  3. Submit
- Expected Result: 401 message; no cookie
- Actual Result: Not run yet

### TC-AUTH-10 Logout clears session
- Title: Logout removes auth token
- Environment: Chrome (latest) on macOS
- Severity: High | Priority: P1 | Type: Session management
- Preconditions: Logged in
- Steps to Reproduce:
  1. Trigger logout (UI/API)
  2. Attempt visiting `/dashboard`
- Expected Result: Token cleared; redirected to `/login`
- Actual Result: Not run yet
