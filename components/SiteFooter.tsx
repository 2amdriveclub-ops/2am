import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="shell footer__inner">
        <div>
          <p className="footer__mark display">2AM</p>
          <p className="footer__tag">{site.tagline}</p>
        </div>
        <div className="footer__cols">
          <div>
            <h2 className="footer__head">Klub</h2>
            <Link href="/prihlaska">Přihláška</Link>
            <Link href="/jizdy">Jízdy</Link>
            <a href="/#klub">Co členství dává</a>
            <a href="/#faq">Otázky</a>
          </div>
          <div>
            <h2 className="footer__head">Kontakt</h2>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={site.instagram} rel="noreferrer noopener" target="_blank">
              Instagram
            </a>
            <a href={site.appStoreUrl} rel="noreferrer noopener" target="_blank">
              Torqly v App Store
            </a>
          </div>
        </div>
      </div>
      <div className="shell footer__base">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>{site.country}</span>
      </div>
    </footer>
  );
}
