import { AtSign, Camera, Network, type LucideIcon } from "lucide-react";

// Replace these placeholder contact values and social URLs once the company
// confirms its public business details. `whatsappHref` stays null until a real
// number exists, so the row renders as plain text instead of opening a thread
// with an unrelated person.
export const contactDetails = {
  email: "hello@peektower.com",
  whatsappLabel: "Number coming soon",
  whatsappHref: null as string | null,
  location: "Freetown, Sierra Leone",
} as const;

export type SocialLink = {
  label: string;
  href: string | null;
  icon: LucideIcon;
};

// Explicitly typed rather than `satisfies`, so `href` widens to `string | null`
// and the "only render live accounts" filter in Contact/Footer can narrow it.
export const socialLinks: readonly SocialLink[] = [
  { label: "LinkedIn", href: null, icon: Network },
  { label: "Instagram", href: null, icon: Camera },
  { label: "Facebook", href: null, icon: AtSign },
];
