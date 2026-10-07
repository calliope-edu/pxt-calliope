#!/usr/bin/env bash
# ONE-OFF: regenerate the self-hosted Roboto Mono woff2 subsets.
#
# You almost certainly do not need this. The 12 generated woff2 files are COMMITTED under
# docs/static/fonts/roboto-mono/, so a fresh clone already has them and the package build
# just copies them along with the rest of docs/static. This script is kept only as the
# record of how they were produced.
#
# Re-run it only if:
#   * theme/fonts.less gains a new subset or weight, or
#   * the upstream font is updated.
#
# It needs the source TTFs, which are NOT in git (static/fonts/roboto-mono/
# RobotoMono-Regular.ttf and RobotoMono-Medium.ttf, from fontsource roboto-mono). Fetch
# them again first, or FONT_SRC=<dir> to point elsewhere.
#
# Why subsets at all: fonts.less declares 12 @font-face rules with a unicode-range each,
# so a browser downloads only the scripts a page renders (~25 KB for a latin-only user
# instead of ~120-230 KB for the whole font). The ranges are read straight out of the
# .less so the files cannot drift from the rules that declare them.
#
# Requires fontTools + brotli. FONT_VENV defaults to ~/VENV.
#
# Usage:
#   scripts/one-off/regenerate-fonts.sh
#   FONT_SRC=/path/to/ttfs FONT_VENV=~/VENV scripts/one-off/regenerate-fonts.sh
set -euo pipefail

cd "$(dirname "$0")/../.."

FONT_VENV="${FONT_VENV:-$HOME/VENV}"
LESS_FILE="${LESS_FILE:-theme/fonts.less}"
# /static/... in a served build maps to docs/static/... (see scripts/package-30-static.sh)
OUT_DIR="${FONT_OUT:-docs/static/fonts/roboto-mono}"
SRC_DIR="${FONT_SRC:-static/fonts/roboto-mono}"

if [ -f "$FONT_VENV/bin/activate" ]; then
    # shellcheck disable=SC1090
    source "$FONT_VENV/bin/activate"
fi
if ! command -v pyftsubset >/dev/null 2>&1; then
    echo "!!  pyftsubset not found. Install with: pip install fonttools brotli" >&2
    echo "!!  (or set FONT_VENV to a venv that has them; tried: $FONT_VENV)" >&2
    exit 1
fi

mkdir -p "$OUT_DIR"

python3 - "$LESS_FILE" "$SRC_DIR" "$OUT_DIR" <<'PYEOF'
import re, subprocess, sys, os

less_file, src_dir, out_dir = sys.argv[1], sys.argv[2], sys.argv[3]

# weight -> source TTF. fonts.less only declares 400 and 500.
SRC = {"400": "RobotoMono-Regular.ttf", "500": "RobotoMono-Medium.ttf"}

css = open(less_file, encoding="utf-8").read()
faces = re.findall(r"@font-face\s*\{(.*?)\}", css, re.S)
if not faces:
    sys.exit(f"no @font-face blocks found in {less_file}")

made = failed = 0
for body in faces:
    m_w = re.search(r"font-weight:\s*(\d+)", body)
    m_u = re.search(r'url\("([^"]+)"\)', body)
    m_r = re.search(r"unicode-range:\s*([^;]+);", body)
    if not (m_w and m_u and m_r):
        print(f"    skip: incomplete @font-face block")
        continue

    weight = m_w.group(1)
    name = os.path.basename(m_u.group(1))
    # the CSS ranges are exactly what the subset must contain
    unicodes = m_r.group(1).replace("U+", "").replace(" ", "")

    src = os.path.join(src_dir, SRC.get(weight, ""))
    if not SRC.get(weight) or not os.path.exists(src):
        print(f"    FAIL {name}: no source TTF for weight {weight} (looked for {src})")
        failed += 1
        continue

    dst = os.path.join(out_dir, name)
    subprocess.run([
        "pyftsubset", src,
        f"--unicodes={unicodes}",
        "--flavor=woff2",
        "--layout-features=*",       # keep kerning/ligatures for the kept glyphs
        "--no-hinting",
        f"--output-file={dst}",
    ], check=True)
    print(f"    {name:32s} {os.path.getsize(dst):>7} bytes")
    made += 1

print(f"\n  generated {made} subsets" + (f", {failed} FAILED" if failed else ""))
if failed:
    sys.exit(1)
PYEOF

echo
echo "==> done: $OUT_DIR"
echo "    Re-run scripts/package-30-static.sh (or re-copy docs/static) to pick these up"
echo "    in built/packaged."
