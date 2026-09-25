import type { Metadata } from "next";
import { getE46, e46Links } from "@/lib/e46";
import { getLocale } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const e46 = getE46(await getLocale());
  return {
    title: `${e46.name} — ${e46.subtitle}`,
    description: e46.tagline,
  };
}

export default async function E46Page() {
  const locale = await getLocale();
  const e46 = getE46(locale);

  return (
    <>
      {/* --- hero --------------------------------------------------------- */}
      <section className="section section--flush">
        <div className="shell e46-hero">
          <p className="e46-hero__subtitle">{e46.subtitle}</p>
          <h1 className="e46-hero__title display">{e46.name}</h1>
          <p className="lede">{e46.tagline}</p>

          <div className="e46-hero__actions">
            <a href="#stazeni" className="btn btn--cyan">
              {e46.ctas.download}
            </a>
            {e46Links.github ? (
              <a href={e46Links.github} className="btn btn--ghost" rel="noreferrer noopener" target="_blank">
                {e46.ctas.github}
              </a>
            ) : (
              <span className="btn btn--ghost" aria-disabled="true">
                {e46.ctas.github} · {e46.ctas.soon}
              </span>
            )}
          </div>
          <p className="e46-hero__status">{e46.status}</p>
        </div>
      </section>

      {/* --- proč ----------------------------------------------------------- */}
      <section className="section">
        <div className="shell">
          <p className="eyebrow eyebrow--cyan">{e46.why.eyebrow}</p>
          <h2 className="section__title display">{e46.why.title}</h2>
          <p className="lede">{e46.why.body}</p>
        </div>
      </section>

      {/* --- moduly --------------------------------------------------------- */}
      <section className="section" id="moduly">
        <div className="shell">
          <p className="eyebrow eyebrow--cyan">{e46.modulesHeading.eyebrow}</p>
          <h2 className="section__title display">{e46.modulesHeading.title}</h2>
          <div className="e46-modules">
            {e46.modules.map((m) => (
              <article className="e46-module" key={m.key}>
                <div className="e46-module__shot">
                  <img src={m.screenshot} alt="" loading="lazy" />
                </div>
                <div className="e46-module__body">
                  <h3 className="e46-module__title">
                    {m.title}
                    {"wip" in m && m.wip && (
                      <span className="e46-module__wip">{locale === "cs" ? "rozpracované" : "WIP"}</span>
                    )}
                  </h3>
                  <p>{m.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* --- čím se to liší -------------------------------------------------- */}
      <section className="section">
        <div className="shell">
          <p className="eyebrow eyebrow--cyan">{e46.different.eyebrow}</p>
          <h2 className="section__title display">{e46.different.title}</h2>
          <ul className="e46-list">
            {e46.different.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* --- co potřebuješ (checklist před stažením) -------------------------- */}
      <section className="section">
        <div className="shell">
          <p className="eyebrow">{e46.requirements.eyebrow}</p>
          <h2 className="section__title display">{e46.requirements.title}</h2>
          <div className="e46-checklist">
            <p className="e46-checklist__intro lede">{e46.requirements.intro}</p>
            <ul className="e46-list">
              {e46.requirements.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* --- stažení ----------------------------------------------------------- */}
      <section className="section" id="stazeni">
        <div className="shell">
          <p className="eyebrow eyebrow--cyan">{e46.download.eyebrow}</p>
          <h2 className="section__title display">{e46.download.title}</h2>
          <p className="lede e46-download__body">{e46.download.body}</p>

          {!e46Links.releases && <p className="e46-download__pending">{e46.download.pendingNote}</p>}

          <div className="e46-download__actions">
            {e46Links.releases ? (
              <a href={e46Links.releases} className="btn btn--cyan" rel="noreferrer noopener" target="_blank">
                {e46.ctas.download}
              </a>
            ) : (
              <span className="btn" aria-disabled="true">
                {e46.ctas.soon}
              </span>
            )}
          </div>

          <p className="e46-smartscreen">{e46.download.smartscreen}</p>
        </div>
      </section>

      {/* --- upozornění ---------------------------------------------------------- */}
      <section className="section">
        <div className="shell">
          <p className="eyebrow">{e46.legal.eyebrow}</p>
          <h2 className="section__title display">{e46.legal.title}</h2>
          <div className="e46-legal">
            <ul className="e46-list">
              {e46.legal.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* --- podpoř to ---------------------------------------------------------- */}
      <section className="section section--cta">
        <div className="shell cta">
          <p className="eyebrow eyebrow--cyan">{e46.support.eyebrow}</p>
          <h2 className="cta__title display">{e46.support.title}</h2>
          <p className="lede e46-support__body">{e46.support.body}</p>
          {e46Links.buyMeACoffee ? (
            <a href={e46Links.buyMeACoffee} className="btn btn--cyan" rel="noreferrer noopener" target="_blank">
              {e46.support.cta}
            </a>
          ) : (
            <span className="btn btn--ghost" aria-disabled="true">
              {e46.support.cta} · {e46.ctas.soon}
            </span>
          )}
          <p className="e46-limitations">{e46.limitations}</p>
        </div>
      </section>
    </>
  );
}
