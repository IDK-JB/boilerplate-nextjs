# Boilerplate NextJS

## Requirements

- NodeJS 18+
- pnpm

## Default Features

- **Next.js** (App Router support)
- **TypeScript** (Static type checking & Strict mode)
- **React 19** (UI library - latest version)
- **Biome** (All-in-one linter, formatter, and organizer)
- **Tailwind CSS** (Utility-first styling)
- **T3 Env** (Environment variables validation)
- **Zod** (Schema-based data validation)

### Additional Features

- **next-intl** (Next.js multilingual support)
- **i18n-check** (Missing translation & validation tool)
- **PostgreSQL** (Neon serverless ou PostgreSQL standard via `DB_DRIVER=neon|postgres`)
- **DrizzleORM** (Type-safe ORM with `drizzle-kit` for migrations & studio)
- **Redis** (In-memory data store via `redis` client, `server-only` enforced)
- **Zustand** (Client-side state management)
- **Immer** (Immutable state mutations via `produce`)
- **Zustand persist** (State persistence to `localStorage`)
- **Docker Compose** (Dev environment with app, Postgres & Redis services)
- **BetterAuth** (Authentication with email/password, session management via DrizzleORM)
- **Resend** (Transactional email via `server-only` enforced client)
- **Stripe** (Payments — server client + webhook handler at `/api/webhooks/stripe`)
- **React Hook Form** (Performant form management with `@hookform/resolvers` + Zod)
- **Dark / Light theme** (Manual toggle + system fallback via `data-theme` attribute)
