import Link from "next/link";
import { appStoreUrl, getContent, nextRide } from "@/lib/content";
import { getLocale } from "@/lib/locale";

export default async function HomePage() {
  const locale = await getLocale();
  const c = getContent(locale);
  const ride = nextRide?.[locale] ?? null;

  return (
    <>
      {/* --- hero ------------------------------------------------------- */}
      <section className="hero">
        <div className="shell hero__inner">
          <p className="eyebrow">
            {c.site.country} · {c.hero.eyebrow}
          </p>
          <h1 className="hero__title display">
            <span>{c.hero.titleLines[0]}</span>
            <span>{c.hero.titleLines[1]}</span>
            <span className="hero__title--accent">{c.hero.titleAccent}</span>
          </h1>
          <p className="lede hero__lede">{c.hero.lede}</p>
          <div className="hero__actions">
            <Link href="/prihlaska" className="btn">
              {c.hero.ctaApply}
            </Link>
            <a href="#klub" className="btn btn--ghost">
              {c.hero.ctaAbout}
            </a>
          </div>
        </div>
        <div className="hero__ticker" aria-hidden="true">
          <div className="hero__ticker-track">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i}>
                2AM DRIVE CLUB · {c.hero.ticker} · {c.site.country.toUpperCase()} ·
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* --- nejbližší jízda --------------------------------------------- */}
      {ride && (
        <section className="section section--flush">
          <div className="shell">
            <Link href="/jizdy" className="ride-strip">
              <span className="ride-strip__label">{c.rideStrip.label}</span>
              <span className="ride-strip__date display">
                {ride.dateLabel} · {ride.timeLabel} · {ride.region}
              </span>
              <span className="ride-strip__arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </section>
      )}

      {/* --- manifest --------------------------------------------------- */}
      <section className="section" id="manifest">
        <div className="shell manifest">
          <p className="eyebrow">{c.manifest.eyebrow}</p>
          <div className="manifest__body">
            <p className="manifest__lead">{c.manifest.lead}</p>
            <p>{c.manifest.p1}</p>
            <p>{c.manifest.p2}</p>
          </div>
        </div>
      </section>

      {/* --- pilíře ----------------------------------------------------- */}
      <section className="section" id="klub">
        <div className="shell">
          <p className="eyebrow">{c.pillarsHeading.eyebrow}</p>
          <h2 className="section__title display">{c.pillarsHeading.title}</h2>
          <ul className="pillars">
            {c.pillars.map((p) => (
              <li key={p.index} className="pillar">
                <span className="pillar__index display">{p.index}</span>
                <h3 className="pillar__title display">{p.title}</h3>
                <p className="pillar__body">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* --- jak se dostat dovnitř -------------------------------------- */}
      <section className="section" id="jak">
        <div className="shell">
          <p className="eyebrow">{c.stepsHeading.eyebrow}</p>
          <h2 className="section__title display">{c.stepsHeading.title}</h2>
          <ol className="steps">
            {c.steps.map((s) => (
              <li key={s.index} className="step">
                <span className="step__index display">{s.index}</span>
                <div>
                  <h3 className="step__title display">{s.title}</h3>
                  <p className="step__body">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link href="/prihlaska" className="btn">
            {c.hero.ctaApply}
          </Link>
        </div>
      </section>

      {/* --- torqly ----------------------------------------------------- */}
      <section className="section" id="aplikace">
        <div className="shell app-strip">
          <div>
            <p className="eyebrow eyebrow--cyan">{c.torqly.eyebrow}</p>
            <h2 className="section__title display">{c.torqly.title}</h2>
            <p>{c.torqly.body}</p>
            <a href={appStoreUrl} className="btn btn--ghost btn--cyan" rel="noreferrer noopener" target="_blank">
              {c.torqly.cta}
            </a>
          </div>
          <ul className="app-strip__list app-strip__list--cyan">
            {c.torqly.list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* --- e46 garage ------------------------------------------------- */}
      <section className="section" id="e46">
        <div className="shell e46-teaser">
          <div>
            <p className="eyebrow eyebrow--cyan">{c.e46Teaser.eyebrow}</p>
            <h2 className="section__title display">{c.e46.name}</h2>
            <p className="lede">{c.e46.lede}</p>
            <Link href="/e46-garage" className="btn btn--cyan">
              {c.e46Teaser.cta}
            </Link>
          </div>
          <p className="e46-teaser__stamp e46-teaser__stamp--cyan display" aria-hidden="true">
            E46
            <span>{c.e46.by}</span>
          </p>
        </div>
      </section>

      {/* --- galerie ---------------------------------------------------- */}
      <section className="section" id="galerie">
        <div className="shell">
          <p className="eyebrow">{c.gallery.eyebrow}</p>
          <h2 className="section__title display">{c.gallery.title}</h2>
          <p className="lede">{c.gallery.lede}</p>
          <div className="gallery" role="list">
            {Array.from({ length: 6 }).map((_, i) => (
              <figure className="gallery__item" role="listitem" key={i}>
                {/* Nahraď <img src="/galerie/01.jpg" alt="..." />, jakmile budou fotky. */}
                <span className="gallery__slot display">{String(i + 1).padStart(2, "0")}</span>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* --- faq -------------------------------------------------------- */}
      <section className="section" id="faq">
        <div className="shell">
          <p className="eyebrow">{c.faqHeading.eyebrow}</p>
          <h2 className="section__title display">{c.faqHeading.title}</h2>
          <div className="faq">
            {c.faq.map((item) => (
              <details className="faq__item" key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* --- závěrečné CTA ---------------------------------------------- */}
      <section className="section section--cta">
        <div className="shell cta">
          <h2 className="cta__title display">
            {c.finalCta.titlePrefix}
            <br />
            {ride ? ride.dateLabel : c.finalCta.titleFallback}
          </h2>
          <p className="lede">{c.finalCta.lede}</p>
          <div className="hero__actions">
            <Link href="/prihlaska" className="btn">
              {c.finalCta.apply}
            </Link>
            {ride && (
              <Link href="/jizdy" className="btn btn--ghost">
                {c.finalCta.howRidesWork}
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
