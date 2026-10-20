import type { ReactNode } from "react";
import { ContactBand } from "@/components/domain/contact-band";
import { FloatingWhatsApp } from "@/components/shell/floating-whatsapp";
import { SiteFooter } from "@/components/shell/site-footer";
import { SiteHeader } from "@/components/shell/site-header";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
        <ContactBand />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
}
