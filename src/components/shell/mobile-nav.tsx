"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { WhatsAppButton } from "@/components/domain/whatsapp-button";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SITE } from "@/content/site";
import { NAV } from "./nav";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open menu">
            <Menu className="size-5" aria-hidden="true" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="bg-cream">
          <SheetHeader>
            <SheetTitle className="display text-2xl">{SITE.name}</SheetTitle>
            <SheetDescription className="text-cocoa-muted">{SITE.tagline}</SheetDescription>
          </SheetHeader>
          <nav aria-label="Mobile" className="px-4">
            <ul className="flex flex-col">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="display flex h-14 items-center border-b border-hairline text-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tan"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto p-4">
            <WhatsAppButton className="w-full" />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
