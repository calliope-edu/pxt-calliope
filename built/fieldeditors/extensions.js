"use strict";
/// <reference path="../node_modules/pxt-core/built/pxteditor.d.ts"/>
/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
const field_gestures_1 = require("./field_gestures");
pxt.editor.initFieldExtensionsAsync = function (opts) {
    pxt.debug('loading pxt-microbit field editors...');
    const res = {
        fieldEditors: [{
                selector: "gestures",
                editor: field_gestures_1.FieldGestures
            }]
    };
    return Promise.resolve(res);
};
