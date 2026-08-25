/**
 * What this device gets.
 *
 * Runs *before* three is imported. That ordering is the whole point: a visitor
 * on a metered 2G connection must never pay to download a renderer they will
 * not be shown. `app/globals.css` already records why this is not an edge case
 * here — low-end Android on constrained networks is a real share of the
 * audience this company builds for.
 */
export type WorldTier =
  /** full scene, both apertures, adaptive resolution governor */
  | "full"
  /** the scene, at lower resolution, with the apertures on a slower rota */
  | "reduced-res"
  /** one settled frame, no animation loop at all */
  | "static"
  /** three is never fetched; the existing ogl hero shader runs instead */
  | "constrained"
  /** no GPU path at all; the CSS signal rings stay */
  | "none";

/** `navigator.connection`, which TypeScript's DOM lib still does not describe. */
type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
};

function connection(): NetworkInformation | undefined {
  return (navigator as Navigator & { connection?: NetworkInformation }).connection;
}

/** Chrome-only, and reported in coarse steps (0.25/0.5/1/2/4/8). */
function deviceMemory(): number | undefined {
  return (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
}

/**
 * A context probe, not a feature-detect. `webgl2` in window says the browser
 * knows the constructor; it does not say the driver will hand us a context,
 * which is exactly the case that fails on old Android.
 */
function canCreateContext(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2");
    if (!gl) return false;
    // Release it immediately — this probe must not hold a context slot open.
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export function resolveTier(): WorldTier {
  if (typeof window === "undefined") return "none";

  const net = connection();
  const memory = deviceMemory();

  // Cheapest disqualifiers first, so the expensive probe is skipped entirely.
  // Save-Data is an explicit request, not a hint: honour it before anything else.
  if (
    net?.saveData === true ||
    net?.effectiveType === "2g" ||
    net?.effectiveType === "slow-2g" ||
    (memory !== undefined && memory <= 2)
  ) {
    return "constrained";
  }

  if (!canCreateContext()) return "none";

  // Reduced motion still gets the world — it just gets one frame of it. The
  // scene is the page's subject, so removing it entirely would remove content,
  // not motion.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return "static";
  }

  const coarse = window.matchMedia("(pointer: coarse)").matches;
  if (coarse || (memory !== undefined && memory <= 4)) return "reduced-res";

  return "full";
}

/** Whether this tier ever needs the three bundle. */
export function tierLoadsThree(tier: WorldTier): boolean {
  return tier === "full" || tier === "reduced-res" || tier === "static";
}

/** Whether this tier runs a continuous animation loop. */
export function tierAnimates(tier: WorldTier): boolean {
  return tier === "full" || tier === "reduced-res";
}

/** Device-pixel-ratio ceiling. Pixels are the only knob worth turning here. */
export function tierDprCap(tier: WorldTier): number {
  return tier === "full" ? 1.8 : 1.3;
}
