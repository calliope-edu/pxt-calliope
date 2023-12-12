"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cantImportAsync = exports.renderBrowserDownloadInstructions = exports.renderUsbPairDialog = exports.showProgramTooLargeErrorAsync = void 0;
const React = require("react");
async function showProgramTooLargeErrorAsync(variants, confirmAsync) {
    if (variants.length !== 2)
        return undefined;
    // if (pxt.packetio.isConnected() && pxt.packetio.deviceVariant() === "mbcodal" && !saveOnly) {
    //     // connected micro:bit V2 will be flashed; don't give warning dialog
    //     return {
    //         recompile: true,
    //         useVariants: ["mbcodal"]
    //     }
    // }
    // const choice = await confirmAsync({
    //     header: lf("Oops, there was a problem downloading your code"),
    //     body: lf("Great coding skills! Unfortunately, your program is too large to fit on a calliope mini 😢. You can go back and try to make your program smaller."),
    //     bigHelpButton: true,
    //     agreeLbl: lf("Go Back"),
    //     agreeClass: "cancel",
    //     agreeIcon: "cancel",
    //     disagreeLbl: lf("Download for 32KB only"),
    //     disagreeClass: "positive",
    //     disagreeIcon: "checkmark"
    // });
    // if (!choice) {
    // try {
    // pxt.setAppTargetVariant("minicodal")
    // return {
    //     recompile: true,
    //     useVariants: [] as string[]
    // }
    // } catch(e) {
    //     alert("failed")
    //     console.log(e)
    //     return {
    //         recompile: false,
    //         useVariants: []
    //     }
    // }
    // }
    return {
        recompile: false,
        useVariants: []
    };
}
exports.showProgramTooLargeErrorAsync = showProgramTooLargeErrorAsync;
function renderUsbPairDialog(firmwareUrl, failedOnce) {
    const boardName = pxt.appTarget.appTheme.boardName || "???";
    const helpUrl = pxt.appTarget.appTheme.usbDocs;
    firmwareUrl = failedOnce && `${helpUrl}/webusb/troubleshoot`; // todo mo
    const instructions = React.createElement("div", { className: "ui grid" },
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "column" },
                React.createElement("div", { className: "ui two column grid padded" },
                    React.createElement("div", { className: "column" },
                        React.createElement("div", { className: "ui" },
                            React.createElement("div", { className: "image" },
                                React.createElement("img", { alt: lf("Comic connecting calliope mini to computer"), className: "ui medium rounded image", src: "./static/download/connect.png" })),
                            React.createElement("div", { className: "content" },
                                React.createElement("div", { className: "description" },
                                    React.createElement("span", { className: "ui purple circular label" }, "1"),
                                    React.createElement("strong", null, lf("Connect the {0} to your computer with a USB cable", boardName)),
                                    React.createElement("br", null),
                                    React.createElement("span", { className: "ui small" }, lf("Use the microUSB port on the top of the {0}", boardName)))))),
                    React.createElement("div", { className: "column" },
                        React.createElement("div", { className: "ui" },
                            React.createElement("div", { className: "image" },
                                React.createElement("img", { alt: lf("Comic of successful calliope mini connection"), className: "ui medium rounded image", src: "./static/download/pair.png" })),
                            React.createElement("div", { className: "content" },
                                React.createElement("div", { className: "description" },
                                    React.createElement("span", { className: "ui purple circular label" }, "2"),
                                    React.createElement("strong", null, lf("Pair your {0}", boardName)),
                                    React.createElement("br", null),
                                    React.createElement("span", { className: "ui small" }, lf("Click 'Pair device' below and select 'Calliope mini', 'DAPLink CMSIS-DAP' or 'J-Link' from the list"))))))))));
    if (!firmwareUrl)
        return instructions;
    return React.createElement("div", { className: "ui grid stackable" },
        React.createElement("div", { className: "column five wide firmware orange" },
            React.createElement("div", { className: "ui header inverted" }, lf("Update Firmware")),
            React.createElement("strong", { className: "ui small" }, lf("You must have version 0249 or above of the firmware")),
            React.createElement("div", { className: "image" },
                React.createElement("img", { alt: lf("Comic rainbow updating calliope mini firmware"), className: "ui image", src: "./static/download/firmware.png" })),
            React.createElement("a", { className: "ui button", role: "button", href: firmwareUrl, target: "_blank" }, lf("Check Firmware"))),
        React.createElement("div", { className: "column eleven wide instructions" }, instructions));
}
exports.renderUsbPairDialog = renderUsbPairDialog;
function renderBrowserDownloadInstructions() {
    const boardName = pxt.appTarget.appTheme.boardName || lf("device");
    const boardDriveName = pxt.appTarget.appTheme.driveDisplayName || pxt.appTarget.compile.driveName || "???";
    return React.createElement("div", { className: "ui grid stackable upload" },
        React.createElement("div", { className: "column sixteen wide instructions" },
            React.createElement("div", { className: "ui grid" },
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "column" },
                        React.createElement("div", { className: "ui two column grid padded" },
                            React.createElement("div", { className: "column" },
                                React.createElement("div", { className: "ui" },
                                    React.createElement("div", { className: "image" },
                                        React.createElement("img", { alt: lf("Comic connecting calliope mini to computer"), className: "ui medium rounded image", src: "./static/download/connect.png" })),
                                    React.createElement("div", { className: "content" },
                                        React.createElement("div", { className: "description" },
                                            React.createElement("span", { className: "ui purple circular label" }, "1"),
                                            React.createElement("strong", null, lf("Connect the {0} to your computer with a USB cable", boardName)),
                                            React.createElement("br", null),
                                            React.createElement("span", { className: "ui small" }, lf("Use the microUSB port on the top of the {0}", boardName)))))),
                            React.createElement("div", { className: "column" },
                                React.createElement("div", { className: "ui" },
                                    React.createElement("div", { className: "image" },
                                        React.createElement("img", { alt: lf("Comic moving hex file to calliope mini"), className: "ui medium rounded image", src: "./static/download/transfer.png" })),
                                    React.createElement("div", { className: "content" },
                                        React.createElement("div", { className: "description" },
                                            React.createElement("span", { className: "ui purple circular label" }, "2"),
                                            React.createElement("strong", null, lf("Move the .hex file to the {0}", boardName)),
                                            React.createElement("br", null),
                                            React.createElement("span", { className: "ui small" }, lf("Locate the downloaded .hex file and drag it to the {0} drive", boardDriveName))))))))))));
}
exports.renderBrowserDownloadInstructions = renderBrowserDownloadInstructions;
function cantImportAsync(project) {
    // this feature is support in v0 only
    return project.showModalDialogAsync({
        header: lf("Can't import microbit.co.uk scripts..."),
        body: lf("Importing microbit.co.uk programs is not supported in this editor anymore. Please open this script in the https://makecode.microbit.org/v0 editor."),
        buttons: [
            {
                label: lf("Go to the old editor"),
                url: `https://makecode.microbit.org/v0`
            }
        ]
    }).then(() => project.openHome());
}
exports.cantImportAsync = cantImportAsync;
