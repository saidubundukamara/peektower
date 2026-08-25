import { TowerMark } from "@/components/TowerMark";

type WorldApertureProps = {
  /** Matches an entry in `APERTURES` in components/world/apertures.ts. */
  frame: string;
  /** Read by sighted users; the surrounding copy carries the same meaning. */
  caption: string;
  meta?: string;
  className?: string;
  /** CSS aspect-ratio for the frame. */
  ratio?: string;
  /** Which ground the frame sits on, so its hairline stays visible on both. */
  tone?: "light" | "dark";
};

/**
 * A window cut through the page onto the world behind it.
 *
 * The frame itself is empty by design: the scene is drawn directly into this
 * element's screen rectangle, and the section's ground is masked so there is
 * nothing between the two. What lives here is the chrome — the hairline, the
 * caption, and the still that stands in wherever the live view cannot run.
 *
 * Decorative: `apertures.ts` only ever reports the tower, which the adjacent
 * copy already describes.
 */
export function WorldAperture({
  frame,
  caption,
  meta,
  className,
  ratio = "4 / 5",
  tone = "light",
}: WorldApertureProps) {
  return (
    <figure className={className}>
      <div
        data-frame={frame}
        data-tone={tone}
        className="aperture"
        style={{ aspectRatio: ratio }}
        aria-hidden="true"
      >
        <div className="aperture-fallback absolute inset-0 grid place-items-center bg-brand-ink">
          <TowerMark className="h-2/3 w-auto text-brand/30" />
        </div>
      </div>
      {/*
        The label is a claim about what the frame is doing, so it only appears
        once the frame is actually doing it. Where the live view cannot run, the
        still stands on its own without being described as something it is not.
      */}
      <figcaption
        className={`mt-3 flex items-baseline justify-between gap-4 text-sm ${
          tone === "dark" ? "text-white/60" : "text-muted"
        }`}
      >
        <span>{caption}</span>
        {meta ? (
          <span
            className={`aperture-meta text-xs font-bold uppercase tracking-heading ${
              tone === "dark" ? "text-brand" : "text-brand-text"
            }`}
          >
            {meta}
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}
