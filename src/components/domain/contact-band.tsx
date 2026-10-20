import { SITE } from "@/content/site";
import { Leaf } from "./leaf";
import { SocialLinks } from "./social-links";
import { WhatsAppButton } from "./whatsapp-button";

/** Closing band on every page: WhatsApp button, socials, service area. */
export function ContactBand() {
  return (
    <section
      aria-labelledby="contact-band-title"
      className="relative overflow-hidden border-t border-hairline bg-linen"
    >
      <Leaf className="pointer-events-none absolute -top-6 -left-6 size-40 text-sage-ink opacity-20 sm:size-56" />
      <Leaf className="pointer-events-none absolute -right-8 -bottom-10 size-40 -scale-x-100 text-tan opacity-20 sm:size-56" />
      <div className="container-content relative flex flex-col items-center py-16 text-center sm:py-24">
        <p id="contact-band-title" className="script text-5xl text-tan-deep sm:text-6xl">
          {SITE.closingLine}
        </p>
        <p className="mt-4 max-w-prose text-cocoa-muted">
          Tell us the date and roughly what you need, and we will come back with a price.
        </p>
        <div className="mt-8">
          <WhatsAppButton />
        </div>
        <SocialLinks className="mt-8" />
        <p className="eyebrow mt-8">{SITE.area}</p>
      </div>
    </section>
  );
}
