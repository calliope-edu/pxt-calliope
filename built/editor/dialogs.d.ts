/// <reference types="react" />
export declare function showProgramTooLargeErrorAsync(variants: string[], confirmAsync: (opts: any) => Promise<number>): Promise<{
    recompile: boolean;
    useVariants: string[];
}>;
export declare function renderUsbPairDialog(firmwareUrl?: string, failedOnce?: boolean): JSX.Element;
export declare function renderBrowserDownloadInstructions(): JSX.Element;
export declare function cantImportAsync(project: pxt.editor.IProjectView): Promise<void>;
