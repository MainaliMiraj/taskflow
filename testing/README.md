# Testing Index

Purpose: Organized manual test cases for Taskflow, grouped by functional area.
Status: Actual Result fields are “Not run yet” until execution.

## How to Use
- Review environment and data needs below before running any suite.
- Open the relevant folder and follow the `test-cases.md`.
- Record outcomes in the `Actual Result` lines; keep IDs for defect linkage.

## Environment
- App: `npm run dev`
- DB: MongoDB (clean schema); seed User A with tasks
- SMTP: Valid creds to receive OTP/reset emails (or inspect SMTP logs)
- Browsers: Chrome, Firefox, Safari (latest)
- Viewports: Desktop 1440px; Mobile 390px
- Accounts:
  - User A (verified, has tasks)
  - User B (new registration for OTP tests)

## Folders
- Access Control
- Registration & OTP
- Login & Session
- Forgot Reset Password
- Change Password
- Dashboard & Search
- Task Creation
- Task Editing
- Task Details Modal
- Drag & Drop
- Security & Ownership
- Email Content
- UX & Accessibility
- Error Handling
