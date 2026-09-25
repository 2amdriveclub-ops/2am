import Link from "next/link";
import { appStoreUrl, getContent } from "@/lib/content";
import type { Locale } from "@/lib/locale";

export function SiteFooter({ locale }: { locale: Locale }) {
  const c = getContent(locale);

  return (
    <footer className="footer">
      <div className="shell footer__inner">
        <div>
          <p className="footer__mark display">2AM</p>
          <p className="footer__tag">{c.site.tagline}</p>
        </div>
        <div className="footer__cols">
          <div>
            <h2 className="footer__head">{c.footer.clubHeading}</h2>
            <Link href="/prihlaska">{c.footer.apply}</Link>
            <Link href="/jizdy">{c.footer.rides}</Link>
            <a href="/#klub">{c.footer.whatMembership}</a>
            <a href="/#faq">{c.footer.faq}</a>
          </div>
          <div>
            <h2 className="footer__head">{c.footer.contactHeading}</h2>
            <a href={`mailto:${c.site.email}`}>{c.site.email}</a>
            <a href={c.site.instagram} rel="noreferrer noopener" target="_blank">
              {c.footer.instagram}
            </a>
            <a href={appStoreUrl} rel="noreferrer noopener" target="_blank">
              {c.footer.torqly}
            </a>
          </div>
        </div>
      </div>
      <div className="shell footer__base">
        <span>© {new Date().getFullYear()} {c.site.name}</span>
        <span>{c.site.country}</span>
      </div>
    </footer>
  );
}
