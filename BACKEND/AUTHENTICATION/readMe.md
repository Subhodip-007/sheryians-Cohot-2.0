# 🔐 Authentication System — Architecture & Implementation

A backend authentication system built using **Node.js, Express.js, MongoDB and JWT**. This project explores how production-style authentication works, including access tokens, refresh tokens, token rotation, session management, logout from multiple devices and OTP-based email verification.

**Source Code:** https://github.com/ankurdotio/yt-auth

---

# 1. What Are We Building?

We are building an authentication system that answers five important questions:

1. Who is the user?
2. Is the user authenticated?
3. Is the user's session still valid?
4. How do we handle stolen or expired tokens?
5. How can a user manage and revoke sessions across multiple devices?

### What You Will Learn

- Authentication architecture
- User registration and MongoDB setup
- Identifying users from incoming requests
- Access token and refresh token flow
- Refresh token rotation
- Session management
- Logout and logout from all devices
- OTP-based email verification
- Token security and revocation

# 2. Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Backend | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JWT |
| Password Security | bcrypt |
| Token Security | Crypto / SHA-256 |
| Logging | Morgan |
| Session Management | MongoDB |
| Optional Cache | Redis |
| Email Verification | Nodemailer / Email Service |

# 3. Project Development Roadmap

We should not build everything at once. Develop the authentication system in the following order.

## Phase 1 — Project Initialization

### Step 1: Initialize the project

```bash
npm init -y
npm install express mongoose dotenv jsonwebtoken bcrypt morgan cookie-parser
npm install -D nodemon
```

Configure ES modules in `package.json`:

```json
{
  "type": "module",
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  }
}
```

### Step 2: Set up MongoDB

- Create a MongoDB Atlas account.
- Create a database cluster.
- Configure database access.
- Add your IP address to network access.
- Copy the MongoDB connection string.
- Store credentials in `.env`.

### Step 3: Initialize Express

Create two important files:

**app.js**
- Initialize Express.
- Configure middleware.
- Configure Morgan.
- Configure cookie-parser.
- Register API routes.
- Configure error handling.

**server.js**
- Load environment variables.
- Connect to MongoDB.
- Start the Express server.

Flow:

```text
server.js
    |
    v
Connect to MongoDB
    |
    v
Import app.js
    |
    v
Start Express Server
    |
    v
Listen on PORT
```

## Phase 2 — User Registration

### Step 4: Create User Model

`models/user.model.js`

Responsibilities:
- Store username.
- Store email.
- Store hashed password.
- Store email verification status.
- Store account-related information.

Example:

```js
{
    username: String,
    email: String,
    password: String,
    isEmailVerified: Boolean
}
```

Never store plain-text passwords.

### Step 5: Create Authentication Routes

`routes/auth.routes.js`

```text
/api/auth
    |
    |-- POST /register
    |-- POST /login
    |-- GET  /get-me
    |-- POST /refresh
    |-- POST /logout
    |-- POST /logout-all
```

### Step 6: Create Authentication Controllers

`controllers/auth.controller.js`

Start with registration.

Registration workflow:

```text
Client sends registration details
          |
          v
Validate request body
          |
          v
Check existing user
          |
          v
Hash password using bcrypt
          |
          v
Create user in MongoDB
          |
          v
Generate authentication credentials
          |
          v
Create session
          |
          v
Return response
```

For an email-verification-based registration flow, the account can initially remain unverified. Grant the authenticated session according to your chosen verification policy.

# 4. Understanding Authentication

## 4.1 What Is Authentication?

Authentication is the process of verifying the identity of a user.

Example:

A user opens an application and enters:

```text
Email: user@gmail.com
Password: ********
```

The backend verifies the credentials and determines whether the user is genuine.

After successful authentication, the backend issues credentials that allow the user to access protected resources.

## 4.2 Identifying Users From Requests — GET /get-me

After registration or login, the frontend needs to identify the currently authenticated user.

For this purpose, we create:

```http
GET /api/auth/get-me
```

The backend:

1. Receives the access token.
2. Extracts the JWT from the Authorization header.
3. Verifies the token using `jwt.verify()`.
4. Extracts the authenticated user's ID from the verified payload.
5. Fetches that user from MongoDB.
6. Returns the user's information.

**Important security concept:**

Never trust a user ID supplied by the frontend to identify the currently authenticated user.

The authenticated identity must come from the verified JWT.

# 5. Access Token vs Refresh Token

This is the most important architectural decision in this project.

## 5.1 The Problem With Storing Tokens

Suppose a user logs into an application.

We need a way to remember that the user is authenticated across multiple API requests.

Some possible storage options:

| Storage | Security considerations |
|---|---|
| localStorage | Accessible through JavaScript; exposed if XSS occurs |
| sessionStorage | Also accessible through JavaScript |
| Normal cookie | Can be accessible through JavaScript |
| HTTP-only cookie | JavaScript cannot directly read it |
| Memory | Not persistent across page reloads; still exposed to active XSS |

Storing a token in memory reduces its persistence, but does not make it completely safe from XSS.

## 5.2 Why Two Tokens?

We use two different tokens for two different responsibilities.

**Access Token**

- Used for normal API requests.
- Has a short expiration time.
- Stored in frontend memory.
- Sent through the Authorization header.

**Refresh Token**

- Used to obtain new authentication tokens.
- Has a longer expiration time.
- Stored in an HTTP-only cookie.
- Managed and validated against the user's server-side session.

The objective is to reduce the impact of access token theft without requiring the user to log in repeatedly.

# 6. Complete Authentication Architecture

## 6.1 Registration / Login Flow

```text
                  START
                    |
                    v
              REGISTER / LOGIN
                    |
                    v
          Backend validates credentials
                    |
                    v
          Backend generates TWO JWTs
                    |
             +------+------+
             |             |
             v             v
        ACCESS TOKEN   REFRESH TOKEN
             |             |
             v             v
       JSON Response   Set-Cookie
             |             |
             v             v
       React stores    Browser stores
       in MEMORY       HTTP-ONLY COOKIE
             |             |
             +------+------+
                    |
                    v
               AUTHENTICATED
```

## 6.2 Normal API Request

Suppose a user wants to access their profile.

```http
GET /api/auth/get-me
Authorization: Bearer <accessToken>
```

The backend verifies the access token.

```text
       NORMAL API REQUEST
                |
                v
       Authorization Header
                |
                v
       Extract Access Token
                |
                v
       jwt.verify(accessToken)
                |
          Is token valid?
             /      \
           YES       NO
            |         |
            v         v
       Fetch User   Return 401
            |
            v
       Return User Data
```

If the access token is valid, the backend returns the requested data.

If the token is expired, the frontend can attempt to refresh it.

# 7. Refresh Token Flow

## 7.1 Why Do We Need Refresh Tokens?

Consider this situation:

- Access token expires after 10–15 minutes.
- Refresh token has a longer lifetime.
- User is actively using the application.

Without refresh tokens, the user would have to log in every time the access token expires.

Refresh tokens solve this problem.

## 7.2 Axios Interceptor

We implement an Axios response interceptor.

Its responsibility is to handle expired access tokens.

```text
       NORMAL API REQUEST
                |
                v
       Backend verifies token
                |
                v
       Access token expired
                |
                v
       Backend returns 401
                |
                v
       Axios Response Interceptor
                |
                v
       Calls /api/auth/refresh
                |
                v
       Browser sends refresh cookie
                |
                v
       Backend reads req.cookies
                |
                v
       Verify Refresh Token
                |
                v
       Check Session Validity
                |
           Is it valid?
             /      \
           YES       NO
            |         |
            v         v
       Generate     Return 401
       New Tokens   Login Again
            |
       +----+----+
       |         |
       v         v
    New Access  New Refresh
      Token       Token
       |           |
       v           v
    JSON        Set-Cookie
    Response
       |           |
       v           v
    Update      Update Cookie
    Memory
       |
       v
    Retry Original Request
       |
       v
    Return Requested Data
```

### Why Cookie Parser?

The refresh token is stored in an HTTP-only cookie.

JavaScript cannot directly read that cookie.

The browser automatically attaches the cookie to eligible requests.

On the backend:

```js
req.cookies.refreshToken
```

Cookie-parser makes cookies available through `req.cookies`.

# 8. Refresh Token Rotation

Refresh token rotation means replacing the old refresh token with a new refresh token whenever a valid refresh operation occurs.

### Why Is Rotation Necessary?

Imagine someone steals a refresh token.

If the same token remains valid for several days, an attacker could continue using it.

Rotation reduces this risk.

### Rotation Workflow

```text
          CLIENT REQUEST
                |
                v
        Send Refresh Token
                |
                v
        Verify JWT Signature
                |
                v
        Find User Session
                |
                v
        Compare Token Hash
                |
                v
        Check Session Revoked?
                |
                v
        Generate New Tokens
                |
                v
        Hash New Refresh Token
                |
                v
        Replace Old Session Hash
                |
          +-----+-----+
          |           |
          v           v
      Access Token  Refresh Token
          |           |
          v           v
      JSON Response  HTTP-only Cookie
```

**Important:** Store the hash of the current refresh token in the session, not the plain-text refresh token.

Also implement refresh-token reuse detection. If an already-rotated token is presented again, treat it as a possible compromise and revoke the affected session or token family.

# 9. Session Management System

## 9.1 Why Do We Need Sessions?

JWTs are stateless by themselves.

The backend can verify a JWT without looking up a database record.

However, real-world applications need additional control:

- Logout from a particular device.
- Logout from all devices.
- Revoke a compromised session.
- Track active devices.
- Detect refresh token reuse.

This is why we introduce a session management system.

## 9.2 Real-World Scenario

Imagine User A logs into an application using four devices:

```text
                 USER A
                   |
        +----------+----------+
        |          |          |
        v          v          v
      Device 1  Device 2   Device 3
                   |
                   v
                Device 4
```

Each device gets its own session.

If the user logs out from Device 2, the other devices should remain authenticated.

If the user selects Logout From All Devices, all active sessions should be revoked.

## 9.3 Create Session Model

`models/session.model.js`

Recommended fields:

```js
{
    userId: ObjectId,

    refreshTokenHash: String,

    ipAddress: String,

    userAgent: String,

    revoked: Boolean,

    expiresAt: Date,

    createdAt: Date,

    updatedAt: Date
}
```

Additional recommendations:

- Use MongoDB timestamps.
- Add indexes on `userId`.
- Add an expiration index where appropriate.
- Consider a `tokenFamilyId` for rotation and reuse detection.

### Session Creation

After successful registration or login:

```text
User Authentication Successful
             |
             v
      Generate Tokens
             |
             v
    Hash Refresh Token
             |
             v
      Create Session
             |
             v
     Save in MongoDB
             |
             v
      Set Refresh Cookie
```

# 10. Logout From One Device

Suppose User A has four active devices.

The user logs out from Device 2.

We should revoke only Device 2's session.

### Logout Workflow

```text
        LOGOUT REQUEST
              |
              v
     Read Refresh Token Cookie
              |
              v
     Verify Refresh Token
              |
              v
     Find Corresponding Session
              |
              v
     Compare Refresh Token Hash
              |
              v
     Check revoked = false
              |
              v
     Set revoked = true
              |
              v
     Save Session in MongoDB
              |
              v
     Clear Refresh Cookie
              |
              v
          LOGOUT
```

The cookie must also be cleared using the same relevant cookie options (path and domain) used when setting it.

### Important Access Token Problem

There is one more issue.

Suppose:

- Access token expires in 15 minutes.
- Refresh token is revoked during logout.
- The access token still has 10 minutes remaining.

The access token may still be accepted until it expires if the API only verifies its JWT signature and expiration.

There are two common solutions:

**Option 1 — Short-Lived Access Tokens**

Use a short expiration time, for example 8–15 minutes.

This reduces the remaining validity window after logout.

**Option 2 — Access Token Blacklisting**

Maintain a blacklist of revoked access tokens in Redis.

The backend checks the blacklist during protected requests.

Use the token's unique `jti` identifier rather than storing unnecessary raw credentials, and expire the blacklist entry when the access token expires.

Redis is useful because it supports fast lookups and automatic expiration.

# 11. Logout From All Devices

Now consider the same user with four active sessions.

The user selects:

**Logout From All Devices**

The backend must revoke every active session belonging to that user.

### Workflow

```text
      LOGOUT FROM ALL DEVICES
                  |
                  v
       Authenticate Current User
                  |
                  v
       Find All Active Sessions
                  |
                  v
       Filter revoked = false
                  |
                  v
       Update All Matching Sessions
                  |
                  v
       Set revoked = true
                  |
                  v
       Clear Current Refresh Cookie
                  |
                  v
       Revoke / Invalidate Access Tokens
       Where Immediate Revocation Is Required
                  |
                  v
             LOGOUT ALL
```

Example database operation:

```js
await sessionModel.updateMany(
    {
        userId: req.user.id,
        revoked: false
    },
    {
        $set: {
            revoked: true
        }
    }
);
```

The user identity must come from verified authentication, not a client-supplied user ID.

# 12. Login Controller — Complete Responsibility

The login controller is responsible for:

1. Validate incoming credentials.
2. Find the user by email.
3. Compare password using bcrypt.
4. Check account verification status.
5. Generate access token.
6. Generate refresh token.
7. Hash the refresh token.
8. Create a new session.
9. Set the refresh token in an HTTP-only cookie.
10. Return access token and user information in JSON.

Each successful login on a new device should create a separate session.

# 13. OTP-Based Email Verification

Now we extend the authentication system with email verification.

### Why Do We Need OTP?

Consider a user registering with an email address.

How do we know that the email address actually belongs to that user?

We send an OTP to the registered email address.

The user must enter the correct OTP to verify ownership.

### OTP Workflow

```text
          USER REGISTERS
                |
                v
       Save Unverified User
                |
                v
       Generate Random OTP
                |
                v
       Store OTP Hash + Expiry
                |
                v
       Send OTP Through Email
                |
                v
       User Enters OTP
                |
                v
       Backend Verifies OTP
                |
           Is OTP valid?
             /      \
           YES       NO
            |         |
            v         v
       Verify Email  Return Error
            |
            v
       Update User Status
            |
            v
       Email Verified
```

### OTP Security Considerations

- OTP should have a short expiration time.
- Store a hash, not the plain OTP.
- Limit verification attempts.
- Rate-limit OTP generation.
- Prevent repeated OTP abuse.
- Invalidate the OTP after successful verification.
- Avoid revealing whether an email address exists unnecessarily.

# 14. Recommended Backend Folder Structure

```text
backend/
│
├── src/
│   │
│   ├── config/
│   │   ├── database.js
│   │   └── config.js
│   │
│   ├── models/
│   │   ├── user.model.js
│   │   ├── session.model.js
│   │   └── otp.model.js
│   │
│   ├── routes/
│   │   └── auth.routes.js
│   │
│   ├── controllers/
│   │   └── auth.controller.js
│   │
│   ├── services/
│   │   ├── token.service.js
│   │   ├── session.service.js
│   │   └── email.service.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── rateLimit.middleware.js
│   │
│   ├── utils/
│   │   ├── generateToken.js
│   │   ├── hashToken.js
│   │   └── cookieOptions.js
│   │
│   └── app.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

### Responsibilities of Each Folder

| Folder | Responsibility |
|---|---|
| config | Database and environment configuration |
| models | MongoDB schemas |
| routes | API endpoint definitions |
| controllers | Handle HTTP requests and responses |
| services | Authentication and business logic |
| middlewares | Request authentication and validation |
| utils | Reusable helper functions |

This separation makes the application easier to maintain, test and scale.

# 15. How This Architecture Works in Real-World Applications

The same concepts are used in applications where users need persistent authentication and control over multiple devices.

| Real-world application | Authentication use case |
|---|---|
| E-commerce | User login, shopping account security |
| Banking applications | Session expiry and device revocation |
| Social media | Multiple active devices and logout all |
| SaaS dashboards | Organization and account access |
| Healthcare portals | Protected user records |
| Productivity applications | Persistent login sessions |

### Example: E-commerce Application

Imagine a user logs into an e-commerce website.

1. The user logs in from their laptop.
2. The backend creates a session.
3. The user receives an access token and refresh cookie.
4. The user accesses orders and profile information.
5. The access token expires.
6. The frontend automatically requests new tokens.
7. The backend validates the refresh token and session.
8. New tokens are issued.
9. The user continues shopping without logging in again.
10. If the laptop is stolen, the user can revoke that device's session from another device.

This is the practical value of session management.

# 16. Security Checklist

Before considering the authentication system production-ready, check the following:

- [ ] Passwords are hashed using bcrypt or an appropriate password hashing algorithm.
- [ ] JWT secrets are stored in environment variables.
- [ ] Access tokens have short expiration times.
- [ ] Refresh tokens are stored in HTTP-only cookies.
- [ ] Cookies use Secure and appropriate SameSite settings in production.
- [ ] CORS allows only trusted frontend origins.
- [ ] Refresh token hashes are stored in the database.
- [ ] Refresh token rotation is implemented.
- [ ] Refresh token reuse detection is implemented.
- [ ] Sessions can be revoked individually.
- [ ] All sessions can be revoked together.
- [ ] Logout clears the refresh cookie.
- [ ] Access token revocation strategy is defined.
- [ ] OTPs are hashed, expire and have attempt limits.
- [ ] Login, registration and OTP endpoints are rate-limited.
- [ ] CSRF protection is considered for cookie-authenticated endpoints.
- [ ] Environment files are excluded from Git.

# 17. Project Timeline

| Timestamp | Topic |
|---|---|
| 00:00:00 | Introduction |
| 00:00:50 | What is Authentication |
| 00:04:09 | How Authentication System Works |
| 00:14:13 | Registering User & MongoDB Setup |
| 00:48:13 | Identifying User from Request |
| 01:01:20 | Access Token & Refresh Token Working |
| 01:16:24 | Token Rotation Implementation |
| 01:31:16 | Session Management and Logout |
| 02:07:39 | OTP Authentication Working |
| 02:13:23 | OTP Authentication Implementation |
| 02:42:40 | Outro |

# 18. Final Learning Objectives

By completing this project, you should be able to explain:

1. Why authentication requires more than generating a JWT.
2. Why we separate access tokens and refresh tokens.
3. Why access tokens can be stored in memory.
4. Why refresh tokens can be stored in HTTP-only cookies.
5. How cookie-parser works.
6. How Axios interceptors handle expired access tokens.
7. How refresh token rotation prevents indefinite reuse of old tokens.
8. Why a session model is required for device management.
9. How individual logout differs from logout from all devices.
10. Why Redis can be useful for access token revocation.
11. How OTP verification establishes email ownership.
12. How to design authentication for production applications.

---

**Core Architecture Principle:**

Authentication establishes the user's identity. Authorization determines what that user can access. Token management maintains authentication across requests, while session management gives the backend control over active devices and revocation.

The goal is not simply to make login work. The goal is to build an authentication system that remains secure and manageable when real users, multiple devices and compromised credentials are involved.