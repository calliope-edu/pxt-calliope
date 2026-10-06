#!/usr/bin/env bash
# Fetch MakeCode UI translations and build a static package that serves BOTH the
# local docs and the translated UI.
#
# Why this exists
# ---------------
# Under `pxt serve`, pxt-core keys two different things off the same isLocalHost()
# check, pointing in opposite directions:
#
#     apiRoot          = isLocalHost() ? "https://www.makecode.com/api/" : "/api/"
#     translationsRoot = isLocalHost() ? "https://makecode.com/api/"     : ""
#
# So on localhost you get translations but no docs; on a custom hostname
# (e.g. calliope.test) you get docs but no translations. A static package with
# bundled locales sidesteps both: every file is served from one origin.
#
# `pxt staticpkg --locs` would download the translations itself, but it calls
# Crowdin's buildProject() against Microsoft's "makecode" project (id 157956) and
# needs a MANAGER-level Personal Access Token in CROWDIN_KEY. `--locs-src` reads
# already-downloaded files from disk instead and never contacts Crowdin, which is
# what this script prepares.
#
# Usage:
#   scripts/fetch-locs.sh                 # de, then build static package
#   scripts/fetch-locs.sh fr it           # other languages
#   LOCS_ONLY=1 scripts/fetch-locs.sh     # download only, skip the build
set -euo pipefail

cd "$(dirname "$0")/.."

LANGS=("$@")
[ ${#LANGS[@]} -eq 0 ] && LANGS=(de)

LOCS_DIR="${LOCS_DIR:-built/locs}"
OUT_DIR="${OUT_DIR:-built/packaged}"
API="${LOC_API:-https://makecode.com/api/translations}"

# The four files pxt looks for per language. Only strings.json (the editor UI)
# actually has content upstream -- target-/bundled-/sim-strings.json come back as
# "{}" because they are per-target and are not populated for this target. They are
# still written out so the set is complete and obvious to a future reader.
FILES=(strings.json target-strings.json bundled-strings.json sim-strings.json)

echo "==> downloading translations into $LOCS_DIR"
for lang in "${LANGS[@]}"; do
    mkdir -p "$LOCS_DIR/$lang"
    for f in "${FILES[@]}"; do
        url="$API?lang=$lang&filename=$f&approved=true"
        if ! body=$(curl -fsS --max-time 60 "$url" 2>/dev/null); then
            echo "    $lang/$f  FAILED (request error) -- writing {}"
            body='{}'
        fi
        # must be valid JSON; pxt does jsonTryParse and silently ignores bad files
        if ! printf '%s' "$body" | python3 -c 'import json,sys; json.load(sys.stdin)' 2>/dev/null; then
            echo "    $lang/$f  FAILED (not JSON) -- writing {}"
            body='{}'
        fi
        printf '%s' "$body" > "$LOCS_DIR/$lang/$f"
        n=$(python3 -c 'import json,sys; d=json.load(open(sys.argv[1])); print(len(d) if isinstance(d,dict) else 0)' "$LOCS_DIR/$lang/$f")
        printf '    %s/%-22s %6s keys\n' "$lang" "$f" "$n"
    done
done

if [ -n "${LOCS_ONLY:-}" ]; then
    echo "==> LOCS_ONLY set, stopping after download"
    exit 0
fi

# staticpkg also warms the hex cache. Any dependency combination not already in
# built/hexcache/ is submitted to the CLOUD build service -- and for this target that
# service returns "compilation <sha> not found", so the poll loop never terminates.
#
# Fix: build C++ locally instead. PXT_FORCE_LOCAL=1 makes pxt use the local toolchain
# rather than the cloud, and PXT_NODOCKER=1 keeps it out of docker. That needs yotta +
# arm-none-eabi-gcc on PATH, so source the yotta env if it is present.
YOTTA_ENV="${YOTTA_ENV:-$HOME/fw/YOTTAENV/bin/activate}"
if [ -f "$YOTTA_ENV" ]; then
    echo "==> activating yotta env: $YOTTA_ENV"
    # shellcheck disable=SC1090
    source "$YOTTA_ENV"
fi
if ! command -v arm-none-eabi-gcc >/dev/null 2>&1; then
    echo "!!  arm-none-eabi-gcc not on PATH -- local C++ build will fail." >&2
    echo "!!  Set YOTTA_ENV to your yotta activate script, or install the ARM toolchain." >&2
fi

export PXT_FORCE_LOCAL=1   # compile C++ locally, not via the (broken) cloud service
export PXT_NODOCKER=1      # do not shell out to docker for the build

echo "==> building static package into $OUT_DIR"
echo "    (local C++ build; the first run populates built/hexcache and is slow)"
npx pxt staticpkg --locs-src "$LOCS_DIR" -o "$OUT_DIR"

# staticpkg does not copy docs/static to the package root, but the start page and the hero
# banner request those images at /static/... (on the live site that path is served from the
# CDN blob store -- see the 302 to cdn.makecode.com -- which a locally served package has
# no equivalent of). Without this the banner cards and several theme images 404.
if [ -d docs/static ] && [ -d "$OUT_DIR" ]; then
    echo "==> copying docs/static -> $OUT_DIR/static (banner + theme images)"
    mkdir -p "$OUT_DIR/static"
    cp -r docs/static/. "$OUT_DIR/static/"
fi

# staticpkg leaves the `@cdnUrl@/blob/<sha>/` template placeholder in the generated HTML,
# so icon references 404 when served locally (there is no CDN). The JS runtime already
# handles this (BrowserUtils.patchCdn falls back to "./"), but the static HTML does not --
# rewrite those to plain local paths. Only *.html; leave the JS alone, where "@cdnUrl@" is
# the handler itself, not stale data.
if [ -d "$OUT_DIR" ]; then
    echo "==> resolving @cdnUrl@ placeholders in packaged HTML"
    python3 - "$OUT_DIR" <<'PYEOF'
import re, sys, glob, os
out = sys.argv[1]
pat = re.compile(r'@cdnUrl@/blob/[a-f0-9]+/')
for p in glob.glob(os.path.join(out, '*.html')):
    s = open(p, encoding='utf-8', errors='ignore').read()
    if '@cdnUrl@' not in s:
        continue
    s2, k = pat.subn('/', s)
    if k:
        open(p, 'w', encoding='utf-8').write(s2)
        print(f"    {os.path.basename(p)}: {k} refs")
PYEOF
fi

# Simulator extensions (simx). An extension whose simulator is a separate app registers a
# `simx` entry in targetconfig.json's approvedRepoLib. pxt resolves it to
#     <origin>/simx/<repo>/-/<index>
# unless BOTH isLocalHost() and ?simxdev are true (the dev-server branch). staticpkg does not
# build or copy those apps, so the path 404s unless we place the built app there ourselves.
#
# SIMX holds "<repo>=<dist dir>" entries (space separated). Known local simulator
# extensions are auto-detected below so a plain run picks them up; set SIMX explicitly to
# override or to add others. The app must be built with a relative base
# (vite `base: "./"`) so it works from that nested path.
#
# staticpkg begins with a rimraf of $OUT_DIR, so anything copied in by hand is destroyed on
# the next build -- that is exactly why this belongs in the script.
if [ -z "${SIMX:-}" ]; then
    GAMEKIT_DIST="${GAMEKIT_DIST:-$HOME/fw/GameKit/display-shield/simx/dist}"
    if [ -d "$GAMEKIT_DIST" ]; then
        SIMX="calliope-edu/gamekit=$GAMEKIT_DIST"
        echo "==> auto-detected simx: calliope-edu/gamekit"
    else
        echo "==> no simx found at $GAMEKIT_DIST (build it with: cd <simx> && npm run build)"
    fi
fi

if [ -n "${SIMX:-}" ] && [ -d "$OUT_DIR" ]; then
    for entry in $SIMX; do
        repo="${entry%%=*}"; dist="${entry#*=}"
        if [ -d "$dist" ]; then
            echo "==> installing simx $repo from $dist"
            mkdir -p "$OUT_DIR/simx/$repo/-"
            cp -r "$dist/." "$OUT_DIR/simx/$repo/-/"
        else
            echo "!!  simx $repo: dist dir not found: $dist (run its \`npm run build\`)" >&2
        fi
    done
fi

cat <<EOF

==> done

Serve it from a single origin, e.g.:

    npx http-server $OUT_DIR -p 8080 -c-1
    # or: python3 -m http.server 8080 --directory $OUT_DIR

then open  http://localhost:8080/

Docs and translations both come from that origin, so neither depends on
makecode.com and neither is affected by the isLocalHost() split.
EOF
