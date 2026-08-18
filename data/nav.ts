export type NavItem = {
  label: string;
  href: `#${string}`;
  /**
   * Extra section ids this item should light up for. "Products" points at the
   * first product section but covers all three, which are consecutive on the
   * page and were otherwise unreachable from the nav.
   */
  matches?: readonly string[];
};

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Products", href: "#marto", matches: ["marto", "ezstaw", "openjustice"] },
  { label: "Contact", href: "#contact" },
] satisfies readonly NavItem[];
