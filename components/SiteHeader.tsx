import Link from "next/link";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="masthead">
      <a className="skip" href="#obsah">
        Přeskočit na obsah
      </a>
      <div className="shell masthead__inner">
        <Link href="/" className="wordmark" aria-label={`${site.name} — domů`}>
          <span className="wordmark__mark">2AM</span>
          <span className="wordmark__rest">Drive Club</span>
        </Link>
        <nav className="masthead__nav" aria-label="Hlavní">
          <a href="/#klub">Klub</a>
          <Link href="/jizdy">Jízdy</Link>
          <Link href="/e46-garage">E46 Garage</Link>
          <a href="/#faq">Otázky</a>
          <Link href="/prihlaska" className="btn btn--sm">
            Přihláška
          </Link>
        </nav>
      </div>
    </header>
  );
}
