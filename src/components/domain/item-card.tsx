import Image from "next/image";
import Link from "next/link";
import { CATEGORY_LABELS, type Item } from "@/domain/types";
import { itemMessage } from "@/lib/whatsapp";
import { EnquireButton } from "./enquire-button";

export function ItemCard({ item, priority = false }: { item: Item; priority?: boolean }) {
  const cover = item.images[0];
  return (
    <article
      className="flex flex-col overflow-hidden rounded-xl border border-hairline bg-surface"
      data-testid="item-card"
    >
      <Link href={`/hire/${item.slug}`} className="group block focus-visible:outline-none" aria-label={item.name}>
        <div className="relative aspect-[4/5] overflow-hidden bg-linen">
          {cover ? (
            <Image
              src={cover.src}
              alt={cover.alt}
              width={cover.width}
              height={cover.height}
              priority={priority}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="size-full object-cover transition-opacity group-hover:opacity-90"
            />
          ) : null}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div>
          <p className="eyebrow mb-1">{CATEGORY_LABELS[item.category]}</p>
          <h3 className="display text-2xl">
            <Link
              href={`/hire/${item.slug}`}
              className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tan focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              {item.name}
            </Link>
          </h3>
          <p className="mt-2 line-clamp-2 text-cocoa-muted">{item.description.replace(" [TODO]", "")}</p>
        </div>
        <p className="mt-auto text-sm font-medium">{item.priceText ?? "Message for a quote"}</p>
        <EnquireButton message={itemMessage(item.name)} label="Enquire" variant="outline" className="w-full" />
      </div>
    </article>
  );
}
