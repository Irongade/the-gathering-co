import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./eyebrow";

/** A page section with optional eyebrow, heading and intro. Centred heading, left content. */
export function SectionCard({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
  tone = "cream",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  children: ReactNode;
  className?: string;
  tone?: "cream" | "surface" | "linen";
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-12 sm:py-24",
        tone === "surface" && "border-y border-hairline bg-surface",
        tone === "linen" && "bg-linen",
        className,
      )}
    >
      <div className="container-content">
        {title ? (
          <div className="mx-auto mb-8 max-w-prose text-center sm:mb-12">
            {eyebrow ? <Eyebrow className="mb-3">{eyebrow}</Eyebrow> : null}
            <h2 className="display text-3xl sm:text-4xl">{title}</h2>
            {intro ? <p className="mt-3 text-cocoa-muted">{intro}</p> : null}
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}
