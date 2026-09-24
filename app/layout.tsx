import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

const display = Barlow_Condensed({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://2amdriveclub.cz"),
  title: {
    default: "2AM DRIVE CLUB — klub pro ty, co jezdí, když ostatní spí",
    template: "%s — 2AM Drive Club",
  },
  description:
    "Uzavřený klub nočních jízd. Vstup na přihlášku, ne na registraci. Každá jízda se zaznamená, na každé jízdě jede fotograf.",
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    siteName: "2AM Drive Club",
    title: "2AM DRIVE CLUB",
    description:
      "Uzavřený klub nočních jízd. Vstup na přihlášku, ne na registraci.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#060607",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="cs" data-theme="dark" className={`${display.variable} ${body.variable}`}>
      <body>
        <SiteHeader />
        <main id="obsah">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
