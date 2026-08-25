# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences reach this site, and they arrive for different reasons:

- **Prospective clients** — organisations in Sierra Leone and the diaspora
  evaluating whether PeekTower can build and ship a real product for them. They
  are judging credibility, and they judge it by evidence of work that already
  runs.
- **Users and partners of the shipped products** — people looking for Marto,
  EzStaw, or OpenJustice, or for a way to contact the company.

A meaningful share of both groups arrives on low-end Android hardware over
constrained mobile networks. This is a stated, load-bearing product fact, not an
edge case, and it is already recorded in the code (`app/globals.css`, the
`.signal-field` comment).

## Product Purpose

PeekTower Company Limited is a technology company based in Freetown, Sierra
Leone. It builds practical web and mobile products for Sierra Leone and beyond.
This site is the company's public front door: it exists to make the company
credible and contactable, and to point at the products that already run.

Success is a qualified enquiry through `#contact`.

## Positioning

From `data/site.ts`, confirmed:

> PeekTower builds the digital infrastructure Sierra Leone runs on: Marto for
> everyday mobility, EzStaw for online selling, and OpenJustice for public-safety
> records.

The differentiator is that the products are live and locally grounded — built in
Freetown, for the phones and networks people there actually have. Three shipped
products are the proof; a neighbouring agency cannot truthfully copy that claim.

## Operating Context

The site is a static marketing page, deployed as plain HTML/CSS/JS. It is a
single scrolling document with anchored sections (`#about`, `#services`,
`#marto`, `#ezstaw`, `#openjustice`, `#contact`) rather than a multi-route app.

## Capabilities and Constraints

- Next.js App Router with `output: "export"` — fully static. No server runtime,
  no API routes, no database, no environment variables, no runtime image
  optimisation. Every asset is a plain file under `public/`.
- Deployed on Vercel at `peektower.com`; the site is live and indexed.
- Strict accessibility posture already established in code: a no-JS content
  contract (`.no-js [data-motion]`), and a reduced-motion contract that forbids
  indefinitely looping animation, citing WCAG 2.2.2.
- **Undecided / not yet true:** the business WhatsApp number
  (`data/contact.ts` keeps `whatsappHref: null` on purpose) and all three social
  URLs (`null`, so those links do not render). Founder titles and headshots are
  still unconfirmed. None of these may be invented.

## Brand Commitments

- Name: PeekTower Company Limited. Location: Freetown, Sierra Leone.
- The mark is a transmission mast — an antenna crossbar over five stacked bars —
  drawn once in `components/TowerMark.tsx` and shared by the favicons, the app
  icons, and the OG image.
- Brand cyan `#00bfff` on brand ink `#00131a`, with `#00718f` as the AA-safe
  cyan for light surfaces. Manrope is the only typeface.
- The user has confirmed these are to be preserved: the site keeps its light
  design system and its existing palette.

## Evidence on Hand

- Three live products with public URLs: `https://getmarto.com/`,
  `https://ezstaw.com/`, `https://crms-inky.vercel.app/` (source at
  `https://github.com/PeekTower-HQ/crms`).
- Two Freetown photographs under the Unsplash License, with credits recorded in
  `public/photos/CREDITS.md`. Only photographs actually taken in Sierra Leone are
  used — a third candidate was rejected on rights and likeness grounds.
- Brand assets in `public/brand/`, `public/logo/`, `public/og/`.
- **Absent, and not to be fabricated:** testimonials, client names, case-study
  metrics, headcount, founding date, pricing, and any performance benchmark.

## Product Principles

1. **Ship evidence, not adjectives.** The products that already run are the
   argument; claims that cannot be pointed at do not go on the page.
2. **Build for the network that exists.** Low-end Android over constrained
   mobile data is the design target, not the fallback. Anything expensive must
   be gated so those visitors never pay for it.
3. **The page must work before the enhancement does.** Content is readable with
   no JavaScript and no WebGL; everything beyond that is progressive.
4. **Motion is authored, never ambient.** One deliberate moment per surface, with
   a defined resting state; nothing loops forever.
5. **Local truth over generic polish.** Freetown is the subject, not a backdrop.

## Accessibility & Inclusion

- No-JS: content must render without client JavaScript.
- `prefers-reduced-motion` must resolve to a settled, static state with no
  running animation loops (WCAG 2.2.2, cited repeatedly in the codebase).
- Body text ≥ 4.5:1, large text ≥ 3:1. The palette carries two cyan variants
  specifically so contrast holds on both dark and light grounds.
- Devices with no WebGL context are a supported first-class state, not a
  degraded one.
