# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server on port 3000
npm run build    # Production build
npm run lint     # Run ESLint
```

There is no test framework configured in this project.

## Architecture

This is a single-page marketing website for Kalchev Family Winery, built with **Next.js 15 App Router**. All content renders on the homepage (`/`).

### Key structural patterns

- `app/page.tsx` — composes all homepage sections in order; this is the entry point for content changes
- `app/layout.tsx` — root layout with font variables and metadata; wraps `client-layout.tsx` which provides `StyleRegistry` and `TransitionProvider`
- `components/` — organized by section (`hero/`, `about/`, `products/`, `testimonials/`, etc.) plus `ui/` (shadcn primitives) and `shared/` (reusable wrappers like `OptimizedImage`, `SectionTransition`)
- `data/wines.ts` and `data/testimonials.ts` — all static product/review data; these are the source of truth for content
- `lib/actions.ts` — Server Action handling contact form submission (the only server-side logic)
- `lib/schema.ts` — Zod schemas for form validation, shared between client and server action
- `config/site.ts` — site-wide metadata (name, description, social links)

### Tech stack

- **Styling:** Tailwind CSS with a custom winery palette (`wineRed`, `cream`, `gold`, `deepBrown`, `oliveGreen`) defined in `tailwind.config.ts`; dark mode via `next-themes` (class-based)
- **Fonts:** `PlayfairDisplay` (headings) and `Inter` (body), loaded locally in `app/fonts/` and injected as CSS variables
- **Animations:** `motion` (Framer Motion successor); page/section transitions via `lib/transition-context.tsx`
- **Forms:** React Hook Form + Zod; toast feedback via `sonner`
- **UI primitives:** Radix UI + shadcn/ui ("new-york" style, configured in `components.json`)

### Installed but inactive

- **Drizzle ORM + drizzle-kit** — dependencies present, no database connection configured
- **TanStack Query** — query client in `lib/queryClient.ts`, not actively used

### Build config notes

`next.config.ts` has `ignoreBuildErrors: true` and `ignoreDuringBuilds: true` — TypeScript and ESLint errors do not block the build. Fix issues rather than relying on these flags.
