import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EnquireButton } from "@/components/domain/enquire-button";
import { Eyebrow } from "@/components/domain/eyebrow";
import { ItemGrid } from "@/components/domain/item-grid";
import { SectionCard } from "@/components/domain/section-card";
import { Button } from "@/components/ui/button";
import { getItem, listItems, listRelatedItems } from "@/content/catalogue";
import { CATEGORY_LABELS } from "@/domain/types";
import { pageMetadata } from "@/lib/seo";
import { itemMessage } from "@/lib/whatsapp";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return listItems().map((item) => ({ slug: item.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getItem(slug);
  if (!item) return {};
  return pageMetadata({
    title: item.name,
    description: item.description.replace(" [TODO]", ""),
    path: `/hire/${item.slug}`,
  });
}

export default async function ItemPage({ params }: Props) {
  const { slug } = await params;
  const item = getItem(slug);
  if (!item) notFound();

  const related = listRelatedItems(item);
  const [cover, ...rest] = item.images;
  const facts = [
    { label: "Price", value: item.priceText ?? "Message for a quote" },
    { label: "Size", value: item.dimensions },
    { label: "Quantity", value: item.quantityText },
  ].filter((fact) => fact.value);

  return (
    <>
      <div className="container-content pt-6 sm:pt-10">
        <Button asChild variant="link" className="px-0 text-cocoa-muted">
          <Link href="/hire">Back to all items</Link>
        </Button>
      </div>
      <article className="container-content grid grid-cols-1 gap-8 pt-4 pb-12 lg:grid-cols-2 lg:gap-12 sm:pb-24">
        <div className="space-y-4">
          {cover ? (
            <Image
              src={cover.src}
              alt={cover.alt}
              width={cover.width}
              height={cover.height}
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[4/5] w-full rounded-xl border border-hairline object-cover"
            />
          ) : null}
          {rest.length > 0 ? (
            <ul className="grid grid-cols-3 gap-3">
              {rest.map((image) => (
                <li key={image.src}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes="33vw"
                    className="aspect-square w-full rounded-xl border border-hairline object-cover"
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="flex flex-col">
          <Eyebrow>{CATEGORY_LABELS[item.category]}</Eyebrow>
          <h1 className="display mt-3 text-4xl sm:text-5xl">{item.name}</h1>
          <p className="mt-5 max-w-prose text-lg text-cocoa-muted">{item.description}</p>
          <dl className="mt-8 divide-y divide-hairline rounded-xl border border-hairline bg-surface">
            {facts.map((fact) => (
              <div key={fact.label} className="flex gap-4 px-5 py-3">
                <dt className="w-24 shrink-0 text-sm text-cocoa-muted">{fact.label}</dt>
                <dd className="text-sm font-medium">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8">
            <EnquireButton message={itemMessage(item.name)} size="lg" className="w-full sm:w-auto" />
          </div>
          <p className="mt-3 text-sm text-cocoa-muted">Opens WhatsApp with the item name filled in.</p>
        </div>
      </article>

      <SectionCard tone="surface" eyebrow="You might also like" title="Goes well with">
        <ItemGrid items={related} emptyTitle="Nothing else yet" emptyBody="This is the whole range for now." />
      </SectionCard>
    </>
  );
}
