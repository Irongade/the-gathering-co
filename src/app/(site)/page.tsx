import Image from "next/image";
import Link from "next/link";
import { Divider } from "@/components/domain/divider";
import { Eyebrow } from "@/components/domain/eyebrow";
import { FeatureStrip } from "@/components/domain/feature-strip";
import { HowItWorks } from "@/components/domain/how-it-works";
import { ItemGrid } from "@/components/domain/item-grid";
import { Leaf } from "@/components/domain/leaf";
import { OccasionCard } from "@/components/domain/occasion-card";
import { SectionCard } from "@/components/domain/section-card";
import { WhatsAppButton } from "@/components/domain/whatsapp-button";
import { Button } from "@/components/ui/button";
import { listFeaturedItems } from "@/content/catalogue";
import { listOccasions } from "@/content/occasions";
import { SITE } from "@/content/site";

export default function LandingPage() {
  const occasions = listOccasions();
  const featured = listFeaturedItems();

  return (
    <>
      <section className="relative overflow-hidden">
        <Leaf className="pointer-events-none absolute -top-10 -right-10 size-48 text-sage-ink opacity-20 sm:size-72" />
        <Leaf className="pointer-events-none absolute -bottom-12 -left-12 size-48 -scale-x-100 text-tan opacity-20 sm:size-72" />
        <div className="container-content reveal relative flex flex-col items-center py-16 text-center sm:py-24">
          <Image src="/brand/logo-round.svg" alt="" width={160} height={160} priority className="size-32 sm:size-40" />
          <Eyebrow className="mt-8">Event hire</Eyebrow>
          <h1 className="display mt-4 max-w-3xl text-5xl sm:text-6xl lg:text-7xl">{SITE.tagline}</h1>
          <p className="mt-6 max-w-prose text-lg text-cocoa-muted">
            Tables, chairs and the finishing touches, delivered and collected across {SITE.area}.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <WhatsAppButton />
            <Button asChild variant="outline" size="lg" className="rounded-4xl">
              <Link href="/hire">See what we hire</Link>
            </Button>
          </div>
        </div>
      </section>

      <Divider />

      <SectionCard
        eyebrow="Occasions"
        title="Made for the days that matter"
        intro="Whatever you are celebrating, we can seat everyone."
      >
        {occasions.length === 0 ? (
          <p className="text-center text-cocoa-muted">Occasions are on the way.</p>
        ) : (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {occasions.map((occasion) => (
              <li key={occasion.id}>
                <OccasionCard occasion={occasion} />
              </li>
            ))}
          </ul>
        )}
      </SectionCard>

      <SectionCard tone="surface" eyebrow="What we offer" title="Simple hire, done properly">
        <FeatureStrip />
      </SectionCard>

      <SectionCard
        eyebrow="Featured"
        title="A few favourites"
        intro="A taste of the range. Prices are a guide, message us for a quote."
      >
        <ItemGrid items={featured} />
        <div className="mt-8 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/hire">See all items</Link>
          </Button>
        </div>
      </SectionCard>

      <SectionCard tone="surface" eyebrow="How it works" title="Three steps and it is sorted">
        <HowItWorks />
      </SectionCard>
    </>
  );
}
