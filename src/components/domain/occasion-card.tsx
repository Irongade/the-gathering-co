import Image from "next/image";
import Link from "next/link";
import type { Occasion } from "@/domain/types";

export function OccasionCard({ occasion }: { occasion: Occasion }) {
  return (
    <Link
      href={`/occasions#${occasion.slug}`}
      className="group block overflow-hidden rounded-xl border border-hairline bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tan focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
    >
      <div className="relative aspect-square overflow-hidden bg-linen">
        <Image
          src={occasion.image.src}
          alt={occasion.image.alt}
          width={occasion.image.width}
          height={occasion.image.height}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="size-full object-cover transition-opacity group-hover:opacity-90"
        />
      </div>
      <div className="bg-linen px-5 py-4 text-center">
        <p className="display text-xl">{occasion.name}</p>
      </div>
    </Link>
  );
}
