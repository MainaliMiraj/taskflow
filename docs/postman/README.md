

# 📘 TaskFlow API Testing — Postman Collection

This folder contains the complete **Postman API Testing Suite** for **TaskFlow**, a full-stack task-management application built with Next.js App Router, JWT authentication, and a MongoDB backend.

The collection covers:

* Authentication (cookie-based JWT)
* User profile validation
* Secure Task CRUD operations
* Negative security testing (missing/invalid token)
* Chained requests using Postman environment variables

This documentation is designed for recruiters, engineers, and QA reviewers who want to quickly understand the testing workflow and coverage.

---

# 🚀 Getting Started

## 1. Install Postman

Download Postman:
[https://www.postman.com/downloads/](https://www.postman.com/downloads/)

## 2. Import the Collection

In Postman:

```
File → Import → Select taskflow.postman_collection.json
```

This file is located at:

```
docs/postman/taskflow.postman_collection.json
```

## 3. Set Environment Variable

Create a Postman environment:

### **Environment Name:**

`TaskFlow-Prod`

### **Variable:**

| Key     | Value                                                                          |
| ------- | ------------------------------------------------------------------------------ |
| baseURL | [https://taskflow-rosy-nine.vercel.app](https://taskflow-rosy-nine.vercel.app) |
| taskId  | (leave empty, will be auto-set after Create)                                   |

---

# 🔐 Authentication Overview

TaskFlow uses **secure, HttpOnly JWT cookies** — not Bearer tokens.

**Workflow:**

1. User sends `POST /api/auth/login` with email + password
2. Server responds with `Set-Cookie: token=<jwt>`
3. All subsequent API calls automatically include this cookie
4. Protected routes verify the JWT from the cookie

This is the same authentication model used by many modern SaaS apps.

---

# 📂 API Endpoints Covered

### **Auth**

| Method | Endpoint          | Description                   |
| ------ | ----------------- | ----------------------------- |
| POST   | `/api/auth/login` | Log in and receive JWT cookie |
| GET    | `/api/me`         | Get logged-in user details    |

---

### **Tasks**

| Method | Endpoint         | Description                    |
| ------ | ---------------- | ------------------------------ |
| GET    | `/api/tasks`     | Get all tasks (requires login) |
| POST   | `/api/tasks`     | Create new task                |
| GET    | `/api/tasks/:id` | Get single task                |
| PUT    | `/api/tasks/:id` | Update task                    |
| DELETE | `/api/tasks/:id` | Delete task                    |

---

# 🧪 Test Flow (Chained API Testing)

The Postman suite executes in this professional, industry-standard order:

---

## ✅ 1. Login

**POST `/api/auth/login`**

* Validates email + password
* Sets JWT as HttpOnly cookie
* Required for all secure endpoints

---

## ✅ 2. Validate `/api/me` (Authenticated)

**GET `/api/me`**

Checks that:

* User is authenticated
* Correct `name` and `email` are returned

---

## ❌ 3. Validate `/api/me` Without Auth (Negative Test)

Delete cookie → call `/api/me` → expect:

```
401 Not authenticated
```

---

## ✅ 4. Get All Tasks

**GET `/api/tasks`**

Ensures:

* 200 OK
* `tasks` array exists
* Items belong to the logged-in user

---

## ✅ 5. Create Task

**POST `/api/tasks`**

Creates a task and stores the generated ID in:

```
environment.taskId
```

This allows automated chaining.

---

## ✅ 6. Get Task by ID

**GET `/api/tasks/{{taskId}}`**

Verifies:

* Correct ID
* Fields match expected values

---

## ✅ 7. Update Task

**PUT `/api/tasks/{{taskId}}`**

Example update:

```json
{
  "title": "postmanV2"
}
```

Validates:

* 200 OK
* Title updated

---

## ❌ 8. Delete Task

**DELETE `/api/tasks/{{taskId}}`**

Confirms:

* 200 OK
* Server returns → `"Task deleted successfully"`

---

## ❌ 9. Negative Tests

### Missing Cookie

Remove Postman cookie → call `/api/tasks` → expect:

```
401 Unauthorized
```

### Invalid Token

Modify cookie → expect:

```
401 Invalid token
```
---
