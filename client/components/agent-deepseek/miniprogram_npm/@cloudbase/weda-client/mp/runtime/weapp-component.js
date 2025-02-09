import { observable } from 'mobx';
import { createEventHandlers, createComputed, patchWdigetPropsWithEvtListeners, getMpEventHandlerName, compLowcodes, } from './util';
import { generateDatasetQuery } from './query';
import { generateEventFlows } from './flow';
import { createWidgets, getWidget, disposeWidget } from './widget';
import mergeRenderer from './merge-renderer';
import { runWatchers } from './watch';
import { get as lodashGet } from '../../vender';
import { createInitData, createWidget } from './widget';
import { setDatasetProfiles, createDataset, createStateDataSourceVar, generateParamsParser, } from '@cloudbase/weda-cloud-sdk';
import { Event } from './event-emitter';
import { commonCompBehavior } from '../behaviors';
import { getWedaAPI } from '../app';
export function createComponent({ key, behaviors, properties = {}, events, handler, dataBinds = {}, evtListeners, widgetProps, lifeCycle, stateFn, computedFuncs, config, query: datasetQuery = {}, eventFlows = [], datasetProfile = undefined, nativeMode = false, }) {
    /**
     * 单次引用
     */
    if (datasetProfile) {
        setDatasetProfiles({ [key]: datasetProfile });
    }
    widgetProps = patchWdigetPropsWithEvtListeners(widgetProps, evtListeners);
    compLowcodes[key] = {
        index: {},
        stateFn,
        computedFuncs,
        handler,
        // events,
        lib: { const: {}, tools: {} },
        config,
    };
    return Component({
        options: {
            virtualHost: true,
            multipleSlots: true,
            styleIsolation: 'shared',
        },
        /**
         * commonCompBehavior 生命周期最先执行
         */
        behaviors: [commonCompBehavior, ...behaviors],
        // externalClasses: ['class'],
        properties: {
            style: {
                type: String,
            },
            className: {
                type: String,
            },
            ...properties,
        },
        data: createInitData(widgetProps, dataBinds, ''),
        lifetimes: {
            created() {
                this._pageActive = true;
                this._disposers = [];
                this._nativeObserver = false;
                this._nativeMode = nativeMode;
            },
            attached() {
                const $comp = this._getInstance();
                if (!$comp)
                    return;
                $comp.__internal__.active = this._pageActive;
                $comp.props.events = createPropEvents(events, this);
                const { widgets, rootWidget: virtualRootWidget } = createWidgets(widgetProps, dataBinds, this, $comp.widgets);
                $comp.widgets = widgets;
                this._virtualRootWidget = virtualRootWidget;
                for (const queryId in $comp.dataset?.query || {}) {
                    if ($comp.dataset.query[queryId]?._schema?.trigger === 'auto') {
                        /**
                         * query 初始化不阻塞生命周期
                         */
                        Promise.resolve()
                            .then(async () => {
                            await $comp.dataset.query[queryId]?.initPromise;
                            return $comp.dataset.query[queryId].trigger();
                        })
                            .catch((e) => {
                            console.error(`query ${queryId} 初始化失败：`, e);
                        });
                    }
                }
                try {
                    lifeCycle.onAttached && lifeCycle.onAttached.call($comp);
                    this._invokeEventHandler('attached');
                    this.__mnt__ = (e) => {
                        const widget = getWidget($comp.widgets, e.target.id);
                        widget._methods = e.detail.methods;
                    };
                    this.__unmnt__ = (e) => {
                        const widget = lodashGet($comp.widgets, e.target.id);
                        widget._methods = {};
                    };
                    if ($comp.methods) {
                        this.triggerEvent('attached', {
                            methods: $comp.methods,
                        });
                    }
                }
                catch (e) {
                    console.error('Component lifecycle(attached) error', this.is, e);
                }
                this._disposers.push(...this.initMergeRenderer($comp.widgets));
            },
            ready() {
                const $comp = this._getInstance();
                if (!$comp)
                    return;
                this._disposers.push(...runWatchers({}, this));
                lifeCycle.onReady && lifeCycle.onReady.call($comp);
                this._invokeEventHandler('ready');
            },
            detached() {
                const $comp = this._getInstance();
                if (!$comp)
                    return;
                this._pageActive = false;
                $comp.__internal__.active = this._pageActive;
                $comp.widgets = null;
                $comp.node._eventListeners?.clear?.();
                disposeWidget(this._virtualRootWidget);
                this._disposers.forEach((dispose) => dispose());
                lifeCycle.onDetached && lifeCycle.onDetached.call($comp);
                this._invokeEventHandler('detached');
                if ($comp?.methods) {
                    this.triggerEvent('detached');
                }
            },
        },
        pageLifetimes: {
            show() {
                const $comp = this._getInstance();
                if (!$comp)
                    return;
                lifeCycle.onPageShow && lifeCycle.onPageShow.call($comp);
                this._invokeEventHandler('show');
            },
            hide() {
                const $comp = this._getInstance();
                if (!$comp)
                    return;
                lifeCycle.onPageHide && lifeCycle.onPageHide.call($comp);
                this._invokeEventHandler('hide');
            },
            // @ts-ignore
            resize(size) {
                const $comp = this._getInstance();
                if (!$comp)
                    return;
                lifeCycle.onPageResize && lifeCycle.onPageResize.call($comp, size);
            },
        },
        methods: {
            ...createEventHandlers(evtListeners, { looseError: true, isComposite: true }),
            ...mergeRenderer,
            _invokeEventHandler(triggerName, params = {}) {
                const keyName = getMpEventHandlerName('__comp__', triggerName);
                const event = new Event({
                    type: triggerName,
                    detail: params,
                });
                return this[keyName]?.call?.(this, event);
            },
            _getInstance() {
                if (!this.$WEAPPS_COMP) {
                    let widget = this.$node;
                    if (!widget) {
                        if ((this.selectOwnerComponent && !this.selectOwnerComponent?.()) || this._nativeMode) {
                            const widgetValue = {};
                            for (const key in properties) {
                                if (properties[key]?.value !== undefined) {
                                    widgetValue[key] = properties[key]?.value;
                                }
                                if (this.data[key] !== undefined) {
                                    widgetValue[key] = this.data[key];
                                }
                            }
                            this.$node = createWidget({ widgetType: key, ...widgetValue }, this.id || `id${Date.now()}`, '', undefined, {}, {});
                            widget = this.$node;
                            this._nativeObserver = true;
                        }
                        else {
                            console.error('Fatal error: weapps component instance not created', this.is, this.id);
                            return;
                        }
                    }
                    widget.getDom = (fields) => this._virtualRootWidget.children[0].getDom(fields);
                    const { $comp, disposes = [] } = create$comp(widget, { datasetQuery, eventFlows });
                    this.$WEAPPS_COMP = $comp;
                    this._disposers.push(...disposes);
                }
                return this.$WEAPPS_COMP;
            },
        },
        observers: createObservers(Object.keys(properties)),
    });
}
// The component instance for lowcode
function create$comp(w, { eventFlows, datasetQuery }) {
    const lowcode = compLowcodes[w.widgetType];
    if (!lowcode) {
        return {};
    }
    const { stateFn, computedFuncs, handler, lib } = lowcode;
    const { $w, app } = getWedaAPI() || {};
    const context = {
        $w: new Proxy($w || {}, {
            get(target, prop) {
                if (prop === '$comp') {
                    return $comp;
                }
                if (prop === '$page' || prop === 'page') {
                    return getWedaAPI()?.app?.__internal__.activePage;
                }
                // 代理 query
                if ($comp.dataset?.query?.[prop]) {
                    return $comp.dataset.query[prop];
                }
                // 代理 flow
                if ($comp.__internal__.eventFlows?.[prop]) {
                    return $comp.__internal__.eventFlows[prop];
                }
                // 尝试代理组件级别组件实例
                const childWidget = $comp.widgets?.[prop];
                if (childWidget) {
                    return childWidget._userWidget;
                }
                return target[prop];
            },
        }),
        $app: app,
        $page: new Proxy({}, {
            get(target, p) {
                return getWedaAPI()?.app.utils.getCurrentPage()?.[p];
            },
        }),
    };
    const $comp = {
        __internal__: {
            $w: context.$w,
            eventFlows: generateEventFlows(eventFlows, context),
        },
        state: {},
        computed: {},
        widgets: {},
        node: w || {},
        props: {
            data: w || {},
            events: {},
            get style() {
                return w.style;
            },
            get classList() {
                return w.classList;
            },
        },
        handler: {},
        lib,
    };
    context.$comp = $comp;
    $comp.$WEAPPS_COMP = $comp; // TODO $comp will replaced to this.$WEAPPS_COMP
    $comp.computed = createComputed(computedFuncs, $comp);
    $comp.handler = Object.keys(handler).reduce((result, key) => {
        result[key] = handler[key].bind($comp);
        return result;
    }, {});
    $comp.state = observable(stateFn.call($comp)); // May depend on this.props.data.xxx
    let dataset = createDataset(w.widgetType, undefined, {
        appId: app?.id,
    });
    createStateDataSourceVar(w.widgetType, generateParamsParser(context));
    dataset.query = generateDatasetQuery(datasetQuery, context);
    $comp.dataset = dataset;
    return {
        $comp,
        disposes: Object.values(dataset.query).map((query) => {
            return function dispose() {
                try {
                    query?.destroy?.();
                }
                catch (e) { }
            };
        }),
    };
}
function createObservers(props) {
    const MAP = {
        className: {
            alias: 'classList',
            format: function (value = '') {
                return Array.from(new Set(value.split(' ').filter((item) => !!item)));
            },
        },
    };
    return props.reduce((observers, prop) => {
        observers[prop] = function (value) {
            if (!this._nativeObserver) {
                return;
            }
            const $comp = this._getInstance();
            if ($comp) {
                const data = $comp.props.data || {};
                const dataKey = MAP[prop]?.alias || prop;
                const formatValue = MAP[prop]?.format ? MAP[prop].format(value) : value;
                // if (!deepEqual(data[prop], formatValue)) {
                data[dataKey] = formatValue;
                // } else {
                //   // console.log(`Same comp prop will not trigger observer. ${prop}->${dataKey}`, formatValue)
                // }
            }
        };
        return observers;
    }, {});
}
function dataBindsBindContext(dataBinds, self) {
    return Object.keys(dataBinds).reduce((result, widgetId) => {
        result[widgetId] = Object.keys(dataBinds[widgetId]).reduce((result, prop) => {
            result[prop] = dataBinds[widgetId][prop].bind(self);
            return result;
        }, {});
        return result;
    }, {});
}
function createPropEvents(events, mpInst) {
    const protectEventKeys = [
        'touchstart',
        'touchmove',
        'touchcancel',
        'touchend',
        'tap',
        'longpress',
        'longtap',
        'transitionend',
        'animationstart',
        'animationiteration',
        'animationend',
        'touchforcechange', // 在支持 3D Touch 的 iPhone 设备，重按时会触发
    ];
    const result = {};
    events.forEach((evt) => {
        const isProtectKey = protectEventKeys.some((key) => key === evt.name);
        if (isProtectKey) {
            result[evt.name] = function () { };
        }
        else {
            result[evt.name] = function (evtDetail) {
                if (evt.getValueFromEvent) {
                    mpInst.setData({ value: evt.getValueFromEvent({ detail: evtDetail }) });
                }
                mpInst.triggerEvent(evt.name, evtDetail);
                mpInst._getInstance().node?._eventListeners?.emit?.(evt.name, evtDetail);
            };
        }
    });
    return result;
}
