import type { Metadata } from "next";
import { ApplicationForm } from "@/components/ApplicationForm";
import { getContent } from "@/lib/content";
import { getLocale } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const c = getContent(await getLocale());
  return c.apply.meta;
}

export default async function ApplicationPage() {
  const locale = await getLocale();
  const c = getContent(locale);

  return (
    <section className="section section--flush">
      <div className="shell apply">
        <div className="apply__intro">
          <p className="eyebrow">{c.apply.eyebrow}</p>
          <h1 className="apply__title display">
            {c.apply.titleLines[0]}
            <br />
            {c.apply.titleLines[1]}
          </h1>
          <p className="lede">{c.apply.lede}</p>
          <ol className="apply__steps">
            {c.steps.map((s) => (
              <li key={s.index}>
                <span className="display">{s.index}</span> {s.title}
              </li>
            ))}
          </ol>
        </div>
        <div className="apply__form">
          <ApplicationForm locale={locale} content={c.apply} />
        </div>
      </div>
    </section>
  );
}
