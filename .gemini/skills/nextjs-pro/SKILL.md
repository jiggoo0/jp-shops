# Skill: Next.js Pro (v2.0)

## Objective: Build Enterprise-Grade Next.js 15 Fullstack Applications

## 1. Directory Structure (Standard)

- **`app/`**: Always use App Router. Prefer Server Components over Client Components.
- **`lib/`**: Business logic, Supabase config, and shared schemas (Path: `@/lib/*`).
- **`components/`**: UI components. Use `components/ui/` for shared components (Path: `@/components/*`).

## 2. Server Actions (Best Practices)

- Place all server actions in `app/actions/`.
- Always add `'use server'` at the top.
- Handle errors gracefully and return standardized responses (e.g., `{ success: boolean, data?: any, error?: string }`).

## 3. Data Fetching & Caching

- Fetch data in Server Components where possible.
- Use `revalidatePath` or `revalidateTag` after data mutations in Server Actions.
- Properly handle Next.js `loading.tsx` and `error.tsx` for a seamless UX.

## 4. UI/UX Standard

- Clean, Modern, Trustworthy (Elite Brand Tone).
- Responsive mobile-first design.
- Use `framer-motion` for interactive feedback.
- Use `lucide-react` for iconography.

## 5. Security Protocol

- Never expose environment variables in client components (use `NEXT_PUBLIC_` only for public data).
- Ensure Supabase RLS is active for all table access.
- Validate all incoming data with **Zod** schemas in `@/lib/index.ts`.

---

_Updated: 2026-03-23 | AI Precision Mode Active_
