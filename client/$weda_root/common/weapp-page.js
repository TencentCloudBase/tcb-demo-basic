import { observable } from 'mobx';
import {
  createComputed,
  createEventHandlers,
  checkAuth,
  getMpEventHandlerName,
  getExpiredMessage
} from './util';
import { generateDatasetQuery } from './query'
import { generateEventFlows } from './flow'
import { createWidgets, createInitData, disposeWidget, getWidget } from './widget';
import mergeRenderer from './merge-renderer';
import {
  setDatasetProfiles,
  createDataset,
  EXTRA_API,
  createStateDataSourceVar,
  generateParamsParser,
  setConfig,
} from './cloud-sdk';
import { runWatchers, watchAndSyncDatasetState2Local } from './watch';
import { getWedaAPI, urlJoinParams } from '@cloudbase/weda-client';
import { Event } from './event-emitter';
import { mergeDynamic2StaticData, patchWdigetPropsWithEvtListeners } from './util';
import { styleToCss } from './style';

export const PAGE_ROOT_SYMBOL = Symbol('@@page_route@@')

const wxApp = getApp();

function resolveParticialPageData(ctx, key, data = {}, dataBinds = {}) {
  const reg = new RegExp(`^${key}`)
  let merge = { [key]: data[key] }
  const pickedDataBinds = {}
  for (const key in dataBinds) {
    if (reg.test(key)) {
      pickedDataBinds[key] = dataBinds[key]
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
    })
  } catch (e) {
    console.warn('分享设置绑定计算错误：', e)
  }
  return merge
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
      } else if (res?.from === 'menu' && appShareMessage?.enable) {
        let mergedData = resolveParticialPageData(ctx, 'appShareMessage', { appShareMessage }, dataBinds);

        let { pageId, params, imageUrl, title, packageName } = mergedData.appShareMessage || {};
        const url = ctx.app?.__internal__?.generatePageUrl({
          pageId,
          packageName,
          params: Array.isArray(params) ? params.reduce((map, { key, value }) => {
            map[key] = value
            return map
          }, {}) : params,
        })
        return {
          path: url,
          imageUrl: ctx.app?.__internal__?.resolveStaticResourceUrl?.(imageUrl) || imageUrl,
          title,
        };
      }
      try {
        return lifecycle?.['onShareAppMessage']?.() || {};
      } catch (error) {
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
        const query = urlJoinParams('/fake', Array.isArray(params) ? params.reduce((map, { key, value }) => {
          map[key] = value
          return map
        }, {}) : params).replace(/^\/fake\?/, '')

        return {
          query,
          imageUrl: ctx.app?.__internal__?.resolveStaticResourceUrl?.(imageUrl) || imageUrl,
          title,
        };
      }
      try {
        return lifecycle?.['onShareTimeline']?.() || {};
      } catch (error) {
        console.log(error);
        return {};
      }
    };
  }

  // 更新设备信息 窗口信息
  result['onResize'] = (res) => {
    const { $w } = getWedaAPI()
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

export function createPage({
  app,
  id,
  widgetProps,
  index = {},
  lifecycle,
  state,
  computed,
  evtListeners,
  dataBinds = {},
  handlers,
  query: datasetQuery = {},
  eventFlows = [],
  pageContext = {},
  pageAttributes = {},
  resetShare = true,
  datasetProfile = undefined
}) {
  /**
   * 单次引用
   */
  if (datasetProfile) {
    setDatasetProfiles({ [pageContext.uuid || pageContext.id || id]: datasetProfile })
  }
  widgetProps = patchWdigetPropsWithEvtListeners(widgetProps, evtListeners)

  const evtHandlers = createEventHandlers(evtListeners);
  const {[PAGE_ROOT_SYMBOL]: pageRootDataBinds, ...componentDataBinds} = dataBinds
  const staticPageStyle = {
  "--wd-font-base": "16px",
  "--wd-shadow-lg": "0px 0px 20px 0px rgba(0, 0, 0, 0.20)",
  "--wd-shadow-sm": "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
  "--wd-color-brand": "rgb(58, 48, 216)",
  "--wd-color-error": "rgb(227, 77, 89)",
  "--wd-color-bg-page": "rgb(241, 242, 245)",
  "--wd-color-brand-1": "rgb(237, 230, 255)",
  "--wd-color-brand-2": "rgb(212, 196, 255)",
  "--wd-color-brand-3": "rgb(192, 173, 255)",
  "--wd-color-brand-4": "rgb(171, 150, 255)",
  "--wd-color-brand-5": "rgb(149, 128, 255)",
  "--wd-color-brand-6": "rgb(125, 105, 255)",
  "--wd-color-brand-7": "rgb(91, 74, 240)",
  "--wd-color-brand-8": "rgb(58, 48, 216)",
  "--wd-color-brand-9": "rgb(32, 26, 199)",
  "--wd-color-error-1": "rgb(253, 236, 238)",
  "--wd-color-error-2": "rgb(249, 215, 217)",
  "--wd-color-error-3": "rgb(248, 185, 190)",
  "--wd-color-error-4": "rgb(247, 141, 148)",
  "--wd-color-error-5": "rgb(243, 109, 120)",
  "--wd-color-error-6": "rgb(227, 77, 89)",
  "--wd-color-error-7": "rgb(201, 53, 63)",
  "--wd-color-error-8": "rgb(177, 31, 38)",
  "--wd-color-error-9": "rgb(149, 17, 20)",
  "--wd-color-success": "rgb(0, 168, 112)",
  "--wd-color-warning": "rgb(237, 123, 47)",
  "--wd-color-bg-hover": "rgba(0, 0, 0, 0.05)",
  "--wd-color-brand-10": "rgb(7, 7, 181)",
  "--wd-color-error-10": "rgb(104, 5, 6)",
  "--wd-shadow-default": "0px 2px 8px 0px rgba(0, 0, 0, 0.16)",
  "--wd-color-bg-active": "rgba(0, 0, 0, 0.1)",
  "--wd-color-success-1": "rgb(232, 248, 242)",
  "--wd-color-success-2": "rgb(188, 235, 220)",
  "--wd-color-success-3": "rgb(133, 219, 190)",
  "--wd-color-success-4": "rgb(72, 199, 156)",
  "--wd-color-success-5": "rgb(0, 168, 112)",
  "--wd-color-success-6": "rgb(7, 141, 92)",
  "--wd-color-success-7": "rgb(6, 121, 69)",
  "--wd-color-success-8": "rgb(5, 99, 52)",
  "--wd-color-success-9": "rgb(4, 79, 42)",
  "--wd-color-warning-1": "rgb(254, 243, 230)",
  "--wd-color-warning-2": "rgb(249, 224, 199)",
  "--wd-color-warning-3": "rgb(247, 199, 151)",
  "--wd-color-warning-4": "rgb(242, 153, 95)",
  "--wd-color-warning-5": "rgb(237, 123, 47)",
  "--wd-color-warning-6": "rgb(211, 90, 33)",
  "--wd-color-warning-7": "rgb(186, 67, 27)",
  "--wd-color-warning-8": "rgb(158, 54, 16)",
  "--wd-color-warning-9": "rgb(132, 43, 11)",
  "--wd-color-brand-dark": "rgb(7, 7, 181)",
  "--wd-color-error-dark": "rgb(149, 17, 20)",
  "--wd-color-success-10": "rgb(3, 48, 23)",
  "--wd-color-text-brand": "rgb(58, 48, 216)",
  "--wd-color-warning-10": "rgb(90, 25, 7)",
  "--wd-color-brand-focus": "rgb(212, 196, 255)",
  "--wd-color-brand-hover": "rgb(91, 74, 240)",
  "--wd-color-brand-light": "rgb(237, 230, 255)",
  "--wd-color-error-focus": "rgb(249, 215, 217)",
  "--wd-color-error-hover": "rgb(243, 109, 120)",
  "--wd-color-error-light": "rgb(253, 236, 238)",
  "--wd-color-text-second": "rgb(75, 91, 118)",
  "--wd-color-bg-container": "rgb(255, 255, 255)",
  "--wd-color-border-hover": "rgb(188, 196, 208)",
  "--wd-color-brand-active": "rgb(58, 48, 216)",
  "--wd-color-error-active": "rgb(201, 53, 63)",
  "--wd-color-success-dark": "rgb(4, 79, 42)",
  "--wd-color-text-default": "rgb(19, 22, 27)",
  "--wd-color-text-inverse": "rgb(255, 255, 255)",
  "--wd-color-warning-dark": "rgb(132, 43, 11)",
  "--wd-color-success-focus": "rgb(188, 235, 220)",
  "--wd-color-success-hover": "rgb(72, 199, 156)",
  "--wd-color-success-light": "rgb(232, 248, 242)",
  "--wd-color-text-disabled": "rgb(188, 196, 208)",
  "--wd-color-warning-focus": "rgb(249, 224, 199)",
  "--wd-color-warning-hover": "rgb(242, 153, 95)",
  "--wd-color-warning-light": "rgb(254, 243, 230)",
  "--wd-color-border-default": "rgb(214, 219, 227)",
  "--wd-color-brand-disabled": "rgb(192, 173, 255)",
  "--wd-color-error-disabled": "rgb(248, 185, 190)",
  "--wd-color-success-active": "rgb(7, 141, 92)",
  "--wd-color-warning-active": "rgb(211, 90, 33)",
  "--wd-color-border-separator": "rgb(227, 230, 235)",
  "--wd-color-success-disabled": "rgb(133, 219, 190)",
  "--wd-color-text-placeholder": "rgb(151, 163, 183)",
  "--wd-color-warning-disabled": "rgb(247, 199, 151)",
  "--wd-color-bg-container-hover": "rgb(241, 242, 245)",
  "--wd-color-bg-container-active": "rgb(227, 230, 235)",
  "--wd-color-bg-secondarycontainer": "rgb(241, 242, 245)",
  "--wd-color-bg-secondarycontainer-hover": "rgb(235, 237, 241)",
  "--wd-color-bg-secondarycontainer-active": "rgb(214, 219, 227)",
  "--wd-font-size-3": "0.875rem",
  "--wd-font-size-4": "1rem",
  "--wd-font-size-5": "1.125rem",
  "--wd-border-radius": "1.25rem",
  "--wd-font-weight-1": "400",
  "--wd-font-weight-3": "400",
  "--wd-border-radius-lg": "1.25rem",
  "--wd-border-radius-md": "1rem",
  "--wd-font-size-title-1": "4rem",
  "--wd-font-size-title-2": "3rem",
  "--wd-font-size-title-3": "2.25rem",
  "--wd-font-size-title-4": "1.5rem",
  "--wd-font-size-title-5": "1.25rem",
  "--wd-font-size-title-6": "1.125rem",
  "--wd-font-size-title-7": "1.125rem",
  "--wd-font-size-title-8": "1rem",
  "--wd-font-size-title-9": "0.875rem",
  "--wd-font-line-height-1": "1.5",
  "--wd-font-line-height-3": "1.5",
  "--wd-font-weight-regular": "400",
  "--wd-font-weight-title-1": "600",
  "--wd-font-weight-title-2": "600",
  "--wd-font-weight-title-3": "600",
  "--wd-font-weight-title-4": "600",
  "--wd-font-weight-title-5": "600",
  "--wd-font-weight-title-6": "600",
  "--wd-font-weight-title-7": "600",
  "--wd-font-weight-title-8": "600",
  "--wd-font-weight-title-9": "600",
  "--wd-font-line-height-default": "1.5",
  "--wd-font-line-height-title-1": "1.2",
  "--wd-font-line-height-title-2": "1.2",
  "--wd-font-line-height-title-3": "1.2",
  "--wd-font-line-height-title-4": "1.5",
  "--wd-font-line-height-title-5": "1.5",
  "--wd-font-line-height-title-6": "1.5",
  "--wd-font-line-height-title-7": "1.5",
  "--wd-font-line-height-title-8": "1.5",
  "--wd-font-line-height-title-9": "1.5"
}

  return Component({
    _componentType: 'page',
    data: {
      ...createInitData(widgetProps, componentDataBinds),
      _isCheckingAtuh: false,
      _expiredMessage: '',
      weDaHasLogin: null,
      loginError: null,
      pageStyle: styleToCss(staticPageStyle)
    },
    lifetimes: {
      attached() {
        this._disposers = [];
        const $page = this._getInstance();
        const instance = $page.__internal__.mpInstance?.(true)
        if( instance !== this ){
          const currentMpInstance = this
          $page.__internal__.mpInstance = (disableLog) => {
            if (!disableLog) {
              console.warn('debug 获取当前 mp page 实例，禁止在生产环境使用');
            }
            return currentMpInstance
          }
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
            let pageStyle = { ...staticPageStyle }
            try {
              if ( pageRootDataBinds.style ) {
                const { style } = mergeDynamic2StaticData({}, {
                  style: pageRootDataBinds.style
                }, {
                  codeContext: {
                    /**
                     * $page 或 $comp 实例
                     */
                    instance: $page,
                  },
                  $w: $page?.__internal__?.$w,
                })
                pageStyle = {
                  ...pageStyle,
                  ...style
                }
              }
            } catch(e) {
              console.warn('页面动态style绑定计算失败：', e)
            }
            return styleToCss(pageStyle)
          }
        }));
        getExpiredMessage(0).then(message => {
          if (message) {
            this.setData({
              _expiredMessage: message
            })
          }
        })
      },
      detached() {
        const $page = this._getInstance();
        const instance = $page.__internal__.mpInstance?.(true)
        if( instance === this ){
          $page.__internal__.mpInstance = () => null
        }
        this._pageActive = false;
        $page.__internal__.active = this._pageActive;

        disposeWidget($page._rootWidget);
        this._disposers.forEach((dispose) => dispose());
      },
    },
    pageLifetimes: {
      // 组件所在页面的生命周期函数，定义下给运营平台上报用
      show: function () {},
      hide: function () {},
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
            await wxApp.globaldata?._beforePageCustomLaunchPromise;
            const $page = this._getInstance();
            let weDaHasLogin
            if (query) {
              EXTRA_API.setParams($page.uuid, query);
            }
            try {
              this.setData({ _isCheckingAtuh: true });
              const auth = await checkAuth(app, app.id, $page);
              if (auth) {
                weDaHasLogin = true
                this.setData({
                  weDaHasLogin,
                });
                createStateDataSourceVar($page.uuid, generateParamsParser({ app, $page, $w: $page.__internal__?.$w }));
              } else {
                weDaHasLogin = false
                this.setData({
                  weDaHasLogin,
                });
              }
            } catch(e) {
              weDaHasLogin = false
              this.setData({
                weDaHasLogin,
                loginError: { message: e.message }
              });
            } finally {
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
            if(weDaHasLogin===false) {
              reject(new Error('permission denied') )
            }else {
              resolve()
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

        this._disposers.push(...runWatchers(index, this));

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
          } catch (e) {
            console.error('添加页面handler失败', e);
          }
          return result;
        }, {});
        $page.computed = createComputed(computed, $page);
        let dataset = createDataset($page.uuid, undefined, {
          appId: app.id
        });
        dataset.query = generateDatasetQuery(datasetQuery, {
          $w: $page.__internal__.$w,
          $app: app,
          $page,
        });
        this._disposers.push(...Object.values(dataset.query).map(query=>{
          return function dispose() {
            try {
              query?.destroy?.()
            } catch(e) {}
          }
        }))
        $page.dataset = dataset;
        this._disposers.push(...watchAndSyncDatasetState2Local(app.id, $page.uuid, $page.dataset.state))
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
                if(key?.trim?.()){
                  map[key?.trim?.()] = value;
                }
                return map;
              }, {})
            : _params;

          Object.keys(params).forEach((keyPath) => {
            app.utils.set($page.dataset?.params, keyPath, params[keyPath]);
          });
        }

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
            } else {
              componentInstance = components;
            }
          } else {
            componentInstance = component
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

