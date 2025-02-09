/// <reference types="weixin-app" />
export declare const commonCompBehavior: wx.Behavior<{}, {
    id: {
        type: StringConstructor;
    };
}, {
    /**
     * 获取当前组件的 widget 实例
     */
    _getWidgetInstance(): any;
    mountReadonlyAttributes(callback: any): void;
    setReadonlyAttributes(obj?: {}): void;
}>;
