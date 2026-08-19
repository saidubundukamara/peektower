# PeekTower company website

The static company website for PeekTower Company Limited, built with Next.js 16,
TypeScript, and Tailwind CSS. The site uses the App Router and exports to plain
HTML, CSS, and JavaScript for deployment on Vercel.

## Local development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production checks

Run lint and create the static export:

```bash
npm run lint
npm run build
```

The production files are written to `out/`. Smoke-test the actual export rather
than the development server:

```bash
npx serve out
```

## Deploy to Vercel

1. Push this repository to a new GitHub repository.
2. Import the repository into a new Vercel project.
3. Keep the detected framework preset as Next.js and use `npm run build` as the
   build command. Next.js writes the configured static export to `out/`.
4. Deploy and smoke-test the generated Vercel URL.
5. Add `peektower.com` under the Vercel project's Domains settings.
6. Replace the old GitHub Pages DNS records with the records Vercel provides,
   then verify both the apex domain and `www` behavior.

No server runtime, API routes, database, or environment variables are required.

## Brand assets

Generated into `public/` from one drawing — the tower mark in
`components/TowerMark.tsx`, whose geometry the favicons and social images share.

| Asset | Path | Use |
|---|---|---|
| Square logo, 400x400 | `public/brand/linkedin-logo-400.png` | LinkedIn company page avatar |
| Cover, 1128x191 | `public/brand/linkedin-cover-1128x191.png` | LinkedIn company page banner |
| Social card, 1200x630 | `public/og/peektower-og.png` | Open Graph / Twitter previews |

Rebuild them with `python3 /tmp/build_brand.py` style composition via Pillow;
there is no ImageMagick dependency.

## Photography

`public/photos/` holds two Unsplash photographs of Freetown, used under the
Unsplash License. See `public/photos/CREDITS.md`. Only photographs actually
taken in Sierra Leone are used.

## Content still awaiting confirmation

- Founder titles and optional headshots
- Business WhatsApp number. Until one exists, `data/contact.ts` keeps
  `whatsappHref: null` and the row renders as plain text rather than linking to
  a number that is not ours.
- Social media URLs. `socialLinks` entries with a `null` href are not rendered
  at all; add a URL and the link appears in both Contact and the footer.
