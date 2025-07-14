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
    
    // WebUSB reconnection after project reload for dynamicBoardDefinition
    // This fixes the issue where WebUSB connection is lost when extensions are added/removed
    let lastReconnectTime = 0; // Track when we last attempted reconnection
    
    res.notifyProjectSaved = (header: pxt.workspace.Header) => {
        console.log(`[CALLIOPE] notifyProjectSaved called with header id: ${header.id}, name: ${header.name}`);
        console.log(`[CALLIOPE] dynamicBoardDefinition: ${pxt.appTarget.simulator?.dynamicBoardDefinition}, usb.isEnabled: ${pxt.usb.isEnabled}`);
        
        // Only reconnect for Calliope when dynamicBoardDefinition is enabled
        if (pxt.appTarget.simulator?.dynamicBoardDefinition && pxt.usb.isEnabled) {
            const now = Date.now();
            const timeSinceLastReconnect = now - lastReconnectTime;
            
            console.log(`[CALLIOPE] timeSinceLastReconnect: ${timeSinceLastReconnect}ms`);
            
            // Always reconnect when dynamicBoardDefinition is enabled, but prevent rapid reconnections
            // Wait at least 2 seconds between reconnection attempts
            if (timeSinceLastReconnect > 2000) {
                console.log(`[CALLIOPE] Triggering WebUSB reconnection for dynamic board definition`);
                lastReconnectTime = now;
                
                // Small delay to ensure project reload is complete
                setTimeout(async () => {
                    try {
                        console.log(`[CALLIOPE] Starting WebUSB reconnection...`);
                        const webusb = await pxt.packetio.initAsync(false);
                        console.log(`[CALLIOPE] WebUSB initialized:`, webusb);
                        if (webusb && (webusb as any).forceResetAsync) {
                            console.log(`[CALLIOPE] Calling forceResetAsync...`);
                            await (webusb as any).forceResetAsync();
                            console.log(`[CALLIOPE] forceResetAsync completed`);
                        } else if (webusb) {
                            console.log(`[CALLIOPE] Calling reconnectAsync...`);
                            await webusb.reconnectAsync();
                            console.log(`[CALLIOPE] reconnectAsync completed`);
                        } else {
                            console.log(`[CALLIOPE] No WebUSB device available`);
                        }
                    } catch (e) {
                        console.log(`[CALLIOPE] WebUSB reconnection failed:`, e);
                    }
                }, 1000);
            } else {
                console.log(`[CALLIOPE] Skipping reconnection - too soon (${timeSinceLastReconnect}ms ago)`);
            }
        } else {
            console.log(`[CALLIOPE] Skipping reconnection - conditions not met`);
        }
    };
    
    console.log('[CALLIOPE] Setting up notifyProjectSaved hook for WebUSB reconnection');
    
    return Promise.resolve<pxt.editor.ExtensionResult>(res);
}
