# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev               # Start dev server on port 3000
pnpm build             # Production build
pnpm lint              # Run ESLint
pnpm test:unit         # Unit tests (Vitest)
pnpm test:integration  # Integration tests (Vitest + Testcontainers)
pnpm test:e2e          # End-to-end tests (Playwright)
```

## Architecture

This is a marketing website for Kalchev Family Winery, built with **Next.js 15 App Router**. The homepage composes all marketing sections; the app also includes secondary routes for wine catalog, checkout flow, order history, admin dashboard, and policy pages.

### Key structural patterns

- `app/page.tsx` — homepage, composes all marketing sections in order
- `app/wines/page.tsx` — wine catalog listing
- `app/wines/[slug]/page.tsx` — individual wine detail pages (SSG via `generateStaticParams`)
- `app/checkout/page.tsx` — checkout flow
- `app/order/confirm/page.tsx` — order confirmation
- `app/admin/` — admin dashboard (login required, JWT session auth)
- `app/layout.tsx` — root layout; `client-layout.tsx` wraps children in `LocaleProvider`, `CartProvider`, `CartDrawer`, `ScrollToTop`, `Toaster`
- `components/` — organized by section (`hero/`, `about/`, `products/`, `testimonials/`, etc.) plus `ui/` (shadcn primitives) and `shared/` (reusable wrappers like `SectionTransition`, `PageTransition`)
- `data/wines.ts` and `data/testimonials.ts` — static product/review data with en/mk/gr translations
- `lib/` — data layer: `actions.ts` (contact form Server Action), `checkout.ts` (order processing), `admin-auth.ts` (JWT session), `email.ts` (Resend), `rate-limit.ts` (Upstash Redis), `i18n/` (locale context + translations), schemas, and utilities
- `lib/db/` — Drizzle ORM schemas and Neon Postgres connection
- `config/site.ts` — site-wide metadata (name, description, social links)

### Tech stack

- **Framework:** Next.js 15 (App Router, Server Components/Actions)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 with a custom winery palette (`wineRed`, `cream`, `gold`, `deepBrown`, `oliveGreen`) in `app/globals.css`; dark mode via `next-themes` (class-based)
- **Fonts:** `PlayfairDisplay` (headings) and `Inter` (body), loaded locally in `app/fonts/`
- **Animations:** framer-motion v12; page/section transitions via `components/shared/PageTransition.tsx` and `SectionTransition.tsx`
- **Forms:** React Hook Form + Zod schemas; toast feedback via `sonner`
- **UI primitives:** shadcn/ui ("new-york" style, ~8 components: Badge, Button, Card, Dialog, Input, Label, Textarea, Toast)
- **Database:** Drizzle ORM v0.45 + Neon serverless PostgreSQL
- **Authentication:** JWT-based admin session (jose library)
- **Rate limiting:** Upstash Redis (sliding-window)
- **Email:** Resend for transactional emails
- **Internationalization:** en/mk/gr via `lib/i18n/` (context + 873-line translations file)
- **Testing:** Vitest (unit + integration), Playwright (e2e), Testing Library, Testcontainers

### Build config notes

`next.config.ts` has `ignoreBuildErrors: false` and `ignoreDuringBuilds: false` — TypeScript and ESLint errors **do** block the build. Fix all issues before committing.
