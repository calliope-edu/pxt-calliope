# V3 block fixes + WebUSB-driven simulator variant

Working notes for a batch of fixes on branch `universal_hex_fixes_hugo`:

1. `A1_RX` / `A1_TX` added to the `SerialPin` enum
2. "when shaken" block pictograms restored from `main`
3. "on logo pressed" no longer panics on mini V1/V2
4. servo not moving on P0 on DAL devices
5. simulator switches V1/V2 vs V3 based on the WebUSB-connected device

## Notes

### 2026-09-22 — "on logo pressed" panic on mini V1/V2 (item 3)

- Root cause was already documented in [claude-panic-display.md](claude-panic-display.md):
  `libs/core/logo.cpp` called `target_panic(PANIC_VARIANT_NOT_SUPPORTED)` (code
  **927**) in the `#else` (non-CODAL / DAL) branch of both `onLogoEvent` and
  `logoIsPressed`. Any program containing the block therefore hard-panicked at
  the moment the block ran on a V1/V2 board — and, per that same doc, the panic
  display itself only flickers on the Calliope DAL fork, so the user saw an
  unreadable crash rather than an error code.
- `target_panic` is deliberately kept in the other V3-only libs
  (`libs/audio-recording`, `libs/audio-samples`, `libs/core/music.cpp`,
  `soundexpressions.cpp`, `touchmode.cpp`) — out of scope for this change.
- `libs/blocksprj/built/yt/source/core/logo.cpp` is **build-cache output**, not a
  second source copy; it is regenerated and must not be hand-edited.

### 2026-09-22 — `A1_RX` / `A1_TX` in `SerialPin` (item 1)

- `SerialPin` (`libs/core/serial.cpp`) had only `P16` and **no `P17` member at all**,
  so the Calliope v3 A1 grove/UART pins were not selectable in `serial redirect`.
- `DigitalPin` and `AnalogPin` (`libs/core/pins.cpp:128,137,257,266`) already carry
  `A1_RX`/`A1_TX` aliases; `SerialPin` was simply never updated to match.
- Pin ids: v3 codal defines `MICROBIT_ID_IO_A1_RX == ID_PIN_P16 == 116` and
  `MICROBIT_ID_IO_A1_TX == ID_PIN_P17 == 117` — numerically identical to the legacy
  `MICROBIT_ID_IO_P16/_P17`, so aliasing is safe on every variant. Verified by
  compiling the enum standalone: `A1_RX=116 A1_TX=117 P16=116`.
- `tryResolvePin()` (`serial.cpp:152`) needed **no** change: it falls through to the
  generic `getPin()`, which already maps 116/117 to `uBit.io.A1RX`/`A1TX` on codal and
  `P16`/`P17` on DAL (`pins.cpp:361-375`, keyed off `#ifdef MICROBIT_ID_IO_A1_RX`).
- Locale strings `SerialPin.A1_RX|block` / `A1_TX|block` already existed at
  `libs/core/_locales/core-strings.json:311-312` (auto-extracted) — no edit needed.

### 2026-09-22 — "when shaken" pictograms (item 2)

- Root cause: `libs/core/gestures.jres` on this branch was the **micro:bit upstream**
  icon set (16,123 B, blob `05a112f2`), pulled in by commit `c20efd59` ("Add field
  gesture and field images for the different gestures", a pxt-microbit PR #803).
  `main` carries the **Calliope** set (53,883 B, blob `2df143ab`).
- All 11 icons differed: micro:bit art uses pure cyan `#00FFFF` with a heavier board
  outline; Calliope art uses teal `#42C9C9` with a finer outline.
- `fieldeditors/` is byte-identical to `main` — the field editor (`FieldGestures` in
  `fieldeditors/field_gestures.ts`) was never the problem, only the image payload.
- The same 53,883 B blob is on `main` *and* on the microsoft upstream bump branches, so
  restoring from `main` is non-divergent.

### 2026-09-22 — servo not moving on P0, DAL only (item 4)

**Root cause: an off-by-initialiser bug in the vendored mbed-classic nRF51 PWM HAL
that can only ever affect P0.**

`mbed-classic/targets/hal/TARGET_NORDIC/TARGET_MCU_NRF51822/pwmout_api.c:45`:

```c
static PinName pwm_pins[PWM_CHANNELS] = {NC};   // PWM_CHANNELS == 3
```

That initialises **only element 0** to `NC`; C zero-fills elements 1 and 2. `NC` is
`0xFFFFFFFF` but `P0_0` is `0` (`PinNames.h:66,163`), and on the Calliope P0 *is* nRF
`P0_0` (`MicroBitPin.h:42`). So at boot the channel table reads `[NC, P0, P0]` — channels
1 and 2 spuriously appear to be already assigned to P0.

`pwmout_init()` (`:213`) and `pwmout_pulsewidth_us()` (`:317`) both do
`pwm_get_channel(pin)` first and only run `pwm_connect()` inside `if (channel == NC)`.
For P0 the lookup matches the bogus slot 1 and returns it, so `pwm_connect()` — the only
place the GPIOTE/PPI routing that physically toggles the pin is set up — is **never
called**. P0 therefore emits no PWM at all.

The failure is silent because `PINOP` (`pins.cpp`) discards the DAL return code, so
`MICROBIT_NOT_SUPPORTED` / a dead channel look identical to success from TypeScript.

**P0 is the only pin that can hit this**, because it is the only one whose `PinName` is 0
and therefore collides with the zero-filled array elements. That matches the report
exactly (servos work on P1/P2, not on P0).

Verified by extracting the real HAL logic into a standalone C model
(`pwm_get_channel`/`pwm_allocate_channel`/`pwm_disconnect`/`pwmout_pulsewidth_us`):
- boot state `[NC, 0, 0]` -> first servo write to P0 resolves to channel 1, never
  connected -> **pin dead**;
- after the fix below -> resolves to channel 0 with `pwm_connect()` run -> **works**;
- P1 and the other pins are unaffected either way.

Ruled out along the way (all previously plausible):
- *Missing analog capability*: no. DAL P0 is `PIN_CAPABILITY_STANDARD`
  (`MicroBitIO.cpp:51`), which **includes** `PIN_CAPABILITY_ANALOG_OUT` (0x08), so the
  capability gate in `setServoValue`/`setServoPulseUs` passes. The `//PAD0 (DIGITAL)`
  comment there is misleading — it means "no analog *in*".
- *P0 shared with the speaker/motor*: no. On v1/v2 the DRV8837 is on P0_28/29/30
  (`MicroBitPin.h:64-66`); `analogPitch()`'s DAL branch drives `MOTOR_IN1`, not P0.
- *`getPin()` special-casing or returning NULL for P0*: no, it is a plain
  `case MICROBIT_ID_IO_P0: return &uBit.io.P0;` (`pins.cpp:339`).
- *PWM channel starvation (3 channels, LRU eviction)*: real, and a genuine second-order
  hazard when audio/motors are also active, but it does not explain a servo failing on
  P0 in a program that does nothing else. The initialiser bug does, and it explains the
  P0-specificity, which starvation does not.

Related, and deliberately **not** changed (pre-existing, out of scope, worth a follow-up):
- `DynamicPwm::period` is a `static` class member (`DynamicPwm.h:43`) mirroring the
  global `pwm_period_us`; the header says outright *"Any changes to the period will
  AFFECT ALL CHANNELS."* So a tone and a servo overwrite each other's PWM period, and
  `pwmout_period_us()` rescales existing channels' pulse widths — a 1500 us servo pulse
  becomes ~170 us when a 440 Hz note retunes the module. Servo + sound on DAL is
  therefore unreliable independently of this fix.
- `servos.C18` / `pins.C18` is a hard no-op on DAL: `getPin()`'s `P18` case sits inside
  `#if MICROBIT_CODAL` (`pins.cpp:379`), so it returns NULL on v1/v2.
- `getPin()` returns NULL for `M_A_IN2`(153)/`M_B_IN2`(155) on DAL.
- `libs/core/dal.d.ts:214-217` ships the CODAL `PIN_CAPABILITY_*` values, which
  contradict the DAL's; nothing reads them from TS today.

### 2026-09-22 — simulator follows the WebUSB-connected board (item 5)

Most of the machinery already existed; only two links were missing.

- The sim already renders both boards, selected purely by `DalBoard.hardwareVersion`
  (2 or 3) — `sim/visuals/board-svg.ts` `BOARD_MINI2_BODY` / `BOARD_MINI3_BODY`, consumed
  at `sim/visuals/microbit.ts:2329`. `boardDefinition.visual` is always `"microbit"` and
  plays no part.
- `pxtarget.json:634` already sets `"matchWebUSBDeviceInSim": true`, which makes pxt-core
  pass the connected device's `devVariant` into the simulator run message as `theme`
  (confirmed in `node_modules/pxt-core/built/web/main.js`: `theme:k` where `k` comes from
  `pxt.packetio.deviceVariant()`, i.e. `PacketIOWrapper.devVariant`).
- `editor/flash.ts` already derives the variant: `"mbcodal"` for v3 (from the DAPLink
  board-id probe in `DAPWrapper.reconnectAsync`, `flash.ts:336`), `"mbdal"` for v1/v2
  (v2 being the SEGGER J-Link at `0x1366/0x1025`).
- **Missing link 1**: `sim/dalboard.ts` ignored `msg.theme` and always used the
  localStorage toggle value.
- **Missing link 2**: `theme` is only computed when the sim *runs*, so plugging a board in
  while the sim was already running changed nothing until the next run.

Caveat recorded: `devVariant` collapses v1 and v2 to `"mbdal"`, and the sim only models
revisions 2 and 3, so a connected **v1 renders as the v2 board**. That is correct for the
simulated feature set (v1 and v2 share the mbdal build), but the sim cannot distinguish
v1 from v2 today. The USB id could (non-CODAL DAPLink = v1, J-Link = v2) if that
distinction is ever wanted, but it would need a third sim board state.

## Decisions

### 2026-09-22 — Logo blocks degrade to a silent no-op on DAL (item 3)

Decided: in the non-CODAL branch, `onLogoEvent` ignores the handler registration
(`(void)action; (void)body;`) and `logoIsPressed` returns `false`, instead of
panicking.

Why: the user's requirement is that the block "just be ignored and do nothing" on
mini V1/V2. A program built from a shared/universal hex can legitimately contain
V3-only blocks; crashing the whole program because one unsupported event source
was registered is disproportionate. Returning `false` for "logo is pressed" is
the truthful answer on a board with no touch logo — the condition simply never
becomes true.

Alternatives considered and rejected:
- *Fix the panic display instead* (make 927 readable on DAL): addresses the
  symptom's legibility, not the requirement; the program would still stop.
- *Compile the block out for DAL variants* (hide it from the toolbox per
  variant): the block must stay present so one project/hex can target all board
  revisions; hiding it would break shared projects.
- *Register the handler against a dummy/never-firing event id*: equivalent
  behaviour to the no-op but adds a live event registration for no benefit.

### 2026-09-22 — Restore `gestures.jres` wholesale from `main` (item 2)

Decided: replace `libs/core/gestures.jres` with `main`'s version via
`git show main:libs/core/gestures.jres > libs/core/gestures.jres` (content restore, not
`git checkout`, to avoid a destructive index operation).

Why: the file is a pure asset payload keyed by gesture name; the branch's copy was an
accidental import of the micro:bit art. Restoring the whole file is exactly the intent
("should take them from the main branch") and keeps this branch aligned with both `main`
and upstream.

**Open question deliberately left alone:** `main` pairs the `tiltforward`/`tiltbackwards`
artwork with the labels "tilt forward"/"tilt backward", whereas this branch labels those
two `Gesture` members "logo up"/"logo down" (`libs/core/enums.d.ts:104,110`). The icons
now restored are tilt-oriented drawings. The user asked only for the pictograms, so the
labels were **not** changed — but the dropdown will show tilt artwork under logo wording
for those two entries. Flag for the user to decide.

### 2026-09-22 — `SerialPin` gets aliases, not a rename (item 1)

Decided: add `A1_RX`/`A1_TX` as additional members alongside the existing `P16`, with a
`#ifndef MICROBIT_ID_IO_P17` fallback guard, rather than renaming `P16` -> `A1_RX`.

Why: renaming would break every existing project that saved `SerialPin.P16`. Aliasing
mirrors what `DigitalPin`/`AnalogPin` already do for the same physical pins. The guard is
required because v3 codal does not define `MICROBIT_ID_IO_P17` (it only defines
`MICROBIT_ID_IO_A1_TX`), so without it `serial.cpp` would not compile for the mbcodal
variant.

Note: `libs/core/enums.d.ts` is auto-generated (`pxt buildshims`) but is checked into git
and only rewritten during a native compile, so it was hand-edited to match, consistent
with how the existing `A1_RX` entries in that file were introduced.

### 2026-09-22 — Fix the P0 servo bug in our code, not in the vendored HAL (item 4)

Decided: add a one-shot `primeP0Pwm()` in `libs/core/pins.cpp`, compiled only for
`#if !MICROBIT_CODAL`, and call it from `analogWritePin`, `servoWritePin` and
`servoSetPulse` via a `PRIME_P0_PWM(name)` macro (a no-op on CODAL). It runs once, only
for P0, and issues three `setAnalogValue(0)` calls; `pwmout_pulsewidth_us(0)` takes its
`us == 0` path, which calls `pwm_disconnect(pin)` and resets a stale slot to `NC`. One
pass per potentially-bogus slot clears the table, after which the normal
`pwm_connect()` path runs and P0 works for the rest of the session.

Why this shape:
- **mbed-classic is not ours to patch.** It is pulled transitively at build time by the
  DAL (`githubCorePackage: calliope-mini/microbit`, `gittag: v2.2.0-rc6-calliope-3`);
  the copy under `libs/blocksprj/built/yt/yotta_modules/` is a build artifact that gets
  overwritten. A fix there would not survive a clean build.
- Driving the HAL through its **public** `setAnalogValue(0)` entry point means we rely
  only on documented behaviour, not on reaching into HAL statics.
- `p0PwmPrimed` is set **before** the `setAnalogValue` calls, because those re-enter
  `pins::` code paths; setting it first makes the priming strictly one-shot.
- Guarded to DAL only: the v3 CODAL PWM implementation is entirely different and does
  not have this bug, so the macro compiles to nothing there.

Alternatives considered and rejected:
- *Fix `pwm_pins[] = {NC}` upstream in the Calliope DAL fork*: the correct long-term fix
  and worth upstreaming, but it lives in mbed-classic (a dependency of the DAL fork), and
  this repo cannot carry it. Noted here for a follow-up.
- *Prime P0 eagerly at boot*: rejected — it would drive P0 at analog 0 in every program,
  including ones that use P0 as a digital input, for a bug most programs never hit.
- *Make `PINOP` propagate DAL error codes*: worth doing for diagnosability (the silence
  is what made this hard to find), but it is a broad change to every pin API and would
  not by itself fix the dead channel.
- *Special-case P0 in `getPin()`*: wrong layer; the pin object is fine, it is the HAL's
  channel bookkeeping that is corrupt.

### 2026-09-22 — Connected device wins over the in-sim toggle (item 5)

Decided:
1. `sim/dalboard.ts` gains `hardwareVersionFromTheme()`, mapping `"mbcodal"` -> 3 and
   `"mbdal"` -> 2 (0 = no device). `initAsync` uses it first and falls back to the
   persisted toggle: `connectedVersion || readSimHardwareVersion()`.
2. `editor/flash.ts` `CalliopeWrapper` calls a new `syncSimulatorWithDevice()` **after**
   `reconnectAsync()` completes, which restarts the simulator when the detected variant
   changes. `editor/extension.tsx` hands `flash.setProjectView(opts.projectView)` so the
   wrapper can call `IProjectView.restartSimulator()`.

Why: a physically connected board is a stronger statement of intent than a remembered
toggle click, so it takes precedence; with nothing plugged in the toggle still works
exactly as before. The restart is gated on an actual change of variant so reconnects and
re-enumerations do not restart the sim repeatedly.

Why after `reconnectAsync()` specifically: `DAPWrapper` only learns whether the board is
CODAL or DAL during its reconnect probe (`usesCODAL` is `undefined` until `flash.ts:336`),
so syncing at raw USB-connect time would read an undefined variant.

Alternatives considered and rejected:
- *Have the sim poll for a connected device*: the sim iframe has no packetio access.
- *Post a `restart` message from `flash.ts` via `parent.postMessage`*: wrong direction —
  `flash.ts` runs in the editor, not in the sim iframe. `IProjectView.restartSimulator()`
  is the supported editor-side API. (An initial draft used `postMessage`; corrected.)
- *Re-render the board in place instead of restarting*: `BaseBoard.updateView()` is a
  no-op stub in pxt-core and the artwork is built once in `buildDom`, so there is no
  partial re-render path. Restart is what the existing in-sim v2/v3 toggle already does.


### 2026-09-22 (follow-up) — P0 primer simplified to a single call

Re-reviewed the fix after asking whether it was really the least invasive option.

Correction to the note above: the primer does **not** need one pass per stale slot. A
single `setAnalogValue(0)` reaches the HAL twice and clears both bogus entries:
`obtainAnalogChannel()` constructs a `DynamicPwm`, whose `pwmout_init()` matches stale
slot 1 and calls `pwmout_pulsewidth_us(0)` -> `pwm_disconnect()` (frees slot 1); then
`PwmOut::write(0)` calls `pwmout_pulsewidth_us(0)` again (frees slot 2). Table becomes
`[NC,NC,NC]`. Verified with a faithful C model of `obtainAnalogChannel` +
`pwmout_init`/`pwmout_pulsewidth_us`/`pwm_alloc`/`pwm_disconnect`: one pass is enough, and
the subsequent servo write allocates channel 0 with `pwm_connect()` actually run.

The loop of three was therefore harmless but dead weight; reduced to one call.

Also reconsidered and rejected as alternatives:
- *Call `MicroBitPin::disconnect()`*: it is private, and its `DynamicPwm` destructor
  (`pwmout_free` -> `pwm_disconnect`) frees only **one** slot, so it would not clear the
  table anyway.
- *Only prime in `servoWritePin`*: `analogWritePin` on P0 is broken by the identical
  mechanism, so the primer belongs on every PWM entry point.


### 2026-09-22 (follow-up) — why the sim did not update live: three separate blockers

Item 5 did not work on hardware at first. Three distinct problems, found in order, each
hidden behind the previous one. Recording all three because each fix looks wrong/redundant
without the reason.

**(a) The hook was on a method that never runs.** It was on
`CalliopeWrapper.reconnectAsync()`. But `pxt.packetio.initAsync()` (pxt-core) only
*constructs* the wrapper and assigns callbacks -- it never calls `reconnectAsync()`. The
connection is established further down, inside `DAPWrapper`'s own init. Moved the call to
the two paths that genuinely run, each placed right after the board revision becomes known:
`DAPWrapper.reconnectAsync` just after `initialized = true` (the `usesCODAL` DAPLink probe
is ~20 lines earlier), and the J-Link success path (always a v2).

**(b) The diagnostic log was invisible.** `log()` in `editor/flash.ts` routes through
`pxt.debug`, which is suppressed unless the editor runs in debug mode. The absence of the
log line was therefore *not* evidence that the hook had not run -- it was misread as such.
The sim-sync lines now use `pxt.log`.

**(c) `restartSimulator()` can never change the board.** pxt-core:
```js
0 == this.state.simState || this.debugOptionsChanged()
    ? this.startSimulator()   // rebuilds run options -> computes `theme`
    : h.driver.restart()      // replays the CACHED run message
```
With the sim already running it takes `driver.restart()` (`stop -> cleanupFrames ->
start`), which replays cached options. `theme` (the device variant) is computed *only*
while run options are rebuilt, so a restart cannot switch the board however correct
everything upstream is.

But `startSimulator()` alone is refused too: `shouldStartSimulator()` returns false for
`simState` 2 (starting) and 3 (running) -- observed as the log line
`Ignoring call to start simulator, either already running or we shouldn't start.`

Final shape: `stopSimulator()` then `startSimulator()`. `stopSimulator()` sets
`simState: 0` through `setStateAsync`, which unblocks the start and makes it rebuild the
run options. Because that state reset is a React async update, the start is chained off the
promise `stopSimulator()` returns rather than called in the same tick.

Accepted trade-off: this interrupts a running simulated program on connect. Confirmed with
the user as acceptable -- the alternative is the sim continuing to show the wrong board.


### 2026-09-29 — device swapping: the `devVariant` getter lies

Initial connection worked, swapping boards did not. Console showed the variant flapping:
`mbdal` -> `mbcodal` -> `mbdal` for a single V3 device.

Root cause: `DAPWrapper.devVariant` (`editor/flash.ts:254`) is

```ts
get devVariant() {
    if (this.usesCODAL === undefined)
        console.warn('try to access codal information before it is computed')
    return this.usesCODAL ? "mbcodal" : "mbdal";
}
```

`usesCODAL` is reset to `undefined` on **every** disconnect (`flash.ts:104`), and
`undefined` is falsy -- so between a disconnect and the next DAPLink probe the getter
reports **`"mbdal"`** for any board, including a V3. It only warns; it does not withhold a
value. During a swap that bogus `"mbdal"` was published to the simulator, and the dedupe
guard then latched it.

Fix (one line): at the call site, pass the value that was *just probed* rather than going
through the getter --
`syncSimulatorWithDevice(this.usesCODAL ? "mbcodal" : "mbdal")`. At that point in
`reconnectAsync` the probe has completed, so the value is real. The bogus intermediate
variant is never published.

The J-Link call site needed no change: it sits inside the `jlink: ready` success path, so
it only fires for a genuinely connected v2. (The `claimInterface: An operation that changes
interface state is in progress` error seen while swapping throws *before* that point.)

Also simplified while here: the dedupe state is now a single `simVariant` tracking **what
the simulator is currently showing**, rather than what was last connected. That is the
property that actually matters, and it makes an explicit reset-on-disconnect hook
unnecessary -- reconnecting the same board is a no-op, swapping revisions always re-runs.
Verified across five scenarios (fresh v3, swap to v2, replug same v2, swap back to v3,
spurious empty variant).


### 2026-09-29 — simulator tilt: breadboard lag + wrong hover area

Two reported symptoms, **one root cause each**, both fixed by porting the current
`pxt-microbit` implementation of `attachAccelerometerEvents` (this fork still carried the
old upstream version; micro:bit has since rewritten it).

**Symptom 1 — hovering the breadboard tilts the whole device.**
The old code attached the tilt listener to the board's own `<svg>` (`this.element`). That
is fine with no breadboard, where the board svg IS the top-level element. But when a
breadboard is present, pxt-core's `composeSVG()` nests the board svg inside a larger host
`<svg>` that also holds the breadboard and the wire layers -- and events on that subtree
still reach the listener, so hovering the breadboard tilted the board. micro:bit instead
listens on `document` and computes the board's on-screen rectangle explicitly, then
`handleMove()` bails out (starting the tilt decay) when the pointer is outside it.

**Symptom 2 — laggy while the breadboard is shown.**
The old handler called `this.element.getBoundingClientRect()` on **every** `mousemove`,
which forces a synchronous layout/reflow each time; with the bigger composed breadboard
SVG that reflow is much more expensive, which is exactly why it was worse than micro:bit
and worse than without a breadboard. Two further problems: the board carries a CSS
`transform` for the tilt effect, so its client rect is not even a stable reference frame;
and the decay ran on `setInterval(..., 50)` rather than being frame-synced.

The ported version derives the board rectangle from the (untransformed) `viewBox` aspect
ratio plus `document.body`'s box -- no per-move layout of the transformed element -- and
drives the decay with `requestAnimationFrame` / `cancelAnimationFrame`.

Kept deliberately (Calliope-specific, not in micro:bit): the `this.props.disableTilt`
guard on both handlers and in `updateTilt()`.

Note `updateTilt()` already had equivalent parent-svg logic inline (it tilts the
composition host when breadboarding so the wires move with the board), so no change was
needed there; the new `findParentElement()` helper mirrors micro:bit's and is used by the
move handler.


### 2026-09-29 (follow-up) — two per-frame costs investigated, then REVERTED

A second comparison pass against pxt-microbit found two things in `updateState()` (which
runs on every display update, i.e. every LED change) that looked like avoidable per-frame
cost when a breadboard is shown:

1. `bringControlsToFront()` ended in an unconditional
   `host.appendChild(this.buttonGroup)`, re-inserting a live node (and dirtying layout)
   every frame. Tried guarding it with `if (host.lastChild !== this.buttonGroup)`.
2. `updateGestures()` contained a second `abEl.getBBox()` whose result was unused (both
   consuming lines commented out). `getBBox()` forces a synchronous layout. Tried removing
   it.

**Both were reverted**: measured on hardware/in the browser, behaviour and perceived
performance were unchanged, so neither earned its place. The file is back to carrying only
the tilt port (the change that did produce the improvement).

Recorded so this is not re-investigated: these two are real per-frame DOM/layout touches
and the reasoning above is sound, but they are **not** where the remaining breadboard cost
lives. If sim performance is revisited, look elsewhere first — most likely the per-frame
LED/pin update work or pxt-core's own breadboard/wire rendering, not these two call sites.


### 2026-09-29 — shake animation did not move the breadboard/cables

Symptom: the simulator's shake button shook the board only; the breadboard and wires stayed
put. Hover-tilt already moved them, which was the clue.

Cause: an asymmetry between the two code paths.
- `updateTilt()` picks its target deliberately: when breadboarding, the board `<svg>` is a
  child of the composition host `<svg>` that also holds the wire layers, so it transforms
  **the host** (and clears the board's own transform) so the cables follow.
- `playGestureAnimation()` always added the CSS animation class to `this.element`, the
  **board's own** `<svg>`. So only the board animated.

Fix: reuse the exact same host-detection in `playGestureAnimation()` --
`const boardEl = (host || this.element)`. No CSS change needed: the rules are written as
`svg.<key>_animation` and the composition host is an `<svg>` too, so they match either
target. The `MB_STYLE` `<style>` element lives inside the board svg but SVG `<style>` is
not scoped (no shadow DOM), so its rules apply to the host as well.

This also makes the existing `onDone` handoff correct: it removes the animation class and
calls `updateTilt()` to restore the tilt transform. Previously the animation was on the
board while the tilt transform was on the host, so the two never coordinated; now they act
on the same element.

Applies to every gesture animation, not just shake (tiltleft/right, freefall, 3g/6g/8g,
...) -- they all go through `playGestureAnimation()`.


### 2026-09-29 — fan out even/odd GPIO pins so cables can be traced

Request: offset every even-numbered pin cable connector one way and odd ones the other, so
cables sharing a breadboard column can be told apart.

Implementation: `MicrobitBoardSvg.getCoord()` is the single function pxt-core calls to
place a wire endpoint (`BoardHost.getPinCoord()` -> `this.boardView.getCoord(pinNm)` ->
`getLocCoord()`), so the nudge is applied there via `fanOutPinCoord()`. No change to the
artwork or to the coordinate maps.

Even pins sit on the lower row (SVG y grows downward), so evens move **+y** and odds
**-y** -- both away from the other row, never crossing. Offset 3.2, about 18% of the row
gap: enough to separate the two cable bundles, small enough that each wire still visibly
lands on its pad. Row gap 17.2 -> 23.6.

Scope: only numbered GPIO connector pins, matched with `/^(?:C_)?P(\d+)$/`. Verified
against the whole `pinNames` list that this matches the connector pins and **no** others --
`TOUCH_P0..TOUCH_P3` (which a looser regex would wrongly catch), `TOUCH_LOGO/GND/VCC`,
`BTN_A/B`, `GND1-3`, `VCC`, `M0/M1 plus/minus`, `VMplus` and the Grove pads `G_A0_*` /
`G_A1_*` all keep their exact positions.

#### Two corrections before it worked

**(a) Wrong scale.** The first attempt used a per-board offset of 1.1 (v3) / 3.2 (v2),
sized from the `C_Pnn` entries in `pinNmToCoord` (pitch ~6.19, row gap 6.27). **Wires never
resolve to those keys.** `pxtarget.json`'s `gpioPinMap` maps every GPIO -- including the
`C4`..`C20` and `A1_RX`/`A0_SCL` aliases -- onto the bare names `P0`..`P20`, and
`pinNmToCoord` has a *separate* set of bare `P0..P20` entries at pitch 17.1 / row gap 17.2,
the same scale as v2's `pinCoordsV2` (17.5 / 17.6) and ~3x the `C_Pnn` scale. The v3 offset
was ~6% of the real gap, so invisible. Fixed with one shared constant for both boards.

**(b) Wrong axis -- the actual reason nothing moved.** Even at the right magnitude, a **y**
offset is discarded. `WireFactory.drawWire()` (pxt-core) routes the board end of a wire
through

```js
const h = e => { const n = PIN_DIST/2; let i = this.closestEdge(e);
                 return [e[0], i - e[1] < 0 ? i - n : i + n]; }
```

i.e. it **replaces** the y with a value derived from the nearest board edge
(`closestEdgeIdx` picks that edge by y distance alone) and keeps only `e[0]`. So the pin's
own y never reaches the drawn wire; worse, a y nudge can flip which edge a pin snaps to.

Confirmed empirically by temporarily logging from `getCoord()`. The offset *was* being
applied correctly all along:
```
[fanout] getCoord(P0) hwv=3 in=398.9 out=402.1     even, +3.2
[fanout] getCoord(P3) hwv=3 in=381.7 out=378.5     odd,  -3.2
[fanout] getCoord(GND) hwv=3 in=398.9 out=398.9    untouched
```
...and then thrown away downstream. **Lesson: verify which coordinate component survives
pxt-core's routing before sizing an offset.**

Final: offset on **x**, 4.3 (~25% of the 17.1 pin pitch). Even pins +x, odd -x. Since the
even and odd pin of a column share the same x, this splits them by 8.6 while leaving 8.5 to
the neighbouring column -- evenly spread, no overlap. The temporary logging was removed.


### 2026-09-29 — tidy-up after the simulator work

Removed:
- The temporary `[fanout] getCoord(...)` `console.log` in `sim/visuals/microbit.ts`, added
  to find out which coordinate component survives pxt-core's wire routing.
- `pxt.log("simulator: projectView registered/missing")` in `setProjectView()` -- it only
  existed to confirm the wiring during debugging and fired once per editor load.
- The narration on the `if (!projectView)` branch in `syncSimulatorWithDevice()`; the guard
  itself stays, now a one-liner.

Deliberately kept:
- `pxt.log("simulator: matching board to connected device (<variant>)")` -- one line, only
  on an actual board-revision switch, and the thing that makes this feature verifiable
  without debug mode.
- The two `catch` logs around the stop/start, so a failed restart is not silent.
- The long comments on the tilt handler and on `fanOutPinCoord`. Both explain a choice that
  looks wrong at a glance (listening on `document` rather than the board; offsetting x when
  the pins are separated vertically) and would otherwise invite a "fix" that reintroduces
  the bug.

Verified no scratch files landed in the repo: the C/Python models used to reason about the
PWM HAL and the pin geometry were all written to the session scratchpad, outside the tree.

Working tree at the end of this session contains only the simulator work
(`editor/extension.tsx`, `editor/flash.ts`, `sim/dalboard.ts`, `sim/visuals/microbit.ts`)
plus these notes; items 1-4 were committed earlier as `4b41bcf6` and `8cf96153`.

## Follow-ups (not done)

- Upstream the `pwm_pins[PWM_CHANNELS] = {NC}` initialiser fix to the Calliope DAL /
  mbed-classic fork; the in-tree workaround can then be dropped.
- Decide whether the two `Gesture` labels "logo up"/"logo down" should become
  "tilt forward"/"tilt backward" to match the restored artwork (item 2).
- Consider making `PINOP`/`PINREAD` surface DAL error codes, at least under a debug
  build — the silent discard is what hid the P0 bug.
- `pins.touchSetMode` (`libs/core/touchmode.cpp:49`) still calls
  `target_panic(PANIC_VARIANT_NOT_SUPPORTED)` on v1/v2, same family of problem as the
  logo block but outside the requested scope.
