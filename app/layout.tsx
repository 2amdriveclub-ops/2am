import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Barlow_Condensed, Inter } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getContent } from "@/lib/content";
import { getLocale } from "@/lib/locale";
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

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const c = getContent(locale);
  const host = (await headers()).get("host") ?? "2amdriveclub.cz";

  return {
    metadataBase: new URL(`https://${host}`),
    title: { default: c.meta.title, template: `%s — ${c.site.name}` },
    description: c.meta.description,
    openGraph: {
      type: "website",
      locale: c.site.ogLocale,
      siteName: c.site.name,
      title: c.meta.title,
      description: c.meta.description,
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#060607",
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const c = getContent(locale);

  return (
    <html
      lang={c.site.htmlLang}
      data-theme="dark"
      className={`${display.variable} ${body.variable}`}
    >
      <body>
        <SiteHeader locale={locale} />
        <main id="obsah">{children}</main>
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}
