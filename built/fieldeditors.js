(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./field_gestures":2}],2:[function(require,module,exports){
"use strict";
/// <reference path="../node_modules/pxt-core/localtypings/blockly.d.ts"/>
/// <reference path="../node_modules/pxt-core/built/pxtblocks.d.ts"/>
/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldGestures = void 0;
class FieldGestures extends pxtblockly.FieldImages {
    constructor(text, options, validator) {
        super(text, options, validator);
        this.isFieldCustom_ = true;
        this.buttonClick_ = function (e) {
            let value = e.target.getAttribute('data-value');
            this.setValue(value);
            Blockly.DropDownDiv.hide();
        };
        this.columns_ = parseInt(options.columns) || 4;
        this.width_ = parseInt(options.width) || 350;
        this.addLabel_ = true;
        this.renderSelectedImage_ = Blockly.FieldDropdown.prototype.renderSelectedText_;
        this.updateSize_ = Blockly.Field.prototype.updateSize_;
    }
    trimOptions_() {
    }
}
exports.FieldGestures = FieldGestures;

},{}]},{},[1,2]);
