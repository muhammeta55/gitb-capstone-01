This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Lighthouse Audit

This project is periodically audited with [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/) to track performance, accessibility, best practices, and SEO scores.

To run a local audit:

```bash
npm run build
npm run start
npx lighthouse http://localhost:3000 --view
```

### Latest Scores

Tested locally against a **production build**, using Chrome DevTools Lighthouse (Desktop, Navigation mode). Three representative pages were audited to cover different risk areas: static content, client-side data/interactivity, and dynamic routing.

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Landing (`/en`) | 99 | 95 | 100 | 100 |
| Bootcamps list (`/en/bootcamps`) | 100 | 90 | 100 | 100 |
| Bootcamp detail (`/en/bootcamps/full-stack-web-development`) | 97 | 96 | 100 | 100 |

> **Note:** The Bootcamps list page scores exactly 90 on Accessibility — passing, but with no margin. Worth revisiting before it silently regresses below the threshold.

> Scores last updated: 2026-08-10

### Screenshots

**Landing (`/en`)**

![Landing Lighthouse results](docs/lighthouse/landing.png)

**Bootcamps list (`/en/bootcamps`)**

![Bootcamps list Lighthouse results](docs/lighthouse/bootcamps-list.png)

**Bootcamp detail (`/en/bootcamps/full-stack-web-development`)**

![Bootcamp detail Lighthouse results](docs/lighthouse/bootcamp-detail.png)

> Scores last updated: 2026-8-10
