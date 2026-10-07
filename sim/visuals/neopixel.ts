namespace pxsim.visuals {
    // Calliope replacement for pxt-common-packages' NeoPixelView (libs/core/sim/neopixel.ts).
    // The common view draws each pixel as a full-width stripe stacked top to bottom, next to an
    // illustration of a vertical 3-pixel strip. This view draws a connector tab with the cable
    // pads (GND, DIN, VCC from left to right) on top, and below it the functional strip: one
    // circle per pixel, left to right, wrapping every NP_PIXELS_PER_ROW pixels (or every `width`
    // pixels for matrices) onto a separate strip below. The state (CommonNeoPixelState) still
    // comes from pxt-common-packages.
    //
    // The tab geometry must match the "neopixel" part in libs/core/pxtparts.json:
    // pinDistance = PIN_DIST (so part units are board units), and pinLocations = the pad centres
    // below, in pinDefinitions order (data, threeVolt, ground).
    //
    // pxt's allocator maps every pin to a breadboard row/column (start + round(pos / pinDistance))
    // and only corrects rows >= 7 for the middle gap. pxtparts.json declares the part 29 columns
    // wide and 10 rows tall, so the allocator always places its origin at column index 1, row
    // index 1 (it never uses index 0). The pads sit one column left of and one row above that
    // origin, i.e. in breadboard column 1, row j: the top-left corner, as far up and left as wires can reach.
    const NP_PAD_SIZE = PIN_DIST * 0.8;
    const NP_PAD_XS = [-PIN_DIST, PIN_DIST * 0.5, PIN_DIST * 2]; // GND, DIN, VCC
    const NP_PAD_Y = -PIN_DIST;
    const NP_TAB_PAD = PIN_DIST * 0.6;
    const NP_TAB_LEFT = NP_PAD_XS[0] - NP_TAB_PAD;
    const NP_TAB_TOP = NP_PAD_Y - NP_TAB_PAD;
    const NP_TAB_W = NP_PAD_XS[2] - NP_PAD_XS[0] + 2 * NP_TAB_PAD;
    const NP_TAB_H = 2 * NP_TAB_PAD;
    // the first strip starts right below the tab, left-aligned with it
    const NP_STRIP_LEFT = NP_TAB_LEFT;
    const NP_STRIP_TOP = NP_TAB_TOP + NP_TAB_H;

    const NP_PIXEL_RADIUS = PIN_DIST * 1.2;
    const NP_PIXEL_SPACING = PIN_DIST * 3.2;
    const NP_PADDING = PIN_DIST * 0.5;
    const NP_STRIP_H = NP_PIXEL_SPACING + 2 * NP_PADDING;
    // vertical gap between the strips of consecutive rows
    const NP_ROW_GAP = PIN_DIST;
    const NP_PIXELS_PER_ROW = 20;
    // keep this much space between the strip and the right/bottom edge of the simulator view
    const NP_RIGHT_MARGIN = PIN_DIST;
    const NP_BOTTOM_MARGIN = PIN_DIST * 0.5;
    // hover zoom: at least up to this factor (more if the strip was shrunk to fit, up to its
    // natural size), and never past the visible part of the simulator
    const NP_MAX_ZOOM = 2;
    const NP_ZOOM_MARGIN = 4;

    const NP_PAD_FILL = "#c8a165";

    function mkStripTab(): SVGGElement {
        const g = <SVGGElement>svg.elt("g", { class: "sim-neopixel-head" });
        svg.child(g, "rect", {
            class: "sim-neopixel-strip-bg",
            x: NP_TAB_LEFT, y: NP_TAB_TOP, width: NP_TAB_W, height: NP_TAB_H, rx: 3, ry: 3
        });
        for (const x of NP_PAD_XS)
            svg.child(g, "rect", {
                x: x - NP_PAD_SIZE / 2, y: NP_PAD_Y - NP_PAD_SIZE / 2,
                width: NP_PAD_SIZE, height: NP_PAD_SIZE, rx: 2, ry: 2,
                fill: NP_PAD_FILL
            });
        return g;
    }

    // For the instructions parts list: tab above a strip of a few unlit pixels
    export function mkCalliopeNeoPixelPart(xy: Coord = [0, 0]): SVGElAndSize {
        const n = 5;
        const [x, y] = xy;
        const rowW = n * NP_PIXEL_SPACING + 2 * NP_PADDING;
        const g = <SVGGElement>svg.elt("g", { transform: `translate(${x} ${y})` });
        svg.child(g, "rect", {
            class: "sim-neopixel-strip-bg",
            x: NP_STRIP_LEFT, y: NP_STRIP_TOP, width: rowW, height: NP_STRIP_H,
            rx: NP_PADDING, ry: NP_PADDING
        });
        for (let i = 0; i < n; i++)
            svg.child(g, "circle", {
                cx: NP_STRIP_LEFT + NP_PADDING + (i + 0.5) * NP_PIXEL_SPACING,
                cy: NP_STRIP_TOP + NP_STRIP_H / 2,
                r: NP_PIXEL_RADIUS, fill: "#ddd"
            });
        g.appendChild(mkStripTab());
        return {
            el: g, x: x + NP_STRIP_LEFT, y: y + NP_TAB_TOP,
            w: Math.max(rowW, NP_TAB_W), h: NP_STRIP_TOP + NP_STRIP_H - NP_TAB_TOP
        };
    }

    class NeoPixelRow {
        public canvas: SVGSVGElement;
        private strips: SVGRectElement[] = [];
        private pixels: SVGCircleElement[] = [];
        private vbW = 0;
        private vbH = 0;
        private scale = 1;

        constructor(public cols: number) {
            this.canvas = <SVGSVGElement>svg.elt("svg", { class: "sim-neopixel-row", overflow: "visible" });
            this.canvas.setAttribute("visibility", "hidden");
        }

        public get width() { return this.vbW * this.scale; }
        public get fitScale() { return this.scale; }
        public get height() { return this.vbH * this.scale; }

        public update(colors: number[][]) {
            if (!colors || !colors.length) return;
            if (colors.length != this.pixels.length) this.layout(colors.length);
            for (let i = 0; i < colors.length; i++)
                this.pixels[i].setAttribute("fill", pixelFill(colors[i]));
            this.canvas.setAttribute("visibility", "visible");
        }

        private layout(n: number) {
            this.strips.forEach(r => this.canvas.removeChild(r));
            this.pixels.forEach(p => this.canvas.removeChild(p));
            this.strips = [];
            this.pixels = [];

            // state.width > 1: matrix rows of that width; negative: the same, wired in zigzag
            // (every second row runs right to left); otherwise wrap a plain strip every NP_PIXELS_PER_ROW
            const matrixCols = Math.abs(this.cols);
            const zigzag = this.cols < 0;
            const cols = matrixCols > 1 ? matrixCols : Math.min(n, NP_PIXELS_PER_ROW);
            const rows = Math.ceil(n / cols);
            const stripTop = (row: number) => row * (NP_STRIP_H + NP_ROW_GAP);
            this.vbW = cols * NP_PIXEL_SPACING + 2 * NP_PADDING;
            this.vbH = stripTop(rows - 1) + NP_STRIP_H;
            // every row is its own strip, sized to the pixels it holds
            for (let row = 0; row < rows; row++) {
                const count = Math.min(cols, n - row * cols);
                // a partial reversed (zigzag) row holds its pixels on the right
                const offset = zigzag && (row & 1) ? (cols - count) * NP_PIXEL_SPACING : 0;
                this.strips.push(<SVGRectElement>svg.child(this.canvas, "rect", {
                    class: "sim-neopixel-strip-bg",
                    x: offset, y: stripTop(row), width: count * NP_PIXEL_SPACING + 2 * NP_PADDING, height: NP_STRIP_H,
                    rx: NP_PADDING, ry: NP_PADDING
                }));
            }
            for (let i = 0; i < n; i++) {
                const row = Math.floor(i / cols);
                let col = i - row * cols;
                if (zigzag && (row & 1)) col = cols - 1 - col;
                const c = <SVGCircleElement>svg.child(this.canvas, "circle", {
                    class: "sim-neopixel",
                    cx: NP_PADDING + (col + 0.5) * NP_PIXEL_SPACING,
                    cy: stripTop(row) + NP_STRIP_H / 2,
                    r: NP_PIXEL_RADIUS
                });
                svg.hydrate(c, { title: `offset: ${i}` });
                this.pixels.push(c);
            }
            svg.hydrate(this.canvas, { viewBox: `0 0 ${this.vbW} ${this.vbH}` });
            this.applyScale();
        }

        // shrink the strip so it fits into maxWidth x maxHeight; never enlarge it
        public fit(maxWidth: number, maxHeight: number) {
            this.scale = this.vbW > 0 && this.vbH > 0
                ? Math.min(1, Math.max(0, maxWidth) / this.vbW, Math.max(0, maxHeight) / this.vbH)
                : 1;
            this.applyScale();
        }

        private applyScale() {
            svg.hydrate(this.canvas, { width: this.width, height: this.height });
        }

        public setLoc(x: number, y: number) {
            svg.hydrate(this.canvas, { x: x, y: y });
        }
    }

    function pixelFill(rgb: number[]): string {
        // like the common view: keep at least 60% lightness so dim colors stay visible
        const [h, s, l] = visuals.rgbToHsl(rgb as [number, number, number]);
        return `hsl(${h}, ${s}%, ${Math.max(l, 60)}%)`;
    }

    export class CalliopeNeoPixelView implements IBoardPart<CommonNeoPixelStateConstructor> {
        public style: string = `
            .sim-neopixel-row-parent {
                transition: transform 0.15s ease-out;
            }
            .sim-neopixel-hit {
                fill: transparent;
                pointer-events: all;
            }
            .sim-neopixel-strip-bg {
                fill: #fff;
                stroke: #999;
                stroke-width: 1;
            }
            .sim-neopixel {
                stroke: rgba(0,0,0,0.35);
                stroke-width: 2;
            }
        `;
        public element: SVGElement;
        public overElement: SVGElement;
        public defs: SVGElement[];
        private host: SVGSVGElement;
        private state: CommonNeoPixelState;
        private row: NeoPixelRow;
        // the strip sits in zoomGroup, which is scaled/moved on hover; hitArea stays at the
        // strip's unzoomed bounds so moving the strip away from the pointer does not end the hover
        private zoomGroup: SVGGElement;
        private hitArea: SVGRectElement;
        private tab: SVGGElement;
        private pin: Pin;
        private lastLocation: Coord = [0, 0];

        constructor(public parsePinString: (name: string) => Pin) {
        }

        public init(bus: EventBus, state: CommonNeoPixelStateConstructor, svgEl: SVGSVGElement, otherParams: Map<string>): void {
            this.host = svgEl;
            this.pin = this.parsePinString(otherParams["dataPin"] || otherParams["pin"])
                || this.parsePinString("pins.NEOPIXEL")
                || this.parsePinString("pins.MOSI");
            // an unresolvable pin must not take the whole simulator down: draw an empty strip instead
            this.state = this.pin ? state(this.pin) : new CommonNeoPixelState();
            this.tab = mkStripTab();
            this.element = svg.elt("g") as SVGGElement;
            this.element.appendChild(this.tab);
            this.overElement = svg.elt("g") as SVGGElement;
            this.hitArea = <SVGRectElement>svg.child(this.overElement, "rect", { class: "sim-neopixel-hit" });
            this.zoomGroup = <SVGGElement>svg.child(this.overElement, "g", { class: "sim-neopixel-row-parent" });
            // mouseenter/leave on the parent cover both the hit area and the zoomed strip
            this.overElement.addEventListener("mouseenter", () => this.zoomIn());
            this.overElement.addEventListener("mouseleave", () => this.zoomOut());
            this.makeRow();
        }

        private makeRow() {
            if (this.row) this.zoomGroup.removeChild(this.row.canvas);
            this.row = new NeoPixelRow(this.state.width);
            this.zoomGroup.appendChild(this.row.canvas);
            this.updateLoc();
        }

        public moveToCoord(xy: Coord): void {
            this.lastLocation = [xy[0], xy[1]];
            this.updateLoc();
        }

        private updateLoc() {
            const [x, y] = this.lastLocation;
            U.assert(typeof x === "number" && typeof y === "number", "invalid x,y for NeoPixel strip");
            svg.hydrate(this.tab, { transform: `translate(${x} ${y})` });
            // the strip hangs below the tab and may extend up to the right and bottom edges of the
            // simulator view (many rows, e.g. with a small matrix width, would otherwise be clipped)
            const rowX = x + NP_STRIP_LEFT;
            const rowY = y + NP_STRIP_TOP;
            const vb = this.host && this.host.viewBox && this.host.viewBox.baseVal;
            if (vb && vb.width > 0 && vb.height > 0)
                this.row.fit(vb.x + vb.width - NP_RIGHT_MARGIN - rowX, vb.y + vb.height - NP_BOTTOM_MARGIN - rowY);
            this.row.setLoc(rowX, rowY);
            svg.hydrate(this.hitArea, { x: rowX, y: rowY, width: this.row.width, height: this.row.height });
        }

        // Enlarge the strip on hover, as far as the visible part of the simulator allows. Outside
        // full screen the view is small, so the zoom is limited (or skipped) instead of clipping.
        private zoomIn() {
            const ctm = this.host && this.host.getScreenCTM();
            if (!ctm) return;
            const hr = this.host.getBoundingClientRect();
            const inv = ctm.inverse();
            const tl = new DOMPoint(Math.max(hr.left, 0), Math.max(hr.top, 0)).matrixTransform(inv);
            const br = new DOMPoint(Math.min(hr.right, window.innerWidth), Math.min(hr.bottom, window.innerHeight)).matrixTransform(inv);
            const m = NP_ZOOM_MARGIN;
            const w = this.row.width;
            const h = this.row.height;
            if (!w || !h) return;
            const maxZoom = Math.max(NP_MAX_ZOOM, 1 / this.row.fitScale);
            const s = Math.min(maxZoom, (br.x - tl.x - 2 * m) / w, (br.y - tl.y - 2 * m) / h);
            if (s <= 1.05) return;
            // scale around the strip's centre, then shift it back inside the visible area
            const x = +this.row.canvas.getAttribute("x");
            const y = +this.row.canvas.getAttribute("y");
            const cx = x + w / 2;
            const cy = y + h / 2;
            const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
            const ncx = clamp(cx, tl.x + m + w * s / 2, br.x - m - w * s / 2);
            const ncy = clamp(cy, tl.y + m + h * s / 2, br.y - m - h * s / 2);
            this.zoomGroup.style.transform = `translate(${ncx - s * cx}px, ${ncy - s * cy}px) scale(${s})`;
        }

        private zoomOut() {
            this.zoomGroup.style.transform = "";
        }

        public updateState(): void {
            if (this.state.width != this.row.cols) this.makeRow();
            const colors: number[][] = [];
            for (let i = 0; i < this.state.length; i++)
                colors.push(this.state.pixelColor(i));
            this.row.update(colors);
            // the strip size depends on the pixel count, so re-fit after a layout change
            this.updateLoc();
        }

        public updateTheme(): void { }
    }
}
