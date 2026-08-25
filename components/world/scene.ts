import type * as THREE_NS from "three";

type THREE = typeof THREE_NS;

/**
 * The world: the PeekTower mark, standing.
 *
 * Every dimension below is derived from `components/TowerMark.tsx` rather than
 * invented, so the silhouette in the scene and the glyph in the favicon are the
 * same drawing at two scales. The mark's viewBox is 75 x 242 with the origin at
 * the top; `up()` and `across()` are the only two places that conversion lives.
 *
 * The scene is high-key on purpose. Depth is carried by exponential fog in a
 * pale value — aerial perspective — not by darkness, so the tower reads as a
 * silhouette against haze the way the real mast does over the harbour.
 */

/** Mark geometry, verbatim from TowerMark.tsx. */
const MARK = {
  viewW: 75,
  viewH: 242,
  spire: { x: 34, y: 0, w: 4, h: 35 },
  crossbar: { x: 14, y: 21, w: 8, h: 14 },
  bands: [
    { y: 35, w: 73, x: 0 },
    { y: 84, w: 73, x: 0 },
    { y: 136, w: 73, x: 0 },
    { y: 185, w: 69, x: 0 },
    { y: 235, w: 75, x: 0 },
  ],
} as const;

/** World height of the whole mark, in metres. */
const TOWER_H = 64;
/** Metres per mark unit, vertical and horizontal. */
const V = TOWER_H / MARK.viewH;
/**
 * Horizontal scale. The mark is a wide glyph — 75 across to 242 tall — and
 * holding that ratio exactly gives a structure too squat to read as a mast, so
 * the width is drawn in a little. Far enough to look like a tower, near enough
 * that the five bars still stack the way the favicon does.
 */
const H = 0.26;

/** Mark y (0 at top) -> world y (0 at ground). */
const up = (markY: number) => (MARK.viewH - markY) * V;
/** Mark x -> world x, centred on the mast. */
const across = (markX: number) => (markX - MARK.viewW / 2) * H;

const LEG_HALF = across(MARK.viewW) * 0.92;
const MEMBER = 0.3;
/** Lattice panels across each face of a bay. Tall, narrow panels read as a
 *  truss; one wide panel per face reads as a scaffold. */
const PANELS = 3;

export type World = {
  scene: THREE_NS.Scene;
  /** Called once per frame with elapsed seconds. */
  update: (time: number, cameraProgress: number) => void;
  dispose: () => void;
};

/** Places a unit box as a strut running from `a` to `b`. */
function strut(
  T: THREE,
  matrix: THREE_NS.Matrix4,
  a: THREE_NS.Vector3,
  b: THREE_NS.Vector3,
  thickness: number,
) {
  const dir = new T.Vector3().subVectors(b, a);
  const length = dir.length();
  const mid = new T.Vector3().addVectors(a, b).multiplyScalar(0.5);
  // A unit box points up the Y axis; rotate that axis onto the strut.
  const quat = new T.Quaternion().setFromUnitVectors(
    new T.Vector3(0, 1, 0),
    dir.clone().normalize(),
  );
  matrix.compose(mid, quat, new T.Vector3(thickness, length, thickness));
  return matrix;
}

function buildTower(T: THREE) {
  const members: THREE_NS.Matrix4[] = [];
  const m = new T.Matrix4();
  const v = (x: number, y: number, z: number) => new T.Vector3(x, y, z);
  const push = (a: THREE_NS.Vector3, b: THREE_NS.Vector3, t = MEMBER) => {
    members.push(strut(T, m, a, b, t).clone());
  };

  const lerpN = (a: number, b: number, t: number) => a + (b - a) * t;
  const bandY = MARK.bands.map((b) => up(b.y));
  const bandHalf = MARK.bands.map((b) => (b.w / MARK.viewW) * LEG_HALF);
  const base = bandY[bandY.length - 1];
  const top = bandY[0];

  // Four legs, from the widest band at the foot to the narrowest at the head.
  const corners: Array<[number, number]> = [
    [1, 1],
    [1, -1],
    [-1, -1],
    [-1, 1],
  ];
  const halfAt = (y: number) => {
    // Linear between the band half-widths the mark actually specifies.
    for (let i = MARK.bands.length - 1; i > 0; i--) {
      const lo = bandY[i];
      const hi = bandY[i - 1];
      if (y <= hi) {
        const t = (y - lo) / (hi - lo);
        return bandHalf[i] + (bandHalf[i - 1] - bandHalf[i]) * t;
      }
    }
    return bandHalf[0];
  };

  corners.forEach(([sx, sz]) => {
    push(
      v(sx * halfAt(base), base, sz * halfAt(base)),
      v(sx * halfAt(top), top, sz * halfAt(top)),
      MEMBER,
    );
  });

  // The five bands. These are the mark's five bars and the whole reason the
  // silhouette is recognisable, so they are heavier than the bracing.
  bandY.forEach((y, i) => {
    const h = bandHalf[i];
    for (let c = 0; c < 4; c++) {
      const [ax, az] = corners[c];
      const [bx, bz] = corners[(c + 1) % 4];
      push(v(ax * h, y, az * h), v(bx * h, y, bz * h), MEMBER * 1.25);
    }
  });

  // Cross-bracing. Each face of each bay is divided into tall, narrow panels
  // with an X across every one, plus the verticals that separate them — the
  // ordinary grammar of a lattice mast, and what stops the structure reading as
  // four legs with a few diagonals thrown over it.
  for (let i = MARK.bands.length - 1; i > 0; i--) {
    const yLo = bandY[i];
    const yHi = bandY[i - 1];
    const hLo = bandHalf[i];
    const hHi = bandHalf[i - 1];
    for (let c = 0; c < 4; c++) {
      const [ax, az] = corners[c];
      const [bx, bz] = corners[(c + 1) % 4];
      // Corner k of this face, at either end of the bay.
      const lo = (k: number) =>
        v(lerpN(ax, bx, k) * hLo, yLo, lerpN(az, bz, k) * hLo);
      const hi = (k: number) =>
        v(lerpN(ax, bx, k) * hHi, yHi, lerpN(az, bz, k) * hHi);
      for (let s = 0; s < PANELS; s++) {
        const k0 = s / PANELS;
        const k1 = (s + 1) / PANELS;
        push(lo(k0), hi(k1), MEMBER * 0.5);
        push(lo(k1), hi(k0), MEMBER * 0.5);
        if (s > 0) push(lo(k0), hi(k0), MEMBER * 0.45);
      }
    }
  }

  // The spire, and the antenna arm the mark hangs off its left shoulder.
  const spireTop = up(MARK.spire.y);
  push(v(0, top, 0), v(0, spireTop, 0), MEMBER * 0.9);

  // The crossbar. In the mark this is a solid block hung off the mast's left
  // shoulder; here it is the antenna that block stands for, so it gets the
  // outrigger, the mount, and the dipoles that make it read as one.
  const armY = up(MARK.crossbar.y + MARK.crossbar.h / 2);
  const armX = across(MARK.crossbar.x + MARK.crossbar.w / 2);
  const armLo = up(MARK.crossbar.y + MARK.crossbar.h);
  const armHi = up(MARK.crossbar.y);
  push(v(0, armY, 0), v(armX, armY, 0), MEMBER * 0.8);
  push(v(armX, armLo, 0), v(armX, armHi, 0), MEMBER * 0.9);
  [0.18, 0.5, 0.82].forEach((k) => {
    const y = armLo + (armHi - armLo) * k;
    push(v(armX, y, -1.7), v(armX, y, 1.7), MEMBER * 0.5);
  });

  return { members, crossbar: new T.Vector3(armX, armY, 0), top: spireTop };
}

export function buildScene(T: THREE): World {
  const scene = new T.Scene();

  /**
   * The climb runs from night into morning.
   *
   * The hero is the one place the page's own dark ground sits directly over the
   * canvas, and its copy is white — so the world has to be dark there or the
   * headline stops being readable. Rather than scrim over the scene, the sky
   * itself starts at the brand ink and opens into harbour haze across the first
   * leg of the ascent. That keeps the first viewport a straight translation of
   * the hero this site already had (ink, with a cyan signal off the mast) and
   * lets the apertures further down look out into full daylight.
   */
  const NIGHT = new T.Color("#04161f");
  const HAZE = new T.Color("#dbe8f0");
  const sky = NIGHT.clone();
  scene.background = sky;
  // Exponential, so the falloff is atmospheric rather than a visible curtain.
  const fog = new T.FogExp2(sky.getHex(), 0.0026);
  scene.fog = fog;

  const disposables: Array<{ dispose: () => void }> = [];
  const track = <X extends { dispose: () => void }>(x: X) => {
    disposables.push(x);
    return x;
  };

  // ---------------------------------------------------------------- lighting
  // A hemisphere doing most of the work is what keeps this high-key: the tower
  // is lit from the sky it stands against, so it darkens only where it is thick.
  const hemi = new T.HemisphereLight(0xffffff, 0xb9cedb, 0.35);
  scene.add(hemi);
  const key = new T.DirectionalLight(0xffffff, 0.3);
  key.position.set(70, 90, 130);
  scene.add(key);

  // ------------------------------------------------------------------- tower
  const { members, crossbar } = buildTower(T);
  const memberGeo = track(new T.BoxGeometry(1, 1, 1));
  const towerMat = track(
    new T.MeshStandardMaterial({ color: "#16323f", roughness: 0.85, metalness: 0.1 }),
  );
  const tower = new T.InstancedMesh(memberGeo, towerMat, members.length);
  members.forEach((mat, i) => tower.setMatrixAt(i, mat));
  tower.instanceMatrix.needsUpdate = true;
  tower.frustumCulled = false;
  scene.add(tower);

  // ------------------------------------------------------------------ ground
  /** How far the city sits below the mast's own footing. */
  const CITY_Y = -30;

  // The headland the mast stands on. The ground falls away from it, which is
  // what puts the city below the structure rather than around its ankles.
  const hillGeo = track(new T.SphereGeometry(1, 48, 24));
  const hillMat = track(new T.MeshStandardMaterial({ color: "#54707f", roughness: 1 }));
  const hill = new T.Mesh(hillGeo, hillMat);
  hill.position.set(0, CITY_Y - 6, 10);
  hill.scale.set(150, 38, 150);
  scene.add(hill);

  const groundGeo = track(new T.PlaneGeometry(2600, 2600));
  const groundMat = track(new T.MeshStandardMaterial({ color: "#b9cfda", roughness: 1 }));
  const ground = new T.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = CITY_Y;
  scene.add(ground);

  // The Atlantic, out past the peninsula. Smoother, so it catches the key light
  // and separates from the land without needing a different colour.
  const seaGeo = track(new T.PlaneGeometry(2600, 1600));
  const seaMat = track(
    new T.MeshStandardMaterial({ color: "#aec8d6", roughness: 0.35, metalness: 0.2 }),
  );
  const sea = new T.Mesh(seaGeo, seaMat);
  sea.rotation.x = -Math.PI / 2;
  sea.position.set(0, CITY_Y + 0.1, -900);
  scene.add(sea);

  // ------------------------------------------------------------------- hills
  // Three ridges. In this much haze they only ever read as pale bands, which is
  // exactly what the far side of the harbour looks like from the hill.
  const ridgeGeo = track(new T.SphereGeometry(1, 24, 12));
  const ridgeMat = track(new T.MeshStandardMaterial({ color: "#a9c3d1", roughness: 1 }));
  ([
    [-430, -700, 300, 62],
    [320, -820, 380, 84],
    [60, -600, 240, 44],
  ] as const).forEach(([x, z, w, h]) => {
    const ridge = new T.Mesh(ridgeGeo, ridgeMat);
    ridge.position.set(x, CITY_Y, z);
    ridge.scale.set(w, h, w * 0.55);
    scene.add(ridge);
  });

  // -------------------------------------------------------------------- city
  // Freetown below, as blocks. Kept low and dense so the tower stays the only
  // vertical in the frame.
  const CITY = 420;
  const blockGeo = track(new T.BoxGeometry(1, 1, 1));
  const blockMat = track(new T.MeshStandardMaterial({ color: "#9db6c4", roughness: 0.95 }));
  const city = new T.InstancedMesh(blockGeo, blockMat, CITY);
  const winGeo = track(new T.BoxGeometry(1, 1, 1));
  const winMat = track(
    new T.MeshBasicMaterial({ color: "#00bfff", transparent: true, opacity: 0 }),
  );
  const windows = new T.InstancedMesh(winGeo, winMat, CITY);

  const mat = new T.Matrix4();
  const pos = new T.Vector3();
  const quat = new T.Quaternion();
  const scl = new T.Vector3();
  // Deterministic layout: a fixed lattice with a hashed jitter, so the city is
  // identical on every load and between server and client.
  const hash = (n: number) => {
    const s = Math.sin(n * 127.1) * 43758.5453;
    return s - Math.floor(s);
  };
  const lit: number[] = [];
  for (let i = 0; i < CITY; i++) {
    // Held well clear of the mast's own footing and pushed away from the
    // viewer: the city is the ground this thing stands over, not scenery to
    // climb past. Anything nearer than this crowds the frame at every waypoint.
    const ring = 190 + hash(i) * 560;
    const angle = hash(i + 99) * Math.PI * 2;
    const x = Math.cos(angle) * ring;
    const z = Math.sin(angle) * ring - 260;
    const w = 3 + hash(i + 7) * 7;
    const d = 3 + hash(i + 13) * 7;
    const h = 2.5 + hash(i + 21) * 9;
    pos.set(x, CITY_Y + h / 2, z);
    quat.setFromAxisAngle(new T.Vector3(0, 1, 0), hash(i + 31) * Math.PI);
    scl.set(w, h, d);
    city.setMatrixAt(i, mat.compose(pos, quat, scl));
    // The lit face sits just proud of the block's own, or it z-fights.
    pos.set(x, CITY_Y + h * 0.62, z);
    scl.set(w * 1.02, h * 0.2, d * 1.02);
    windows.setMatrixAt(i, mat.compose(pos, quat, scl));
    lit.push(Math.hypot(x, z + 260));
  }
  city.instanceMatrix.needsUpdate = true;
  windows.instanceMatrix.needsUpdate = true;
  city.frustumCulled = false;
  windows.frustumCulled = false;
  scene.add(city);
  scene.add(windows);

  // ------------------------------------------------------------------ signal
  // The same behaviour the hero shader already established: a burst on arrival
  // that settles, rather than a loop. Nothing here animates forever.
  const ringGeo = track(new T.RingGeometry(1, 1.045, 96));
  const rings = [0, 1, 2].map((i) => {
    const ringMat = track(
      new T.MeshBasicMaterial({
        color: "#00bfff",
        transparent: true,
        opacity: 0,
        side: T.DoubleSide,
        depthWrite: false,
      }),
    );
    const ring = new T.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.copy(crossbar);
    ring.userData.offset = i * 1.15;
    scene.add(ring);
    return ring;
  });

  const beaconGeo = track(new T.SphereGeometry(0.7, 16, 12));
  const beaconMat = track(new T.MeshBasicMaterial({ color: "#7fe3ff" }));
  void beaconMat;
  const beacon = new T.Mesh(beaconGeo, beaconMat);
  beacon.position.copy(crossbar);
  scene.add(beacon);

  const maxLit = Math.max(...lit);

  const update = (time: number, cameraProgress: number) => {
    // Dawn across the first leg only: by the time the reader reaches About, the
    // sky is fully open and stays there.
    const dawn = Math.min(1, Math.max(0, cameraProgress));
    sky.copy(NIGHT).lerp(HAZE, dawn);
    fog.color.copy(sky);
    fog.density = 0.0026 - dawn * 0.0006;
    hemi.intensity = 0.35 + dawn * 0.75;
    key.intensity = 0.3 + dawn * 0.8;
    // Rings expand and fade once, over the first few seconds, then stop.
    rings.forEach((ring) => {
      const t = time - (ring.userData.offset as number);
      const material = ring.material as THREE_NS.MeshBasicMaterial;
      if (t <= 0 || t > 7) {
        material.opacity = 0;
        ring.visible = false;
        return;
      }
      ring.visible = true;
      const k = t / 7;
      const radius = 3 + k * 62;
      ring.scale.setScalar(radius);
      material.opacity =
        Math.sin(k * Math.PI) * 0.16 * Math.max(0, 1 - k * 0.5) * (1 - dawn * 0.85);
    });

    // The city lights as the signal reaches it, then holds. It is brightest in
    // the dark opening and fades back as daylight arrives, the way lit windows
    // actually stop reading once the sky is up.
    const reach = Math.min(1, time / 4);
    winMat.opacity = 0.55 * reach * (1 - dawn * 0.9);
    void maxLit;
  };

  const dispose = () => {
    disposables.forEach((d) => d.dispose());
    scene.clear();
  };

  return { scene, update, dispose };
}

/** Where the hero composition expects the mast to be. */
export const TOWER_TOP = TOWER_H;
