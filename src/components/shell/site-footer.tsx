import Image from "next/image";
import Link from "next/link";
import { SocialLinks } from "@/components/domain/social-links";
import { SITE } from "@/content/site";
import { NAV } from "./nav";
import { ThemeToggle } from "./theme-toggle";

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-cream">
      <div className="container-content flex flex-col gap-8 py-12 pb-[calc(3rem+env(safe-area-inset-bottom))] sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xs">
          <Image src="/brand/logo-round.svg" alt={SITE.name} width={72} height={72} className="size-16" />
          <p className="mt-4 text-sm text-cocoa-muted">
            {SITE.tagline}. Delivery and collection across {SITE.area}.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-col gap-1 sm:items-end">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex h-11 items-center rounded-md text-sm text-cocoa hover:text-tan-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tan"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col gap-4 sm:items-end">
          <SocialLinks />
          <a href={`mailto:${SITE.email}`} className="text-sm text-cocoa-muted hover:text-tan-deep">
            {SITE.email}
          </a>
          <ThemeToggle />
        </div>
      </div>
      <div className="container-content flex flex-col gap-1 border-t border-hairline py-4 text-xs text-cocoa-muted sm:flex-row sm:justify-between">
        <p>
          {SITE.name}, {new Date().getFullYear()}
        </p>
        <p>{SITE.area}</p>
      </div>
    </footer>
  );
}
