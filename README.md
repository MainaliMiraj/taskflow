# Taskflow – Modern Task Management Platform

A production-ready, test-friendly task management experience built with Next.js App Router, Tailwind CSS, and a secure MongoDB backend. Taskflow is designed for teams who care about both product quality and developer experience: every screen is optimized for usability, and every component exposes the hooks QA engineers need to automate confidence-building tests.

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-222222?style=for-the-badge&logo=react&logoColor=61dafb" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/MongoDB-0f5132?style=for-the-badge&logo=mongodb&logoColor=4ea94b" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose" />
  <img src="https://img.shields.io/badge/NextAuth.js-20232a?style=for-the-badge&logo=nextauth&logoColor=ffffff" alt="NextAuth.js" />
  <img src="https://img.shields.io/badge/JSON_Web_Tokens-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/Bcrypt-3465a4?style=for-the-badge&logo=express&logoColor=white" alt="Bcrypt" />
  <img src="https://img.shields.io/badge/Nodemailer-00B200?style=for-the-badge&logo=gmail&logoColor=white" alt="Nodemailer" />
  <img src="https://img.shields.io/badge/Playwright-2d3a4a?style=for-the-badge&logo=playwright&logoColor=green" alt="Playwright" />
</p>

---

## Table of Contents

1. [Key Highlights](#key-highlights)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Getting Started](#getting-started)
6. [Testing](#testing)
7. [Available Scripts](#available-scripts)
8. [Deployment](#deployment)
9. [Contributing](#contributing)
10. [License](#license)

---

## Key Highlights

- **Holistic task lifecycle** – Create, edit, filter, sort, and track statuses across the full workflow.
- **Authentication ready** – Registration, login, forgot password, and secure reset built with NextAuth.js and JWT.
- **Automation-first design** – Every interactive element exposes deterministic `data-testid` hooks.
- **Full-stack TypeScript** – Shared models, strict typing, and lint-ready configs keep contributions safe and predictable.
- **QA playground** – Mock data, Playwright suites, and manual testing guidance make this ideal for training or hiring exercises.

---

## Features

### Core Experience
- Dashboard surface with card layout, priority/status filters, search, and sort controls.
- Dedicated add/edit pages with optimistic validation, responsive design, and cancel/save flows.
- Status cycling (Todo → In Progress → Done) with contextual styling.
- Rich task metadata: descriptions, due dates, priorities, timestamps, and audit-friendly history.

### Authentication & Security
- Email/password registration with bcrypt hashing.
- JWT-backed session management powered by NextAuth.js.
- Forgot password and secure tokenized reset pages.
- Nodemailer integration for transactional email flows.

### Testing & Developer Enablement
- Playwright test runner configuration with sample spec.
- Extensive `data-testid` coverage across navigation, forms, filters, and cards.
- Mock database seed data for repeatable manual and automated QA scenarios.

---

## Tech Stack

| Layer | Technologies |
| --- | --- |
| **Frontend** | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" width="32" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" width="32" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" width="32" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" alt="Tailwind" width="32" /> |
| **Backend & Auth** | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" width="32" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" width="32" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongoose/mongoose-original.svg" alt="Mongoose" width="32" /> <img src="https://cdn.simpleicons.org/nextauth/18181b?viewbox=auto" alt="NextAuth" width="32" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodemailer/nodemailer-plain.svg" alt="Nodemailer" width="32" /> |
| **Security & Utilities** | <img src="https://cdn.simpleicons.org/jsonwebtokens/000000" alt="JWT" width="32" /> <img src="https://cdn.simpleicons.org/bcrypt/3465a4" alt="Bcrypt" width="32" /> <img src="https://cdn.simpleicons.org/heroicons/0ea5e9" alt="Heroicons" width="32" /> |
| **Tooling & QA** | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/playwright/playwright-original.svg" alt="Playwright" width="32" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg" alt="ESLint" width="32" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postcss/postcss-original.svg" alt="PostCSS" width="32" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" alt="VS Code" width="32" /> |

> **Note:** Icons use the open-source [Devicon](https://devicon.dev/) and [Simple Icons](https://simpleicons.org/) libraries for consistent branding.

---

## Project Structure

```
taskflow/
├── app/                         # Next.js App Router entrypoint
│   ├── (auth)/login             # Authentication views
│   ├── register                 # Registration flow
│   ├── forgot-password          # Forgot password form
│   ├── reset-password/[token]   # Secure reset experience
│   ├── add                      # Create task
│   ├── edit/[id]                # Update task
│   └── dashboard                # Main dashboard
├── components/                  # Shared UI primitives (cards, filters, forms)
├── hooks/                       # Custom hooks for data and UI state
├── lib/ & utils/                # DB connections, helpers, and server utilities
├── models/                      # Mongoose schemas (e.g., User, Task)
├── reducer/                     # Global reducer logic
├── tests/                       # Playwright specs and docs
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB connection string (`MONGODB_URI`)
- SMTP credentials for password reset emails

### Installation

```bash
git clone <repository-url>
cd taskflow
npm install
cp .env.example .env        # add your secrets
npm run dev
```

Visit `http://localhost:3000` to explore the dashboard.

### Environment Variables

| Variable | Description |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string |
| `NEXTAUTH_URL` | Public URL for NextAuth callbacks |
| `NEXTAUTH_SECRET` | Used to encrypt NextAuth JWTs |
| `EMAIL_SERVER_HOST`, `EMAIL_SERVER_PORT`, `EMAIL_SERVER_USER`, `EMAIL_SERVER_PASSWORD` | Nodemailer SMTP configuration |
| `EMAIL_FROM` | Sender address for transactional emails |

---

## Testing

```bash
npx playwright install   # installs supported browsers
npm test                 # headless run
npm test -- --ui         # Playwright UI mode
```

- Sample specs live under `tests/` as a starting point.
- All interactive controls expose deterministic `data-testid` attributes (see `README` comments in `tests/` for coverage).

---

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Create an optimized production build |
| `npm start` | Launch the production server |
| `npm run lint` | Run ESLint checks |
| `npm test` | Execute Playwright suites |

---

## Deployment

Taskflow is optimized for **Vercel**, but also runs seamlessly on:

- **Netlify** – Static hosting with serverless functions.
- **Docker** – Containerize via `next build` + `next start`.
- **Traditional Node hosting** – Use the production build and reverse proxy via Nginx/Apache.

Ensure required environment variables are configured in your hosting provider (e.g., Vercel Project Settings or Docker secrets).

---

## Contributing

1. Fork the repo and create a feature branch: `git checkout -b feat/amazing`.
2. Follow the existing project structure and lint rules (`npm run lint`).
3. Write or update Playwright specs where applicable.
4. Submit a pull request describing your changes and test coverage.

---

## License

Distributed under the [MIT License](LICENSE). Feel free to use the project as a learning sandbox or foundation for production-grade task management experiences.
