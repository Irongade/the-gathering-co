---
name: gc-product-design
description: Product thinking for The Gathering Co. (event hire, Newcastle): who the customer is, what each page is for, the WhatsApp conversion path, what to build now versus later, and how to write specs, user flows and acceptance criteria. Use this whenever you scope a feature, decide whether something belongs in phase 1, write or change docs/SPEC.md, plan a page, define a user journey, write copy strategy, or the user asks "should we add X", "what should the about page say" or "how would booking work later". Use it before any UI or code work on a new page or flow.
---

# Product design for The Gathering Co.

The product is a small local event hire business. The site's one job in phase 1 is to turn a visitor into a WhatsApp conversation with the owner. Everything is measured against that.

## Who we are designing for

Primary: a host planning a personal event in or near Newcastle (birthday, baby shower, garden party, family celebration). Usually on a phone, often in the evening, often forwarding the link to a partner or parent. They want to know three things fast: can I hire this, roughly what does it cost, and how do I ask.

Secondary: the owner, who answers WhatsApp messages and needs enquiries to arrive with enough detail (date, occasion, rough numbers, area) to reply with a quote in one message.

Not designing for: corporate event planners, wedding coordinators with procurement processes, or anyone who needs to book online without talking to a person. If they turn up, WhatsApp still works.

## The one path

Land, see what is on offer, trust it, message. Every page must shorten that path or get out of the way.

```
Landing  ->  Hire grid  ->  Item  ->  Enquire (WhatsApp, prefilled)
   |            |                          ^
   +-> Occasions +--------------------------+
   +-> About / FAQ (trust)  ----------------+
   +-> Contact (form -> WhatsApp)  ---------+
```

Rules that follow:
- A WhatsApp CTA is visible without scrolling on every page (floating button, plus an inline one in each hero).
- Prefilled messages carry context: item name, occasion, or the structured form. The owner should never have to ask "what were you looking at?"
- Nothing requires an account, a cookie banner or a download.
- Pricing is shown as text where known ("from £1.50 per chair"). If unknown, say "Message for a quote", never hide the item.

## Page jobs

| Page | Job | Done when |
| --- | --- | --- |
| `/` | Prove this is real, local and lovely; route to hire or occasions | A visitor can state what the business does and where in one sentence after 5 seconds |
| `/hire` | Show the range and let people pick | Any item reachable in two taps; filter by category works with the keyboard |
| `/hire/[slug]` | Answer "what exactly is this and how many can I get" | Dimensions, quantity text, price text, photos, Enquire with the item prefilled |
| `/occasions` | Meet people who think in events, not furniture | Each occasion suggests items and has its own Enquire |
| `/about` | Build trust: who, where, how delivery works | FAQ answers the four questions people ask before messaging |
| `/contact` | Structured enquiry for people who want to write it all down | Form produces a message the owner can quote from directly |

## Scope discipline

Three phases. Do not pull later work forward without a reason written in the spec.

- Phase 1: static site, WhatsApp and socials, in-repo dummy data, no server.
- Phase 2: persisted enquiries with email, database catalogue, invite-only admin.
- Phase 3: availability and booking, deposits, non-rental product lines.

When asked "should we add X", answer with: which phase, what it costs in pages or seams, and what evidence would justify it. Default answer for anything not on the one path is phase 2 or later.

## Writing a spec or a change

Use the tags from `docs/SPEC.md` on every fact:
- **Documented**: from the brand assets or the owner. Use as given.
- **Inferred**: a reasonable reading. Use, and say it is inferred.
- **Open**: unknown. Use dummy data marked `[TODO]`, and list the question in Open items.

A feature entry has: the user and the moment, the job, the pages or components touched, acceptance criteria as a checklist, what is explicitly out, and the seam phase 2 will replace. Keep it under a page. If it needs more, it is two features.

Acceptance criteria are observable: "Enquire opens wa.me with the item name in the text" not "enquiry works".

## Copy strategy

- Voice: warm, plain, local. Sounds like the owner, not an agency.
- Lead with what the customer gets, then how it works, then the ask.
- Short sentences. British English. No exclamation marks except the documented closing line.
- Name things the way hosts do: "tables and chairs", "garden party", "drop off and collect", not "inventory", "fulfilment", "logistics".
- Never promise what is Open (delivery radius, minimums, deposits). Dummy copy for those is clearly marked and phrased so it is easy to replace.

## Measuring phase 1

No analytics beyond what Vercel gives for free. The signals that matter:
- WhatsApp messages received per week, and whether they arrive with context (item or occasion in the first line).
- Which items and occasions get enquired about (ask the owner; it is in their WhatsApp).
- Lighthouse scores and zero console errors as a floor.

Decide phase 2 priorities from those, not from feature ideas.

## Checklist before handing to UI or engineering

- [ ] The user and the moment are named
- [ ] The page job is one sentence
- [ ] Every fact is tagged Documented, Inferred or Open
- [ ] Acceptance criteria are observable and listed
- [ ] Phase is stated; anything later is marked as a seam, not built
- [ ] The WhatsApp path from this page is drawn

## References

- `docs/SPEC.md` for the current scope, pages, open items and extension path
- `gc-ui-design` for how it should look once the job is clear
- `gc-frontend-engineering` and `gc-backend-design` for how it gets built
