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
2. **Založ repo na GitHubu** `jarvis` (private) a nahraj do něj obsah tohohle balíčku.
   ```bash
   cd jarvis
   git init && git add . && git commit -m "Jarvis: start balíček"
   git remote add origin git@github.com:<ucet>/jarvis.git
   git push -u origin main
   ```
3. **Založ Supabase projekt** `jarvis` (region EU, stejná organizace jako fotoapp) a jeho *Reference ID* (Project Settings → General) vlož do `.mcp.json` místo `DOPLNIT_REF_PROJEKTU_JARVIS`.
4. **Spusť Claude Code ve složce repa** a autorizuj MCP:
   ```bash
   claude
   /mcp
   ```
   Přihlas Supabase a Vercel v prohlížeči.
5. **Řekni Jarvisovi:** „Aplikuj migraci `supabase/migrations/0001_jarvis_core.sql` do projektu jarvis a ověř tabulky.“
6. **Otestuj ranní brief ručně:**
   ```bash
   ./scripts/run-loop.sh morning-brief
   ```
7. **Zapni smyčky** podle `scripts/schedule.md` (cron na Macu/Linuxu, Plánovač úloh na Windows).

## Pravidla repa

- Změny duše, promptů a semaforu jen přes commit, ať je vidět kdo a kdy.
- Fakta do `context/` píše Jarvis jen z toho, co jste řekli nebo co je v datech. Nikdy odhady.
- Klíče a hesla nikdy do repa. Jen do `.env` (je v `.gitignore`).
