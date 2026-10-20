import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

/** Section divider: short rule, small heart, short rule. */
export function Divider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3 text-tan", className)} aria-hidden="true">
      <span className="h-px w-12 bg-tan" />
      <Heart className="size-3.5" strokeWidth={1.6} />
      <span className="h-px w-12 bg-tan" />
    </div>
  );
}
