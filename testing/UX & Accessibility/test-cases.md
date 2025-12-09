# UX & Accessibility Test Cases

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
