# Taskflow – Modern Task Management Platform

A production-grade task board built on the Next.js App Router, Tailwind CSS, and a secure MongoDB backend. Taskflow keeps busy teams organized with clean CRUD flows, drag-and-drop columns, and a JWT-protected API surface that is easy to extend.

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-222222?style=for-the-badge&logo=react&logoColor=61dafb" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/MongoDB-0f5132?style=for-the-badge&logo=mongodb&logoColor=4ea94b" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose" />
  <img src="https://img.shields.io/badge/JSON_Web_Tokens-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/Bcrypt-3465a4?style=for-the-badge&logo=express&logoColor=white" alt="Bcrypt" />
  <img src="https://img.shields.io/badge/Nodemailer-00B200?style=for-the-badge&logo=gmail&logoColor=white" alt="Nodemailer" />
</p>

---

## Table of Contents

1. [Key Highlights](#key-highlights)
2. [Product Tour](#product-tour)
3. [Architecture](#architecture)
4. [Project Structure](#project-structure)
5. [Getting Started](#getting-started)
6. [Environment Variables](#environment-variables)
7. [API Overview](#api-overview)
8. [Available Scripts](#available-scripts)
9. [Manual QA Checklist](#manual-qa-checklist)
10. [Contributing](#contributing)
11. [License](#license)

---

## Key Highlights

- **JWT-secured accounts** – Registration, login, logout, and password recovery guarded by server-issued HTTP-only cookies plus middleware that keeps sensitive routes private.
- **Board-style dashboard** – Tasks are grouped into To Do, In Progress, and Completed columns with drag-and-drop moves, quick counts, and empty states that guide next steps.
- **Insightful detail modal** – Click any task to open an overlay with history, metadata, status shortcuts, edit/delete entry points, and expandable descriptions.
- **Guided creation & edits** – Task forms validate required fields, prevent past due dates, and reuse a single component for create/update pages to keep UX consistent.
- **Email-based reset flow** – Nodemailer + crypto tokens send time-bound password reset links that point back to the public Next.js routes.

---

## Product Tour

### Authentication & Access Control
- Custom `/api/auth/register` and `/api/auth/login` routes hash passwords with bcrypt and issue JWTs signed with `JWT_SECRET`.
- `middleware.ts` inspects HTTP-only cookies to keep `/dashboard`, `/add`, and `/edit/[id]` behind auth walls while redirecting authenticated users away from login/register pages.
- `/api/auth/forgot-password` issues short-lived tokens, emails a reset link (`/reset-password/[token]`), and `/api/auth/reset-password` verifies expiry before saving a new hash.
- `/api/auth/logout` deletes the cookie, instantly revoking access across protected routes.

### Dashboard & Task Board
- `app/dashboard/page.tsx` renders To Do / In Progress / Completed columns, each showing live totals and empty-state hints.
- Drag any card between columns; drop targets highlight, and confirmation dialogs prevent accidental moves. Status updates persist through `/api/tasks/:id`.
- A debounced search input filters by title or description while keeping counts accurate. Results show contextual messaging and a CTA if no tasks exist.
- Task cards surface priority pills, due dates, created timestamps, and truncated descriptions; each card exposes deterministic `data-testid` attributes for testing.

### Task Creation & Editing
- `TaskForm` powers both `/add` and `/edit/[id]`, enforcing required title + due date, preventing past deadlines, and exposing cancel flows that confirm destructive actions.
- Add flow displays inline progress states while persisting to `/api/tasks`.
- Edit flow fetches single-task details, shows a loading skeleton, and gracefully handles “task not found” cases with a safe redirect option.
- The Task Details modal allows inline status changes, quick navigation to edit, and destructive deletes with confirmation prompts.

### Experience Details
- Hooks such as `useTasks`, `useTaskFilters`, and `useDebouncedValue` centralize data orchestration, making it easy to plug additional controls into the board.
- TypeScript models (see `types/task.ts`, `models/Task.ts`, `models/User.ts`) keep shared contracts aligned from DB to UI.
- Tailwind-powered components lean on utility classes plus a few custom `btn-*` helpers defined in `app/globals.css`.

---

## Architecture

- **Frontend** – Next.js App Router with React server components and client components where needed for interactivity (drag-and-drop, forms, modals).
- **API layer** – Route handlers under `app/api` expose REST-style endpoints for auth, profile, and task CRUD. Every handler connects to MongoDB through `lib/db.ts`, shares validation patterns, and enforces per-user scoping.
- **Database** – MongoDB + Mongoose models for `User` and `Task`, including timestamps, priority/status enums, and password reset token fields.
- **Auth strategy** – Stateless JWTs stored in HTTP-only cookies, verified in handlers and `middleware.ts` to gate navigation.
- **Email delivery** – Nodemailer configured for Gmail by default; swap the transport for any SMTP provider as long as `EMAIL_USER` and `EMAIL_PASS` are provided.

---

## Project Structure

```
taskflow/
├── app/
│   ├── api/
│   │   ├── auth/                  # register, login, logout, forgot + reset
│   │   ├── me/                    # profile endpoint
│   │   └── tasks/                 # task collection + single-task routes
│   ├── add/                       # create-task flow
│   ├── dashboard/                 # kanban-style board
│   ├── edit/[id]/                 # edit modal view
│   ├── forgot-password/           # email request form
│   ├── login/                     # credential form
│   ├── register/                  # sign-up form
│   └── reset-password/[token]/    # password update UI
├── components/                    # TaskCard, TaskForm, SearchBar, Modal, etc.
├── hooks/                         # useTasks, useTaskFilters, useDebouncedValue
├── lib/                           # Mongo connection helper
├── models/                        # Mongoose schemas
├── utils/                         # Filtering + sorting helpers
├── middleware.ts                  # Route protection + redirects
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm (ships with Node) or pnpm/yarn
- MongoDB instance (Atlas or local)
- SMTP account for outgoing email (Gmail shown in the sample code)

### Installation

```bash
git clone <repository-url>
cd taskflow
npm install
cp .env.example .env     # if you have one, otherwise create a fresh .env
```

### Run the app

```bash
npm run dev
```

Visit `http://localhost:3000` to access the landing page. Register a user, then you will be redirected to the dashboard where you can start creating tasks.

---

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `MONGODB_URI` | ✅ | MongoDB connection string (include credentials + cluster DB) |
| `JWT_SECRET` | ✅ | Secret used to sign and verify login tokens |
| `NEXT_PUBLIC_BASE_URL` | ✅ | Public URL used when composing password reset links (e.g., `http://localhost:3000`) |
| `EMAIL_USER` | ✅ | SMTP username or full email (Gmail address when using the default transport) |
| `EMAIL_PASS` | ✅ | SMTP password/app password |

> **Tip:** If you are using Gmail, create an App Password (or switch to another SMTP provider) and update both `EMAIL_USER` and `EMAIL_PASS` accordingly.

---

## API Overview

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Create a new user with bcrypt-hashed credentials |
| `POST` | `/api/auth/login` | Validate credentials, issue a JWT, and set an HTTP-only cookie |
| `POST` | `/api/auth/logout` | Clear the auth cookie |
| `POST` | `/api/auth/forgot-password` | Generate a 10-minute reset token and email the link |
| `POST` | `/api/auth/reset-password` | Verify reset token and update the password hash |
| `GET` | `/api/me` | Return the authenticated user profile |
| `GET` | `/api/tasks` | List tasks that belong to the authenticated user |
| `POST` | `/api/tasks` | Create a task (title, description, due date, priority, optional status) |
| `GET` | `/api/tasks/:id` | Fetch a single task scoped to the authenticated user |
| `PUT` | `/api/tasks/:id` | Update task fields, including status changes triggered from the board |
| `DELETE` | `/api/tasks/:id` | Permanently delete the task |

All endpoints expect the `token` cookie produced by `/api/auth/login`. Requests made without the cookie receive `401 Unauthorized`.

---

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server with hot reloading |
| `npm run build` | Create an optimized production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint using the Next.js config |
| `npm test` | Runs `playwright test` if you add a `playwright.config.ts` (no specs ship in this repo yet) |

---

## Manual QA Checklist

- Register a brand-new user, then confirm you can log in and out (cookie removed after logout).
- Create tasks with varying priorities and due dates; ensure the form blocks past dates and missing titles.
- Drag tasks between columns and accept the confirmation dialog; the counters and modal view should update instantly.
- Use the search bar to filter by title/description and verify the empty-state messaging.
- Open the Task Details modal, expand a long description, update status via the quick buttons, then delete the task.
- Visit the edit route directly (`/edit/:id`) to ensure the loader, error state, and navigation guard behave.
- Trigger the forgot-password flow to receive the tokenized link, set a new password, and log back in.

---

## Contributing

1. Fork the repository and create a feature branch: `git checkout -b feat/my-change`.
2. Follow the established patterns (hooks for data, shared TaskForm, Tailwind conventions).
3. Run `npm run lint` before opening a pull request.
4. Describe any schema or API changes and outline how you manually tested them (or link to the test plan if you add automated coverage).

---

## License

Distributed under the [MIT License](LICENSE). Use Taskflow as a base for production projects, hiring exercises, or experimentation.
