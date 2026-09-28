# Jarvis — start balíček pro Claude Code

Tohle repo je mozek Jarvise: duše, pravidla, prompty, kontext firmy a schéma databáze.
Claude Code na PC ho čte při každé session, appka Claude (mobil, web) sdílí stejná data přes Supabase.

## Co je uvnitř

| Soubor / složka | K čemu |
| --- | --- |
| `CLAUDE.md` | Hlavní instrukce, které Claude Code načte automaticky při každém spuštění |
| `soul.md` | Duše Jarvise: kdo je, jak myslí, co nikdy nedělá |
| `context/` | Co víme o firmě, lidech, projektech, rozhodnutích a zamítnutých cestách (jen fakta od vás) |
| `prompts/` | Šablony agentů: Jarvis (L1), projektový agent (L2), CFO (L2), sub-agent (L3) |
| `loops/` | Zadání smyček, které běží samy (ranní brief, večerní zápis, týdenní strategie, CFO review, audit agentů) |
| `supabase/migrations/` | SQL schéma sdílené paměti (10 tabulek) + první data |
| `scripts/` | Spouštění smyček bez obsluhy |
| `.mcp.json` | Připojení Supabase a Vercelu pro Claude Code |

## První spuštění na PC (cca 30–60 min)

1. **Nainstaluj Claude Code**
   ```bash
   npm install -g @anthropic-ai/claude-code
   ```
2. **Naklonuj repo `2am`** — Jarvis zatím bydlí ve složce `jarvis/` (rozhodnuto 28. 9. 2026, Radek). Do samostatného repa se dá kdykoli přesunout.
   ```bash
   git clone git@github.com:2amdriveclub-ops/2am.git
   cd 2am/jarvis
   ```
3. ~~Založ Supabase projekt~~ — **hotovo 28. 9. 2026**: projekt `jarvis` (ref `corwufqibjbdvsqhqphh`, eu-central-1, free), migrace 0001 aplikovaná a ověřená, ref je v `.mcp.json`.
4. **Spusť Claude Code ve složce `jarvis/`** (ne v kořeni repa — jinak se nenačte `CLAUDE.md`, `.mcp.json` ani oprávnění) a autorizuj MCP:
   ```bash
   claude
   /mcp
   ```
   Přihlas Supabase a Vercel v prohlížeči.
5. **Vyplň `.env`** podle `.env.example` (token pro cron, service role klíč pro zápis nákladů do `runs`).
6. **Otestuj ranní brief ručně:**
   ```bash
   ./scripts/run-loop.sh morning-brief
   ```
   Pak zkontroluj `logs/` a že v tabulce `runs` přibyl řádek s `cost_usd`.
7. **Zapni smyčky** podle `scripts/schedule.md` (cron na Macu/Linuxu, Plánovač úloh na Windows).

## Pravidla repa

- Změny duše, promptů a semaforu jen přes commit, ať je vidět kdo a kdy.
- Fakta do `context/` píše Jarvis jen z toho, co jste řekli nebo co je v datech. Nikdy odhady.
- Klíče a hesla nikdy do repa. Jen do `.env` (je v `.gitignore`).
