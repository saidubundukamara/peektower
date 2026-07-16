# PeekTower Company Website — Implementation Plan (Next.js, Static)

## Context

PeekTower Company Limited is a Sierra Leone tech company (Freetown) currently running an outdated Bootstrap template site at `peektower.com` (hosted on GitHub Pages via `github.com/Peektower/PeekTower`, source at `/Users/saidubundukamara/Documents/PeekTower Company/web/`). That site is filled with placeholder content — fake team members ("Mary Smith", "James Bay"), fake stats ("coffees consumed"), generic template copy pulled from a Bootstrap theme ("Reign IV").

The company has since launched its first real product, **Marto** (getmarto.com) — a ride-hailing and car rental app for Freetown ("Your Ride. Your Way. Marto."). The new site's job is to present PeekTower credibly as a company and showcase Marto as its flagship product.

Confirmed decisions (from user):
- **Team**: founders only, pulled from the legal Memorandum & Articles of Association (`PeekTower Compnay M and A.docx`) — Saidu Bundu-Kamara, Aminata Bundu-Kamara, Hawanatu Adama Tarawallie, Harry Henry Kargbo. Titles/headshots are placeholders pending user confirmation.
- **Services**: core software services only — web development, mobile app development, software/product design. (The M&A doc's huge activity list — drones, VFX, hardware manufacturing, etc. — is broad legal boilerplate, not real service lines.)
- **Portfolio**: Marto only. No old client case studies (Media One Centre, SLGP) in this version.
- **Contact**: `mailto:` / `wa.me` links only — no form, no backend.
- **Hosting**: Vercel (new project), not the existing GitHub Pages + CNAME setup.

Brand assets already exist and will be reused as-is — no new brand design work needed:
- Logo: `Logo/new/peektower logo black.png` and `peektower logo white.png` (light/dark variants)
- Favicons: `Logo/favicon_package_v0.16/` (pre-generated, full set)
- Brand accent color, sampled directly from the logo pixels: **`#00BFFF`** (deep sky blue), paired with black/white, thin-weight wide-tracking wordmark

## Tech Stack

- **Next.js, App Router, TypeScript**
- `next.config.js` → `output: 'export'` (pure static HTML/CSS/JS, no server runtime) + `images: { unoptimized: true }` (required for `next/image` under static export)
- **Tailwind CSS**, theme extended with the `#00BFFF` brand accent and a wide-tracking type scale to match the logo
- **next/font** self-hosted Google Font (Inter or Manrope) — compatible with static export since fonts bundle at build time
- **lucide-react** for line icons (matches the thin-line logo aesthetic)
- Custom lightweight `useInView` hook (IntersectionObserver) for scroll-reveal animation — no Framer Motion, keeps the bundle minimal
- No database, API routes, CMS, or form backend of any kind

## Site Map

Single-page site with anchor navigation:

1. Nav (sticky, logo + links + mobile hamburger)
2. Hero (tagline + CTA)
3. About (real company positioning copy)
4. Services (3 cards: Web Dev, Mobile Apps, Software/Product Design)
5. Marto showcase (flagship product feature block, links out to getmarto.com)
6. Team (founders grid)
7. Contact (mailto / WhatsApp / location / socials)
8. Footer

---

## Phase 1 — Project Scaffold & Config

**Goal:** a running Next.js static-export project with the brand design system wired in, no content yet.

1. `npx create-next-app@latest` in `/Users/saidubundukamara/Dev/pt` — TypeScript, Tailwind, App Router, ESLint, no `src/` directory (keep `app/`, `components/`, `data/` at root for a project this size).
2. Edit `next.config.js`: add `output: 'export'` and `images: { unoptimized: true }`.
3. Install `lucide-react`.
4. `tailwind.config.ts`: extend theme with `colors.brand = '#00BFFF'`, add the chosen font family, set up a `tracking-wide` heading scale.
5. `app/layout.tsx`: load font via `next/font/google`, set base `<html>`/`<body>` classes.
6. Copy brand assets into `public/`:
   - `Logo/new/peektower logo black.png` → `public/logo/peektower-black.png`
   - `Logo/new/peektower logo white.png` → `public/logo/peektower-white.png`
   - Contents of `Logo/favicon_package_v0.16/` → `public/` (favicon.ico, apple-touch-icon, etc.)
7. Initialize git in `/Users/saidubundukamara/Dev/pt` (new repo — this project does not reuse the old `Peektower/PeekTower` GitHub repo per the hosting decision).

**Verify:** `npm run dev` shows the default Next.js page with Tailwind + font + favicon working; `npm run build` produces `out/` with no errors.

---

## Phase 2 — Layout Shell: Nav & Footer

**Goal:** persistent chrome present on every scroll position.

1. `data/nav.ts` — typed array of `{ label, href }` for the 5 anchor links (About, Services, Marto, Team, Contact).
2. `components/Nav.tsx` — sticky header, logo (swap black/white logo based on scroll position or background via a scroll-listener), desktop nav links, mobile hamburger menu (simple `useState` toggle, no external menu library needed).
3. `components/Footer.tsx` — logo, nav link repeat, social links (placeholder hrefs until user supplies real ones), copyright with current year computed at build time.
4. Wire both into `app/layout.tsx` around `{children}`.

**Verify:** nav is sticky and links scroll to anchors (even before those sections have real content — add empty `<section id="...">` placeholders in `app/page.tsx` to test); mobile menu opens/closes correctly at narrow viewport.

---

## Phase 3 — Content Sections: Hero, About, Services

**Goal:** the top of the page fully built with real copy.

1. `data/site.ts` — shared constants: company tagline, one-line positioning, contact email/phone placeholders.
2. `components/Hero.tsx` — full-viewport intro, company name, tagline, two CTAs ("See Marto" → `#marto` anchor, "Get in touch" → `#contact` anchor).
3. `components/About.tsx` — real copy (refined from the existing site's meta description, not template filler): Sierra Leone tech company building practical digital products, grounded in Freetown, first product Marto.
4. `data/services.ts` — 3 entries: `{ title, description, icon }` for Web Development, Mobile App Development, Software/Product Design.
5. `components/Services.tsx` — renders `data/services.ts` as a 3-card grid using `lucide-react` icons.
6. `components/ui/ScrollReveal.tsx` — small wrapper component using the `useInView` hook to fade/slide sections in on scroll; apply to About/Services.

**Verify:** scroll through the page, confirm Hero/About/Services render with real copy, responsive at mobile/tablet/desktop, reveal animation fires once per section (not re-triggering oddly on scroll-back).

---

## Phase 4 — Marto Showcase Section

**Goal:** the flagship product section that's the visual centerpiece of the page.

1. Flag to user: need an actual Marto logo/screenshot asset (or explicit permission to pull an image from getmarto.com) — placeholder box with dashed border and the tagline text will stand in until supplied.
2. `components/MartoShowcase.tsx` — two-column layout: left = copy (tagline "Your Ride. Your Way. Marto.", 3-4 key features as a short list: upfront fares, verified drivers, cashless payments, live tracking, ride-hailing + car rental), right = product visual (screenshot/phone mockup once asset is available); CTA button linking out to `https://getmarto.com/` (`target="_blank" rel="noopener noreferrer"`).
3. Style this section distinctly (e.g. dark background with the `#00BFFF` accent) so it reads as a featured product spotlight rather than another generic section.

**Verify:** CTA opens getmarto.com in a new tab; section is visually distinct from the rest of the page; layout collapses to single-column on mobile.

---

## Phase 5 — Team & Contact Sections

**Goal:** finish the remaining content sections.

1. `data/team.ts` — 4 founder entries pulled from the M&A doc:
   - Saidu Bundu-Kamara — placeholder title "Founder & CEO"
   - Aminata Bundu-Kamara — placeholder title "Director"
   - Hawanatu Adama Tarawallie — placeholder title "Director"
   - Harry Henry Kargbo — placeholder title "Director"
   (Mark clearly in a code comment that titles/photos are placeholders pending user confirmation.)
2. `components/Team.tsx` — grid of founder cards; each shows an initials-avatar (generated from name, no photo yet) + name + title.
3. `components/Contact.tsx` — email `mailto:` link, WhatsApp `https://wa.me/<number>` link, Freetown/Sierra Leone location text, social icons (`lucide-react`) — all as placeholder hrefs until the user supplies real contact details.
4. Assemble full `app/page.tsx` in final section order: Hero → About → Services → Marto → Team → Contact.

**Verify:** every section renders in order with correct anchor IDs matching the nav; clicking nav links scrolls to the right section; mailto/WhatsApp links have correct `href` scheme even with placeholder values.

---

## Phase 6 — SEO, Metadata & Polish

**Goal:** production-quality head tags and final visual/accessibility pass.

1. `app/layout.tsx` `metadata` export: title, description (refined from the old site's meta description), Open Graph tags (`og:title`, `og:description`, `og:image` pointing at a static image in `public/`), `theme-color`.
2. Add `public/robots.txt` and a hand-written `public/sitemap.xml` (single URL, since this is a one-page site).
3. Accessibility pass: check color contrast of `#00BFFF` against both black and white backgrounds (WCAG AA for text use), verify all images have `alt` text, verify focus states are visible on interactive elements (nav links, buttons, mobile menu toggle).
4. Responsive pass across mobile/tablet/desktop breakpoints for every section.

**Verify:** inspect built HTML `<head>` for correct meta tags; run Lighthouse (performance/accessibility/SEO) and address any flagged issues; manually tab through the page to confirm keyboard navigation works.

---

## Phase 7 — Build, Static Export & Deployment

**Goal:** shippable static site, deployed to Vercel.

1. `npm run build` → confirm static `out/` directory generated cleanly.
2. `npx serve out` locally to smoke-test the actual static export (not just `next dev`) — click every nav link, test mobile menu, confirm Marto CTA.
3. Push repo to GitHub (new repo, per hosting decision).
4. Connect repo to a new Vercel project; confirm the static export builds and deploys correctly on Vercel.
5. Add `peektower.com` as a custom domain in the Vercel project (this requires the user to update DNS records at their domain registrar to point at Vercel instead of GitHub Pages — a manual, account-level step for the user, not something executed here).

**Verify:** production Vercel URL loads correctly, all sections/links/CTAs work identically to local static-export smoke test; once DNS is updated, `peektower.com` resolves to the new site.

---

## Open Items for User (block Phases 4–5 from being "final")

- **Founder titles** — confirm exact public-facing titles for all 4 founders, and supply headshots if desired (otherwise initials-avatars stay as the permanent look).
- **Marto visual asset** — a logo/screenshot/mockup image for the showcase section.
- **Contact details** — real business email and WhatsApp/phone number for the Contact section links.
- **Social links** — actual social media URLs for Nav/Footer/Contact (none were found in the reviewed docs).
