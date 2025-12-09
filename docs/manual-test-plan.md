# Manual Test Cases (GitHub Friendly)

Project: Taskflow (Next.js + MongoDB)  
Audience: Recruiters / Manual QA  
Execution Status: Actual Result = “Not run yet” until test is executed.

## Test Environment
- App: Local dev (`npm run dev`)
- DB: MongoDB clean schema; seeded tasks for User A
- SMTP: Valid credentials to receive OTP/reset emails (or inspect SMTP logs)
- Browsers: Chrome, Firefox, Safari (latest)
- Viewports: Desktop 1440px; Mobile 390px
- Accounts: User A (verified, has tasks); User B (new registration)

---

## Access Control

### TC-AC-01 Protected routes require auth
- Title: Protected routes redirect unauthenticated users
- Environment: Chrome (latest) on macOS
- Severity: High | Priority: P1 | Type: Access control
- Preconditions: Signed out (no `token` cookie)
- Steps to Reproduce:
  1. Navigate directly to `/dashboard`
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

---

## Registration & OTP

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

---

## Login & Session

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

---

## Forgot / Reset Password

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

---

## Change Password (Authenticated)

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

---

## Dashboard & Search

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

---

## Task Creation

### TC-TASK-04 Create task happy path
- Title: Task can be created with valid data
- Environment: Chrome (latest) on macOS
- Severity: High | Priority: P1 | Type: Functional
- Preconditions: Logged in
- Steps to Reproduce:
  1. Go to `/add`
  2. Fill title, description, priority, status, future due date
  3. Submit
- Expected Result: Success; redirect to `/dashboard`; new card shows correct fields
- Actual Result: Not run yet

### TC-TASK-05 Create validation
- Title: Creation enforces required fields and date rules
- Environment: Chrome (latest) on macOS
- Severity: High | Priority: P1 | Type: Validation
- Preconditions: Logged in
- Steps to Reproduce:
  1. Submit with blank title
  2. Submit with empty due date
  3. Submit with past due date
- Expected Result: Errors: “Title is required”; “Due date is required”; “Due date cannot be in the past”; no task created
- Actual Result: Not run yet

### TC-TASK-06 Cancel creation
- Title: Cancel leaves no task created
- Environment: Firefox (latest) on Windows 10
- Severity: Low | Priority: P3 | Type: UX
- Preconditions: On `/add` with partially filled form
- Steps to Reproduce:
  1. Click Cancel
- Expected Result: Returns to `/dashboard`; no new task saved
- Actual Result: Not run yet

---

## Task Editing

### TC-TASK-07 Edit form loads existing task
- Title: Edit page shows skeleton then populated form
- Environment: Chrome (latest) on macOS
- Severity: Medium | Priority: P2 | Type: Functional
- Preconditions: Existing task ID
- Steps to Reproduce:
  1. Visit `/edit/{id}`
- Expected Result: Loader shown; fields prefilled with task data
- Actual Result: Not run yet

### TC-TASK-08 Edit and save task
- Title: Task updates persist
- Environment: Chrome (latest) on macOS
- Severity: High | Priority: P1 | Type: Functional
- Preconditions: Existing task ID
- Steps to Reproduce:
  1. Modify title/description/status/priority/due date
  2. Confirm update when prompted
  3. Submit
- Expected Result: Success; redirect to `/dashboard`; card reflects updates
- Actual Result: Not run yet

### TC-TASK-09 Cancel edit
- Title: Edit cancel confirms and discards changes
- Environment: Firefox (latest) on Windows 10
- Severity: Low | Priority: P3 | Type: UX
- Preconditions: Editing existing task
- Steps to Reproduce:
  1. Make changes
  2. Click Cancel; confirm discard
- Expected Result: Returns to `/dashboard`; task unchanged
- Actual Result: Not run yet

### TC-TASK-10 Invalid task ID
- Title: Edit page handles missing task gracefully
- Environment: Chrome (latest) on macOS
- Severity: Medium | Priority: P2 | Type: Error handling
- Preconditions: Nonexistent task ID
- Steps to Reproduce:
  1. Visit `/edit/badid`
- Expected Result: “Task Not Found” view; Back to Dashboard button works
- Actual Result: Not run yet

---

## Task Details Modal

### TC-TASK-11 Open/close modal
- Title: Task details modal opens and closes correctly
- Environment: Chrome (latest) on macOS
- Severity: Medium | Priority: P2 | Type: UI/Functional
- Preconditions: At least one task
- Steps to Reproduce:
  1. Click a task card
  2. Press Esc or click X
- Expected Result: Modal shows title/desc/dates/priority/status; closes via Esc/X
- Actual Result: Not run yet

### TC-TASK-12 Description toggle
- Title: Long descriptions can expand/collapse
- Environment: Firefox (latest) on Windows 10
- Severity: Low | Priority: P3 | Type: UX
- Preconditions: Task with >200 chars description
- Steps to Reproduce:
  1. Open modal
  2. Click “See more/less”
- Expected Result: Text toggles between truncated and full
- Actual Result: Not run yet

### TC-TASK-13 Change status from modal
- Title: Modal status buttons update task
- Environment: Chrome (latest) on macOS
- Severity: High | Priority: P1 | Type: Functional
- Preconditions: Task not already in target status
- Steps to Reproduce:
  1. Open modal
  2. Click a different status button
- Expected Result: Status updates; button disabled for active status; dashboard counts refresh
- Actual Result: Not run yet

### TC-TASK-14 Delete from modal
- Title: Modal delete removes task after confirm
- Environment: Chrome (latest) on macOS
- Severity: High | Priority: P1 | Type: Functional
- Preconditions: Existing task
- Steps to Reproduce:
  1. Open modal
  2. Click Delete; confirm
- Expected Result: Task removed from board; counts update
- Actual Result: Not run yet

### TC-TASK-15 Edit from modal
- Title: Modal Edit navigates to edit page
- Environment: Firefox (latest) on Windows 10
- Severity: Medium | Priority: P2 | Type: Navigation
- Preconditions: Existing task
- Steps to Reproduce:
  1. Open modal
  2. Click Edit Task
- Expected Result: Navigates to `/edit/{id}` with data loaded
- Actual Result: Not run yet

---

## Drag & Drop

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

---

## Security & Ownership

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

---

## Email Content

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

---

## UX & Accessibility

### TC-UX-01 Navbar navigation
- Title: Navbar links route correctly and reflect auth state
- Environment: Chrome (latest) on macOS
- Severity: Medium | Priority: P2 | Type: Navigation/UX
- Preconditions: Check both signed-in and signed-out
- Steps to Reproduce:
  1. Click nav links relevant to state (login/register vs dashboard/logout)
- Expected Result: Correct routing; auth-aware options shown
- Actual Result: Not run yet

### TC-UX-02 Keyboard navigation
- Title: Forms usable via keyboard
- Environment: Firefox (latest) on Windows 10
- Severity: Medium | Priority: P2 | Type: Accessibility
- Preconditions: None
- Steps to Reproduce:
  1. Tab through form fields
  2. Press Enter to submit
- Expected Result: Focus rings visible; submission works; no traps
- Actual Result: Not run yet

### TC-UX-03 Mobile layout
- Title: Mobile view remains usable
- Environment: Chrome mobile emulation (390px)
- Severity: Medium | Priority: P2 | Type: Responsive UI
- Preconditions: None
- Steps to Reproduce:
  1. Resize/emulate 390px width
  2. Use dashboard, modal, forms
- Expected Result: Columns stack; modal scrolls; controls usable without overlap
- Actual Result: Not run yet

### TC-UX-04 Loaders and toasts
- Title: Async actions show feedback
- Environment: Chrome (latest) on macOS
- Severity: Low | Priority: P3 | Type: UX
- Preconditions: Trigger async flows
- Steps to Reproduce:
  1. Observe login, create/edit task, change password actions
- Expected Result: Spinners/toasts visible during requests; clear on completion
- Actual Result: Not run yet

### TC-UX-05 Button/focus states
- Title: Buttons/links show hover and focus cues
- Environment: Firefox (latest) on Windows 10
- Severity: Low | Priority: P3 | Type: UX
- Preconditions: None
- Steps to Reproduce:
  1. Hover and Tab to primary/secondary buttons and links
- Expected Result: Visible hover/focus styles; text not clipped
- Actual Result: Not run yet

---

## Error Handling

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

---

## Execution Notes
- Clear cookies between auth scenarios; use fresh emails for registration tests.
- Capture evidence: screenshots for UI states, console/network logs for API validation, email snippets for OTP/reset.
- Track results per TC ID; file defects referencing the failed TC ID and observed Actual Result. 
