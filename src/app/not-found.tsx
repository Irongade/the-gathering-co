import Link from "next/link";
import { Leaf } from "@/components/domain/leaf";
import { SiteFooter } from "@/components/shell/site-footer";
import { SiteHeader } from "@/components/shell/site-header";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="container-content flex flex-1 flex-col items-center justify-center py-24 text-center">
        <Leaf className="size-10 text-sage-ink" />
        <h1 className="display mt-6 text-4xl">That page is not here</h1>
        <p className="mt-3 max-w-prose text-cocoa-muted">
          The link may be old, or the item may no longer be in the catalogue.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/hire">See what we hire</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">Back home</Link>
          </Button>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
