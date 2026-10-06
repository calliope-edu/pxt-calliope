#!/usr/bin/env bash
# Build the complete standalone static package: fonts, simulator extensions, UI
# translations, the package itself, and translated docs.
#
# This is the one entry point; it orchestrates the other scripts in the right order and
# re-applies everything `pxt staticpkg` destroys (it starts with a rimraf of the output).
#
#   scripts/build-fonts.sh             roboto-mono woff2 subsets (theme/fonts.less
#                                      references 12 files that are not committed)
#   scripts/build-simx.sh              clone+build extension simulators -> built/simx
#   scripts/fetch-doc-translations.sh  translated markdown -> docs/_loc/<lang>
#   scripts/package_static_fetch_locs.sh  UI locales + staticpkg + post-build fixes
#   scripts/package_static_multilang.sh   install translated docs + the XHR shim
#
# Usage:
#   scripts/build-release.sh                 # interactive: pick languages, then build
#   scripts/build-release.sh de fr           # non-interactive, these languages
#   scripts/build-release.sh --all           # every language with upstream translations
#   scripts/build-release.sh --none          # English only
#   scripts/build-release.sh --list          # show language coverage and exit
#
#   SKIP_FONTS=1 SKIP_SIMX=1 SKIP_DOCS=1 scripts/build-release.sh de
set -euo pipefail

cd "$(dirname "$0")/.."

OUT_DIR="${OUT_DIR:-built/packaged}"
PROBE="${PROBE:-calliope/tutorials}"
BASE="${DOC_API:-https://makecode.calliope.cc/api/md/calliopemini}"

# ------------------------------------------------------------- language availability
# Probe one page per locale to see which actually have translations upstream. Cheap
# (one request each, run in parallel) and it means the menu only offers real options
# rather than all 36 declared locales.
probe_languages() {
    local probe_en
    probe_en=$(curl -fsS --max-time 30 "$BASE/$PROBE?lang=en" 2>/dev/null || true)
    mapfile -t locales < <(python3 -c "
import json
ap = json.load(open('pxtarget.json'))['appTheme']
for l in ap.get('availableLocales') or []:
    if l != 'en':
        print(l)
")
    printf '%s\n' "${locales[@]}" | xargs -P 12 -I{} bash -c '
        lang="$1"; BASE="$2"; PROBE="$3"; EN="$4"
        t=$(curl -fsS --max-time 30 "$BASE/$PROBE?lang=$lang" 2>/dev/null || true)
        [ -z "$t" ] && exit 0
        [ "$t" = "$EN" ] && exit 0
        # first heading doubles as a human-readable sample of the translation
        printf "%s\t%s\n" "$lang" "$(printf "%s" "$t" | head -1 | cut -c1-40)"
    ' _ {} "$BASE" "$PROBE" "$probe_en" | sort
}

if [ "${1:-}" = "--list" ]; then
    echo "==> probing which languages have translated docs upstream..."
    probe_languages | while IFS=$'\t' read -r l s; do printf '  %-8s %s\n' "$l" "$s"; done
    exit 0
fi

# ---------------------------------------------------------------- choose languages
LANGS=()
case "${1:-}" in
    --none) shift ;;
    --all)
        shift
        echo "==> probing available languages..."
        mapfile -t LANGS < <(probe_languages | cut -f1)
        ;;
    "")
        # interactive
        echo "==> probing which languages have translated docs upstream..."
        mapfile -t avail < <(probe_languages)
        if [ ${#avail[@]} -eq 0 ]; then
            echo "!!  no languages available; building English only" >&2
        else
            echo
            echo "Languages with upstream translations:"
            i=1
            for row in "${avail[@]}"; do
                printf '  %2d) %-8s %s\n' "$i" "$(cut -f1 <<<"$row")" "$(cut -f2 <<<"$row")"
                i=$((i + 1))
            done
            echo
            echo "Enter numbers or codes (space separated), 'all', or empty for English only."
            read -r -p "> " reply
            case "$reply" in
                all|ALL) mapfile -t LANGS < <(printf '%s\n' "${avail[@]}" | cut -f1) ;;
                "")      LANGS=() ;;
                *)
                    for tok in $reply; do
                        if [[ "$tok" =~ ^[0-9]+$ ]]; then
                            row="${avail[$((tok - 1))]:-}"
                            [ -n "$row" ] && LANGS+=("$(cut -f1 <<<"$row")")
                        else
                            LANGS+=("$tok")
                        fi
                    done
                    ;;
            esac
        fi
        ;;
    *) LANGS=("$@") ;;
esac

echo
echo "=============================================================="
echo " languages : ${LANGS[*]:-<English only>}"
echo " output    : $OUT_DIR"
echo "=============================================================="
echo

# ------------------------------------------------------------------------- 1. fonts
if [ -z "${SKIP_FONTS:-}" ]; then
    echo "### [1/5] fonts"
    bash scripts/build-fonts.sh || echo "!!  fonts failed (continuing; UI falls back to a generic mono)" >&2
else
    echo "### [1/5] fonts -- skipped"
fi
echo

# -------------------------------------------------------------------------- 2. simx
if [ -z "${SKIP_SIMX:-}" ]; then
    echo "### [2/5] simulator extensions"
    bash scripts/build-simx.sh --build || echo "!!  simx build had failures (continuing)" >&2
else
    echo "### [2/5] simulator extensions -- skipped"
fi
echo

# ------------------------------------------------------------- 3. doc translations
if [ ${#LANGS[@]} -gt 0 ] && [ -z "${SKIP_DOCS:-}" ]; then
    echo "### [3/5] translated docs (${LANGS[*]})"
    bash scripts/fetch-doc-translations.sh "${LANGS[@]}"
else
    echo "### [3/5] translated docs -- skipped"
fi
echo

# ------------------------------------------------------------------- 4. the package
echo "### [4/5] static package"
# feed in whatever simulators were staged
SIMX_ARG="$(bash scripts/build-simx.sh --simx-arg 2>/dev/null || true)"
[ -n "$SIMX_ARG" ] && echo "    simx: $SIMX_ARG"
SIMX="$SIMX_ARG" bash scripts/package_static_fetch_locs.sh "${LANGS[@]}"
echo

# ------------------------------------------------------- 5. translated docs + shim
if [ ${#LANGS[@]} -gt 0 ]; then
    echo "### [5/5] installing translated docs"
    bash scripts/package_static_multilang.sh "${LANGS[@]}"
else
    echo "### [5/5] translated docs -- skipped (English only)"
fi

echo
echo "=============================================================="
echo " done -> $OUT_DIR  ($(du -sh "$OUT_DIR" 2>/dev/null | cut -f1))"
echo "=============================================================="
cat <<EOF

Serve it:
    npx http-server $OUT_DIR -p 8080 -c-1

Test in a PRIVATE window: pxt caches docs in IndexedDB
(__pxt_translations_calliopemini) and returns the cached copy while refetching only in
the background, so a normal reload can still show the old language.
EOF
