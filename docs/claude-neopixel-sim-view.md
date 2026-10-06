# NeoPixel simulator view (breadboard strip)

## Notes

### 2026-10-05 — where the visual comes from
- The breadboard NeoPixel visual (`visuals.NeoPixelView`, `NeoPixelCanvas`, `NeoPixel`, `mkNeoPixelPart`) lives in
  `node_modules/pxt-common-packages/libs/core/sim/neopixel.ts`, pulled into our sim via `sim/tsconfig.json` `include`.
  The state class `CommonNeoPixelState` and `pxsim.light.sendBuffer` are in the same file.
- It draws each pixel as a `rect` 100% of the canvas wide ("stripes"), stacked top to bottom on a narrow canvas overlaid on the
  left of the strip artwork. With `state.width > 1` (matrix) it draws squares in a grid.
- Registered in `sim/dalboard.ts` (`builtinVisuals["neopixel"]`); `builtinPartVisuals["neopixel"]` (parts-list image) uses `mkNeoPixelPart`.

## Decisions

### 2026-10-05 — own view in the target instead of patching pxt-common-packages
- **Decision:** add `sim/visuals/neopixel.ts` with `visuals.CalliopeNeoPixelView` and register it in `sim/dalboard.ts`
  instead of `visuals.NeoPixelView`. `CommonNeoPixelState` and `mkNeoPixelPart` (the strip SVG) are reused unchanged;
  the user asked to leave the SVG as is for now.
- **Why:** editing `node_modules` would be lost on the next install; forking pxt-common-packages is heavy for a visual-only change.
- **Rejected:** patching node_modules; forking pxt-common-packages.
- **Layout:** small circles (r = 0.3·PIN_DIST, spacing 0.8·PIN_DIST) left to right, on a white rounded background
  placed centred **below** the strip artwork (so the SVG stays visible). The row grows with the pixel count up to
  12·PIN_DIST wide, then scales down to fit. Matrices (`state.width > 1`) wrap into rows of `width` columns. Hover scales the row 2×
  (common view used 4× with a hard-coded translate). Placement constants `NP_STRIP_CENTER_X`/`NP_STRIP_BOTTOM_Y` are derived
  from `mkNeoPixelPart`'s offsets/viewBox and must be updated if that SVG changes.
- CSS class names `sim-neopixel-row*` are distinct from the common view's so the two never clash.
- Status: compiles (`npx tsc -p sim`); a headless check confirmed `pxsim.visuals.CalliopeNeoPixelView` is loaded in the sim
  frame. Visual result not yet checked; the user does build and testing themselves.

### 2026-10-05 — circles 4× larger, row moved up
- User asked to enlarge the circles by 400% and move them higher.
- Interpreted as 4× size: radius 0.3→1.2·PIN_DIST; spacing, padding and the max row width (12→48·PIN_DIST) scaled 4× too, so
  circles don't overlap and don't immediately shrink back. Stroke widths scaled to match.
- "Higher": the row is now centred vertically on the strip body (`NP_STRIP_CENTER_Y = 73`), overlaying the SVG, instead of
  sitting below it. `NP_STRIP_BOTTOM_Y`/`NP_ROW_GAP` removed.

### 2026-10-05 — own strip artwork, wrap at 20, hover zoom fitted to the visible area
User feedback: hover box enlarges too much and is clipped left/right outside full screen (but zoom is useful in full
screen); wrap LEDs every 20; drop the illustrated pixels from the SVG, keep the cable pads at the start of the strip,
pads top→bottom GND, DATA, VCC.

- **Artwork:** `mkNeoPixelPart` (common SVG) is no longer used. The view draws its own connector head
  (`mkStripHead`: dark 2×3 PIN_DIST block, copper pads + GND/DIN/VCC labels) and the circle row starts directly to the right of
  it, first row centred on the DIN pad. Row background is now dark (#444, like a strip) instead of white.
  Parts-list image: new `mkCalliopeNeoPixelPart` (head + 5 unlit pixels), registered in `dalboard.ts`.
- **`libs/core/pxtparts.json` "neopixel" visual changed:** `pinDistance` 9→15 (= PIN_DIST, so part units are board units);
  `pinLocations` = pad centres in pinDefinitions order: data (10.5, 22.5), threeVolt (10.5, 37.5), ground (10.5, 7.5);
  `height` 45. **`width` 390 (26 columns) is deliberately much wider than the head**: the allocator
  (`allocColumns` in pxtsim) centres parts using `visual.width`, so declaring the strip's width places the head near the left
  of the breadboard and leaves room for the row. Downside: with other breadboard parts in the same program there is less
  room, and the allocator may overlap them ("Not enough breadboard space!").
- **Wrap:** `NP_PIXELS_PER_ROW = 20` (matrices still wrap at `state.width`).
- **Fit to view:** the fixed `NP_MAX_ROW_WIDTH` cap is gone. The row is scaled down so it ends `NP_RIGHT_MARGIN` before the right
  edge of the host svg's viewBox (`init`'s `svgEl` is the composed host; `partOverGroup` is a direct child, so it shares user coords
  with `moveToCoord`).
- **Hover zoom:** replaced the CSS `:hover scale(2)` with JS (mouseenter/leave). The zoom factor is
  `min(2, visible width / row width, visible height / row height)`, where "visible" = host svg client rect ∩ iframe viewport, converted to user
  coords via `getScreenCTM().inverse()`. The row is then shifted to stay inside. In a small view the zoom is limited (or skipped below 1.05);
  in full screen the host element is larger than its viewBox content (letterboxing), so more zoom fits.
  Rejected: only zooming in full screen (no reliable full-screen signal inside the sim iframe); keeping CSS-only zoom (can't know the
  available space).
- Status: `npx tsc -p sim` compiles. Not visually checked (the user tests). Unverified: croc clip graphics on vertically stacked pads 15 apart.

### 2026-10-05 — separate white strips per row, wire fix, bigger pads, no labels
- **Wire scramble root cause** (pxtsim `allocPartIRs`/`allocWireIRs`): each pin is mapped to a breadboard row
  `startRowIdx + round((bbFit.yOffset + pinLoc.y) / pinDistance)`, and only rows `>= 7` get the `-2` middle-gap correction.
  Rows 5/6 (the gap) are used as-is. `placeParts` sets `startRowIdx = clamp(floor((12 - rowCount) / 2), 1, 4)`. With height 45
  (3 rows) the part started at row 4, so pins went to rows 5, 6, 7→5: VCC and GND shared a row, and wires ended past the gap,
  away from the pads. The original part never hit this because all its pins were at y = 0 (one row).
- **Fix:** `visual.height` 45→150 (10 rows) ⇒ `startRowIdx = 1`; pads at y = 0 / 22.5 / 45 (GND/DIN/VCC) ⇒ relative rows 0 / 2 (−7.5 offset) / 3
  ⇒ absolute rows 1 / 3 / 4, all in the top half. Pad x = 15 (exactly one column). Rule for future edits: keep every pad's
  `startRowIdx + round(y/15)` below 5.
- Pads enlarged (0.5→0.8·PIN_DIST) and spaced 1.5 rows apart (was 1). Pin labels removed.
- Each wrapped row is now its own strip rect (white, #999 stroke, sized to that row's pixel count), with `NP_ROW_GAP = PIN_DIST`
  between strips. The head uses the same white strip style. The row svg has `overflow="visible"` so the strip strokes are not cut at the edges.
- "Cables a bit too small" was read as the connector/pads being too small; wire/croc graphics come from pxt-core and were not changed.

### 2026-10-05 — pads rotated into a tab on top, strip moved left
- User: wiring is better; move everything left; rotate the connection pins and put them on top (for scaling).
- Pads now sit in one horizontal row on a small tab above the first strip: GND, DIN, VCC from **left to right** at x = 0 / 22.5 / 45,
  y = 0 (the order in which "top to bottom" reads after rotating). All pins share the part's start row, so the middle-gap rule from the
  previous entry is satisfied automatically. The strips hang below the tab, left-aligned with it (`NP_STRIP_LEFT/TOP`), and only they scale;
  the tab and pads stay full size.
- `pxtparts.json`: `width` 390→450 (= all 30 breadboard columns) ⇒ `allocColumns` gives zero padding ⇒ start column index 1
  (column "2"; it never uses index 0). Before it was index 3. `pinLocations`: data (22.5, 0), threeVolt (45, 0), ground (0, 0). `height` stays 150 so the
  tab starts in breadboard row 1 (near the top), leaving room below for the strips.
- `mkStripHead` → `mkStripTab`; `NP_HEAD_*`, `NP_DATA_Y` and `NeoPixelRow.rowHeight` removed.
- Possible next step: shift all pads by −15 (pin x = −15 / 7.5 / 30) to reach column "1"; not done yet.

### 2026-10-05 — sim crash "Cannot read properties of undefined (reading 'id')" fixed
- Stack: `DalBoard.builtinParts.neopixel` ← `CalliopeNeoPixelView.init` ← `BoardHost.addPart`. The view's pin was `undefined`, because
  `pxsim.parsePinString` (`sim/dalboard.ts`, from upstream "Common neopixel (#2782)") only matched `DigitalPin.P<n>`:
  - Calliope names (`C4`–`C20`, `A1_RX`, `A0_SCL`, …) returned `undefined`, and so did the fallbacks `pins.NEOPIXEL`/`pins.MOSI`, which then crashed `state(undefined)`.
  - `P(\d)+` captures only the last digit (`P16` → 6).
  - It indexed `edgeConnectorState.pins[n]`, but index 4 is `LOGO`, so `P4`…`P20` were off by one.
  This bug predates our view (the common `NeoPixelView` has the same init); it shows as soon as a strip uses a non-`P0`–`P3` pin.
- **Fix:** `parsePinString` now takes the enum member name and resolves it through `edgeConnectorState.props.servos` (the name → DAL id map that already lists
  every P/C/A alias), then `getPin(id)`. The view also falls back to an empty `CommonNeoPixelState` instead of crashing if the pin still cannot be resolved.
  The follow-up `removeEventListeners` errors were knock-on effects of the failed board init.
- `"Not enough breadboard space!"` came from `allocColumns` logging when `extraSpace <= 0` (width 450 = exactly 30 columns). It was harmless, but it is now
  avoided with `width` 435 (29 columns): extraSpace 1 ⇒ leftPadding 0 ⇒ start column index still 1, so the placement is unchanged.

### 2026-10-05 — moved to the breadboard's top-left corner
- `placeParts`/`allocColumns` never place a part origin at row or column index 0 (`startRowIdx` is clamped to ≥ 1, and `nextAvailableCol = 1 + leftPadding`).
  That is why the strip sat one row below the top. Pins, however, may lie at negative part coordinates.
- Pads are now at y = −15 and x = −15 / 7.5 / 30 (GND/DIN/VCC) ⇒ breadboard row index 0 (row "j", the top row) and column indices 0 / 2 / 3. The tab and strips
  follow (`NP_PAD_Y`, `NP_TAB_LEFT/TOP` derived from the pads).
- This is the limit. Rows above "j" (power rails) and columns left of "1" have no `getRowName`/`getColumnName` entry, so a wire end there would fail.
  The breadboard's own position below the board is pxt-core's composition (`composeSVG`) and is not configurable per part.

### 2026-10-05 — matrix width from the extension block
- neopixel-BLE's `setMatrixWidth` block now forwards to `pins.setMatrixWidth`, which sets `state.width`, so the view's row length
  follows the block (`cols = state.width > 1 ? state.width : min(n, NP_PIXELS_PER_ROW)`). No change in the target was needed.

### 2026-10-05 — headless check, immediate matrix re-layout
- `sim/state/misc.ts` `pxsim.pins.setMatrixWidth` now calls `runtime.queueDisplayUpdate()`, so a matrix width change re-lays out the strip right away instead of
  on the next `show()`.
- Headless harness (scratchpad `run.js`): main.ts-only projects get an empty `partsList` from the editor (no API info for main-package symbols → `computeUsedParts`
  finds no `parts=`). The harness therefore rebuilds `BoardHost` inside the sim frame with `partsList: ['neopixel']` and the part def from `libs/core/pxtparts.json`.
  Verified with neopixel-BLE's `neopixel.ts`: rainbow 24 LEDs / width 8 → 3 strips; create-only 30 LEDs → 2 strips, unlit; + `setMatrixWidth(8)` → 4 strips.
- Breadboard itself is not drawn in these screenshots (only the wires and the strip); unchanged target behaviour, not investigated.

### 2026-10-05 — fit to height, stable hover, larger zoom for shrunk strips
- **Clipping with small matrix widths:** `fit()` only limited the width; many rows ran off the bottom. Now
  `fit(maxW, maxH)` also limits to `viewBox bottom − NP_BOTTOM_MARGIN − rowY`. Example: 30 LEDs at width 2 = 15 strips, scaled to about 0.24, ends at y 1360 of 1367.5.
- **Hover flicker:** the mouseenter/leave listeners were on the element that gets scaled and shifted. When the clamped zoom moved the strip away from the
  pointer it fired mouseleave → zoom out → strip back under the pointer → mouseenter → … Now `overElement` holds a transparent `hitArea` rect at the
  unzoomed bounds (`.sim-neopixel-hit`, `pointer-events: all`) plus the transformed `zoomGroup`. The listeners stay on `overElement`, so hover lasts while the pointer is
  over either one. Headless check: transform stayed constant across 5 pointer moves inside the strip and cleared on leave.
- **Zoom amount:** max zoom is now `max(2, 1 / fitScale)`, i.e. a strip that was shrunk to fit can zoom back to its natural size (still limited by the visible area).
  Width-2 example zooms 4.67×, filling the visible height. The zoomed strip overlays the board while hovered.

### 2026-10-06 — zigzag matrices
- neopixel-BLE signals zigzag wiring by passing a negative width to `pins.setMatrixWidth` (no new shim, see that repo's notes).
  `NeoPixelRow.layout` now uses `|cols|` and, when `cols < 0`, draws odd rows right to left. The strip rect of a partial reversed row is right-aligned.
