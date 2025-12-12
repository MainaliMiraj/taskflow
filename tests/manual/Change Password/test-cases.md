# Change Password (Authenticated) Test Cases

### TC-PW-07 New password confirmation mismatch
- Title: Change password requires matching confirmation
- Environment: Chrome (latest) on macOS
- Severity: Medium | Priority: P2 | Type: Validation
- Preconditions: Logged in
- Steps to Reproduce:
  1. Go to `/dashboard/change-password`
  2. Enter current password
  3. Enter two different new passwords
  4. Submit
- Expected Result: Inline error “passwords do not match”; no request sent
- Actual Result: Not run yet

### TC-PW-08 Wrong current password
- Title: Current password validated before change
- Environment: Chrome (latest) on macOS
- Severity: High | Priority: P1 | Type: Security
- Preconditions: Logged in
- Steps to Reproduce:
  1. Enter wrong current password and valid new password
  2. Submit
- Expected Result: 400 error “incorrect current password”; no change
- Actual Result: Not run yet

### TC-PW-09 Weak new password rejected
- Title: New password must meet strength rules
- Environment: Firefox (latest) on Windows 10
- Severity: Medium | Priority: P2 | Type: Validation
- Preconditions: Logged in
- Steps to Reproduce:
  1. Enter correct current password
  2. Enter weak new password (fails regex)
  3. Submit
- Expected Result: Error with strength guidance; no change
- Actual Result: Not run yet

### TC-PW-10 Change password happy path
- Title: Password change succeeds and logs out user
- Environment: Chrome (latest) on macOS
- Severity: High | Priority: P1 | Type: Functional
- Preconditions: Logged in
- Steps to Reproduce:
  1. Enter correct current password
  2. Enter strong matching new password/confirm
  3. Submit
  4. Attempt to access `/dashboard`
- Expected Result: Success toast; token cleared; must log in with new password
- Actual Result: Not run yet
