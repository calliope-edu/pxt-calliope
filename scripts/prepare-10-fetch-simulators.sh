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
# scripts/package-30-static.sh then installs via its SIMX variable.
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
#   scripts/prepare-10-fetch-simulators.sh                       # list what would be built, build nothing
#   scripts/prepare-10-fetch-simulators.sh --build               # clone + build everything buildable
#   scripts/prepare-10-fetch-simulators.sh --build calliope-edu/gamekit
#   LOCAL_SRC="calliope-edu/gamekit=$HOME/fw/GameKit/display-shield" scripts/prepare-10-fetch-simulators.sh --build
#
# Then:
#   SIMX="$(scripts/prepare-10-fetch-simulators.sh --simx-arg)" scripts/package-30-static.sh
set -euo pipefail

cd "$(dirname "$0")/.."

WORK="${SIMX_WORK:-built/.simx-src}"
STAGE="${SIMX_STAGE:-built/simx}"
INCLUDE_REMOTE="${INCLUDE_REMOTE:-}"   # 1 = also stage repos whose devUrl is a public site
# Not wanted in this target's package (deprecated / superseded by calliope-edu/gamekit).
EXCLUDE="${EXCLUDE:-jacdac/pxt-jacdac-test microbit-apps/display-shield}"

MODE="list"
FILTER=()
for a in "$@"; do
    case "$a" in
        --build)    MODE="build" ;;
        --simx-arg) MODE="simxarg" ;;
        --install)  MODE="install" ;;
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

# ----------------------------------------------------------------------- install mode
# Copy already-staged simulators into an existing package, without rebuilding it.
# package-40-static.sh starts with a rimraf, so using it just to refresh a simulator
# would mean a full ~20 minute rebuild.
if [ "$MODE" = "install" ]; then
    PKG="${OUT_DIR:-built/packaged}"
    if [ ! -d "$PKG" ]; then
        echo "!!  $PKG not found - build the package first" >&2
        exit 1
    fi
    n=0
    for line in "${ENTRIES[@]}"; do
        repo=$(cut -f1 <<<"$line")
        [ -d "$STAGE/$repo" ] || continue
        # replace rather than overlay: a previous install may contain files that the
        # current staged tree no longer has (e.g. after a prune rule changes), and a
        # plain copy would leave those behind
        rm -rf "${PKG:?}/simx/${repo:?}/-"
        mkdir -p "$PKG/simx/$repo/-"
        ( cd "$STAGE/$repo" && tar -cf - . ) | ( cd "$PKG/simx/$repo/-" && tar -xf - )
        printf '  installed %-46s %s\n' "$repo" "$(du -sh "$PKG/simx/$repo/-" | cut -f1)"
        n=$((n + 1))
    done
    echo "==> installed $n simulator(s) into $PKG"
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

    skip=""
    for ex in $EXCLUDE; do [ "$ex" = "$repo" ] && skip=1; done
    if [ -n "$skip" ]; then
        echo "--  $repo: excluded"
        skipped=$((skipped + 1)); continue
    fi

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
        # Download the pinned commit as a tarball rather than cloning. The sha is a
        # gh-pages "deploy:" commit, so we only ever want that one tree -- a clone drags
        # in the whole history for nothing (measured: gamekit 25 MB clone vs 444 KB
        # tarball; jacdac 313 MB vs 107 MB; 638 MB of clones in total).
        if [ ! -f "$src/.simx-sha" ] || [ "$(cat "$src/.simx-sha" 2>/dev/null)" != "$sha" ]; then
            echo "==> $repo: downloading $sha"
            tmp="$WORK/.dl.$$"
            rm -rf "$tmp"; mkdir -p "$tmp"
            if ! curl -fsSL --max-time 600 "https://codeload.github.com/$repo/tar.gz/$sha" \
                 | tar -xz -C "$tmp" 2>/dev/null; then
                echo "!!  $repo: download failed" >&2
                rm -rf "$tmp"
                failed=$((failed + 1)); continue
            fi
            # the archive has a single <name>-<sha>/ top-level directory
            inner=$(find "$tmp" -mindepth 1 -maxdepth 1 -type d | head -1)
            if [ -z "$inner" ]; then
                echo "!!  $repo: unexpected archive layout" >&2
                rm -rf "$tmp"
                failed=$((failed + 1)); continue
            fi
            rm -rf "${src:?}"
            mkdir -p "$(dirname "$src")"
            mv "$inner" "$src"
            rm -rf "$tmp"
            printf '%s' "$sha" > "$src/.simx-sha"
        else
            echo "==> $repo: already at $sha"
        fi
    else
        echo "==> $repo: using local source $src"
    fi

    # The sha pinned in targetconfig.json is (in every case observed) a gh-pages
    # "deploy:" commit -- i.e. the ALREADY BUILT simulator, with index.html + assets at
    # the repo root. That is what pxt itself serves from, so prefer it and build nothing.
    if [ -f "$src/index.html" ]; then
        echo "==> $repo: prebuilt deployment at pinned sha"
        dist="$src"
    else
        # fall back to building from source (a source checkout, or LOCAL_SRC)
        app=""
        for cand in "$src/simx" "$src"; do
            if [ -f "$cand/package.json" ] && grep -q '"build"' "$cand/package.json" 2>/dev/null; then
                app="$cand"; break
            fi
        done
        if [ -z "$app" ]; then
            echo "!!  $repo: no index.html and no buildable app" >&2
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
    fi

    mkdir -p "$STAGE/$repo"
    # exclude .git: the clone's history is large, read-only in places (pack files), and
    # has no business in a served package
    ( cd "$dist" && tar -cf - --exclude=.git . ) | ( cd "$STAGE/$repo" && tar -xf - )

    # Some deploys are a whole documentation site whose simulator is only one page of
    # it: jacdac/pxt-jacdac ships 62 MB of videos + 37 MB of images + a 14 MB device
    # catalogue = 313 MB, more than twice the entire editor package. pxt loads
    # `index.html` at the deploy root (the `index` field defaults to "index.html" in
    # pxt-core main.js) and none of those trees are referenced from it, so they can go.
    #
    # Rules are per-repo variables: PRUNE_<slug> where <slug> is the repo with every
    # non-alphanumeric character replaced by "_". Set one to "" to keep everything.
    slug=$(printf '%s' "$repo" | tr -c '[:alnum:]' '_')
    eval "dirs=\${PRUNE_$slug-}"
    if [ -z "${dirs+x}" ] || [ "$dirs" = "" ]; then
        case "$repo" in
            # sitemap/ is kept: it is only SEO metadata, but index.html links it and a
            # referenced-yet-missing file is a needless 404 in the console.
            # page-data/ is Gatsby RUNTIME data, not docs content: the app fetches
            # page-data/app-data.json and page-data/index/page-data.json on load and
            # refuses to render without them ("page resources for ... not found. Not
            # rendering React"). It is only 1.1 MB. sitemap/ is kept because index.html
            # links it. Everything listed here is genuinely unreferenced bulk.
            jacdac/pxt-jacdac) dirs="videos images devices sounds templates" ;;
            *) dirs="" ;;
        esac
    fi
    if [ -n "$dirs" ]; then
        before=$(du -sm "$STAGE/$repo" 2>/dev/null | cut -f1)
        for d in $dirs; do
            [ -d "$STAGE/$repo/$d" ] && rm -rf "${STAGE:?}/$repo/${d:?}"
        done
        find "$STAGE/$repo" -name '*.js.map' -delete 2>/dev/null || true
        after=$(du -sm "$STAGE/$repo" 2>/dev/null | cut -f1)
        echo "    pruned ${before}MB -> ${after}MB (docs-site content not used by the sim)"
    fi

    echo "    staged -> $STAGE/$repo"
    built=$((built + 1))
done

echo
echo "==> built $built, skipped $skipped, failed $failed"
echo
echo "Install into the package with:"
echo "    SIMX=\"\$(scripts/prepare-10-fetch-simulators.sh --simx-arg)\" scripts/package-30-static.sh"
