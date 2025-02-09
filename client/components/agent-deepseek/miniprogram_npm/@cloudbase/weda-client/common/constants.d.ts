/**
 * 平台：web、小程序
 */
export declare enum EPLATFORM {
    WEB = "WEB",
    /**
     * 拼写错误
     * 兼容性无法修改
     */
    MINIPROGRAM = "MINIPROGRAME"
}
/**
 * @description 交互key
 * @private _前缀的都是内部方法，有可能调整，不推荐外部用户使用
 */
export declare enum ACTIONS_KEY {
    'showToast' = "showToast",
    'showLoading' = "showLoading",
    'hideLoading' = "hideLoading",
    'showModal' = "showModal",
    'scanCode' = "scanCode",
    'setClipboardData' = "setClipboardData",
    'exportData' = "exportData",
    'setStorage' = "setStorage",
    'getStorage' = "getStorage",
    'removeStorage' = "removeStorage",
    'setTitle' = "setTitle",
    /**
     * 测试使用
     */
    'callProcess' = "callProcess",
    'callPhone' = "callPhone",
    'callWorkflow' = "callWorkflow",
    /** 微信能力 **/
    'requestSubscribeMessage' = "requestSubscribeMessage",
    'openLocation' = "openLocation",
    'reserveChannelsLive' = "reserveChannelsLive",
    'openChannelsUserProfile' = "openChannelsUserProfile",
    'openChannelsLive' = "openChannelsLive",
    'openChannelsEvent' = "openChannelsEvent",
    'openChannelsActivity' = "openChannelsActivity",
    'getChannelsLiveNoticeInfo' = "getChannelsLiveNoticeInfo",
    'getChannelsLiveInfo' = "getChannelsLiveInfo",
    /** 常用方法 */
    'getEnumValue' = "getEnumValue"
}
/**
 * @description 路由key
 * @private _前缀的都是内部方法，有可能调整，不推荐外部用户使用
 */
export declare enum ROUTER_KEY {
    'navigateBack' = "navigateBack",
    'navigateTo' = "navigateTo",
    'reLaunch' = "reLaunch",
    'redirectTo' = "redirectTo",
    'relaunchHome' = "relaunchHome"
}
/**
 * @description 链接跳转协议
 * @private
 */
export declare enum LINK_PROTOCOL {
    'weda-page' = "weda-page",
    'http' = "http",
    'https' = "https",
    'miniprogram' = "miniprogram",
    'plugin' = "plugin"
}
/**
 * 内部用户对外开放字段
 */
export declare const INNER_USERINFO_WHITELIST: string[];
export declare const RELATEDROLES_WHITELIST: string[];
/**
 * 外部用户对外开放字段。比内部用户少了name
 */
export declare const EXTERNAL_USERINFO_WHITELIST: string[];
export declare const USERINFO_TYPE: {
    0: string;
    1: string;
    2: string;
};
/**
 * 网络类型
 * pc端为空字符串
 */
export declare enum NETWORK_TYPE {
    'wifi' = "wifi",
    '2g' = "2g",
    '3g' = "3g",
    '4g' = "4g",
    '5g' = "5g",
    'other' = "other",
    'unknown' = ""
}
/**
 * 环境类型
 */
export declare enum ENV_TYPE {
    /**
     * 生产
     */
    'production' = "production",
    /**
     * 预览
     */
    'preview' = "preview"
}
