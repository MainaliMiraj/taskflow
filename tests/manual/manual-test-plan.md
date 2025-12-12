# Manual Test Suite Index

The manual test cases now live in the `testing/` directory, grouped by feature for easy review and execution tracking (Actual Result fields start as “Not run yet”).

## Environment (shared across suites)
- App: `npm run dev`
- DB: MongoDB (clean schema); seed User A with tasks
- SMTP: Valid creds to receive OTP/reset emails (or inspect SMTP logs)
- Browsers: Chrome, Firefox, Safari (latest)
- Viewports: Desktop 1440px; Mobile 390px
- Accounts: User A (verified, has tasks), User B (new registration for OTP flows)

## Suite Map
- Access Control — `testing/Access Control/test-cases.md`
- Registration & OTP — `testing/Registration & OTP/test-cases.md`
- Login & Session — `testing/Login & Session/test-cases.md`
- Forgot Reset Password — `testing/Forgot Reset Password/test-cases.md`
- Change Password — `testing/Change Password/test-cases.md`
- Dashboard & Search — `testing/Dashboard & Search/test-cases.md`
- Task Creation — `testing/Task Creation/test-cases.md`
- Task Editing — `testing/Task Editing/test-cases.md`
- Task Details Modal — `testing/Task Details Modal/test-cases.md`
- Drag & Drop — `testing/Drag & Drop/test-cases.md`
- Security & Ownership — `testing/Security & Ownership/test-cases.md`
- Email Content — `testing/Email Content/test-cases.md`
- UX & Accessibility — `testing/UX & Accessibility/test-cases.md`
- Error Handling — `testing/Error Handling/test-cases.md`

## Notes
- Clear cookies between auth scenarios; use fresh emails for registration tests.
- Capture screenshots/logs for evidence; tag defects with the TC IDs from the per-area files.
