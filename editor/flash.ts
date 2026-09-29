const imul = (Math as any).imul;
const timeoutMessage = "timeout";
const membase = 0x20000000;
const loadAddr = membase;
const dataAddr = 0x20002000;
const stackAddr = 0x20001000;
const FULL_FLASH_TIMEOUT = 100000; // 100s
const PARTIAL_FLASH_TIMEOUT = 60000; // 60s
const CONNECTION_CHECK_TIMEOUT = 2000; // 2s
const RETRY_DAP_CMD_TIMEOUT = 50; // .05s

const flashPageBIN = new Uint32Array([
    0xbe00be00, // bkpt - LR is set to this
    0x2502b5f0, 0x4c204b1f, 0xf3bf511d, 0xf3bf8f6f, 0x25808f4f, 0x002e00ed,
    0x2f00595f, 0x25a1d0fc, 0x515800ed, 0x2d00599d, 0x2500d0fc, 0xf3bf511d,
    0xf3bf8f6f, 0x25808f4f, 0x002e00ed, 0x2f00595f, 0x2501d0fc, 0xf3bf511d,
    0xf3bf8f6f, 0x599d8f4f, 0xd0fc2d00, 0x25002680, 0x00f60092, 0xd1094295,
    0x511a2200, 0x8f6ff3bf, 0x8f4ff3bf, 0x2a00599a, 0xbdf0d0fc, 0x5147594f,
    0x2f00599f, 0x3504d0fc, 0x46c0e7ec, 0x4001e000, 0x00000504,
])

// void computeHashes(uint32_t *dst, uint8_t *ptr, uint32_t pageSize, uint32_t numPages)
const computeChecksums2 = new Uint32Array([
    0x4c27b5f0, 0x44a52680, 0x22009201, 0x91004f25, 0x00769303, 0x24080013,
    0x25010019, 0x40eb4029, 0xd0002900, 0x3c01407b, 0xd1f52c00, 0x468c0091,
    0xa9044665, 0x506b3201, 0xd1eb42b2, 0x089b9b01, 0x23139302, 0x9b03469c,
    0xd104429c, 0x2000be2a, 0x449d4b15, 0x9f00bdf0, 0x4d149e02, 0x49154a14,
    0x3e01cf08, 0x2111434b, 0x491341cb, 0x405a434b, 0x4663405d, 0x230541da,
    0x4b10435a, 0x466318d2, 0x230541dd, 0x4b0d435d, 0x2e0018ed, 0x6002d1e7,
    0x9a009b01, 0x18d36045, 0x93003008, 0xe7d23401, 0xfffffbec, 0xedb88320,
    0x00000414, 0x1ec3a6c8, 0x2f9be6cc, 0xcc9e2d51, 0x1b873593, 0xe6546b64,
])

let startTime = 0
function log(msg: string) {
    let now = Date.now()
    if (!startTime) startTime = now
    now -= startTime
    let ts = ("00000" + now).slice(-5)
    pxt.debug(`dap ${ts}: ${msg}`)
}
const logV = /webusbdbg=1/.test(window.location.href) ? log : (msg: string) => { }
// visible logger for serial diagnostics: pxt.debug (used by log()) is gated off
// in production, so route serial troubleshooting straight to the console when
// ?webusbdbg=1 is present.
const logSerial = /webusbdbg=1/.test(window.location.href)
    ? (msg: string) => console.log(`jlink serial: ${msg}`)
    : (msg: string) => { }
const setBaudRateOnConnection = !/webusbbaud=0/.test(window.location.href)
const resetOnConnection = !/webusbreset=0/.test(window.location.href)

function murmur3_core(data: Uint8Array) {
    let h0 = 0x2F9BE6CC;
    let h1 = 0x1EC3A6C8;

    for (let i = 0; i < data.length; i += 4) {
        let k = pxt.HF2.read32(data, i) >>> 0
        k = imul(k, 0xcc9e2d51);
        k = (k << 15) | (k >>> 17);
        k = imul(k, 0x1b873593);

        h0 ^= k;
        h1 ^= k;
        h0 = (h0 << 13) | (h0 >>> 19);
        h1 = (h1 << 13) | (h1 >>> 19);
        h0 = (imul(h0, 5) + 0xe6546b64) >>> 0;
        h1 = (imul(h1, 5) + 0xe6546b64) >>> 0;
    }
    return [h0, h1]
}

function bufferConcat(a: Uint8Array, b: Uint8Array) {
    const r = new Uint8Array(a.length + b.length)
    r.set(a, 0)
    r.set(b, a.length)
    return r
}

class DAPWrapper implements pxt.packetio.PacketIOWrapper {
    private initialized = false
    familyID: number;
    private dap: DapJS.DAP;
    private cortexM: DapJS.CortexM
    private flashAborted = false;
    private connectionId = 0;
    private pbuf = new pxt.U.PromiseBuffer<Uint8Array>();
    private pageSize = 1024;
    private numPages = 256;

    private usesCODAL: boolean = undefined;
    // we don't know yet if jacdac was compiled in the hex
    private jacdacInHex: boolean = undefined
    private forceFullFlash = /webusbfullflash=1/.test(window.location.href);

    onSerial = (buf: Uint8Array, isStderr: boolean) => { };
    onCustomEvent = (type: string, payload: Uint8Array) => { };

    constructor(public readonly io: pxt.packetio.PacketIO) {
        this.familyID = 0x0D28; // this is the microbit vendor id, not quite UF2 family id
        this.io.onDeviceConnectionChanged = async (connect) => {
            log(`device connection changed`);
            await this.disconnectAsync()
            // we don't know what's being connected
            this.usesCODAL = undefined
            this.jacdacInHex = undefined

            if (!connect) return;
            await this.reconnectAsync()
        }

        this.io.onData = buf => {
            // console.log("RD: " + pxt.Util.toHex(buf))
            this.pbuf.push(buf);
        }

        this.allocDAP();
    }

    icon = "icon usb";

    private pendingSerial: Uint8Array
    private lastPendingSerial: number

    private processSerialLine(line: Uint8Array) {
        if (this.onSerial) {
            try {
                // catch encoding bugs
                this.onSerial(line, false)
            }
            catch (err) {
                log(`serial decoding error: ${err.message}`);
                pxt.tickEvent("hid.flash.serial.decode.error");
                console.error({ err, line })
            }
        }
    }

    private async readSerial(): Promise<number> {
        let buf = await this.dapCmdNums(0x83)
        const len = buf[1]
        // concat received data with previous data
        if (len) {
            buf = buf.slice(2, 2 + len)
            if (this.pendingSerial) buf = bufferConcat(this.pendingSerial, buf)
            let ptr = 0
            let beg = 0
            while (ptr < buf.length) {
                if (buf[ptr] == 10 || buf[ptr] == 13) {
                    ptr++;
                    // eat \r\n
                    while (ptr < buf.length && (buf[ptr] == 10 || buf[ptr] == 13))
                        ptr++;
                    const line = buf.slice(beg, ptr)
                    if (line.length)
                        this.processSerialLine(line);
                    beg = ptr
                }
                else
                    ptr++
            }
            buf = buf.slice(beg)
            this.pendingSerial = buf.length ? buf : null
            if (this.pendingSerial) {
                this.lastPendingSerial = Date.now()
                //logV(`pending serial ${this.pendingSerial.length}`)
            }
        } else if (this.pendingSerial) {
            const d = Date.now() - this.lastPendingSerial
            if (d > 500) {
                this.processSerialLine(this.pendingSerial)
                this.pendingSerial = null
                this.lastPendingSerial = undefined
            }
        }
        return len
    }

    private startReadSerial(connectionId: number) {
        const startTime = Date.now();
        log(`start read serial ${connectionId}`)
        const readSerialLoop = async () => {
            try {
                let numSer = 0
                let numEv = 0
                while (connectionId === this.connectionId) {
                    numSer = await this.readSerial()
                    // we need to read jacdac in a tight loop
                    // so we don't miss any event
                    if (this.xchgAddr)
                        numEv = await this.jacdacProcess()
                    else
                        numEv = 0

                    // no data on either side, wait as little as possible
                    // the browser will eventually throttle this call
                    // https://developer.mozilla.org/en-US/docs/Web/API/setTimeout#reasons_for_delays_longer_than_specified
                    if (!numSer && !numEv)
                        await pxt.U.delay(0)
                }
                log(`stopped serial reader ${connectionId}`)
            } catch (err) {
                log(`serial error ${connectionId}: ${err.message}`);
                console.error(err)
                if (connectionId != this.connectionId) {
                    log(`stopped serial reader ${connectionId}`)
                } else {
                    pxt.tickEvent("hid.flash.serial.error");
                    const timeRunning = Date.now() - startTime
                    await this.disconnectAsync(); // force disconnect
                    // if we've been running for a while, try reconnecting
                    if (timeRunning > 1000) {
                        log(`auto-reconnect`)
                        try {
                            await this.reconnectAsync();
                        } catch (e) {
                            if (e.type === "devicenotfound")
                                return
                            throw e
                        }
                    }
                }
            }
            finally {
                this.pendingSerial = undefined
                this.lastPendingSerial = undefined
            }
        }

        readSerialLoop();
    }

    private stopReadersAsync() {
        log(`cancelling connection ${this.connectionId}`)
        this.connectionId++;
        return pxt.Util.delay(200);
    }

    private allocDAP() {
        log(`alloc dap`);
        const h = this.io;
        this.dap = new DapJS.DAP({
            write: data => h.sendPacketAsync(new Uint8Array(data)),
            close: this.disconnectAsync,
            read: () => this.recvPacketAsync(),
            //sendMany: sendMany
        });
        this.cortexM = new DapJS.CortexM(this.dap);
    }

    get binName() {
        return `${this.devVariant}-${pxtc.BINARY_HEX}`;
    }

    get devVariant() {
        if (this.usesCODAL === undefined)
            console.warn('try to access codal information before it is computed')
        return this.usesCODAL ? "mbcodal" : "mbdal";
    }

    unsupportedParts() {
        if (this.usesCODAL === undefined)
            console.warn('try to access codal information before it is computed')
        if (!this.usesCODAL) {
            // "microphone" is NOT listed: v1/v2 read the analog MEMS mic via
            // the DAL fallback in libs/microphone/microphone.cpp
            return ["logotouch", "builtinspeaker", "flashlog", "v2"]
        }
        return [];
    }

    isConnected(): boolean {
        return this.io.isConnected() && this.initialized
    }

    isConnecting(): boolean {
        return this.io.isConnecting() || (this.io.isConnected() && !this.initialized)
    }

    private async getBaudRate() {
        const readSerialSettings = new Uint8Array([0x81])  // get serial settings
        const serialSettings = await this.dapCmd(readSerialSettings)
        const baud = (serialSettings[4] << 24) + (serialSettings[3] << 16) + (serialSettings[2] << 8) + serialSettings[1]
        return baud
    }

    private async setBaudRate() {
        const currentBaudRate = await this.getBaudRate()
        if (currentBaudRate === 115200) {
            log(`baud rate already set to 115200`)
            return
        }
        log(`set baud rate to 115200`)
        const baud = new Uint8Array(5)
        baud[0] = 0x82 // set baud
        pxt.HF2.write32(baud, 1, 115200)
        await this.dapCmd(baud)
        // setting the baud rate on serial may reset NRF (depending on daplink version), so delay after
        await pxt.Util.delay(200);
    }

    private async readPageSize() {
        const res = await this.readWords(0x10000010, 2);
        this.pageSize = res[0]
        this.numPages = res[1]
        log(`page size ${this.pageSize}, num pages ${this.numPages}`);
    }

    async reconnectAsync(): Promise<void> {
        log(`reconnect`)
        this.initialized = false
        this.flashAborted = false;
        this.io.onConnectionChanged()

        function stringResponse(buf: Uint8Array) {
            return pxt.U.uint8ArrayToString(buf.slice(2, 2 + buf[1]))
        }

        await this.stopReadersAsync()
        const connectionId = this.connectionId

        this.allocDAP(); // clean dap apis

        await this.io.reconnectAsync()

        await this.clearCommandsAsync()

        // halt before reading from dap
        // to avoid interference from data logger
        await this.cortexM.halt()

        const info = await this.getDaplinkVersionAsync(); // info
        const daplinkVersion = stringResponse(info);
        log(`daplink version: ${daplinkVersion}`);

        const r = await this.dapCmdNums(0x80)
        this.usesCODAL = r[2] == 57 && r[3] == 57 && r[5] >= 51;
        const binVersion = stringResponse(r);
        log(`bin name: ${this.binName} v:${binVersion}`);

        pxt.tickEvent("hid.flash.connect", { codal: this.usesCODAL ? 1 : 0, daplink: daplinkVersion, bin: binVersion });

        if (setBaudRateOnConnection)
            await this.setBaudRate()
        // only init after setting baud rate, in case we got reset
        await this.cortexM.init()
        if (resetOnConnection) {
            log(`reset cortex`)
            await this.cortexM.reset(true)
        }

        await this.readPageSize()
        // jacdac needs to run to set the xchg address
        await this.checkStateAsync(true);
        await this.initJacdac(connectionId)

        this.initialized = true
        this.io.onConnectionChanged()
        // The board revision (usesCODAL, probed above) is only known now, so this is the
        // earliest point at which the simulator can be matched to the connected device.
        // Pass the probed value directly: the devVariant getter reports "mbdal" whenever
        // usesCODAL is still undefined (it is reset on every disconnect), which would
        // publish a wrong variant while a device swap is in flight.
        syncSimulatorWithDevice(this.usesCODAL ? "mbcodal" : "mbdal")
        // start jacdac, serial async
        this.startReadSerial(connectionId)
    }

    private async clearCommandsAsync() {
        try {
            await pxt.Util.promiseTimeout(CONNECTION_CHECK_TIMEOUT, (async () => {
                // before calling into dapjs, push through a few commands to make sure the responses
                // to commands from previous sessions (if any) are flushed. Count of 5 is arbitrary.
                for (let i = 0; i < 5; i++) {
                    try {
                        await this.getDaplinkVersionAsync();
                    } catch (e) { }
                }
            })());
        } catch (e) {
            const errOut = new Error(e);
            (errOut as any).type = "inittimeout";
            throw errOut;
        }
    }

    private async getDaplinkVersionAsync() {
        return await this.dapCmdNums(0x00, 0x04);
    }

    private async checkStateAsync(resume?: boolean): Promise<void> {
        const states = ["reset", "lockup", "sleeping", "halted", "running"]
        try {
            const state = await this.cortexM.getState();
            log(`cortex state: ${states[state]}`)
            if (resume && state == DapJS.CoreState.TARGET_HALTED)
                await this.cortexM.resume();
        } catch (e) {
            log(`cortex state failed`)
            pxt.tickEvent("hid.checkstate.error")
            console.debug(e)
        }
    }

    private checkAborted() {
        if (this.flashAborted)
            throw new Error(lf("Download cancelled"));
    }

    async disconnectAsync() {
        log(`disconnect`)
        this.flashAborted = true;
        this.initialized = false;
        await this.stopReadersAsync();
        await this.io.disconnectAsync();
    }

    async reflashAsync(
        resp: pxtc.CompileResult,
        progressCallback?: (percentageComplete: number) => void
    ): Promise<void> {
        pxt.tickEvent("hid.flash.start");

        log("reflash")
        startTime = 0
        // JACDAC_WEBUSB is defined in microsoft/pxt-jacdac/pxt.json
        const codalJson = resp.outfiles["codal.json"]
        this.jacdacInHex = codalJson && !!pxt.Util.jsonTryParse(codalJson)?.definitions?.JACDAC_WEBUSB;
        this.flashAborted = false;
        if (!this.io.isConnected()) {
            await this.io.reconnectAsync();
        }

        await this.stopReadersAsync();
        await this.clearCommandsAsync()
        await this.cortexM.init();
        await this.cortexM.reset(true);
        await this.checkStateAsync();
        const uicr = await this.readUICR();

        pxt.tickEvent("hid.flash.uicr", { uicr });
        // shortcut, do a full flash
        if (uicr != 0 || this.forceFullFlash) {
            pxt.tickEvent("hid.flash.uicrfail");
            await this.fullVendorCommandFlashAsync(resp, progressCallback);
        } else {
            // check flash checksums
            const chk = await this.computeFlashChecksum(resp);
            pxt.tickEvent("hid.flash.checksum", { quick: chk.quick ? 1 : 0, changed: chk.changed ? chk.changed.length : 0 });
            if (chk.quick) {
                // let's do a quick flash!
                await this.quickHidFlashAsync(chk.changed, progressCallback);
            } else {
                await this.fullVendorCommandFlashAsync(resp, progressCallback);
            }
        }

        await this.checkStateAsync(true);
        pxt.tickEvent("hid.flash.success");
        // don't disconnect here
        // the micro:bit will automatically disconnect and reconnect
        // via the webusb events
    }

    private recvPacketAsync(timeout?: number) {
        if (this.io.recvPacketAsync)
            return this.io.recvPacketAsync(timeout);
        else
            return this.pbuf.shiftAsync(timeout);
    }

    private async dapCmd(buf: Uint8Array) {
        await this.io.sendPacketAsync(buf);
        const resp = await this.recvPacketAsync();
        if (resp[0] != buf[0]) {
            pxt.tickEvent('hid.flash.cmderror', { req: buf[0], resp: resp[0] });
            const msg = `bad dapCmd response: ${buf[0]} -> ${resp[0]}`

            // in case we got an invalid response, try to get another response, in case the current
            // response is a left-over from previous communications
            log(msg + "; retrying");
            try {
                // Add in a timeout, as this can stall if device thinks communication is complete.
                const secondTryResp = await this.recvPacketAsync(RETRY_DAP_CMD_TIMEOUT);
                if (secondTryResp[0] === buf[0]) {
                    log(msg + "; retry success");
                    return secondTryResp;
                }
            } catch (e) {
                pxt.tickEvent('hid.flash.cmderror.retryfailed', { req: buf[0], resp: resp[0] });
                log(e);
            }
            throw new Error(`retry failed ${msg}`);
        }
        return resp;
    }

    private dapCmdNums(...nums: number[]) {
        return this.dapCmd(new Uint8Array(nums))
    }

    private async fullVendorCommandFlashAsync(
        resp: pxtc.CompileResult,
        progressCallback?: (percentageComplete: number) => void
    ): Promise<void> {
        log("full flash")
        pxt.tickEvent("hid.flash.full.start");

        const start = Date.now();
        const chunkSize = 62;
        let sentPages = 0;
        try {
            await pxt.Util.promiseTimeout(
                FULL_FLASH_TIMEOUT,
                (async () => {
                    const dapOpenRes = await this.dapCmdNums(0x8A /* DAPLinkFlash.OPEN */, 1);
                    log(`daplinkflash open: ${pxt.U.toHex(dapOpenRes)}`);
                    if (dapOpenRes[1] !== 0) {
                        pxt.tickEvent('hid.flash.full.error.open', { res: dapOpenRes[1] });
                        throw new Error(lf("Download failed, please try again"));
                    }
                    const binFile = this.getBinFile(resp);
                    log(`bin file ${this.binName} in ${Object.keys(resp.outfiles).join(', ')}, ${binFile?.length || -1}b`);
                    const hexUint8 = pxt.U.stringToUint8Array(binFile);
                    log(`hex ${hexUint8?.byteLength || -1}b, ~${(hexUint8.byteLength / chunkSize) | 0} chunks of ${chunkSize}b`);

                    let offset = 0;

                    while (offset < hexUint8.length) {
                        const end = Math.min(hexUint8.length, offset + chunkSize);
                        const nextPageData = hexUint8.slice(offset, end);
                        const cmdData = new Uint8Array(2 + nextPageData.length);
                        cmdData[0] = 0x8C; /* DAPLinkFlash.WRITE */
                        cmdData[1] = nextPageData.length;
                        cmdData.set(nextPageData, 2);
                        if (sentPages % 128 == 0) { // reduce logging
                            progressCallback(offset / hexUint8.length);
                            log(`next page ${sentPages}: [${offset.toString(16)}, ${end.toString(16)}] (${Math.ceil((hexUint8.length - end) / 1000)}kb left)`);
                        }
                        await this.dapCmd(cmdData);
                        this.checkAborted();
                        sentPages++;
                        offset = end;
                    }

                    log("close");
                    const closeRes = await this.dapCmdNums(0x8B /* DAPLinkFlash.CLOSE */);
                    log(`daplinkclose: ${pxt.U.toHex(closeRes)}`);
                    const resetRes = await this.dapCmdNums(0x89 /* DAPLinkFlash.RESET */);
                    log(`daplinkreset: ${pxt.U.toHex(resetRes)}`);
                    log(`full flash done after ${Date.now() - start}ms`);
                    pxt.tickEvent("hid.flash.full.success");
                })(),
                timeoutMessage
            )
        } catch (e) {
            log(`error: abort`);
            pxt.tickEvent("hid.flash.full.error");
            this.flashAborted = true;
            return this.resetAndThrowAsync(e);
        };
    }

    private async resetAndThrowAsync(e: any) {
        log(`reset on error`);
        pxt.tickEvent("hid.flash.reset");
        console.debug(e);
        // reset any pending daplink
        try {
            await this.dapCmdNums(0x89 /* DAPLinkFlash.RESET */);
        } catch (e) {
            // Best effort reset, no-op if there's an error
        }
        try {
            await this.cortexM.reset(false);
        } catch (e) {
            // Best effort reset, no-op if there's an error
        }
        throw e;
    }

    private async readUICR() {
        const v = await this.readWords(0x10001014, 1);
        const uicr = v[0] & 0xff;
        log(`uicr: ${uicr.toString(16)} (${v[0].toString(16)})`);
        return uicr;
    }

    private getBinFile(resp: pxtc.CompileResult) {
        const multiVariantBinFile = resp.outfiles[this.binName];
        if (multiVariantBinFile)
            return multiVariantBinFile;

        const dvBin = resp.builtVariants?.find(el => el === this.devVariant) && resp.outfiles[pxtc.BINARY_HEX];
        if (dvBin)
            return resp.outfiles[pxtc.BINARY_HEX];

        throw new Error(`unable to find ${this.binName} in outfiles ${Object.keys(resp.outfiles).join(', ')}`);
    }

    private async computeFlashChecksum(resp: pxtc.CompileResult) {
        const binFile = this.getBinFile(resp);

        const checksums = await this.getFlashChecksumsAsync();
        log(`checksums ${pxt.Util.toHex(checksums)}`);
        // TODO this is seriously inefficient (130ms on a fast machine)
        const uf2 = ts.pxtc.UF2.newBlockFile();
        ts.pxtc.UF2.writeHex(uf2, binFile.split(/\r?\n/));
        const bytes = pxt.U.stringToUint8Array(ts.pxtc.UF2.serializeFile(uf2));
        const parsed = ts.pxtc.UF2.parseFile(bytes);

        const aligned = DAPWrapper.pageAlignBlocks(parsed, this.pageSize);
        const changed = DAPWrapper.onlyChanged(aligned, checksums, this.pageSize);
        const quick = changed.length < aligned.length / 2;
        log(`pages: ${aligned.length}, changed ${changed.length}, ${quick ? "quick" : "full"}`);
        return {
            quick,
            changed
        }
    }

    private async quickHidFlashAsync(
        changed: ts.pxtc.UF2.Block[],
        progressCallback?: (percentageComplete: number) => void
    ): Promise<void> {
        log("quick flash")
        pxt.tickEvent("hid.flash.quick.start");

        const start = Date.now();
        const runFlash = async (b: ts.pxtc.UF2.Block, dataAddr: number) => {
            const cmd = this.cortexM.prepareCommand();

            cmd.halt();

            cmd.writeCoreRegister(DapJS.CortexReg.PC, loadAddr + 4 + 1);
            cmd.writeCoreRegister(DapJS.CortexReg.LR, loadAddr + 1);
            cmd.writeCoreRegister(DapJS.CortexReg.SP, stackAddr);

            cmd.writeCoreRegister(0, b.targetAddr);
            cmd.writeCoreRegister(1, dataAddr);
            cmd.writeCoreRegister(2, this.pageSize >> 2);

            logV("setregs");
            await cmd.go();
            // starts the program
            logV(`cortex.debug.enable`);
            return this.cortexM.debug.enable();
        }

        const quickHidFlashCoreAsync = async () => {
            await this.cortexM.memory.writeBlock(loadAddr, flashPageBIN);
            for (let i = 0; i < changed.length; i++) {
                this.checkAborted();
                let b = changed[i];
                if (b.targetAddr >= 0x10000000) {
                    log(`target address 0x${b.targetAddr.toString(16)} > 0x10000000`);
                    continue;
                }

                log(`about to write at 0x${b.targetAddr.toString(16)}`);
                progressCallback(i / changed.length);

                const thisAddr = (i & 1) ? dataAddr : dataAddr + this.pageSize;
                const nextAddr = (i & 1) ? dataAddr + this.pageSize : dataAddr;

                if (i == 0) {
                    const u32data = new Uint32Array(b.data.length / 4);
                    for (let i = 0; i < b.data.length; i += 4)
                        u32data[i >> 2] = pxt.HF2.read32(b.data, i);
                    await this.cortexM.memory.writeBlock(thisAddr, u32data);
                }

                await runFlash(b, thisAddr);
                const next = changed[i + 1];
                if (next) {
                    logV("write next");
                    const buf = new Uint32Array(next.data.buffer);
                    await this.cortexM.memory.writeBlock(nextAddr, buf);
                }
                logV("wait");
                await this.cortexM.waitForHalt(500);
                logV("done block");
            }

            log(`quick flash done after ${Date.now() - start}ms`);
            await this.cortexM.reset(false);
            pxt.tickEvent("hid.flash.quick.success");
            await this.checkStateAsync(true);
        }

        try {
            await pxt.Util.promiseTimeout(
                PARTIAL_FLASH_TIMEOUT,
                quickHidFlashCoreAsync(),
                timeoutMessage
            );
        } catch (e) {
            pxt.tickEvent("hid.flash.quick.error");
            this.flashAborted = true;
            return this.resetAndThrowAsync(e);
        }
    }

    private async getFlashChecksumsAsync() {
        log("flash checksums");
        let pages = this.numPages;
        await this.cortexM.runCode(
            computeChecksums2,
            loadAddr,
            loadAddr + 1,
            0xffffffff,
            stackAddr,
            true,
            dataAddr,
            0,
            this.pageSize,
            pages
        );
        return this.cortexM.memory.readBlock(
            dataAddr,
            pages * 2,
            this.pageSize
        );
    }

    private async readWords(addr: number, numWords: number) {
        const u8 = await this.cortexM.memory.readBlock(addr, numWords, this.pageSize);
        // assume browser is little-endian
        return new Uint32Array(u8.buffer);
    }

    private writeWords(addr: number, buf: Uint32Array) {
        return this.cortexM.memory.writeBlock(addr, buf)
    }

    private async readBytes(addr: number, numBytes: number) {
        const u8 = await this.cortexM.memory.readBlock(addr, (numBytes + 3) >> 2, this.pageSize);
        return u8.length == numBytes ? u8 : u8.slice(0, numBytes);
    }

    static onlyChanged(blocks: ts.pxtc.UF2.Block[], checksums: Uint8Array, pageSize: number) {
        return blocks.filter(b => {
            let idx = b.targetAddr / pageSize
            pxt.U.assert((idx | 0) == idx)
            pxt.U.assert(b.data.length == pageSize)
            if (idx * 8 + 8 > checksums.length)
                return true // out of range?
            let c0 = pxt.HF2.read32(checksums, idx * 8)
            let c1 = pxt.HF2.read32(checksums, idx * 8 + 4)
            let ch = murmur3_core(b.data)
            if (c0 == ch[0] && c1 == ch[1])
                return false
            return true
        })
    }

    static pageAlignBlocks(blocks: ts.pxtc.UF2.Block[], pageSize: number) {
        pxt.U.assert(pageSize % 256 == 0)
        let res: ts.pxtc.UF2.Block[] = []
        for (let i = 0; i < blocks.length;) {
            let b0 = blocks[i]
            let newbuf = new Uint8Array(pageSize)
            for (let i = 0; i < newbuf.length; ++i)
                newbuf[i] = 0xff
            let startPad = b0.targetAddr & (pageSize - 1)
            let newAddr = b0.targetAddr - startPad
            for (; i < blocks.length; ++i) {
                let b = blocks[i]
                if (b.targetAddr + b.payloadSize > newAddr + pageSize)
                    break
                pxt.U.memcpy(newbuf, b.targetAddr - newAddr, b.data, 0, b.payloadSize)
            }
            let bb = pxt.U.flatClone(b0)
            bb.data = newbuf
            bb.targetAddr = newAddr
            bb.payloadSize = pageSize
            res.push(bb)
        }
        return res
    }

    //
    // jacdac stuff starts here
    //

    private irqn: number
    private xchgAddr: number = null
    private lastXchg: number
    private currSend: SendItem
    private sendQ: SendItem[] = []
    private lastSend: number

    sendCustomEventAsync(type: string, buf: Uint8Array): Promise<void> {
        if (type == "jacdac") {
            if (this.xchgAddr == null)
                return Promise.resolve()
            if (buf.length & 3) {
                const tmp = new Uint8Array((buf.length + 3) & ~3)
                tmp.set(buf)
                buf = tmp
            }
            return new Promise<void>(resolve => {
                this.sendQ.push({
                    buf,
                    cb: resolve
                })
            })
        }
        return Promise.reject(new Error("invalid custom event type"))
    }

    private writeWord(addr: number, val: number) {
        return this.cortexM.memory.write32(addr, val)
    }

    private async findJacdacXchgAddr(cid: number): Promise<number> {
        const memStart = 0x2000_0000
        const memStop = memStart + 128 * 1024
        const addr = (await this.readWords(memStop - 4, 1))[0]
        if (cid != this.connectionId) return null
        if (memStart <= addr && addr < memStop) {
            const buf = await this.readWords(addr, 2)
            if (buf[0] == 0x786D444A && buf[1] == 0xB0A6C0E9)
                return addr
        }
        return null
    }

    /**
     * Sniff Jacdac exchange address
     * @returns
     */
    private async initJacdac(connectionId: number) {
        this.xchgAddr = null
        this.irqn = undefined
        this.lastXchg = undefined
        if (!this.usesCODAL) {
            log(`jacdac: CODAL disabled`)
            return
        }
        if (this.jacdacInHex === false) {
            log(`jacdac: jacdac not compiled in`)
            return
        }

        try {
            // allow jacdac to boot
            const now = pxt.U.now()
            await pxt.Util.delay(1000)
            let xchgRetry = 0
            let xchg: number
            while (xchg == null && xchgRetry++ < 3) {
                log(`jacdac: finding xchg address (retry ${xchgRetry})`)
                if (xchgRetry > 0)
                    await pxt.Util.delay(500); // wait for the program to start and setup memory correctly
                if (connectionId != this.connectionId) return;
                xchg = await this.findJacdacXchgAddr(connectionId)
            }
            log(`jacdac: exchange address 0x${xchg ? xchg.toString(16) : "?"}; ${xchgRetry} retries; ${(pxt.U.now() - now) | 0}ms`)
            if (xchg == null) {
                log("jacdac: xchg address not found")
                this.jacdacInHex = false
                pxt.tickEvent("hid.flash.jacdac.error.missingxchg");
                return
            }

            if (connectionId != this.connectionId) return;
            const info = await this.readBytes(xchg, 16)
            if (info[12 + 2] != 0xff) {
                log("jacdac: invalid memory; try power-cycling the micro:bit")
                pxt.tickEvent("hid.flash.jacdac.error.invalidmemory");
                console.debug({ info, xchg })
                return
            }

            // make sure connection is not outdated
            if (connectionId != this.connectionId) return;
            // clear initial lock
            await this.writeWord(xchg + 12, 0)
            // allow serial thread to use jacdac
            this.irqn = info[8]
            this.xchgAddr = xchg
            log(`jacdac: exchange address 0x${this.xchgAddr.toString(16)}; irqn=${this.irqn}`)
            pxt.tickEvent("hid.flash.jacdac.connected");
        } catch (e) {
            if (connectionId != this.connectionId) {
                log(`jacdac: setup aborted`)
                return;
            } else throw e
        }
    }

    private async triggerIRQ() {
        const addr = 0xE000E200 + (this.irqn >> 5) * 4
        await this.writeWord(addr, 1 << (this.irqn & 31))
    }

    private async jacdacProcess(): Promise<number> {
        const now = Date.now()
        if (this.lastXchg && now - this.lastXchg > 50) {
            logV("slow xchg: " + (now - this.lastXchg) + "ms")
        }
        this.lastXchg = now

        let numev = 0
        // TODO only read say 32 bytes first, and more if needed
        let inp = await this.readBytes(this.xchgAddr + 12, 256)
        if (inp[2]) {
            await this.writeWord(this.xchgAddr + 12, 0)
            await this.triggerIRQ()
            inp = inp.slice(0, inp[2] + 12)
            this.onCustomEvent("jacdac", inp)
            numev++
        }

        let sendFree = false
        if (this.currSend) {
            const send = await this.readBytes(this.xchgAddr + 12 + 256, 4)
            if (!send[2]) {
                this.currSend.cb()
                this.currSend = null
                sendFree = true
                numev++
            }
        }

        if (!this.currSend && this.sendQ.length) {
            if (!sendFree) {
                const send = await this.readBytes(this.xchgAddr + 12 + 256, 4)
                if (!send[2])
                    sendFree = true
            }
            if (sendFree) {
                this.currSend = this.sendQ.shift()
                const bbody = this.currSend.buf.slice(4)
                await this.writeWords(this.xchgAddr + 12 + 256 + 4, new Uint32Array(bbody.buffer))
                const bhead = this.currSend.buf.slice(0, 4)
                await this.writeWords(this.xchgAddr + 12 + 256, new Uint32Array(bhead.buffer))
                await this.triggerIRQ()
                this.lastSend = Date.now()
                numev++
            } else {
                if (this.lastSend) {
                    const d = Date.now() - this.lastSend
                    if (d > 50) {
                        this.lastSend = 0
                        console.error("failed to send packet fast enough")
                    }
                }
            }
        }

        return numev
    }
}

interface SendItem {
    buf: Uint8Array
    cb: () => void
}

export function mkDAPLinkPacketIOWrapper(io: pxt.packetio.PacketIO): pxt.packetio.PacketIOWrapper {
    pxt.log(`packetio: mk wrapper dap wrapper`)
    return new DAPWrapper(io);
}

// === Calliope mini v2 support (SEGGER J-Link OB) ===

const JLINK_VID = 0x1366;  // SEGGER
const JLINK_PID = 0x1025;  // Calliope mini v2
const JLINK_INTERFACE = 2; // Vendor-specific interface for J-Link commands

// J-Link MSD protocol commands (captured from SEGGER's WebUSB demo)
const EMU_CMD_GET_CAPS_EX    = 0xED; // Query extended capabilities -> 32 bytes
const EMU_CMD_GET_PROBE_INFO = 0x1C; // Probe info / MSD operations
const PROBE_INFO_GET_CAPS    = 0;    // Subcommand: get probe capabilities -> 4 bytes
const PROBE_INFO_WRITE_CHUNK = 5;    // Subcommand: write 4 KB hex chunk
const PROBE_INFO_WRITE_END   = 6;    // Subcommand: finalise flash -> 4-byte status
const JLINK_MSD_CHUNK_SIZE   = 4096; // Probe expects 4 KB chunks

function jlinkBuildGetCapsExCmd(): Uint8Array {
    return new Uint8Array([EMU_CMD_GET_CAPS_EX]);
}

function jlinkBuildProbeInfoCmd(sub: number, data?: Uint8Array): Uint8Array {
    if (data) {
        const pkt = new Uint8Array(6 + data.length);
        pkt[0] = EMU_CMD_GET_PROBE_INFO;
        pkt[1] = sub;
        pkt[2] = data.length & 0xFF;
        pkt[3] = (data.length >> 8) & 0xFF;
        pkt[4] = 0x00;
        pkt[5] = 0x00;
        pkt.set(data, 6);
        return pkt;
    }
    return new Uint8Array([EMU_CMD_GET_PROBE_INFO, sub]);
}

/**
 * PacketIOWrapper for Calliope mini v2 (SEGGER J-Link OB interface).
 *
 * Flash protocol: J-Link MSD — send Intel HEX as 4 KB chunks directly
 * to the probe; it handles erase, program, verify and reset internally.
 * No partial-flashing support; every download is a full flash.
 *
 * Serial: the nRF UART is bridged by the J-Link OB to a standard USB
 * CDC-ACM Virtual COM Port, a separate USB function from the vendor
 * interface used for flashing.  We read it through the Web Serial API
 * (navigator.serial) rather than WebUSB, because the OS serial driver
 * (cdc_acm on Linux, usbser.sys on Windows) owns the CDC interfaces and
 * WebUSB cannot claim them.  Web Serial layers on top of that driver, so
 * it works cross-platform.  Requires a Chromium browser; on browsers
 * without navigator.serial the serial monitor is silently unavailable
 * (flashing still works everywhere).
 */
class JLinkPacketIOWrapper implements pxt.packetio.PacketIOWrapper {
    icon = "icon usb";
    familyID = 0x9902;   // synthetic ID for Calliope v2
    onSerial: (buf: Uint8Array, isStderr: boolean) => void = () => {};
    onCustomEvent: (type: string, payload: Uint8Array) => void = () => {};
    devVariant = "mbdal"; // Calliope v2 uses the same mbdal hex as v1

    private initialized = false;
    private connecting  = false;
    private jlinkInEP   = 3;   // defaults for Calliope v2.0; auto-detected below
    private jlinkOutEP  = 2;
    private disconnectListener: (ev: pxt.usb.USBConnectionEvent) => void = null;
    private connectListener:    (ev: pxt.usb.USBConnectionEvent) => void = null;

    // Web Serial state for the CDC Virtual COM Port (target UART bridge)
    private serialPort:   any /* SerialPort */ = null;
    private serialReader: any /* ReadableStreamDefaultReader<Uint8Array> */ = null;
    private serialGen     = 0; // bumped on stop to cancel the read loop
    private serialLoopEnd: Promise<void> = Promise.resolve(); // settles when the read loop has released its lock
    private serialRetries = 0; // transient bring-up failures retried so far (see scheduleSerialRetry)

    constructor(
        public readonly io: pxt.packetio.PacketIO,
        private device: pxt.usb.USBDevice,
    ) {}

    isConnected()  { return this.initialized; }
    isConnecting() { return this.connecting;  }

    async reconnectAsync(): Promise<void> {
        if (this.connecting) {
            log("jlink: reconnect already in progress, skipping");
            return;
        }
        log("jlink: reconnect");
        this.removeDisconnectListener();
        this.removeConnectListener();
        this.initialized = false;
        this.connecting  = true;
        this.io.onConnectionChanged();

        try {
            if (!this.device.opened)
                await this.device.open();
            try { await this.device.selectConfiguration(1); } catch (e) {
                // already configured by the OS — not fatal
                log(`jlink: selectConfiguration ignored: ${(e as Error).message}`);
            }

            // Detect endpoint numbers (they differ between Calliope v2.0 and v2.1)
            const jlinkIface = this.device.configurations[0]?.interfaces
                .find((i: pxt.usb.USBInterface) => i.interfaceNumber === JLINK_INTERFACE);
            if (jlinkIface) {
                for (const ep of jlinkIface.alternate.endpoints) {
                    if (ep.direction === "in") this.jlinkInEP  = ep.endpointNumber;
                    else                       this.jlinkOutEP = ep.endpointNumber;
                }
            }
            log(`jlink: endpoints in=${this.jlinkInEP} out=${this.jlinkOutEP}`);

            await this.device.claimInterface(JLINK_INTERFACE);
            log("jlink: interface claimed");

            // Handshake: verify the probe supports MSD flashing
            const capsResp = await this.sendCmd(jlinkBuildGetCapsExCmd());
            if (capsResp.byteLength !== 32)
                throw new Error(`J-Link GET_CAPS_EX: expected 32 B, got ${capsResp.byteLength}`);

            const probeResp = await this.sendCmd(jlinkBuildProbeInfoCmd(PROBE_INFO_GET_CAPS));
            if (probeResp.byteLength !== 4)
                throw new Error(`J-Link GET_PROBE_INFO: expected 4 B, got ${probeResp.byteLength}`);

            const caps = probeResp[0] | (probeResp[1] << 8) | (probeResp[2] << 16) | (probeResp[3] << 24);
            if (!(caps & 0x01))
                throw new Error("J-Link probe does not support MSD flashing");

            // Watch for unplug; when the device comes back, reconnect automatically.
            this.disconnectListener = (ev: pxt.usb.USBConnectionEvent) => {
                if (ev.device !== this.device) return;
                log("jlink: device disconnected");
                this.initialized = false;
                this.connecting  = false;
                this.stopSerial();
                this.removeDisconnectListener();
                this.io.onConnectionChanged();

                // Re-connect as soon as the same device is plugged back in.
                this.connectListener = (cev: pxt.usb.USBConnectionEvent) => {
                    if (cev.device.vendorId !== JLINK_VID || cev.device.productId !== JLINK_PID) return;
                    log("jlink: device reconnected");
                    this.device = cev.device;   // update to fresh device object
                    this.removeConnectListener();
                    this.reconnectAsync().catch((err: Error) => {
                        log(`jlink: auto-reconnect failed: ${err.message}`);
                        this.initialized = false;
                        this.connecting  = false;
                        this.io.onConnectionChanged();
                    });
                };
                navigator.usb?.addEventListener("connect", this.connectListener);
            };
            navigator.usb?.addEventListener("disconnect", this.disconnectListener);

            log("jlink: ready");
            this.initialized = true;
            this.connecting  = false;
            this.io.onConnectionChanged();
            // A J-Link board is always a mini v2 (devVariant "mbdal"); match the simulator.
            syncSimulatorWithDevice(this.devVariant);

            // start serial reader (best-effort; failure must not break flashing)
            this.serialRetries = 0;
            this.startSerialAsync()
                .catch(e => log(`jlink serial: start failed: ${(e as Error).message}`));
        } catch (e) {
            log(`jlink: reconnect error: ${(e as Error).message}`);
            this.initialized = false;
            this.connecting  = false;
            this.removeDisconnectListener();
            this.removeConnectListener();
            // Leave the device fully closed so the next attempt starts clean:
            // an open device with a claimed interface makes the next
            // claimInterface() fail ("interface already claimed") until replug.
            if (this.device.opened) {
                try { await this.device.releaseInterface(JLINK_INTERFACE); } catch (err) { }
                try { await this.device.close(); } catch (err) { }
            }
            this.io.onConnectionChanged();
            throw e;
        }
    }

    async disconnectAsync(): Promise<void> {
        log("jlink: disconnect");
        this.initialized = false;
        this.connecting  = false;
        await this.stopSerial();
        this.removeDisconnectListener();
        this.removeConnectListener();
        if (this.device.opened) {
            try { await this.device.releaseInterface(JLINK_INTERFACE); } catch (e) { }
            await this.device.close();
        }
        await this.io.disconnectAsync();
    }

    private removeDisconnectListener(): void {
        if (this.disconnectListener) {
            navigator.usb?.removeEventListener("disconnect", this.disconnectListener);
            this.disconnectListener = null;
        }
    }

    private removeConnectListener(): void {
        if (this.connectListener) {
            navigator.usb?.removeEventListener("connect", this.connectListener);
            this.connectListener = null;
        }
    }

    async reflashAsync(resp: pxtc.CompileResult, progressCallback?: (p: number) => void): Promise<void> {
        log("jlink: reflash");
        pxt.tickEvent("hid.jlink.flash.start");

        const hexFile = resp.outfiles["mbdal-" + pxtc.BINARY_HEX];
        if (!hexFile)
            throw new Error(lf("Download failed: firmware not found"));

        // Quiesce the CDC serial reader while the probe flashes and resets the
        // target; restarted after the flash so the monitor keeps working.
        await this.stopSerial();

        try {
            await pxt.Util.promiseTimeout(
                FULL_FLASH_TIMEOUT,
                (async () => {
                    const data = pxt.U.stringToUint8Array(hexFile);
                    const totalChunks = Math.ceil(data.length / JLINK_MSD_CHUNK_SIZE);
                    for (let i = 0; i < totalChunks; i++) {
                        const chunk = data.slice(
                            i * JLINK_MSD_CHUNK_SIZE,
                            Math.min((i + 1) * JLINK_MSD_CHUNK_SIZE, data.length)
                        );
                        await this.sendCmd(jlinkBuildProbeInfoCmd(PROBE_INFO_WRITE_CHUNK, chunk), false);
                        if (progressCallback) progressCallback((i + 1) / totalChunks);
                    }

                    const finResp = await this.sendCmd(jlinkBuildProbeInfoCmd(PROBE_INFO_WRITE_END));
                    if (finResp.byteLength !== 4)
                        throw new Error(`J-Link finalize: expected 4 B, got ${finResp.byteLength}`);

                    const result = finResp[0] | (finResp[1] << 8) | (finResp[2] << 16) | (finResp[3] << 24);
                    if (result !== 0)
                        throw new Error(lf("Download failed (J-Link error {0})", result));
                })(),
                lf("Download timed out, please try again")
            );
        } catch (e) {
            pxt.tickEvent("hid.jlink.flash.error");
            throw e;
        }

        pxt.tickEvent("hid.jlink.flash.success");
        // resume the serial monitor (best-effort; must not fail the download).
        // Fresh retry budget: the CDC device may take a few seconds to come
        // back after the post-flash target reset.
        this.serialRetries = 0;
        this.startSerialAsync()
            .catch(e => logSerial(`restart after flash failed: ${(e as Error).message}`));
    }

    sendCustomEventAsync(_type: string, _payload: Uint8Array): Promise<void> {
        return Promise.resolve();
    }

    unsupportedParts(): string[] {
        // mbdal firmware: same constraints as Calliope v1. "microphone" is NOT
        // listed: v1/v2 read the analog MEMS mic via the DAL fallback in
        // libs/microphone/microphone.cpp
        return ["logotouch", "builtinspeaker", "flashlog", "v2"];
    }

    /**
     * Open the J-Link Virtual COM Port via the Web Serial API and pump
     * incoming bytes into onSerial.  Best-effort: any failure (no Web Serial
     * support, permission denied, no matching port) is logged and swallowed
     * so that flashing keeps working.
     */
    private async startSerialAsync(): Promise<void> {
        const nav: any = navigator;
        if (!nav.serial) {
            logSerial("Web Serial API unavailable in this browser");
            return;
        }

        // Ideally we'd match the granted port by the SEGGER USB IDs (0x1366),
        // but Chrome derives SerialPortInfo from the OS and on some platforms
        // (observed on Linux/Pop!_OS) returns no usbVendorId at all for the
        // CDC-ACM port — which also makes a filtered requestPort() picker come
        // up empty.  So: prefer a VID match, but fall back to the sole granted
        // port, and prompt with NO filter so the device actually shows up.
        const infoOf = (p: any) => { try { return p.getInfo?.() || {}; } catch (e) { return {}; } };

        // reuse an already-granted port if we can identify one
        let port: any = null;
        try {
            const ports: any[] = await nav.serial.getPorts();
            // Fall back to the sole granted port only if it reports no vendor id
            // (the Pop!_OS case); a port that positively identifies as another
            // vendor's device (e.g. an Arduino) must not be hijacked.
            port = ports.find(p => infoOf(p).usbVendorId === JLINK_VID)
                ?? (ports.length === 1 && infoOf(ports[0]).usbVendorId == undefined ? ports[0] : null);
            if (port) logSerial("reusing granted port");
        } catch (e) {
            logSerial(`getPorts failed: ${(e as Error).message}`);
        }
        // otherwise prompt the user to pick it.
        // requestPort() needs transient user activation; auto-reconnects after
        // flashing don't have it, so only prompt when activation is available.
        // The grant is persistent, so once accepted getPorts() finds it forever.
        if (!port) {
            const activation = nav.userActivation;
            if (activation && !activation.isActive) {
                logSerial("no granted port and no user activation");
                // Right after a flash the CDC device may still be re-enumerating
                // and briefly absent from getPorts() — retry, don't give up.
                this.scheduleSerialRetry();
                return;
            }
            try {
                // No filter: a VID/PID filter yields an empty chooser when Chrome
                // reports no usbVendorId for the CDC port (see note above).
                port = await nav.serial.requestPort();
                logSerial("port picked");
            } catch (e) {
                // user dismissed the picker or no matching port
                logSerial(`no port selected: ${(e as Error).message}`);
                return;
            }
        }

        const gen = ++this.serialGen;
        try {
            await port.open({ baudRate: 115200 });
        } catch (e) {
            // e.g. the OS is still re-binding the CDC device after the
            // post-flash target reset, or another process (minicom, screen,
            // ModemManager, cat) holds /dev/ttyACM0 — usually transient.
            logSerial(`open failed: ${(e as Error).message}`);
            this.scheduleSerialRetry();
            return;
        }
        // a stop() may have happened while we were opening
        if (gen !== this.serialGen || !this.initialized) {
            try { await port.close(); } catch (e) { }
            return;
        }
        this.serialRetries = 0; // serial is up — reset the retry budget
        this.serialPort = port;
        logSerial("port open @115200");

        this.serialLoopEnd = this.readSerialLoop(gen);
    }

    /**
     * Retry the serial bring-up after a transient failure (port briefly gone
     * from getPorts() or not yet openable while the device re-enumerates after
     * a flash). Bounded so a genuinely unavailable port doesn't retry forever;
     * the budget resets whenever serial comes up or the device reconnects.
     */
    private scheduleSerialRetry(): void {
        if (this.serialRetries >= 10) {
            logSerial("giving up on serial after repeated failures; replug to retry");
            return;
        }
        this.serialRetries++;
        const gen = this.serialGen;
        setTimeout(() => {
            // only if nothing else (stop/flash/new start) intervened
            if (gen === this.serialGen && this.initialized && !this.serialPort)
                this.startSerialAsync()
                    .catch(e => logSerial(`serial retry failed: ${(e as Error).message}`));
        }, 2000);
    }

    private async readSerialLoop(gen: number): Promise<void> {
        const port = this.serialPort;
        try {
            // Canonical Web Serial read pattern: a NON-fatal read error (e.g.
            // buffer overrun when the program floods serial output) ends the
            // current readable stream but the port stays open and exposes a
            // fresh port.readable — so re-acquire a reader and keep reading.
            // Only a fatal error (device lost) leaves port.readable null.
            while (gen === this.serialGen && this.initialized && port.readable) {
                const reader = port.readable.getReader();
                this.serialReader = reader;
                try {
                    while (gen === this.serialGen && this.initialized) {
                        const { value, done } = await reader.read();
                        if (done) return; // stream ended (usually stopSerial's cancel)
                        if (value && value.length) {
                            try {
                                this.onSerial(new Uint8Array(value.buffer, value.byteOffset, value.byteLength), false);
                            } catch (err) {
                                logSerial(`decode error: ${(err as Error).message}`);
                            }
                        }
                    }
                } catch (e) {
                    if (gen === this.serialGen)
                        logSerial(`read error, reopening reader: ${(e as Error).message}`);
                } finally {
                    try { reader.releaseLock(); } catch (e) { }
                    if (this.serialReader === reader) this.serialReader = null;
                }
            }
        } finally {
            // Spontaneous end (fatal error / EOF) while still connected: the
            // port object is dead but was left open, which used to require a
            // page refresh to revive serial. Release it and retry the whole
            // serial bring-up shortly; retries repeat every 2s until the
            // device disconnects or serial comes back.
            if (gen === this.serialGen && this.initialized) {
                if (this.serialPort === port) this.serialPort = null;
                try { await port.close(); } catch (e) { }
                logSerial("serial ended unexpectedly; retrying in 2s");
                setTimeout(() => {
                    if (gen === this.serialGen && this.initialized)
                        this.startSerialAsync()
                            .catch(e => logSerial(`serial restart failed: ${(e as Error).message}`));
                }, 2000);
            }
        }
    }

    /**
     * Cancel the read loop and close the serial port (best-effort).
     * Resolves once the port is actually closed, so callers that need the
     * port free (flash, disconnect) can await it; fire-and-forget callers
     * may ignore the promise (errors are logged internally).
     */
    private stopSerial(): Promise<void> {
        this.serialGen++; // signal the loop to exit
        const reader = this.serialReader;
        this.serialReader = null;
        const port = this.serialPort;
        this.serialPort = null;
        const loopEnd = this.serialLoopEnd;
        if (reader) {
            try { reader.cancel(); } catch (e) { }
        }
        if (!port) return Promise.resolve();
        // Close only after the read loop's finally block has released the
        // stream lock — close() on a still-locked readable rejects, which
        // would silently leak the open port until the tab is reloaded.
        return loopEnd
            .catch(() => { })
            .then(() => port.close())
            .catch((e: Error) => logSerial(`close failed: ${e.message}`));
    }

    private async sendCmd(cmd: Uint8Array, expectResp = true): Promise<Uint8Array> {
        await this.device.transferOut(this.jlinkOutEP, cmd);
        if (!expectResp) return new Uint8Array(0);
        const res = await this.device.transferIn(this.jlinkInEP, 4096);
        if (!res.data) throw new Error("No response from J-Link probe");
        return new Uint8Array(res.data.buffer);
    }
}

/**
 * Top-level wrapper that routes to JLinkPacketIOWrapper (Calliope v2) or
 * DAPWrapper (Calliope v1/v3) depending on which USB device is connected.
 * Detection happens asynchronously at the start of reconnectAsync().
 */
class CalliopeWrapper implements pxt.packetio.PacketIOWrapper {
    readonly io: pxt.packetio.PacketIO;
    icon     = "icon usb";
    familyID = 0x0D28;

    private dap:   DAPWrapper;
    private jlink: JLinkPacketIOWrapper | null = null;

    // Store handlers locally and forward to the active child, so handlers set
    // after connect (e.g. via packetio.configureEvents) still reach it.
    private _onSerial:      (buf: Uint8Array, isStderr: boolean) => void = () => {};
    private _onCustomEvent: (type: string, payload: Uint8Array) => void  = () => {};

    get onSerial() { return this._onSerial; }
    set onSerial(v: (buf: Uint8Array, isStderr: boolean) => void) {
        this._onSerial = v;
        if (this._active) this._active.onSerial = v;
    }
    get onCustomEvent() { return this._onCustomEvent; }
    set onCustomEvent(v: (type: string, payload: Uint8Array) => void) {
        this._onCustomEvent = v;
        if (this._active) this._active.onCustomEvent = v;
    }

    private get _active(): DAPWrapper | JLinkPacketIOWrapper {
        return this.jlink ?? this.dap;
    }

    constructor(io: pxt.packetio.PacketIO) {
        this.io  = io;
        this.dap = new DAPWrapper(io);
        // Override the device-change handler set by DAPWrapper so reconnects
        // go through CalliopeWrapper and can re-detect the device type.
        this.io.onDeviceConnectionChanged = async (connect: boolean) => {
            log(`device connection changed: ${connect}`);
            if (!connect) { await this.disconnectAsync(); return; }
            await this.reconnectAsync();
        };
    }

    async reconnectAsync(): Promise<void> {
        const devices   = await (navigator.usb?.getDevices() ?? Promise.resolve([] as pxt.usb.USBDevice[]));
        const jlinkDev  = devices.find(d => d.vendorId === JLINK_VID && d.productId === JLINK_PID);
        if (jlinkDev) {
            // If JLinkPacketIOWrapper already registered its own connect listener and
            // is in the middle of reconnecting, don't start a second attempt.
            if (this.jlink?.isConnecting()) return;
            if (!this.jlink)
                this.jlink = new JLinkPacketIOWrapper(this.io, jlinkDev);
            this.jlink.onSerial      = this._onSerial;
            this.jlink.onCustomEvent = this._onCustomEvent;
            this.familyID            = this.jlink.familyID;
            return this.jlink.reconnectAsync();
        }
        this.jlink               = null;
        this.dap.onSerial        = this._onSerial;
        this.dap.onCustomEvent   = this._onCustomEvent;
        this.familyID            = this.dap.familyID;
        return this.dap.reconnectAsync();
    }

    disconnectAsync() { return this._active.disconnectAsync(); }
    isConnected()     { return this._active.isConnected(); }
    isConnecting()    { return this._active.isConnecting(); }
    reflashAsync(resp: pxtc.CompileResult, progress?: (p: number) => void) {
        return this._active.reflashAsync(resp, progress);
    }
    sendCustomEventAsync(type: string, payload: Uint8Array) {
        return this._active.sendCustomEventAsync(type, payload);
    }
    unsupportedParts() { return this._active.unsupportedParts?.() ?? []; }
    get devVariant()   { return (this._active as any).devVariant as string | undefined; }
}

// Set from editor/extension.tsx so the packetio wrapper can ask the editor to re-run the
// simulator. Kept as a plain setter (rather than reaching for a global) because
// initExtensionsAsync is the only place that is handed the IProjectView.
let projectView: pxt.editor.IProjectView | undefined;
export function setProjectView(view: pxt.editor.IProjectView) {
    projectView = view;
}

// Make the simulator show the board that is actually plugged in.
//
// "matchWebUSBDeviceInSim" (pxtarget.json) makes pxt-core hand the connected device's
// devVariant to the simulator, but only inside the run message -- so a board connected
// while the sim is already running is not noticed until the next run. Restarting the
// simulator when the detected variant changes re-runs it with the new variant, and
// sim/dalboard.ts then selects the matching board revision.
//
// This is called from the wrappers' own reconnect paths, right after the point where the
// board revision becomes known (DAPWrapper probes the DAPLink board id for v1-vs-v3; a
// J-Link is always a v2). It deliberately does NOT live on CalliopeWrapper.reconnectAsync:
// pxt.packetio.initAsync() only constructs the wrapper and never calls that method, so a
// hook there never fires on a normal connect.
// The variant the simulator is currently showing. Tracking what the SIMULATOR shows (not
// what was last connected) is what makes device swapping work: reconnecting the same board
// is a no-op, while swapping to the other revision always re-runs the sim.
let simVariant: string | undefined = undefined;
function syncSimulatorWithDevice(variant: string | undefined) {
    if (!variant || variant === simVariant) return;
    simVariant = variant;
    // pxt.log, not this file's log(): the latter goes through pxt.debug, which is silent
    // unless the editor runs in debug mode, and this one line is worth seeing when a board
    // is connected.
    pxt.log(`simulator: matching board to connected device (${variant})`);
    try {
        if (!projectView) return;
        // Stop, then start -- neither call on its own works here:
        //   * restartSimulator() delegates to the driver's restart() while the sim is
        //     running, which replays the CACHED run message; `theme` (the device variant)
        //     is only computed while the run options are rebuilt, so the board never changes.
        //   * startSimulator() alone is refused while the sim is running:
        //     shouldStartSimulator() returns false for simState 2 (starting) / 3 (running),
        //     which is the "Ignoring call to start simulator" log.
        // stopSimulator() sets simState back to 0, which unblocks startSimulator() and makes
        // it rebuild the run options -- the only path that re-reads the connected variant.
        //
        // The simState reset goes through React's setStateAsync, so start must not run in the
        // same tick; defer it. Stopping a running program is acceptable here: the simulated
        // board would otherwise keep showing the wrong Calliope mini revision.
        const view = projectView;
        Promise.resolve(view.stopSimulator())
            .then(() => view.startSimulator())
            .catch(e => pxt.log(`simulator: could not restart: ${e}`));
    } catch (e) {
        pxt.log(`simulator: could not request restart: ${e}`);
    }
}

export function mkPacketIOWrapper(io: pxt.packetio.PacketIO): pxt.packetio.PacketIOWrapper {
    pxt.log(`packetio: mk calliope wrapper`);
    return new CalliopeWrapper(io);
}
