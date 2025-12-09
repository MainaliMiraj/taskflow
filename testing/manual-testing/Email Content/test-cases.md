# Email Content Test Cases

### TC-EMAIL-01 OTP email content
- Title: OTP email contains code and expiry note
- Environment: Chrome (latest) on macOS; SMTP inbox
- Severity: Medium | Priority: P2 | Type: Content
- Preconditions: Register new user
- Steps to Reproduce:
  1. Register new account
  2. Check email/log
- Expected Result: Email contains 6-digit OTP, states 5-minute expiry, sender = `EMAIL_USER`
- Actual Result: Not run yet

### TC-EMAIL-02 Reset email content
- Title: Reset email contains correct link and expiry
- Environment: Firefox (latest) on Windows 10; SMTP inbox
- Severity: Medium | Priority: P2 | Type: Content
- Preconditions: Existing user requests reset
- Steps to Reproduce:
  1. Submit `/forgot-password`
  2. Check email/log
- Expected Result: Email link points to `${NEXT_PUBLIC_BASE_URL}/reset-password/{token}`; mentions 10-minute expiry
- Actual Result: Not run yet

### TC-EMAIL-03 SMTP failure handling
- Title: SMTP failure shows friendly error
- Environment: Chrome (latest) on macOS; SMTP misconfigured
- Severity: Low | Priority: P3 | Type: Error handling
- Preconditions: Temporarily break SMTP creds
- Steps to Reproduce:
  1. Attempt registration or reset with bad SMTP config
- Expected Result: User-friendly error/toast; app remains stable
- Actual Result: Not run yet
