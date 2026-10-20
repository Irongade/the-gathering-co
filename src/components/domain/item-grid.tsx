import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Item } from "@/domain/types";
import { EmptyState } from "./empty-state";
import { ItemCard } from "./item-card";

/** A grid of items that owns its empty state. */
export function ItemGrid({
  items,
  emptyTitle = "Nothing here yet",
  emptyBody = "We are adding items all the time. Message us and tell us what you need.",
}: {
  items: Item[];
  emptyTitle?: string;
  emptyBody?: string;
}) {
  if (items.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        body={emptyBody}
        action={
          <Button asChild variant="outline">
            <Link href="/contact">Send an enquiry</Link>
          </Button>
        }
      />
    );
  }
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
      {items.map((item, index) => (
        <li key={item.id}>
          <ItemCard item={item} priority={index < 2} />
        </li>
      ))}
    </ul>
  );
}
