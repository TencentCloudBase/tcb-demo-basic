import { EPLATFORM, ACTIONS_KEY, ROUTER_KEY, NETWORK_TYPE, ENV_TYPE } from '../common/constants';
import type { getConfig, IConfig } from '@cloudbase/weda-cloud-sdk';
/**
 * auth.getAccessToken出参
 */
export interface IAccessToken {
    accessToken: string;
}
/**
 * auth.currentUser.relatedRoles参数
 */
export type IRelatedRoles = Array<IRelatedRolesItem>;
/**
 * auth.currentUser.relatedRoles参数
 */
export interface IRelatedRolesItem {
    /**
     * 环境ID
     */
    envId: string;
    /**
     * 角色id
     */
    id: string;
    /**
     * 角色名称
     */
    name: string;
    /**
     * 角色标识
     */
    roleIdentity: string;
}
declare namespace wx {
    interface ToastOptions {
        [key: string]: string;
    }
    interface LoadingOptions {
        [key: string]: string;
    }
    interface ModalOptions {
        [key: string]: string;
    }
    interface ScanCodeOptions {
        [key: string]: string;
    }
    interface NavigateBackOptions {
        [key: string]: string;
    }
}
/**
 * 对外暴露的app对象。
 * 官方文档：https://docs.cloudbase.net/lowcode/framework/app/app#navigatetoobject
 */
export interface IAppAPI<T> extends IActionsAPI, IRouterAPI {
    /**
     * @private
     */
    __internal__: {
        $w: any;
        /**
         * @private
         * 当前激活的页面API对象
         */
        activePage: any;
        getConfig: Function;
        resolveStaticResourceUrl: Function;
        generatePageUrl: Function;
        isMobile: () => boolean;
        getCloudSdkConfig: typeof getConfig;
        enumOptions: Object;
    };
    /**
     * @public
     * 微搭应用id
     */
    id: string;
    /**
     * @public
     * 微搭应用名称
     */
    label?: string;
    /**
     * @public
     * 微搭应用发布版本
     */
    version?: string;
    /**
     * @public
     * 当前应用所属小程序
     */
    mpAppId?: string;
    /**
     * @public
     * 微搭应用所属小程序
     */
    mpAppName?: string;
    /**
     * @deprecated
     * _setStateVal不确定哪里用了，保留
     * 内部通用的设置状态变量值的方法
     *  varPath 结构为 $global.<变量名> 即全局变量
     *                $page.<变量名>  即当前页面变量
     *                <pageId>.<变量名> 指定页面 pageId 的变量 (应当避免修改非当前页面的变量值)
     */
    _setStateVal: ({ varPath, val }: {
        varPath: string;
        val: any;
    }) => void;
    /**
     * @deprecated
     * 使用方式：app.platform
     */
    platform: EPLATFORM;
    /**
     * @public
     * 使用方式：app.cloud
     */
    cloud: any;
    /**
     * @public
     * 使用方式：app.ai
     */
    ai: any;
    /**
     * @deprecated
     * 使用方式：app.dataSources
     */
    dataSources: any;
    /**
     * @public
     * 使用方式：app.utils.formatDate、app.util.get、app.util.set
     */
    utils: {
        formatDate: Function;
        get: Function;
        set: Function;
        getWXContext: Function;
        getCurrentPage: Function;
    };
    /**
     * @public
     * 初始化实例
     */
    init: Function;
    /**
     * @public
     * tcb 认证的方法
     */
    auth: T;
    /**
     * @deprecated
     */
    invoke: (params: {
        component?: any;
        method: string;
        params: any;
    }) => void;
    /**
     * @deprecated
     */
    domain?: string;
}
/**
 * 交互方法，微信小程序使用原生方法，web重写方法
 * 使用方式：app.showToast等
 */
export interface IActionsAPI {
    [ACTIONS_KEY.showToast]: (param: wx.ToastOptions) => void;
    [ACTIONS_KEY.showLoading]: (param: wx.LoadingOptions) => void;
    [ACTIONS_KEY.hideLoading]: () => void;
    [ACTIONS_KEY.showModal]: (param: wx.ModalOptions) => void;
    [ACTIONS_KEY.scanCode]: (param: wx.ScanCodeOptions) => void;
    [ACTIONS_KEY.callPhone]: (param: {
        /**
         * 电话号码
         */
        tel: string;
    }) => void;
    [ACTIONS_KEY.setStorage]: (param: {
        key: string;
        data: any;
    }) => void;
    [ACTIONS_KEY.getStorage]: (param: {
        key: string;
    }) => any;
    [ACTIONS_KEY.removeStorage]: (param: {
        key: string;
    }) => void;
    [ACTIONS_KEY.callProcess]: (param: {
        /**
         * 流程唯一标识
         */
        processKey: string;
        /**
         * 流程启动参数
         */
        startParams: {
            /**
             * 参数类型
             * object | objectList | any
             */
            fieldType: string;
            /**
             * 变量名
             */
            name: string;
            /**
             * 变量唯一标志
             */
            paramCode: string;
            /**
             * 数据源标识
             */
            entityCode: string;
            /**
             * 数据源记录
             */
            fieldValueMap: Record<string, any> | Record<string, any>[];
        }[];
    }) => void;
    [ACTIONS_KEY.callWorkflow]: (param: any) => void;
    [ACTIONS_KEY.requestSubscribeMessage]: (param: {
        params: {
            /**
             * 模板 id
             */
            tmplIds: string[];
        };
    }) => {
        res: any;
    };
    [ACTIONS_KEY.openLocation]: (param: {
        /**
         * 纬度
         */
        latitude: number;
        /**
         * 经度
         */
        longitude: number;
        /**
         * 地图缩放比例
         */
        scale: number;
        /**
         * 位置名称
         */
        name: string;
        /**
         * 位置地址
         */
        address: string;
    }) => void;
    [ACTIONS_KEY.reserveChannelsLive]: (param: {
        params: {
            /**
             * 预告 id
             */
            noticeId: string;
        };
    }) => {
        /**
         * 预约状态
         */
        state: number;
    };
    [ACTIONS_KEY.openChannelsUserProfile]: (param: {
        /**
         * 视频号 id
         */
        finderUserName: string;
    }) => void;
    [ACTIONS_KEY.openChannelsLive]: (param: {
        /**
         * 视频号 id
         */
        finderUserName: string;
        /**
         * 直播 feedId
         */
        feedId: string;
        /**
         * 直播 nonceId
         */
        nonceId: string;
    }) => void;
    [ACTIONS_KEY.openChannelsEvent]: (param: {
        /**
         * 视频号 id
         */
        finderUserName: string;
        /**
         * 活动 id
         */
        eventId: string;
    }) => void;
    [ACTIONS_KEY.openChannelsActivity]: (param: {
        /**
         * 视频号 id
         */
        finderUserName: string;
        /**
         * 视频 feedId
         */
        feedId: string;
    }) => void;
    [ACTIONS_KEY.getChannelsLiveNoticeInfo]: (param: {
        params: {
            /**
             * 视频号 id
             */
            finderUserName: string;
        };
    }) => {
        /**
         * 预告 id
         */
        noticeId: string;
        /**
         * 预告状态
         */
        status: number;
        /**
         * 开始时间
         */
        startTime: string;
        /**
         * 直播封面
         */
        headUrl: string;
        /**
         * 视频号昵称
         */
        nickname: string;
        /**
         * 是否可预约
         */
        reservable: boolean;
        /**
         * 其他预告信息列表
         */
        otherInfos: any[];
    };
    [ACTIONS_KEY.getChannelsLiveInfo]: (param: {
        params: {
            /**
             * 视频号 id
             */
            finderUserName: string;
            /**
             * 开始时间
             */
            startTime: number;
            /**
             * 结束时间
             */
            endTime: number;
        };
    }) => {
        /**
         * 直播 feedId
         */
        feedId: string;
        /**
         * 直播 nonceId
         */
        nonceId: string;
        /**
         * 直播状态
         */
        status: number;
        /**
         * 视频号头像
         */
        headUrl: string;
        /**
         * 视频号昵称
         */
        nickname: string;
        /**
         * 直播主题
         */
        description: string;
        /**
         * 直播回放状态
         */
        replayStatus: string;
        /**
         * 其他直播列表
         */
        otherInfos: any[];
    };
    [ACTIONS_KEY.setClipboardData]: (param: {
        /**
         * 写入剪贴板内容
         */
        data: string;
    }) => void;
}
/**
 * 路由方法：小微信小程序使用原生方法，web重写方法
 * 使用方式：app.showToast等
 */
export interface IRouterAPI {
    [ROUTER_KEY.navigateTo]: (param: IRouterParams) => void;
    [ROUTER_KEY.redirectTo]: (param: IRouterParams) => void;
    [ROUTER_KEY.reLaunch]: (param: IRouterParams) => void;
    [ROUTER_KEY.navigateBack]: (param: wx.NavigateBackOptions) => void;
    [ROUTER_KEY.relaunchHome]: () => void;
}
export interface IRouterParams {
    basename?: string;
    pageId?: string;
    packageName?: string;
    params?: {
        [key: string]: string;
    };
    mode?: string;
    url?: string;
    appId?: string;
    path?: string;
    protocol?: 'weda-page' | 'http' | 'https' | 'miniprogram' | 'plugin';
}
/**
 * 窗口信息
 */
export interface IViewport {
    /**
     * 窗口宽度
     */
    width: number;
    /**
     * 窗口高度
     */
    height: number;
}
/**
 * 设备信息
 */
export interface IDevice {
    /**
     * 窗口信息
     */
    viewport: IViewport;
    /**
     * 移动端网络类型
     */
    networkType: NETWORK_TYPE;
}
/**
 * 环境信息
 */
export interface IEnv {
    /**
     * 环境类型
     */
    type: ENV_TYPE;
    /**
     * 环境 id
     */
    envId: string;
}
export interface IInitCloudSDKParams extends Partial<Omit<IConfig, 'appID' | 'envID' | 'isProd' | 'tcbClientId'>> {
    /**
     * 云开发环境ID
     */
    envId: string;
    /**
     * 当前是否处于正式发布模式
     */
    isProd?: boolean;
    /**
     * 低码应用ID
     */
    appId?: string;
    /**
     * 应用端ID
     */
    tcbClientId?: string;
    /**
     * 确定调用链路
     */
    endpointType?: 'tcb-api' | 'wecht-service';
}
export {};
