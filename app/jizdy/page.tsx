import type { Metadata } from "next";
import Link from "next/link";
import { appStoreUrl, getContent, nextRide } from "@/lib/content";
import { getLocale } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const c = getContent(await getLocale());
  return {
    title: c.nav.rides,
    description: c.rides.lede,
  };
}

export default async function JizdyPage() {
  const locale = await getLocale();
  const c = getContent(locale);
  const ride = nextRide?.[locale] ?? null;

  return (
    <>
      <section className="section section--flush">
        <div className="shell rides-hero">
          <p className="eyebrow">{c.rides.eyebrow}</p>
          <h1 className="rides-hero__title display">
            {c.rides.titleLines[0]}
            <br />
            {c.rides.titleLines[1]}
          </h1>
          <p className="lede">{c.rides.lede}</p>
        </div>
      </section>

      {ride && (
        <section className="section section--flush">
          <div className="shell">
            <div className="ride-card">
              <p className="eyebrow">{c.rides.card.eyebrow}</p>
              <p className="ride-card__date display">
                {ride.dateLabel} · {ride.timeLabel}
              </p>
              <p className="ride-card__region">{ride.region}</p>
              <p className="ride-card__note">{c.rides.card.note}</p>
              <div className="ride-card__actions">
                <Link href="/prihlaska" className="btn">
                  {c.rides.card.apply}
                </Link>
                <a href={appStoreUrl} className="btn btn--ghost" rel="noreferrer noopener" target="_blank">
                  {c.rides.card.getTorqly}
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section" id="model">
        <div className="shell">
          <p className="eyebrow">{c.rides.modelHeading.eyebrow}</p>
          <h2 className="section__title display">{c.rides.modelHeading.title}</h2>
          <ul className="pillars rides-layers">
            {c.rides.layers.map((l) => (
              <li key={l.index} className="pillar">
                <span className="pillar__index display">{l.index}</span>
                <h3 className="pillar__title display">{l.title}</h3>
                <p className="rides-layers__price">{l.price}</p>
                <p className="pillar__body">{l.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--cta">
        <div className="shell cta">
          <h2 className="cta__title display">
            {c.rides.finalCta.titleLines[0]}
            <br />
            {c.rides.finalCta.titleLines[1]}
          </h2>
          <p className="lede">{c.rides.finalCta.lede}</p>
          <Link href="/prihlaska" className="btn">
            {c.rides.finalCta.apply}
          </Link>
        </div>
      </section>
    </>
  );
}
