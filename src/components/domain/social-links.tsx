import { Mail } from "lucide-react";
import { SITE } from "@/content/site";
import { cn } from "@/lib/utils";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "./brand-icons";

/** Renders only the social handles that are set in SITE, plus email. */
export function SocialLinks({ className, withEmail = true }: { className?: string; withEmail?: boolean }) {
  const links = [
    SITE.socials.instagram ? { href: SITE.socials.instagram, label: "Instagram", Icon: InstagramIcon } : null,
    SITE.socials.facebook ? { href: SITE.socials.facebook, label: "Facebook", Icon: FacebookIcon } : null,
    SITE.socials.tiktok ? { href: SITE.socials.tiktok, label: "TikTok", Icon: TikTokIcon } : null,
  ].filter((link) => link !== null);

  if (links.length === 0 && !withEmail) return null;

  return (
    <ul className={cn("flex items-center gap-2", className)} aria-label="Social links">
      {links.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className="flex size-11 items-center justify-center rounded-4xl border border-hairline bg-surface text-cocoa transition-colors hover:bg-linen focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tan focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
          >
            <Icon className="size-5" />
          </a>
        </li>
      ))}
      {withEmail ? (
        <li>
          <a
            href={`mailto:${SITE.email}`}
            aria-label="Email"
            title="Email"
            className="flex size-11 items-center justify-center rounded-4xl border border-hairline bg-surface text-cocoa transition-colors hover:bg-linen focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tan focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
          >
            <Mail className="size-5" aria-hidden="true" />
          </a>
        </li>
      ) : null}
    </ul>
  );
}
