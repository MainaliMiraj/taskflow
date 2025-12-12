# Forgot / Reset Password Test Cases

### TC-PW-01 Request reset (existing user)
- Title: Password reset email sent for valid user
- Environment: Chrome (latest) on macOS
- Severity: High | Priority: P1 | Type: Functional
- Preconditions: Existing user; SMTP active
- Steps to Reproduce:
  1. Go to `/forgot-password`
  2. Enter registered email; submit
  3. Check inbox/log for reset link
- Expected Result: Success message; reset token created; email contains link
- Actual Result: Not run yet

### TC-PW-02 Request reset (unknown email)
- Title: Unknown email yields generic response
- Environment: Firefox (latest) on Windows 10
- Severity: Medium | Priority: P3 | Type: Security/Privacy
- Preconditions: None
- Steps to Reproduce:
  1. Submit non-existent email on `/forgot-password`
- Expected Result: Same generic success message; no account created
- Actual Result: Not run yet

### TC-PW-03 Reset password success
- Title: Valid token allows password reset
- Environment: Chrome (latest) on macOS
- Severity: High | Priority: P1 | Type: Functional
- Preconditions: Valid reset token; token unexpired
- Steps to Reproduce:
  1. Open `/reset-password/{token}`
  2. Enter strong new password; submit
  3. Login with new password; try old password
- Expected Result: Success message; login works with new password; old password fails
- Actual Result: Not run yet

### TC-PW-04 Invalid/expired token
- Title: Reset fails with invalid or expired token
- Environment: Chrome (latest) on macOS
- Severity: High | Priority: P1 | Type: Security
- Preconditions: Tampered or expired token
- Steps to Reproduce:
  1. Open `/reset-password/{badToken}`
  2. Enter password; submit
- Expected Result: Error “Invalid or expired token”; password unchanged
- Actual Result: Not run yet

### TC-PW-05 Token reuse blocked
- Title: Consumed reset token cannot be reused
- Environment: Chrome (latest) on macOS
- Severity: Medium | Priority: P2 | Type: Security
- Preconditions: Token already used once
- Steps to Reproduce:
  1. Use valid token to reset password
  2. Reopen same link and submit again
- Expected Result: Error; no password change
- Actual Result: Not run yet

### TC-PW-06 Password visibility toggle
- Title: Toggle show/hide password on reset form
- Environment: Firefox (latest) on Windows 10
- Severity: Low | Priority: P3 | Type: UX
- Preconditions: On reset form
- Steps to Reproduce:
  1. Click show/hide control while typing password
- Expected Result: Input switches between masked and clear text
- Actual Result: Not run yet
