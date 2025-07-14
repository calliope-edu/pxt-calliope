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
            
            // Wait at least 2 seconds between reconnection attempts
            if (timeSinceLastReconnect > 2000) {
                lastReconnectTime = now;
                console.log(`[CALLIOPE] Scheduling WebUSB connection check after project reload`);
                
                // Wait longer (3 seconds) to let natural reconnection attempts settle
                setTimeout(async () => {
                    try {
                        console.log(`[CALLIOPE] Checking WebUSB connection status`);
                        const webusb = await pxt.packetio.initAsync(false);
                        
                        if (!webusb) {
                            console.log(`[CALLIOPE] No WebUSB device found, attempting reconnection`);
                            const reconnectedWebusb = await pxt.packetio.initAsync(true);
                            if (reconnectedWebusb) {
                                console.log(`[CALLIOPE] WebUSB reconnection successful`);
                            } else {
                                console.log(`[CALLIOPE] WebUSB reconnection failed - no device`);
                            }
                        } else {
                            // Test if the connection is actually working
                            try {
                                if ((webusb as any).isConnected && (webusb as any).isConnected()) {
                                    console.log(`[CALLIOPE] WebUSB already connected and working`);
                                } else {
                                    console.log(`[CALLIOPE] WebUSB device found but not connected, reconnecting`);
                                    await webusb.reconnectAsync();
                                    console.log(`[CALLIOPE] WebUSB reconnection completed`);
                                }
                            } catch (testError) {
                                console.log(`[CALLIOPE] WebUSB connection test failed, attempting reconnection`);
                                await webusb.reconnectAsync();
                                console.log(`[CALLIOPE] WebUSB reconnection completed after test failure`);
                            }
                        }
                    } catch (e) {
                        console.log(`[CALLIOPE] WebUSB reconnection process failed: ${e.message}`);
                    }
                }, 3000); // Increased delay to 3 seconds
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
