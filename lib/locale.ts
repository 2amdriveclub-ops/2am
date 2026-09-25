import { headers } from "next/headers";

export type Locale = "cs" | "en";

/**
 * Jazyk se řídí doménou, ne cestou v URL — .cz doména = čeština, cokoli
 * jiného (.com, i preview *.vercel.app) = angličtina. Žádný přepínač,
 * žádné /en v adrese. Jednoduché pravidlo, ať ho nemusí nikdo spravovat.
 */
export async function getLocale(): Promise<Locale> {
  const host = (await headers()).get("host") ?? "";
  return host.endsWith(".cz") ? "cs" : "en";
}
