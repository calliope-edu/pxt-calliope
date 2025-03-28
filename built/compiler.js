/// <reference path="../node_modules/pxt-core/built/pxtcompiler.d.ts"/>
var ts;
(function (ts) {
    var pxtc;
    (function (pxtc) {
        var extension;
        (function (extension) {
            pxtc.compilerHooks.postBinary = (program, opts, res) => {
                if (!opts.target.isNative)
                    return;
                const minidal = res.outfiles["minidal-binary.hex"];
                const minicodal = res.outfiles["minicodal-binary.hex"];
                if (!minidal || !minicodal)
                    return;
                let outp = "";
                wrapHex(minidal, 0x00, [0x99, 0x00, 0xc0, 0xde]);
                wrapHex(minicodal, 0x0D, [0x99, 0x03, 0xc0, 0xde], true);
                outp += ":00000001FF\n";
                res.outfiles["binary.hex"] = outp;
                function hex2str(bytes) {
                    return ts.pxtc.hexfile.hexBytes([bytes.length - 3].concat(bytes)) + "\n";
                }
                function paddingString(len) {
                    let r = "";
                    const len0 = len;
                    while (len >= 44) {
                        r += hex2str([0x00, 0x00, 0x0C,
                            0x42, 0x42, 0x42, 0x42,
                            0x42, 0x42, 0x42, 0x42,
                            0x42, 0x42, 0x42, 0x42,
                            0x42, 0x42, 0x42, 0x42]);
                        len -= 44;
                    }
                    if (len >= 12) {
                        const numBytes = (len - 11) >> 1;
                        const bytes = [0x00, 0x00, 0x0C];
                        for (let i = 0; i < numBytes; ++i)
                            bytes.push(0x42);
                        const add = hex2str(bytes);
                        r += add;
                        len -= add.length;
                    }
                    while (len--)
                        r += "\n";
                    pxtc.U.assert(r.length == len0);
                    return r;
                }
                function addBlock(blk) {
                    const leftoff = blk.length & 511;
                    outp += blk + paddingString(512 - leftoff);
                }
                function wrapHex(inpHex, dataType, deviceType, keepSrc = false) {
                    let blk = hex2str([0x00, 0x00, 0x04, 0x00, 0x00])
                        + hex2str([0x00, 0x00, 0x0A].concat(deviceType));
                    let upperAddr = 0;
                    const lines = inpHex.split(/\r?\n/);
                    for (let i = 0; i < lines.length; ++i) {
                        const line = lines[i];
                        if (!line)
                            continue;
                        const parsed = ts.pxtc.hexfile.parseHexRecord(line);
                        switch (parsed.type) {
                            case 0x00:
                                const parsed2 = parsed.len <= 16 && lines[i + 1] ?
                                    ts.pxtc.hexfile.parseHexRecord(lines[i + 1])
                                    : null;
                                // if this and next line can fit in 32 bytes, concat them
                                if (parsed2 && parsed2.type == 0x00 &&
                                    parsed2.addr == parsed.addr + parsed.len &&
                                    parsed.len + parsed2.len <= 32) {
                                    parsed.data = parsed.data.concat(parsed2.data);
                                    parsed.len += parsed2.len;
                                    i++;
                                }
                                addData([parsed.addr >> 8, parsed.addr & 0xff, dataType]
                                    .concat(parsed.data));
                                break;
                            case 0x01:
                                flush();
                                if (keepSrc)
                                    break;
                                else
                                    return;
                            case 0x04:
                                const newUpper = ((parsed.data[0] << 8) | parsed.data[1]) << 16;
                                if (upperAddr != newUpper) {
                                    upperAddr = newUpper;
                                    addData([0, 0, 0x04, parsed.data[0], parsed.data[1]]);
                                }
                                break;
                            case 0x03:
                            case 0x05:
                                // ignore
                                break;
                            case 0x0E:
                                // src record
                                addData([parsed.addr >> 8, parsed.addr & 0xff, 0x0E]
                                    .concat(parsed.data));
                                break;
                            default:
                                pxtc.U.oops(`unknown hex record type: ${line}`);
                                break;
                        }
                    }
                    flush();
                    function addData(bytes) {
                        const newData = hex2str(bytes);
                        blk += newData;
                    }
                    function flush() {
                        if (blk)
                            addBlock(blk);
                        blk = "";
                    }
                }
            };
        })(extension = pxtc.extension || (pxtc.extension = {}));
    })(pxtc = ts.pxtc || (ts.pxtc = {}));
})(ts || (ts = {}));
