import type { Metadata } from "next";
import { ApplicationForm } from "@/components/ApplicationForm";
import { steps } from "@/lib/site";

export const metadata: Metadata = {
  title: "Přihláška do klubu",
  description:
    "Podej přihlášku do 2AM Drive Clubu. Ozveme se do sedmi dnů, ať už to dopadne jakkoli.",
};

export default function ApplicationPage() {
  return (
    <section className="section section--flush">
      <div className="shell apply">
        <div className="apply__intro">
          <p className="eyebrow">Přihláška</p>
          <h1 className="apply__title display">
            Řekni nám,
            <br />
            čím jezdíš
          </h1>
          <p className="lede">
            Tři minuty. Nezajímá nás výkon ani cena — zajímá nás, jestli k tomu
            autu máš vztah a jestli tě baví jezdit v noci.
          </p>
          <ol className="apply__steps">
            {steps.map((s) => (
              <li key={s.index}>
                <span className="display">{s.index}</span> {s.title}
              </li>
            ))}
          </ol>
        </div>
        <div className="apply__form">
          <ApplicationForm />
        </div>
      </div>
    </section>
  );
}
