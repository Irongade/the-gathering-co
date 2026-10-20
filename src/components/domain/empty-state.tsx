import type { ReactNode } from "react";
import { Leaf } from "./leaf";

/** An invitation with one action. */
export function EmptyState({ title, body, action }: { title: string; body: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-hairline bg-surface px-5 py-12 text-center">
      <Leaf className="size-9 text-sage-ink" />
      <p className="display mt-4 text-2xl">{title}</p>
      <p className="mt-2 max-w-prose text-cocoa-muted">{body}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
