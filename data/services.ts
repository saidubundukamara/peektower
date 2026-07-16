import { Globe2, PanelsTopLeft, Smartphone, type LucideIcon } from "lucide-react";

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const services = [
  {
    title: "Web Development",
    description: "Fast, accessible websites and web apps, built to do a specific job well.",
    icon: Globe2,
  },
  {
    title: "Mobile App Development",
    description:
      "Mobile apps built for the phones people actually have and the networks they actually run on.",
    icon: Smartphone,
  },
  {
    title: "Software & Product Design",
    description:
      "We map out strategy, user flows, and interface details until an idea is specific enough to build.",
    icon: PanelsTopLeft,
  },
] satisfies readonly Service[];
