import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";

type Payload = Record<string, unknown>;

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function text(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function validate(body: Payload) {
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
  if (data.name.length < 2) errors.name = "Napiš jméno.";
  if (!EMAIL.test(data.email)) errors.email = "Tenhle e-mail nevypadá platně.";
  if (data.car.length < 2) errors.car = "Napiš, čím jezdíš.";
  if (data.motivation.length < 10)
    errors.motivation = "Pár vět stačí, ale něco tam být musí.";

  return { data, errors };
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Neplatný požadavek." }, { status: 400 });
  }

  // Honeypot: skutečný člověk tohle pole nevidí, takže ho nevyplní.
  if (text(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const { data, errors } = validate(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    console.error("Supabase není nakonfigurovaný — přihláška se zahodila.", {
      email: data.email,
    });
    return NextResponse.json(
      {
        error:
          "Příjem přihlášek zatím není napojený. Napiš nám prosím na e-mail, ozveme se stejně.",
      },
      { status: 503 },
    );
  }

  const { error } = await supabase.from("applications").insert(data);

  if (error) {
    // 23505 = unique violation, tzn. tenhle e-mail už přihlášku poslal.
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "Přihlášku z tohohle e-mailu už máme. Ozveme se." },
        { status: 409 },
      );
    }
    console.error("Zápis přihlášky selhal:", error);
    return NextResponse.json(
      { error: "Něco se rozbilo na naší straně. Zkus to prosím znovu." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
