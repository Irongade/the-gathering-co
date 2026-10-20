import { describe, expect, it } from "vitest";
import { CATEGORIES } from "@/domain/types";
import { getItem, listCategories, listFeaturedItems, listItems, listRelatedItems } from "./catalogue";
import { listFaq } from "./faq";
import { getOccasion, listOccasions } from "./occasions";
import { SITE } from "./site";

describe("catalogue", () => {
  it("has unique slugs that match ids", () => {
    const items = listItems();
    const slugs = new Set(items.map((item) => item.slug));
    expect(slugs.size).toBe(items.length);
    for (const item of items) expect(item.id).toBe(item.slug);
  });

  it("covers every category", () => {
    for (const category of CATEGORIES) {
      expect(listItems(category).length).toBeGreaterThan(0);
    }
    expect(listCategories()).toEqual([...CATEGORIES]);
  });

  it("looks up by slug and returns undefined for unknown", () => {
    expect(getItem("white-folding-chair")?.name).toBe("White folding chair");
    expect(getItem("nope")).toBeUndefined();
  });

  it("gives every item at least one image with alt text", () => {
    for (const item of listItems()) {
      expect(item.images.length).toBeGreaterThan(0);
      for (const image of item.images) expect(image.alt.length).toBeGreaterThan(5);
    }
  });

  it("returns related items that are not the item itself", () => {
    const item = getItem("round-table-6ft");
    if (!item) throw new Error("missing fixture");
    const related = listRelatedItems(item);
    expect(related.length).toBe(3);
    expect(related.map((r) => r.slug)).not.toContain(item.slug);
  });

  it("features at most four items", () => {
    expect(listFeaturedItems().length).toBeLessThanOrEqual(4);
  });
});

describe("occasions", () => {
  it("has four occasions whose suggested items exist", () => {
    const occasions = listOccasions();
    expect(occasions.length).toBe(4);
    for (const occasion of occasions) {
      for (const slug of occasion.suggestedItemSlugs) expect(getItem(slug)).toBeDefined();
    }
    expect(getOccasion("garden-parties")?.phrase).toBe("garden party");
  });
});

describe("faq and site", () => {
  it("has faq entries with unique ids", () => {
    const entries = listFaq();
    expect(new Set(entries.map((e) => e.id)).size).toBe(entries.length);
  });

  it("reads contact details from env", () => {
    expect(SITE.whatsapp.number).toBe("447000000000");
    expect(SITE.email).toBe("hello@example.com");
    expect(SITE.socials.tiktok).toBeUndefined();
    expect(SITE.socials.instagram).toBe("https://instagram.com/thegatheringco");
  });
});
