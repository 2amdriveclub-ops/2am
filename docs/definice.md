# 2AM Drive Club — definice

*Pracovní dokument. Aktualizováno 24. 9. 2026. Zapsal: Jarvis, na základě session s Radkem.*

---

## 1. Co to je

**2am Drive Club je uzavřený klub nočních jízd — a zároveň značka, pod kterou
vycházejí produkty pro lidi kolem aut.**

Není to druhá platforma vedle Torqly. Je to **publikum a tvář**, kterou Torqly
nemá. Klub žije v aplikaci Torqly (termíny, trasy, evidence), web je jeho
veřejná fasáda a nábor.

> Jezdíme, když ostatní spí.

## 2. Proč to existuje (a proč zrovna teď)

Torqly.ai je venku od června 2024, má pět jazyků, pět cenových hladin —
a v době psaní **jednu recenzi na App Storu**. To není problém produktu.
To je problém distribuce: nikdo neví, že to existuje, a nikdo nemá důvod to
hledat, dokud se mu něco nerozbije.

Klub ten problém řeší z druhé strany: **nejdřív dá lidem důvod se scházet,
až pak jim dá nástroj.** Lidé se do klubu hlásí kvůli jízdám a fotkám; Torqly
je vedlejší efekt členství, ne důvod k instalaci.

## 3. Struktura produktů

| Vrstva | Co to je | Cena | Role |
|---|---|---|---|
| **2am Drive Club** | značka, klub, komunita, web | zdarma (na přihlášku) | pozornost a důvěra |
| **E46 Garage** | appka pro jednu generaci BMW | zdarma | akviziční magnet, vstup do ekosystému |
| **Torqly.ai** | garáž, deník jízd, kluby, pro všechna auta | předplatné | tržby |

Logika: *free niche tool → komunita → placený obecný nástroj.* E46 Garage je
v tomhle klíčový kus — komunita kolem E46 je globální, fanatická a hledá
přesně tohle. Je to nejlevnější způsob, jak získat relevantní publikum.

## 4. Pro koho

1. **Majitel auta se vztahem k němu** (ne nutně drahému) — chce jezdit, ukázat
   se mezi svými a mít po sobě stopu.
2. **E46 komunita** — globálně, anglicky, hledá informace k jednomu modelu.
3. *(druhotně)* **Značky a dealeři** — až bude publikum, je co prodat.

## 5. Čím se platí

Krátkodobě: **ničím.** Klub je zdarma a E46 Garage taky. Tržby jdou z Torqly.
Klub je marketingový náklad s vlastní značkou, ne samostatné P&L.

Střednědobě, až bude členská základna: členské úrovně, partnerství značek,
fotografické balíčky pro členy.

## 6. Nezaměnitelná výhoda

Tři lidi, kteří umí obraz. **Na každé jízdě jede fotograf a členové ráno
dostanou fotky, jaké si sami neudělají.** Tohle žádný konkurenční car app ani
klub neudělá, protože to neumí — a je to důvod, proč lidi zůstanou.

## 7. Web — čeho má dosáhnout

Jediná metrika: **počet podaných přihlášek + počet stažení E46 Garage.**
Ne návštěvnost, ne čas na stránce.

- `/` — manifest, co členství dává, jak se dostat dovnitř, E46, galerie, FAQ
- `/prihlaska` — formulář, padá do Supabase
- `/e46-garage` — stažení appky zdarma

Co na webu **není a nebude**: druhý login, druhá databáze aut, feed, chat.
Tohle všechno už umí Torqly a duplikovat to znamená postavit druhý produkt.

---

## ROZHODNUTO

- 2am Drive Club **není** samostatná platforma, je to značka + klub nad Torqly.
- Členská mechanika (profily, evidence, srazy) **žije v Torqly**, ne na webu.
- Vstup do klubu je **na přihlášku**, ne na otevřenou registraci.
- E46 Garage vychází **pod hlavičkou 2am Drive Clubu a zdarma**, ke stažení z webu.
- Web je **jen tmavý**. Klub se jmenuje 2am, světlý režim by byl lež.
- Stack: Next.js + Vercel + Supabase.

## OTEVŘENO

| Co | Kdo rozsekne |
|---|---|
| Rozpor v pozicování Torqly: web říká *"Premium AI Diagnostic Platform"*, App Store *"Domov pro celý život auta"*. Jedno musí zmizet. | Radek |
| Pět cenových hladin pro produkt s ~0 uživateli. Návrh: seříznout na dvě, dokud nejsou data. | Radek |
| E46 Garage: platforma, odkaz ke stažení, jazyk (E46 komunita je hlavně anglicky mluvící). | Radek |
| Jestli je Torqly společná firemní věc, nebo Radkova samostatná — a co na tom dělají Bohuslav a Adam. | všichni tři |
| Doména: `2amdriveclub.cz` vs `.club` vs `.com` (na `.com` sedí americká kapela a bar stejného jména). | Radek |
| Kdy a kde se jede první jízda. Bez termínu je nábor prázdný slib. | tým |

## ZAMÍTNUTO A PROČ

- **Vlastní členská sekce s loginem na webu** — duplikovalo by Torqly.
  Postavili bychom druhý produkt konkurující vlastnímu.
- **2am Drive Club jako samostatný byznys nezávislý na Torqly** — tříčlenná
  firma neutáhne dvě publika a dvě marketingové mašiny. Vedlo by to k odložení
  jedné z nich.
- **Pozicování Torqly jako AI diagnostiky** — v kategorii už sedí TorqueBot,
  OBDAI a TorqueIQ. "Domov pro celý život auta" je obhajitelnější.

## ÚKOLY

| # | Úkol | Kdo | Termín |
|---|---|---|---|
| 1 | Dodat odkaz ke stažení E46 Garage + na jaké platformě běží | Radek | do spuštění webu |
| 2 | Rozhodnout doménu a nasměrovat DNS na Vercel | Radek | — |
| 3 | Sjednotit pozicování Torqly (web vs App Store) | Radek | — |
| 4 | Dodat 6–10 fotek z jízd do galerie | Bohuslav / Adam | — |
| 5 | Vypsat termín první jízdy | tým | — |
| 6 | Založit Supabase projekt a pustit migraci | Jarvis (na pokyn) | — |
