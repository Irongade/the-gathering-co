# The Gathering Co. Web App Brief

Oct 20, 2026 · @Ade

## How to use this doc

This is a build brief to paste into an LLM coding session. It describes a phase 1 marketing site for The Gathering Co. with a codebase shaped so booking, inventory and admin can be added later without a rewrite.

One-line brief: build a small, fast, mobile-first Next.js site for a Newcastle event hire business, with WhatsApp and social links as the only conversion path, no database, and a folder structure that already has room for a backend.

Each fact below is tagged so the LLM does not invent detail:

- **Documented**: taken from the brand images or owner's instructions. Use as given.
- **Inferred**: a reasonable reading of the brand or the reference architecture. Use unless the owner says otherwise.
- **Open**: unknown. Use the placeholder named in section 11 and never fabricate a value.

## The business

The Gathering Co. is a new event hire company serving Newcastle and surrounding areas. The "Something new is coming" teaser from the flyer is dropped; the site launches as the real thing.

| Fact | Value | Status |
| --- | --- | --- |
| Name | The Gathering Co. (logo renders "The" in script, "GATHERING CO." in serif caps) | Documented |
| Tagline | Event hire for life's special moments | Documented |
| Service area | Newcastle & surrounding areas | Documented |
| Core offer | Table & chair hire with delivery & collection | Documented |
| Occasions shown | Birthdays, baby showers, garden parties, family celebrations | Documented |
| Promise | Making your gatherings easier | Documented |
| Closing line | We'd love to hear from you! | Documented |
| Item range beyond tables and chairs | Likely to grow (linen, backdrops, balloon stands appear in imagery) | Inferred |
| Pricing, minimum order, delivery radius | Not stated | Open |
| Owner contact details, social handles | Not stated | Open |

The owner may expand beyond rentals later (styling, packages, bookings). Nothing in phase 1 should assume rentals are the only product line.

## Scope

Phase 1 is a static-first marketing site. Its only job is to make someone message the owner on WhatsApp or follow on social.

**In scope (phase 1)**

- Landing page plus a handful of content pages (section 4)
- WhatsApp deep links with prefilled messages, social links, email link
- A lightweight enquiry form that hands off to WhatsApp (no server storage)
- Catalogue content from a typed, in-repo data file (no database)
- Design system, tokens, shell and domain components built to the Daybook pattern so later pages look the same
- PWA manifest, metadata, Open Graph image, sitemap, robots
- Lint, typecheck, build, a smoke e2e, Vercel deploy

**Out of scope (phase 1)**

- Database, ORM, migrations, auth, sessions, admin UI
- Online booking, availability calendar, payments, quotes
- CMS integration
- Analytics beyond what Vercel gives for free

**Must stay open to (phase 2+)**

- Swapping the in-repo catalogue for Postgres + Drizzle without touching pages
- Adding `(admin)` routes behind Better Auth
- Enquiries persisted and emailed (Resend) in addition to WhatsApp
- A booking flow with dates, quantities and a quote
- Product lines that are not rentals (packages, styling, add-ons)

When in doubt, build less. A folder that exists with one file in it is enough to mark where phase 2 goes.

## Pages

Five routes. Every page ends with the same contact band (WhatsApp button, socials, service area).

| Route | Purpose | Content |
| --- | --- | --- |
| `/` | Landing | Hero (logo, headline "Event hire for life's special moments", one line on tables, chairs and delivery across Newcastle, WhatsApp CTA); occasions grid (4 cards from the flyer); "what we offer" strip (table & chair hire, delivery & collection, Newcastle & surrounding areas, making your gatherings easier); featured items; how it works (3 steps: message us, we confirm, we deliver and collect); closing band "We'd love to hear from you!" |
| `/hire` | Catalogue | Grid of hire items from `src/content/catalogue.ts`: name, image, short description, price text if known, "Enquire" button that opens WhatsApp with the item name prefilled. Filter chips by category (Tables, Chairs, Linen, Decor) |
| `/hire/[slug]` | Item detail | One item: gallery, description, dimensions and quantity available if known, related items, Enquire CTA. Static params generated from the catalogue file |
| `/occasions` | Occasions | One section per occasion (birthdays, baby showers, garden parties, family celebrations): short copy, suggested items, Enquire CTA prefilled with the occasion |
| `/about` | About | Who runs it, the service area, delivery and collection in plain words, FAQ accordion (delivery, minimums, damage, weather). FAQ answers are Open: use plausible dummy copy marked `[TODO]` |
| `/contact` | Contact | Enquiry form (section 5), WhatsApp button, email, socials, service area text, optional map embed (Open) |

Not pages but required: `not-found.tsx`, `error.tsx`, `sitemap.ts`, `robots.ts`, `manifest.ts`, `opengraph-image.tsx` using the round logo.

Copy voice: warm, plain, short. No exclamation marks except the documented closing line. British English.

## Contact and enquiry

WhatsApp is the primary channel. Everything else is secondary.

**Config**: contact and social links come from environment variables, read once in `src/content/site.ts` and exported as `SITE = { name, tagline, area, whatsapp: { number, defaultMessage }, email, socials: { instagram, facebook, tiktok } }`. Variables are `NEXT_PUBLIC_` prefixed so client islands (floating button, enquiry form) can read them too:

```
NEXT_PUBLIC_WHATSAPP_NUMBER=447000000000
NEXT_PUBLIC_CONTACT_EMAIL=hello@example.com
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/thegatheringco
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/thegatheringco
NEXT_PUBLIC_TIKTOK_URL=
```

`.env.example` ships these dummy values; `.env.local` is gitignored. An unset social variable means that icon is not rendered. `site.ts` validates the set with Zod at import time and throws a clear error if the WhatsApp number is missing or not E.164. No contact detail is hard-coded anywhere else.

**WhatsApp links**: `src/lib/whatsapp.ts` exports `whatsappUrl(message?: string)` returning `https://wa.me/<E.164 number without +>?text=<encodeURIComponent(message)>`. Prefilled messages by context:

| Context | Prefilled message |
| --- | --- |
| Generic CTA | Hi The Gathering Co, I'd like to ask about hiring for an event. |
| Catalogue item | Hi, I'm interested in hiring: `<item name>`. |
| Occasion page | Hi, I'm planning a `<occasion>` and would like to ask about hire. |
| Enquiry form | Structured message built from the form fields (below) |

**Enquiry form** (`/contact`): fields name, event date, occasion (select), rough guest count, postcode or area, message. Validated with Zod in `src/domain/schemas.ts`. On submit it builds a multi-line message and opens WhatsApp in a new tab; nothing is sent to a server. Also offer a "Copy message" button and a `mailto:` fallback with the same body. Submit button uses the `pending` pattern from Daybook.

**Socials**: a `SocialLinks` domain component reads `SITE` and renders only the handles that are set. Icons from lucide (`Instagram`, `Facebook`, `Mail`, `MessageCircle` for WhatsApp).

**Floating WhatsApp button**: fixed bottom-right on every page, respects safe-area insets, hidden on `/contact`.

## Brand and design system

The look is soft, warm and editorial: cream backgrounds, cocoa text, tan rules, sage leaves, a touch of blush. Lots of air, thin lines, watercolour-style soft blocks behind headings. Nothing glossy, no hard shadows, no pure white, no pure black.

**Palette** (hex values inferred from the brand images; keep the structure, adjust values if the owner supplies exact ones). Same tint + ink pairing as Daybook.

| Role | Token | Light | Dark |
| --- | --- | --- | --- |
| Page background | `cream` | `#F7F1EA` | `#1A1511` |
| Card surface | `surface` | `#FDFAF6` | `#241E19` |
| Soft block behind headings | `linen` | `#EFE3D6` | `#2E2620` |
| Borders, rules | `hairline` | `#E3D6C6` | `#3D332B` |
| Primary text, logo wordmark | `cocoa` | `#3B2A1E` | `#F1E7DB` |
| Secondary text | `cocoa-muted` | `#7A6755` | `#B8A897` |
| Brand accent, rules, icons, buttons | `tan` | `#A8865F` | `#C9A77C` |
| Hover / pressed tan | `tan-deep` | `#8C6B47` | `#D9B98F` |
| Sage tint / ink (positive, nature) | `sage`, `sage-ink` | `#E4E8DB`, `#5F6F4E` | `#2A3124`, `#A9B894` |
| Blush tint / ink (warm highlight) | `blush`, `blush-ink` | `#F5E1DC`, `#A0574D` | `#3A2724`, `#E3A49A` |
| Warning tint / ink | `butter`, `amber` | `#FBF0D2`, `#8A6200` | `#3A2F14`, `#E3B452` |
| Negative tint / ink | `rose`, `brick` | `#FBE7E7`, `#A8322A` | `#402024`, `#F0968D` |
| WhatsApp button | `whatsapp` | `#25D366` on `cocoa` text | same |

Map these onto shadcn semantic variables exactly as Daybook does: `--background: var(--cream)`, `--card: var(--surface)`, `--primary: var(--tan)`, `--primary-foreground: var(--surface)`, `--muted: var(--linen)`, `--border: var(--hairline)`, `--ring: var(--tan)`, `--foreground: var(--cocoa)`. Expose through `@theme inline` so pages use `bg-cream`, `text-cocoa`, `border-hairline`.

**Typography** (next/font/google, all with system fallbacks)

| Use | Font | Notes |
| --- | --- | --- |
| Display, page titles, hero headline | Playfair Display | Matches the wordmark's high-contrast serif; `display` utility like Daybook's |
| Script accent ("The", "We'd love to hear from you") | Great Vibes or Pinyon Script | One `script` utility; use sparingly, never for body or buttons |
| Body, UI, buttons, eyebrow caps | Inter | 15 px root; eyebrow labels in caps with `tracking-[0.18em]` to match "EVENT HIRE" |

Dark mode is supported via next-themes with the same token swap, but default to light; the brand reads best light.

**Motifs**: round logo (image 2) for favicon, OG image and the hero; horizontal logo lockup (image 1 top) for the nav. Leaf sprig SVGs in `tan`/`sage` as section ornaments, low opacity. A short rule with a small heart glyph (`— ♡ —`) as the section divider, built as a `Divider` domain component. Occasion cards use the four photo crops from the flyer with a `linen` label block.

**Radius and depth**: `--radius: 12px`, cards 1 px `hairline` border, no shadow. Shadows only on the floating WhatsApp button. Images get `rounded-xl` and a 1 px hairline.

**Voice**: plain words, short sentences, warm not salesy. Status words are nouns and verbs, never icons alone. Empty states are invitations with one action.

## Stack and architecture

Same shape as Daybook with the data layer removed. One Next.js app, no second service, no DI container, no Docker, no Redis. Folders and discipline, not framework.

| Concern | Choice | Phase 1 note |
| --- | --- | --- |
| Framework | Next.js 16 App Router, React 19 | Route groups `(site)` and, later, `(admin)`. Pages are server components; only interactive islands are client |
| Language | TypeScript strict, `@/*` alias |  |
| Package manager | pnpm, pinned via `packageManager` |  |
| Styling | Tailwind v4, CSS-first, tokens in `globals.css` | No `tailwind.config` |
| Components | shadcn/ui on Radix, style `radix-nova`, CSS variables on | Primitives in `src/components/ui`, lint-excluded |
| Icons | lucide-react |  |
| Fonts | next/font/google: Inter, Playfair Display, one script face |  |
| Theme | next-themes, class attribute | Light default |
| Toasts | sonner, mounted once | Used for "Copied" and form errors |
| Validation | Zod 4 in `src/domain/schemas.ts` | Enquiry schema only, for now |
| Content | Typed TS files in `src/content/` | Catalogue, occasions, FAQ, site config |
| Images | `next/image`, assets in `public/` | Brand images supplied; item photos are Open |
| Lint / format | Biome 2, 120 cols, 2 spaces |  |
| Unit tests | Vitest | `whatsappUrl`, schemas, content shape |
| E2E | Playwright, mobile + desktop | One smoke flow: land, open item, enquire |
| CI | GitHub Actions: lint, typecheck, test, build, e2e | No Postgres service yet |
| Hosting | Vercel |  |

Not installed in phase 1: Drizzle, pg, Better Auth, Resend, TanStack Query, Recharts, dnd-kit, SheetJS. Each has a named slot in section 10.

**Layering, kept even though it is thin**

- `src/content/` is the only place that knows the data is a file. It exports typed arrays and lookup functions (`getItem(slug)`, `listItems(category?)`, `listOccasions()`). Pages import these and nothing lower.
- `src/domain/` holds types and Zod schemas. Pure, no I/O, no React.
- `src/lib/` holds `whatsapp.ts`, `utils.ts` (`cn`), `seo.ts` (metadata helpers).
- `src/components/domain/` is the app vocabulary: `ItemCard`, `OccasionCard`, `EnquireButton`, `WhatsAppButton`, `SocialLinks`, `SectionCard`, `PageHeader`, `Eyebrow`, `Divider`, `EmptyState`, `FeatureStrip`, `Faq`.
- `src/components/shell/`: `SiteHeader`, `SiteFooter`, `MobileNav`, `nav.ts` as the single nav list.
- `src/server/` exists with a `README.md` and an empty `services/` folder so the LLM building phase 2 puts things where Daybook does.

Rules the architecture relies on: pages compose and do not style; contact details come only from `SITE`; catalogue data comes only from `src/content`; every list component owns its empty state.

## Repository layout

```
docs/                        SPEC.md (this brief), RUNBOOK.md
e2e/                         Playwright smoke flow
public/
  brand/                     logo-round.png, logo-lockup.png, leaf.svg, og.png
  items/                     catalogue photos (placeholders until supplied)
src/
  app/
    layout.tsx               fonts, ThemeProvider, Toaster, metadata, viewport
    globals.css              tokens, theme, utilities (display, script, eyebrow)
    manifest.ts | sitemap.ts | robots.ts | opengraph-image.tsx
    error.tsx | not-found.tsx
    (site)/
      layout.tsx             SiteHeader + SiteFooter + floating WhatsApp
      page.tsx               landing
      hire/page.tsx          catalogue
      hire/[slug]/page.tsx   item detail, generateStaticParams
      occasions/page.tsx
      about/page.tsx
      contact/page.tsx
  content/
    site.ts                  SITE config (contact, socials, area)
    catalogue.ts             items + categories, typed
    occasions.ts
    faq.ts
  domain/
    types.ts                 Item, Category, Occasion, Enquiry
    schemas.ts               Zod: enquirySchema
  lib/
    whatsapp.ts | utils.ts | seo.ts
  components/
    ui/                      shadcn primitives (generated)
    domain/                  ItemCard, OccasionCard, EnquireButton, WhatsAppButton, SocialLinks, ...
    shell/                   SiteHeader, SiteFooter, MobileNav, nav.ts
    forms/
      enquiry-form.tsx       client; Zod safeParse; builds WhatsApp message
  hooks/                     use-media-query, use-local-setting
  server/
    README.md                "phase 2 goes here"; mirrors Daybook: services/, repositories/, db/, auth/
```

Root: `biome.json`, `components.json`, `vitest.config.mts`, `playwright.config.ts`, `postcss.config.mjs`, `tsconfig.json`, `.env.example`, `CLAUDE.md`.

## Conventions and rules

These go into `CLAUDE.md` verbatim so every later session inherits them.

**Code**

- Plain readable code. No abstraction until the second use. No barrel files except `components/domain/index.ts`.
- Server components by default. Add `"use client"` only to the component that needs state or events, never to a page.
- Every colour, radius and font comes from a token in `globals.css`. A hex value in a component is a review failure.
- Contact details only from `SITE`. Catalogue data only from `src/content`. A string literal phone number or handle anywhere else is a review failure.
- All external links open in a new tab with `rel="noopener noreferrer"`.
- `next/image` for every raster image, with width, height and `alt`. Decorative ornaments get `alt=""`.
- Biome clean, `tsc --noEmit` clean, no `any`.

**Content and copy**

- British English. No em dashes; use commas, full stops or a plain hyphen.
- Unknown facts use plausible dummy data marked with a `[TODO]` marker in code and copy, so they are easy to find and swap. Dummy data must look real enough to judge the design: real-sounding item names, sensible prices in GBP, Newcastle postcodes.
- Headings in sentence case except the eyebrow caps style.

**Accessibility and performance**

- Visible focus rings in `tan`. Tap targets at least 44 px. Contrast AA for all text on `cream` and `linen`.
- `prefers-reduced-motion` disables all animation.
- Lighthouse mobile: performance, accessibility and SEO at 90 or above on every route.

**Git and ops**

- Conventional commits. One PR per page or component group.
- `.env.example` lists every variable even if phase 1 has none that are secret.
- Commands: `pnpm dev | build | start | lint | typecheck | test | test:e2e`.

## Extension path

Each later phase replaces one seam. Pages and domain components do not change.

| Phase | Adds | Seam it replaces | Lifted from Daybook |
| --- | --- | --- | --- |
| 2a: persisted enquiries | `POST /api/enquiries`, Resend email to owner, WhatsApp stays as the fast path | `enquiry-form.tsx` posts to the API as well as opening WhatsApp | `server/http.ts`, `errors.ts`, `email/send.ts` |
| 2b: database catalogue | Postgres (Neon), Drizzle, migrations, `ItemRepository` | `src/content/catalogue.ts` becomes a thin adapter over the repository, same function signatures | `db/client.ts`, `db/target.ts`, `repositories/`, `mappers.ts`, `casing: snake_case` |
| 2c: admin | `(admin)` route group, Better Auth, invite-only, item CRUD, enquiry inbox | None; new routes behind `requireContext` | `auth/auth.ts`, `proxy.ts`, `(app)/layout.tsx` pattern |
| 3: booking | Availability per item per date, quote builder, deposit via Stripe | `EnquireButton` gains a "Check dates" sibling | `services/`, `mutate()`, optimistic store |
| 3+: other lines | Packages, styling, add-ons as new `Category` values and content types | `src/domain/types.ts` |  |

Keep in phase 1 so these slot in: tenant-free but UUID-ready ids on content items (`id` as a stable string slug), `Category` as a closed union, `Item.priceText` as a string rather than a number until money rules exist, and `src/server/README.md` naming the Daybook layering.

## Open items

Fill these in before launch. The LLM should build with the placeholder and never invent a value.

| Item | Dummy value for now | Where it lives |
| --- | --- | --- |
| WhatsApp number, email, social URLs | Values in `.env.example` above | env vars via `content/site.ts` |
| Hire item list with photos, dimensions, quantities, price text | 8 dummy items across Tables, Chairs, Linen, Decor with stock-style placeholder images | `content/catalogue.ts`, `public/items/` |
| Delivery radius and any minimum order | "Within 20 miles of Newcastle", no minimum, marked `[TODO]` | `content/faq.ts`, about page |
| Damage, deposit and weather policy | Short plausible answers marked `[TODO]` | `content/faq.ts` |
| Who runs the business, one short paragraph | Dummy paragraph marked `[TODO]` | about page |
| Domain name | `thegatheringco.co.uk` assumed, Inferred | `lib/seo.ts`, `sitemap.ts` |
| Exact brand hex values and font licences | Section 6 values, Inferred | `globals.css` |

- [ ] Owner supplies contact details and socials
- [ ] Owner supplies first catalogue with photos
- [ ] Owner confirms service area wording and delivery terms
- [ ] Decide domain and register it

## Definition of done, phase 1

- [ ] All six routes render on mobile (Pixel 7) and desktop with no console errors
- [ ] Every WhatsApp, email and social link resolves from `SITE` and opens with the right prefilled message
- [ ] Enquiry form validates with Zod, shows per-field errors, opens WhatsApp with a structured message, and offers copy and mailto fallbacks
- [ ] Catalogue and occasions render from `src/content` with empty states when a list is empty
- [ ] Tokens, fonts, logo, OG image and favicon match section 6; dark mode does not break contrast
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`, `pnpm test:e2e` pass in CI
- [ ] Lighthouse mobile at 90 or above on performance, accessibility and SEO for `/` and `/hire`
- [ ] `CLAUDE.md`, `docs/SPEC.md` and `src/server/README.md` exist and say what section 9 and section 10 say
- [ ] Deployed to Vercel with dummy env values set in the project; \`docs/RUNBOOK.md\` lists every `[TODO]` and env var to replace before going public
