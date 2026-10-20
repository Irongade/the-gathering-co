import { SITE } from "@/content/site";

/** Builds a wa.me link for the configured number. All WhatsApp links go through this. */
export function whatsappUrl(message: string = SITE.whatsapp.defaultMessage): string {
  return `https://wa.me/${SITE.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export function itemMessage(itemName: string): string {
  return `Hi, I'm interested in hiring: ${itemName}.`;
}

export function occasionMessage(occasionPhrase: string): string {
  return `Hi, I'm planning a ${occasionPhrase} and would like to ask about hire.`;
}

export function mailtoUrl(subject: string, body: string): string {
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
