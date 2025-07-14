/// <reference path="../node_modules/pxt-core/localtypings/pxtarget.d.ts" />
/// <reference path="../node_modules/pxt-core/built/pxtcompiler.d.ts" />
/// <reference path="../node_modules/pxt-core/built/pxtlib.d.ts" />
/// <reference path="../node_modules/pxt-core/localtypings/pxteditor.d.ts" />
/// <reference path="dapjs.d.ts" />
// import * as dialogs from "./dialogs";
import * as flash from "./flash";
import * as patch from "./patch";

pxt.editor.initExtensionsAsync = function (opts: pxt.editor.ExtensionOptions): Promise<pxt.editor.ExtensionResult> {
    pxt.debug('loading calliope mini target extensions...')

    const manyAny = Math as any;
    if (!manyAny.imul)
        manyAny.imul = function (a: number, b: number): number {
            const ah = (a >>> 16) & 0xffff;
            const al = a & 0xffff;
            const bh = (b >>> 16) & 0xffff;
            const bl = b & 0xffff;
            // the shift by 0 fixes the sign on the high part
            // the final |0 converts the unsigned value into a signed value
            return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0) | 0);
        };

    const res: pxt.editor.ExtensionResult = {
        hexFileImporters: []
    };

    pxt.usb.setFilters([{
        vendorId: 0x0D28,
        productId: 0x0204,
        classCode: 0xff,
        subclassCode: 0x03 // the ctrl pipe endpoint
    }, {
        vendorId: 0x0D28,
        productId: 0x0204,
        classCode: 0xff,
        subclassCode: 0x00 // the custom CMSIS2 endpoint
    }, {
        vendorId: 0x1366, // Segger
        productId: 0x1015 // Mini 2.0
    }, {
        vendorId: 0x1366, // Segger
        productId: 0x1025 // Mini 2.1
    }, {
        vendorId: 0x1366 // Segger
    }])

    res.mkPacketIOWrapper = flash.mkDAPLinkPacketIOWrapper;
    res.blocklyPatch = patch.patchBlocks;
    // res.showProgramTooLargeErrorAsync = dialogs.showProgramTooLargeErrorAsync;
    
    // WebUSB reconnection after project reload for dynamicBoardDefinition
    // This fixes the issue where WebUSB connection is lost when extensions are added/removed
    let lastHeaderId: string;
    res.notifyProjectSaved = (header: pxt.workspace.Header) => {
        // Only reconnect for Calliope when dynamicBoardDefinition is enabled
        if (pxt.appTarget.simulator?.dynamicBoardDefinition && pxt.usb.isEnabled) {
            // Only reconnect if this is a different project or if we haven't seen this header before
            // This prevents unnecessary reconnections on normal saves
            if (!lastHeaderId || lastHeaderId !== header.id) {
                lastHeaderId = header.id;
                // Small delay to ensure project reload is complete
                setTimeout(async () => {
                    try {
                        const webusb = await pxt.packetio.initAsync(false);
                        if (webusb && (webusb as any).forceResetAsync) {
                            await (webusb as any).forceResetAsync();
                        } else if (webusb) {
                            await webusb.reconnectAsync();
                        }
                    } catch (e) {
                        // Silently handle reconnection failures
                    }
                }, 1000);
            }
        }
    };
    
    return Promise.resolve<pxt.editor.ExtensionResult>(res);
}
