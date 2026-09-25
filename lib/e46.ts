/**
 * E46 GARAGE — desktopová appka na diagnostiku/kódování/tuning BMW E46
 * (M54, Siemens MS43). Samostatný soubor, protože je to jiný typ produktu
 * než zbytek webu (open-source nástroj, ne členský klub) a má vlastní,
 * podstatně delší obsah — právní upozornění, checklist, moduly.
 *
 * ZDROJ PRAVDY: docs/e46-garage-zadani.md (dodal Radek). Cokoli tady
 * měníš, ověř proti tomu souboru — appka sama nic z tohohle negeneruje.
 *
 * Appka je jen v češtině. Anglický překlad marketingového textu je tu
 * proto, aby web na .com doméně nebyl rozbitý, ale je to prozatímní
 * rozhodnutí, ne od Radka potvrzené — viz poznámka v `en.languageNote`.
 */

import type { Locale } from "./locale";

export type E46Content = typeof e46.cs;

export const e46 = {
  cs: {
    name: "E46 Garage",
    subtitle: "UNDERGROUND TUNING DIVISION",
    tagline: "Diagnostika, kódování a tuning BMW E46 M54 (MS43) z jednoho okna.",
    status: "BUILD 0.7 · funkční a odzkoušené na dvou reálných autech",
    ctas: { download: "Stáhnout", github: "GitHub", soon: "Brzy" },

    why: {
      eyebrow: "Proč to existuje",
      title: "Pět nástrojů, nulová zpětná vazba",
      body: "Dnes musíš kolem E46 žonglovat s INPA, NCS Expert, NCS Dummy, TunerPro a MS4x Flasherem — každý s jiným ovládáním, jinými soubory a bez vysvětlení, když něco selže. E46 Garage je spojuje do jednoho okna, v češtině, s nápovědou u každé položky. Není to náhrada EDIABAS — je to lepší UI nad nástroji, které už na disku máš.",
    },

    modulesHeading: { eyebrow: "Co to umí", title: "Sedm modulů" },
    modules: [
      { key: "garage", title: "Garáž", body: "Přehled auta — aktivní chyby, stav kódování, poslední jízda, napětí baterie, servisní položky.", screenshot: "/e46/garage.png" },
      { key: "connection", title: "Připojení", body: "Připojení k autu přes K+DCAN kabel, detekce modulů, napětí.", screenshot: "/e46/connection.png" },
      { key: "coding", title: "Coding", body: "Čtení a zápis kódování modulů (LSZ, GM5). Základní i pokročilý režim, české popisky místo německých zkratek.", screenshot: "/e46/coding.png" },
      { key: "dtc", title: "Chyby (DTC)", body: "Čtení a mazání chybové paměti napříč moduly.", screenshot: "/e46/dtc.png" },
      { key: "logger", title: "Logger", body: "Živé logování z DME — nastavitelný dashboard, budíky, graf, prohlížeč uložených jízd.", screenshot: "/e46/logger.png" },
      { key: "tuning", title: "Tuning", body: "Úpravy kalibrace MS43: omezovač otáček, charakter motoru, plynový pedál. Zápis se zálohou, kontrolou a průběhem.", screenshot: "/e46/tuning.png" },
      { key: "ai", title: "AI diagnostika", body: "Rozbor nalogovaných dat a chyb. Zatím rozpracované.", screenshot: "/e46/ai.png", wip: true },
    ],

    different: {
      eyebrow: "Čím se to liší",
      title: "Ne další nástroj navíc",
      items: [
        "České popisky a nápověda u každé položky — místo HEIMLEUCHTEN_NSW = aktiv.",
        "Referenční tovární kalibrace — appka si pamatuje, s čím auto vyjelo z fabriky, takže „stock“ pořád znamená stock.",
        "Zápis se zálohou a kontrolou — zapisují se jen změněné bajty, po zápisu ověření zpětným čtením.",
        "Ladí se charakter, ne předstih — appka záměrně nepouští na mapy předstihu a paliva. Nejde tím odpálit motor.",
      ],
    },

    requirements: {
      eyebrow: "Než stáhneš",
      title: "Co si musíš zařídit sám",
      intro: "Appka záměrně neobsahuje žádné soubory BMW ani MS4X. Bez tohohle ti nic nepojede:",
      items: [
        "EDIABAS / INPA nainstalované — odtud appka bere SGBD soubory pro komunikaci.",
        "NCS daten pro kódování.",
        "XDF a ADX definice pro MS43 — veřejně ke stažení z wiki projektu MS4X.",
        "K+DCAN kabel (FTDI, připojuje se na COM port).",
      ],
    },

    download: {
      eyebrow: "Stažení",
      title: "Zatím na GitHubu",
      body: "Zdrojový kód i buildy jdou ven pod účtem 2amdriveclub na GitHubu.",
      pendingNote: "Repozitář se teprve zveřejňuje — odkaz sem doplníme, jakmile bude venku.",
      smartscreen: "Build nemá podepsaný instalátor, takže při prvním spuštění Windows SmartScreen zobrazí varování. Je to normální u nepodepsaného softwaru, ne příznak viru — pokračuj přes „Další informace → Přesto spustit“.",
    },

    legal: {
      eyebrow: "Upozornění",
      title: "Než do toho auta píchneš",
      items: [
        "Jde o úpravu řídicí jednotky. Přehrání firmware může jednotku poškodit — děláš to na vlastní riziko, autor neručí za škody.",
        "Určeno pro použití mimo provoz na pozemních komunikacích. Úpravy kalibrace mohou znamenat ztrátu homologace a pojištění.",
        "Žádná vazba na BMW. „BMW“ a „E46“ jsou ochranné známky BMW AG — projekt s BMW ani s MS4X nemá žádné partnerství.",
        "Bez záruky. Software se šíří pod licencí GPLv3, tak jak je.",
      ],
    },

    support: {
      eyebrow: "Zdarma a open source",
      title: "Podpoř to",
      body: "Appka je zdarma, open source, licence GPLv3 (kvůli knihovně EdiabasLib). Žádný paywall, žádná registrace, žádná omezená verze. Jediná forma podpory je Buy Me a Coffee.",
      cta: "Buy Me Gas",
    },

    limitations: "Zatím jen Windows a jen MS43 (M54). AI diagnostika je rozpracovaná — nic z toho appka neslibuje jako hotové.",
  },

  en: {
    languageNote:
      "Internal note, not shown on the page: the app itself is Czech-only. This English copy is a placeholder translation of the marketing text — Radek hasn't confirmed the site should have an English E46 Garage page at all. Flag this before treating it as final.",
    name: "E46 Garage",
    subtitle: "UNDERGROUND TUNING DIVISION",
    tagline: "Diagnostics, coding and tuning for BMW E46 M54 (MS43), from one window.",
    status: "BUILD 0.7 · working, tested on two real cars",
    ctas: { download: "Download", github: "GitHub", soon: "Coming soon" },

    why: {
      eyebrow: "Why this exists",
      title: "Five tools, zero feedback",
      body: "Right now, working on an E46 means juggling INPA, NCS Expert, NCS Dummy, TunerPro and the MS4x Flasher — each with different controls, different files, and no explanation when something fails. E46 Garage brings them into one window, with help text on every item. It's not a replacement for EDIABAS — it's a better UI on top of the tools you already have installed.",
    },

    modulesHeading: { eyebrow: "What it does", title: "Seven modules" },
    modules: [
      { key: "garage", title: "Garage", body: "Car overview — active faults, coding status, last drive, battery voltage, service items.", screenshot: "/e46/garage.png" },
      { key: "connection", title: "Connection", body: "Connect to the car over a K+DCAN cable, module detection, voltage.", screenshot: "/e46/connection.png" },
      { key: "coding", title: "Coding", body: "Read and write module coding (LSZ, GM5). Basic and advanced mode, plain-language labels instead of German abbreviations.", screenshot: "/e46/coding.png" },
      { key: "dtc", title: "Faults (DTC)", body: "Read and clear fault memory across modules.", screenshot: "/e46/dtc.png" },
      { key: "logger", title: "Logger", body: "Live logging from the DME — configurable dashboard, gauges, plots, a viewer for saved drives.", screenshot: "/e46/logger.png" },
      { key: "tuning", title: "Tuning", body: "MS43 calibration edits: rev limiter, engine character, throttle pedal. Writes with a backup, verification and a progress log.", screenshot: "/e46/tuning.png" },
      { key: "ai", title: "AI diagnostics", body: "Analysis of logged data and faults. Still a work in progress.", screenshot: "/e46/ai.png", wip: true },
    ],

    different: {
      eyebrow: "What sets it apart",
      title: "Not just another tool",
      items: [
        "Plain-language labels and help text on every item — instead of HEIMLEUCHTEN_NSW = aktiv.",
        "A reference factory calibration — the app remembers what the car shipped with, so \"stock\" always means stock.",
        "Writes with a backup and verification — only changed bytes get written, then checked by reading them back.",
        "Tunes character, not timing — the app deliberately keeps you off the ignition and fuel maps. You can't blow up the engine with it.",
      ],
    },

    requirements: {
      eyebrow: "Before you download",
      title: "What you need to bring yourself",
      intro: "The app deliberately ships with no BMW or MS4X files. Without these, nothing will work:",
      items: [
        "EDIABAS / INPA installed — the app pulls its SGBD communication files from here.",
        "NCS daten for coding.",
        "XDF and ADX definitions for MS43 — publicly available from the MS4X project wiki.",
        "A K+DCAN cable (FTDI, connects over a COM port).",
      ],
    },

    download: {
      eyebrow: "Download",
      title: "On GitHub, soon",
      body: "Source code and builds are going out under the 2amdriveclub account on GitHub.",
      pendingNote: "The repository isn't public yet — we'll add the link here as soon as it is.",
      smartscreen: "The build has no signed installer, so Windows SmartScreen will warn you on first run. That's normal for unsigned software, not a sign of a virus — click \"More info → Run anyway\" to continue.",
    },

    legal: {
      eyebrow: "Heads up",
      title: "Before you touch that ECU",
      items: [
        "This modifies your engine control unit. Flashing firmware can damage it — you do this at your own risk, and the author isn't liable for any damage.",
        "Intended for off-road / non-public-road use. Calibration changes can void type approval and insurance.",
        "No affiliation with BMW. \"BMW\" and \"E46\" are trademarks of BMW AG — this project has no partnership with BMW or with MS4X.",
        "No warranty. The software is distributed under the GPLv3 license, as-is.",
      ],
    },

    support: {
      eyebrow: "Free and open source",
      title: "Support it",
      body: "The app is free, open source, licensed GPLv3 (due to the EdiabasLib dependency). No paywall, no sign-up, no crippled free tier. The only form of support is Buy Me a Coffee.",
      cta: "Buy Me Gas",
    },

    limitations: "Windows only, and MS43 (M54) only for now. AI diagnostics is a work in progress — nothing here is promised as finished.",
  },
} satisfies Record<Locale, unknown>;

/**
 * Odkazy, které Radek zatím nedodal. Dokud jsou `null`, appka na webu
 * poctivě řekne "brzy" místo mrtvého odkazu. NEEDITUJ na ostro, dokud
 * repo/GitHub Releases/Buy Me a Coffee reálně neexistují — viz zadání.
 */
export const e46Links: {
  github: string | null;
  releases: string | null;
  buyMeACoffee: string | null;
} = {
  github: null,
  releases: null,
  buyMeACoffee: null,
};

export function getE46(locale: Locale): E46Content {
  return e46[locale];
}
