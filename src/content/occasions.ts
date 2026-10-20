import type { Occasion, OccasionSlug } from "@/domain/types";

/**
 * Occasions content. Four occasions from the flyer (Documented). Copy and suggested items are Inferred.
 * Images are placeholders until the flyer crops are supplied. [TODO]
 */

const occasions: Occasion[] = [
  {
    id: "birthdays",
    slug: "birthdays",
    name: "Birthdays",
    phrase: "birthday",
    blurb:
      "From a first birthday in the garden to a fortieth in the village hall. Tables, chairs and a stand for the balloons.",
    image: { src: "/occasions/birthdays.svg", alt: "Birthday table with balloons and a cake", width: 800, height: 800 },
    suggestedItemSlugs: ["round-table-6ft", "white-folding-chair", "balloon-stand"],
  },
  {
    id: "baby-showers",
    slug: "baby-showers",
    name: "Baby showers",
    phrase: "baby shower",
    blurb:
      "A soft, pretty afternoon. Round tables for the food, a backdrop for the photos, chairs for everyone who wants a sit down.",
    image: {
      src: "/occasions/baby-showers.svg",
      alt: "Baby shower table dressed in cream and blush",
      width: 800,
      height: 800,
    },
    suggestedItemSlugs: ["round-table-6ft", "cream-tablecloth-round", "linen-backdrop"],
  },
  {
    id: "garden-parties",
    slug: "garden-parties",
    name: "Garden parties",
    phrase: "garden party",
    blurb:
      "Long tables on the lawn, white folding chairs and a sage runner. We drop off in the morning and collect once the last guest has gone.",
    image: {
      src: "/occasions/garden-parties.svg",
      alt: "Garden party with trestle tables on a lawn",
      width: 800,
      height: 800,
    },
    suggestedItemSlugs: ["trestle-table-6ft", "white-folding-chair", "sage-table-runner"],
  },
  {
    id: "family-celebrations",
    slug: "family-celebrations",
    name: "Family celebrations",
    phrase: "family celebration",
    blurb:
      "Anniversaries, christenings, reunions and big Sunday lunches. Enough seats for every generation and a table they can all sit around.",
    image: {
      src: "/occasions/family-celebrations.svg",
      alt: "Family gathered around a long dressed table",
      width: 800,
      height: 800,
    },
    suggestedItemSlugs: ["trestle-table-6ft", "cross-back-chair", "cream-tablecloth-round"],
  },
];

export function listOccasions(): Occasion[] {
  return occasions;
}

export function getOccasion(slug: OccasionSlug): Occasion | undefined {
  return occasions.find((occasion) => occasion.slug === slug);
}
