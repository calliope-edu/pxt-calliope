# Faster blocks render server (`--docs?render=1`)

Calliope Campus renders the children's MakeCode programs for the class overview
(live wall) by loading `https://makecode.calliope.cc/--docs?render=1` in a hidden
iframe and posting `renderblocks` messages. Each job took ~0.85 s even for a
three-block program, so the whole class got about one image per second.

The fix is a change to pxt (`pxtrunner`, `pxtblocks`, `pxtsim`), not to this
target: [`render-server-performance.patch`](render-server-performance.patch),
two commits on top of pxt `v13.1.8` (the change and the fixes from review), on
their own branch in the Calliope fork: `calliope-edu/pxt`, branch
`render-server-perf` (with upstream master merged in). Upstream pull request:
[microsoft/pxt#11726](https://github.com/microsoft/pxt/pull/11726), merged on
2026-11-05. It ships in pxt 13.3.1, which pxt-calliope `v8.1.16` uses; that release
is on `https://makecode.calliope.cc/beta` (not yet live as of 2026-11-05).

## Where makecode.calliope.cc comes from

- `https://makecode.calliope.cc` serves this repository's release `v8.1.15`
  with **pxt 13.1.8** (`pxtTargetBundle.versions` of the live `target.js`).
  `pxtembed.js`, which contains the render server, comes from the `pxt-core`
  npm package that `package.json` pins; the cloud builds and hosts it, there is
  no copy of pxt in this repository.
- The local checkout `D:\GIT\calliope-dev\editors\makecode\pxt` is a fork
  (`calliope-edu/pxt`) at 12.3.7 on a test branch; it is not what runs live.
- So the change belongs upstream in `microsoft/pxt`. It reaches
  makecode.calliope.cc once a `pxt-core` release contains it and this repository
  bumps `pxt-core` and releases.

## What took the time

Profiled per warm job (headless Chrome, small program, local `pxt serve`):

| Cost | Per job | Fix |
| --- | --- | --- |
| `semantic.css` + `blockly.css` fetched again for every image | 150 ms to several s | fetched once per page (`loadCssAsync`) |
| new Blockly workspace (incl. an `AudioContext`) created and disposed per render | ~140 ms | the render server keeps the workspace (`reuseWorkspace`) |
| the ~1.4 MB inlined stylesheet parsed into the svg document | ~90 ms | css spliced into the serialized string instead |
| package compile + `getBlocksInfo` + block injection (`compileBlocksAsync`) | 380–550 ms on the live site | blocks info cached per package, used only in the locale it was built in; re-injected only when another render injected different blocks |
| png encoding (`encodeToPngAsync`) | ~220 ms | skipped with the new option `svgOnly` |
| base64 data uri of the svg | ~65 ms | skipped with `svgOnly` |

## New message option

```js
iframe.contentWindow.postMessage({
    type: "renderblocks", id, code: xml,
    options: { packageId: null, snippetMode: false, svgOnly: true }
}, editorOrigin);
```

With `svgOnly: true` the response carries `svg`, `width`, `height` and `css`;
`uri` (png or svg data uri) stays undefined. Without the option the response is
as before. Older pxt versions ignore the option, so a caller can send it today.

## Measurements

Twelve sequential jobs of a three-block program to one iframe (as in
`docs/perf/live-wall-load-test.md` of calliope-campus), headless Chrome, local
`pxt serve` of this repository:

| Build | warm job (median) |
| --- | --- |
| pxt 13.1.8 as released | ~1030 ms |
| patched, without option | ~340 ms |
| patched, `svgOnly: true` | ~60 ms |

Against the hosted editors on 2026-11-05 (same test, headless Chrome):

| Editor | warm job (median) |
| --- | --- |
| `makecode.calliope.cc` (8.1.15, pxt 13.1.8) | ~800 ms |
| `makecode.calliope.cc/beta` (8.1.16, pxt 13.3.1) | ~330 ms |
| `makecode.calliope.cc/beta`, `svgOnly: true` | ~80 ms |

The same headless browser measured ~1400 ms per job against the live site, where
the campus document measured 850 ms in a desktop browser, so real numbers are
likely lower still.

## Same images

All `libs/core/blocks-test/*.blocks` programs plus a program with a function,
a comment and a disabled block were rendered with released and patched pxt
(patched: twice, in different orders, to catch state left in the reused
workspace). The svgs are identical apart from Blockly's random element ids, the
embedded css is identical, and the rasterized images are byte-identical.

After review, a locale switch inside the render page (language set to `de` with
a German block label, then back to `en`) gives the same labels as released pxt,
and a TypeScript job without options gives the same svg as released pxt.
