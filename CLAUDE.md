# The Gathering Co.

Phase 1 marketing site for a Newcastle event hire business. Next.js 16 App Router, React 19, TypeScript strict,
Tailwind v4, shadcn/ui, Zod 4, Biome, Vitest, Playwright, pnpm. No database, no auth, no server in phase 1.
The site's one job is to make someone message the owner on WhatsApp.

Read `docs/SPEC.md` first; it wins over this file on any conflict. `docs/RUNBOOK.md` has commands, env vars and the
list of placeholders. `src/server/README.md` says where phase 2 goes. The skills in `docs/gc-*.SKILL.md` describe
product, UI, frontend and backend discipline for this app.

## Commands

`pnpm dev | build | start | lint | typecheck | test | test:e2e | screenshots`

## Layout

```
src/app/(site)/        pages: /, /hire, /hire/[slug], /occasions, /about, /contact
src/content/           site.ts (SITE config from env), catalogue.ts, occasions.ts, faq.ts. Typed arrays + lookups
src/domain/            types.ts, schemas.ts. Pure, no I/O, no React
src/lib/               whatsapp.ts, utils.ts (cn), seo.ts
src/components/ui/     shadcn primitives, lint-excluded, vendor code
src/components/domain/ app vocabulary: ItemCard, OccasionCard, EnquireButton, WhatsAppButton, SocialLinks, ...
src/components/shell/  SiteHeader, SiteFooter, MobileNav, FloatingWhatsApp, nav.ts (single nav list)
src/components/forms/  enquiry-form.tsx (client)
src/server/            phase 2 only; README.md explains the layering
```

## Conventions and rules

**Code**

- Plain readable code. No abstraction until the second use. No barrel files except `components/domain/index.ts`.
- Server components by default. Add `"use client"` only to the component that needs state or events, never to a page.
- Every colour, radius and font comes from a token in `globals.css`. A hex value in a component is a review failure.
- Contact details only from `SITE`. Catalogue data only from `src/content`. A string literal phone number or handle
  anywhere else is a review failure.
- All external links open in a new tab with `rel="noopener noreferrer"`.
- `next/image` for every raster image, with width, height and `alt`. Decorative ornaments get `alt=""`.
- Biome clean, `tsc --noEmit` clean, no `any`.

**Content and copy**

- British English. No em dashes; use commas, full stops or a plain hyphen.
- Unknown facts use plausible dummy data marked with a `[TODO]` marker in code and copy, so they are easy to find and
  swap. Dummy data must look real enough to judge the design: real-sounding item names, sensible prices in GBP,
  Newcastle postcodes.
- Headings in sentence case except the eyebrow caps style.
- No exclamation marks except the documented closing line "We'd love to hear from you!"

**Accessibility and performance**

- Visible focus rings in `tan`. Tap targets at least 44 px. Contrast AA for all text on `cream` and `linen`.
- `prefers-reduced-motion` disables all animation.
- Lighthouse mobile: performance, accessibility and SEO at 90 or above on every route.

**Git and ops**

- Conventional commits. One PR per page or component group.
- `.env.example` lists every variable even if phase 1 has none that are secret.
- Commands: `pnpm dev | build | start | lint | typecheck | test | test:e2e`.

## Architecture rules the code relies on

- Pages compose and do not style. Contact details come only from `SITE`. Catalogue data comes only from
  `src/content`. Every list component owns its empty state.
- `src/content/` is the only place that knows the data is a file. Phase 2b swaps the arrays for a repository behind
  the same signatures (`getItem(slug)`, `listItems(category?)`, `listOccasions()`).
- All WhatsApp links go through `whatsappUrl()` in `src/lib/whatsapp.ts`.

## Extension path

| Phase | Adds | Seam it replaces |
| --- | --- | --- |
| 2a persisted enquiries | `POST /api/enquiries`, Resend email | `enquiry-form.tsx` posts to the API as well as opening WhatsApp |
| 2b database catalogue | Postgres (Neon), Drizzle, `ItemRepository` | `src/content/catalogue.ts` becomes a thin adapter, same signatures |
| 2c admin | `(admin)` route group, Better Auth, invite-only, item CRUD | None; new routes behind `requireContext` |
| 3 booking | Availability per item per date, quote builder, Stripe deposit | `EnquireButton` gains a "Check dates" sibling |
| 3+ other lines | Packages, styling, add-ons as new `Category` values | `src/domain/types.ts` |

Keep so these slot in: stable string slug ids on content items, `Category` as a closed union, `Item.priceText` as a
string until money rules exist, `src/server/README.md` naming the Daybook layering.
