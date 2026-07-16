import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { Footer } from "@/components/Footer";
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
  openGraph: {
    type: "website",
    locale: "en_SL",
    url: "/",
    siteName: "PeekTower",
    title: "PeekTower | Digital Products Built in Sierra Leone",
    description:
      "A Freetown technology company building practical web and mobile products for Sierra Leone and beyond.",
    images: [
      {
        url: "/logo/peektower-black.png",
        width: 1920,
        height: 1080,
        alt: "PeekTower Company Limited",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PeekTower | Digital Products Built in Sierra Leone",
    description:
      "A Freetown technology company building practical web and mobile products for Sierra Leone and beyond.",
    images: ["/logo/peektower-black.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
