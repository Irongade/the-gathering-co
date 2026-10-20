"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { whatsappUrl } from "@/lib/whatsapp";

/** Fixed bottom-right on every page except /contact, which has its own form and button. */
export function FloatingWhatsApp() {
  const pathname = usePathname();
  if (pathname === "/contact") return null;
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message us on WhatsApp"
      data-testid="floating-whatsapp"
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex h-14 items-center gap-2 rounded-4xl bg-whatsapp px-5 font-medium text-cocoa shadow-float transition-colors hover:bg-[color-mix(in_oklch,var(--whatsapp),var(--cocoa)_12%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tan focus-visible:ring-offset-2 focus-visible:ring-offset-cream sm:right-6 sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))]"
    >
      <MessageCircle className="size-5" aria-hidden="true" />
      <span className="hidden sm:inline">WhatsApp</span>
      <span className="sr-only sm:hidden">WhatsApp</span>
    </a>
  );
}
