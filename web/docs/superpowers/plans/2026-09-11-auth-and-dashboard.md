# Authentication & Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete backend authentication lifecycle (JWT + Cookies/Bearer, registration, login, logout, me, route protection) and modern Dashboard page with analytics, AI mentor launcher, recent session debriefs, and flashcard practice.

**Architecture:** Next.js Route Handlers backed by MongoDB/Mongoose with bcryptjs password hashing and jose/jsonwebtoken JWT issuance. Dashboard client built with React 19 in the modern black & white aesthetic.

**Tech Stack:** Next.js 15, TypeScript, MongoDB / Mongoose, jsonwebtoken, bcryptjs, Tailwind CSS, Lucide React.

**Spec:** `docs/superpowers/specs/2026-09-11-auth-and-dashboard-design.md`

## Global Constraints
- Monochrome aesthetic: Pure white `#FFFFFF` canvas, black `#000000` buttons & accents, neutral gray `#F8FAFC`/`#E2E8F0` cards and borders.
- Cookie name: `atlas_token` (httpOnly, sameSite: 'lax').
- Dual auth compatibility: support both `atlas_token` cookie and `Authorization: Bearer <token>`.

---

### Task 1: Auth Dependencies & Shared Types
**Files:**
- Modify: `packages/types/src/index.ts`
- Modify: `web/package.json`

- [ ] **Step 1: Update shared types in `packages/types/src/index.ts`**
Add `IUser` interface to `@atlas/types`.

- [ ] **Step 2: Install `jsonwebtoken`, `bcryptjs`, `@types/jsonwebtoken`, `@types/bcryptjs` in `web`**
Run `npm install jsonwebtoken bcryptjs` and `npm install -D @types/jsonwebtoken @types/bcryptjs`.

- [ ] **Step 3: Verify build**
Run `npx tsc --noEmit` in `packages/types` and `web`.

---

### Task 2: User Model & Auth Utility
**Files:**
- Create: `web/lib/models/User.ts`
- Create: `web/lib/auth.ts`

- [ ] **Step 1: Create `User` Mongoose model**
Define schema with `name`, `email`, `passwordHash`, `learningStreak`, `totalCallMinutes`, `createdAt`.

- [ ] **Step 2: Create JWT signing & verification helper in `web/lib/auth.ts`**
Export `signJwt`, `verifyJwt`, and `getAuthUser(req: NextRequest)`.

---

### Task 3: Backend Auth Route Handlers
**Files:**
- Create: `web/app/api/auth/register/route.ts`
- Create: `web/app/api/auth/login/route.ts`
- Create: `web/app/api/auth/logout/route.ts`
- Create: `web/app/api/auth/me/route.ts`
- Create: `web/app/api/dashboard/stats/route.ts`

- [ ] **Step 1: Implement `POST /api/auth/register`**
- [ ] **Step 2: Implement `POST /api/auth/login`**
- [ ] **Step 3: Implement `POST /api/auth/logout`**
- [ ] **Step 4: Implement `GET /api/auth/me`**
- [ ] **Step 5: Implement `GET /api/dashboard/stats`**

---

### Task 4: Connect Sign In and Sign Up Frontend Pages
**Files:**
- Modify: `web/app/(auth)/sign-in/page.tsx`
- Modify: `web/app/(auth)/sign-up/page.tsx`

- [ ] **Step 1: Connect `/sign-in` to `/api/auth/login` with loading state, error alert, and redirect to `/dashboard`**
- [ ] **Step 2: Connect `/sign-up` to `/api/auth/register` with loading state, error alert, and redirect to `/dashboard`**

---

### Task 5: Build Modern Dashboard Page
**Files:**
- Create: `web/app/dashboard/page.tsx`
- Create: `web/components/dashboard/DashboardHeader.tsx`
- Create: `web/components/dashboard/MentorLauncher.tsx`
- Create: `web/components/dashboard/RecentSessionsList.tsx`
- Create: `web/components/dashboard/FlashcardReviewWidget.tsx`
- Create: `web/components/dashboard/CreateMentorModal.tsx`

- [ ] **Step 1: Build dashboard header with user profile, streak counter, and logout**
- [ ] **Step 2: Build metrics overview (call minutes, concepts, streak, cards)**
- [ ] **Step 3: Build Mentor launcher with 1-click voice start**
- [ ] **Step 4: Build Recent sessions & auto-debrief list**
- [ ] **Step 5: Build interactive Flashcard review deck widget**
- [ ] **Step 6: Build Custom Mentor Creator modal**
- [ ] **Step 7: Wire everything in `/dashboard/page.tsx` with authentication guard**

---

### Task 6: Verification & End-to-End Test
- [ ] **Step 1: Run TypeScript checks (`npx tsc --noEmit`)**
- [ ] **Step 2: Test auth registration, cookie persistence, and dashboard data fetching**
