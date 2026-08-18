/**
 * The PeekTower mark: a mast with an antenna crossbar over five stacked bars.
 * Geometry measured from public/android-chrome-256x256.png and normalised to a
 * 75x242 box, so the hero, the favicon and the app icons are the same drawing.
 *
 * Single-colour on purpose. The raster icons alternate cyan and white bars,
 * which makes the white ones disappear on any light surface.
 */
export function TowerMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 75 242"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <rect x="34" y="0" width="4" height="35" />
      <rect x="14" y="21" width="8" height="14" />
      <rect x="0" y="35" width="73" height="7" />
      <rect x="0" y="84" width="73" height="7" />
      <rect x="0" y="136" width="73" height="7" />
      <rect x="0" y="185" width="69" height="7" />
      <rect x="0" y="235" width="75" height="7" />
    </svg>
  );
}
