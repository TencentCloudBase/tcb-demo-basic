/**
 * Lowcodes of all components
 */
export declare const compLowcodes: {};
/**
 * Convert abcWordSnd -> abc-word-snd
 */
export declare function toDash(str: any): any;
export declare function createComputed(funcs: any, bindContext?: any): {};
export declare function generateDataContext(widget: any): {};
/**
 * @param evtListeners
 * @param [options]
 */
export declare function createEventHandlers(evtListeners: any, options?: {
    looseError?: boolean;
    isComposite?: boolean;
    syncCall?: boolean;
}): {};
export declare function getDeep(target: any, key: any, keySeparator?: string): any;
/**
 * Touch all props of given object deeply
 */
export declare function touchObj(obj: any): void;
export declare function throttle(fn: any, limit: any): () => void;
export declare function deepEqual(a: any, b: any): boolean;
export declare function getMpEventHandlerName(widgetId: any, evtName: any, modifier?: {
    isCapturePhase?: boolean;
    noPropagation?: boolean;
}): string;
export declare function mergeDynamic2StaticData(staticData: any, dataBinds: any, context: {
    $w: any;
    forContext?: {
        lists: any[];
        forItems: Record<string, any>;
    };
    codeContext?: {
        instance: any;
        event?: Event;
    };
    dataContext?: Record<string, any>;
    paramsContext?: Record<string, any>;
}, combainErrors?: boolean): any;
export declare function processStaticResourceAttribute(data: any, replacer: any, property: any): void;
export declare function patchWdigetPropsWithEvtListeners(widgetProps: any, evtListeners: any): any;
