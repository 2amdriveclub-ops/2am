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
 *
 * SCREENSHOT_BASE: dočasně ukazuje na raw.githubusercontent.com místo
 * na /public/e46 — Vercel↔GitHub propojení na tomhle účtu je rozbité
 * (git_info_fail při gitSource deployi), takže Vercel nemůže natáhnout
 * binární soubory z repa sám a poslat je přes chat by stálo statisíce
 * tokenů. Až Radek propojení opraví (Vercel dashboard → Settings →
 * Git → reconnect), přepni zpátky na "/e46/<soubor>.jpg" a smaž tuhle
 * poznámku i konstantu níž.
 */

import type { Locale } from "./locale";

const SCREENSHOT_BASE =
  "https://raw.githubusercontent.com/2amdriveclub-ops/2am/014053b667f72006f7d13c9e66a6612fe3519fce/public/e46";

export type E46Content = typeof e46.cs;

export const e46 = {
  cs: {
    name: "E46 Garage",
    subtitle: "UNDERGROUND TUNING DIVISION",
    tagline: "Diagnostika, kódování a tuning BMW E46 M54 (MS43) z jednoho okna.",
    status: "BUILD 0.7 · funkční a odzkoušené na dvou reálných autech",
    ctas: { download: "Stáhnout", github: "GitHub", soon: "Brzy", unit: "Hotová jednotka" },

    why: {
      eyebrow: "Proč to existuje",
      title: "Pět nástrojů, nulová zpětná vazba",
      body: "Dnes musíš kolem E46 žonglovat s INPA, NCS Expert, NCS Dummy, TunerPro a MS4x Flasherem — každý s jiným ovládáním, jinými soubory a bez vysvětlení, když něco selže. E46 Garage je spojuje do jednoho okna, v češtině, s nápovědou u každé položky. Není to náhrada EDIABAS — je to lepší UI nad nástroji, které už na disku máš.",
    },

    modulesHeading: { eyebrow: "Co to umí", title: "Sedm modulů" },
    modules: [
      { key: "garage", title: "Garáž", body: "Přehled auta — aktivní chyby, stav kódování, poslední jízda, napětí baterie, servisní položky.", screenshot: `${SCREENSHOT_BASE}/garage.jpg` },
      { key: "connection", title: "Připojení", body: "Připojení k autu přes K+DCAN kabel, detekce modulů, napětí.", screenshot: `${SCREENSHOT_BASE}/connection.jpg` },
      { key: "coding", title: "Coding", body: "Čtení a zápis kódování modulů (LSZ, GM5). Základní i pokročilý režim, české popisky místo německých zkratek.", screenshot: `${SCREENSHOT_BASE}/coding.jpg` },
      { key: "dtc", title: "Chyby (DTC)", body: "Čtení a mazání chybové paměti napříč moduly.", screenshot: `${SCREENSHOT_BASE}/dtc.jpg` },
      { key: "logger", title: "Logger", body: "Živé logování z DME — nastavitelný dashboard, budíky, graf, prohlížeč uložených jízd.", screenshot: `${SCREENSHOT_BASE}/logger.jpg` },
      { key: "tuning", title: "Tuning", body: "Úpravy kalibrace MS43: omezovač otáček, charakter motoru, plynový pedál. Zápis se zálohou, kontrolou a průběhem.", screenshot: `${SCREENSHOT_BASE}/tuning.jpg` },
      { key: "ai", title: "AI diagnostika", body: "Rozbor nalogovaných dat a chyb. Zatím rozpracované.", screenshot: `${SCREENSHOT_BASE}/ai.jpg`, wip: true },
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
      unitHint: "Nechceš nic z toho řešit?",
      unitHintLink: "Pošleme ti hotovou jednotku",
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

    unit: {
      eyebrow: "Hotová jednotka",
      title: "Nechceš flashovat sám?",
      lead: "Pošleme ti řídicí jednotku MS43 s nahraným MS43X a nastavením, které si tady vybereš. Přepojíš ji místo původní a jedeš. Kabel, EDIABAS ani software k tomu nepotřebuješ. Appka zůstává zdarma ke stažení pro každého, kdo si to chce udělat sám.",
      modeHeading: "Jak ji chceš",
      modes: [
        { value: "exchange", label: "Výměna se zálohou", desc: "Zaplatíš cenu a vratnou zálohu. Jednotku pošleme hned, ty nám pak pošleš původní. Když dorazí funkční, zálohu vrátíme." },
        { value: "buy", label: "Koupě", desc: "Jednotka je tvoje a původní si necháš. Bez zálohy a bez posílání zpátky." },
      ],
      stepsHeading: "Jak to proběhne",
      exchangeSteps: [
        "Vybereš nastavení a pošleš poptávku.",
        "Pošleme ti nabídku, zaplatíš cenu a vratnou zálohu.",
        "Pošleme ti hotovou jednotku s MS43X.",
        "Přepojíš ji a původní jednotku nám pošleš zpátky.",
        "Když původní dorazí funkční, vrátíme ti zálohu.",
      ],
      buySteps: [
        "Vybereš nastavení a pošleš poptávku.",
        "Pošleme ti nabídku a zaplatíš.",
        "Pošleme ti hotovou jednotku, přepojíš ji a jedeš.",
      ],
      carHeading: "Tvoje auto",
      engineLabel: "Motor",
      engines: [
        { value: "M54B22", label: "M54B22 · 320i" },
        { value: "M54B25", label: "M54B25 · 325i" },
        { value: "M54B30", label: "M54B30 · 330i" },
        { value: "unknown", label: "Nevím, poradíte" },
      ],
      gearboxLabel: "Převodovka",
      gearboxes: [
        { value: "manual", label: "Manuál" },
        { value: "automatic", label: "Automat" },
      ],
      vinLabel: "Posledních 7 znaků VIN",
      vinHint: "Nepovinné. Pomůže nám ověřit verzi tvé jednotky.",
      optionsHeading: "Co v jednotce nastavit",
      optionsHint: "Stejné úpravy jako modul Tuning v appce. Mapy předstihu a paliva se neupravují, motor se tím odpálit nedá.",
      options: [
        { value: "rev_limiter", label: "Omezovač otáček", hint: "Do poznámky napiš, na kolik." },
        { value: "pedal_sport", label: "Plynový pedál Sport", hint: "Ostřejší odezva pedálu." },
        { value: "idle", label: "Volnoběh", hint: "" },
        { value: "disa", label: "DISA", hint: "" },
        { value: "vanos", label: "VANOS", hint: "" },
        { value: "cooling", label: "Chlazení", hint: "" },
        { value: "cruise", label: "Tempomat", hint: "" },
      ],
      noteLabel: "Co přesně chceš",
      noteHint: "Třeba omezovač na kolik otáček. Když nevíš, napiš, jak auto používáš, a nastavení ti navrhneme.",
      contactHeading: "Kontakt",
      nameLabel: "Jméno a příjmení",
      emailLabel: "E-mail",
      phoneLabel: "Telefon",
      optional: "nepovinné",
      ewsTitle: "Imobilizér je vypnutý",
      ewsBody: "V jednotce je vypnutý imobilizér (EWS), takže auto nastartuje bez párování. Auto pak ale nemá tovární ochranu proti krádeži. Ověř si u své pojišťovny, jestli to nemá vliv na pojištění.",
      ack: "Beru na vědomí, že jednotka má vypnutý imobilizér a je určená pro použití mimo veřejné pozemní komunikace.",
      summaryHeading: "Tvoje jednotka",
      summaryBase: "MS43 s MS43X",
      summaryNoOptions: "Bez úprav, čisté MS43X",
      summaryCarPending: "Vyber motor a převodovku",
      priceLabel: "Cena",
      depositLabel: "Vratná záloha",
      pricePending: "potvrdíme e-mailem",
      returnLabel: "Původní vrátíš do",
      returnPending: "lhůty z nabídky",
      days: "dnů",
      submit: "Odeslat nezávaznou poptávku",
      sending: "Odesílám…",
      submitNote: "Nic neplatíš, dokud nepotvrdíš nabídku, kterou ti pošleme e-mailem.",
      genericError: "Zkontroluj prosím vyplněná pole.",
      networkError: "Nepodařilo se odeslat. Zkus to prosím ještě jednou.",
      done: {
        title: "Poptávka je u nás.",
        body: "Ozveme se e-mailem s cenou, zálohou a termínem odeslání. Nic neplatíš, dokud nabídku nepotvrdíš.",
      },
      gpl: "MS43X je open source pod licencí GPL-3.0. Vyvíjí ho komunitní projekt MS4X, se kterým nemáme žádné partnerství. Zdrojový kód je veřejně:",
      gplLink: "MS43X na GitHubu",
    },
  },

  en: {
    languageNote:
      "Internal note, not shown on the page: the app itself is Czech-only. This English copy is a placeholder translation of the marketing text — Radek hasn't confirmed the site should have an English E46 Garage page at all. Flag this before treating it as final.",
    name: "E46 Garage",
    subtitle: "UNDERGROUND TUNING DIVISION",
    tagline: "Diagnostics, coding and tuning for BMW E46 M54 (MS43), from one window.",
    status: "BUILD 0.7 · working, tested on two real cars",
    ctas: { download: "Download", github: "GitHub", soon: "Coming soon", unit: "Ready-made unit" },

    why: {
      eyebrow: "Why this exists",
      title: "Five tools, zero feedback",
      body: "Right now, working on an E46 means juggling INPA, NCS Expert, NCS Dummy, TunerPro and the MS4x Flasher — each with different controls, different files, and no explanation when something fails. E46 Garage brings them into one window, with help text on every item. It's not a replacement for EDIABAS — it's a better UI on top of the tools you already have installed.",
    },

    modulesHeading: { eyebrow: "What it does", title: "Seven modules" },
    modules: [
      { key: "garage", title: "Garage", body: "Car overview — active faults, coding status, last drive, battery voltage, service items.", screenshot: `${SCREENSHOT_BASE}/garage.jpg` },
      { key: "connection", title: "Connection", body: "Connect to the car over a K+DCAN cable, module detection, voltage.", screenshot: `${SCREENSHOT_BASE}/connection.jpg` },
      { key: "coding", title: "Coding", body: "Read and write module coding (LSZ, GM5). Basic and advanced mode, plain-language labels instead of German abbreviations.", screenshot: `${SCREENSHOT_BASE}/coding.jpg` },
      { key: "dtc", title: "Faults (DTC)", body: "Read and clear fault memory across modules.", screenshot: `${SCREENSHOT_BASE}/dtc.jpg` },
      { key: "logger", title: "Logger", body: "Live logging from the DME — configurable dashboard, gauges, plots, a viewer for saved drives.", screenshot: `${SCREENSHOT_BASE}/logger.jpg` },
      { key: "tuning", title: "Tuning", body: "MS43 calibration edits: rev limiter, engine character, throttle pedal. Writes with a backup, verification and a progress log.", screenshot: `${SCREENSHOT_BASE}/tuning.jpg` },
      { key: "ai", title: "AI diagnostics", body: "Analysis of logged data and faults. Still a work in progress.", screenshot: `${SCREENSHOT_BASE}/ai.jpg`, wip: true },
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
      unitHint: "Don't want to deal with any of this?",
      unitHintLink: "We'll send you a ready-made unit",
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

    unit: {
      eyebrow: "Ready-made unit",
      title: "Don't want to flash it yourself?",
      lead: "We'll send you an MS43 engine control unit with MS43X and the setup you pick here. Swap it in for your original and drive. No cable, no EDIABAS, no software needed. The app stays free to download for anyone who wants to do it themselves.",
      modeHeading: "How you want it",
      modes: [
        { value: "exchange", label: "Exchange with deposit", desc: "You pay the price plus a refundable deposit. We ship the unit right away, then you send us your original. Once it arrives working, we refund the deposit." },
        { value: "buy", label: "Buy outright", desc: "The unit is yours and you keep your original. No deposit, nothing to send back." },
      ],
      stepsHeading: "How it works",
      exchangeSteps: [
        "Pick your setup and send the request.",
        "We send you a quote; you pay the price and the refundable deposit.",
        "We ship you the finished unit with MS43X.",
        "You swap it in and send your original unit back to us.",
        "Once your original arrives working, we refund the deposit.",
      ],
      buySteps: [
        "Pick your setup and send the request.",
        "We send you a quote and you pay.",
        "We ship you the finished unit; swap it in and drive.",
      ],
      carHeading: "Your car",
      engineLabel: "Engine",
      engines: [
        { value: "M54B22", label: "M54B22 · 320i" },
        { value: "M54B25", label: "M54B25 · 325i" },
        { value: "M54B30", label: "M54B30 · 330i" },
        { value: "unknown", label: "Not sure, help me" },
      ],
      gearboxLabel: "Gearbox",
      gearboxes: [
        { value: "manual", label: "Manual" },
        { value: "automatic", label: "Automatic" },
      ],
      vinLabel: "Last 7 characters of your VIN",
      vinHint: "Optional. Helps us check which unit version you have.",
      optionsHeading: "What to set up in the unit",
      optionsHint: "The same changes as the app's Tuning module. Ignition and fuel maps stay untouched, so this can't blow up the engine.",
      options: [
        { value: "rev_limiter", label: "Rev limiter", hint: "Tell us the RPM in the note." },
        { value: "pedal_sport", label: "Sport throttle pedal", hint: "Sharper pedal response." },
        { value: "idle", label: "Idle", hint: "" },
        { value: "disa", label: "DISA", hint: "" },
        { value: "vanos", label: "VANOS", hint: "" },
        { value: "cooling", label: "Cooling", hint: "" },
        { value: "cruise", label: "Cruise control", hint: "" },
      ],
      noteLabel: "What exactly you want",
      noteHint: "For example, the rev limit you want. Not sure? Tell us how you use the car and we'll suggest a setup.",
      contactHeading: "Contact",
      nameLabel: "Full name",
      emailLabel: "Email",
      phoneLabel: "Phone",
      optional: "optional",
      ewsTitle: "The immobilizer is disabled",
      ewsBody: "The immobilizer (EWS) is disabled in the unit, so the car starts without pairing. That also means the car loses its factory theft protection. Check with your insurer whether this affects your cover.",
      ack: "I understand the unit has the immobilizer disabled and is intended for off-road use only.",
      summaryHeading: "Your unit",
      summaryBase: "MS43 with MS43X",
      summaryNoOptions: "No changes, plain MS43X",
      summaryCarPending: "Pick engine and gearbox",
      priceLabel: "Price",
      depositLabel: "Refundable deposit",
      pricePending: "confirmed by email",
      returnLabel: "Return your original within",
      returnPending: "the time in your quote",
      days: "days",
      submit: "Send request (no obligation)",
      sending: "Sending…",
      submitNote: "You don't pay anything until you accept the quote we email you.",
      genericError: "Please check the fields you filled in.",
      networkError: "Couldn't send it. Please try again.",
      done: {
        title: "Got your request.",
        body: "We'll email you the price, deposit and shipping date. You don't pay anything until you accept the quote.",
      },
      gpl: "MS43X is open source under the GPL-3.0 license. It's developed by the community MS4X project, which we have no partnership with. The source code is public:",
      gplLink: "MS43X on GitHub",
    },
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

/**
 * Ceník hotových jednotek. Dokud je hodnota `null`, web místo čísla píše
 * "potvrdíme e-mailem". Kč, Radek je neplátce DPH.
 * - unitCzk: cena při výměně (Radek 3. 10.: "do 5K").
 * - depositCzk: vratná záloha při výměně (Radek 3. 10.: 1 500 Kč).
 * - buyCzk: koupě bez výměny. Původní jednotka se nevrátí, takže z ní
 *   nejde udělat další kus. Návrh Jarvise: unitCzk + depositCzk, čeká na Radka.
 * - returnDays: lhůta na vrácení původní jednotky u výměny.
 */
export const e46UnitPricing: {
  unitCzk: number | null;
  depositCzk: number | null;
  buyCzk: number | null;
  returnDays: number | null;
} = {
  unitCzk: 4990,
  depositCzk: 1500,
  buyCzk: null,
  returnDays: null,
};

export const ms43xSourceUrl = "https://github.com/ms4x-net/MS43X-Custom-Firmware";

export function getE46(locale: Locale): E46Content {
  return e46[locale];
}
