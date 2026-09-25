import type { Metadata } from "next";
import Link from "next/link";
import { appStoreUrl, e46Downloads, getContent } from "@/lib/content";
import { getLocale } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const c = getContent(await getLocale());
  return {
    title: `${c.e46.name} — ${c.e46.claim}`,
    description: c.e46.lede,
  };
}

export default async function E46Page() {
  const locale = await getLocale();
  const c = getContent(locale);
  const hasDownloads = e46Downloads.length > 0;

  return (
    <>
      <section className="section section--flush">
        <div className="shell e46-hero">
          <p className="eyebrow eyebrow--cyan">{c.e46.by} · {locale === "cs" ? "zdarma" : "free"}</p>
          <h1 className="e46-hero__title display">{c.e46.name}</h1>
          <p className="lede">{c.e46.lede}</p>

          <div className="e46-hero__actions">
            {hasDownloads ? (
              e46Downloads.map((d) => (
                <a key={d.href} href={d.href} className="btn btn--cyan" rel="noreferrer noopener" target="_blank">
                  {d.label}
                </a>
              ))
            ) : (
              <p className="e46-hero__soon">
                {c.e46.soonPrefix} <Link href="/prihlaska">{c.e46.soonLink}</Link> {c.e46.soonSuffix}
              </p>
            )}
          </div>
          <p className="e46-hero__price">{c.e46.price}</p>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <p className="eyebrow eyebrow--cyan">{c.e46.featuresHeading.eyebrow}</p>
          <h2 className="section__title display">{c.e46.featuresHeading.title}</h2>
          <ul className="app-strip__list app-strip__list--cyan e46-features">
            {c.e46.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="shell app-strip">
          <div>
            <p className="eyebrow">{c.e46.otherCar.eyebrow}</p>
            <h2 className="section__title display">
              {c.e46.otherCar.titleLines[0]}
              <br />
              {c.e46.otherCar.titleLines[1]}
            </h2>
            <p>
              {c.e46.name} {c.e46.otherCar.body}
            </p>
            <a href={appStoreUrl} className="btn btn--ghost" rel="noreferrer noopener" target="_blank">
              {c.e46.otherCar.cta}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
