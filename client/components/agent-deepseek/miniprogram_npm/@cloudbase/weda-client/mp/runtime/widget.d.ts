export declare function resolveWidgetData(props: any, widgetId: any): any;
export declare function createWidgets(widgetProps: any, dataBinds: any, ownerMpInst: any, widgetHolder: any): {
    widgets: {};
    rootWidget: any;
};
export declare function createWidget(props: any, nodeId: any, indexPostfix: any, parent: any, ownerMpInst: any, forContext: any): any;
export declare function generateForContextOfWidget(widget: any): any;
export declare const ID_SEPARATOR = "-";
export declare function getWidget(widgets: any, id: any): any;
export declare function disposeWidget(widget: any, noRecursive?: boolean): void;
export declare function createInitData(widgets: any, dataBinds: any, keyPrefix?: string): {};
export declare function generateWidgetAPIContext($w: {}, widget: any, forContext: any): {};
