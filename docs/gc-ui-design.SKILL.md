---
name: gc-ui-design
description: Visual and interface design for The Gathering Co. (event hire, Newcastle): palette, type, spacing, motifs, component states, copy in the UI, and a review checklist. Use this whenever you design or restyle a page, section, component, email, social graphic or OG image for this brand, choose colours or fonts, write button or empty-state copy, or review a screen for looking generic or off-brand. Use it even if the user only says "make it look nicer" or "does this fit the brand".
---

# UI design for The Gathering Co.

The brand is soft, warm and editorial: cream paper, cocoa ink, tan rules, sage leaves, a little blush. It should feel like a well set table in a garden, not a SaaS dashboard. Nothing glossy, no hard shadows, no pure white, no pure black.

Work like a design lead who has one brand to protect. Spend boldness in one place per screen (usually the display headline or a single photograph) and keep everything else quiet.

## Tokens (the only colours allowed)

| Role | Token | Light | Dark |
| --- | --- | --- | --- |
| Page background | `cream` | `#F7F1EA` | `#1A1511` |
| Card surface | `surface` | `#FDFAF6` | `#241E19` |
| Soft block behind headings | `linen` | `#EFE3D6` | `#2E2620` |
| Borders, rules | `hairline` | `#E3D6C6` | `#3D332B` |
| Primary text | `cocoa` | `#3B2A1E` | `#F1E7DB` |
| Secondary text | `cocoa-muted` | `#7A6755` | `#B8A897` |
| Brand accent, buttons, icons | `tan` | `#A8865F` | `#C9A77C` |
| Hover and pressed | `tan-deep` | `#8C6B47` | `#D9B98F` |
| Positive tint / ink | `sage` / `sage-ink` | `#E4E8DB` / `#5F6F4E` | `#2A3124` / `#A9B894` |
| Warm highlight tint / ink | `blush` / `blush-ink` | `#F5E1DC` / `#A0574D` | `#3A2724` / `#E3A49A` |
| Warning tint / ink | `butter` / `amber` | `#FBF0D2` / `#8A6200` | `#3A2F14` / `#E3B452` |
| Negative tint / ink | `rose` / `brick` | `#FBE7E7` / `#A8322A` | `#402024` / `#F0968D` |
| WhatsApp | `whatsapp` | `#25D366` | same |

Rules:
- Every status is a tint plus ink pair. A chip is always `bg-<tint> text-<ink>`.
- `tan` on `cream` fails AA for small text. Use `tan` for rules, icons, large display text and button fills (with `surface` text). Use `cocoa` for body and `cocoa-muted` for secondary.
- Light is the default. Dark must still pass contrast but does not need to be beautiful.

## Type

| Use | Face | Setting |
| --- | --- | --- |
| Display: hero headline, page titles, the one memorable line per screen | Playfair Display | 400 or 500 weight, tight leading (1.05), slight negative tracking at 48 px and above |
| Script accent: "The" in the lockup, the closing "We'd love to hear from you" | Great Vibes or Pinyon Script | Never for body, buttons, labels or more than one line |
| Body and UI | Inter | 15 px root, 1.6 leading for prose, 1.3 for UI |
| Eyebrow | Inter | 12 px, caps, `tracking-[0.18em]`, `cocoa-muted`. One per section at most; it mirrors "EVENT HIRE" in the logo and is the one all-caps treatment permitted |

Scale: 12, 14, 15, 17, 20, 24, 32, 40, 56. Line length under 70 characters for body.

## Layout and space

- Content column 1100 px max, centred. Text columns 640 px max.
- Section rhythm: 48 px vertical on mobile, 96 px on desktop. Inside a card: 20 px mobile, 24 px desktop.
- Grid: 1 column on mobile, 2 at 640 px, 4 at 1024 px for cards.
- Alignment: centred for hero and section headings, left for everything else. Do not centre body paragraphs longer than two lines.
- Radius 12 px on cards and images, 999 on chips and the WhatsApp button, 8 px on inputs and buttons.
- Depth: 1 px `hairline` border, no shadow. Shadow only on the floating WhatsApp button (`0 8px 24px rgba(59,42,30,0.18)`).

## Motifs

- Round logo for favicon, OG image, hero mark. Horizontal lockup in the header.
- Leaf sprig SVG in `tan` or `sage` at 20 to 40 percent opacity, placed at a corner of a hero or section, never behind text.
- Section divider: short rule, small heart, short rule. Built once as `Divider`.
- Soft `linen` block behind a label or heading, with slightly irregular edges if done as an SVG mask; a plain rounded rectangle is fine.
- Photography: natural light, cream and green, white folding chairs, florals. Crop to 4:5 for cards, 16:9 for hero, square for occasion tiles.

## Component states

Every interactive or list component needs all of these before it is done:

| State | What it looks like |
| --- | --- |
| Default | As designed |
| Hover | `tan-deep` fill or `row-hover` background; no scale transforms |
| Focus | 2 px `tan` ring with 2 px offset |
| Pressed | Slightly darker fill, no shadow change |
| Disabled | 50 percent opacity, no pointer |
| Pending | Spinner replaces icon, label stays, button disabled |
| Empty | Leaf icon, one-line title, one sentence, one primary action |
| Error | Plain words about what happened and what to do, `rose`/`brick` chip or inline text, no icon alone |

## Copy inside the UI

- British English, sentence case, plain verbs. "Enquire on WhatsApp", not "Get in touch today!"
- Buttons say what happens: "Open WhatsApp", "Copy message", "See all items".
- The only exclamation mark on the site is the documented "We'd love to hear from you!"
- Empty states are invitations. Errors explain and direct; they do not apologise.
- Unknown facts are plausible dummy copy marked `[TODO]`, never lorem ipsum.

## Generic tells to avoid

- Terracotta or clay accents, acid green on near-black, broadsheet hairline grids with zero radius.
- Identical rounded cards with the same grey shadow under each.
- Numbered 01 / 02 / 03 markers unless the content is a sequence (the "how it works" strip is one; the occasions grid is not).
- Middle-dot meta strings, arrows appended to links, a monospace face for labels.
- Fade-and-slide entrances on every section. One page-load reveal on the hero is enough.
- A single word in a headline coloured or italicised for emphasis.

## Review checklist

- [ ] One memorable element per screen; everything else quiet
- [ ] Only tokens used; no hex, no system fonts
- [ ] Hierarchy readable with the colour removed
- [ ] All states designed, including empty and error
- [ ] Contrast AA on every text and surface pair
- [ ] Reads correctly at 390 px and 1280 px
- [ ] Copy is plain, sentence case, no filler
- [ ] Screenshot taken and looked at before calling it done

## References

- `docs/SPEC.md` section 6 for the brand source and any owner-supplied overrides
- Brand assets in `public/brand/`
- Anthropic's `frontend-design` skill for the general discipline of avoiding templated output
