# GITB-CAPSTONE-01 — GITBootcamp

A fully rebuilt, bilingual (EN/TR) bootcamp platform frontend, built from scratch for the Global IT Bootcamp frontend capstone project. Built with Next.js App Router, TypeScript, and Tailwind CSS v4.

**Live demo:** _(Vercel deploy URL goes here)_

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Architecture Decisions](#architecture-decisions)
- [Libraries Used](#libraries-used)
- [Known Issues / Limitations](#known-issues--limitations)
- [Team & Responsibilities](#team--responsibilities)

---

## Project Overview

A ground-up rebuild of the frontend for Global IT Bootcamp's existing bootcamp platform. Backend, database, and real authentication are out of scope — all data comes from typed mock data files.

**Pages:** Landing, Bootcamps (list + filters), Bootcamp Detail, Schedule, About, Contact, Login, Register, 404.

**Features:** Bilingual support (EN/TR), dark/light mode, responsive design, page transition animations, scroll reveal animations, cookie consent banner, form validation, loading/error states, SEO metadata (sitemap, robots, Open Graph).

### Screenshots

_(Landing page, Bootcamps list, Bootcamp detail, and dark mode screenshots go here)_

---

## Tech Stack

| Layer           | Technology                                                                       |
| --------------- | -------------------------------------------------------------------------------- |
| Framework       | Next.js 16.3 (App Router)                                                        |
| Language        | TypeScript (strict mode)                                                         |
| UI              | React 19, functional components + hooks                                          |
| Styling         | Tailwind CSS v4 (CSS-first config)                                               |
| i18n            | next-intl                                                                        |
| Animation       | Framer Motion                                                                    |
| Icons           | lucide-react (+ hand-written inline SVGs, see [Libraries Used](#libraries-used)) |
| Package manager | npm                                                                              |
| Deploy          | Vercel                                                                           |

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/muhammeta55/gitb-capstone-01.git
cd gitb-capstone-01

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open `http://localhost:3000` in your browser — you'll be redirected to `/en` automatically.

### Other commands

```bash
npm run build   # Production build
npm run start   # Run the production build (after building)
npm run lint    # Run ESLint
```

> **Note:** Some bugs (especially production-only issues) only surface with `npm run build && npm run start` — they won't appear under `npm run dev`. It's worth running a production build occasionally, not just relying on dev mode.

---

## Folder Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout — <html>/<body>, theme flash-prevention script
│   ├── sitemap.ts               # Generates /sitemap.xml
│   ├── robots.ts                # Generates /robots.txt
│   ├── opengraph-image.tsx      # Dynamic OG image generation
│   ├── not-found.tsx            # Root-level 404 (for routes outside any locale)
│   └── [locale]/
│       ├── layout.tsx           # Locale-aware layout — Header, Footer, PageTransition, CookieConsent
│       ├── page.tsx             # Landing page
│       ├── not-found.tsx        # In-locale 404
│       ├── bootcamps/
│       │   ├── page.tsx         # List + filters
│       │   └── [slug]/page.tsx  # Detail page (dynamic route)
│       ├── about/, contact/, schedule/, login/, register/
│       └── styleguide/          # Visual reference for design tokens
├── components/
│   ├── ui/                      # Shared primitives: Button, Card, Input, Badge, Accordion, etc.
│   ├── layout/                  # Header, Footer, MobileMenu, ThemeToggle, LanguageSwitcher, CookieConsent, PageTransition, ScrollReveal
│   ├── landing/, bootcamps/, about/, contact/, schedule/, auth/
│   └── ThemeHtmlSync.tsx, LocaleHtmlSync.tsx  # DOM sync components (see Architecture Decisions)
├── data/                        # Typed mock data (bootcamps, categories, instructors, cohorts, testimonials, pricingPlans)
├── types/                       # Shared TypeScript interfaces
├── hooks/                       # useFilters, useCountdown
├── lib/                         # filterBootcamps.ts and other helpers
├── i18n/                        # next-intl routing, navigation, request config
└── middleware.ts                # Locale detection and routing

messages/
├── en.json
└── tr.json
```

---

## Architecture Decisions

### Design Token System

All colors, typography, spacing, and radius values are centrally defined in `globals.css` using Tailwind v4's `@theme inline` syntax. No component uses hardcoded hex colors — see `/styleguide` for a visual reference.

### i18n Structure

Every page lives under a `[locale]` dynamic segment. Middleware automatically redirects `/` requests to `/en` or `/tr`. The root `layout.tsx` stays minimal (just `<html>`/`<body>`); the real content lives in `[locale]/layout.tsx`.

### Theme and Locale DOM Sync

`ThemeHtmlSync` and `LocaleHtmlSync` are components that render no UI and stay mounted at all times. They sync the `class` (dark mode) and `lang` attributes on `document.documentElement` on every route change. This pattern was specifically chosen to avoid sync conflicts caused by theme/language toggle buttons being rendered in more than one place (desktop header + mobile menu) — previously, keeping that state in separate component instances caused brief "flash" glitches during page transitions.

### Static Generation and i18n

The bootcamp detail page (`[locale]/bootcamps/[slug]`) generates both `locale` and `slug` combinations in `generateStaticParams`. Returning only `slug` caused a production `DYNAMIC_SERVER_USAGE` error and locale content getting "stuck" on whichever locale rendered first — an important Next.js behavior to watch for on routes with more than one dynamic segment.

### Component Reuse

Primitives like `Button`, `Card`, `Input`, and `Badge` live centrally in `src/components/ui/`. Page-specific components (`BootcampCard`, `ContactForm`, etc.) wrap them rather than rebuilding them.

---

## Libraries Used

| Library           | Why it was chosen                                                                                                                                                                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **next-intl**     | Best-supported i18n solution for App Router; middleware-based locale routing with clean server/client component separation                                                                                                                                    |
| **Framer Motion** | Used for page transitions and scroll animations. With multiple team members writing animation code, a consistent API and built-in `prefers-reduced-motion` support (`useReducedMotion`) made it the safer choice                                              |
| **lucide-react**  | Lightweight, tree-shaken icon library for general-purpose icons. **Note:** version 1.0 removed all brand/logo icons (GitHub, LinkedIn, Twitter, etc.) — so the footer's social icons are hand-written inline SVGs instead of relying on an additional package |

---

## Known Issues / Limitations

- **Cosmetic console warning:** The theme flash-prevention script triggers a known React 19 / Next.js 16.2+ false-positive warning ("Encountered a script tag...") during page transitions. The script works correctly, there's no visible flash, and it doesn't affect the production build.
- **Middleware → Proxy naming:** Next.js 16.3 renamed the `middleware.ts` convention to `proxy`. Current code still works, but may need migrating later (`npx @next/codemod@canary middleware-to-proxy .`).
- **Edge Runtime deprecation warning:** `opengraph-image.tsx` uses `runtime = "edge"`, which Next.js has marked deprecated. Works fine currently; migrating to the `nodejs` runtime could be considered later.
- **Course content is English-only:** Bootcamp titles/descriptions (mock data) are only in English; while UI text is fully translated, translating course content itself was out of scope — it would require restructuring the data model (e.g. `title: { en, tr }`).
- **No real authentication:** Login/Register forms work with mock data (sign in with `test@test.com` / `123456`; registering with that same email simulates an "already registered" error).

---

## Team & Responsibilities

| Role                                     | Person   | Area of Responsibility                                                                                           |
| ---------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| R1 — Platform & Design System, Team Lead | Muhammet | Project setup, design tokens, shared UI components, layout, i18n/theme infrastructure, deployment, documentation |
| R2 — Marketing Pages                     | Neslihan | Landing, About, Contact, page transition and scroll animations                                                   |
| R3 — Product Pages                       | Sefa     | Bootcamps list/filters, Bootcamp detail, Schedule, Login/Register, 404, SEO, loading/error states                |

---

## Retro Notes

### What went well

- **The component-first foundation paid off.** Getting Button, Card, Input, Badge and the rest of `components/ui/` locked down on Day 1-2 meant R2 and R3 were never blocked waiting on shared pieces, and a single token change (like a new radius value) propagated everywhere automatically.
- **Review discipline actually caught real bugs.** Not stylistic nitpicks — genuine regressions: a dark-mode redesign that shipped with zero design tokens, a lint rule silently broken twice, a production-only routing crash that `npm run dev` never revealed. Every one of these was caught before merging to `main`, exactly what the review process is for.
- **We completed the full Should list**, not just the Musts: search/filter/sort, cookie consent, live countdown, SEO metadata, and a static student dashboard mockup — while keeping every Must item done first.
- **Debugging sessions turned into documentation.** The `generateStaticParams` locale bug, the `min-h-full` vs `min-h-screen` footer-pinning saga, and the dual-instance theme-sync race condition all became Architecture Decisions in this README, not just fixed-and-forgotten commits.

### What didn't go well

- **The same regression landed twice.** The `h-full` → `min-h-screen` footer bug was fixed once, then reintroduced when a later PR (SEO metadata) was branched from an older `main` and rewrote the same file. We didn't have a habit of pulling latest `main` immediately before starting work on shared files.
- **Dependency duplication happened more than once.** Two different branches each independently added `lucide-react` before either merged, causing an avoidable `package-lock.json` conflict. A quick "check `package.json` on main first" step would have prevented it.
- **A few production-only bugs stayed hidden longer than they should have.** Several of us defaulted to testing with `npm run dev`, which never triggers Next.js's static-generation edge cases. The actual production bug (`DYNAMIC_SERVER_USAGE`) was only found once someone ran a real `npm run build && npm run start`.
- **Translation JSON merge conflicts were a recurring source of friction** — not because the content actually conflicted, but because multiple people's new keys kept landing on the same lines in `messages/en.json` / `messages/tr.json`.

### What we'd change next time

- **Establish a "pull main before branching on shared files" habit explicitly**, especially for `layout.tsx`, `globals.css`, and the translation JSON files — these are the files every feature branch eventually touches.
- **Run a production build check earlier and more often**, not just before a deadline. A `npm run build && npm run start` pass after any routing or layout change would have caught the locale/static-generation bug days sooner.
- **Announce new dependencies to the team before adding them**, even small ones — a one-line Slack message would have avoided every duplicate-dependency conflict we hit.
- **Structure translation files to reduce merge collisions** — e.g., splitting `messages/en.json` into smaller per-feature files instead of one large file, so two people's simultaneous additions don't land on the same lines.
