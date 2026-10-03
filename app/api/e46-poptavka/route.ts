import { NextResponse } from "next/server";
import { e46 } from "@/lib/e46";
import { getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";

type Payload = Record<string, unknown>;

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
// VIN nikdy neobsahuje I, O ani Q.
const VIN_TAIL = /^[A-HJ-NPR-Z0-9]{7}$/;

const allowed = {
  mode: e46.cs.unit.modes.map((m) => m.value),
  engine: e46.cs.unit.engines.map((e) => e.value),
  gearbox: e46.cs.unit.gearboxes.map((g) => g.value),
  option: e46.cs.unit.options.map((o) => o.value),
};

type Messages = {
  invalidRequest: string;
  mode: string;
  engine: string;
  gearbox: string;
  vin: string;
  name: string;
  email: string;
  ack: string;
  notConfigured: string;
  serverError: string;
};

const messages: Record<"cs" | "en", Messages> = {
  cs: {
    invalidRequest: "Neplatný požadavek.",
    mode: "Vyber výměnu, nebo koupi.",
    engine: "Vyber motor.",
    gearbox: "Vyber převodovku.",
    vin: "Napiš přesně posledních 7 znaků VIN, nebo pole nech prázdné.",
    name: "Napiš jméno.",
    email: "Tenhle e-mail nevypadá platně.",
    ack: "Bez potvrzení jednotku poslat nemůžeme.",
    notConfigured:
      "Příjem poptávek zatím není napojený. Napiš nám prosím na 2amdriveclub@gmail.com, ozveme se stejně.",
    serverError: "Něco se rozbilo na naší straně. Zkus to prosím znovu.",
  },
  en: {
    invalidRequest: "Invalid request.",
    mode: "Pick exchange or buy outright.",
    engine: "Pick your engine.",
    gearbox: "Pick your gearbox.",
    vin: "Enter exactly the last 7 characters of your VIN, or leave it empty.",
    name: "Add your name.",
    email: "That email doesn't look valid.",
    ack: "We can't ship the unit without this confirmation.",
    notConfigured:
      "Requests aren't connected yet. Please email us at 2amdriveclub@gmail.com and we'll still get back to you.",
    serverError: "Something broke on our end. Please try again.",
  },
};

function text(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function oneOf(value: unknown, list: string[]): string {
  return typeof value === "string" && list.includes(value) ? value : "";
}

function validate(body: Payload, m: Messages) {
  const vin = text(body.vin, 20).replace(/\s+/g, "").toUpperCase();
  const options = Array.isArray(body.options)
    ? Array.from(new Set(body.options.filter((o): o is string => typeof o === "string" && allowed.option.includes(o))))
    : [];

  const data = {
    mode: oneOf(body.mode, allowed.mode),
    engine: oneOf(body.engine, allowed.engine),
    gearbox: oneOf(body.gearbox, allowed.gearbox),
    vin_tail: vin || null,
    options,
    note: text(body.note, 2000) || null,
    name: text(body.name, 120),
    email: text(body.email, 200).toLowerCase(),
    phone: text(body.phone, 40) || null,
    ews_ack: body.ews_ack === true,
  };

  const errors: Record<string, string> = {};
  if (!data.mode) errors.mode = m.mode;
  if (!data.engine) errors.engine = m.engine;
  if (!data.gearbox) errors.gearbox = m.gearbox;
  if (data.vin_tail && !VIN_TAIL.test(data.vin_tail)) errors.vin = m.vin;
  if (data.name.length < 2) errors.name = m.name;
  if (!EMAIL.test(data.email)) errors.email = m.email;
  if (!data.ews_ack) errors.ews_ack = m.ack;

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

  if (text(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const { data, errors } = validate(body, m);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    console.error("Supabase není nakonfigurovaný — poptávka jednotky se zahodila.", { email: data.email });
    return NextResponse.json({ error: m.notConfigured }, { status: 503 });
  }

  const { error } = await supabase.from("e46_unit_requests").insert({ ...data, locale });

  if (error) {
    console.error("Zápis poptávky jednotky selhal:", error);
    return NextResponse.json({ error: m.serverError }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
