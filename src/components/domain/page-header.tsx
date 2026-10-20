import type { ReactNode } from "react";
import { Eyebrow } from "./eyebrow";

export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <header className="container-content pt-12 pb-8 text-center sm:pt-20 sm:pb-12">
      {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}
      <h1 className="display mx-auto max-w-prose text-4xl sm:text-5xl">{title}</h1>
      {intro ? <p className="mx-auto mt-4 max-w-prose text-lg text-cocoa-muted">{intro}</p> : null}
      {children ? <div className="mt-6 flex flex-wrap justify-center gap-3">{children}</div> : null}
    </header>
  );
}
