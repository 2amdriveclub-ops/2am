#!/usr/bin/env bash
# Spustí jednu smyčku Jarvise bez obsluhy.
# Použití: ./scripts/run-loop.sh morning-brief
set -euo pipefail

# cron má minimální PATH — bez tohohle `claude` ani `jq` nenajde
export PATH="$HOME/.local/bin:$HOME/.npm-global/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"

LOOP="${1:?Zadej název smyčky, např. morning-brief}"
REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
LOOP_FILE="$REPO_DIR/loops/$LOOP.md"

if [[ ! -f "$LOOP_FILE" ]]; then
  echo "Smyčka $LOOP neexistuje ($LOOP_FILE)" >&2
  exit 1
fi

cd "$REPO_DIR"
mkdir -p briefs logs

# .env načte skript, ne Claude (Claude má čtení .env zakázané)
if [[ -f .env ]]; then
  set -a; source .env; set +a
fi

LOG="logs/$(date +%F)-$LOOP.log"
OUT="$(mktemp)"
trap 'rm -f "$OUT"' EXIT
STARTED="$(date -u +%FT%TZ)"

# Claude Code v neinteraktivním režimu. CLAUDE.md se načte automaticky.
# Běh do `runs` zapisuje tenhle skript (agent svoje náklady nezná).
status=0
claude -p "Spusť smyčku podle souboru loops/$LOOP.md. Dodrž CLAUDE.md a soul.md. Do tabulky runs nezapisuj, to udělá spouštěcí skript. Poslední odstavec výstupu = shrnutí běhu na max 3 řádky." \
  --output-format json > "$OUT" 2>> "$LOG" || status=$?

cat "$OUT" >> "$LOG"
echo >> "$LOG"

if ! command -v jq > /dev/null; then
  echo "jq chybí — běh se nezapsal do runs" >> "$LOG"
  exit "$status"
fi

COST="$(jq -r '.total_cost_usd // empty' "$OUT" 2>/dev/null || true)"
SUMMARY="$(jq -r '.result // empty' "$OUT" 2>/dev/null | tail -n 3 || true)"
[[ $status -ne 0 ]] && SUMMARY="CHYBA (exit $status): ${SUMMARY:-viz $LOG}"

if [[ -n "${SUPABASE_URL:-}" && -n "${SUPABASE_SERVICE_ROLE_KEY:-}" ]]; then
  jq -n --arg trigger "$LOOP" --arg summary "$SUMMARY" --arg cost "$COST" \
        --arg started "$STARTED" --arg finished "$(date -u +%FT%TZ)" \
    '{trigger: $trigger, summary: $summary, started_at: $started, finished_at: $finished,
      cost_usd: (if $cost == "" then null else ($cost | tonumber) end)}' |
  curl -sS -o /dev/null -w "runs insert: HTTP %{http_code}\n" \
    -X POST "$SUPABASE_URL/rest/v1/runs" \
    -H "apikey: $SUPABASE_SERVICE_ROLE_KEY" \
    -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
    -H "Content-Type: application/json" \
    --data @- >> "$LOG" 2>&1 || echo "runs insert selhal" >> "$LOG"
else
  echo "SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY chybí v .env — běh se nezapsal do runs" >> "$LOG"
fi

exit "$status"
