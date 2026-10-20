# src/server: phase 2 goes here

Phase 1 has no backend. This folder exists so later work lands in the same shape as Daybook, lifted rather
than invented. Read `docs/SPEC.md` sections "Stack and architecture" and "Extension path" first.

## Layering (points downward only)

```
src/app/api/**/route.ts     controllers   authenticate, parse, call ONE service method, map to HTTP
src/server/services/        services      invariants, db.transaction, typed errors
src/server/repositories/    repositories  the ONLY layer that imports Drizzle; return domain types via mappers.ts
src/server/db/              client.ts, target.ts, schema, migrations (drizzle/)
src/server/auth/            Better Auth config (phase 2c)
src/server/email/           Resend via fetch, send.ts (phase 2a)
src/server/env.ts           Zod-validated server env, import once
src/domain/                 types and Zod schemas, shared with the client, pure
```

## Phase gates

| Gate | Add when | What arrives |
| --- | --- | --- |
| 2a persisted enquiries | Owner wants an inbox | `POST /api/enquiries`, Postgres (Neon), Resend email, `http.ts`, `errors.ts` |
| 2b database catalogue | Owner wants to edit items without a deploy | `items`, `categories`, `item_images`, `ItemRepository`; `src/content/catalogue.ts` becomes an adapter with the same signatures |
| 2c admin | Database catalogue exists | Better Auth, `(admin)` route group, invite-only, item CRUD, enquiry inbox |
| 3 booking | Owner asks for dates and quotes | `bookings`, `booking_items`, availability service, Stripe deposits |

One gate per PR series. Never open two gates in one PR.

## Rules carried over from Daybook

- Controllers under 30 lines, no Drizzle import, no business logic.
- Only services throw `NotFoundError`, `ConflictError`, `DomainRuleError(message, field?)`, `ForbiddenError`,
  `UnauthorizedError`. `errorResponse()` maps them to 404, 409, 422, 403, 401. Anything else is logged and 500.
- Repositories take an optional `DbHandle` as the last argument so services can compose them in one transaction.
- Wiring is `createRepositories(db)` and `createServices(db, clock)` plus a `getServices()` singleton. No DI container.
- `business_id` on every table from the first migration, defaulted to one seeded row.
- Drizzle `casing: "snake_case"`, uuid primary keys, money as pence in `bigint({ mode: "number" })`,
  soft delete via `archived_at`.
- Secrets never reach the client; only `NEXT_PUBLIC_*` does.
