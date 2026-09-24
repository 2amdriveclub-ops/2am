/**
 * Jediné místo, kde žije obsah webu. Radek/Bohuslav/Adam sem můžou sahat
 * bez znalosti Reactu — texty, jízdy a FAQ se mění tady, ne v komponentách.
 */

export const site = {
  name: "2AM Drive Club",
  wordmark: "2AM",
  tagline: "Klub pro ty, co jezdí, když ostatní spí.",
  city: "Praha",
  email: "2amdriveclub@gmail.com",
  instagram: "https://instagram.com/2amdriveclub",
  appStoreUrl:
    process.env.NEXT_PUBLIC_APP_STORE_URL ??
    "https://apps.apple.com/cz/app/torqly-ai/id6775222205",
};

export const pillars = [
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
];

export const steps = [
  {
    index: "01",
    title: "Podáš přihlášku",
    body: "Auto, kde jezdíš a proč tam chceš být. Tři minuty, žádné CV.",
  },
  {
    index: "02",
    title: "Projdeme ji",
    body: "Ozveme se do sedmi dnů. Zajímá nás člověk za volantem víc než výkon pod kapotou.",
  },
  {
    index: "03",
    title: "Jedeš",
    body: "Dostaneš pozvánku do klubu v Torqly a termín nejbližší jízdy.",
  },
];

export const faq = [
  {
    q: "Jaké auto musím mít?",
    a: "Žádné konkrétní. Nejde o cenu ani o výkon — jde o to, jestli k tomu autu máš vztah. Sériová Octavia, na které je vidět péče, projde dřív než nudné GT-čko koupené minulý týden.",
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
    q: "Jezdí se jen v Praze?",
    a: "Zatím ano. Jakmile bude dost lidí z jiného kraje, otevřeme tam další odnož — a řekneme vám to.",
  },
];

/**
 * E46 GARAGE — appka zdarma pod hlavičkou 2am Drive Clubu.
 *
 * !!! DOPLNIT: odkazy a platformy. Dokud `downloads` zůstane prázdné,
 * stránka poctivě řekne "připravujeme" místo toho, aby vedla nikam.
 */
export const e46 = {
  name: "E46 Garage",
  by: "by 2am Drive Club",
  claim: "Všechno o tvé E46 na jednom místě. Zdarma.",
  lede: "Servisní historie, díly, kódy poruch a technika ke konkrétní generaci. Postavené pro jedno auto, ne pro všechna — proto to sedí.",
  price: "Zdarma, bez účtu, bez reklam",
  // Každá položka: { label, href, note }. Prázdné pole = stav „připravujeme“.
  downloads: [] as { label: string; href: string; note?: string }[],
  features: [
    "Servisní kniha — co se kdy dělalo a za kolik",
    "Katalogová čísla dílů, která si nikdo nepamatuje",
    "Chybové kódy a co reálně znamenají",
    "Technická data ke konkrétní verzi motoru",
  ],
};
