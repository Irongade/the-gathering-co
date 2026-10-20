/** The single nav list. Header and mobile nav both read from here. */
export const NAV = [
  { href: "/hire", label: "Hire" },
  { href: "/occasions", label: "Occasions" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export type NavItem = (typeof NAV)[number];
