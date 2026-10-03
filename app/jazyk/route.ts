import { NextResponse } from "next/server";
import { LOCALE_COOKIE, isLocale } from "@/lib/locale";

export function GET(request: Request) {
  const url = new URL(request.url);
  const lang = url.searchParams.get("l");

  // Zpátky jen na stránku tohoto webu, nikdy na cizí adresu.
  const back = new URL(url.searchParams.get("next") ?? "/", url.origin);
  const target = back.origin === url.origin ? back : new URL("/", url.origin);

  const response = NextResponse.redirect(target, 303);
  if (isLocale(lang)) {
    response.cookies.set(LOCALE_COOKIE, lang, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }
  return response;
}
