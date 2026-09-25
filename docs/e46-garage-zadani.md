# E46 Garage – podklad pro web 2am drive club

Zadání pro agenta, který staví web: na 2amdriveclub.* má vzniknout stránka, odkud si lidé
aplikaci **E46 Garage** stáhnou a pochopí, co to je. Tenhle soubor je jediný zdroj pravdy o
aplikaci – nic si nedomýšlej, a co tu není, radši vynech nebo se zeptej Radka.

---

## 1. Co to je

**E46 Garage** je desktopová aplikace pro Windows na diagnostiku, kódování a ladění **BMW E46
s motorem M54 a řídicí jednotkou Siemens MS43**.

Dnes musí člověk kolem E46 žonglovat s pěti nástroji z přelomu tisíciletí – INPA, NCS Expert,
NCS Dummy, TunerPro a MS4x Flasher. Každý má jiné ovládání, jiné soubory a nulovou zpětnou
vazbu, když něco selže. E46 Garage je dělá všechny z jednoho okna, v češtině, s vysvětlivkami
u každé položky.

Není to náhrada EDIABAS. Je to **lepší UI postavené nad standardními BMW nástroji**, které
už člověk má nainstalované.

**Stav:** BUILD 0.7, funkční a odzkoušené na dvou reálných autech (Touring 330i / M54B30 a
coupe 320i / M54B22). Zápisy do jednotek, kódování i flash jsou ověřené na živém autě.

---

## 2. Pro koho

Majitelé a kutilové kolem E46, kteří už dneska nějak používají INPA nebo NCS Expert a chtějí
to mít pohodlněji. Předpokládá se, že vědí, co dělají – appka není „klikni a máš 300 koní“.

---

## 3. Co umí (moduly)

| Modul | Co dělá |
|---|---|
| **Garáž** | Přehled auta – aktivní chyby, stav kódování, poslední jízda, napětí baterie, servisní položky |
| **Připojení** | Připojení k autu přes K+DCAN kabel, detekce modulů, napětí |
| **Coding** | Čtení a zápis kódování modulů (LSZ – světla, GM5 – komfortní elektronika). Základní a pokročilý režim, české popisky místo německých zkratek |
| **Chyby (DTC)** | Čtení a mazání chybových paměti napříč moduly |
| **Logger** | Živé logování z DME – nastavitelný dashboard, budíky / sloupce / digitální hodnoty podle parametru, graf, prohlížeč uložených jízd |
| **Tuning** | Úpravy kalibrace MS43: omezovač otáček, charakter motoru (volnoběh, DISA, VANOS, chlazení, tempomat), plynový pedál. Zápis do jednotky s průběhem a logem |
| **AI diagnostika** | Rozbor nalogovaných dat a chyb *(zatím rozpracované)* |

### Čím se to liší od stávajících nástrojů

- **České popisky a nápověda u každé položky** – „?“ ikonka vysvětlí, co parametr dělá,
  místo `HEIMLEUCHTEN_NSW = aktiv`.
- **Referenční (tovární) kalibrace** – appka si pamatuje, s čím auto vyjelo z fabriky, takže
  „Stock“ pořád znamená stock. Neladí se omylem úprava z úpravy.
- **Zápis se zálohou a kontrolou** – před zápisem záloha, zapisují se jen změněné bajty,
  po zápisu ověření zpětným čtením.
- **Ladění charakteru, ne předstihu** – tuning záměrně nepouští uživatele na mapy předstihu
  a paliva. Jde o volnoběh, odezvu, VANOS, chlazení. Nedá se tím odpálit motor.
- **Vidíš, co se děje** – průběh a terminálový log u každého zápisu, včetně pokynu vypnout
  zapalování na 10 s po flashi.

---

## 4. Co si uživatel musí zařídit sám (DŮLEŽITÉ)

Aplikace **záměrně neobsahuje žádné soubory BMW ani MS4X**. Uživatel musí mít vlastní:

- **EDIABAS / INPA** nainstalované (odtud si appka bere SGBD soubory pro komunikaci)
- **NCS daten** pro kódování
- **XDF a ADX definice** pro MS43 – veřejně ke stažení z wiki projektu MS4X
- **K+DCAN kabel** (FTDI, připojuje se na COM port)

Tohle je nutné zmínit na webu, jinak si lidi stáhnou appku a nic jim nepojede. Zároveň je to
právní pojistka – proto se ty soubory nikdy nebudou distribuovat s aplikací.

**Web nesmí hostovat ani odkazovat na nelegální kopie BMW softwaru.** Na MS4X wiki odkázat lze,
je to veřejný komunitní zdroj.

---

## 5. Licence a peníze

- **Zdarma a open source.** Zveřejní se na GitHubu pod účtem **2amdriveclub**.
- **Licence GPLv3** – vyplývá z použití knihovny EdiabasLib (GPLv3).
- **Buy Me a Coffee** odkaz jako jediná forma podpory. Žádný paywall, žádná registrace,
  žádná omezená free verze.
- Do budoucna se uvažuje o placené **AI analýze** přes kredity, ale **na webu to zatím
  nezmiňuj**. Až bude, řekne Radek.

Neslibuj předplatné, „pro verzi“ ani nic, co neexistuje.

---

## 6. Co musí být na stránce právně

Formulace nech na Radkovi, ale stránka musí obsahovat:

1. **Upozornění, že jde o úpravu řídicí jednotky.** Přehrání firmware může jednotku poškodit.
   Uživatel to dělá na vlastní riziko, autor neručí za škody.
2. **Použití mimo provoz na pozemních komunikacích** – úpravy kalibrace mohou znamenat
   ztrátu homologace a pojištění.
3. **Žádná vazba na BMW.** „BMW“ a „E46“ jsou ochranné známky BMW AG, projekt s nimi nemá
   nic společného. Totéž platí pro MS4X – není to jejich projekt ani partnerství.
4. **Bez záruky** (vyplývá z GPLv3, ale ať je to vidět i lidsky).

---

## 7. Co od webu chceme

Jednoduchá stránka, žádný e-shop. Návrh sekcí:

1. **Hero** – název, jedna věta co to je, tlačítko *Stáhnout* + odkaz na GitHub.
2. **Proč** – krátce ten problém s pěti nástroji.
3. **Co to umí** – moduly podle tabulky výš, ke každému screenshot.
4. **Co potřebuješ** – sekce 4, jasně a nepřehlédnutelně, ideálně jako checklist *před* tlačítkem stáhnout.
5. **Stažení** – odkaz na GitHub Releases + poznámka o SmartScreenu (viz níže).
6. **Upozornění** – sekce 6.
7. **Podpoř to** – Buy Me a Coffee.

Vizuál appky je tmavý, kyanová + oranžová, hlavička nese podtitul
„**UNDERGROUND TUNING DIVISION**“. Web by na to měl navazovat.

Jazyk stránky zatím neurčený – **appka je jen česky**. Jestli má být web anglicky, řekne Radek.

---

## 8. Screenshoty

Leží v repu v `docs/screenshots/`. Použitelné, rozlišení cca 1600×1030, tmavé téma.

| Soubor | Co je na něm |
|---|---|
| `1-garage.png` | Domovská obrazovka – dlaždice zdraví auta, kódování, tuning, poslední jízda, baterie, servis |
| `2-connection.png` | Připojení k autu |
| `3-coding.png` | Kódování, základní režim |
| `3b-coding-advanced.png` | Kódování, pokročilý režim |
| `4-dtc.png` | Chybová paměť |
| `5-logger-dashboard.png` | **Logger – budíky a dlaždice. Vizuálně nejsilnější, dal bych do hera.** |
| `5b-logger-monitors.png` | Logger – sloupcové ukazatele |
| `5c-logger-plot.png` | Logger – graf |
| `5d-logger-viewer.png` | Prohlížeč uložených jízd |
| `5e-logger-ai.png` | Napojení logu na AI rozbor |
| `6-tuning.png` | Tuning – omezovač otáček, rychlost řezu ⚠ *viz pozn. níže* |
| `6b-tuning-pedal-sport.png` | Křivka plynového pedálu, předvolba Sport |
| `6b2-tuning-character-preset.png` | Charakter motoru – předvolby |
| `6c-tuning-pedal-drag.png` | Ruční tažení křivky pedálu |
| `6e-tuning-summary.png` | Souhrn změn před zápisem |
| `6f/6g/6h-tuning-advanced-*.png` | Pokročilý režim, diff proti referenci |
| `7-ai.png` | AI diagnostika |
| `8*-garage-*.png` | Garáž po naplnění daty, servisní dialog |

### Osobní údaje – už vyřešeno

Screenshoty v tomhle balíčku jsou **už očištěné**, můžeš je použít rovnou:

- Hlavička u 23 z nich obsahovala lokální cestu s uživatelským jménem
  (`C:\Users\...\E46Garage\fixtures\demo`). Je přemalovaná na neutrální `Mock (demo)`.
- **VIN nikde není** – auta se jmenují `E46 #1` a pole VIN je prázdné. Je to obecné, nech tak.
- `1-garage.png` je původní, nebylo co čistit.

Kdybys dělal nové snímky nebo bral jiné než z tohohle balíčku, kontrolu si udělej znovu.

---

## 9. Co ještě neexistuje (nelži o tom na webu)

- **Odkaz na GitHub zatím není** – repozitář se teprve zveřejní. Nech placeholder a needituj
  ho na ostro, dokud Radek neřekne.
- **Není instalátor ani podpis kódu.** Windows SmartScreen bude při spuštění varovat.
  Na stránce to zmiň dřív, než na to člověk narazí – jinak to vypadá jako virus.
- **AI diagnostika je rozpracovaná** – nepopisuj ji jako hotovou funkci.
- **Podporované je jen MS43** (M54). Starší jednotky se možná přidají, ale zatím ne.
- **Jen Windows.**

---

## 10. Na co si dát pozor

- Nevymýšlej funkce ani čísla výkonu. Appka **nikde neslibuje víc koní** a nemá mapy předstihu
  ani paliva – to je záměr, ne opomenutí.
- Nepiš, že je to „schválené“, „oficiální“ nebo „partnerské“ s kýmkoli.
- Nepoužívej loga BMW ani M-logo.
- Nedávej na web žádné biny, XDF, ADX, SGBD ani daten soubory.
