"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/locale";

const LANGS: { code: Locale; label: string; name: string }[] = [
  { code: "cs", label: "CZ", name: "Čeština" },
  { code: "en", label: "EN", name: "English" },
];

export function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? "/";

  return (
    <span className="lang" aria-label={locale === "cs" ? "Jazyk" : "Language"}>
      {LANGS.map((l) => (
        <a
          key={l.code}
          href={`/jazyk?l=${l.code}&next=${encodeURIComponent(pathname)}`}
          hrefLang={l.code}
          lang={l.code}
          title={l.name}
          className={`lang__link${l.code === locale ? " is-on" : ""}`}
          aria-current={l.code === locale ? "true" : undefined}
        >
          {l.label}
        </a>
      ))}
    </span>
  );
}
