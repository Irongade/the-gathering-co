# Runbook

How to run, check and ship The Gathering Co. site, plus everything to replace before it goes public.

## Commands

| Command | What it does |
| --- | --- |
| `pnpm dev` | Dev server on http://localhost:3000 |
| `pnpm build` then `pnpm start` | Production build and server |
| `pnpm lint` | Biome check (format, lint, import order) |
| `pnpm typecheck` | `next typegen` then `tsc --noEmit` |
| `pnpm test` | Vitest unit tests: WhatsApp links, schemas, content, SEO helpers |
| `pnpm test:e2e` | Playwright smoke flow on Pixel 7 and desktop. Builds and starts the site itself when not in CI |
| `pnpm screenshots` | Renders every route at 390 and 1280 wide into `screenshots/` and fails on console errors. Needs a running server |
| `pnpm brand:assets` | Regenerates placeholder item and occasion images and PNG icons from `public/brand/logo-round.svg` |

First time: `pnpm install`, `cp .env.example .env.local`, `pnpm exec playwright install chromium`.

## Environment variables

All phase 1 variables are public (`NEXT_PUBLIC_`), read once in `src/content/site.ts` and validated with Zod at
import. A missing or non-E.164 WhatsApp number fails the build with a clear message.

| Variable | Dummy value | Replace with |
| --- | --- | --- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `447000000000` | Owner's WhatsApp number in E.164 digits |
| `NEXT_PUBLIC_CONTACT_EMAIL` | `hello@example.com` | Owner's email |
| `NEXT_PUBLIC_INSTAGRAM_URL` | `https://instagram.com/thegatheringco` | Real profile URL, or empty to hide |
| `NEXT_PUBLIC_FACEBOOK_URL` | `https://facebook.com/thegatheringco` | Real page URL, or empty to hide |
| `NEXT_PUBLIC_TIKTOK_URL` | empty | Real profile URL, or leave empty |
| `NEXT_PUBLIC_SITE_URL` | `https://thegatheringco.co.uk` | The registered domain |

Set the same variables in the Vercel project (Production and Preview) and in `.github/workflows/ci.yml`.

## Deploy to Vercel

1. Push the repository to GitHub.
2. In Vercel, import the repository. Framework preset: Next.js. Package manager is pinned to pnpm.
3. Add the environment variables above.
4. Deploy. Preview deployments build on every PR; production on `main`.

## Every [TODO] to replace before going public

Search the repo for `[TODO]` and `DUMMY`. The list today:

| Where | What |
| --- | --- |
| `.env.example` and Vercel env | Contact details and social URLs |
| `public/brand/logo-round.svg`, `logo-lockup.svg` | Placeholder logos. Replace with the owner's artwork, then run `pnpm brand:assets` to regenerate PNG icons. The header lockup needs a version that reads on the dark `cream` too, or a `dark` swap in `SiteHeader` |
| `public/items/*.svg` | Placeholder item photos. Replace with real photography (4:5 crop) and update `images` in `src/content/catalogue.ts` |
| `public/occasions/*.svg` | Placeholder occasion tiles. Replace with the four flyer crops (square) |
| `src/content/catalogue.ts` | Eight dummy items, prices, dimensions and quantities |
| `src/content/faq.ts` | Delivery radius, minimum order, damage and weather policies |
| `src/app/(site)/about/page.tsx` | Who runs the business, delivery radius |
| `src/app/(site)/contact/page.tsx` | Service area wording, optional map embed |
| `src/app/globals.css` | Brand hex values if the owner supplies exact ones |
| `src/app/opengraph-image.tsx` | Uses the same inferred colours; swap for the real logo artwork if preferred |

## Decisions worth knowing

- `--primary` maps to `tan-deep`, not `tan`, so button labels pass AA contrast (4.7:1 against surface text; tan is
  3.2:1). `tan` remains the accent for rules, icons and display text. Change one line in `globals.css` to revert.
- `cocoa-muted` light is `#6f5d4b` rather than the brief's `#7a6755`: the brief value is 4.26:1 on `linen` and fails
  AA for body text. The darker value passes on cream, linen and surface. Also a one-line change in `globals.css`.
- Tailwind runs through `@tailwindcss/turbopack` (the Next 16 default) rather than PostCSS. There is no
  `postcss.config.mjs`.
- Brand icons for Instagram, Facebook and TikTok are inline SVGs in `src/components/domain/brand-icons.tsx`
  because lucide no longer ships brand marks.
- The occasion select on the enquiry form is a native `<select>` for reliability on phones.

## Gotchas

- Turbopack's persistent build cache in `.next` has served stale CSS after a token change in `globals.css`. If a
  colour or utility change does not show up after `pnpm build`, run `rm -rf .next` and build again.
- `pnpm test:e2e` reuses a server already on port 3000. Stop any old `next start` first (`lsof -ti tcp:3000 | xargs kill`)
  or the tests run against the previous build.

## Phase 2 entry points

See `src/server/README.md` and `docs/SPEC.md` section "Extension path".
