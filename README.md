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

## Content still awaiting confirmation

- Founder titles and optional headshots
- Business WhatsApp number
- Social media URLs
