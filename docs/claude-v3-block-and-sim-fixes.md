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

## 2026-09-29 — start page replaced with master's content

Request: replace the start page (tutorials, manuals) with the contents of branch `master`.

### Why the start page was wrong

`universal_hex_fixes_hugo` inherited the **micro:bit** start page from the v9 merge: 26
galleries pointing at `microbit-org/*`, `projects/games`, `courses/*`, etc. Most of those
docs do not exist for Calliope, which is the source of the `404` flood seen in the browser
console (`/api/md/calliopemini/deep-dive`, `.../projects/music`, ... all 404).

`master` (b9d5a6e3, the v8.1.15 Calliope line) carries the real Calliope start page:
4 galleries -- Tutorials, Workbook (Arbeitsheft), Jacdac, Calliope Links.

### What changed

- **`docs/`**: replaced wholesale with master's tree (user chose full replacement over a
  start-page-only subset). 817 files written, 1489 HEAD-only files removed. Verified
  byte-for-byte against `master:docs/`: 0 missing, 0 content mismatches, 0 stray files.
  Restores `docs/calliope/` (36 files: German Arbeitsheft, firststeps, templates) and
  `docs/static/calliope/` (119 assets), both entirely absent from HEAD.
- **`targetconfig.json`**: `galleries` replaced with master's 4. Only that key -- `packages`
  and `electronManifest` also differ but govern the extension registry and the desktop app,
  not the start page, so they were left alone.
- **`pxtarget.json`**: `appTheme.homeScreenHero.url` `/projects/flashing-heart` ->
  `/calliope/firststeps/firstSteps` (master's value). `homeUrl`, `docMenu`,
  `homeScreenHeroGallery` and the hero image already matched master.

**`docs/claude-*.md` were explicitly preserved** -- master has no copies, so a naive
replacement would have deleted all 7 project-notes files.

### Verification

- Both JSON files parse.
- All 4 galleries, the hero page, the hero image and the hero gallery resolve to files
  that exist.
- Walked every `codecard` block in the 4 galleries: **44 cards, 0 broken target pages,
  0 missing images**.
- Checked before starting that master has its own copies of the 7 `/projects/*` tutorial
  pages its Tutorials gallery links to, so replacing `docs/` does not orphan them.

### Notes / gotchas

- `git checkout <branch> -- <path>` is blocked in this environment; the replacement was
  done by extracting each file with `git show master:<path>` and writing it, plus explicit
  deletion of HEAD-only files. Content equality was then verified directly against the
  master blobs rather than trusting `git diff` (which compares against the index, and so
  reported ~210 spurious "deletions" for unstaged new files).
- `docs/SUMMARY.md` and `docs/index.md` do not exist on master either -- their absence
  after the swap is faithful, not damage.

### 2026-09-30 — follow-up: "We could not load the documentation"

After the `docs/` replacement the 4 galleries rendered, but opening help failed with
*"Ups — We could not load the documentation"*.

Cause: **`docs/SUMMARY.md` does not exist on `master`**, so the wholesale replacement
deleted it. pxt uses `SUMMARY.md` as the documentation table of contents (`pxt checkdocs`
reports "no SUMMARY file found" / "not in SUMMARY" without it), and the docs viewer cannot
resolve pages without a TOC. `docs/reference.md` (the reference landing page) was lost the
same way — also absent on master, present on HEAD.

Fix:
- **`docs/reference.md`** restored verbatim from HEAD. It is generic API-category content
  (```namespaces``` blocks), with no micro:bit-specific links, so it is Calliope-safe.
- **`docs/SUMMARY.md`** regenerated rather than restored. HEAD's version is micro:bit
  specific: of its 356 internal links, **181 pointed at `/projects/*` pages that master's
  docs do not contain**, and its support link was `support.microbit.org`. Restoring it
  verbatim would have recreated exactly the broken-link problem this task set out to fix.
  Instead it was pruned to the links that actually resolve (176, all verified), the support
  link repointed at `calliope.cc/en/impressum` to match `docMenu`, empty sections dropped,
  and the `[Reference](/reference)` parent re-added.
- **`docs/calliope/templates/SUMMARY.md`**: fixed a pre-existing typo inherited from master
  — it linked `/boards/calliope-mini-v1` and `-v2` but the files are `calliope-mini-1.md` /
  `-2.md`.

Verification: `pxt checkdocs` now reports **0 "not in SUMMARY"** and no SUMMARY-level broken
links (was 2). The 23 remaining broken links are in-page links inside doc bodies, inherited
from master, not TOC problems.

Not a bug: the headings appear in German ("Anleitungen" for "Tutorials") because the editor
is running in German and all four gallery names are registered translatable strings in
`built/target-strings.json`. The live translation service supplies the German text — this
confirms the new gallery config is being picked up correctly.

**Lesson for wholesale branch-to-branch directory replacements:** check for infrastructural
files that exist only on the destination side. `SUMMARY.md` and `reference.md` are not
content, they are what makes the docs viewer work, and neither exists on `master`.

### 2026-09-30 — the remaining doc 404s are a local-dev routing rule, not missing files

Symptom after the SUMMARY/reference restore: help still failed, and the console showed

```
GET https://www.makecode.com/api/md/calliopemini/reference/input/on-button-event ... 404
GET https://www.makecode.com/api/md/calliopemini/calliope/arbeitsheft ... 404
```

Note the host: **www.makecode.com**, not `localhost:3232`. The files are fine; the browser
is asking the wrong server.

Cause, in pxt-core (`built/web/pxtlib.js`):

```js
apiRoot = BrowserUtils.isLocalHost() || isNodeJS
    ? "https://www.makecode.com/api/"   // local dev hits the REMOTE api
    : "/api/"
```

`isLocalHost()` is true for `http://localhost:<port>/` (also 127.0.0.1, 192.168.x.x,
`*.local`) **unless the URL contains `nolocalhost=1`**. So on a `pxt serve` session, pxt
deliberately fetches markdown from the published makecode.com, on the assumption that the
target's docs are live there. For this target they are not:

```
https://www.makecode.com/api/md/calliopemini/calliope/tutorials            -> 404
https://www.makecode.com/api/md/calliopemini/reference/input/on-button-event -> 404
```

The second one is a *stock* page that exists in every micro:bit target — it 404s too, which
shows makecode.com does not serve the `calliopemini` target at all. Every doc request fails
there no matter what is in `docs/`.

The local server does serve the docs correctly:

```
http://localhost:3232/calliope/tutorials            -> 200
http://localhost:3232/reference/input/on-button-event -> 200
```

(`/api/md/...` returns a bare `Error 403` to curl because pxt's dev server guards `/api/`
routes with the `localToken` from `~/.pxt/config.json`; the browser sends it, curl did not.)

**Workaround for local testing:** append `nolocalhost=1` to the editor URL, e.g.
`http://localhost:3232/?nolocalhost=1`. That makes `isLocalHost()` false, so `apiRoot`
becomes `/api/` and docs are fetched from the local server.

This is pre-existing pxt-core behaviour, unrelated to the start-page change — the same
404s appear for stock micro:bit reference pages. Nothing in `docs/` needs fixing for it.

### 2026-09-30 — why `nolocalhost=1` on the editor URL did not help

`nolocalhost=1` works, but it has to be on the URL of the frame that makes the request.

The side-docs panel is an **iframe** whose src is `pxt.webConfig.docsUrl || "/--docs"`
plus a `#`-fragment (`--docs#doc:/reference/input/on-button-event:blocks:live-de`), built in
pxt-core's `rootDocsUrl()`. That iframe loads `pxtembed.js`, which carries its **own** copy
of the same rule:

```js
apiRoot = BrowserUtils.isLocalHost() || isNodeJS
    ? "https://www.makecode.com/api/" : "/api/"
```

and `isLocalHost()` tests `window.location.href` — the *iframe's* URL. A flag on the parent
editor URL is never propagated into the iframe src, so the iframe still sees a plain
`localhost:3232/--docs` and still routes to makecode.com. That is exactly what the console
shows: the failing request originates in `pxtembed.js`, not `pxtapp.js`.

`pxt.webConfig.docsUrl` would let the iframe src carry the flag, but it is a `WebConfig`
(deployment) field, not part of the `pxtarget.json` schema, so it cannot be set from this
repo's config.

**Proof the docs themselves are fine.** The dev server guards `/api/` with the `localToken`
from `~/.pxt/config.json`, passed as a bare `Authorization` header (not `Bearer`, not a
cookie). With it:

```
GET localhost:3232/api/md/calliopemini/reference/input/on-button-event  -> 200  "# On Button Event ..."
GET localhost:3232/api/md/calliopemini/calliope/tutorials               -> 200  "# Projects ..."
```

Both are the exact pages the browser fails to fetch from makecode.com. Nothing is missing
from `docs/`, and **the docs do not need to be hosted separately** — they ship inside the
target and are served by the same origin in a real deployment, where `isLocalHost()` is
false and `apiRoot` is `/api/`.

Local-testing options, in order of preference:
1. Open the docs frame directly with the flag:
   `http://localhost:3232/--docs?nolocalhost=1#doc:/reference/input/on-button-event`
   (verified: that URL returns 200).
2. Accept that side-docs are broken under `pxt serve` and verify docs content with
   `pxt checkdocs` (currently: 0 "not in SUMMARY", no SUMMARY-level broken links) plus
   direct page loads such as `http://localhost:3232/calliope/tutorials` (200).
3. Deploy/stage the target, where the problem disappears by construction.

### 2026-09-30 — does the live makecode.calliope.cc differ from this repo's docs?

Question asked after pxt-microbit's local hosting appeared to show docs fine.

**The live Calliope site serves its docs correctly; this repo's docs are not the problem.**

```
https://makecode.calliope.cc/api/md/calliopemini/reference/input/on-button-event   -> 200
https://makecode.calliope.cc/api/md/calliopemini/calliope/tutorials                -> 200
https://www.makecode.com/api/md/calliopemini/reference/input/on-button-event       -> 404
https://www.makecode.com/api/md/microbit/reference/input/on-button-event           -> 404
```

Note the last line: makecode.com 404s for **micro:bit** too on that path, so it is not a
"Calliope is missing from makecode.com" story in the way first assumed. The local dev rule
sends requests to a host that does not answer them for either target.

One real difference found: the live site is on the **8.1.x** line, this branch is 9.1.1, and
the version is part of the request:

```
.../reference/input/on-button-event                    -> 200
.../reference/input/on-button-event?targetVersion=9.1.1 -> 404   <- version the local editor sends
.../reference/input/on-button-event?targetVersion=8.1.15 -> 200
```

So even pointing local dev at makecode.calliope.cc would 404, because the local editor
stamps its own (newer) targetVersion onto every docs request.

### 2026-09-30 — `nolocalhost=1` on the /--docs frame, and what it revealed

Opening `http://localhost:3232/--docs?nolocalhost=1#doc:/reference/...` does flip the frame
to the local api, but that frame then fails differently: `/api/clientconfig` and
`/api/compile/extension` return **403**, because those routes need the `localToken` that the
top-level editor supplies and a directly-opened frame does not have. So it is not a usable
workaround either. Side-docs under `pxt serve` remain broken for this target; verify docs
with `pxt checkdocs` and direct page loads instead, or use a real deployment.

### 2026-09-30 — real doc bugs found by `pxt checkdocs` (inherited from master)

Two genuine errors, both pre-existing on `master`, now fixed:

1. **`IconNames.ArrowNorth/East/South/West` do not exist in this target.** Arrows live in a
   separate `ArrowNames` enum used with `basic.showArrow()` (`libs/core/icons.ts:156+`);
   `IconNames` has no arrow members. Fixed in `docs/reference/serial/write-line.md`,
   `docs/reference/basic.md` and `docs/reference/input/compass-heading.md` by switching to
   `basic.showArrow(ArrowNames.North)` etc.

2. **```` ```package ```` blocks requiring non-existent extensions `v1` / `v2` / `v3`.**
   No `libs/v1`, `libs/v2` or `libs/v3` exists, so `checkdocs` aborted with
   *"extension vN is missing pxt.json"*. Removed from `docs/boards/calliope-mini-1.md`,
   `-2.md`, `-3.md`, `docs/projects/rock-paper-scissors.md` and `docs/reference/music.md`.
   Confirmed by the user as correct: **this is a universal-hex target, so the v1/v2/v3
   separation is obsolete.**

`pxt checkdocs` result: **520/520 snippets compile, 0 failed** (was 2 failing + a hard abort).

Remaining: 23 broken in-page links across 57 distinct targets, all inherited from master and
unrelated to the start page — e.g. `/device/v2` (referenced by 14 files, and absent on master
too) and outright typos like `/referene/inpu/pin-is-pressed`,
`/refernece/music/play`. Not touched; they are a separate content-cleanup job.

Also noted, not changed: `docs/calliope/templates.md` offers separate "Calliope mini 1.x
(16KB)" and "2.x (32KB)" project templates — the same obsolete split. It is currently
**unreachable** (not in any of the 4 galleries, not in `SUMMARY.md`), so it is dead content
rather than an active problem. Worth deleting along with `docs/calliope/templates/` if the
v1/v2/v3 distinction is being retired everywhere.

### 2026-09-30 — v1/v2/v3 project templates removed (universal hex)

The 16KB / 32KB split exists only because pre-universal-hex builds had to target a specific
board revision. Removed, per the user: *"this is a universal hex version where the
separation is not necessary anymore"*.

Deleted: `docs/calliope/templates.md`, `docs/calliope/templates/` (`calliope-mini-1.md`,
`calliope-mini-2.md`, `new-project-pxt4.md`, `SUMMARY.md`) and the now-orphaned assets
`docs/static/calliope/templates/` (`16KB*.png`, `32KB*.png`, `info*.png`).

Safe to remove: the page was already unreachable — not referenced by any of the 4 galleries
and not in `docs/SUMMARY.md`. The only remaining mentions were in these notes.

Note the **hardware reference** pages `docs/boards/calliope-mini-{1,2,3}.md` were kept. They
describe the physical boards, which do still differ; that is distinct from build-time
targeting.

### 2026-09-30 — `IconNames.Arrow*` migrated to be usable (not just rewritten)

Earlier the broken snippets were "fixed" by rewriting them to `basic.showArrow(ArrowNames.X)`.
The user asked instead that `IconNames.ArrowNorth` and friends be **migrated so they are
usable**, which is the better outcome: `showArrow` is marked `//% deprecated=true`, so docs
should not be steered onto it.

Implementation (`libs/core/icons.ts`):
- Added 8 members to `IconNames` — `ArrowNorth`, `ArrowNorthEast`, `ArrowEast`,
  `ArrowSouthEast`, `ArrowSouth`, `ArrowSouthWest`, `ArrowWest`, `ArrowNorthWest` —
  **appended at the end** so all 41 existing icons keep their numeric values (only `Heart = 0`
  is explicit; the rest are positional, so inserting anywhere else would silently renumber
  saved programs).
- `images.iconImage()` handles them by delegating to `images.arrowImage(ArrowNames.X)`
  rather than duplicating the 5x5 artwork, so `show icon` and the deprecated `show arrow`
  can never drift apart.
- Reverted the three docs to `basic.showIcon(IconNames.ArrowNorth)` etc.

Verified: `pxt checkdocs` reports **520/520 snippets compiled to blocks and python (and
back), 0 failed** — so the new members survive the blocks/Python round-trip. `built/target.json`
contains both the enum members and the delegation.

Known cosmetic gap: the other 41 icons carry a `//% jres=icons.<name>` image used by the
`imagedropdown` field editor, and `icons.jres` has no arrow artwork, so the 8 new entries
have no dropdown thumbnail (they fall back to their text label — "north arrow" etc.). Adding
8 images to `libs/core/icons.jres` would close this; not done here because it needs actual
icon art.

### 2026-09-30 (revised) — arrow icons taken from master; `show arrow` API removed

Supersedes the previous entry. Two corrections to it:

**(a) The pictograms were missing.** The first attempt added the 8 `IconNames.Arrow*`
members by hand with no `//% jres=`, so the `imagedropdown` had no thumbnail for them.
`master` already solves this properly: its `IconNames` carries all 8 arrow members **with**
`//% jres=icons.arrownorth` etc., its `iconImage()` has the inline 5x5 artwork, and its
`icons.jres` has the 8 matching PNGs (48 entries vs this branch's 40).

So `libs/core/icons.ts` was restored wholesale from `master` and the 8 arrow entries were
merged into `libs/core/icons.jres`. No hand-authored artwork — it is byte-for-byte master's.

**(b) `show arrow` is now removed entirely**, per the user ("the seperate show arrow block
should stay completely out"). master only marks it `deprecated=true`. Removed from
`libs/core/icons.ts`:
- `basic.showArrow()` (blockId `basic_show_arrow`)
- `images.arrowImage()` (blockId `builtin_arrow_image`)
- `images.arrowNumber()` (blockId `device_arrow`)
- the `ArrowNames` enum

Also removed the now-dangling `"basic.showArrow|block"` from
`libs/core/_locales/de/core-strings.json`. No docs referenced the arrow API, so nothing else
needed updating. The arrow *artwork* survives inside `iconImage()`, which is where it is now
reached from.

Result: `IconNames.ArrowNorth` … `ArrowNorthWest` work like any other icon, with dropdown
thumbnails, and there is no separate arrow block.

Verified: `pxt checkdocs` 520/520 snippets compile (blocks + python round-trip), and
`built/target.json` confirms 8 arrow jres entries bundled, `showArrow`/`ArrowNames` absent,
`ArrowNorth` present.

**Process note (mistake worth not repeating):** the first removal attempt cut by string
index from `arrowImage`'s start to `arrowNumber`'s end. Because `arrowImage` sits *before*
`iconImage` in the `images` namespace, that span swallowed `iconImage` and all 49 icon cases
— the file went from 26,385 to 5,409 bytes. Caught by checking the icon-case count, then
fixed by restoring from `master` and re-cutting with explicit start/end anchors per function.
When deleting a function from the middle of a namespace, anchor on **both** its own
boundaries, and verify a structural invariant afterwards (here: `grep -c "case IconNames"`
== 49 and brace balance).

### 2026-09-30 — local docs testing: use `.test`, not `.dev`

`calliope.dev` fails with `ERR_SSL_PROTOCOL_ERROR`: `.dev` is on the browser HSTS preload
list, so Chrome forces https and the plain-http dev server cannot answer.

Use a non-preloaded TLD instead — `.test` is reserved for exactly this (RFC 6761):

```
echo "127.0.0.1 calliope.test" | sudo tee -a /etc/hosts
npx pxt serve --hostname calliope.test --no-browser
# open http://calliope.test:3232/
```

`.test`, `.internal` and `.lan` are all fine; `.dev`, `.app`, `.page` and `.new` are
HSTS-preloaded and will not work over http. The hostname only needs to avoid pxt's
`isLocalHost()` pattern (`localhost`, `127.0.0.1`, `192.168.x.x`, `*.local`).

### 2026-09-30 — reverted: `show arrow` kept, as master has it

Per the user, master's `deprecated=true` treatment is good enough. Reverted the previous
entry's removal: `libs/core/icons.ts` is now **byte-identical to master**, so
`basic.showArrow()`, `images.arrowImage()`, `images.arrowNumber()` and the `ArrowNames` enum
are all present, each marked `//% deprecated=true` (hidden from the toolbox, still valid in
existing programs). `libs/core/_locales/de/core-strings.json` restored verbatim from HEAD,
which also undid an unintended whole-file reformat (58/59 lines) from the removal attempt.

Kept: the 8 arrow entries merged into `libs/core/icons.jres` (48 entries total), which is
what gives `IconNames.Arrow*` its dropdown pictograms. Verified in `built/target.json`:
`showArrow` present, `ArrowNames` present, `ArrowNorth` present, 8 arrow jres bundled.

### 2026-09-30 — the `calliope.test` trade-off: docs XOR translations

Serving under `calliope.test` fixed the docs but broke German. The two are driven by the
*same* `isLocalHost()` check, pointing in opposite directions:

```js
// docs / api
apiRoot          = isLocalHost() || isNodeJS ? "https://www.makecode.com/api/" : "/api/"
// translations
translationsRoot = isLocalHost() || isStatic ? "https://makecode.com/api/" : ""
```

- **`localhost:3232`** -> `isLocalHost()` true -> docs fetched from makecode.com (404, target
  not served there) but translations fetched from makecode.com (**200**, German works).
- **`calliope.test:3232`** -> `isLocalHost()` false -> docs fetched locally (**work**) but
  translations fetched locally, where they do not exist -> `/cdn/locales/de/strings.json`
  404 and the UI falls back to English.

Confirmed: `built/` contains only the English source strings (`target-strings.json`,
`sim-strings.json`); there is no `locales/de/` tree. Those German strings are served by
crowdin at runtime — `https://makecode.com/api/translations?lang=de&filename=strings.json`
returns 200. So under plain `pxt serve` it is strictly one or the other.

The side 404s (`/cdn//api/config/...` with a doubled slash, `Unable to determine region`,
the `roboto-mono` woff2 files) are all the same root cause: `webConfig.cdnUrl` is `/cdn/`
and the dev server has no `/cdn/` tree, so anything routed through the CDN path misses. On
`localhost` those requests bypass the CDN, which is why they only appeared now.

**To get docs *and* German at once**, build a static package with bundled translations:

```
npx pxt staticpkg --locs -o /tmp/calliope-static
# then serve that folder with any static file server
```

`--locs` (`--locales`/`--crowdin`) downloads the translations and bundles them, so the
locale files exist locally and neither side has to reach makecode.com.

### 2026-09-30 — `pxt staticpkg --locs` needs a Crowdin *manager* token

`INTERNAL ERROR: Crowdin token not found in environment variable CROWDIN_KEY`.

What pxt does (`node_modules/pxt-core/built/crowdinApi.js`):
- `crowdinCredentials()` (line ~356) reads `process.env.CROWDIN_KEY` and passes it to the
  official `@crowdin/crowdin-api-client` as a **Personal Access Token** (API v2).
- `downloadTranslationsAsync()` (line ~93) calls **`translationsApi.buildProject(projectId, …)`**,
  polls `checkBuildStatus`, then `downloadTranslations`.

Two consequences:

1. **The token is a Crowdin *Personal Access Token***, created at
   Crowdin → *Account Settings → API → Personal Access Tokens* (not a project join code, not
   the login password). Used as `CROWDIN_KEY=<token> npx pxt staticpkg --locs …`.

2. **Translator membership is not enough.** `buildProject` exports the whole project and is a
   *manager*-level operation; a translator/proofreader PAT gets 403. And the project is
   **Microsoft's "makecode"** project: `pxtarget.json` sets `"crowdinProject": "makecode"`
   and does **not** set `crowdinProjectId`, so pxt falls back to
   `KINDSCRIPT_PROJECT_ID = 157956`. So this needs rights on Microsoft's project, which a
   Calliope contributor would normally not have.

**Workaround that needs no Crowdin access — `--locs-src`:**

```
npx pxt staticpkg --locs-src <dir> -o /tmp/calliope-static
```

`staticpkgAsync` sets `locs = !!locsSrc || !!flags.locs`, and when `locs-src` is given it
calls `crowdin.buildAllTranslationsAsync()` reading from disk instead of
`downloadTargetTranslationsAsync()` — Crowdin is never contacted, so `CROWDIN_KEY` is not
needed.

Expected layout: `<dir>/<langId>/<fileName>`, e.g. `<dir>/de/strings.json`,
`<dir>/de/target-strings.json`, `<dir>/de/bundled-strings.json`, `<dir>/de/sim-strings.json`.
Only languages listed in `appTheme.availableLocales` **and** present as a directory are
picked up (`de` is in that list).

Those four files can be fetched without any credential from the live translation endpoint,
which is the same one the editor uses at runtime:
`https://makecode.com/api/translations?lang=de&filename=strings.json&approved=true` (200).

### 2026-09-30 — `scripts/fetch-locs.sh`: docs + translations locally, no Crowdin key

Added `scripts/fetch-locs.sh`. It downloads the MakeCode UI translations from the public
endpoint (no credential) and then runs `pxt staticpkg --locs-src`, which reads them from
disk and never contacts Crowdin — sidestepping the manager-level `CROWDIN_KEY` requirement.

```
scripts/fetch-locs.sh                 # de, then build the static package
scripts/fetch-locs.sh fr it           # other languages
LOCS_ONLY=1 scripts/fetch-locs.sh     # download only, skip the build
```

Why a static package rather than `pxt serve`: a static build serves the editor, the docs and
the locale files from **one** origin, so neither the `apiRoot` nor the `translationsRoot`
branch of `isLocalHost()` can send a request to makecode.com. That is the only local setup
where docs *and* German work at the same time.

**Finding: only `strings.json` has content.** Of the four files pxt looks for per language,
`https://makecode.com/api/translations?lang=de&filename=<f>&approved=true` returns

| file | result |
|---|---|
| `strings.json` | **2426 keys** — the editor UI |
| `target-strings.json` | `{}` |
| `bundled-strings.json` | `{}` |
| `sim-strings.json` | `{}` |

The three empty ones are per-target and simply are not populated for this target (same `{}`
from `makecode.calliope.cc`). This is not a fault: the headings the user saw in German come
from `strings.json` — it contains `"Tutorials" -> "Anleitungen"`, `"Projects" -> "Projekte"`,
`"Help" -> "Hilfe"`. The gallery *names* are matched as plain English keys, which is why
renaming a gallery in `targetconfig.json` changes whether it can be translated.

The script still writes all four files (empty ones included) so the expected
`<dir>/<lang>/<file>` set is complete and obvious; pxt's `jsonTryParse` would silently skip a
malformed file, so each download is validated as JSON and falls back to `{}` on failure
rather than writing a truncated file.

#### Blocker: `pxt staticpkg` cannot complete on this target

The download half of `scripts/fetch-locs.sh` works (2426 German strings in
`built/locs/de/strings.json`). The `staticpkg` half **does not finish**: it warms the hex
cache, hits a dependency combination that is not in `built/hexcache/`, and submits a cloud
C++ build that never returns:

```
polling C++ build https://makecode.com/compile/814405b7...json (attempt #1)
waiting 8s for C++ build...
```

Fetching that URL directly gives:

```json
{"message":"compilation 814405b7... not found"}
```

So the job does not exist server-side and the poll loop never terminates — this is not a
slow build, it is a dead one. The combination is `core + microphone + bluetooth` (the
bluetooth-enabled variant). Note `libs/bluetoothprj` no longer exists in this tree (only
`blocksprj` and `tsprj`), so the combination comes from `blocksprj`'s dependency set.

This is a pre-existing target/build-service issue, unrelated to the start page or the
locales. `staticpkg` offers no flag to skip hex-cache warming.

Options if a fully static local build is wanted later:
- Pre-populate `built/hexcache/` with that combination from a machine/toolchain that can
  build it locally (`--localbuild`), so staticpkg finds it cached and skips the cloud.
- Or trim the bluetooth dependency out of the template project used for cache warming.

Until then the practical local setups remain the either/or from the previous entry:
`localhost` for translations, a custom hostname (e.g. `calliope.test`) for docs.

### 2026-09-30 — `calliope.test` also needs `nocdn=1` (scrambled UI, missing galleries)

Symptoms on `calliope.test:3232`: header fonts and icons missing, and the tutorial/manual
galleries never rendered (in *either* hostname mode).

Third branch of the same `isLocalHost()` split, in `pxt.Cloud.useCdnApi()`:

```js
useCdnApi = () => webConfig && !webConfig.isStatic && !BrowserUtils.isLocalHost()
                  && !!webConfig.cdnUrl && !/nocdn=1/i.test(location.href)
```

`webConfig.cdnUrl` is `/cdn/`, and the dev server has no `/cdn/` tree. So:

| URL | isLocalHost | useCdnApi | API requests |
|---|---|---|---|
| `localhost:3232` | true | false | direct `/api/…` (work) |
| `calliope.test:3232` | false | **true** | `/cdn//api/…` -> **404** |
| `calliope.test:3232/?nocdn=1` | false | false | direct `/api/…` (work) |

That explains the doubled slash in `GET /cdn//api/config/calliopemini/targetconfig/v9.1.1`
and why the galleries were empty: **the gallery list lives in that targetconfig response**,
not in `built/target.json` (verified: `built/target.json` has no `targetConfig` key). With
the request 404ing, the editor has no galleries to draw.

The local server serves both fine when asked directly:

```
/api/config/calliopemini/targetconfig/v9.1.1 -> 200  galleries: Tutorials, Workbook, Jacdac, Calliope Links
/api/md/calliopemini/calliope/tutorials      -> 200
```

**So the working local URL is `http://calliope.test:3232/?nocdn=1`** — docs, galleries and
API all local.

Unrelated pre-existing 404: `/static/fonts/roboto-mono/*.woff2` does not exist anywhere in
`node_modules/pxt-core/built/web` and 404s on `localhost` too. Cosmetic, not caused by the
hostname change.

Partial-translation note: with `strings.json` only, editor **chrome** is translated
("Anleitungen", "Hilfe") but block text like `basic` is not — block strings live in the
per-target `bundled-strings.json`/`target-strings.json`, which the public endpoint returns
empty (see the previous entry). Full block translation therefore needs a real target
translation export, not the public API.

#### Resolved: `PXT_FORCE_LOCAL=1` unblocks `staticpkg`

The dead cloud build is bypassed entirely by compiling C++ locally. `scripts/fetch-locs.sh`
now sources the yotta env and exports:

```
PXT_FORCE_LOCAL=1   # compile C++ on this machine, not the cloud service
PXT_NODOCKER=1      # do not shell out to docker
```

(`YOTTA_ENV` defaults to `~/fw/YOTTAENV/bin/activate`; override to point elsewhere. The
script warns if `arm-none-eabi-gcc` is still missing from PATH afterwards.)

Result: the build completes with **0 cloud polls** and produces `built/packaged` (118 MB,
98 top-level entries) containing:
- `index.html`, `targetconfig.json` (so the galleries load — this is the file whose 404 was
  leaving the start page empty),
- `docs/calliope/` incl. `tutorials.html`, `arbeitsheft/`, `firststeps/`,
- `locales/de/strings.json` with 2426 entries (`"Tutorials" -> "Anleitungen"`).

Serve it from one origin and both docs and translations work with no makecode.com
dependency and no `isLocalHost()` split:

```
npx http-server built/packaged -p 8080 -c-1
# or: python3 -m http.server 8080 --directory built/packaged
```

### 2026-09-30 — galleries still empty on `calliope.test`: the dev server's localToken

`?nocdn=1` fixed the scrambled header (CDN routing) but the tutorial/manual galleries were
still missing. Remaining cause: **the dev server's `/api/` auth**.

`node_modules/pxt-core/built/server.js`:

```js
function isAuthorizedLocalRequest(req) {
    return req.headers["authorization"] &&
           req.headers["authorization"] == serveOptions.localToken;
}
...
if (!options.noauth && !isAuthorizedLocalRequest(req)) { error(403); return null; }
```

Every `/api/` route 403s without an `Authorization` header equal to the `localToken` in
`~/.pxt/config.json`. Verified:

```
/api/config/calliopemini/targetconfig/v9.1.1   no-auth: 403   with token: 200
/api/md/calliopemini/calliope/tutorials        no-auth: 403   with token: 200
```

The browser normally gets that token from the launch URL the server prints at startup:

```js
const start = `${protocol}://${hostname}:${port}/#local_token=${options.localToken}&wsport=${wsPort}`;
```

Opening a hand-typed URL (`http://calliope.test:3232/`) skips the `#local_token=...`
fragment, so the editor has no token, every `/api/` call 403s, the targetconfig fetch fails,
and the start page renders with **no galleries** — exactly the reported symptom.

Two fixes, either works:

1. **Use the launch URL the server prints**, keeping the query flag:
   `http://calliope.test:3232/?nocdn=1#local_token=<token from ~/.pxt/config.json>`
2. **Disable the auth for local testing** (simpler, no token juggling):
   `npx pxt serve --hostname calliope.test --noauth --no-browser`
   then `http://calliope.test:3232/?nocdn=1`

Note the full set of flags needed to make `pxt serve` behave for this target:
`--hostname <non-localhost>` (docs come from the local server), `?nocdn=1` (API not routed
through the missing `/cdn/` tree), plus a token or `--noauth` (API not 403). The static
package from `scripts/fetch-locs.sh` needs none of these, which is why it remains the
cleaner option.

### 2026-09-30 — why only `basic` is untranslated, and why tutorials stay English

**`basic`: a malformed upstream translation string.** Of all toolbox categories, `Basic` is
the *only* one with a `{id:category}` entry in the public `de/strings.json` — and its value
wrongly keeps the prefix:

```
'{id:category}Basic' -> '{id:category}Grundlagen'      <- value should be just "Grundlagen"
```

All 12 `{id:category}` entries in that file have the same defect, but only `Basic` matters
here because the other categories are not looked up that way:

```
{id:category}Input / Music / Radio / LED / Control / ...   -> ABSENT from de/strings.json
```

Their German names come from the **target-level** translations served at runtime (e.g.
`Radio -> Funk` is a plain key in `strings.json`), not from `{id:category}` keys. So the
other categories translate through a path that works, and `basic` alone hits the one broken
key. `libs/core/basic.ts` carries no `block=` annotation (unlike `led.ts`, which has
`block="LED"`), so it has no target-side override to fall back on either.

This is a data defect in the upstream Crowdin export, not something fixable in this repo
short of adding `block="..."` to the `basic` namespace or shipping a local override.

**Tutorials stay English regardless of language.** There is only one copy of each doc —
`docs/calliope/tutorials.md`, `arbeitsheft.md`, … — with no `*.de.md` variants and no
`docs/de/` tree. Gallery *card* text comes from those markdown files, so it renders in
whatever language the file is written in. The live site shows German tutorials because its
docs are served from a translated source; a local static package built from this repo's
`docs/` can only ever show what is in these files. Translating them means adding localized
markdown, not fixing configuration.

### 2026-09-30 — `pxt serve` gives up: `unknown command GET clientconfig`

Even with `--noauth` and `?nocdn=1`, the dev server rejects a route the editor needs:

```
INTERNAL ERROR: Error: unknown command GET clientconfig
    at handleApiAsync (node_modules/pxt-core/built/server.js:367:15)
```

`/api/clientconfig` is simply not implemented by the local dev server, so the start page
still cannot finish loading its galleries. Combined with the earlier findings (docs vs
translations vs CDN vs auth all keyed off `isLocalHost()`), **`pxt serve` cannot fully run
this target locally**.

`npx http-server built/packaged -p 8080 -c-1` does work — galleries, help and docs all load.
That is the supported local setup; `pxt serve` should be treated as blocks-editor-only.

### 2026-09-30 — why pxt-microbit shows tutorials under plain `pxt serve` (and this target cannot)

Both targets are structurally identical: `targetConfig` is **absent** from `built/target.json`
in each, so both editors must fetch the gallery list over HTTP. The difference is entirely in
what **makecode.com** will serve back.

The gallery *list* is fine for both:

```
makecode.com /api/config/microbit/targetconfig/v9.1.1      -> 200, 26 galleries
makecode.com /api/config/calliopemini/targetconfig/v9.1.1  -> 200,  4 galleries
```

(Correction to an earlier entry in these notes: makecode.com **does** serve calliopemini's
targetconfig, and it already returns the new 4-gallery Calliope list. The gallery list was
never the missing piece.)

The gallery *content* is where they diverge — each gallery name resolves to a markdown page
that must also be fetched:

```
makecode.com /api/md/microbit/tutorials                    -> 200
makecode.com /api/md/microbit/projects/games               -> 200
makecode.com /api/md/calliopemini/calliope/tutorials       -> 404
makecode.com /api/md/calliopemini/calliope/arbeitsheft     -> 404
```

So under `pxt serve` (where `isLocalHost()` routes doc requests to makecode.com):

- **pxt-microbit**: its docs are published there, every gallery markdown returns 200, and the
  start page renders fully. Nothing local is needed.
- **pxt-calliope**: `calliope/*` docs are not published on makecode.com, every gallery
  markdown 404s, and the start page renders with no cards.

That is the whole difference. It is not a configuration gap in this repo — the same editor
code, asking the same host, simply gets content for one target and 404s for the other.

Worth noting the asymmetry is not total: `microbit/reference/input/on-button-event` also
404s on makecode.com, so even for pxt-microbit the *help* pages fail under `pxt serve` while
the tutorials work. That matches the reported experience of "pxt-microbit shows both" only
for the start page.

Consequence: serving `built/packaged` locally is not a workaround for a local misconfiguration
— it is the only way to see this target's own docs, because they exist nowhere else.

### 2026-09-30 — tidy-up, and a `buildtarget` gotcha after deleting `built/`

Reduced the change set to the minimum. Three of the edits had accidental churn because they
were written with `json.dumps`, which reformats the whole file:

- **`targetconfig.json`**: was 228 insertions / 109 deletions (whole-file reformat) for what
  should be a one-block change. Restored from HEAD and the `"galleries"` block swapped
  **textually** instead -> now **4 insertions / 42 deletions**, one clean hunk.
- **`libs/core/icons.jres`**: was 149/125 for 8 added entries. Content was already identical
  to master's, so master's file was taken verbatim -> now **24 insertions, 0 deletions**.
- **`libs/core/_locales/de/core-strings.json`**: reformat already reverted earlier.

Also removed `sim/public/locales/de/strings.json` — a `staticpkg --locs-src` artifact that
leaked into the (tracked) `sim/public/` source tree. It is regenerable and does not belong
in git.

Final source diff: `icons.ts` (= master), `icons.jres` (+24), the two auto-generated
`_locales/core-*.json` (+8 arrow block labels, 1 jsdoc string — both regenerated from
master's `icons.ts`), `pxtarget.json` (1 line: hero url), `targetconfig.json` (galleries).
Plus the `docs/` replacement and the new `scripts/fetch-locs.sh`.

**Gotcha: after deleting `built/`, `pxt buildtarget` fails with `spawn docker ENOENT`.**
Earlier runs succeeded only because `built/hexcache/` was warm and no C++ compile was
needed. With the cache gone pxt must actually build, and its default path shells out to
docker, which is not installed here. Fix — same flags the fetch-locs script uses:

```
source ~/fw/YOTTAENV/bin/activate
export PXT_FORCE_LOCAL=1 PXT_NODOCKER=1
npx pxt buildtarget --local
```

(The `error TS6053: File 'node_modules/pxt-core/built/lib.*.d.ts' not found` lines are
unrelated noise — those files have never existed in this install and the build succeeds
regardless.)
