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

## Před prvním cronem

1. `claude setup-token` → token vlož do `.env` jako `CLAUDE_CODE_OAUTH_TOKEN`. Cron nevidí klíčenku ani přihlášení z terminálu, bez tokenu smyčka tiše spadne.
2. Do `.env` doplň `SUPABASE_SERVICE_ROLE_KEY` (projekt jarvis → Project Settings → API). Bez něj se běhy nezapíšou do `runs` a nedá se hlídat rozpočet.
3. Nainstaluj `jq` (`brew install jq` / `apt install jq`).
4. Jednou spusť `claude` ve složce `jarvis/` a přes `/mcp` přihlas Supabase a Vercel — OAuth tokeny MCP se uloží a cron je použije.

## Mac / Linux (cron)

`crontab -e` a vlož (uprav cestu k repu). `CRON_TZ` umí jen Linux (cronie); macOS cron ho ignoruje a jede v systémovém čase — na Macu nastaveném na Prahu je to totéž.

```cron
CRON_TZ=Europe/Prague
45 7 * * *  /cesta/k/2am/jarvis/scripts/run-loop.sh morning-brief
30 21 * * * /cesta/k/2am/jarvis/scripts/run-loop.sh evening-log
0 8 * * 1   /cesta/k/2am/jarvis/scripts/run-loop.sh weekly-strategy
0 20 * * 0  /cesta/k/2am/jarvis/scripts/run-loop.sh agent-audit
0 9 1 * *   /cesta/k/2am/jarvis/scripts/run-loop.sh cfo-review
```

Na Macu musí být počítač vzhůru — v Nastavení vypni uspávání, když je na napájení.

## Windows (Plánovač úloh)

Skript je bash, takže na Windows poběží přes Git Bash nebo WSL. Úlohu založ v Plánovači úloh:
- Program: `C:\Program Files\Git\bin\bash.exe`
- Argumenty: `-lc "/c/cesta/k/2am/jarvis/scripts/run-loop.sh morning-brief"`
- Spouštěč: denně 7:45, „Spustit, i když uživatel není přihlášen“.

## Pojistky

- Každá smyčka zapisuje do `runs` náklady. Audit v neděli hlídá rozpočet 2 000 Kč/měs.
- Log každého běhu je v `logs/`.
