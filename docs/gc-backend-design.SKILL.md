---
name: gc-backend-design
description: Backend and data design for The Gathering Co. on the Daybook shape: route handlers as thin controllers, services, repositories, Drizzle + Postgres, Better Auth, Resend, typed errors, env handling and the phase gates for adding them. Use this whenever you add an API route, persist anything, design a schema or migration, add auth or email, replace the in-repo content files with a database, touch src/server, or the user asks "how should the enquiry get saved", "add an admin", "what does the item table look like" or "is it time to add a database". Use it even in phase 1 to keep the seams correct.
---

# Backend design for The Gathering Co.

Phase 1 has no backend: no database, no API routes, no auth. This skill exists so that the seams are right now and so phase 2 is lifted from Daybook rather than invented. Read `docs/SPEC.md` sections 7 and 10 first.

## Phase gates (do not skip)

| Gate | Add when | What arrives |
| --- | --- | --- |
| Persisted enquiries | Owner wants an inbox or loses messages in WhatsApp | `POST /api/enquiries`, Postgres, Resend email, `src/server/*` scaffolding |
| Database catalogue | Owner wants to edit items without a deploy | `items`, `categories`, `item_images` tables, `ItemRepository`, `src/content/catalogue.ts` becomes an adapter |
| Admin | Database catalogue exists | Better Auth, `(admin)` route group, invite-only sign-up, item CRUD |
| Booking | Owner asks for dates and quotes | `bookings`, `booking_items`, availability service, Stripe deposits |

Each gate is one PR series with its own migration set. Never open two gates in one PR.

## Layering (identical to Daybook, points downward only)

```
src/app/api/**/route.ts     controllers   authenticate, parse, call ONE service method, map to HTTP
src/server/services/        services      invariants, db.transaction, typed errors
src/server/repositories/    repositories  the ONLY layer that imports Drizzle; return domain types
src/server/db/              client, schema, migrations
src/server/auth/            Better Auth config
src/server/email/           Resend via fetch
src/domain/                 types and Zod schemas, shared with the client, pure
```

Rules:
- Controllers under 30 lines. No Drizzle import, no business logic. Shape:

```ts
export const POST = handler(async (req) => {
  const ctx = await requireContext(req);
  const input = await parseBody(req, enquirySchema);
  return json(await ctx.services.enquiries.create(input), { status: 201 });
});
```

- Only services throw `NotFoundError`, `ConflictError`, `DomainRuleError(message, field?)`, `ForbiddenError`, `UnauthorizedError`. `errorResponse()` maps them to 404, 409, 422 with `details.fields`, 403, 401. Anything else is logged and 500.
- Repositories take an optional `DbHandle` as the last argument so services can compose them in one transaction. They return domain types through `mappers.ts`, never rows.
- Wiring is two factories, `createRepositories(db)` and `createServices(db, clock)`, plus a `getServices()` singleton on `globalThis`. No DI container.
- `ServiceDeps = { db, repos, clock }`. The clock is a function so tests and seeds can pin today (`FIXED_TODAY`).
- Public endpoints (the enquiry form) use `requireSession()`'s lighter sibling `requirePublic()`: origin check and rate limit only.

## Tenancy

Single tenant for the foreseeable future. Still add `business_id` to every table from the first migration, defaulted to one seeded row, so a second business or a white-label later is a constraint change rather than a schema rewrite.

## Database conventions

- Postgres 18. Neon pooled URL in production, Postgres.app or Docker-free local install for dev.
- Drizzle ORM with `casing: "snake_case"` in both `drizzle.config.ts` and the client; camelCase in TypeScript.
- `uuid` primary keys with `defaultRandom()`. `created_at` and `updated_at` with `$onUpdate`. `pgEnum` for closed sets. `check` constraints for invariants.
- Money as `bigint({ mode: "number" })` in pence. Formatting only on the client through a `MoneyText` component. `priceText` on items stays a string until booking exists; then it becomes `price_pence` plus `price_unit` enum.
- Soft delete via `archived_at` on catalogue tables (the owner will want to hide, not destroy).
- Workflow: edit schema, `pnpm db:generate`, commit the SQL under `drizzle/`, `pnpm db:migrate`. Production migrations run by hand from a laptop before the deploy. Builds never migrate.
- `db/target.ts` is the only file that knows about `DB_TARGET=prod`.

## Starter schema (phase 2a and 2b)

| Table | Columns beyond id, business_id, timestamps | Notes |
| --- | --- | --- |
| `enquiries` | name, email?, phone?, event_date?, occasion enum, guest_count?, area, message, source enum(form, whatsapp), status enum(new, replied, closed) | Written by the public form; read by admin |
| `categories` | slug unique, name, sort_order | Tables, Chairs, Linen, Decor |
| `items` | slug unique, category_id, name, description, price_text, quantity_available?, dimensions?, archived_at? | Mirrors `Item` in `src/domain/types.ts` |
| `item_images` | item_id, url, alt, sort_order | Stored in Vercel Blob or similar, not Postgres |
| `occasions` | slug unique, name, blurb, sort_order | |
| `occasion_items` | occasion_id, item_id | Suggested items |
| `auth_*` | Better Auth's five tables, prefixed | Phase 2c only |

## Auth (phase 2c, lifted from Daybook)

- Better Auth, Drizzle adapter, explicit model-to-table map, tables prefixed `auth_`.
- Email + password, 8 character minimum, 30-day session refreshed daily, httpOnly cookie, `nextCookies()` plugin.
- Rate limiting in the database: 100/min global, 5/min on sign-in and sign-up.
- Invite-only: first account allowed, later ones need an invite cookie set by an admin.
- `src/proxy.ts` checks cookie presence only and redirects to `/admin/login?next=`. The real check is `requireContext` and the `(admin)` layout.
- `baseURL` and `trustedOrigins` derived per request on Vercel so preview deployments work.

## Email

`src/server/email/send.ts` exports `sendEmail({ to, subject, text, html? })`. POSTs to Resend with `fetch` when `RESEND_API_KEY` is set; otherwise logs the message and returns `{ delivered: false, reason }`. New enquiries email the owner with the same text the WhatsApp message would carry.

## Environment

- `.env.example` lists every variable with a dummy value, even in phase 1.
- Phase 1: `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_FACEBOOK_URL`, `NEXT_PUBLIC_TIKTOK_URL`.
- Phase 2 adds `DATABASE_URL`, `DATABASE_URL_TEST`, `RESEND_API_KEY`, `EMAIL_FROM`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`.
- Secrets never reach the client; only `NEXT_PUBLIC_*` does. Validate all of them with Zod in one `src/server/env.ts` at import time.

## Security floor

- `assertSameOrigin` on every non-GET route.
- Zod on every input; 422 with per-field messages.
- Rate limit public POSTs by IP (Vercel edge config or a small DB table).
- No PII in logs beyond an enquiry id.
- Honeypot field plus time-to-submit check on the public form before adding a captcha.

## Testing by layer

| Layer | Tool | What |
| --- | --- | --- |
| domain and calc | Vitest | Pure functions, schemas |
| repositories and services | Vitest integration against `DATABASE_URL_TEST`, migrate then truncate | Drive through services, never raw inserts |
| controllers | Playwright | One flow per endpoint |
| seed | `scripts/seed.ts` with `tsx` | Goes through services and the auth API; refuses `--reset` against prod |

CI gets a `postgres:18` service the moment phase 2a merges.

## Checklist for any backend PR

- [ ] One gate, named in the PR title
- [ ] Controller, service, repository each in their own file, layering respected
- [ ] Migration SQL committed; `pnpm db:migrate` run locally
- [ ] Typed errors only; HTTP mapping untouched
- [ ] `.env.example` updated with a dummy value
- [ ] Integration test through the service, not the table
- [ ] `src/content/*` signatures unchanged if the catalogue moved to the database

## References

- Daybook `docs/ARCHITECTURE.md` section 3 (backend) and section 7 (starting a new app) for the files to copy: `http.ts`, `errors.ts`, `services/context.ts`, `db/client.ts`, `db/target.ts`, `auth/auth.ts`, `email/send.ts`, the two `index.ts` factories
- `docs/SPEC.md` section 10 for which seam each phase replaces
