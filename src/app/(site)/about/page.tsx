import type { Metadata } from "next";
import Image from "next/image";
import { Faq } from "@/components/domain/faq";
import { PageHeader } from "@/components/domain/page-header";
import { SectionCard } from "@/components/domain/section-card";
import { WhatsAppButton } from "@/components/domain/whatsapp-button";
import { listFaq } from "@/content/faq";
import { SITE } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: `Who runs ${SITE.name}, where we deliver and how collection works.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About" title="A small local hire company" intro={`${SITE.promise}, across ${SITE.area}.`} />
      <div className="container-content grid grid-cols-1 gap-8 pb-12 lg:grid-cols-[2fr_3fr] lg:gap-12 sm:pb-24">
        <Image
          src="/brand/logo-round.svg"
          alt={SITE.name}
          width={400}
          height={400}
          className="mx-auto w-full max-w-xs rounded-xl lg:max-w-none"
        />
        <div className="max-w-prose space-y-5 text-lg text-cocoa-muted">
          <h2 className="display text-3xl text-cocoa">Who we are</h2>
          <p>
            The Gathering Co. is run by a Newcastle family who got tired of borrowing chairs from the neighbours every
            time there was something to celebrate. We bought a van, a stack of tables and far too many chairs, and now
            we lend them to people like you. [TODO]
          </p>
          <h2 className="display pt-4 text-3xl text-cocoa">Where we deliver</h2>
          <p>
            {SITE.area}. As a guide, anywhere within about 20 miles of the city centre. [TODO] Tell us your postcode
            when you message and we will confirm straight away.
          </p>
          <h2 className="display pt-4 text-3xl text-cocoa">Delivery and collection</h2>
          <p>
            We drop everything off at a time that suits you, usually the morning of your event or the day before. When
            the party is over we come back and collect it. You do not need to clean anything beyond a wipe down, and you
            never need to fit a table in the car.
          </p>
        </div>
      </div>

      <SectionCard tone="surface" eyebrow="Questions" title="Things people ask before they message">
        <div className="mx-auto max-w-3xl">
          <Faq entries={listFaq()} />
          <div className="mt-8 text-center">
            <p className="mb-4 text-cocoa-muted">Something else on your mind?</p>
            <WhatsAppButton label="Ask us on WhatsApp" />
          </div>
        </div>
      </SectionCard>
    </>
  );
}
