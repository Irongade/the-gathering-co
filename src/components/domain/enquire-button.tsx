import { MessageCircle } from "lucide-react";
import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/whatsapp";

type Props = {
  message: string;
  label?: string;
  variant?: ComponentProps<typeof Button>["variant"];
  size?: ComponentProps<typeof Button>["size"];
  className?: string;
};

/** Enquire about a specific item or occasion. The message carries the context so the owner never has to ask. */
export function EnquireButton({
  message,
  label = "Enquire on WhatsApp",
  variant = "default",
  size = "default",
  className,
}: Props) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" data-testid="enquire-link">
        <MessageCircle data-icon="inline-start" aria-hidden="true" />
        {label}
      </a>
    </Button>
  );
}
