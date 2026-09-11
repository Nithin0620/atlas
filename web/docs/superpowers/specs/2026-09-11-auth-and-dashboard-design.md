# Authentication & Dashboard System Design

## 1. Overview
Atlas provides conversational voice AI tutoring. This document specifies the backend authentication system (JWT with dual Cookie/Bearer token support) and the interactive Dashboard suite (`/dashboard`) rendered in the contemporary black & white design system.

## 2. Backend Authentication Architecture

### 2.1 Dependencies
- `jose` or `jsonwebtoken` + `@types/jsonwebtoken`: For signed JWT issuance and verification.
- `bcryptjs` + `@types/bcryptjs`: For password hashing with salt rounds (10).

### 2.2 Data Models

#### `packages/types/src/index.ts`
```typescript
export interface IUser {
  _id?: string;
  name: string;
  email: string;
  avatarUrl?: string;
  learningStreak?: number;
  totalCallMinutes?: number;
  createdAt?: string | Date;
}
```

#### `web/lib/models/User.ts`
- Schema:
  - `name`: String, required.
  - `email`: String, required, unique, lowercase, trimmed.
  - `passwordHash`: String, required.
  - `avatarUrl`: String, optional.
  - `learningStreak`: Number, default 1.
  - `totalCallMinutes`: Number, default 0.
  - `createdAt`: Date, default `Date.now`.

### 2.3 JWT Security & Helper (`web/lib/auth.ts`)
- Signed token payload: `{ userId: string, email: string, name: string }`
- Token Expiry: 7 days.
- Dual authentication extraction helper `getAuthUser(req: NextRequest)`:
  1. Checks `atlas_token` cookie via `req.cookies.get('atlas_token')`.
  2. Falls back to `Authorization: Bearer <token>` header.
  3. Verifies signature using `JWT_SECRET` (falls back to default development secret if unset).
  4. Returns `{ userId, email, name }` or `null`.

### 2.4 API Routes
- `POST /api/auth/register`:
  - Body: `{ name, email, password }`
  - Validates input, hashes password, saves new `User` to MongoDB.
  - Sets `atlas_token` cookie (`httpOnly`, `secure` in prod, `sameSite: 'lax'`).
  - Returns `201 { success: true, user, token }`.
- `POST /api/auth/login`:
  - Body: `{ email, password }`
  - Finds user, compares password hash.
  - Sets `atlas_token` cookie.
  - Returns `200 { success: true, user, token }`.
- `POST /api/auth/logout`:
  - Clears `atlas_token` cookie.
  - Returns `200 { success: true, message: 'Logged out' }`.
- `GET /api/auth/me`:
  - Verifies token via `getAuthUser`.
  - Returns user details or `401 Unauthorized`.
- `GET /api/dashboard/stats`:
  - Returns user statistics, recent sessions, pending flashcards, and active mentors.

## 3. Frontend Implementation

### 3.1 Auth Wire-up (`/sign-in` and `/sign-up`)
- Connect forms to `/api/auth/login` and `/api/auth/register`.
- On success, redirect to `/dashboard`.
- Display inline error banners on invalid credentials or duplicate emails.

### 3.2 Main Dashboard (`/dashboard`)
The dashboard is styled with the modern black and white theme:
1. **Header Navigation**:
   - Logo, search/quick actions, user greeting, study streak (`🔥 5 Days`), and Logout button.
2. **Key Metric Analytics Cards**:
   - Total voice tutoring minutes.
   - Concepts mastered.
   - Spaced-repetition card retention rate.
   - Current study streak.
3. **AI Mentor Launcher**:
   - Grid of specialized mentors (Dr. Elena Rostova, Marcus Vance, Dr. Turing, Sofia Al-Mansoor) with one-click "Start Voice Session" button linking to `/call/[mentorId]`.
4. **Recent Sessions & Auto-Debriefs**:
   - Displays past tutoring sessions with summary chips, time stamps, and key takeaways.
5. **Spaced-Repetition Daily Flashcards**:
   - Interactive card preview with answer reveal and rating buttons.
6. **Custom AI Mentor Creator**:
   - Modal dialog to define a new AI mentor with custom syllabus/prompt.

## 4. Verification Plan
1. Install dependencies (`bcryptjs`, `jsonwebtoken`, `@types/bcryptjs`, `@types/jsonwebtoken`).
2. Run TypeScript build verification (`npx tsc --noEmit`).
3. Verify registration, login, token cookie setting, session fetch, and dashboard page rendering.
