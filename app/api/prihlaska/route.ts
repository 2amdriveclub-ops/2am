import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";

type Payload = Record<string, unknown>;

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

type Messages = {
  invalidRequest: string;
  name: string;
  email: string;
  car: string;
  motivation: string;
  notConfigured: string;
  duplicate: string;
  serverError: string;
};

const messages: Record<"cs" | "en", Messages> = {
  cs: {
    invalidRequest: "Neplatný požadavek.",
    name: "Napiš jméno.",
    email: "Tenhle e-mail nevypadá platně.",
    car: "Napiš, čím jezdíš.",
    motivation: "Pár vět stačí, ale něco tam být musí.",
    notConfigured:
      "Příjem přihlášek zatím není napojený. Napiš nám prosím na e-mail, ozveme se stejně.",
    duplicate: "Přihlášku z tohohle e-mailu už máme. Ozveme se.",
    serverError: "Něco se rozbilo na naší straně. Zkus to prosím znovu.",
  },
  en: {
    invalidRequest: "Invalid request.",
    name: "Add your name.",
    email: "That email doesn't look valid.",
    car: "Tell us what you drive.",
    motivation: "A couple of sentences is enough, but write something.",
    notConfigured: "Applications aren't connected yet. Email us directly and we'll still get back to you.",
    duplicate: "We already have an application from this email. We'll be in touch.",
    serverError: "Something broke on our end. Please try again.",
  },
};

function text(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function validate(body: Payload, m: Messages) {
  const data = {
    name: text(body.name, 120),
    email: text(body.email, 200).toLowerCase(),
    phone: text(body.phone, 40) || null,
    city: text(body.city, 120) || null,
    car: text(body.car, 200),
    instagram: text(body.instagram, 120) || null,
    motivation: text(body.motivation, 2000),
  };

  const errors: Record<string, string> = {};
  if (data.name.length < 2) errors.name = m.name;
  if (!EMAIL.test(data.email)) errors.email = m.email;
  if (data.car.length < 2) errors.car = m.car;
  if (data.motivation.length < 10) errors.motivation = m.motivation;

  return { data, errors };
}

export async function POST(request: Request) {
  const locale = request.headers.get("x-locale") === "en" ? "en" : "cs";
  const m = messages[locale];

  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: m.invalidRequest }, { status: 400 });
  }

  // Honeypot: skutečný člověk tohle pole nevidí, takže ho nevyplní.
  if (text(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const { data, errors } = validate(body, m);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    console.error("Supabase není nakonfigurovaný — přihláška se zahodila.", {
      email: data.email,
    });
    return NextResponse.json({ error: m.notConfigured }, { status: 503 });
  }

  const { error } = await supabase.from("applications").insert(data);

  if (error) {
    // 23505 = unique violation, tzn. tenhle e-mail už přihlášku poslal.
    if (error.code === "23505") {
      return NextResponse.json({ error: m.duplicate }, { status: 409 });
    }
    console.error("Zápis přihlášky selhal:", error);
    return NextResponse.json({ error: m.serverError }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
