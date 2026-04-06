# Takamul Smart Technology — Project Guide

## What is this?

Corporate website for Takamul Smart Technology, a digital transformation agency. Built with Next.js 15 (App Router), Vite (build tool), TailwindCSS v4, motion.dev (Framer Motion), Redux Toolkit, Jest + Playwright (testing), Sentry (monitoring), TypeScript.

## Tech Stack

- **Framework:** Next.js 15 App Router + TypeScript
- **Build/Dev Tool:** Vite — replaces Next.js default bundler for faster HMR + optimized production builds (via vinext plugin)
- **Styling:** TailwindCSS v4 (CSS-first config via `@theme` in globals.css)
- **Animations:** motion.dev (Framer Motion)
- **State:** Redux Toolkit (uiSlice + contactFormSlice only)
- **Data Fetching:** Axios (REST) + graphql-request (GraphQL)
- **Form Validation:** Zod (schema-based, type-safe)
- **Unit/Component Tests:** Jest + React Testing Library + ts-jest (separate from Vite — Jest only runs tests)
- **E2E Tests:** Playwright — browser-level tests across Chromium, Firefox, WebKit
- **Fonts:** Inter (Latin) + IBM Plex Sans Arabic (Arabic)
- **Icons:** lucide-react
- **Code Formatting:** Prettier + prettier-plugin-tailwindcss (auto class sorting)
- **Linting:** ESLint (next/core-web-vitals + typescript)
- **Pre-commit:** Husky + lint-staged (auto-lint + format on every commit)
- **Email Service:** Resend (contact form delivery)
- **Rate Limiting:** Upstash Redis (@upstash/ratelimit) — 3 req/IP/60s on contact API
- **Error Monitoring:** Sentry — client + server + edge error tracking, performance monitoring, session replay
- **Analytics:** Google Analytics 4 (via next/script, consent-aware)
- **CI/CD:** GitHub Actions (lint → jest → build → playwright → deploy)
- **Deployment:** Vercel — production from `main`, preview deploy per PR

### Vite ≠ Jest ≠ Playwright — Three Different Tools

- **Vite** = Build tool + dev server. Config: `vite.config.ts`. Commands: `npm run dev`, `npm run build`
- **Jest** = Unit/component test runner. Config: `jest.config.ts`. Commands: `npm test`
- **Playwright** = E2E browser test runner. Config: `playwright.config.ts`. Commands: `npm run test:e2e`
- They are completely independent tools serving different purposes

## Architecture Rules

### i18n (Arabic/English)

- URL pattern: `/en/...` and `/ar/...`
- Dictionary JSON files at `src/i18n/dictionaries/{en,ar}.json`, namespaced by page
- **NEVER hardcode user-facing text** — all text comes from dictionaries
- Content data (slugs, images, ordering) in `src/data/*.ts`, translations in dictionaries, merged in server components
- Every `[locale]` page exports `generateStaticParams` for both locales

### RTL/LTR — CRITICAL

- **NEVER** use physical CSS properties: `pl-`, `pr-`, `ml-`, `mr-`, `left-`, `right-`, `text-left`, `text-right`, `border-l`, `border-r`, `rounded-l`, `rounded-r`
- **ALWAYS** use logical properties: `ps-`, `pe-`, `ms-`, `me-`, `start-`, `end-`, `text-start`, `text-end`, `border-s`, `border-e`, `rounded-s`, `rounded-e`
- The `[locale]/layout.tsx` sets `dir="rtl"` or `dir="ltr"` on `<html>`

### Components

- **Server Components by default** — add `"use client"` only for animations, Redux, or browser APIs
- Section components (Hero, ServiceGrid, etc.) receive all text via props — never import dictionaries directly
- UI components are atomic and reusable, styled with CVA variants
- Animations use centralized variants from `src/animations/variants.ts`
- All animations respect `prefers-reduced-motion`
- `slideInStart`/`slideInEnd` use logical direction — auto-flip for RTL
- Page transitions use `AnimatePresence` via `PageTransition` wrapper

### SEO

- Every page has `generateMetadata()` with title, description, OG image, Twitter Card tags
- `<JsonLd>` structured data on relevant pages (Organization, Service, Article)
- `src/app/sitemap.ts` auto-generates sitemap for all locales
- Canonical URLs with hreflang alternates
- `manifest.webmanifest` for PWA basics

### Privacy / Cookie Consent

- `CookieConsent` component gates analytics loading — GA4 only loads after user accepts
- Consent state stored in `uiSlice.cookieConsent` + persisted to localStorage

### Security

- `next.config.ts` has strict security headers (CSP, HSTS, X-Frame-Options, Permissions-Policy, etc.)
- Never inline scripts without nonce
- API calls go through configured Axios/GraphQL clients in `src/lib/api/`
- Contact API route validates input with Zod + Upstash rate limiting (3 req/IP/60s) + honeypot spam protection
- No sensitive data in `.env` committed — use `.env.example` as template
- `middleware.ts` runs on Edge Runtime — no Node.js APIs (fs, path, etc.)

### Accessibility

- SkipLink component in layout
- All images have meaningful `alt` text
- WCAG AA color contrast (4.5:1 body, 3:1 large text)
- Focus visible on all interactive elements
- Keyboard navigable throughout

### Dark Mode

- Supported via `class` strategy on `<html>`
- Toggled via `uiSlice.theme` (light/dark/system)
- All colors as CSS custom properties with dark variants

### Caching & Rendering

- Home, About, Services listing → **SSG** (revalidate 24h via ISR)
- Service/Case Study `[slug]` → **SSG + generateStaticParams** (ISR 1h)
- Blog `[slug]` → **ISR** (revalidate 30min)
- Contact → **SSR** (dynamic, needs fresh nonce)
- API routes → no cache

### Performance Budgets

- Initial JS bundle: < 150KB gzipped
- CSS: < 30KB gzipped
- Fonts: `display: 'swap'` — no FOIT
- Touch targets: ≥ 44x44px on mobile

## Commands

```bash
npm run dev          # Start dev server (Vite)
npm run build        # Production build (Vite)
npm run start        # Start production server
npm run lint         # ESLint check
npm run lint:fix     # ESLint auto-fix
npm run format       # Prettier format all files
npm run format:check # Prettier check (CI)
npm test             # Jest — run all unit/component tests
npm run test:watch   # Jest — watch mode
npm run test:coverage # Jest — with coverage report
npm run test:e2e     # Playwright — run all E2E tests
npm run test:e2e:ui  # Playwright — interactive UI mode
```

## Folder Structure Overview

```
src/
├── app/[locale]/    # Pages (i18n routed) + not-found.tsx, error.tsx, loading.tsx
├── app/api/         # API routes (contact form + Upstash rate limiting)
├── app/sitemap.ts   # Auto-generated sitemap
├── components/      # layout/ sections/ ui/ forms/ shared/
├── data/            # Structured content data (services, values, case-studies, site-config)
├── i18n/            # Config, dictionary loader, translation JSONs
├── lib/             # api/ utils.ts fonts.ts metadata.ts
├── store/           # Redux (index, provider, hooks, slices/)
├── hooks/           # Custom React hooks
├── types/           # TypeScript type definitions
├── content/         # MDX blog posts (local content for v1)
└── animations/      # Motion variants and config
e2e/                 # Playwright E2E tests (home, navigation, contact-form, i18n, dark-mode, accessibility)
```

## Key Config Files

- `vite.config.ts` — **Build tool** config (React plugin, path aliases, code splitting, asset optimization)
- `jest.config.ts` — **Test runner** config (ts-jest, jsdom, path aliases, setup file)
- `next.config.ts` — **Framework** config (security headers, image optimization)
- `.prettierrc` — Prettier config + Tailwind class sorting plugin
- `.husky/pre-commit` — Runs lint-staged before every commit
- `playwright.config.ts` — **E2E tests** config (browsers, base URL, web server auto-start)
- `sentry.client.config.ts` / `sentry.server.config.ts` / `sentry.edge.config.ts` — **Error monitoring**
- `.github/workflows/ci.yml` — CI pipeline (lint → jest → build → playwright → deploy)
- `src/middleware.ts` — i18n locale detection and routing
- `src/app/[locale]/layout.tsx` — Root locale layout (lang, dir, fonts, providers, metadata)
- `src/animations/variants.ts` — All shared motion variants
- `src/lib/api/axios-client.ts` — Configured Axios instance
- `src/types/dictionary.ts` — Typed dictionary structure (ensures en.json and ar.json keys match)
- `.env.example` — Required environment variable template (never commit `.env`)
