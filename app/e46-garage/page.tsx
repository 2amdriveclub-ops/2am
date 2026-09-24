import type { Metadata } from "next";
import Link from "next/link";
import { e46, site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${e46.name} — appka pro BMW E46 zdarma`,
  description: e46.lede,
};

export default function E46Page() {
  const hasDownloads = e46.downloads.length > 0;

  return (
    <>
      <section className="section section--flush">
        <div className="shell e46-hero">
          <p className="eyebrow">{e46.by} · zdarma</p>
          <h1 className="e46-hero__title display">{e46.name}</h1>
          <p className="lede">{e46.lede}</p>

          <div className="e46-hero__actions">
            {hasDownloads ? (
              e46.downloads.map((d) => (
                <a
                  key={d.href}
                  href={d.href}
                  className="btn"
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  {d.label}
                </a>
              ))
            ) : (
              <p className="e46-hero__soon">
                Odkaz ke stažení sem doplníme, jakmile bude build venku.{" "}
                <Link href="/prihlaska">Přihlas se do klubu</Link> a dozvíš se to
                první.
              </p>
            )}
          </div>
          <p className="e46-hero__price">{e46.price}</p>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <p className="eyebrow">Co to umí</p>
          <h2 className="section__title display">Jedno auto, pořádně</h2>
          <ul className="app-strip__list e46-features">
            {e46.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="shell app-strip">
          <div>
            <p className="eyebrow">A když máš i jiné auto</p>
            <h2 className="section__title display">
              Torqly umí
              <br />
              celou garáž
            </h2>
            <p>
              {e46.name} je zdarma a dělá jednu věc pro jedno auto. Když chceš
              deník jízd, garáž podle VIN a klubové srazy pro cokoli, co máš na
              dvoře, je na to Torqly.
            </p>
            <a
              href={site.appStoreUrl}
              className="btn btn--ghost"
              rel="noreferrer noopener"
              target="_blank"
            >
              Torqly v App Store
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
