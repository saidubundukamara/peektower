export type NavItem = {
  label: string;
  href: `#${string}`;
};

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#marto" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
] satisfies readonly NavItem[];
