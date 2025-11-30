# **Taskflow – Modern Task Management Platform**

A production-grade task board built on the **Next.js App Router**, **Tailwind CSS**, and a secure **MongoDB backend**.
Taskflow keeps busy teams organized with clean CRUD flows, drag-and-drop columns, and a JWT-protected API surface that’s easy to extend.

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
8. [Available Scripts](#available-scripts)
9. [Manual QA Checklist](#manual-qa-checklist)
10. [Contributing](#contributing)
11. [License](#license)

---

## **Key Highlights**

- **JWT-secured accounts** – Login, registration, logout, and password recovery using encrypted HTTP-only cookies and middleware-protected routes.
- **Kanban-style task board** – To Do / In Progress / Completed columns with drag-and-drop, smart empty states, and real-time count updates.
- **Task detail modal** – Click any task to reveal metadata, timestamps, description expansion, status shortcuts, edit/delete options, and more.
- **Streamlined forms** – One reusable form for add/edit flows with client-side validation and prevention of invalid due dates.
- **Email-based reset flow** – Nodemailer + crypto tokens implement a secure reset flow with time-bound tokens and verification.
- **Search & filters** – Debounced search with instant feedback and clean UI messaging.
- **Modern UX** – Skeleton loaders, modals, transitions, and consistent component patterns.

---

## **Product Tour**

### **Authentication & Access Control**

- APIs under `/api/auth` handle registration, login, logout, and password resets.
- Passwords hashed with **bcrypt** and stored securely.
- Login issues a **JWT** signed via `JWT_SECRET`, stored as an HTTP-only cookie.
- `middleware.ts` protects authenticated routes such as:

  - `/dashboard`
  - `/add`
  - `/edit/[id]`

- Forgot password flow:

  - `/api/auth/forgot-password` → issues a time-limited token
  - `/api/auth/reset-password` → verifies the token and updates the password

---

### **Dashboard & Task Board**

- `/dashboard` shows all tasks grouped by status.
- Drag tasks between columns; updates persist to the API.
- Empty states appear with contextual messaging.
- Debounced search filters by title & description.
- Task cards show:

  - Priority pills
  - Due date
  - Created timestamp
  - Description preview
  - Test-friendly `data-testid` selectors

---

### **Task Creation & Editing**

- `TaskForm` drives both create and edit pages.
- Validates all fields, especially dates.
- Edit flow loads with a skeleton UI.
- Graceful “Task Not Found” handling for invalid IDs.

---

### **Experience Enhancements**

- Centralized logic in:

  - `useTasks`
  - `useTaskFilters`
  - `useDebouncedValue`

- Strong typing across client & server through shared TypeScript models.
- Clean Tailwind utility-based UI with shared styles in `globals.css`.

---

## **Architecture**

- **Frontend** – Next.js App Router with RSC + client components where needed
- **API Layer** – Route handlers under `app/api` with REST-like patterns
- **Database** – MongoDB + Mongoose for schema modeling
- **Auth Strategy** – Stateless JWT in HTTP-only cookie
- **Email System** – Nodemailer-based reset links

---

## **Project Structure**

```
taskflow/
├── app/
│   ├── api/
│   │   ├── auth/                  # register, login, logout, forgot + reset
│   │   ├── me/                    # profile endpoint
│   │   └── tasks/                 # task CRUD
│   ├── add/                       # create task
│   ├── dashboard/                 # kanban board
│   ├── edit/[id]/                 # edit view
│   ├── forgot-password/           # reset request
│   ├── login/                     # login page
│   ├── register/                  # sign-up page
│   └── reset-password/[token]/    # reset UI
├── components/                    # TaskCard, TaskForm, Modal...
├── hooks/                         # useTasks, useTaskFilters, debounce
├── lib/                           # Mongo connection
├── models/                        # User + Task schemas
├── utils/                         # Helpers for sorting/filtering
├── middleware.ts                  # Route protection
└── README.md
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
cp .env.example .env   # or create one manually
```

### **Run the App**

```bash
npm run dev
```

Visit:
➡ `http://localhost:3000`

---

## **Environment Variables**

| Variable               | Required | Description                       |
| ---------------------- | -------- | --------------------------------- |
| `MONGODB_URI`          | ✅       | Full MongoDB connection string    |
| `JWT_SECRET`           | ✅       | Secret used to sign JWT tokens    |
| `NEXT_PUBLIC_BASE_URL` | ✅       | Base URL for password reset links |
| `EMAIL_USER`           | ✅       | SMTP username                     |
| `EMAIL_PASS`           | ✅       | SMTP password / app password      |

> **Gmail users:** Use an App Password for better security.

---

## **API Overview**

| Method   | Endpoint                    | Description                         |
| -------- | --------------------------- | ----------------------------------- |
| `POST`   | `/api/auth/register`        | Create new user                     |
| `POST`   | `/api/auth/login`           | Validate credentials + issue cookie |
| `POST`   | `/api/auth/logout`          | Remove auth cookie                  |
| `POST`   | `/api/auth/forgot-password` | Send reset email                    |
| `POST`   | `/api/auth/reset-password`  | Verify token + set new password     |
| `GET`    | `/api/me`                   | Get authenticated user              |
| `GET`    | `/api/tasks`                | List user tasks                     |
| `POST`   | `/api/tasks`                | Create task                         |
| `GET`    | `/api/tasks/:id`            | Fetch task                          |
| `PUT`    | `/api/tasks/:id`            | Update task                         |
| `DELETE` | `/api/tasks/:id`            | Delete task                         |

---

## **Available Scripts**

| Command         | Description                      |
| --------------- | -------------------------------- |
| `npm run dev`   | Start dev server                 |
| `npm run build` | Create production build          |
| `npm start`     | Serve production build           |
| `npm run lint`  | Lint with ESLint                 |
| `npm test`      | Playwright tests (if configured) |

---

## **Manual QA Checklist**

- Register → log in → log out
- Create tasks with all priority levels
- Test validation errors
- Drag tasks between columns
- Confirm board counts update
- Delete tasks → confirm modal
- Test search bar
- Reset password via email
- Visit invalid `/edit/:id` route → error handling

---

## **Further Backend Feature to Add**

- Resend OTP Route
- Rate Limiting
- Cleanup the unverified user.

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

Distributed under the MIT License.
Feel free to adapt Taskflow for portfolio, production, or learning use cases.
