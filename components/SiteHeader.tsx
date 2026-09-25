import Link from "next/link";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/locale";

export function SiteHeader({ locale }: { locale: Locale }) {
  const c = getContent(locale);

  return (
    <header className="masthead">
      <a className="skip" href="#obsah">
        {c.skip}
      </a>
      <div className="shell masthead__inner">
        <Link href="/" className="wordmark" aria-label={`${c.site.name} — ${locale === "cs" ? "domů" : "home"}`}>
          <span className="wordmark__mark">2AM</span>
          <span className="wordmark__rest">Drive Club</span>
        </Link>
        <nav className="masthead__nav" aria-label={locale === "cs" ? "Hlavní" : "Main"}>
          <a href="/#klub">{c.nav.club}</a>
          <Link href="/jizdy">{c.nav.rides}</Link>
          <Link href="/e46-garage">{c.nav.e46}</Link>
          <a href="/#faq">{c.nav.faq}</a>
          <Link href="/prihlaska" className="btn btn--sm">
            {c.nav.apply}
          </Link>
        </nav>
      </div>
    </header>
  );
}
