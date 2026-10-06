#!/usr/bin/env bash
# Generate the self-hosted Roboto Mono woff2 subsets that theme/fonts.less references.
#
# Why this exists
# ---------------
# theme/fonts.less declares 12 @font-face rules pointing at
#     /static/fonts/roboto-mono/<subset>-<weight>-normal.woff2
# with a unicode-range per subset, so a browser downloads only the scripts a page
# actually renders (~20 KB for a latin-only user instead of ~120-230 KB for the
# whole font). Those 12 files were never committed, so every one 404'd and all the
# rules that use the family silently fell back to a generic monospace.
#
# The source TTFs already contain every script (latin, latin-ext, cyrillic,
# cyrillic-ext, greek, vietnamese) -- the subsets are just that one font sliced up.
# This script slices it, reading the unicode-ranges straight out of fonts.less so the
# generated files can never drift from the CSS that declares them.
#
# Requires fontTools + brotli. Point FONT_VENV at a venv that has them.
#
# Usage:
#   scripts/build-fonts.sh
#   FONT_VENV=~/VENV scripts/build-fonts.sh
set -euo pipefail

cd "$(dirname "$0")/.."

FONT_VENV="${FONT_VENV:-$HOME/VENV}"
LESS_FILE="${LESS_FILE:-theme/fonts.less}"
# /static/... in a served build maps to docs/static/... (see scripts/fetch-locs.sh)
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
echo "    Re-run scripts/fetch-locs.sh (or re-copy docs/static) to pick these up"
echo "    in built/packaged."
