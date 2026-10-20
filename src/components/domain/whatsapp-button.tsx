import { MessageCircle } from "lucide-react";
import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { whatsappUrl } from "@/lib/whatsapp";

type Props = {
  message?: string;
  label?: string;
  size?: ComponentProps<typeof Button>["size"];
  className?: string;
};

/** The primary conversion control: a WhatsApp-green button that opens wa.me with a prefilled message. */
export function WhatsAppButton({ message, label = "Message us on WhatsApp", size = "lg", className }: Props) {
  return (
    <Button
      asChild
      size={size}
      className={cn(
        "bg-whatsapp text-cocoa hover:bg-[color-mix(in_oklch,var(--whatsapp),var(--cocoa)_12%)] rounded-4xl",
        className,
      )}
    >
      <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" data-testid="whatsapp-link">
        <MessageCircle data-icon="inline-start" aria-hidden="true" />
        {label}
      </a>
    </Button>
  );
}
