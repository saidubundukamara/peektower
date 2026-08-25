import type * as THREE_NS from "three";

type THREE = typeof THREE_NS;

/**
 * Live windows onto the world.
 *
 * A `[data-frame]` element is a hole punched in the page: the scene is drawn a
 * second time, with its own camera, straight into that element's screen
 * rectangle through a scissored viewport. The reference routes this through a
 * render target because it has a post chain to blit through; this world has no
 * post chain, so it draws directly into the framebuffer instead — the same
 * effect for one less buffer and one less full-screen pass per aperture.
 *
 * The page side of the hole lives in CSS: the opaque section ground is masked
 * with `mask-composite: exclude`, and this module writes the four custom
 * properties that position that cut-out.
 */

export type ApertureDef = {
  /** Matches `data-frame="<key>"`. */
  key: string;
  p: [number, number, number];
  t: [number, number, number];
  fov: number;
};

export const APERTURES: ApertureDef[] = [
  // About — the modelled tower, seen the way the harbour photograph beside it
  // sees the real one: from across the water, most of the frame given to haze.
  { key: "harbour", p: [-66, 34, 134], t: [-3, 37, 0], fov: 30 },
  // Contact — up under the crossbar, where the signal leaves the structure.
  { key: "beacon", p: [-33, 46, 32], t: [-3, 57, 0], fov: 33 },
  // Footer — the view from the mast head, out across the peninsula. The only
  // frame on the page that looks away from the structure rather than at it.
  { key: "summit", p: [-6, 68, 6], t: [-40, 30, -420], fov: 46 },
];

type Aperture = ApertureDef & {
  el: HTMLElement;
  ground: HTMLElement | null;
  camera: THREE_NS.PerspectiveCamera;
};

/**
 * Effective opacity, walking ancestors.
 *
 * The canvas knows nothing about the DOM stacked over it, so an aperture the
 * page has faded would otherwise go on painting a live view with no frame
 * around it. Below full opacity is the right place to stop: the element's own
 * fallback is opaque, so the view behind it only shows by (1 - alpha), and at
 * alpha just under one that is nothing.
 */
function effectiveOpacity(el: HTMLElement): number {
  let a = 1;
  for (let n: HTMLElement | null = el; n && n !== document.body; n = n.parentElement) {
    const s = getComputedStyle(n);
    if (s.display === "none" || s.visibility === "hidden") return 0;
    a *= Number(s.opacity);
    if (a < 0.001) return 0;
  }
  return a;
}

export function createApertures(T: THREE) {
  let list: Aperture[] = [];

  const collect = () => {
    list = APERTURES.flatMap((def) => {
      const el = document.querySelector<HTMLElement>(`[data-frame="${def.key}"]`);
      if (!el) return [];
      const camera = new T.PerspectiveCamera(def.fov, 1, 0.5, 2400);
      camera.position.set(...def.p);
      camera.lookAt(new T.Vector3(...def.t));
      return [{
        ...def,
        el,
        // The closing aperture lives in the footer, which is not a section.
        ground:
          el.closest("section, footer")?.querySelector<HTMLElement>("[data-ground]") ??
          null,
        camera,
      }];
    });
    // Only now is the page allowed to cut its ground open — before this, a
    // browser without WebGL would show a hole with nothing behind it.
    list.forEach((a) => a.el.setAttribute("data-frame-live", "true"));
    layout();
  };

  /**
   * Writes the cut-out rectangle, in the ground element's own coordinate space,
   * as custom properties. Called on scroll and resize because the aperture's
   * offset inside its section can change with reflow, not just with scroll.
   */
  const layout = () => {
    list.forEach((a) => {
      if (!a.ground) return;
      const g = a.ground.getBoundingClientRect();
      const r = a.el.getBoundingClientRect();
      if (g.width === 0 || g.height === 0) return;
      a.ground.style.setProperty("--hole-x", `${(r.left - g.left).toFixed(1)}px`);
      a.ground.style.setProperty("--hole-y", `${(r.top - g.top).toFixed(1)}px`);
      a.ground.style.setProperty("--hole-w", `${r.width.toFixed(1)}px`);
      a.ground.style.setProperty("--hole-h", `${r.height.toFixed(1)}px`);
    });
  };

  /**
   * Drawn every frame that the element is on screen.
   *
   * The reference can refresh these on a rota because it renders each view into
   * its own target and blits that target every frame. This draws straight into
   * the framebuffer instead, and the main pass repaints the whole canvas ahead
   * of it — so skipping a frame here does not hold the last view, it shows the
   * page camera through the hole. Culling is what keeps the cost down: an
   * aperture only draws while its own section is in the viewport, and no two
   * are ever on screen together.
   */
  const render = (
    renderer: THREE_NS.WebGLRenderer,
    scene: THREE_NS.Scene,
    viewportH: number,
  ) => {
    if (!list.length) return;
    let drew = false;

    list.forEach((a) => {
      const r = a.el.getBoundingClientRect();
      if (r.bottom < -40 || r.top > viewportH + 40 || r.width < 4) return;
      if (effectiveOpacity(a.el) < 0.995) return;

      a.camera.aspect = r.width / r.height;
      a.camera.updateProjectionMatrix();

      const x = r.left;
      const y = viewportH - r.bottom;
      renderer.setViewport(x, y, r.width, r.height);
      renderer.setScissor(x, y, r.width, r.height);
      renderer.setScissorTest(true);
      renderer.clear(true, true, false);
      renderer.render(scene, a.camera);
      drew = true;
    });

    if (drew) renderer.setScissorTest(false);
  };

  const dispose = () => {
    list.forEach((a) => {
      a.el.removeAttribute("data-frame-live");
      a.ground?.style.removeProperty("--hole-x");
      a.ground?.style.removeProperty("--hole-y");
      a.ground?.style.removeProperty("--hole-w");
      a.ground?.style.removeProperty("--hole-h");
    });
    list = [];
  };

  return { collect, layout, render, dispose };
}
