import { observable } from 'mobx';
import { createComputed, createEventHandlers, getMpEventHandlerName } from './util';
import { generateDatasetQuery } from './query';
import { generateEventFlows } from './flow';
import { createWidgets, createInitData, disposeWidget, getWidget } from './widget';
import mergeRenderer from './merge-renderer';
import { setDatasetProfiles, createDataset, EXTRA_API, createStateDataSourceVar, generateParamsParser, setConfig, } from '@cloudbase/weda-cloud-sdk';
import { runWatchers, watchAndSyncDatasetState2Local } from './watch';
import { Event } from './event-emitter';
import { mergeDynamic2StaticData, patchWdigetPropsWithEvtListeners } from './util';
import { styleToCss } from './style';
import { getWedaAPI } from '../app';
import { urlJoinParams } from '../index';
import { APP_LAUNCH_OPTIONS_PROMISE } from '../../common/index';
export const PAGE_ROOT_SYMBOL = Symbol('@@page_route@@');
function resolveParticialPageData(ctx, key, data = {}, dataBinds = {}) {
    const reg = new RegExp(`^${key}`);
    let merge = { [key]: data[key] };
    const pickedDataBinds = {};
    for (const key in dataBinds) {
        if (reg.test(key)) {
            pickedDataBinds[key] = dataBinds[key];
        }
    }
    try {
        merge = mergeDynamic2StaticData(merge, pickedDataBinds, {
            codeContext: {
                /**
                 * $page 或 $comp 实例
                 */
                instance: ctx.app?.__internal__?.activePage,
            },
            $w: ctx.app?.__internal__?.activePage?.__internal__?.$w,
        });
    }
    catch (e) {
        console.warn('分享设置绑定计算错误：', e);
    }
    return merge;
}
function extractLifecycles(ctx, lifecycle, appShareMessage, shareTimeline, dataBinds, resetShare = true) {
    const result = {};
    Object.keys(lifecycle).map((name) => {
        result[name] = function () {
            return lifecycle[name].apply(this._getInstance(), arguments);
        };
    });
    if (resetShare) {
        result['onShareAppMessage'] = (res) => {
            if (res?.from === 'button' && res?.target?.dataset?.weda_share_info) {
                return res?.target?.dataset?.weda_share_info;
            }
            else if (res?.from === 'menu' && appShareMessage?.enable) {
                let mergedData = resolveParticialPageData(ctx, 'appShareMessage', { appShareMessage }, dataBinds);
                let { pageId, params, imageUrl, title, packageName } = mergedData.appShareMessage || {};
                const url = ctx.app?.__internal__?.generatePageUrl({
                    pageId,
                    packageName,
                    params: Array.isArray(params)
                        ? params.reduce((map, { key, value }) => {
                            map[key] = value;
                            return map;
                        }, {})
                        : params,
                });
                return {
                    path: url,
                    imageUrl: ctx.app?.__internal__?.resolveStaticResourceUrl?.(imageUrl) || imageUrl,
                    title,
                };
            }
            try {
                return lifecycle?.['onShareAppMessage']?.() || {};
            }
            catch (error) {
                console.log(error);
                return {};
            }
        };
    }
    if (shareTimeline?.enable || lifecycle?.['onShareTimeline']) {
        result['onShareTimeline'] = () => {
            if (shareTimeline?.enable) {
                let mergedData = resolveParticialPageData(ctx, 'shareTimeline', { shareTimeline }, dataBinds);
                let { params, imageUrl, title } = mergedData.shareTimeline || {};
                const query = urlJoinParams('/fake', Array.isArray(params)
                    ? params.reduce((map, { key, value }) => {
                        map[key] = value;
                        return map;
                    }, {})
                    : params).replace(/^\/fake\?/, '');
                return {
                    query,
                    imageUrl: ctx.app?.__internal__?.resolveStaticResourceUrl?.(imageUrl) || imageUrl,
                    title,
                };
            }
            try {
                return lifecycle?.['onShareTimeline']?.() || {};
            }
            catch (error) {
                console.log(error);
                return {};
            }
        };
    }
    // 更新设备信息 窗口信息
    result['onResize'] = (res) => {
        const { $w } = getWedaAPI();
        let device = $w.device;
        if (!device) {
            return;
        }
        const width = res?.size?.windowWidth;
        const height = res?.size?.windowHeight;
        if (width !== device?.viewport?.width || height !== device?.viewport?.height) {
            device.viewport = {
                width,
                height,
            };
        }
    };
    return result;
}
export function createPage({ app, id, widgetProps, lifecycle, state, computed, evtListeners, dataBinds = {}, handlers, query: datasetQuery = {}, eventFlows = [], pageContext = {}, pageAttributes = {}, resetShare = true, datasetProfile = undefined, checkAuth = async () => true, getExpiredMessage = async () => {
    return '';
}, style = {}, }) {
    /**
     * 单次引用
     */
    if (datasetProfile) {
        setDatasetProfiles({ [pageContext.uuid || pageContext.id || id]: datasetProfile });
    }
    widgetProps = patchWdigetPropsWithEvtListeners(widgetProps, evtListeners);
    const evtHandlers = createEventHandlers(evtListeners);
    // @ts-ignore
    const { [PAGE_ROOT_SYMBOL]: pageRootDataBinds, ...componentDataBinds } = dataBinds;
    const staticPageStyle = style;
    return Component({
        data: {
            ...createInitData(widgetProps, componentDataBinds),
            _isCheckingAtuh: false,
            _expiredMessage: '',
            weDaHasLogin: null,
            loginError: null,
            pageStyle: styleToCss(staticPageStyle),
        },
        lifetimes: {
            attached() {
                this._disposers = [];
                const $page = this._getInstance();
                const instance = $page.__internal__.mpInstance?.(true);
                if (instance !== this) {
                    const currentMpInstance = this;
                    $page.__internal__.mpInstance = (disableLog) => {
                        if (!disableLog) {
                            console.warn('debug 获取当前 mp page 实例，禁止在生产环境使用');
                        }
                        return currentMpInstance;
                    };
                }
                this._pageActive = true;
                /**
                 * @deprecated
                 * 使用 behavior 的方式挂载methods
                 */
                this.__mnt__ = (e) => {
                    const widget = getWidget($page.widgets, e.target.id);
                    widget._methods = e.detail.methods;
                };
                /**
                 * @deprecated
                 * 使用 behavior 的方式挂载methods
                 */
                this.__unmnt__ = (e) => {
                    const widget = getWidget($page.widgets, e.target.id);
                    widget._methods = {};
                };
                this._disposers.push(...this.initMergeRenderer($page.widgets, {
                    pageStyle: () => {
                        let pageStyle = { ...staticPageStyle };
                        try {
                            if (pageRootDataBinds.style) {
                                const { style } = mergeDynamic2StaticData({}, {
                                    style: pageRootDataBinds.style,
                                }, {
                                    codeContext: {
                                        /**
                                         * $page 或 $comp 实例
                                         */
                                        instance: $page,
                                    },
                                    $w: $page?.__internal__?.$w,
                                });
                                pageStyle = {
                                    ...pageStyle,
                                    ...style,
                                };
                            }
                        }
                        catch (e) {
                            console.warn('页面动态style绑定计算失败：', e);
                        }
                        return styleToCss(pageStyle);
                    },
                }));
                getExpiredMessage().then((message) => {
                    if (message) {
                        this.setData({
                            _expiredMessage: message,
                        });
                    }
                });
            },
            detached() {
                const $page = this._getInstance();
                const instance = $page.__internal__.mpInstance?.(true);
                if (instance === this) {
                    $page.__internal__.mpInstance = () => null;
                }
                this._pageActive = false;
                $page.__internal__.active = this._pageActive;
                disposeWidget($page._rootWidget);
                this._disposers.forEach((dispose) => dispose());
            },
        },
        pageLifetimes: {
            // 组件所在页面的生命周期函数，定义下给运营平台上报用
            show: function () { },
            hide: function () { },
        },
        methods: {
            _pageActive: true,
            _beforePageCustomLaunchPromise: null,
            _query: {},
            _disposers: [],
            /** page lifecycles **/
            ...extractLifecycles({ app }, lifecycle, pageAttributes?.appShareMessage, pageAttributes?.shareTimeline, pageRootDataBinds, resetShare),
            ...evtHandlers,
            ...mergeRenderer,
            async beforePageCustomLaunch(query) {
                if (!this._beforePageCustomLaunchPromise) {
                    this._beforePageCustomLaunchPromise = new Promise(async (resolve, reject) => {
                        await getApp().globaldata?._beforePageCustomLaunchPromise;
                        const $page = this._getInstance();
                        let weDaHasLogin;
                        if (query) {
                            EXTRA_API.setParams($page.uuid, query);
                        }
                        try {
                            this.setData({ _isCheckingAtuh: true });
                            const auth = await checkAuth(app, app.id, $page);
                            if (auth) {
                                weDaHasLogin = true;
                                this.setData({
                                    weDaHasLogin,
                                });
                                createStateDataSourceVar($page.uuid, generateParamsParser({ app, $page, $w: $page.__internal__?.$w }));
                            }
                            else {
                                weDaHasLogin = false;
                                this.setData({
                                    weDaHasLogin,
                                });
                            }
                        }
                        catch (e) {
                            weDaHasLogin = false;
                            this.setData({
                                weDaHasLogin,
                                loginError: { message: e.message },
                            });
                        }
                        finally {
                            this.setData({ _isCheckingAtuh: false });
                        }
                        // eslint-disable-next-line no-restricted-syntax
                        for (const queryId in $page.dataset?.query || {}) {
                            if ($page.dataset.query[queryId]?._schema?.trigger === 'auto') {
                                /**
                                 * query 初始化不阻塞生命周期
                                 */
                                Promise.resolve()
                                    .then(async () => {
                                    await $page.dataset.query[queryId]?.initPromise;
                                    return $page.dataset.query[queryId].trigger();
                                })
                                    .catch((e) => {
                                    console.error(`query ${queryId} 初始化失败：`, e);
                                });
                            }
                        }
                        if (weDaHasLogin === false) {
                            reject(new Error('permission denied'));
                        }
                        else {
                            resolve(undefined);
                        }
                    });
                }
                return this._beforePageCustomLaunchPromise;
            },
            async onLoad(options) {
                const $page = this._getInstance();
                setConfig({ currentPageId: $page.uuid });
                this._pageActive = true;
                $page.__internal__.active = this._pageActive;
                app.__internal__.activePage = $page;
                this._query = decodePageQuery(options || {});
                await this.beforePageCustomLaunch?.(this._query);
                const hook = lifecycle.onLoad || lifecycle.onPageLoad;
                await hook?.call?.($page, this._query);
                this._invokeEventHandler('load', { query: this._query });
            },
            async onReady() {
                const $page = this._getInstance();
                this._disposers.push(...runWatchers({}, this));
                await this.beforePageCustomLaunch?.(this._query);
                setTimeout(async () => {
                    const hook = lifecycle.onReady || lifecycle.onPageReady;
                    await hook?.call?.($page);
                    this._invokeEventHandler('ready');
                }, 100);
            },
            onUnload() {
                const $page = this._getInstance();
                const hook = lifecycle.onUnload || lifecycle.onPageUnload;
                hook?.call?.($page);
                this._invokeEventHandler('unload');
            },
            async onShow() {
                const $page = this._getInstance();
                setConfig({ currentPageId: $page.uuid });
                this._pageActive = true;
                $page.__internal__.active = this._pageActive;
                app.__internal__.activePage = $page;
                await this.beforePageCustomLaunch?.(this._query);
                const hook = lifecycle.onShow || lifecycle.onPageShow;
                await hook?.call?.($page);
                this._invokeEventHandler('show');
            },
            onHide() {
                const $page = this._getInstance();
                const hook = lifecycle.onHide || lifecycle.onPageHide;
                hook?.call?.($page);
                this._pageActive = false;
                // 触发页面节点事件
                this._invokeEventHandler('hide');
                $page.__internal__.active = this._pageActive;
            },
            _invokeEventHandler(triggerName, params = {}) {
                const keyName = getMpEventHandlerName(id, triggerName);
                const event = new Event({
                    type: triggerName,
                    detail: params,
                });
                return this[keyName]?.call?.(this, event);
            },
            _getInstance() {
                let $page = this.$WEAPPS_PAGE;
                if ($page) {
                    return $page;
                }
                Object.assign(pageContext, {
                    id,
                    state: observable(state),
                    path: this.route,
                    widgets: {},
                });
                $page = pageContext;
                this.$WEAPPS_PAGE = $page;
                $page.handler = Object.keys(handlers).reduce((result, key) => {
                    try {
                        result[key] = handlers[key].bind($page);
                    }
                    catch (e) {
                        console.error('添加页面handler失败', e);
                    }
                    return result;
                }, {});
                $page.computed = createComputed(computed, $page);
                let dataset = createDataset($page.uuid, undefined, {
                    appId: app.id,
                });
                dataset.query = generateDatasetQuery(datasetQuery, {
                    $w: $page.__internal__.$w,
                    $app: app,
                    $page,
                });
                this._disposers.push(...Object.values(dataset.query).map((query) => {
                    return function dispose() {
                        try {
                            query?.destroy?.();
                        }
                        catch (e) { }
                    };
                }));
                $page.dataset = dataset;
                this._disposers.push(...watchAndSyncDatasetState2Local(app.id, $page.uuid, $page.dataset.state));
                $page.state.dataset = dataset;
                $page.setState = (userSetState) => {
                    Object.keys(userSetState).forEach((keyPath) => {
                        app.utils.set($page.dataset.state, keyPath, userSetState[keyPath]);
                    });
                };
                $page.setParams = (_params) => {
                    const params = Array.isArray(_params)
                        ? _params.reduce((map, meta) => {
                            let { key, value } = meta;
                            if (key?.startsWith?.('$page.')) {
                                key = key.replace(/^\$page\./, '');
                            }
                            if (key?.trim?.()) {
                                map[key?.trim?.()] = value;
                            }
                            return map;
                        }, {})
                        : _params;
                    Object.keys(params).forEach((keyPath) => {
                        app.utils.set($page.dataset?.params, keyPath, params[keyPath]);
                    });
                };
                const { widgets, rootWidget } = createWidgets(widgetProps, componentDataBinds, this, $page.widgets);
                $page.widgets = widgets;
                $page._rootWidget = rootWidget;
                $page.invokeComponentMethod = ({ component, method, params }) => {
                    let componentInstance = undefined;
                    if (typeof component === 'string') {
                        const components = $page.widgets[component];
                        if (Array.isArray(components)) {
                            if (components.length > 1) {
                                throw new Error(`调用方法失败：id为${component}的组件拥有多个实例`);
                            }
                            componentInstance = components[0];
                        }
                        else {
                            componentInstance = components;
                        }
                    }
                    else {
                        componentInstance = component;
                    }
                    const currentInstanceRef = componentInstance?._getInstanceRef()?.current || {};
                    const { methods = {}, ...restInstanceRef } = currentInstanceRef;
                    const readonlyMap = {
                        ...componentInstance?._methods,
                        ...restInstanceRef,
                        ...methods,
                    };
                    if (typeof readonlyMap[method] !== 'function') {
                        throw new Error(`调用方法失败：未找到id为${componentInstance?.id}下的方法${method}`);
                    }
                    return readonlyMap[method](params);
                };
                $page.__internal__.eventFlows = generateEventFlows(eventFlows, {
                    $w: $page.__internal__.$w,
                    $app: app,
                    $page,
                });
                return $page;
            },
        },
    });
}
function decodePageQuery(query) {
    return Object.keys(query).reduce((decoded, key) => {
        decoded[key] = decodeURIComponent(query[key]);
        return decoded;
    }, {});
}
export async function createSimplePageAPIFromLaunchOptions() {
    const options = (await APP_LAUNCH_OPTIONS_PROMISE) || {};
    const { path = '', query = {} } = options;
    const matched = path.match(/pages\/(.*)\/index$/);
    let id = '', uuid = '';
    if (matched && matched[1]) {
        const list = matched[1].split('/');
        if (list.length == 1 || list.length == 2) {
            uuid = matched[1];
            id = list.pop();
        }
    }
    const params = decodePageQuery(query);
    return {
        id,
        uuid,
        params,
    };
}
