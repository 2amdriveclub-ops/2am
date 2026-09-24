"use client";

import { useState } from "react";

type Errors = Record<string, string>;

const FIELDS = [
  { name: "name", label: "Jméno a příjmení", type: "text", required: true, autoComplete: "name" },
  { name: "email", label: "E-mail", type: "email", required: true, autoComplete: "email" },
  { name: "phone", label: "Telefon", type: "tel", required: false, autoComplete: "tel", hint: "Nepovinné. Použijeme jen k domluvě před jízdou." },
  { name: "city", label: "Odkud jezdíš", type: "text", required: false, autoComplete: "address-level2" },
  { name: "car", label: "Čím jezdíš", type: "text", required: true, hint: "Značka, model, rok. Klidně i to, co na něm máš rozdělané." },
  { name: "instagram", label: "Instagram", type: "text", required: false, hint: "Nepovinné, ale pomůže nám to." },
] as const;

export function ApplicationForm() {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setErrors({});
    setMessage(null);

    const payload = Object.fromEntries(new FormData(event.currentTarget));

    try {
      const response = await fetch("/api/prihlaska", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (response.ok) {
        setState("done");
        return;
      }

      setState("idle");
      if (result.errors) setErrors(result.errors as Errors);
      setMessage(result.error ?? "Zkontroluj prosím vyplněná pole.");
    } catch {
      setState("idle");
      setMessage("Nepodařilo se odeslat. Zkus to prosím ještě jednou.");
    }
  }

  if (state === "done") {
    return (
      <div className="form__done" role="status">
        <h2 className="display">Máme to.</h2>
        <p>
          Přihlášku jsme dostali. Projdeme ji a ozveme se do sedmi dnů — ať už to
          dopadne jakkoli. Mezitím si stáhni Torqly, ušetříš si to potom.
        </p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      {FIELDS.map((field) => (
        <p className="field" key={field.name}>
          <label htmlFor={field.name}>
            {field.label}
            {!field.required && <span className="field__opt"> — nepovinné</span>}
          </label>
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            required={field.required}
            autoComplete={"autoComplete" in field ? field.autoComplete : undefined}
            aria-invalid={Boolean(errors[field.name])}
            aria-describedby={errors[field.name] ? `${field.name}-err` : undefined}
          />
          {"hint" in field && field.hint && <span className="field__hint">{field.hint}</span>}
          {errors[field.name] && (
            <span className="field__err" id={`${field.name}-err`}>
              {errors[field.name]}
            </span>
          )}
        </p>
      ))}

      <p className="field">
        <label htmlFor="motivation">Proč chceš dovnitř</label>
        <textarea
          id="motivation"
          name="motivation"
          rows={5}
          required
          aria-invalid={Boolean(errors.motivation)}
          aria-describedby={errors.motivation ? "motivation-err" : undefined}
        />
        <span className="field__hint">
          Nemusí to být esej. Zajímá nás, co tě na tom baví.
        </span>
        {errors.motivation && (
          <span className="field__err" id="motivation-err">
            {errors.motivation}
          </span>
        )}
      </p>

      {/* Honeypot na roboty — skrytý před lidmi i před čtečkami. */}
      <p className="hp" aria-hidden="true">
        <label htmlFor="website">Web</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </p>

      <p className="form__legal">
        Odesláním nám dáváš svoje údaje k posouzení přihlášky a k domluvě jízd.
        Nikomu je nepředáváme a na požádání je smažeme —{" "}
        <a href="mailto:2amdriveclub@gmail.com">napiš nám</a>.
      </p>

      {message && (
        <p className="form__error" role="alert">
          {message}
        </p>
      )}

      <button className="btn" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Odesílám…" : "Odeslat přihlášku"}
      </button>
    </form>
  );
}
