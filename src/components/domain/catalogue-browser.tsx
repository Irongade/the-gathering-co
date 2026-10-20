"use client";

import { useState } from "react";
import { CATEGORIES, CATEGORY_LABELS, type Category, type Item } from "@/domain/types";
import { cn } from "@/lib/utils";
import { ItemGrid } from "./item-grid";

type Filter = Category | "all";

/** Filter chips plus grid. The only client island on the catalogue page. */
export function CatalogueBrowser({ items }: { items: Item[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = filter === "all" ? items : items.filter((item) => item.category === filter);
  const chips: { value: Filter; label: string }[] = [
    { value: "all", label: "All" },
    ...CATEGORIES.map((category) => ({ value: category, label: CATEGORY_LABELS[category] })),
  ];

  return (
    <div className="space-y-8">
      <h2 className="sr-only">All items</h2>
      <fieldset className="flex flex-wrap justify-center gap-2">
        <legend className="sr-only">Filter by category</legend>
        {chips.map((chip) => {
          const active = chip.value === filter;
          return (
            <button
              key={chip.value}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(chip.value)}
              className={cn(
                "h-11 rounded-4xl border px-5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tan focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
                active ? "border-cocoa bg-cocoa text-cream" : "border-hairline bg-surface text-cocoa hover:bg-linen",
              )}
            >
              {chip.label}
            </button>
          );
        })}
      </fieldset>
      <p className="sr-only" aria-live="polite">
        {visible.length} items shown
      </p>
      <ItemGrid
        items={visible}
        emptyTitle={`No ${filter === "all" ? "items" : CATEGORY_LABELS[filter].toLowerCase()} yet`}
        emptyBody="We are adding to the range. Message us and tell us what you need for your event."
      />
    </div>
  );
}
