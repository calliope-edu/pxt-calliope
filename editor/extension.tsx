/// <reference path="../node_modules/pxt-core/localtypings/pxtarget.d.ts" />
/// <reference path="../node_modules/pxt-core/built/pxtcompiler.d.ts" />
/// <reference path="../node_modules/pxt-core/built/pxtlib.d.ts" />
/// <reference path="../node_modules/pxt-core/localtypings/pxteditor.d.ts" />
/// <reference path="dapjs.d.ts" />
// import * as dialogs from "./dialogs";
import * as flash from "./flash";
import * as patch from "./patch";

pxt.editor.initExtensionsAsync = function (opts: pxt.editor.ExtensionOptions): Promise<pxt.editor.ExtensionResult> {
    console.log('[CALLIOPE] Loading calliope mini target extensions...');
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
    
    // ========================================================================
    // NEW FIX: WebUSB reconnection after project reload for dynamicBoardDefinition
    // This fixes the issue where WebUSB connection is lost when extensions are added/removed
    // ========================================================================
    let lastReconnectTime = 0; // Track when we last attempted reconnection
    
    res.notifyProjectSaved = (header: pxt.workspace.Header) => {
        console.log(`[CALLIOPE] Project saved notification for ${header.id} (${header.name})`);
        
        // Only reconnect for Calliope when dynamicBoardDefinition is enabled
        if (pxt.appTarget.simulator?.dynamicBoardDefinition && pxt.usb.isEnabled) {
            const now = Date.now();
            const timeSinceLastReconnect = now - lastReconnectTime;
            
            console.log(`[CALLIOPE] Dynamic board definition enabled, checking reconnection timing (${timeSinceLastReconnect}ms since last)`);
            
            // Always reconnect when dynamicBoardDefinition is enabled, but prevent rapid reconnections
            // Wait at least 2 seconds between reconnection attempts
            if (timeSinceLastReconnect > 2000) {
                lastReconnectTime = now;
                console.log(`[CALLIOPE] Initiating WebUSB reconnection after project reload`);
                
                // Small delay to ensure project reload is complete
                setTimeout(async () => {
                    try {
                        console.log(`[CALLIOPE] Starting WebUSB reconnection process`);
                        const webusb = await pxt.packetio.initAsync(false);
                        if (webusb && (webusb as any).forceResetAsync) {
                            console.log(`[CALLIOPE] Using forceResetAsync for WebUSB reconnection`);
                            await (webusb as any).forceResetAsync();
                        } else if (webusb) {
                            console.log(`[CALLIOPE] Using reconnectAsync for WebUSB reconnection`);
                            await webusb.reconnectAsync();
                        } else {
                            console.log(`[CALLIOPE] No WebUSB device available for reconnection`);
                        }
                        console.log(`[CALLIOPE] WebUSB reconnection completed successfully`);
                    } catch (e) {
                        console.log(`[CALLIOPE] WebUSB reconnection failed: ${e.message}`);
                    }
                }, 1000);
            } else {
                console.log(`[CALLIOPE] Skipping WebUSB reconnection - too soon (${timeSinceLastReconnect}ms ago)`);
            }
        } else {
            console.log(`[CALLIOPE] Skipping WebUSB reconnection - conditions not met (dynamicBoardDefinition: ${pxt.appTarget.simulator?.dynamicBoardDefinition}, usb.isEnabled: ${pxt.usb.isEnabled})`);
        }
    };
    // ========================================================================
    // END OF NEW FIX
    // ========================================================================

    return Promise.resolve<pxt.editor.ExtensionResult>(res);
}
