import { CATEGORIES, type Category, type Item } from "@/domain/types";

/**
 * Catalogue content. The only place that knows the data is a file.
 * Phase 2b replaces the array with an ItemRepository behind the same function signatures.
 *
 * DUMMY: every item below is placeholder content marked [TODO] until the owner supplies the real list.
 */

function image(slug: string, alt: string) {
  return { src: `/items/${slug}.svg`, alt, width: 800, height: 1000 };
}

const items: Item[] = [
  {
    id: "round-table-6ft",
    slug: "round-table-6ft",
    name: "Round table, 6 ft",
    category: "tables",
    description:
      "A classic round banqueting table that seats eight to ten comfortably. Folds flat for delivery and sits well under a linen cloth. [TODO]",
    priceText: "from £9 per table", // DUMMY
    dimensions: "183 cm across, 76 cm high, seats 8 to 10", // DUMMY
    quantityText: "Up to 12 available", // DUMMY
    images: [image("round-table-6ft", "Round 6 ft banqueting table dressed in cream linen in a garden")],
    featured: true,
  },
  {
    id: "trestle-table-6ft",
    slug: "trestle-table-6ft",
    name: "Trestle table, 6 ft",
    category: "tables",
    description:
      "A sturdy rectangular trestle for long table dinners, buffets and gift tables. Seats six, or eight at a squeeze. [TODO]",
    priceText: "from £8 per table", // DUMMY
    dimensions: "183 cm by 76 cm, 74 cm high, seats 6 to 8", // DUMMY
    quantityText: "Up to 20 available", // DUMMY
    images: [image("trestle-table-6ft", "Long trestle table laid for a family dinner outdoors")],
    featured: true,
  },
  {
    id: "white-folding-chair",
    slug: "white-folding-chair",
    name: "White folding chair",
    category: "chairs",
    description:
      "The garden party staple. A white resin folding chair with a padded seat, light enough to move and smart enough to leave bare. [TODO]",
    priceText: "from £1.50 per chair", // DUMMY
    dimensions: "44 cm wide, 86 cm high, seat at 45 cm", // DUMMY
    quantityText: "Up to 120 available", // DUMMY
    images: [image("white-folding-chair", "Rows of white folding chairs on a lawn")],
    featured: true,
  },
  {
    id: "cross-back-chair",
    slug: "cross-back-chair",
    name: "Cross back chair",
    category: "chairs",
    description:
      "A natural wood cross back chair with a cream seat pad. Lovely for a dinner that wants to feel a little more grown up. [TODO]",
    priceText: "from £3.50 per chair", // DUMMY
    dimensions: "46 cm wide, 90 cm high, seat at 46 cm", // DUMMY
    quantityText: "Up to 60 available", // DUMMY
    images: [image("cross-back-chair", "Wooden cross back chairs around a table set with florals")],
    featured: true,
  },
  {
    id: "cream-tablecloth-round",
    slug: "cream-tablecloth-round",
    name: "Cream tablecloth, round",
    category: "linen",
    description:
      "A floor length cream cloth that fits our 6 ft round tables. Pressed and delivered ready to lay. [TODO]",
    priceText: "from £7 per cloth", // DUMMY
    dimensions: "330 cm round, floor length on a 6 ft table", // DUMMY
    quantityText: "Up to 12 available", // DUMMY
    images: [image("cream-tablecloth-round", "Cream floor length tablecloth on a round table")],
  },
  {
    id: "sage-table-runner",
    slug: "sage-table-runner",
    name: "Sage table runner",
    category: "linen",
    description:
      "A soft sage cotton runner that adds a little colour down the middle of a trestle. Pairs with cream cloths or bare wood. [TODO]",
    priceText: "from £4 per runner", // DUMMY
    dimensions: "35 cm by 300 cm", // DUMMY
    quantityText: "Up to 20 available", // DUMMY
    images: [image("sage-table-runner", "Sage green runner along a trestle table with candles")],
  },
  {
    id: "balloon-stand",
    slug: "balloon-stand",
    name: "Balloon stand",
    category: "decor",
    description:
      "A freestanding arch frame for your own balloon garland, or ask us about dressing it for you. Folds down for the car. [TODO]",
    priceText: "from £15 per stand", // DUMMY
    dimensions: "Adjustable, up to 2.4 m high and 2 m wide", // DUMMY
    quantityText: "2 available", // DUMMY
    images: [image("balloon-stand", "Arch stand dressed with blush and cream balloons")],
  },
  {
    id: "linen-backdrop",
    slug: "linen-backdrop",
    name: "Linen backdrop",
    category: "decor",
    description:
      "A cream linen backdrop on a frame, a soft background for photos, a cake table or a welcome sign. [TODO]",
    priceText: undefined, // Message for a quote
    dimensions: "2 m by 2 m", // DUMMY
    quantityText: "1 available", // DUMMY
    images: [image("linen-backdrop", "Cream linen backdrop behind a cake table with greenery")],
  },
];

export function listItems(category?: Category): Item[] {
  return category ? items.filter((item) => item.category === category) : items;
}

export function getItem(slug: string): Item | undefined {
  return items.find((item) => item.slug === slug);
}

export function listFeaturedItems(limit = 4): Item[] {
  return items.filter((item) => item.featured).slice(0, limit);
}

export function listRelatedItems(item: Item, limit = 3): Item[] {
  const sameCategory = items.filter((other) => other.category === item.category && other.slug !== item.slug);
  const others = items.filter((other) => other.category !== item.category);
  return [...sameCategory, ...others].slice(0, limit);
}

export function listCategories(): Category[] {
  return [...CATEGORIES];
}
