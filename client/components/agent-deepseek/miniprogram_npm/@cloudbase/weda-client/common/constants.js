/**
 * 平台：web、小程序
 */
export var EPLATFORM;
(function (EPLATFORM) {
    EPLATFORM["WEB"] = "WEB";
    /**
     * 拼写错误
     * 兼容性无法修改
     */
    EPLATFORM["MINIPROGRAM"] = "MINIPROGRAME";
})(EPLATFORM || (EPLATFORM = {}));
/**
 * @description 交互key
 * @private _前缀的都是内部方法，有可能调整，不推荐外部用户使用
 */
export var ACTIONS_KEY;
(function (ACTIONS_KEY) {
    ACTIONS_KEY["showToast"] = "showToast";
    ACTIONS_KEY["showLoading"] = "showLoading";
    ACTIONS_KEY["hideLoading"] = "hideLoading";
    ACTIONS_KEY["showModal"] = "showModal";
    ACTIONS_KEY["scanCode"] = "scanCode";
    ACTIONS_KEY["setClipboardData"] = "setClipboardData";
    ACTIONS_KEY["exportData"] = "exportData";
    ACTIONS_KEY["setStorage"] = "setStorage";
    ACTIONS_KEY["getStorage"] = "getStorage";
    ACTIONS_KEY["removeStorage"] = "removeStorage";
    ACTIONS_KEY["setTitle"] = "setTitle";
    /**
     * 测试使用
     */
    ACTIONS_KEY["callProcess"] = "callProcess";
    ACTIONS_KEY["callPhone"] = "callPhone";
    ACTIONS_KEY["callWorkflow"] = "callWorkflow";
    /** 微信能力 **/
    ACTIONS_KEY["requestSubscribeMessage"] = "requestSubscribeMessage";
    ACTIONS_KEY["openLocation"] = "openLocation";
    ACTIONS_KEY["reserveChannelsLive"] = "reserveChannelsLive";
    ACTIONS_KEY["openChannelsUserProfile"] = "openChannelsUserProfile";
    ACTIONS_KEY["openChannelsLive"] = "openChannelsLive";
    ACTIONS_KEY["openChannelsEvent"] = "openChannelsEvent";
    ACTIONS_KEY["openChannelsActivity"] = "openChannelsActivity";
    ACTIONS_KEY["getChannelsLiveNoticeInfo"] = "getChannelsLiveNoticeInfo";
    ACTIONS_KEY["getChannelsLiveInfo"] = "getChannelsLiveInfo";
    /** 常用方法 */
    ACTIONS_KEY["getEnumValue"] = "getEnumValue";
})(ACTIONS_KEY || (ACTIONS_KEY = {}));
/**
 * @description 路由key
 * @private _前缀的都是内部方法，有可能调整，不推荐外部用户使用
 */
export var ROUTER_KEY;
(function (ROUTER_KEY) {
    ROUTER_KEY["navigateBack"] = "navigateBack";
    ROUTER_KEY["navigateTo"] = "navigateTo";
    ROUTER_KEY["reLaunch"] = "reLaunch";
    ROUTER_KEY["redirectTo"] = "redirectTo";
    ROUTER_KEY["relaunchHome"] = "relaunchHome";
})(ROUTER_KEY || (ROUTER_KEY = {}));
/**
 * @description 链接跳转协议
 * @private
 */
export var LINK_PROTOCOL;
(function (LINK_PROTOCOL) {
    LINK_PROTOCOL["weda-page"] = "weda-page";
    LINK_PROTOCOL["http"] = "http";
    LINK_PROTOCOL["https"] = "https";
    LINK_PROTOCOL["miniprogram"] = "miniprogram";
    LINK_PROTOCOL["plugin"] = "plugin";
})(LINK_PROTOCOL || (LINK_PROTOCOL = {}));
/**
 * 内部用户对外开放字段
 */
export const INNER_USERINFO_WHITELIST = [
    'name',
    'openId',
    'type',
    'userId',
    'relatedRoles',
    // 'userExtend', // 接口有冗余信息，暂时不对外
];
export const RELATEDROLES_WHITELIST = ['envId', 'id', 'name', 'roleIdentity'];
/**
 * 外部用户对外开放字段。比内部用户少了name
 */
export const EXTERNAL_USERINFO_WHITELIST = [
    'type',
    'openId',
    'userId',
    'relatedRoles',
    // 'userExtend', // 接口有冗余信息，暂时不对外
];
export const USERINFO_TYPE = {
    0: 'internalUser',
    1: 'externalUser',
    2: 'anonymousUser',
};
/**
 * 网络类型
 * pc端为空字符串
 */
export var NETWORK_TYPE;
(function (NETWORK_TYPE) {
    NETWORK_TYPE["wifi"] = "wifi";
    NETWORK_TYPE["2g"] = "2g";
    NETWORK_TYPE["3g"] = "3g";
    NETWORK_TYPE["4g"] = "4g";
    NETWORK_TYPE["5g"] = "5g";
    NETWORK_TYPE["other"] = "other";
    NETWORK_TYPE["unknown"] = "";
})(NETWORK_TYPE || (NETWORK_TYPE = {}));
/**
 * 环境类型
 */
export var ENV_TYPE;
(function (ENV_TYPE) {
    /**
     * 生产
     */
    ENV_TYPE["production"] = "production";
    /**
     * 预览
     */
    ENV_TYPE["preview"] = "preview";
})(ENV_TYPE || (ENV_TYPE = {}));
