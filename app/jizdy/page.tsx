import type { Metadata } from "next";
import Link from "next/link";
import { nextRide, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Jízdy",
  description:
    "Jak fungují noční jízdy 2AM Drive Clubu — zdarma, s omezenou kapacitou, místo se dozvíš pár hodin předem v aplikaci.",
};

const layers = [
  {
    index: "01",
    title: "Jízda",
    price: "Zdarma",
    body: "Základ klubu a vždycky zdarma. Kraj se oznámí dopředu, přesný sraz padne do Torqly pár hodin před startem. Kapacita je malá schválně — tohle není akce pro masu.",
  },
  {
    index: "02",
    title: "Hero Car",
    price: "Placený slot, 2–3 auta na jízdu",
    body: "Kompletní fotoservis a krátké video o autě a majiteli, hotové do týdne. Neplatíš za to, že smíš jet — platíš za naši práci. Zájem piš na e-mail, sloty se plní dopředu.",
  },
  {
    index: "03",
    title: "Cíl",
    price: "Určuje se u každé jízdy",
    body: "Trasa vždycky někde končí — u podniku, který tou dobou nemá nikoho jiného. Kde a co tam bude, se dozvíš stejně jako trasu: v aplikaci, ne na webu.",
  },
];

export default function JizdyPage() {
  return (
    <>
      <section className="section section--flush">
        <div className="shell rides-hero">
          <p className="eyebrow">Jak fungují jízdy</p>
          <h1 className="rides-hero__title display">
            Místo se dozvíš,
            <br />
            až bude pozdě couvnout
          </h1>
          <p className="lede">
            Žádný event na Facebooku s adresou o měsíc dopředu. Kraj víš předem,
            přesný bod srazu ti padne do aplikace pár hodin před startem —
            stejně jako trasa. Kdo v klubu je, ten to zvládne. Kdo není, ten se
            to nedozví.
          </p>
        </div>
      </section>

      {nextRide && (
        <section className="section section--flush">
          <div className="shell">
            <div className="ride-card">
              <p className="eyebrow">Nejbližší jízda</p>
              <p className="ride-card__date display">
                {nextRide.dateLabel} · {nextRide.timeLabel}
              </p>
              <p className="ride-card__region">{nextRide.region}</p>
              <p className="ride-card__note">
                Přesný bod srazu se objeví v aplikaci pár hodin předem. Chceš
                tam být — přihlas se do klubu a stáhni si Torqly, ať tě
                pozvánka nemine.
              </p>
              <div className="ride-card__actions">
                <Link href="/prihlaska" className="btn">
                  Podat přihlášku
                </Link>
                <a
                  href={site.appStoreUrl}
                  className="btn btn--ghost"
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  Stáhnout Torqly
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section" id="model">
        <div className="shell">
          <p className="eyebrow">Tři vrstvy, žádná čtvrtá</p>
          <h2 className="section__title display">Zdarma jezdíš. Za práci platíš.</h2>
          <ul className="pillars rides-layers">
            {layers.map((l) => (
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
            Kraj víš,
            <br />
            bod srazu ne
          </h2>
          <p className="lede">
            Přesně tak to má být. Přihláška je první krok k tomu, aby ti
            pozvánka jednou padla do telefonu.
          </p>
          <Link href="/prihlaska" className="btn">
            Podat přihlášku
          </Link>
        </div>
      </section>
    </>
  );
}
