#!/usr/bin/env bash
# Find the extensions that ship a simulator ("simx"), fetch their source, build it, and
# stage the result for the static package.
#
# Background
# ----------
# An extension whose simulator is a separate web app registers a `simx` entry in
# targetconfig.json -> packages.approvedRepoLib, e.g.
#
#     "calliope-edu/gamekit": { "simx": { "sha": "...", "devUrl": "http://localhost:3000" } }
#
# pxt resolves such a simulator to
#
#     <origin>/simx/<repo>/-/<index>
#
# unless BOTH isLocalHost() and ?simxdev are set (the dev-server branch). `pxt staticpkg`
# neither builds nor copies these apps, so that path 404s and the simulator silently
# fails to appear. This script produces the trees that
# scripts/package_static_fetch_locs.sh then installs via its SIMX variable.
#
# What it does per extension
# --------------------------
#   1. clone (or reuse) the repo at the pinned `sha` into $WORK
#   2. locate the simulator app inside it (a dir with a package.json that has a build
#      script -- usually simx/, sometimes the repo root)
#   3. npm install && npm run build
#   4. stage the build output under $STAGE/<repo>/
#
# Only repos that can actually be built locally are attempted. Entries whose devUrl is a
# public https site (jacdac, smarthome, display-shield) are hosted upstream and are
# skipped by default -- the editor loads those from their own origin.
#
# Usage:
#   scripts/build-simx.sh                       # list what would be built, build nothing
#   scripts/build-simx.sh --build               # clone + build everything buildable
#   scripts/build-simx.sh --build calliope-edu/gamekit
#   LOCAL_SRC="calliope-edu/gamekit=$HOME/fw/GameKit/display-shield" scripts/build-simx.sh --build
#
# Then:
#   SIMX="$(scripts/build-simx.sh --simx-arg)" scripts/package_static_fetch_locs.sh
set -euo pipefail

cd "$(dirname "$0")/.."

WORK="${SIMX_WORK:-built/.simx-src}"
STAGE="${SIMX_STAGE:-built/simx}"
INCLUDE_REMOTE="${INCLUDE_REMOTE:-}"   # 1 = also try repos whose devUrl is a public site

MODE="list"
FILTER=()
for a in "$@"; do
    case "$a" in
        --build)    MODE="build" ;;
        --simx-arg) MODE="simxarg" ;;
        -*)         echo "unknown flag: $a" >&2; exit 2 ;;
        *)          FILTER+=("$a") ;;
    esac
done

# ------------------------------------------------------------------ enumerate entries
# Emits: <repo>\t<sha>\t<devUrl>\t<local|remote>
mapfile -t ENTRIES < <(python3 - "${FILTER[@]+"${FILTER[@]}"}" <<'PYEOF'
import json, sys, urllib.parse
want = set(sys.argv[1:])
lib = json.load(open("targetconfig.json", encoding="utf-8"))["packages"]["approvedRepoLib"]
for repo, meta in (lib or {}).items():
    simx = (meta or {}).get("simx")
    if not simx:
        continue
    if want and repo not in want:
        continue
    dev = simx.get("devUrl", "") or ""
    host = urllib.parse.urlparse(dev).hostname or ""
    # localhost devUrl => the app is meant to be built from source locally
    kind = "local" if host in ("localhost", "127.0.0.1") else "remote"
    print("\t".join([repo, simx.get("sha", ""), dev, kind]))
PYEOF
)

if [ ${#ENTRIES[@]} -eq 0 ]; then
    echo "no simx entries found in targetconfig.json" >&2
    exit 1
fi

# --------------------------------------------------------------------- simx-arg mode
# Print the SIMX="repo=dist ..." string for whatever is already staged.
if [ "$MODE" = "simxarg" ]; then
    out=()
    for line in "${ENTRIES[@]}"; do
        repo=$(cut -f1 <<<"$line")
        [ -d "$STAGE/$repo" ] && out+=("$repo=$STAGE/$repo")
    done
    printf '%s' "${out[*]:-}"
    exit 0
fi

# ------------------------------------------------------------------------- list mode
printf '%-44s %-8s %s\n' "EXTENSION" "KIND" "DEVURL"
for line in "${ENTRIES[@]}"; do
    repo=$(cut -f1 <<<"$line"); dev=$(cut -f3 <<<"$line"); kind=$(cut -f4 <<<"$line")
    staged=""
    [ -d "$STAGE/$repo" ] && staged="  [staged]"
    printf '%-44s %-8s %s%s\n' "$repo" "$kind" "${dev:--}" "$staged"
done
echo

if [ "$MODE" != "build" ]; then
    echo "nothing built (pass --build). 'remote' entries are hosted upstream and are"
    echo "skipped unless INCLUDE_REMOTE=1."
    exit 0
fi

# ------------------------------------------------------------------------ build mode
command -v npm >/dev/null 2>&1 || { echo "!!  npm not found" >&2; exit 1; }

built=0; skipped=0; failed=0
for line in "${ENTRIES[@]}"; do
    repo=$(cut -f1 <<<"$line"); sha=$(cut -f2 <<<"$line"); kind=$(cut -f4 <<<"$line")

    if [ "$kind" = "remote" ] && [ -z "$INCLUDE_REMOTE" ]; then
        echo "--  $repo: hosted upstream, skipping (INCLUDE_REMOTE=1 to force)"
        skipped=$((skipped + 1)); continue
    fi

    # a locally checked-out source tree wins over cloning
    src=""
    for pair in ${LOCAL_SRC:-}; do
        [ "${pair%%=*}" = "$repo" ] && src="${pair#*=}"
    done

    if [ -z "$src" ]; then
        src="$WORK/$repo"
        if [ ! -d "$src/.git" ]; then
            echo "==> $repo: cloning"
            mkdir -p "$(dirname "$src")"
            if ! git clone --quiet "https://github.com/$repo" "$src" 2>/dev/null; then
                echo "!!  $repo: clone failed" >&2
                failed=$((failed + 1)); continue
            fi
        fi
        if [ -n "$sha" ]; then
            # pin to the sha the target approved, so the build matches what pxt expects
            git -C "$src" fetch --quiet origin "$sha" 2>/dev/null || true
            git -C "$src" checkout --quiet "$sha" 2>/dev/null \
                || echo "!!  $repo: sha $sha not found, using default branch" >&2
        fi
    else
        echo "==> $repo: using local source $src"
    fi

    # find the simulator app: a package.json with a build script, simx/ first
    app=""
    for cand in "$src/simx" "$src"; do
        if [ -f "$cand/package.json" ] && grep -q '"build"' "$cand/package.json" 2>/dev/null; then
            app="$cand"; break
        fi
    done
    if [ -z "$app" ]; then
        echo "!!  $repo: no buildable app (looked in simx/ and repo root)" >&2
        failed=$((failed + 1)); continue
    fi

    echo "==> $repo: building in $app"
    ( cd "$app" && { [ -d node_modules ] || npm install --silent; } && npm run build --silent ) \
        || { echo "!!  $repo: build failed" >&2; failed=$((failed + 1)); continue; }

    dist=""
    for d in "$app/dist" "$app/build" "$app/out"; do
        [ -f "$d/index.html" ] && { dist="$d"; break; }
    done
    if [ -z "$dist" ]; then
        echo "!!  $repo: no index.html in dist/ build/ out/" >&2
        failed=$((failed + 1)); continue
    fi

    mkdir -p "$STAGE/$repo"
    cp -r "$dist/." "$STAGE/$repo/"
    echo "    staged -> $STAGE/$repo"
    built=$((built + 1))
done

echo
echo "==> built $built, skipped $skipped, failed $failed"
echo
echo "Install into the package with:"
echo "    SIMX=\"\$(scripts/build-simx.sh --simx-arg)\" scripts/package_static_fetch_locs.sh"
