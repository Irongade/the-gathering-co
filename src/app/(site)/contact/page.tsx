import { Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/domain/page-header";
import { SocialLinks } from "@/components/domain/social-links";
import { WhatsAppButton } from "@/components/domain/whatsapp-button";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { listOccasions } from "@/content/occasions";
import { SITE } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: `Send an enquiry to ${SITE.name} on WhatsApp or by email.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Tell us about your event"
        intro="Fill in what you know and we will open WhatsApp with it written out. Or just message us directly."
      >
        <WhatsAppButton />
      </PageHeader>
      <div className="container-content grid grid-cols-1 gap-8 pb-12 lg:grid-cols-[3fr_2fr] lg:gap-12 sm:pb-24">
        <div className="rounded-xl border border-hairline bg-surface p-5 sm:p-8">
          <h2 className="display mb-6 text-3xl">Enquiry form</h2>
          <EnquiryForm occasions={listOccasions()} />
        </div>
        <aside className="space-y-8 lg:pt-2">
          <div>
            <h2 className="display text-3xl">Other ways to reach us</h2>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="mt-1 size-5 shrink-0 text-tan" aria-hidden="true" />
                <div>
                  <p className="font-medium">Email</p>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-cocoa-muted underline-offset-4 hover:text-tan-deep hover:underline"
                  >
                    {SITE.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 size-5 shrink-0 text-tan" aria-hidden="true" />
                <div>
                  <p className="font-medium">Service area</p>
                  <p className="text-cocoa-muted">{SITE.area}. Within about 20 miles of the city centre. [TODO]</p>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-3">Follow along</p>
            <SocialLinks withEmail={false} />
          </div>
          <div className="rounded-xl border border-hairline bg-linen p-5">
            <p className="font-medium">Map</p>
            <p className="mt-1 text-sm text-cocoa-muted">
              A map of the delivery area will go here once the owner confirms it. [TODO]
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
