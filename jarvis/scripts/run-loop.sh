#!/usr/bin/env bash
# Spustí jednu smyčku Jarvise bez obsluhy.
# Použití: ./scripts/run-loop.sh morning-brief
set -euo pipefail

LOOP="${1:?Zadej název smyčky, např. morning-brief}"
REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
LOOP_FILE="$REPO_DIR/loops/$LOOP.md"

if [[ ! -f "$LOOP_FILE" ]]; then
  echo "Smyčka $LOOP neexistuje ($LOOP_FILE)" >&2
  exit 1
fi

cd "$REPO_DIR"
mkdir -p briefs logs

# Claude Code v neinteraktivním režimu. CLAUDE.md se načte automaticky.
claude -p "Spusť smyčku podle souboru loops/$LOOP.md. Dodrž CLAUDE.md a soul.md. Na konci zapiš běh do tabulky runs." \
  >> "logs/$(date +%F)-$LOOP.log" 2>&1
