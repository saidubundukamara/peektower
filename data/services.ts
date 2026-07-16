import { Globe2, PanelsTopLeft, Smartphone, type LucideIcon } from "lucide-react";

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const services = [
  {
    title: "Web Development",
    description: "Fast, accessible websites and web applications built around real business goals.",
    icon: Globe2,
  },
  {
    title: "Mobile App Development",
    description:
      "Thoughtful mobile experiences designed for the people, devices, and conditions they serve.",
    icon: Smartphone,
  },
  {
    title: "Software & Product Design",
    description:
      "From product strategy and user flows to interfaces and prototypes, we shape ideas into products ready to build.",
    icon: PanelsTopLeft,
  },
] satisfies readonly Service[];
