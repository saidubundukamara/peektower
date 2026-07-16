import { AtSign, Camera, Network, type LucideIcon } from "lucide-react";

// Replace these placeholder contact values and social URLs once the company
// confirms its public business details. The WhatsApp number is intentionally
// non-routable so the placeholder cannot message an unrelated person.
export const contactDetails = {
  email: "hello@peektower.com",
  whatsappLabel: "+232 — number coming soon",
  whatsappHref: "https://wa.me/23200000000",
  location: "Freetown, Sierra Leone",
} as const;

export type SocialLink = {
  label: string;
  href: string | null;
  icon: LucideIcon;
};

export const socialLinks = [
  { label: "LinkedIn", href: null, icon: Network },
  { label: "Instagram", href: null, icon: Camera },
  { label: "Facebook", href: null, icon: AtSign },
] satisfies readonly SocialLink[];
