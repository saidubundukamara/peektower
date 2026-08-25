# Design

The incumbent visual world, documented, plus the rules the tower world adds.
This is an **extension** of the existing system — the light grounds, the palette
and the typeface are preserved exactly.

## Foundations

### Colour

Defined in `app/globals.css` `:root`. These are authority; do not add near-values.

| Token | Value | Role |
|---|---|---|
| `--background` | `#ffffff` | page ground |
| `--foreground` | `#171717` | body text on light |
| `--brand` | `#00bfff` | the signal. Accent **on dark only** |
| `--brand-text` | `#00718f` | AA-safe cyan **on light** |
| `--brand-ink` | `#00131a` | the dark anchor: hero, Marto, footer |
| `--surface` | `#f6f8fb` | secondary light ground |
| `--muted` | `#5f6b7a` | secondary text on light |

Product palettes are deliberately **not** the brand, so each product reads as its
own thing: `--ez-*` (cream `#fff8f0` / orange `#ea580c`) and `--oj-*`
(mint `#f2f7f5` / green `#16a36a`).

**Colour strategy: Restrained.** Neutrals plus one accent. The accent has two
variants purely for contrast; using `--brand` on a light ground is a bug.

**Ground rhythm** — the page alternates, and the dark bands are structural:

`Hero (ink)` → `About (white)` → `Services (surface)` → `Marto (ink)` →
`EzStaw (cream)` → `OpenJustice (mint)` → `Contact (surface)` → `Footer (ink)`

### Type

Manrope only, via `next/font/google` as `--font-manrope`. One family is a
deliberate constraint; hierarchy comes from size and weight steps, not from a
second face.

| Role | Spec |
|---|---|
| Hero h1 | `clamp(2.75rem, 8vw, 7.5rem)`, 600, `leading-[0.95]`, `tracking-[-0.055em]` |
| Section h2 | `text-4xl sm:text-6xl`, 600, `leading-[1.05]`, `tracking-[-0.035em]` |
| Product h2 | `clamp(2.25rem, 7vw, 3.75rem)`, 600, `tracking-[-0.04em]` |
| h3 | `text-2xl sm:text-3xl`, 600, `tracking-[-0.02em]` |
| Body | `text-base leading-7 sm:text-lg sm:leading-8` |
| Micro-label | `text-xs font-bold uppercase tracking-heading` (`0.14em`) |

Headings use `text-balance` and a `max-w-*` measure. Tracking floor is `-0.055em`
at the hero and tightens as size grows — never looser on display sizes.

### Space and shape

- One container, everywhere: `mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-12`.
- Two vertical rhythms: editorial sections `py-24 sm:py-32 lg:py-40`; product
  showcases `py-20 sm:py-24 lg:py-28`.
- Radii: `rounded-sm` for every surface and button, `rounded-full` for pills and
  dots. Nothing else.
- Hairlines carry structure: `border-black/12` on light, `border-white/15` on
  dark. There is no shadow scale; depth is a hairline plus a ground change.
- Minimum touch target `min-h-12`.

### Motion

- Easing is `--ease-out-expo` `cubic-bezier(0.16, 1, 0.3, 1)` for everything.
- Durations `--duration-fast/base/slow` = `200 / 400 / 800ms`.
- Entrances are **enter-once**, driven by `hooks/useInView.ts` and the variants in
  `components/ui/motion.tsx` (`revealUp`, `staggerContainer`, `staggerItem`).
  Framer's `whileInView` is deliberately not used.
- Scripted sequences use `useEnterOnce()` + `useTimeline()`.

## Hard contracts

These are not preferences. Breaking one is a defect.

1. **No-JS.** Every Framer-animated element carries a bare `data-motion=""`.
   `.no-js [data-motion]` restores it. Any new element with a CSS-defined
   `opacity: 0` needs its own `.no-js` reset — the `[data-motion]` rule does not
   reach descendants that set their own opacity.
2. **Reduced motion.** Every animation has a defined resting frame. Nothing loops
   indefinitely (WCAG 2.2.2). Animation stops on `visibilitychange` and when
   off-screen.
3. **No WebGL is a supported state, not a fallback.** The CSS `.signal-field`
   rings render on first paint with no JS and are the permanent state on devices
   without a WebGL context. Expensive layers set `data-gl="on"` only *after* a
   context succeeds, which is what hides the CSS state.
4. **Scroll drives exactly one thing: the world camera.** No section may contain
   both a scroll-linked effect and an enter-once state machine. This replaces the
   blanket ban from commit `7df9891` while keeping its intent — that commit
   removed *decorative* parallax layered on top of a state machine, which is
   still forbidden.

## The tower world

A single Three.js scene persists behind the whole document. It is the PeekTower
mark — the mast — modelled at architectural scale, standing over the Freetown
peninsula in harbour haze.

- **High-key, not dark.** Pale sky, heavy `FogExp2` in a light value so distance
  reads as whiteness. The mast sits in near-silhouette. No bloom chain.
- **Cyan is the only saturated colour in the scene**, and only as emission: the
  signal rings from the crossbar and the city windows they light. It is the same
  "burst, then settle, never loop" behaviour the hero shader already established.
- **The world is seen through apertures, never as ambient wallpaper.** Light
  sections stay fully opaque so no text contrast is affected. The world is
  visible in five places only: the hero, a framed aperture in About, behind the
  Marto scrims, a framed aperture in Contact, and the footer.
- **Apertures are hairline-framed and captioned**, matching the existing
  `rounded-sm` + `border-*/12` language. They are `aria-hidden` decoration; any
  meaning they carry is repeated in adjacent text.

### Prohibitions specific to this world

- **No section numbering.** `components/Services.tsx` records why: the sections
  are parallel capabilities, not a sequence, so numbers encode nothing. Where the
  reader is is already carried by the nav, which lights the active section
  through `hooks/useScrollSpy.ts`; a second wayfinding element beside it would be
  decoration, so the reference's progress rail is not carried over either.
- **No new eyebrows.** The existing ones are part of the incumbent world and stay;
  none are added.
- **No preloader and no scroll lock.** The page is readable on first paint; the
  world fades in when and if it is ready.
- **No dark vignette.** A cool edge wash over the dark bands only.
