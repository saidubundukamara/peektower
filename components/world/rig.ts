import type * as THREE_NS from "three";

type THREE = typeof THREE_NS;

/**
 * The climb.
 *
 * Scroll is the only input to this rig, and the rig is the only thing scroll
 * drives on the page (see DESIGN.md). Each entry is composed for one section;
 * the camera is interpolated between them along a Catmull-Rom spline so the
 * move reads as one continuous ascent rather than eight cuts.
 */
export type Waypoint = {
  /** Camera position. */
  p: [number, number, number];
  /** What it looks at. */
  t: [number, number, number];
  fov: number;
};

export const WAYPOINTS: Waypoint[] = [
  // 0 hero — the mast entire, from across the ground and looking up. The target
  // sits left of the structure so it composes right of centre, where the flat
  // hero already put the mark at --signal-x: 76%.
  { p: [-62, 30, 132], t: [-24, 42, 0], fov: 34 },
  // 1 about — further back and squarer on; the whole structure in haze
  { p: [-96, 34, 205], t: [-4, 34, 0], fov: 30 },
  // 2 services — in close on the bracing; the built detail
  { p: [-26, 30, 48], t: [0, 40, 0], fov: 44 },
  // 3 marto — over the road network
  { p: [2, 58, 44], t: [0, 0, -80], fov: 52 },
  // 4 ezstaw — the market quarter
  { p: [42, 26, 62], t: [92, 0, -40], fov: 48 },
  // 5 openjustice — the civic quarter
  { p: [-52, 22, 32], t: [-120, 0, -60], fov: 48 },
  // 6 contact — up at the crossbar and the beacon
  { p: [-24, 60, 21], t: [-7, 56.6, 0], fov: 38 },
  // 7 footer — above it, the signal over the whole peninsula
  { p: [0, 118, 150], t: [0, 20, -120], fov: 46 },
];

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
/** Frame-rate independent approach. */
const damp = (a: number, b: number, rate: number, dt: number) =>
  lerp(a, b, 1 - Math.exp(-rate * dt));

export type Rig = {
  camera: THREE_NS.PerspectiveCamera;
  /** 0 .. WAYPOINTS.length-1 */
  progress: number;
  measure: () => void;
  /** Advance the smoothing; call once per frame. */
  step: (dt: number, immediate: boolean) => void;
  apply: () => void;
  setPointer: (nx: number, ny: number) => void;
  /** 0..1 across the whole page, for anything that wants a plain ratio. */
  ratio: () => number;
};

export function createRig(T: THREE, viewport: () => { w: number; h: number }): Rig {
  const camera = new T.PerspectiveCamera(WAYPOINTS[0].fov, 1, 0.5, 2400);

  const curveP = new T.CatmullRomCurve3(
    WAYPOINTS.map((w) => new T.Vector3(...w.p)),
    false,
    "catmullrom",
    0.4,
  );
  const curveT = new T.CatmullRomCurve3(
    WAYPOINTS.map((w) => new T.Vector3(...w.t)),
    false,
    "catmullrom",
    0.4,
  );

  const state = {
    target: 0,
    smooth: 0,
    pointerX: 0,
    pointerY: 0,
    aimX: 0,
    aimY: 0,
    intro: 0,
  };

  let anchors: number[] = [];
  let maxScroll = 1;

  const measure = () => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-cam]"),
    ).sort((a, b) => Number(a.dataset.cam) - Number(b.dataset.cam));
    const vh = viewport().h;
    maxScroll = Math.max(1, document.documentElement.scrollHeight - vh);
    anchors = sections.map((el, i) => {
      if (i === 0) return 0;
      if (i === sections.length - 1) return maxScroll;
      return clamp(el.offsetTop + el.offsetHeight * 0.5 - vh * 0.5, 0, maxScroll);
    });
    // Anchors must be strictly increasing or progressFor divides by zero.
    for (let i = 1; i < anchors.length; i++) {
      anchors[i] = Math.max(anchors[i], anchors[i - 1] + 1);
    }
  };

  const progressFor = (y: number) => {
    if (!anchors.length) return 0;
    if (y <= anchors[0]) return 0;
    for (let i = 0; i < anchors.length - 1; i++) {
      if (y <= anchors[i + 1]) {
        return i + (y - anchors[i]) / (anchors[i + 1] - anchors[i]);
      }
    }
    return anchors.length - 1;
  };

  /**
   * Every waypoint is composed for a wide frame. On a tall one the same numbers
   * crop the tower, so the rig steps back along its own view axis and opens up
   * rather than letting the structure run off the sides.
   */
  const aspectFix = () => {
    const { w, h } = viewport();
    return clamp((1.6 - w / h) / 1.05, 0, 1);
  };

  const _p = new T.Vector3();
  const _t = new T.Vector3();
  const _d = new T.Vector3();

  const step = (dt: number, immediate: boolean) => {
    state.target = progressFor(window.scrollY);
    if (immediate) {
      state.smooth = state.target;
      state.aimX = state.pointerX;
      state.aimY = state.pointerY;
      state.intro = 1;
      return;
    }
    state.smooth = damp(state.smooth, state.target, 5.2, dt);
    state.aimX = damp(state.aimX, state.pointerX, 2.6, dt);
    state.aimY = damp(state.aimY, state.pointerY, 2.6, dt);
    state.intro = Math.min(1, state.intro + dt / 2.2);
  };

  const apply = () => {
    const last = WAYPOINTS.length - 1;
    const u = clamp(state.smooth / last, 0, 1);
    curveP.getPoint(u, _p);
    curveT.getPoint(u, _t);

    const i = clamp(Math.floor(state.smooth), 0, last - 1);
    const f = clamp(state.smooth - i, 0, 1);
    let fov = lerp(WAYPOINTS[i].fov, WAYPOINTS[i + 1].fov, f);

    const nf = aspectFix();
    if (nf > 0) {
      // Stepping back is only half of it. Every waypoint is composed with the
      // structure off to one side, and on a phone that offset is what carries
      // it past the edge of the frame — so the aim swings back toward the mast
      // as the frame narrows, and the composition recentres instead of
      // cropping. The waypoints that deliberately look away from the tower all
      // belong to sections that paint over the canvas anyway.
      _t.x = lerp(_t.x, 0, nf * 0.85);
      _d.subVectors(_p, _t).normalize();
      _p.addScaledVector(_d, nf * 20);
      _p.y += nf * 4;
      fov *= 1 + nf * 0.3;
    }

    // The opening dolly: a longer lens easing in from further back.
    const io = 1 - state.intro;
    _p.z += io * 18;
    _p.y += io * 3;
    fov += io * 7;

    // Hand-held drift. Damped down as the climb starts so it never fights the
    // camera move itself.
    const par = 1 - Math.min(1, state.smooth / 1.6) * 0.55;
    _p.x += state.aimX * 3.4 * par;
    _p.y += state.aimY * 1.9 * par;
    _t.x -= state.aimX * 1.1 * par;
    _t.y -= state.aimY * 0.6 * par;

    camera.position.copy(_p);
    camera.lookAt(_t);
    const { w, h } = viewport();
    camera.aspect = w / h;
    if (Math.abs(camera.fov - fov) > 1e-4) camera.fov = fov;
    camera.updateProjectionMatrix();
  };

  return {
    camera,
    get progress() {
      return state.smooth;
    },
    measure,
    step,
    apply,
    setPointer: (nx, ny) => {
      state.pointerX = nx;
      state.pointerY = ny;
    },
    ratio: () => clamp(state.smooth / (WAYPOINTS.length - 1), 0, 1),
  };
}

/**
 * Trades resolution for frame rate on unknown hardware. The scene is fill-bound,
 * so pixels are the only knob worth turning.
 */
export function createGovernor() {
  let scale = 1;
  let acc = 0;
  let n = 0;
  return {
    get scale() {
      return scale;
    },
    /** Returns true when the caller should re-apply renderer sizing. */
    sample(frameSeconds: number): boolean {
      acc += frameSeconds;
      n++;
      if (n < 40 && acc < 0.9) return false;
      const avg = acc / n;
      acc = 0;
      n = 0;
      if (avg > 0.023 && scale > 0.55) {
        scale = Math.max(0.55, scale * (avg > 0.05 ? 0.64 : 0.85));
        return true;
      }
      if (avg < 0.0138 && scale < 1) {
        scale = Math.min(1, scale + 0.08);
        return true;
      }
      return false;
    },
  };
}
