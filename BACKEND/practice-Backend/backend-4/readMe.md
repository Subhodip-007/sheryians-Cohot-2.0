# SyncTask: Real-Time Collaborative Kanban Board Backend

SyncTask is a highly scalable, production-grade backend REST and WebSocket API for a collaborative project management application. This project is intentionally built to implement advanced authentication, real-time communication, rapid graph-relational queries, memory-caching strategies, and strict global error handling.

## 🛠️ Tech Stack & Key Concepts Covered
*   **Runtime:** Node.js (Express.js Framework)
*   **Real-time engine:** Socket.io (WebSocket framework)
*   **Caching & Session Management:** Redis (Token blacklisting & fast session data)
*   **Database:** ArangoDB / Multi-Model DB (Utilizing Document & **Edge Collections**)
*   **Security & Validation:** JWT (JSON Web Tokens), Bcrypt.js, Express-Validator
*   **Architecture:** MVC Pattern, Centralized Global Error Handling, Event-Driven Architecture

---

## 📂 Project Architecture & Folder Structure

```text
sync-task-backend/
├── config/
│   ├── db.js                 # Database configuration
│   └── redis.js              # Redis client initialization
├── controllers/
│   ├── authController.js     # User registration, login, logout
│   ├── projectController.js  # CRUD for project boards
│   └── taskController.js     # CRUD for card management
├── middlewares/
│   ├── authMiddleware.js     # JWT extraction & Redis blacklist validation
│   ├── errorMiddleware.js    # Global centralized error handler
│   └── validateMiddleware.js # Express-validator interceptor
├── models/
│   └── (Database setup schema files or collection helpers)
├── routes/
│   ├── authRoutes.js         # /api/v1/auth/*
│   ├── projectRoutes.js      # /api/v1/projects/*
│   └── taskRoutes.js         # /api/v1/tasks/*
├── sockets/
│   ├── socketAuth.js         # Socket.io JWT authentication middleware
│   └── taskHandler.js        # Event listeners for real-time board shifts
├── utils/
│   ├── AppError.js           # Custom Operational Error class
│   └── catchAsync.js         # Global try/catch wrapper utility
├── .env.example              # Template for environment configurations
├── package.json
├── README.md
└── server.js                 # App entry point (HTTP & WebSockets listener)
```

---

## 🚀 Step-by-Step Implementation Guide

### Phase 1: Foundation & The Resilience Architecture
**Goal:** Initialize the project, connect external dependencies, and build a global error fallback mechanism so the server never crashes silently.

*   [ ] Run `npm init -y` and install baseline dependencies: `express dotenv cors`.
*   [ ] Create `utils/AppError.js` by extending the native JavaScript `Error` class to handle dynamic `statusCode` and identify operational errors.
*   [ ] Write `utils/catchAsync.js` to wrap all controller functions, eliminating explicit `try/catch` blocks by automatically passing failures to `next(err)`.
*   [ ] Code the `middlewares/errorMiddleware.js`. Ensure it formats a neat JSON response for production while supplying stack traces for development.
*   [ ] Wire up `server.js` and verify the setup handles global routes and unexpected errors cleanly.

### Phase 2: Secure User Registration & Hashing
**Goal:** Process new user sign-ups safely using strict field validations and strong cryptography.

*   [ ] Install `express-validator` and `bcryptjs`.
*   [ ] Establish your primary database layout. Setup a standard document collection for **Users**.
*   [ ] In `routes/authRoutes.js`, use `express-validator` checks on fields (`email`, `username`, `password`) to intercept flawed requests before they strike the controller.
*   [ ] Build `controllers/authController.js` (`register`). Use `bcrypt.hash()` with a salt factor of 12 to secure passwords before writing the user document to the database.

### Phase 3: JWT State Management & Route Protection
**Goal:** Implement access controls using stateless JSON Web Tokens.

*   [ ] Install `jsonwebtoken`.
*   [ ] Write the `login` function inside `authController.js`. Verify user existence, validate passwords using `bcrypt.compare()`, and issue a signed JWT containing the user ID.
*   [ ] Implement `middlewares/authMiddleware.js` (`protect`). This file checks the request `Authorization` header for a Bearer token, decodes it, checks if the user still exists, and appends the payload to `req.user`.
*   [ ] Secure your first dummy route by dropping `protect` into your route definitions to verify token verification works perfectly.

### Phase 4: High-Performance Token Blacklisting
**Goal:** Address JWT's stateless vulnerability by using Redis to instantly invalidate logged-out sessions.

*   [ ] Spin up a Redis instance and install `redis` client package. Create connection logic inside `config/redis.js`.
*   [ ] Write the `logout` function inside `authController.js`. Capture the incoming JWT, calculate its remaining time-to-live (TTL), and store it inside Redis with a key structure like `blacklist:TOKEN`.
*   [ ] Upgrade `middlewares/authMiddleware.js` (`protect`). Insert a step that runs `redisClient.get(blacklist:TOKEN)` before hitting the database. If it exists in Redis, halt the request instantly with a `401 Unauthorized` response.

### Phase 5: Graph Relations & Edge Collections
**Goal:** Connect users to tasks and projects dynamically, utilizing database edge collections to represent complex permissions instead of heavy relational lookups.

*   [ ] Define your **Projects** and **Tasks** document collections.
*   [ ] Define an **Edge Collection** named `User_Assigned_Tasks` (or alternative mapping setup depending on your DBMS).
*   [ ] Develop CRUD features for tasks. When assigning a user to a task card, write a record to the Edge collection mapping the User Document to the Task Document.
*   [ ] Write an ultra-fast query to pull a board's structure: fetch the project, all its nested tasks, and traverse the edge relationships to return the profiles of users actively assigned to each task card.

### Phase 6: Real-Time Synergy via WebSockets
**Goal:** Keep board views completely synchronized across all active users in real time without continuous HTTP polling.

*   [ ] Install `socket.io`. Update `server.js` to attach Socket.io to your native Node HTTP server.
*   [ ] Write `sockets/socketAuth.js` middleware. Mirror your HTTP auth strategy by validating the connection's JWT handshake, blocking anonymous client connections right away.
*   [ ] On client connection, make users automatically join a workspace room via `socket.join(projectId)`.
*   [ ] Implement a listener in `sockets/taskHandler.js` for `card:move`. When an individual shifts a card, capture the payload, update the database state, and broadcast `card:moved` to the matching `projectId` room using `.to(projectId).emit()`.

---

## 🔒 Environment Variable Settings (`.env.example`)
Create a `.env` file in the root directory and supply the following variables:
```env
NODE_ENV=development
PORT=5000

# Security
JWT_SECRET=your_ultra_secure_long_jwt_secret_key
JWT_EXPIRES_IN=1d

# Databases
DB_URL=http://localhost:8529
DB_NAME=sync_task_db
DB_USER=root
DB_PASSWORD=secret_password

# Caching
REDIS_URL=redis://127.0.0.1:6379
```

---

## 🏎️ Running the Application

### 1. Installation
```bash
npm install
```

### 2. Startup Scripts
```bash
# Run in development mode (with live hot-reloading)
npm run dev

# Run in production mode
npm start
```
