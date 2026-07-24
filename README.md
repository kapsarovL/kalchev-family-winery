# 🍷 Kalchev Family Winery

Marketing website for **Kalchev Family Winery** — a family-owned winery in Bogdanci, Macedonia, crafting award-winning wines since 1932.

Built with Next.js 15 App Router, Tailwind CSS, and Drizzle/Neon PostgreSQL. Fully internationalized in English, Macedonian, and Greek.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 15](https://nextjs.org) (App Router) |
| Language | TypeScript (strict) |
| Styling | [Tailwind CSS 3.4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) (New York) |
| Animation | [framer-motion 12](https://www.framer.com/motion/) |
| Database | [Neon](https://neon.tech) Serverless PostgreSQL via [Drizzle ORM](https://orm.drizzle.team) |
| Forms | react-hook-form 7 + zod 3 |
| Tests | Vitest + Testcontainers (unit/integration), Playwright (E2E) |
| CI/CD | GitHub Actions + Vercel |

## Getting Started

```bash
# Install dependencies
pnpm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your DATABASE_URL (Neon PostgreSQL)

# Run migrations
pnpm db:push

# Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm lint` | Run ESLint |
| `pnpm format` | Format with Prettier |
| `pnpm test:unit` | Run unit tests (Vitest) |
| `pnpm test:integration` | Run integration tests (Testcontainers) |
| `pnpm test:e2e` | Run E2E tests (Playwright) |
| `pnpm test:all` | Run all tests |
| `pnpm typecheck` | TypeScript type checking |
| `pnpm db:generate` | Generate Drizzle migrations |
| `pnpm db:migrate` | Apply migrations |
| `pnpm db:studio` | Open Drizzle Studio |

## Project Structure

```
app/               — Next.js App Router pages, layouts, SEO routes
components/        — React components (sections, cards, cart, ui)
config/            — Site configuration and metadata
context/           — Project documentation and progress tracking
data/              — Static content with 3-language translations
drizzle/           — Database migrations
hooks/             — Custom React hooks
lib/               — Utilities, DB, i18n, server actions, schemas, contexts
public/            — Static assets (images, video, fonts)
types/             — TypeScript type definitions
e2e/               — Playwright end-to-end tests
```

## Internationalization

3 locales supported:

| Code | Language |
|------|----------|
| `en` | English (default) |
| `mk` | Macedonian (Македонски) |
| `gr` | Greek (Ελληνικά) |

Locale is persisted in localStorage and applied via React Context. All visible UI strings are translated.

## Database

The app uses Neon Serverless PostgreSQL with Drizzle ORM. All database operations gracefully degrade — if `DATABASE_URL` is not set, the app logs a warning and continues without the database.

**Tables:** `contact_submissions`, `wine_inventory`, `newsletter_subscribers`

## Deployment

Deployed via [Vercel](https://vercel.com). Preview deployments are created for every PR to `main`.

## Issue Tracking

Issues are tracked in [Linear](https://linear.app) under the **Kalchev Family Winery** project (key: PRO).

## License

MIT — see [LICENSE](./LICENSE) for details.
