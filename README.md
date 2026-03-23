# JP Visual Docs (Monorepo)

**Project Architecture:** pnpm Monorepo
**Primary Stack:** Next.js 15 (App Router), Supabase (PostgreSQL), Tailwind CSS, Zod

## 1. Project Structure

- `apps/web`: Next.js Web Application
- `packages/lib`: Shared Business Logic, Supabase Clients, Zod Schemas
- `packages/ui`: Shared UI Components (Clean, Modern, Trustworthy)
- `supabase/`: Database Migrations & Seed Data

## 2. Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Check types and linting
pnpm check
pnpm lint
```

## 3. Deployment

Deployed via Vercel for High Performance & Scalability.

---
*Created by Senior Architect AI for JP Visual Docs.*
