"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="container-content flex flex-1 flex-col items-center justify-center py-24 text-center">
      <h1 className="display text-4xl">Something went wrong</h1>
      <p className="mt-3 max-w-prose text-cocoa-muted">
        The page did not load properly. Try again, or head back to the start.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button size="lg" onClick={reset}>
          Try again
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/">Back home</Link>
        </Button>
      </div>
    </main>
  );
}
