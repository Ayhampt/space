# Space Backend

Lightweight RESTful API for collaborative project and task management with JWT authentication.

## Table of contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment variables](#environment-variables)
- [Scripts](#scripts)
- [Project structure](#project-structure)
- [API summary](#api-summary)
- [Authentication flow](#authentication-flow)
- [Testing](#testing)
- [Contributing](#contributing)


## Overview

Space Backend provides endpoints to manage users, projects, and tasks. It includes email verification, password reset flows, access & refresh JWT tokens, and basic role-based access primitives.

## Features

- User registration & login
- Email verification and forgot-password flows
- Access and refresh JWT token generation
- Projects and tasks CRUD
- Avatar storage reference (remote URL + localPath)
- Secure password hashing with bcrypt

## Prerequisites

- Node.js >= 16
- npm or yarn
- MongoDB instance (local or hosted)

## Installation

Clone and install:

```bash
git clone https://github.com/Ayhampt/space.git
cd space
npm install
```

Create or copy .env from the example (not included). Then start the app:

```bash
# development 
npm run dev

# production
npm run start
```

## Environment variables

Create a `.env` file in the project root. Typical variables used by the project:

- PORT=8000
- MONGO_URI=mongodb://localhost:27017/space
- ACCESS_TOKEN_SECERT=your_access_secret               # note: spelled as in code
- REFRESH_TOKEN_SECERT=your_refresh_secret             # note: spelled as in code
- ACCESS_TOKEN_EXPIRY=15m
- REFRESH_TOKEN_EXPIRY=7d
- SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS (if emails are used)
- NODE_ENV=development

Adjust names if you change environment variable names in code.

## Scripts

Common scripts in package.json:

- npm run dev — start dev server
- npm run start — start production server
- npm test — run tests (if present)
- npm run lint — lint project (if configured)

## Project structure

(abridged)

- /src
  - /models — Mongoose models (e.g. User)
  - /controllers — request handlers
  - /routes — route definitions
  - /middlewares — auth, error handling, validation
  - /utils — helpers (email, token, logger)
  - server.js / app.js — application entry point
- /tests — unit & integration tests

## API summary

Base path: /api/v1

Authentication:
- POST /api/v1/auth/register — register user
- POST /api/v1/auth/login — login (returns access + refresh tokens)
- POST /api/v1/auth/refresh — exchange refresh token for new access token
- POST /api/v1/auth/forgot-password — request password reset
- POST /api/v1/auth/reset-password/:token — reset password
- GET /api/v1/auth/verify-email/:token — verify email

Users:
- GET /api/v1/users/me — get current user
- PUT /api/v1/users/me — update profile
- PUT /api/v1/users/me/password — change password

Projects:
- GET /api/v1/projects — list projects
- POST /api/v1/projects — create project
- GET /api/v1/projects/:id — get project
- PUT /api/v1/projects/:id — update project
- DELETE /api/v1/projects/:id — delete project

Tasks:
- GET /api/v1/projects/:projectId/tasks — list tasks
- POST /api/v1/projects/:projectId/tasks — create task
- GET /api/v1/projects/:projectId/tasks/:taskId — get task
- PUT /api/v1/projects/:projectId/tasks/:taskId — update task
- DELETE /api/v1/projects/:projectId/tasks/:taskId — delete task

Note: adjust exact routes to match your route files.

## Authentication flow

- Registration creates a user and issues email verification token.
- Login returns access token (short lived) and refresh token (longer lived).
- Use the access token in Authorization: Bearer <token>.
- Use refresh endpoint to rotate tokens when access token expires.

Important: In user model code, token env names are ACCESS_TOKEN_SECERT and REFRESH_TOKEN_SECERT — either rename env vars or update code to correct spelling.

## Testing

Add tests under `/tests`. Run with:

```bash
npm test
```

Use a test database (set MONGO_URI_TEST) and clear data between runs.

## Contributing

- Fork the repo
- Create a feature branch
- Open a PR with a clear description
- Add tests for new features/bug fixes

