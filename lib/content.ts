/**
 * Veškerý text webu, pro obě jazykové verze. Jazyk se vybírá podle domény
 * (viz lib/locale.ts) — .cz = čeština, .com i cokoli jiného = angličtina.
 *
 * Radek/Bohuslav/Adam: texty se mění tady, ne v komponentách. `content.cs`
 * a `content.en` mají stejný tvar — když upravíš jednu jazykovou verzi,
 * uprav prosím i druhou, ať se weby nerozjedou.
 */

import type { Locale } from "./locale";

export type Content = typeof content.cs;

export const content = {
  cs: {
    site: {
      name: "2AM Drive Club",
      wordmark: "2AM",
      tagline: "Klub pro ty, co jezdí, když ostatní spí.",
      country: "Česko",
      email: "2amdriveclub@gmail.com",
      instagram: "https://instagram.com/2amdriveclub",
      ogLocale: "cs_CZ",
      htmlLang: "cs",
    },
    nav: { club: "Klub", rides: "Jízdy", e46: "E46 Garage", faq: "Otázky", apply: "Přihláška" },
    skip: "Přeskočit na obsah",
    meta: {
      title: "2AM DRIVE CLUB — klub pro ty, co jezdí, když ostatní spí",
      description:
        "Uzavřený klub nočních jízd. Vstup na přihlášku, ne na registraci. Každá jízda se zaznamená, na každé jízdě jede fotograf.",
    },
    hero: {
      eyebrow: "noční jízdy · vstup na přihlášku",
      titleLines: ["Jezdíme,", "když ostatní"],
      titleAccent: "spí.",
      lede: "Ve dvě ráno je město prázdné. Žádné fronty, žádná světla v zrcátku, žádné publikum. Zůstanou jen auta a lidi, kteří je mají rádi natolik, že kvůli nim nespí.",
      ctaApply: "Podat přihlášku",
      ctaAbout: "Co je to za klub",
      ticker: "NIGHT RUNS",
    },
    rideStrip: { label: "Nejbližší jízda" },
    manifest: {
      eyebrow: "Manifest",
      lead: "Tohle není sraz na parkovišti u nákupáku. Není to soutěž o to, kdo má dražší auto, ani spolek, kde se dvě hodiny stojí a povídá.",
      p1: "Je to klub lidí, pro které je jízda samotná ten důvod. Sejdeme se, když je silnice prázdná, ujedeme trasu, kterou někdo vymyslel, a ráno máme něco, co ostatní nemají — a fotky, na které se dá dívat i za deset let.",
      p2: "Vstup je na přihlášku. Ne proto, že bychom dělali drahoty. Protože klub, kam může kdokoli, není klub.",
    },
    pillarsHeading: { eyebrow: "Co členství dává", title: "Tři věci, žádná čtvrtá" },
    pillars: [
      {
        index: "01",
        title: "Jízdy",
        body: "Pravidelné noční trasy mimo město. Malá skupina, žádná kolona, žádné publikum. Místo a čas srazu se dozvíš jen jako člen — proto to funguje.",
      },
      {
        index: "02",
        title: "Záznam",
        body: "Každá jízda ti zůstane. Trasa, čas, auto, kdo jel s tebou. Klub běží v Torqly, takže se to zapisuje samo a po roce máš doložený rok života svého auta.",
      },
      {
        index: "03",
        title: "Obraz",
        body: "Na každé jízdě jede fotograf. Tvoje auto dostane snímky, jaké si sám neuděláš — a ty je dostaneš, ne my do portfolia.",
      },
    ],
    stepsHeading: { eyebrow: "Jak se dostat dovnitř", title: "Tři kroky, sedm dní" },
    steps: [
      { index: "01", title: "Podáš přihlášku", body: "Auto, kde jezdíš a proč tam chceš být. Tři minuty, žádné CV." },
      { index: "02", title: "Projdeme ji", body: "Ozveme se do sedmi dnů. Zajímá nás člověk za volantem víc než výkon pod kapotou." },
      { index: "03", title: "Jedeš", body: "Dostaneš pozvánku do klubu v Torqly a termín nejbližší jízdy." },
    ],
    torqly: {
      eyebrow: "Klub běží v aplikaci",
      title: "Torqly ve zkratce",
      body: "Jízdy, trasy, garáž, technika podle VIN — jedno místo, ne skupina na Messengeru, co za měsíc nic nepamatuje.",
      cta: "Stáhnout Torqly",
      list: ["Deník jízd s mapou", "Garáž a technika podle VIN", "Termíny a sraz klubu", "Záznam výkonu na uzavřené trati"],
    },
    e46Teaser: { eyebrow: "Zdarma ke stažení", cta: "Stáhnout zdarma" },
    gallery: {
      eyebrow: "Z jízd",
      title: "Ráno máš fotky",
      lede: "Fotky z každé jízdy dostanou členové do týdne. Tohle je jediná část klubu, která je veřejná — protože funguje líp než jakýkoli text.",
    },
    faqHeading: { eyebrow: "Otázky", title: "Než se zeptáš" },
    faq: [
      {
        q: "Jaké auto musím mít?",
        a: "Žádné konkrétní. Nejde o cenu ani o výkon — jde o to, jestli k tomu autu máš vztah. Obyčejné auto, na kterém je vidět péče, projde dřív než nablýskané GT-čko koupené minulý týden.",
      },
      {
        q: "Proč přihláška a ne obyčejná registrace?",
        a: "Protože klub, kam může kdokoli, není klub, ale parkoviště. Filtr je jediný důvod, proč má smysl někam patřit.",
      },
      {
        q: "Jsou to ilegální závody?",
        a: "Ne. Jezdíme po silnicích, podle pravidel, s pojištěnými auty. Kdo to nechápe, u nás nemá co dělat — tohle je klub, ne rizikový faktor.",
      },
      {
        q: "Co to stojí?",
        a: "Vstup do klubu nic. Členství běží přes aplikaci Torqly, kde má klubová sekce placené hladiny podle toho, kolik aut a jízd evidujete.",
      },
      {
        q: "Musím mít Torqly?",
        a: "Ano. Klub se organizuje tam — termíny, trasy, evidence jízd i galerie. Bez toho bychom se domlouvali v třiceti SMS.",
      },
      {
        q: "Kde přesně se jezdí?",
        a: "Kraj oznámíme dopředu, přesný sraz padne do aplikace pár hodin před startem. Kdo to chce vědět měsíc dopředu, hledá něco jiného než klub.",
      },
      {
        q: "Jezdí se pořád na stejném místě?",
        a: "Ne. Kraj se mění jízdu od jízdy — schválně, aby se z toho nestal další sraz na známém parkovišti.",
      },
    ],
    finalCta: {
      titlePrefix: "Příští jízda",
      titleFallback: "je za pár týdnů",
      lede: "Skupina je malá schválně. Když se přihlásíš teď, jsi u toho od začátku — a začátek se zopakovat nedá.",
      apply: "Podat přihlášku",
      howRidesWork: "Jak jízdy fungují",
    },
    rides: {
      eyebrow: "Jak fungují jízdy",
      titleLines: ["Místo se dozvíš,", "až bude pozdě couvnout"],
      lede: "Žádný event na Facebooku s adresou o měsíc dopředu. Kraj víš předem, přesný bod srazu ti padne do aplikace pár hodin před startem — stejně jako trasa. Kdo v klubu je, ten to zvládne. Kdo není, ten se to nedozví.",
      card: {
        eyebrow: "Nejbližší jízda",
        note: "Přesný bod srazu se objeví v aplikaci pár hodin předem. Chceš tam být — přihlas se do klubu a stáhni si Torqly, ať tě pozvánka nemine.",
        apply: "Podat přihlášku",
        getTorqly: "Stáhnout Torqly",
      },
      modelHeading: { eyebrow: "Tři vrstvy, žádná čtvrtá", title: "Zdarma jezdíš. Za práci platíš." },
      layers: [
        {
          index: "01",
          title: "Jízda",
          price: "Zdarma",
          body: "Základ klubu a vždycky zdarma. Kraj se oznámí dopředu, přesný sraz padne do Torqly pár hodin před startem. Kapacita je malá schválně — tohle není akce pro masu.",
        },
        {
          index: "02",
          title: "Hero Car",
          price: "Placený slot, 2–3 auta na jízdu",
          body: "Kompletní fotoservis a krátké video o autě a majiteli, hotové do týdne. Neplatíš za to, že smíš jet — platíš za naši práci. Zájem piš na e-mail, sloty se plní dopředu.",
        },
        {
          index: "03",
          title: "Cíl",
          price: "Určuje se u každé jízdy",
          body: "Trasa vždycky někde končí — u podniku, který tou dobou nemá nikoho jiného. Kde a co tam bude, se dozvíš stejně jako trasu: v aplikaci, ne na webu.",
        },
      ],
      finalCta: {
        titleLines: ["Kraj víš,", "bod srazu ne"],
        lede: "Přesně tak to má být. Přihláška je první krok k tomu, aby ti pozvánka jednou padla do telefonu.",
        apply: "Podat přihlášku",
      },
    },
    apply: {
      meta: {
        title: "Přihláška do klubu",
        description: "Podej přihlášku do 2AM Drive Clubu. Ozveme se do sedmi dnů, ať už to dopadne jakkoli.",
      },
      eyebrow: "Přihláška",
      titleLines: ["Řekni nám,", "čím jezdíš"],
      lede: "Tři minuty. Nezajímá nás výkon ani cena — zajímá nás, jestli k tomu autu máš vztah a jestli tě baví jezdit v noci.",
      fields: {
        name: { label: "Jméno a příjmení" },
        email: { label: "E-mail" },
        phone: { label: "Telefon", hint: "Nepovinné. Použijeme jen k domluvě před jízdou." },
        city: { label: "Odkud jezdíš" },
        car: { label: "Čím jezdíš", hint: "Značka, model, rok. Klidně i to, co na něm máš rozdělané." },
        instagram: { label: "Instagram", hint: "Nepovinné, ale pomůže nám to." },
        motivation: { label: "Proč chceš dovnitř", hint: "Nemusí to být esej. Zajímá nás, co tě na tom baví." },
        optional: "nepovinné",
      },
      legal: "Odesláním nám dáváš svoje údaje k posouzení přihlášky a k domluvě jízd. Nikomu je nepředáváme a na požádání je smažeme —",
      submit: "Odeslat přihlášku",
      sending: "Odesílám…",
      genericError: "Zkontroluj prosím vyplněná pole.",
      networkError: "Nepodařilo se odeslat. Zkus to prosím ještě jednou.",
      done: {
        title: "Máme to.",
        body: "Přihlášku jsme dostali. Projdeme ji a ozveme se do sedmi dnů — ať už to dopadne jakkoli. Mezitím si stáhni Torqly, ušetříš si to potom.",
      },
    },
    footer: {
      clubHeading: "Klub",
      contactHeading: "Kontakt",
      apply: "Přihláška",
      rides: "Jízdy",
      whatMembership: "Co členství dává",
      faq: "Otázky",
      instagram: "Instagram",
      torqly: "Torqly v App Store",
    },
  },

  en: {
    site: {
      name: "2AM Drive Club",
      wordmark: "2AM",
      tagline: "The club for people who drive while everyone else sleeps.",
      country: "Czech Republic",
      email: "2amdriveclub@gmail.com",
      instagram: "https://instagram.com/2amdriveclub",
      ogLocale: "en_US",
      htmlLang: "en",
    },
    nav: { club: "Club", rides: "Rides", e46: "E46 Garage", faq: "FAQ", apply: "Apply" },
    skip: "Skip to content",
    meta: {
      title: "2AM DRIVE CLUB — for people who drive when everyone else sleeps",
      description:
        "A closed night-driving club. You get in by application, not sign-up. Every ride is logged, and a photographer rides along every time.",
    },
    hero: {
      eyebrow: "night rides · apply to join",
      titleLines: ["We drive,", "when everyone"],
      titleAccent: "sleeps.",
      lede: "At two in the morning the city is empty. No traffic, no headlights in your mirror, no audience. Just the cars and the people who love them enough to skip the sleep.",
      ctaApply: "Apply to join",
      ctaAbout: "What this club is",
      ticker: "NIGHT RUNS",
    },
    rideStrip: { label: "Next ride" },
    manifest: {
      eyebrow: "Manifesto",
      lead: "This isn't a meetup in a mall parking lot. It's not a contest over whose car cost more, or a club where you stand around for two hours talking.",
      p1: "It's a club for people who ride for the ride itself. We meet when the road is empty, run a route someone designed, and wake up with something the rest don't have — photos worth looking at ten years from now.",
      p2: "Getting in means applying. Not because we're precious about it. Because a club anyone can join isn't a club.",
    },
    pillarsHeading: { eyebrow: "What membership gets you", title: "Three things, no fourth" },
    pillars: [
      {
        index: "01",
        title: "Rides",
        body: "Regular night routes outside the city. Small group, no convoy, no audience. You find out where and when as a member — that's the whole point.",
      },
      {
        index: "02",
        title: "Record",
        body: "Every ride stays with you. Route, time, car, who rode with you. The club runs on Torqly, so it logs itself — a year in, you've got a documented year of your car's life.",
      },
      {
        index: "03",
        title: "Image",
        body: "There's a photographer on every ride. Your car gets shots you couldn't take yourself — and they go to you, not into our portfolio.",
      },
    ],
    stepsHeading: { eyebrow: "How to get in", title: "Three steps, seven days" },
    steps: [
      { index: "01", title: "You apply", body: "Your car, where you drive, and why you want in. Three minutes, no résumé." },
      { index: "02", title: "We review it", body: "We get back to you within seven days. We care more about the person behind the wheel than the numbers under the hood." },
      { index: "03", title: "You ride", body: "You get an invite to the club in Torqly and the date of the next ride." },
    ],
    torqly: {
      eyebrow: "The club runs on an app",
      title: "Torqly, in short",
      body: "Rides, routes, garage, VIN specs — one place, not a group chat that forgets everything after a month.",
      cta: "Get Torqly",
      list: ["Ride log with map", "Garage & specs by VIN", "Club schedule", "Closed-track performance log"],
    },
    e46Teaser: { eyebrow: "Free to download", cta: "Download free" },
    gallery: {
      eyebrow: "From the rides",
      title: "Mornings, you get photos",
      lede: "Ride photos land with members within a week. It's the one part of the club that's public — because it works better than any paragraph.",
    },
    faqHeading: { eyebrow: "Questions", title: "Before you ask" },
    faq: [
      {
        q: "What kind of car do I need?",
        a: "Nothing specific. It's not about price or horsepower — it's about whether you actually care about the car. A daily driver somebody clearly looks after beats a flashy GT bought last week.",
      },
      {
        q: "Why an application, not just sign-up?",
        a: "Because a club anyone can join isn't a club, it's a parking lot. The filter is the only reason belonging means anything.",
      },
      {
        q: "Is this illegal street racing?",
        a: "No. We drive on public roads, follow the rules, in insured cars. If you don't get that, you don't belong here — this is a club, not a liability.",
      },
      {
        q: "What does it cost?",
        a: "Joining the club: nothing. Membership runs through the Torqly app, which has paid tiers depending on how many cars and rides you're tracking.",
      },
      {
        q: "Do I need Torqly?",
        a: "Yes. That's where the club runs — schedules, routes, ride logs, the gallery. Without it we'd be coordinating over thirty group texts.",
      },
      {
        q: "Where exactly do you ride?",
        a: "We announce the region ahead of time; the exact meeting point drops into the app a few hours before start. If you need it a month out, you're after something other than a club.",
      },
      {
        q: "Is it always the same spot?",
        a: "No. The region changes ride to ride — on purpose, so this never turns into another meetup at a spot everyone already knows.",
      },
    ],
    finalCta: {
      titlePrefix: "Next ride",
      titleFallback: "is a few weeks out",
      lede: "The group stays small on purpose. Apply now and you're in from the start — and the start doesn't repeat.",
      apply: "Apply to join",
      howRidesWork: "How rides work",
    },
    rides: {
      eyebrow: "How rides work",
      titleLines: ["You find out where,", "once it's too late to bail"],
      lede: "No Facebook event with an address a month out. You know the region ahead of time; the exact meeting point drops into the app a few hours before start — same with the route. If you're in the club, you'll make it. If you're not, you won't hear about it.",
      card: {
        eyebrow: "Next ride",
        note: "The exact meeting point shows up in the app a few hours ahead. Want to be there — apply to the club and get Torqly, so the invite doesn't pass you by.",
        apply: "Apply to join",
        getTorqly: "Get Torqly",
      },
      modelHeading: { eyebrow: "Three layers, no fourth", title: "You ride for free. You pay for the work." },
      layers: [
        {
          index: "01",
          title: "The ride",
          price: "Free",
          body: "The core of the club, always free. We announce the region ahead of time; the exact meeting point drops into Torqly a few hours before start. The group stays small on purpose — this isn't built for a crowd.",
        },
        {
          index: "02",
          title: "Hero Car",
          price: "Paid slot, 2–3 cars per ride",
          body: "Full photo coverage plus a short video of your car and you, delivered within a week. You're not paying to be allowed to ride — you're paying for the work. Interested? Email us; slots fill up ahead of time.",
        },
        {
          index: "03",
          title: "The destination",
          price: "Set per ride",
          body: "Every route ends somewhere — at a spot that has no one else at that hour. Where and what's there, you'll find out the same way as the route: in the app, not on the website.",
        },
      ],
      finalCta: {
        titleLines: ["You'll know the region.", "Not the meeting point."],
        lede: "That's exactly how it should be. Applying is step one toward that invite landing on your phone.",
        apply: "Apply to join",
      },
    },
    apply: {
      meta: {
        title: "Club application",
        description: "Apply to join 2AM Drive Club. We get back to everyone within seven days, either way.",
      },
      eyebrow: "Application",
      titleLines: ["Tell us", "what you drive"],
      lede: "Three minutes. We don't care about horsepower or price — we care whether you actually love the car, and whether you're into driving at night.",
      fields: {
        name: { label: "Full name" },
        email: { label: "Email" },
        phone: { label: "Phone", hint: "Optional. We'll only use it to coordinate before a ride." },
        city: { label: "Where you're based" },
        car: { label: "What you drive", hint: "Make, model, year. Feel free to mention what you're working on." },
        instagram: { label: "Instagram", hint: "Optional, but it helps." },
        motivation: { label: "Why you want in", hint: "Doesn't need to be an essay. We care about what you like about it." },
        optional: "optional",
      },
      legal: "By submitting, you're giving us your details to review the application and to coordinate rides. We never pass them on, and we'll delete them on request —",
      submit: "Send application",
      sending: "Sending…",
      genericError: "Please check the fields you filled in.",
      networkError: "Couldn't send it. Please try again.",
      done: {
        title: "Got it.",
        body: "We have your application. We'll review it and get back to you within seven days, either way. In the meantime, grab Torqly — saves you a step later.",
      },
    },
    footer: {
      clubHeading: "Club",
      contactHeading: "Contact",
      apply: "Apply",
      rides: "Rides",
      whatMembership: "What membership gets you",
      faq: "FAQ",
      instagram: "Instagram",
      torqly: "Torqly on the App Store",
    },
  },
} satisfies Record<Locale, unknown>;

/**
 * NEJBLIŽŠÍ JÍZDA — jediné místo, kde se mění konkrétní termín.
 * Po každé jízdě dopiš další termín v OBOU jazycích, nebo nastav `null` —
 * pak sekce na obou verzích webu sama zmizí (žádné "termín TBD").
 *
 * Konkrétní obec (Kralovice) je jen orientační poznámka pro tým v docs/,
 * na web nepatří — kraj je maximum, co se zveřejňuje předem.
 */
export const nextRide: Record<
  Locale,
  { dateLabel: string; timeLabel: string; region: string }
> | null = {
  cs: { dateLabel: "2. října 2026", timeLabel: "01:00", region: "Plzeňský kraj" },
  en: { dateLabel: "October 2, 2026", timeLabel: "01:00", region: "Pilsen Region" },
};

export function getContent(locale: Locale): Content {
  return content[locale];
}

/** Odkaz na appku — sdílený pro obě jazykové verze. */
export const appStoreUrl =
  process.env.NEXT_PUBLIC_APP_STORE_URL ??
  "https://apps.apple.com/cz/app/torqly-ai/id6775222205";
