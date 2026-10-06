#!/usr/bin/env bash
# List the extensions available in this target as CSV, sorted by tag.
#
# Output: semicolon-separated -- extension;tag;source
#
# Two sources, both included by default:
#
#   online    targetconfig.json -> packages.approvedRepoLib
#             the GitHub extensions the editor's Extensions dialog offers (261 entries)
#   bundled   pxtarget.json -> bundleddirs
#             extensions shipped inside the target (e.g. datalogger, servo, bluetooth).
#             These never appear in approvedRepoLib because they are not fetched from
#             GitHub, but a user can still add them from the dialog.
#
# Tags
# ----
# "Recommended" is not stored as a tag: approvedRepoLib marks those entries with
# `"preferred": true`, and the editor renders a *Recommended* tab next to the real tag
# tabs (pxt-core main.js: label lf("Recommended") in the same tag-tab list). It is
# therefore emitted as a tag named "Recommended" so the CSV matches what the dialog shows.
# Set PREFERRED_TAG= to rename it, or PREFERRED_TAG=- to leave those entries untagged.
#
# An extension with several tags gets ONE ROW PER TAG by default, so each tag section is
# complete and column 2 can be grouped on. JOIN_TAGS=1 emits one row per extension with
# tags joined by "|".
#
# Switches
# --------
#   JOIN_TAGS=1        one row per extension, tags joined with "|"
#   SKIP_UNTAGGED=1    drop extensions that have no tag at all
#   INCLUDE_HIDDEN=1   keep entries marked hidden (the dialog does not show them)
#   NO_BUNDLED=1       online extensions only
#   NO_ONLINE=1        bundled extensions only
#   PREFERRED_TAG=x    rename the Recommended pseudo-tag ("-" to disable)
#
# Usage:
#   scripts/list-extensions.sh                    # -> stdout
#   scripts/list-extensions.sh extensions.csv     # -> file
set -euo pipefail

cd "$(dirname "$0")/.."

OUT="${1:-}"

python3 - "$OUT" <<'PYEOF'
import csv, json, os, sys

out_path = sys.argv[1] if len(sys.argv) > 1 else ""
join_tags = os.environ.get("JOIN_TAGS") == "1"
skip_untagged = os.environ.get("SKIP_UNTAGGED") == "1"
include_hidden = os.environ.get("INCLUDE_HIDDEN") == "1"
no_bundled = os.environ.get("NO_BUNDLED") == "1"
no_online = os.environ.get("NO_ONLINE") == "1"
preferred_tag = os.environ.get("PREFERRED_TAG", "Recommended")
if preferred_tag == "-":
    preferred_tag = ""

# name -> (tags, source). dict keeps insertion order; online first.
entries = {}

# ----------------------------------------------------------------- online extensions
if not no_online:
    cfg = json.load(open("targetconfig.json", encoding="utf-8"))
    for repo, meta in (cfg["packages"]["approvedRepoLib"] or {}).items():
        meta = meta or {}
        if meta.get("hidden") and not include_hidden:
            continue
        tags = list(meta.get("tags") or [])
        # "Recommended" is a UI tab driven by `preferred`, not a real tag
        if meta.get("preferred") and preferred_tag:
            tags.append(preferred_tag)
        entries[repo] = (tags, "online")

# ---------------------------------------------------------------- bundled extensions
if not no_bundled:
    target = json.load(open("pxtarget.json", encoding="utf-8"))
    for d in target.get("bundleddirs") or []:
        p = os.path.join(d, "pxt.json")
        if not os.path.exists(p):
            continue
        try:
            cfg = json.load(open(p, encoding="utf-8"))
        except Exception:
            continue
        name = cfg.get("name") or ""
        # a few bundled dirs have no usable name; fall back to the directory
        if not name:
            name = os.path.basename(d.rstrip("/"))
        # `core` is the target's own runtime, not something a user adds
        if name == "core":
            continue
        if cfg.get("hidden") and not include_hidden:
            continue
        # bundled packages carry no tags; keep them identifiable via the source column
        entries.setdefault(name, ([], "bundled"))

# ------------------------------------------------------------------------- emit rows
rows = []
for name, (tags, source) in entries.items():
    if not tags:
        if skip_untagged:
            continue
        rows.append((name, "", source))
    elif join_tags:
        rows.append((name, "|".join(sorted(tags)), source))
    else:
        for t in sorted(tags):
            rows.append((name, t, source))

# sort by tag, then name; untagged (empty tag) last rather than first
rows.sort(key=lambda r: (r[1] == "", r[1].lower(), r[0].lower()))

stream = open(out_path, "w", newline="", encoding="utf-8") if out_path else sys.stdout
try:
    # QUOTE_MINIMAL so a value containing ';' is quoted rather than breaking the columns
    w = csv.writer(stream, delimiter=";", quoting=csv.QUOTE_MINIMAL, lineterminator="\n")
    w.writerow(["extension", "tag", "source"])
    w.writerows(rows)
finally:
    if out_path:
        stream.close()

if out_path:
    tagged = sum(1 for r in rows if r[1])
    bundled = sum(1 for r in rows if r[2] == "bundled")
    print(f"wrote {len(rows)} row(s) to {out_path} "
          f"({tagged} tagged, {len(rows) - tagged} untagged; {bundled} bundled)",
          file=sys.stderr)
PYEOF
