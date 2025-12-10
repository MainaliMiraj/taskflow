# **Taskflow – Modern Task Management Platform**

A production-grade task board built on the **Next.js App Router**, **Tailwind CSS**, and a secure **MongoDB backend**. Taskflow now includes OTP-backed registration, JWT cookies for sessions, and strong password tooling to keep workspaces safe.

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-222222?style=for-the-badge&logo=react&logoColor=61dafb" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/MongoDB-0f5132?style=for-the-badge&logo=mongodb&logoColor=4ea94b" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/Bcrypt-3465a4?style=for-the-badge&logo=key&logoColor=white" alt="Bcrypt" />
  <img src="https://img.shields.io/badge/Nodemailer-00B200?style=for-the-badge&logo=gmail&logoColor=white" alt="Nodemailer" />
</p>

---

## **Table of Contents**

1. [Key Highlights](#key-highlights)
2. [Product Tour](#product-tour)
3. [Architecture](#architecture)
4. [Project Structure](#project-structure)
5. [Getting Started](#getting-started)
6. [Environment Variables](#environment-variables)
7. [API Overview](#api-overview)
8. [Testing](#testing)
9. [Manual QA Checklist](#manual-qa-checklist)
10. [Contributing](#contributing)
11. [License](#license)

---

## **Key Highlights**

- **OTP-verified signup** – 6-digit codes (5-minute expiry) sent via Nodemailer before accounts can log in.
- **JWT-secured sessions** – Login, logout, change password, and password reset all use HTTP-only cookies for safety.
- **Kanban-style task board** – Drag-and-drop columns with counts, debounced search, and empty states tuned for clarity.
- **Task modal workflow** – Unified add/edit/view surface with validation, inline status changes, and delete confirmations.
- **Strong password enforcement** – Regex validation on registration and change-password flows, with forced re-login after update.
- **Testable from day one** – Manual test suites plus a ready-to-import Postman collection for API coverage.

---

## **Product Tour**

### **Authentication & Security**

- Registration issues a **6-digit OTP**; verification lives at `/verify-otp?email=<user>`.
- Login sets a JWT in an **HTTP-only cookie**; logout clears it.
- Change password UI at `/dashboard/update-password` calls a secure API and forces a new session.
- Forgot/reset flow emails a **time-limited link**: request at `/forgot-password`, reset at `/reset-password/[token]`.

### **Dashboard & Task Board**

- `/dashboard` groups tasks by status (Pending, In Progress, Completed) with drag-and-drop moves.
- Debounced search filters by title and description; counts update live per column.
- Task cards surface priority, due date, timestamps, and a truncated description.

### **Task Creation & Editing**

- A single modal drives add/edit/view/delete and status shortcuts.
- Field validation guards invalid dates and empty inputs.
- Search results stay in sync after every CRUD action.

---

## **Architecture**

- **Frontend** – Next.js App Router with a mix of server and client components.
- **API Layer** – Route handlers under `app/api`, each validating JWT cookies for ownership.
- **Database** – MongoDB with Mongoose models for `User` and `Task`.
- **Auth Strategy** – Stateless JWT (HTTP-only cookie) plus OTP verification before first login.
- **Email System** – Nodemailer (Gmail-ready) for OTP dispatch and password reset links.

---

## **Project Structure**

```
taskflow/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/             # issue JWT cookie
│   │   │   ├── logout/            # clear session cookie
│   │   │   ├── register/          # create user + send OTP
│   │   │   ├── verify-otp/        # validate 6-digit code
│   │   │   ├── forgot-password/   # email reset token
│   │   │   ├── reset-password/    # reset via token
│   │   │   └── change-password/   # update password (JWT required)
│   │   ├── me/                    # profile endpoint
│   │   └── tasks/                 # list/create + /[id] CRUD
│   ├── dashboard/                 # kanban board + modals
│   │   └── update-password/       # UI for password change
│   ├── login/ • register/ • verify-otp/ • forgot-password/
│   └── reset-password/[token]/    # reset UI
├── components/                    # TaskCard, TaskModal, Navbar, etc.
├── hooks/                         # data fetching, forms, dnd helpers
├── lib/                           # Mongo connection, auth helpers
├── models/                        # User + Task schemas
├── testing/                       # Manual suites + Postman collection
└── docs/manual-test-plan.md       # Suite index & environment notes
```

---

## **Getting Started**

### **Prerequisites**

- Node.js 18+
- npm, pnpm, or yarn
- MongoDB (local or Atlas)
- SMTP email account (Gmail supported)

### **Installation**

```bash
git clone <repository-url>
cd taskflow
npm install
# create a .env file with the variables below
```

### **Run the App**

```bash
npm run dev
```

Visit:
➡ `http://localhost:3000`

---

## **Environment Variables**

| Variable               | Required | Description                               |
| ---------------------- | -------- | ----------------------------------------- |
| `MONGODB_URI`          | ✅       | Full MongoDB connection string            |
| `JWT_SECRET`           | ✅       | Secret used to sign JWT tokens            |
| `NEXT_PUBLIC_BASE_URL` | ✅       | Base URL for password reset links         |
| `EMAIL_USER`           | ✅       | SMTP username (Gmail supported)           |
| `EMAIL_PASS`           | ✅       | SMTP password or app password             |

> Gmail users: create and use an App Password; regular passwords are often blocked.

---

## **API Overview**

| Method            | Endpoint                       | Description                                      |
| ----------------- | ------------------------------ | ------------------------------------------------ |
| `POST`            | `/api/auth/register`           | Create user, hash password, email OTP            |
| `POST`            | `/api/auth/verify-otp`         | Validate 6-digit OTP and mark user verified      |
| `POST`            | `/api/auth/login`              | Validate credentials, issue JWT cookie           |
| `POST`            | `/api/auth/logout`             | Clear auth cookie                                |
| `POST`            | `/api/auth/change-password`    | Update password using current password + JWT     |
| `POST`            | `/api/auth/forgot-password`    | Send password reset email with token link        |
| `POST`            | `/api/auth/reset-password`     | Verify token + set new password                  |
| `GET`             | `/api/me`                      | Get authenticated user (JWT cookie required)     |
| `GET`             | `/api/tasks?search=<query>`    | List tasks for the logged-in user                |
| `POST`            | `/api/tasks`                   | Create task                                      |
| `GET / PUT / DELETE` | `/api/tasks/:id`            | Fetch, update, or delete a task                  |

---

## **Testing**

- **Manual suites:** `testing/manual-testing` (per-feature `test-cases.md` plus shared notes in `docs/manual-test-plan.md`).
- **API coverage:** Postman collection in `testing/api-testing/postman/taskflow API testing.postman_collection.json` with usage guide in the same folder.
- **Automated:** `npm test` runs Playwright if configured in your environment.

---

## **Manual QA Checklist**

- Register a new user → receive OTP email → verify at `/verify-otp`.
- Login, logout, and re-login to confirm cookie handling.
- Request password reset email → complete `/reset-password/[token]`.
- Change password from `/dashboard/update-password` → ensure session requires re-login.
- Create/edit/delete tasks; move them across columns via drag-and-drop.
- Validate search and column counts; confirm empty states render correctly.
- Negative checks: invalid/expired OTP, expired reset token, and unauthorized task access.

---

## **Future Enhancements**

- Resend OTP endpoint + UI hook-up for reliability.
- Rate limiting on auth endpoints.
- Cleanup for long-unverified users.

---

## **Contributing**

1. Fork the repo
2. Create a feature branch:

   ```bash
   git checkout -b feat/my-feature
   ```

3. Follow existing patterns (hooks, form reuse, Tailwind styles)
4. Run `npm run lint` before submitting
5. Provide a clear explanation of changes

---

## **License**

Distributed under the MIT License. Feel free to adapt Taskflow for portfolio, production, or learning use cases.
