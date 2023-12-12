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
