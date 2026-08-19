import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { Footer } from "@/components/Footer";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { Nav } from "@/components/Nav";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://peektower.com"),
  title: "PeekTower | Digital Products Built in Sierra Leone",
  description:
    "PeekTower is a Freetown technology company building practical web and mobile products for Sierra Leone and beyond, including Marto.",
  alternates: {
    canonical: "/",
  },
  // The manifest existed but nothing referenced it, so it was inert.
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    // "en_SL" is not a valid Open Graph locale and was being dropped.
    locale: "en_GB",
    url: "/",
    siteName: "PeekTower",
    title: "PeekTower | Digital Products Built in Sierra Leone",
    description:
      "A Freetown technology company building practical web and mobile products for Sierra Leone and beyond.",
    images: [
      {
        url: "/og/peektower-og.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "PeekTower — building practical digital products from Sierra Leone",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PeekTower | Digital Products Built in Sierra Leone",
    description:
      "A Freetown technology company building practical web and mobile products for Sierra Leone and beyond.",
    images: ["/og/peektower-og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  category: "technology",
};

export const viewport: Viewport = {
  // Matches --brand-ink in app/globals.css (Hero/Footer's bg-brand-ink).
  // Keep in sync manually — Viewport config can't reference CSS custom properties.
  themeColor: "#00131a",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`no-js ${manrope.variable} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground">
        {/*
          Runs during parse, before any [data-motion] element exists, so there is
          no flash. If this never executes — JS disabled, or the chunk fails on a
          slow connection — `.no-js` stays and globals.css force-reveals every
          element whose entrance state Framer serialised as opacity:0.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.remove("no-js")`,
          }}
        />
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-sm bg-brand px-4 py-3 text-sm font-bold text-brand-ink shadow-lg transition-transform focus:translate-y-0"
        >
          Skip to main content
        </a>
        <MotionProvider>
          <Nav />
          {children}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
