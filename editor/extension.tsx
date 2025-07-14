/// <reference path="../node_modules/pxt-core/localtypings/pxtarget.d.ts" />
/// <reference path="../node_modules/pxt-core/built/pxtcompiler.d.ts" />
/// <reference path="../node_modules/pxt-core/built/pxtlib.d.ts" />
/// <reference path="../node_modules/pxt-core/localtypings/pxteditor.d.ts" />
/// <reference path="dapjs.d.ts" />
// import * as dialogs from "./dialogs";
import * as flash from "./flash";
import * as patch from "./patch";

// Access to global workspace and data modules
declare const workspace: any;
declare const data: any;

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
    let lastReconnectTime = 0;
    let reconnectionInProgress = false;
    let pendingReconnectionTimeout: any = null;
    
    res.notifyProjectSaved = function (header: pxt.workspace.Header) {
        // Only reconnect for Calliope when dynamicBoardDefinition is enabled
        if (pxt.appTarget.simulator?.dynamicBoardDefinition && pxt.usb.isEnabled) {
            const now = Date.now();
            const timeSinceLastReconnect = now - lastReconnectTime;
            
            // Cancel any pending reconnection attempt
            if (pendingReconnectionTimeout) {
                clearTimeout(pendingReconnectionTimeout);
                pendingReconnectionTimeout = null;
            }
            
            // Skip if reconnection is already in progress or too recent
            if (reconnectionInProgress || timeSinceLastReconnect < 5000) {
                return;
            }
            
            lastReconnectTime = now;
            
            // Schedule reconnection with longer delay to batch multiple notifications
            pendingReconnectionTimeout = setTimeout(async () => {
                if (reconnectionInProgress) return;
                
                reconnectionInProgress = true;
                pendingReconnectionTimeout = null;
                
                try {
                    const webusb = await pxt.packetio.initAsync(false);
                    
                    if (!webusb) {
                        await pxt.packetio.initAsync(true);
                    } else {
                        // Test if the connection is actually working
                        try {
                            if ((webusb as any).isConnected && (webusb as any).isConnected()) {
                                // Already connected and working
                            } else {
                                await webusb.reconnectAsync();
                            }
                        } catch (testError) {
                            await webusb.reconnectAsync();
                        }
                    }
                } catch (e) {
                    // Silently handle reconnection failures
                } finally {
                    reconnectionInProgress = false;
                }
            }, 5000); // Increased delay to 5 seconds to better batch notifications
        }
    };
    // ========================================================================
    // END OF NEW FIX
    // ========================================================================

    return Promise.resolve<pxt.editor.ExtensionResult>(res);
}
