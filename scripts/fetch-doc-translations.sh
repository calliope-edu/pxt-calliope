#!/usr/bin/env bash
# Download translated docs from the live MakeCode Calliope site into docs/_loc/<lang>/,
# ready for scripts/package_static_multilang.sh.
#
# Why this works
# --------------
# The live site serves per-language markdown from the same endpoint the editor uses:
#
#     https://makecode.calliope.cc/api/md/calliopemini/<page>?lang=de
#
# These are the Crowdin translations, already published. No credential is needed -- this
# is a plain public GET, unlike `pxt staticpkg --locs` which needs a MANAGER-level
# CROWDIN_KEY against Microsoft's project.
#
# A page that has no translation yet comes back byte-identical to the English one. Those
# are skipped, so docs/_loc only ever contains genuinely translated pages -- which is
# exactly what the shim's manifest needs in order to fall back to English correctly.
#
# Note the live site runs an older target version, so do NOT send targetVersion:
# `?targetVersion=9.1.1` 404s there while the bare path returns 200.
#
# Usage:
#   scripts/fetch-doc-translations.sh de                 # all pages under docs/
#   scripts/fetch-doc-translations.sh de fr
#   PAGES="calliope/tutorials calliope/arbeitsheft" scripts/fetch-doc-translations.sh de
#   LIMIT=20 scripts/fetch-doc-translations.sh de        # try only the first N pages
set -euo pipefail

cd "$(dirname "$0")/.."

LANGS=("$@")
if [ ${#LANGS[@]} -eq 0 ]; then
    echo "usage: $0 <lang> [lang...]   e.g. $0 de" >&2
    exit 2
fi

BASE="${DOC_API:-https://makecode.calliope.cc/api/md/calliopemini}"
OUT="${DOCS_LOC:-docs/_loc}"
# English copies are fetched once and reused for the "is it actually translated?"
# comparison across every language. Delete this dir to force a refresh.
EN_CACHE="${EN_CACHE:-built/.doc-en-cache}"
mkdir -p "$EN_CACHE"

# Which pages to try. Default: every .md under docs/, excluding our own notes, the
# generated _loc tree, and SUMMARY/ref files that are not real pages.
if [ -n "${PAGES:-}" ]; then
    read -r -a pages <<< "$PAGES"
else
    mapfile -t pages < <(
        find docs -name '*.md' \
            ! -path 'docs/_loc/*' \
            ! -name 'claude-*.md' \
            ! -name 'SUMMARY.md' \
            -printf '%P\n' | sed 's|\.md$||' | sort
    )
fi
[ -n "${LIMIT:-}" ] && pages=("${pages[@]:0:$LIMIT}")

# ---------------------------------------------------------------- validate languages
# A typo (e.g. "fr-FR" instead of "fr") would otherwise churn through every page,
# translate nothing, and only reveal itself ~20 minutes later. Two cheap checks first:
# the code must be one the target offers, and the live site must actually return
# something different from English for a known-translated probe page.
PROBE="${PROBE:-calliope/tutorials}"
probe_en=$(curl -fsS --max-time 30 "$BASE/$PROBE?lang=en" 2>/dev/null || true)

valid=()
for lang in "${LANGS[@]}"; do
    if ! python3 - "$lang" <<'PYEOF'
import json, sys
locales = json.load(open("pxtarget.json"))["appTheme"].get("availableLocales") or []
sys.exit(0 if sys.argv[1] in locales else 1)
PYEOF
    then
        echo "!!  '$lang' is not in appTheme.availableLocales -- skipping" >&2
        echo "    (check the exact code, e.g. es-ES not es, pt-BR not pt)" >&2
        continue
    fi

    probe=$(curl -fsS --max-time 30 "$BASE/$PROBE?lang=$lang" 2>/dev/null || true)
    if [ -z "$probe" ]; then
        echo "!!  '$lang': probe page unavailable -- skipping" >&2
        continue
    fi
    if [ -n "$probe_en" ] && [ "$probe" = "$probe_en" ]; then
        echo "!!  '$lang': no translations upstream (probe identical to English) -- skipping" >&2
        continue
    fi
    valid+=("$lang")
done

if [ ${#valid[@]} -eq 0 ]; then
    echo "!!  no usable languages; nothing to do" >&2
    exit 1
fi
LANGS=("${valid[@]}")

echo "==> ${#pages[@]} page(s) to check, languages: ${LANGS[*]}"
echo "    source: $BASE"
echo

# Fetching is dominated by per-request latency, not payload: each page is ~2 KB but a
# fresh TCP+TLS handshake costs ~0.5-1.0 s. 381 pages x 6 languages serially is ~45 min.
# Running PARALLEL requests collapses that (measured: 8-way is ~9x faster than serial).
PAR="${PAR:-8}"

for lang in "${LANGS[@]}"; do
    echo "==> $lang: fetching ${#pages[@]} page(s), $PAR at a time"
    # one worker per page; each writes its own file, so no shared state to race on
    printf '%s\n' "${pages[@]}" | xargs -P "$PAR" -I{} bash -c '
        page="$1"; lang="$2"; BASE="$3"; OUT="$4"; EN_CACHE="$5"
        body=$(curl -fsS --max-time 30 "$BASE/$page?lang=$lang" 2>/dev/null || true)
        [ -z "$body" ] && exit 0
        case "$body" in \#\ Not\ found*) exit 0 ;; esac

        enf="$EN_CACHE/$page.md"
        if [ -f "$enf" ]; then
            en=$(cat "$enf")
        else
            en=$(curl -fsS --max-time 30 "$BASE/$page?lang=en" 2>/dev/null || true)
            mkdir -p "$(dirname "$enf")"
            printf "%s" "$en" > "$enf"
        fi
        # identical to English = untranslated upstream; skip so English keeps being served
        [ "$body" = "$en" ] && exit 0

        dst="$OUT/$lang/$page.md"
        mkdir -p "$(dirname "$dst")"
        printf "%s" "$body" > "$dst"
    ' _ {} "$lang" "$BASE" "$OUT" "$EN_CACHE"

    got=$(find "$OUT/$lang" -name '*.md' 2>/dev/null | wc -l)
    echo "==> $lang: $got translated page(s) (others untranslated upstream -> English)"
    echo
done

cat <<EOF
==> done -> $OUT

Install them into the package with:

    scripts/package_static_multilang.sh ${LANGS[*]}

Pages that were skipped keep serving English at runtime, which is the intended
fallback -- the shim only redirects pages that are actually present here.
EOF
