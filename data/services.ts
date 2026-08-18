export type Service = {
  title: string;
  description: string;
  /** What we actually shipped doing this. Keeps the list tied to real work. */
  builtIt: string;
};

export const services = [
  {
    title: "Web development",
    description:
      "Fast, accessible websites and web apps, built to do a specific job well.",
    builtIt: "EzStaw storefronts",
  },
  {
    title: "Mobile app development",
    description:
      "Apps built for the phones people actually have and the networks they actually run on.",
    builtIt: "Marto rider and driver apps",
  },
  {
    title: "Software and product design",
    description:
      "We map out strategy, user flows, and interface details until an idea is specific enough to build.",
    builtIt: "OpenJustice",
  },
] satisfies readonly Service[];
