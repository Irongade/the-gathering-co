import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/content/site";
import { MobileNav } from "./mobile-nav";
import { NAV } from "./nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-cream/90 backdrop-blur supports-backdrop-filter:bg-cream/80">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2 focus:ring-2 focus:ring-tan"
      >
        Skip to content
      </a>
      <div className="container-content flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tan focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
          aria-label={`${SITE.name} home`}
        >
          <Image
            src="/brand/logo-lockup.svg"
            alt={SITE.name}
            width={220}
            height={48}
            priority
            className="h-10 w-auto"
          />
        </Link>
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex h-11 items-center rounded-md px-3 text-sm font-medium text-cocoa transition-colors hover:bg-linen focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tan focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
