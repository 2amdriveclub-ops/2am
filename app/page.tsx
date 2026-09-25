import Link from "next/link";
import { e46, faq, nextRide, pillars, site, steps } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* --- hero ------------------------------------------------------- */}
      <section className="hero">
        <div className="shell hero__inner">
          <p className="eyebrow">{site.country} · noční jízdy · vstup na přihlášku</p>
          <h1 className="hero__title display">
            <span>Jezdíme,</span>
            <span>když ostatní</span>
            <span className="hero__title--accent">spí.</span>
          </h1>
          <p className="lede hero__lede">
            Ve dvě ráno je město prázdné. Žádné fronty, žádná světla v zrcátku,
            žádné publikum. Zůstanou jen auta a lidi, kteří je mají rádi natolik,
            že kvůli nim nespí.
          </p>
          <div className="hero__actions">
            <Link href="/prihlaska" className="btn">
              Podat přihlášku
            </Link>
            <a href="#klub" className="btn btn--ghost">
              Co je to za klub
            </a>
          </div>
        </div>
        <div className="hero__ticker" aria-hidden="true">
          <div className="hero__ticker-track">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i}>
                2AM DRIVE CLUB · NIGHT RUNS · {site.country.toUpperCase()} ·
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* --- nejbližší jízda --------------------------------------------- */}
      {nextRide && (
        <section className="section section--flush">
          <div className="shell">
            <Link href="/jizdy" className="ride-strip">
              <span className="ride-strip__label">Nejbližší jízda</span>
              <span className="ride-strip__date display">
                {nextRide.dateLabel} · {nextRide.timeLabel} · {nextRide.region}
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
          <p className="eyebrow">Manifest</p>
          <div className="manifest__body">
            <p className="manifest__lead">
              Tohle není sraz na parkovišti u nákupáku. Není to soutěž o to, kdo
              má dražší auto, ani spolek, kde se dvě hodiny stojí a povídá.
            </p>
            <p>
              Je to klub lidí, pro které je jízda samotná ten důvod. Sejdeme se,
              když je silnice prázdná, ujedeme trasu, kterou někdo vymyslel,
              a ráno máme něco, co ostatní nemají — a fotky, na které se dá dívat
              i za deset let.
            </p>
            <p>
              Vstup je na přihlášku. Ne proto, že bychom dělali drahoty. Protože
              klub, kam může kdokoli, není klub.
            </p>
          </div>
        </div>
      </section>

      {/* --- pilíře ----------------------------------------------------- */}
      <section className="section" id="klub">
        <div className="shell">
          <p className="eyebrow">Co členství dává</p>
          <h2 className="section__title display">Tři věci, žádná čtvrtá</h2>
          <ul className="pillars">
            {pillars.map((p) => (
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
          <p className="eyebrow">Jak se dostat dovnitř</p>
          <h2 className="section__title display">Tři kroky, sedm dní</h2>
          <ol className="steps">
            {steps.map((s) => (
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
            Začít přihláškou
          </Link>
        </div>
      </section>

      {/* --- torqly ----------------------------------------------------- */}
      <section className="section" id="aplikace">
        <div className="shell app-strip">
          <div>
            <p className="eyebrow">Klub běží v aplikaci</p>
            <h2 className="section__title display">
              Torqly drží
              <br />
              celý život tvého auta
            </h2>
            <p>
              Termíny jízd, trasy, evidence kilometrů, garáž s technikou podle
              VIN. Klub není skupina na sociální síti, kde se za měsíc nedá nic
              dohledat — všechno má jedno místo a zůstává to tam.
            </p>
            <a
              href={site.appStoreUrl}
              className="btn btn--ghost"
              rel="noreferrer noopener"
              target="_blank"
            >
              Stáhnout Torqly
            </a>
          </div>
          <ul className="app-strip__list">
            <li>Deník jízd s mapou</li>
            <li>Garáž a technika podle VIN</li>
            <li>Termíny a sraz klubu</li>
            <li>Záznam výkonu na uzavřené trati</li>
          </ul>
        </div>
      </section>

      {/* --- e46 garage ------------------------------------------------- */}
      <section className="section" id="e46">
        <div className="shell e46-teaser">
          <div>
            <p className="eyebrow">Zdarma ke stažení</p>
            <h2 className="section__title display">{e46.name}</h2>
            <p className="lede">{e46.lede}</p>
            <Link href="/e46-garage" className="btn">
              Stáhnout zdarma
            </Link>
          </div>
          <p className="e46-teaser__stamp display" aria-hidden="true">
            E46
            <span>{e46.by}</span>
          </p>
        </div>
      </section>

      {/* --- galerie ---------------------------------------------------- */}
      <section className="section" id="galerie">
        <div className="shell">
          <p className="eyebrow">Z jízd</p>
          <h2 className="section__title display">Ráno máš fotky</h2>
          <p className="lede">
            Fotky z každé jízdy dostanou členové do týdne. Tohle je jediná část
            klubu, která je veřejná — protože funguje líp než jakýkoli text.
          </p>
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
          <p className="eyebrow">Otázky</p>
          <h2 className="section__title display">Než se zeptáš</h2>
          <div className="faq">
            {faq.map((item) => (
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
            {nextRide ? (
              <>
                Příští jízda
                <br />
                {nextRide.dateLabel}
              </>
            ) : (
              <>
                Příští jízda
                <br />
                je za pár týdnů
              </>
            )}
          </h2>
          <p className="lede">
            Skupina je malá schválně. Když se přihlásíš teď, jsi u toho od
            začátku — a začátek se zopakovat nedá.
          </p>
          <div className="hero__actions">
            <Link href="/prihlaska" className="btn">
              Podat přihlášku
            </Link>
            {nextRide && (
              <Link href="/jizdy" className="btn btn--ghost">
                Jak jízdy fungují
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
