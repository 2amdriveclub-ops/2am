# Rozvrh smyček

Časy v Europe/Prague. Nejdřív každou smyčku otestuj ručně: `./scripts/run-loop.sh <nazev>`.

| Smyčka | Kdy | Soubor |
| --- | --- | --- |
| Ranní brief | denně 7:45 | `loops/morning-brief.md` |
| Večerní zápis | denně 21:30 | `loops/evening-log.md` |
| Týdenní strategie | pondělí 8:00 | `loops/weekly-strategy.md` |
| Audit agentů | neděle 20:00 | `loops/agent-audit.md` |
| CFO review | 1. den v měsíci 9:00 | `loops/cfo-review.md` |

Hodinová hlídka a práce z fronty přijdou až s projektovými agenty (fáze 1–2), aby nežraly rozpočet naprázdno.

## Mac / Linux (cron)

`crontab -e` a vlož (uprav cestu k repu):

```cron
CRON_TZ=Europe/Prague
45 7 * * *  /cesta/k/jarvis/scripts/run-loop.sh morning-brief
30 21 * * * /cesta/k/jarvis/scripts/run-loop.sh evening-log
0 8 * * 1   /cesta/k/jarvis/scripts/run-loop.sh weekly-strategy
0 20 * * 0  /cesta/k/jarvis/scripts/run-loop.sh agent-audit
0 9 1 * *   /cesta/k/jarvis/scripts/run-loop.sh cfo-review
```

Na Macu musí být počítač vzhůru — v Nastavení vypni uspávání, když je na napájení.

## Windows (Plánovač úloh)

Skript je bash, takže na Windows poběží přes Git Bash nebo WSL. Úlohu založ v Plánovači úloh:
- Program: `C:\Program Files\Git\bin\bash.exe`
- Argumenty: `-lc "/c/cesta/k/jarvis/scripts/run-loop.sh morning-brief"`
- Spouštěč: denně 7:45, „Spustit, i když uživatel není přihlášen“.

## Pojistky

- Každá smyčka zapisuje do `runs` náklady. Audit v neděli hlídá rozpočet 2 000 Kč/měs.
- Log každého běhu je v `logs/`.
