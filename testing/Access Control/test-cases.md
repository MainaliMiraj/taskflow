# Access Control Test Cases

### TC-AC-01 Protected routes require auth
- Title: Protected routes redirect unauthenticated users
- Environment: Chrome (latest) on macOS
- Severity: High | Priority: P1 | Type: Access control
- Preconditions: Signed out (no `token` cookie)
- Steps to Reproduce:
  1. Navigate to `/dashboard`
  2. Navigate to `/add`
  3. Navigate to `/edit/placeholder`
  4. Navigate to `/dashboard/change-password`
- Expected Result: Each route redirects to `/login`
- Actual Result: Not run yet

### TC-AC-02 Public routes blocked when signed in
- Title: Public auth pages redirect authenticated users
- Environment: Chrome (latest) on macOS
- Severity: Medium | Priority: P2 | Type: Access control
- Preconditions: Valid login; `token` cookie set
- Steps to Reproduce:
  1. Visit `/login`
  2. Visit `/register`
  3. Visit `/forgot-password`
- Expected Result: Redirected to `/dashboard` from all three
- Actual Result: Not run yet

### TC-AC-03 OTP route allowed pre-auth
- Title: OTP verify page accessible only for unsigned users
- Environment: Chrome (latest) on macOS
- Severity: Medium | Priority: P2 | Type: Access control
- Preconditions: Signed out; have pending registration email parameter
- Steps to Reproduce:
  1. Visit `/verify-otp?email=newuser@example.com` while signed out
  2. Visit same URL while signed in
- Expected Result: Accessible when signed out; redirects to `/dashboard` when signed in
- Actual Result: Not run yet
