import { cookies, headers } from "next/headers";

export type Locale = "cs" | "en";

export const LOCALE_COOKIE = "lang";

export function isLocale(value: unknown): value is Locale {
  return value === "cs" || value === "en";
}

/**
 * Výchozí jazyk určuje doména (.cz = čeština, cokoli jiného = angličtina).
 * Přepínač CZ/EN v hlavičce uloží volbu do cookie a ta má přednost.
 */
export async function getLocale(): Promise<Locale> {
  const chosen = (await cookies()).get(LOCALE_COOKIE)?.value;
  if (isLocale(chosen)) return chosen;

  const host = (await headers()).get("host") ?? "";
  return host.endsWith(".cz") ? "cs" : "en";
}
