# Torqly jako nástroj pro 2AM Drive Club — business analýza

*Jarvis pro Radka, 8. 10. 2026. Podklad k „mírnému překopání“ Torqly.*

## Závěr nahoře

- **Pro 25. 10. stačí šest věcí:** soukromý klub na pozvání, souhlas s kodexem,
  jízda s kapacitou a přihlášením (včetně spolujezdce), **bod srazu zamčený
  do zvolené hodiny**, push notifikace a hromadná zpráva od organizátora.
  Všechno ostatní jde první jízdu ručně.
- **Klubové funkce musí být v tarifu zdarma.** Klub je zdarma (rozhodnuto 5. 10.),
  takže Torqly na klubu nevydělává přímo. Vydělává na tom, co přijde potom:
  víc aut v garáži, AI diagnostika, služby.
- **Největší skryté riziko je rychlost v datech.** Deník jízd, který z veřejné
  silnice ukládá a ukazuje maximální rychlost, je v rukou policie nebo pojišťovny
  důkaz proti členovi i proti klubu. Na veřejných silnicích rychlost neukazovat
  vůbec. Výkon jen na uzavřené trati.
- **Otevřená otázka č. 1: je Torqly i pro Android?** Na webu máme jen odkaz do App
  Store. Pokud Android chybí, část posádky se do klubu nedostane. Tohle rozhoduje,
  jestli je Torqly pro klub vůbec použitelný.

## Jak to funguje pro člena — a co k tomu Torqly potřebuje

| Fáze | Co se děje | Funkce v Torqly |
|---|---|---|
| 1. Přihláška | Na webu (Supabase), souhlas s kodexem | — (je na webu) |
| 2. Schválení | Tým schválí, člen dostane pozvánku | **Pozvánka do klubu** vázaná na e-mail z přihlášky; klub je neveřejný, nedá se najít ani do něj „požádat“ |
| 3. Vstup | První otevření klubu | **Souhlas s kodexem v appce** (verze kodexu + čas), bez něj nevidí jízdy |
| 4. Oznámení jízdy | Datum + kraj, týdny předem | **Jízda** s datem, krajem, kapacitou; push „nová jízda“ |
| 5. Přihlášení na jízdu | Člen se hlásí | **Přihlášení**: auto z garáže, spolujezdec ano/ne (max 1), počítá se do kapacity; **pořadník** při plné kapacitě |
| 6. Hero Car | 2–3 placené sloty | **Rezervace slotu** (zatím jen „mám zájem“ → e-mail; platba později) |
| 7. Den D | Odpočet, pak odhalení | **Časový zámek**: bod srazu a trasa se zpřístupní až v nastavenou hodinu; push „bod srazu je venku“ |
| 8. Sraz | Posádka dorazí | **Check-in** (QR u organizátora nebo tlačítko v dosahu bodu) → víme, kdo reálně jede |
| 9. Jízda | Trasa | **Trasa jako odkaz do navigace** (Google Maps / Waze / GPX), **offline** — na Rakovnicku nemusí být signál |
| 10. Změna / zrušení | Náledí, policie, nehoda | **Hromadná zpráva od organizátora** všem přihlášeným, s pushem |
| 11. Konec | Každý domů | **„Jsem doma“** — jedno ťuknutí; organizátor vidí, kdo ještě ne. Kodex 02 v praxi |
| 12. Ráno | Fotky do týdne | **Galerie jízdy**, fotky přiřazené k autu; **záznam jízdy** do deníku auta |
| 13. Mezi jízdami | Garáž, péče o auto | Deník, garáž, VIN technika, **E46 Garage AI přes přihlášení do Torqly** |
| 14. Porušení kodexu | Rozhodne tým | **Hlášení incidentu** organizátorem → **blacklist** (napříč všemi jízdami klubu, s důvodem a datem) |

## Priority (MoSCoW)

Odhad pracnosti: **S** = do dne, **M** = pár dní, **L** = týden a víc. Hrubý odhad,
bez znalosti kódu Torqly.

### MUST — do 25. 10.
| Funkce | Proč | Odhad |
|---|---|---|
| Soukromý klub jen na pozvání | Vstup na přihlášku je jádro značky | S–M (pokud kluby už existují) |
| Souhlas s kodexem v appce | Bez něj je „porušení = blacklist“ jen věta | S |
| Jízda s kapacitou + přihlášení + spolujezdec | Malá skupina schválně; spolujezdec se počítá | M |
| **Časový zámek bodu srazu — vynucený na serveru** | Celá mechanika „místo se dozvíš pozdě“. Musí ho hlídat databáze, ne jen obrazovka (viz níže) | M |
| Push notifikace (nová jízda, bod srazu venku) | Jinak to člen prošvihne | S–M |
| Hromadná zpráva od organizátora | Zrušení kvůli náledí musí dojít všem | S |

### SHOULD — do konce roku
| Funkce | Proč | Odhad |
|---|---|---|
| Check-in na srazu | Víme, kdo dorazil; základ metrik | S |
| „Jsem doma“ | Bezpečnost; nikdo jiný to nemá | S |
| Pořadník | Kapacita se bude plnit | S |
| Galerie jízdy | „Ráno máš fotky“ je slib z webu | M |
| Blacklist + hlášení incidentu | Kodex musí mít zuby | M |
| Trasa do navigace + offline | Venkov bez signálu | S–M |

### COULD — až bude čas
| Funkce | Proč |
|---|---|
| Odznak „Jízda 00“ (byl u první jízdy) | Začátek se nedá zopakovat, ať je to vidět. Viditelné jen uvnitř klubu |
| Pozvi člena s ručením | Růst přes členy (bratrství); když pozvaný skončí na blacklistu, pozývající to ví |
| Propojení s **fotoapp** (dodávání fotek) | V Supabase už máte appku na doručování fotek klientům — galerie jízdy ji může použít místo nového systému |
| Hero Car s platbou | Až bude jasná cena slotu |
| Vlákno u jízdy | Jen k jedné jízdě, ne obecný chat |

### WON'T — vědomě ne
- **Veřejná mapa členů / živá poloha všech.** Bezpečnost, GDPR, a kodex 09.
- **Žebříčky a statistiky rychlosti z veřejných silnic.** Viz rizika.
- **Obecný chat klubu.** Z toho se stane Messenger skupina, kterou web slibuje nahradit.
- **Veřejný seznam jízd.** Jízdy vidí jen členové.

## Technická poznámka k časovému zámku

Když bod srazu jen schová obrazovka, ale appka ho stáhne z API dopředu, kdokoli
s proxy ho uvidí hned. Zámek musí být v databázi:

- bod srazu a trasa v samostatné tabulce (např. `event_secrets`),
- RLS pravidlo: číst smí jen **přihlášený člen jízdy** a jen když `now() >= reveal_at`,
- push v čas odhalení (cron / scheduled Edge Function).

Do obrazovky odhalení dát **jméno člena jako vodoznak**. Screenshot nejde zakázat,
ale podepsaný screenshot se nešíří tak ochotně (kodex 09).

## Rizika (ďáblův advokát)

1. **Rychlost jako důkaz.** Deník jízd z GPS ukládá rychlost. Při nehodě, kontrole
   nebo sporu s pojišťovnou se data dají vyžádat. Kodex teď výslovně nezakazuje
   závodění (vyškrtnuto 5. 10.) — o to víc nesmí appka vypadat, že ho měří.
   **Návrh:** na veřejných silnicích ukládat trasu a čas, ne rychlost; výkon jen
   v režimu „uzavřená trať“ (geofence okruhů).
2. **Android.** Viz závěr. Bez něj klub stojí na iPhonech.
3. **Tření při prvním použití.** Deset lidí, deset instalací, deset registrací
   týden před jízdou. První jízdu proto **neblokovat appkou**: Radek zve osobně,
   Torqly je hlavní kanál, záloha je SMS.
4. **Pět tarifů.** Klubové funkce musí být v tarifu zdarma, jinak klub zdarma
   není. Dobrá chvíle tarify seříznout na dva (otevřený bod od začátku).
5. **Osobní údaje.** Poloha (check-in, „jsem doma“), fotky s obličeji a SPZ,
   blacklist. Potřebuje to podmínky ochrany osobních údajů v Torqly i v klubu.
   Text o blacklistu už je na webu u přihlášky.

## Konkurence (pro kontext, ne kopírování)

Podle veřejných popisů v obchodech a na Product Hunt:

- **GarageMaster** — správa klubů: členství, akce, skupinové jízdy s mapou,
  docházka, platby. Nejblíž tomu, co děláme, ale jako administrativní nástroj.
- **Rydora** — sociální síť: garáže, kluby, akce, zprávy, tržiště.
- **DriveGo** — garáž, skupinové jízdy a analytika řízení **včetně rychlosti**.
  Přesně to, čemu se chceme vyhnout.
- **RoadStr** — trasy a akce.

**Čím se Torqly může lišit:** časově zamčený sraz, kodex s blacklistem,
„jsem doma“, fotky od profesionální produkce a technika podle VIN / E46.
To nikdo z nich v popisu nemá.

## Co měřit (cíle nastavit po třech jízdách, ne dřív)

- **Dorazilo / přihlásilo se** (check-in ÷ přihlášení) — jestli lidi berou závazek vážně.
- **Návrat na další jízdu** — jestli klub drží.
- **Přihlášky na webu za týden** — jestli funguje obsah.
- **Člen → placený Torqly** — jestli klub vydělává nepřímo.
- **Prodané Hero Car sloty** — jestli funguje přímý příjem.

## Co bych udělal já

1. **Do pátku zjistit Android.** Pokud chybí, je to priorita před vším ostatním
   (nebo web verze klubu pro Android).
2. **MUST seznam postavit jako jeden balík** — je to hlavně jedna nová entita
   (jízda) s přihlášením a zámkem. Zbytek Torqly se nemusí hýbat.
3. **Rychlost z veřejných jízd vypnout hned**, i když nic jiného nestihneš.
4. **25. 10. nezávisle na stavu appky:** pozvánky osobně, bod srazu v Torqly,
   pokud je hotový, jinak SMS ve stejnou hodinu.

## Zdroje

- [GarageMaster — Product Hunt](https://www.producthunt.com/p/garagemaster-app/garagemaster-app)
- [Rydora — přehled aplikace](https://mwm.ai/apps/rydora/6748365405)
- [DriveGo: Car Route Planner — App Store](https://apps.apple.com/us/app/-/id6757678516)
- [RoadStr — App Store](https://apps.apple.com/us/app/id1382535778)
