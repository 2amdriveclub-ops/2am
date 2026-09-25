"use client";

import { useState } from "react";
import type { Content } from "@/lib/content";
import type { Locale } from "@/lib/locale";

type Errors = Record<string, string>;
type ApplyContent = Content["apply"];

function fields(t: ApplyContent) {
  return [
    { name: "name", label: t.fields.name.label, type: "text", required: true, autoComplete: "name" },
    { name: "email", label: t.fields.email.label, type: "email", required: true, autoComplete: "email" },
    { name: "phone", label: t.fields.phone.label, type: "tel", required: false, autoComplete: "tel", hint: t.fields.phone.hint },
    { name: "city", label: t.fields.city.label, type: "text", required: false, autoComplete: "address-level2" },
    { name: "car", label: t.fields.car.label, type: "text", required: true, hint: t.fields.car.hint },
    { name: "instagram", label: t.fields.instagram.label, type: "text", required: false, hint: t.fields.instagram.hint },
  ] as const;
}

export function ApplicationForm({ locale, content: t }: { locale: Locale; content: ApplyContent }) {
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
        <h2 className="display">{t.done.title}</h2>
        <p>{t.done.body}</p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      {fields(t).map((field) => (
        <p className="field" key={field.name}>
          <label htmlFor={field.name}>
            {field.label}
            {!field.required && <span className="field__opt"> — {t.fields.optional}</span>}
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
        <label htmlFor="motivation">{t.fields.motivation.label}</label>
        <textarea
          id="motivation"
          name="motivation"
          rows={5}
          required
          aria-invalid={Boolean(errors.motivation)}
          aria-describedby={errors.motivation ? "motivation-err" : undefined}
        />
        <span className="field__hint">{t.fields.motivation.hint}</span>
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
        {t.legal} <a href="mailto:2amdriveclub@gmail.com">{locale === "cs" ? "napiš nám" : "email us"}</a>.
      </p>

      {message && (
        <p className="form__error" role="alert">
          {message}
        </p>
      )}

      <button className="btn" type="submit" disabled={state === "sending"}>
        {state === "sending" ? t.sending : t.submit}
      </button>
    </form>
  );
}
