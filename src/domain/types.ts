/**
 * Domain types. Pure: no I/O, no React.
 * Ids are stable string slugs today and become UUIDs when the catalogue moves to Postgres (phase 2b).
 */

export const CATEGORIES = ["tables", "chairs", "linen", "decor"] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABELS: Record<Category, string> = {
  tables: "Tables",
  chairs: "Chairs",
  linen: "Linen",
  decor: "Decor",
};

export type ItemImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Item = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  description: string;
  /** Price as text until money rules exist, for example "from £1.50 per chair". Undefined means "Message for a quote". */
  priceText?: string;
  /** Free text, for example "180 cm by 76 cm, seats 8". */
  dimensions?: string;
  /** Free text, for example "Up to 120 available". */
  quantityText?: string;
  images: ItemImage[];
  featured?: boolean;
};

export const OCCASION_SLUGS = ["birthdays", "baby-showers", "garden-parties", "family-celebrations"] as const;
export type OccasionSlug = (typeof OCCASION_SLUGS)[number];

export type Occasion = {
  id: string;
  slug: OccasionSlug;
  name: string;
  /** Lower-case noun phrase used in prefilled messages, for example "baby shower". */
  phrase: string;
  blurb: string;
  image: ItemImage;
  suggestedItemSlugs: string[];
};

export type FaqEntry = {
  id: string;
  question: string;
  answer: string;
};

export type Enquiry = {
  name: string;
  eventDate?: string;
  occasion: OccasionSlug | "other";
  guestCount?: number;
  area: string;
  message?: string;
};
