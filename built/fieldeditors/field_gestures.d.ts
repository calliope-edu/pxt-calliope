/// <reference types="pxt-core/localtypings/blockly" />
/// <reference types="pxt-core/built/pxtblocks" />
/// <reference types="pxt-core/built/pxtsim" />
export interface FieldGesturesOptions extends pxtblockly.FieldImagesOptions {
    columns?: string;
    width?: string;
}
export declare class FieldGestures extends pxtblockly.FieldImages implements Blockly.FieldCustom {
    isFieldCustom_: boolean;
    constructor(text: string, options: FieldGesturesOptions, validator?: Function);
    trimOptions_(): void;
    protected buttonClick_: (e: any) => void;
}
