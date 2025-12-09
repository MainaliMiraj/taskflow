# Registration & OTP Test Cases

### TC-AUTH-01 Registration happy path with OTP
- Title: New user registers and verifies with OTP
- Environment: Chrome (latest) on macOS
- Severity: High | Priority: P1 | Type: Functional
- Preconditions: Unique email; SMTP available
- Steps to Reproduce:
  1. Go to `/register`
  2. Enter valid name, unique email, strong password meeting criteria
  3. Submit and capture OTP email
  4. Enter 6-digit OTP on `/verify-otp`
  5. Submit
- Expected Result: Success toast; redirected to `/login`; user `verified=true` and OTP cleared
- Actual Result: Not run yet

### TC-AUTH-02 Weak password blocked
- Title: Registration rejects weak passwords
- Environment: Firefox (latest) on Windows 10
- Severity: Medium | Priority: P2 | Type: Validation
- Preconditions: Unique email
- Steps to Reproduce:
  1. Go to `/register`
  2. Enter valid name/email; password missing uppercase/number/special
  3. Submit
- Expected Result: Error message for weak password; user not created
- Actual Result: Not run yet

### TC-AUTH-03 Duplicate email prevented
- Title: Registration prevents duplicate account
- Environment: Chrome (latest) on macOS
- Severity: Medium | Priority: P2 | Type: Validation
- Preconditions: Existing verified user email
- Steps to Reproduce:
  1. Go to `/register`
  2. Enter existing email with valid password
  3. Submit
- Expected Result: Error “user already exists” (409); stays on form
- Actual Result: Not run yet

### TC-AUTH-04 OTP invalid or partial
- Title: OTP entry requires correct 6 digits
- Environment: Chrome (latest) on macOS
- Severity: Medium | Priority: P2 | Type: Validation
- Preconditions: Pending user awaiting OTP
- Steps to Reproduce:
  1. On `/verify-otp`, enter wrong digits or fewer than 6
  2. Submit
- Expected Result: Inline error; user remains unverified
- Actual Result: Not run yet

### TC-AUTH-05 OTP expired
- Title: OTP cannot be used after 5 minutes
- Environment: Chrome (latest) on macOS
- Severity: Medium | Priority: P2 | Type: Expiry handling
- Preconditions: Pending user; wait >5 minutes or adjust expiry
- Steps to Reproduce:
  1. Request OTP
  2. Wait until expiry
  3. Enter correct OTP
- Expected Result: “OTP expired” message; user still unverified
- Actual Result: Not run yet

### TC-AUTH-06 Resend OTP placeholder
- Title: Resend OTP link does not break flow
- Environment: Chrome (latest) on macOS
- Severity: Low | Priority: P3 | Type: UX/Placeholder
- Preconditions: On `/verify-otp`
- Steps to Reproduce:
  1. Click “Resend OTP”
- Expected Result: No crash; note current behavior (if unimplemented)
- Actual Result: Not run yet
