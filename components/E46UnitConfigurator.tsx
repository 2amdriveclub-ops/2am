"use client";

import { useState } from "react";
import type { E46Content } from "@/lib/e46";
import type { Locale } from "@/lib/locale";

type UnitContent = E46Content["unit"];
type Pricing = { unitCzk: number | null; depositCzk: number | null; buyCzk: number | null; returnDays: number | null };
type Errors = Record<string, string>;

function czk(n: number): string {
  return `${n.toLocaleString("cs-CZ")} Kč`;
}

export function E46UnitConfigurator({
  locale,
  content: t,
  pricing,
}: {
  locale: Locale;
  content: UnitContent;
  pricing: Pricing;
}) {
  const [mode, setMode] = useState(t.modes[0].value);
  const [engine, setEngine] = useState("");
  const [gearbox, setGearbox] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState<string | null>(null);

  const isExchange = mode === "exchange";
  const steps = isExchange ? t.exchangeSteps : t.buySteps;
  const engineLabel = t.engines.find((e) => e.value === engine)?.label;
  const gearboxLabel = t.gearboxes.find((g) => g.value === gearbox)?.label;
  const chosen = t.options.filter((o) => options.includes(o.value));

  const price = isExchange ? pricing.unitCzk : pricing.buyCzk;

  function toggleOption(value: string) {
    setOptions((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setErrors({});
    setMessage(null);

    const form = new FormData(event.currentTarget);
    const payload = {
      mode,
      engine,
      gearbox,
      options,
      vin: form.get("unit-vin"),
      note: form.get("unit-note"),
      name: form.get("unit-name"),
      email: form.get("unit-email"),
      phone: form.get("unit-phone"),
      ews_ack: form.get("unit-ack") === "on",
      website: form.get("unit-website"),
    };

    try {
      const response = await fetch("/api/e46-poptavka", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Locale": locale },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (response.ok) {
        setState("done");
        return;
      }

      setState("idle");
      if (result.errors) setErrors(result.errors as Errors);
      setMessage(result.error ?? t.genericError);
    } catch {
      setState("idle");
      setMessage(t.networkError);
    }
  }

  if (state === "done") {
    return (
      <div className="form__done" role="status">
        <h3 className="display">{t.done.title}</h3>
        <p>{t.done.body}</p>
      </div>
    );
  }

  return (
    <form className="unit" onSubmit={onSubmit} noValidate>
      <div className="unit__form">
        <fieldset className="unit__group">
          <legend className="unit__legend">{t.modeHeading}</legend>
          <div className="unit__modes">
            {t.modes.map((m) => (
              <label key={m.value} className={`choice choice--mode${mode === m.value ? " is-on" : ""}`}>
                <input
                  type="radio"
                  name="unit-mode"
                  value={m.value}
                  checked={mode === m.value}
                  onChange={() => setMode(m.value)}
                />
                <span>
                  <span className="choice__label">{m.label}</span>
                  <span className="choice__desc">{m.desc}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="unit__steps">
          <p className="unit__legend">{t.stepsHeading}</p>
          <ol>
            {steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </div>

        <fieldset className="unit__group">
          <legend className="unit__legend">{t.carHeading}</legend>

          <p className="unit__label" id="unit-engine-label">{t.engineLabel}</p>
          <div className="segmented" role="radiogroup" aria-labelledby="unit-engine-label">
            {t.engines.map((e) => (
              <label key={e.value} className={`seg${engine === e.value ? " is-on" : ""}`}>
                <input
                  type="radio"
                  name="unit-engine"
                  value={e.value}
                  checked={engine === e.value}
                  onChange={() => setEngine(e.value)}
                />
                {e.label}
              </label>
            ))}
          </div>
          {errors.engine && <span className="field__err">{errors.engine}</span>}

          <p className="unit__label" id="unit-gearbox-label">{t.gearboxLabel}</p>
          <div className="segmented" role="radiogroup" aria-labelledby="unit-gearbox-label">
            {t.gearboxes.map((g) => (
              <label key={g.value} className={`seg${gearbox === g.value ? " is-on" : ""}`}>
                <input
                  type="radio"
                  name="unit-gearbox"
                  value={g.value}
                  checked={gearbox === g.value}
                  onChange={() => setGearbox(g.value)}
                />
                {g.label}
              </label>
            ))}
          </div>
          {errors.gearbox && <span className="field__err">{errors.gearbox}</span>}

          <p className="field unit__vin">
            <label htmlFor="unit-vin">
              {t.vinLabel}
              <span className="field__opt"> — {t.optional}</span>
            </label>
            <input
              id="unit-vin"
              name="unit-vin"
              type="text"
              maxLength={7}
              autoCapitalize="characters"
              autoComplete="off"
              aria-invalid={Boolean(errors.vin)}
            />
            <span className="field__hint">{t.vinHint}</span>
            {errors.vin && <span className="field__err">{errors.vin}</span>}
          </p>
        </fieldset>

        <fieldset className="unit__group">
          <legend className="unit__legend">{t.optionsHeading}</legend>
          <p className="unit__hint">{t.optionsHint}</p>
          <div className="unit__options">
            {t.options.map((o) => (
              <label key={o.value} className={`choice${options.includes(o.value) ? " is-on" : ""}`}>
                <input
                  type="checkbox"
                  value={o.value}
                  checked={options.includes(o.value)}
                  onChange={() => toggleOption(o.value)}
                />
                <span>
                  <span className="choice__label">{o.label}</span>
                  {o.hint && <span className="choice__desc">{o.hint}</span>}
                </span>
              </label>
            ))}
          </div>

          <p className="field">
            <label htmlFor="unit-note">
              {t.noteLabel}
              <span className="field__opt"> — {t.optional}</span>
            </label>
            <textarea id="unit-note" name="unit-note" rows={4} maxLength={2000} aria-invalid={Boolean(errors.note)} />
            <span className="field__hint">{t.noteHint}</span>
            {errors.note && <span className="field__err">{errors.note}</span>}
          </p>
        </fieldset>

        <fieldset className="unit__group">
          <legend className="unit__legend">{t.contactHeading}</legend>
          <p className="field">
            <label htmlFor="unit-name">{t.nameLabel}</label>
            <input id="unit-name" name="unit-name" type="text" autoComplete="name" aria-invalid={Boolean(errors.name)} />
            {errors.name && <span className="field__err">{errors.name}</span>}
          </p>
          <p className="field">
            <label htmlFor="unit-email">{t.emailLabel}</label>
            <input id="unit-email" name="unit-email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} />
            {errors.email && <span className="field__err">{errors.email}</span>}
          </p>
          <p className="field">
            <label htmlFor="unit-phone">
              {t.phoneLabel}
              <span className="field__opt"> — {t.optional}</span>
            </label>
            <input id="unit-phone" name="unit-phone" type="tel" autoComplete="tel" />
          </p>
        </fieldset>

        <div className="unit__ews" role="note">
          <p className="unit__ews-title">{t.ewsTitle}</p>
          <p>{t.ewsBody}</p>
          <label className="unit__ack">
            <input type="checkbox" name="unit-ack" aria-invalid={Boolean(errors.ews_ack)} />
            <span>{t.ack}</span>
          </label>
          {errors.ews_ack && <span className="field__err">{errors.ews_ack}</span>}
        </div>

        <p className="hp" aria-hidden="true">
          <label htmlFor="unit-website">Web</label>
          <input id="unit-website" name="unit-website" type="text" tabIndex={-1} autoComplete="off" />
        </p>
      </div>

      <aside className="unit__summary" aria-live="polite">
        <p className="unit__legend">{t.summaryHeading}</p>
        <p className="unit__summary-base">{t.summaryBase}</p>
        <p className="unit__summary-car">
          {engineLabel && gearboxLabel ? `${engineLabel} · ${gearboxLabel}` : t.summaryCarPending}
        </p>
        <ul className="unit__summary-list">
          {chosen.length > 0 ? chosen.map((o) => <li key={o.value}>{o.label}</li>) : <li>{t.summaryNoOptions}</li>}
        </ul>

        <dl className="unit__prices">
          <div>
            <dt>{t.priceLabel}</dt>
            <dd>{price !== null ? czk(price) : t.pricePending}</dd>
          </div>
          {isExchange && (
            <div>
              <dt>{t.depositLabel}</dt>
              <dd>{pricing.depositCzk !== null ? czk(pricing.depositCzk) : t.pricePending}</dd>
            </div>
          )}
          {isExchange && (
            <div>
              <dt>{t.returnLabel}</dt>
              <dd>{pricing.returnDays !== null ? `${pricing.returnDays} ${t.days}` : t.returnPending}</dd>
            </div>
          )}
        </dl>

        {message && (
          <p className="form__error" role="alert">
            {message}
          </p>
        )}

        <button className="btn btn--cyan unit__submit" type="submit" disabled={state === "sending"}>
          {state === "sending" ? t.sending : t.submit}
        </button>
        <p className="unit__submit-note">{t.submitNote}</p>
      </aside>
    </form>
  );
}
