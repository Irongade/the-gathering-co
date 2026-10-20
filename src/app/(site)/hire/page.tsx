import type { Metadata } from "next";
import { CatalogueBrowser } from "@/components/domain/catalogue-browser";
import { PageHeader } from "@/components/domain/page-header";
import { listItems } from "@/content/catalogue";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Hire",
  description: "Tables, chairs, linen and decor to hire with delivery and collection across Newcastle.",
  path: "/hire",
});

export default function HirePage() {
  const items = listItems();
  return (
    <>
      <PageHeader
        eyebrow="Hire"
        title="What we hire"
        intro="Everything is delivered and collected. Tap an item for sizes and numbers, or enquire straight away."
      />
      <div className="container-content pb-12 sm:pb-24">
        <CatalogueBrowser items={items} />
      </div>
    </>
  );
}
