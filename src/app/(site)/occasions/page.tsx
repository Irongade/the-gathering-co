import type { Metadata } from "next";
import Image from "next/image";
import { Divider } from "@/components/domain/divider";
import { EmptyState } from "@/components/domain/empty-state";
import { EnquireButton } from "@/components/domain/enquire-button";
import { ItemGrid } from "@/components/domain/item-grid";
import { PageHeader } from "@/components/domain/page-header";
import { getItem } from "@/content/catalogue";
import { listOccasions } from "@/content/occasions";
import { pageMetadata } from "@/lib/seo";
import { occasionMessage } from "@/lib/whatsapp";

export const metadata: Metadata = pageMetadata({
  title: "Occasions",
  description: "Birthdays, baby showers, garden parties and family celebrations. Hire suggestions for each.",
  path: "/occasions",
});

export default function OccasionsPage() {
  const occasions = listOccasions();
  return (
    <>
      <PageHeader
        eyebrow="Occasions"
        title="Whatever you are celebrating"
        intro="A few ideas for each kind of day. Every one of them starts with a message."
      />
      <div className="container-content pb-12 sm:pb-24">
        {occasions.length === 0 ? (
          <EmptyState title="Occasions are on the way" body="Message us and tell us what you are planning." />
        ) : (
          <div className="space-y-16 sm:space-y-24">
            {occasions.map((occasion, index) => {
              const items = occasion.suggestedItemSlugs.map(getItem).filter((item) => item !== undefined);
              return (
                <section
                  key={occasion.id}
                  id={occasion.slug}
                  aria-labelledby={`${occasion.slug}-title`}
                  className="scroll-mt-24"
                >
                  {index > 0 ? <Divider className="mb-16 sm:mb-24" /> : null}
                  <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[2fr_3fr] lg:gap-12">
                    <Image
                      src={occasion.image.src}
                      alt={occasion.image.alt}
                      width={occasion.image.width}
                      height={occasion.image.height}
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="aspect-square w-full rounded-xl border border-hairline object-cover"
                    />
                    <div>
                      <h2 id={`${occasion.slug}-title`} className="display text-4xl sm:text-5xl">
                        <span className="soft-block">{occasion.name}</span>
                      </h2>
                      <p className="mt-5 max-w-prose text-lg text-cocoa-muted">{occasion.blurb}</p>
                      <div className="mt-6">
                        <EnquireButton
                          message={occasionMessage(occasion.phrase)}
                          size="lg"
                          label={`Enquire about a ${occasion.phrase}`}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 sm:mt-12">
                    <p className="eyebrow mb-4">Suggested items</p>
                    <ItemGrid
                      items={items}
                      emptyTitle="No suggestions yet"
                      emptyBody="Browse the full range or message us for ideas."
                    />
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
