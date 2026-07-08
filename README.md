# DevAcademy — Software Development Education Platform

A starter scaffold for a software development education & training platform, for developers who
want structured courses with real progress tracking rather than a static content site. Real,
working: project structure, database schema, and authentication, plus one full vertical slice —
browse courses, view a course, mark progress, see it on your dashboard. Everything else from the
original brief (live trainings/TMS, code playground, AI tutor, payments, community forum) is
present in the navigation as a "Coming soon" placeholder.

**Live site:** https://christabelletan21.github.io/8-jul-26/ (a static project overview — the app
itself needs a server and database, see [Setup](#setup) to run it locally)

## Stack
Next.js (App Router, TypeScript) · Express · PostgreSQL via Prisma · NextAuth.js · Tailwind CSS ·
npm workspaces monorepo.

## Setup

1. Start Postgres:
   ```sh
   npm run db:up
   ```
2. Copy env files and fill in the values:
   ```sh
   cp .env.example .env
   cp apps/api/.env.example apps/api/.env
   cp apps/web/.env.local.example apps/web/.env.local
   ```
   Generate a `NEXTAUTH_SECRET` with `npx auth secret`, and pick a shared random string for
   `INTERNAL_API_SECRET` in both `apps/api/.env` and `apps/web/.env.local` (must match).
   GitHub OAuth (`GITHUB_ID`/`GITHUB_SECRET`) is optional — leave blank to use the dev-only
   login instead (development mode only).
3. Install dependencies:
   ```sh
   npm install
   ```
4. Run migrations and seed the database:
   ```sh
   npm run db:migrate
   npm run db:seed
   ```
5. Start both apps:
   ```sh
   npm run dev
   ```
6. Open http://localhost:3000.

## Useful scripts
- `npm run db:studio` — browse the database with Prisma Studio.
- `npm run db:down` — stop Postgres.
- `npm run build` — build all workspaces.
