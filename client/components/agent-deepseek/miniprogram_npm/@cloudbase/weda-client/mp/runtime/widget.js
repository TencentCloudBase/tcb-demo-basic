import { observable, autorun, untracked } from 'mobx';
import { styleToCss } from './style';
import { getDeep, generateDataContext, processStaticResourceAttribute, compLowcodes } from './util';
import EventEmitter from './event-emitter';
import { set as lodashSet } from '../../vender';
const REPEATER = {
    MODULE_NAME: 'gsd-h5-react',
    REPEATER_NAME: 'Repeater',
    REPEATER_ITEM_NAME: 'RepeaterItem',
};
/**
 * convert widget prop to data for wxml
 * @param {*} props
 */
const EXTRA_PROPS_MAP = [
    /**
     * create widgets
     */
    'id',
    'widgetType',
    'parent',
    'children',
    '_scope',
    '_disposers',
    '_eventListeners',
    /**
     * mount widget api
     */
    'findWidgets',
    'getWidgetsByType',
    'getOwnerWidget',
    'getDom',
    'on',
    'off',
    'getConfig',
    '_getInstanceRef',
    '_instanceRef',
    '_methods',
    '_userWidget',
    /**
     * 其他挂载
     */
    '_descendants',
    '_forContext',
    /**
     * widgetProps 附带值
     */
    '_order',
    '_staticResourceAttribute',
    'classList',
].reduce((map, key) => {
    map[key] = true;
    return map;
}, {});
function resolveWidgetProp(props, widgetId) {
    let { classList = [], _staticResourceAttribute = ['src'], ...restProps } = props;
    const data = {};
    Object.keys(restProps).forEach((key) => {
        if (EXTRA_PROPS_MAP[key]) {
            return;
        }
        if (restProps[key] instanceof Function || restProps[key] === undefined) {
            return;
        }
        data[key] = restProps[key];
    });
    data.style = styleToCss(restProps.style);
    data.className = `${widgetId ? `wd-comp-id-${widgetId}` : ''} ${classList.join ? classList.join(' ') : classList}`;
    _staticResourceAttribute?.forEach?.((property) => {
        processStaticResourceAttribute(data, undefined, property);
    });
    return data;
}
// widget prop -> wxml data
export function resolveWidgetData(props, widgetId) {
    if (!Array.isArray(props)) {
        return resolveWidgetProp(props, widgetId);
    }
    return props.map((prop) => resolveWidgetData(prop, widgetId));
}
export function createWidgets(widgetProps, dataBinds, ownerMpInst, widgetHolder) {
    const rootNode = createWidgetDataTree(widgetProps, dataBinds);
    const failedBinds = [];
    const result = createSubWidgetTree({ ownerForWidgetHolder: {} }, rootNode, dataBinds, ownerMpInst, {}, failedBinds, undefined, widgetHolder);
    retryFailedBinds(failedBinds, true);
    return result;
}
/**
 * @param ownerMpInst The MP page or component instance the widgets belongs to
 * @param ownerForWidgetHolder null for the virtual root node(first run)
 * @param curForNode a component node or a virtual root tree node
 * @returns {widgets: {id1:[], id2}, rootWidget: {children: [], _disposers: [], ...otherProps}}
 */
function createSubWidgetTree(ctx, curForNode, dataBinds, ownerMpInst, forContext = {}, failedBinds = [], parentWidget = { children: observable([]), _disposers: [] }, widgetHolder = {}) {
    const { ownerForWidgetHolder = {}, existingWidgetMap = {} } = ctx;
    /**
     * 不能类似web实现记录额外的 _disposers
     * const widgetHolder = { _disposers: [] }
     * 因为 merger-render.initMergeRenderer 里面没有特殊处理
     * 因为 构建 widgets 过程中对 $page.widgets 进行了访问，需要使用副作用的方式，保持 $page.widgets 引用
     */
    // const widgetHolder = {};
    const { lists: forLists = [] } = forContext;
    const currentIndex = forLists[0]?.currentIndex;
    const indexPostfix = (forContext.lists || [])
        .slice()
        .reverse()
        .map(({ currentIndex }) => ID_SEPARATOR + currentIndex)
        .join('');
    // traverse down the tree to set up all widgets
    dfsTree(curForNode, (node, parentNode, cache) => {
        const parentForWidgetArr = ownerForWidgetHolder[node.id] || [];
        const { _waForKey } = node.value;
        const key = forContext.forItems?.[node.id]?.[_waForKey] || currentIndex;
        let forExistingWidgetMap = {};
        let forExsitWidget;
        /**
         * for 起始节点，根据 existingWidgetMap 判断复用
         */
        if (node.id === curForNode.id) {
            if (existingWidgetMap[key] && existingWidgetMap[key].index === currentIndex) {
                forExistingWidgetMap = existingWidgetMap[key].widgets || {};
                forExsitWidget = forExistingWidgetMap[node.id];
                if (forExsitWidget) {
                    cache[node.id] = {
                        widgets: forExistingWidgetMap,
                    };
                }
            }
        }
        else if (cache[parentNode?.id]) {
            forExsitWidget = cache[parentNode?.id].widgets[node.id] || null;
            if (forExsitWidget) {
                cache[node.id] = cache[parentNode?.id];
            }
        }
        const existedWidget = forExsitWidget || null;
        if (node.forCount === curForNode.forCount) {
            /**
             * 同一层循环作用域内，当前节点与 curForNode（循环根节点）在同一级循环作用域中
             * 即没有再开辟新级别的 for 循环
             * Leaf node
             */
            let w = existedWidget;
            if (!existedWidget) {
                const parentNode = node.parent;
                let parent = parentNode ? widgetHolder[parentNode.id] || ownerForWidgetHolder[parentNode.id] : null;
                w = createWidget(node.value, node.id, indexPostfix, parent, ownerMpInst, forContext.forItems?.[node.id]);
                w._key = key;
                if (!parent) {
                    parentWidget.children.push(w);
                }
            }
            else {
                w.id = `${node.id}${indexPostfix}`;
                disposeWidget(existedWidget, true);
            }
            parentForWidgetArr[currentIndex || 0] = w;
            setUpWidgetDataBinds(w, dataBinds[node.id], forContext, failedBinds, ownerMpInst._getInstance());
            widgetHolder[node.id] = w;
            if (widgetHolder?.[node._ancestorId]) {
                // 在虚拟项 RepeaterItem 下挂载所有的子孙 __descendants
                // 这里不要用 lodashSet，否则会出现刷新几次，出现 Error: [mobx.array] Index out of bounds 的错误，原因暂不明
                widgetHolder[node._ancestorId]._descendants = widgetHolder[node._ancestorId]._descendants || {};
                widgetHolder[node._ancestorId]._descendants[node.id] = widgetHolder[node.id];
            }
        }
        else {
            if (!existedWidget) {
                widgetHolder[node.id] = observable([]);
            }
            else {
                // Reuse existed for widget array
                widgetHolder[node.id] = existedWidget;
            }
            if (parentForWidgetArr) {
                parentForWidgetArr[currentIndex || 0] = widgetHolder[node.id];
            }
        }
    }, undefined);
    // run for of next level
    dfsTree(curForNode, (node) => {
        if (node.forCount === curForNode.forCount + 1 && dataBinds[node.id] && dataBinds[node.id]._waFor) {
            // find the node bound with next level for
            const parent = getNodeParentWidget(node, widgetHolder, parentWidget);
            const dispose = runFor(node, dataBinds, ownerMpInst, forContext, widgetHolder, failedBinds, parent);
            parent._disposers.push(dispose); // Add the for bind dispose to the parent node of forNode
        }
    }, undefined);
    retryFailedBinds(failedBinds);
    return { widgets: widgetHolder, rootWidget: widgetHolder[curForNode.id] || parentWidget };
}
// Retry failed databinds
function retryFailedBinds(failedBinds, finalTry = false) {
    const len = failedBinds.length;
    for (let i = 0; i < len; i++) {
        const setUpDataBind = failedBinds.shift();
        setUpDataBind(finalTry);
    }
}
/**
 *
 * @param {*} curForNode
 * @param {*} forContext
 * @param {*} parentForWidgets
 * @param {*} parentWidget
 * @returns top level widgets or for dispose
 */
const _FOR_ERROR_CACHE_MAP = {};
function runFor(curForNode, dataBinds, ownerMpInst, forContext, ownerForWidgetHolder, failedBinds, parentWidget) {
    const nodeId = curForNode.id;
    const { _waForKey } = curForNode.value;
    const dispose = autorun(() => {
        let forList = [];
        try {
            clearTimeout(_FOR_ERROR_CACHE_MAP[nodeId]);
            const $instance = ownerMpInst._getInstance();
            const dataContext = untracked(() => generateDataContext(parentWidget));
            const $w = untracked(() => generateWidgetAPIContext($instance?.__internal__?.$w, parentWidget, forContext));
            forList = dataBinds[nodeId]._waFor.call($instance, $instance, forContext.lists, forContext.forItems, undefined, dataContext, $w);
            if (!Array.isArray(forList)) {
                forList = [];
            }
        }
        catch (e) {
            forList = [];
            _FOR_ERROR_CACHE_MAP[nodeId] = setTimeout(() => {
                console.warn('For binding error', nodeId, e);
            }, 1000);
        }
        // Track list change (e.g. push)
        forList.forEach((e) => { });
        untracked(() => {
            // dispose widgets before reused instead
            // disposeWidgets(parentForWidgets[curForNode.id])
            const exsitMap = forList.reduce((map, item, index) => {
                const cache = item?.[_waForKey] || index;
                if (cache !== undefined && map[cache] === undefined) {
                    map[cache] = index;
                }
                return map;
            }, {});
            const forWidgets = ownerForWidgetHolder[nodeId];
            const existingWidgetMap = {};
            const existingWidgetIndexMap = {};
            const extraWidgetsIndexMap = {};
            forWidgets.forEach((widget, index) => {
                const cecheKey = widget._key || index;
                if (exsitMap[cecheKey] !== undefined) {
                    const nodeId = widget.id?.split(ID_SEPARATOR)[0];
                    existingWidgetMap[cecheKey] = { index: exsitMap[cecheKey], widgets: { [nodeId]: widget } };
                    /**
                     * 此处依赖了 existingWidgetMap[cecheKey].widgets 的引用，
                     * 为了直接可以通过 index 访问到 existingWidgetMap 里的值进行编辑
                     * 但是依赖引用关系，存在维护风险
                     */
                    existingWidgetIndexMap[index] = existingWidgetMap[cecheKey].widgets;
                    // need to use uqique key
                    exsitMap[cecheKey] = undefined;
                }
                else {
                    extraWidgetsIndexMap[index] = widget;
                }
            });
            // clean extra widgets of previous for run
            dfsTree(curForNode, (node) => {
                const arr = ownerForWidgetHolder[node.id] || [];
                /**
                 * clone 上次 for 已有的 widgets
                 */
                if (node.id !== curForNode.id) {
                    arr.forEach((item, index) => {
                        if (existingWidgetIndexMap[index]) {
                            existingWidgetIndexMap[index][node.id] = item;
                        }
                    });
                }
                if (!Object.keys(extraWidgetsIndexMap).length && arr.length === Object.keys(existingWidgetIndexMap).length) {
                    /**
                     * 数组完全复用，不需要进行修改
                     */
                }
                else {
                    /**
                     * 重头开始生成
                     * 清空原有 arr 并保持引用不变
                     */
                    arr.splice(0, arr.length);
                }
            }, undefined);
            /**
             * 明确已经不会复用的节点，清除 mobx observer
             * 并递归清理子节点
             */
            for (const index in extraWidgetsIndexMap) {
                const w = extraWidgetsIndexMap[index];
                disposeWidget(w);
                const { children } = w.parent || parentWidget;
                children.remove(w);
                // w.parent = null
            }
            const isInRepeaterChild = isRepeaterWidget(parentWidget, REPEATER.REPEATER_NAME);
            forList.forEach((item, index) => {
                let forContextListAlias;
                let { lists = [], forItems = {} } = forContext;
                const listMeta = { currentItem: item, currentIndex: index };
                if (isInRepeaterChild) {
                    forContextListAlias = {
                        [`${parentWidget.forIndex}` || 'currentIndex']: listMeta.currentIndex,
                        [`${parentWidget.forItem}` || 'currentItem']: listMeta.currentItem,
                    };
                }
                const _forContext = {
                    lists: [{ ...listMeta, alias: forContextListAlias }, ...lists],
                    forItems: { ...forItems, [nodeId]: item },
                };
                const { rootWidget } = createSubWidgetTree({ ownerForWidgetHolder, existingWidgetMap }, curForNode, dataBinds, ownerMpInst, _forContext, failedBinds, parentWidget);
                rootWidget._forContext = _forContext;
            });
        });
    });
    return dispose;
}
export function createWidget(props, nodeId, indexPostfix, parent, ownerMpInst, forContext) {
    const { widgetType, _parentId, ...restProps } = props;
    const w = observable(restProps);
    const id = `${nodeId}${indexPostfix}`;
    // Builtin props
    w.id = id; // 重用之后要修改id
    // Object.defineProperty(w, 'id', { value: id });
    Object.defineProperty(w, 'widgetType', { value: widgetType });
    Object.defineProperty(w, '_scope', {
        value: observable({
            id: nodeId,
            dataContext: {},
            /**
             * 当前节点的 for currentItem 对象
             */
            forContext,
        }),
    });
    // w._disposers = []
    // w.children = [];
    Object.defineProperty(w, 'children', { value: observable([]) });
    Object.defineProperty(w, '_disposers', { value: observable([]) });
    Object.defineProperty(w, '_eventListeners', { value: new EventEmitter() });
    Object.defineProperty(w, '_instanceRef', { value: observable({ current: null }) });
    if (parent) {
        // w.parent = parent
        Object.defineProperty(w, 'parent', { value: parent });
        parent.children.push(w);
    }
    mountBuiltinWigetsAPI(w, ownerMpInst);
    if (isRepeaterWidget(w, REPEATER.REPEATER_NAME)) {
        if (!w.items) {
            Object.defineProperty(w, 'items', {
                get() {
                    return (w.children || []).map((item) => {
                        const descendants = {};
                        Object.keys(item?._descendants || {}).forEach((key) => {
                            descendants[key] = item._descendants[key]._userWidget;
                        });
                        return descendants;
                    });
                },
            });
        }
        // 默认初始值
        w._disposers.push(autorun((r) => {
            const ref = {
                data: w.data,
                items: w.items,
            };
            untracked(() => {
                w._instanceRef.current = ref;
            });
        }));
    }
    return w;
}
function setUpWidgetDataBinds(w, dataBinds, forContext, failedBinds, ctx) {
    Object.keys(dataBinds || {})
        .sort((a, b) => {
        return a.length - b.length > 0 ? 1 : -1;
    })
        .map((prop) => {
        if (prop === '_waFor') {
            return;
        }
        let timer = null;
        const setUpDataBind = (isFinalTry = false) => {
            let ran = false;
            const dispose = autorun((reaction) => {
                try {
                    clearTimeout(timer);
                    const dataContext = untracked(() => generateDataContext(w));
                    const $w = untracked(() => generateWidgetAPIContext(ctx?.__internal__?.$w, w, forContext));
                    // Computed data bind in the next tick since data bind may read widgets data
                    const value = dataBinds[prop].call(ctx, ctx, forContext.lists, forContext.forItems, undefined, dataContext, $w);
                    const paths = prop.split('.').filter((key) => !!key);
                    if (paths.length > 1) {
                        // 一定要 untracked 不然爆栈了
                        untracked(() => lodashSet(w, prop, value));
                    }
                    else {
                        // 普通 key 直接赋值
                        w[prop] = value;
                    }
                }
                catch (e) {
                    if (prop === '_waIf') {
                        w[prop] = false;
                    }
                    if (isFinalTry || ran) {
                        timer = setTimeout(() => {
                            console.warn(`Error computing data bind ${w.id}.${prop}`, e);
                        }, 1000);
                    }
                    else {
                        failedBinds.push((...args) => {
                            reaction.dispose();
                            return setUpDataBind(...args);
                        });
                    }
                    ran = true;
                }
            });
            w._disposers.push(dispose);
        };
        setUpDataBind();
    });
}
export function generateForContextOfWidget(widget) {
    const forContext = widget._forContext;
    if (forContext)
        return forContext;
    if (widget.parent)
        return generateForContextOfWidget(widget.parent);
}
export const ID_SEPARATOR = '-';
export function getWidget(widgets, id) {
    return getDeep(widgets, id, ID_SEPARATOR);
}
function getNodeParentWidget(node, widgets, defaultParent = { children: observable([]), _disposers: [] }) {
    return (node?.parent?.id && widgets?.[node.parent.id]) || defaultParent;
}
/**
 * Add parent, children to widget
 */
function createWidgetDataTree(widgets, dataBinds) {
    const virtualRoot = { children: [], forCount: 0 };
    const nodes = Object.keys(widgets).reduce((result, id) => {
        const w = widgets[id];
        result[id] = { id, value: w, _order: w._order, children: [], parent: null, forCount: 0 };
        return result;
    }, {});
    // Create widgets tree API
    Object.keys(nodes).map((id) => {
        const curNode = nodes[id];
        const parent = nodes[widgets[id]._parentId];
        // delete widgets[id]._parentId
        if (!parent) {
            virtualRoot.children.push(curNode);
            return;
        }
        curNode.parent = parent;
        parent.children.push(curNode);
    });
    // Sort children
    Object.keys(nodes).map((id) => {
        nodes[id].children.sort((a, b) => a._order - b._order);
    });
    virtualRoot.children.map(addForCount);
    // dfs, add forCount
    function addForCount(node) {
        if (node.parent) {
            node.forCount = node.parent.forCount;
            const { widgetType, getConfig } = node.parent.value;
            if (isRepeaterWidget({ widgetType, getConfig }, REPEATER.REPEATER_ITEM_NAME)) {
                node._ancestorId = node.parent.id;
            }
            if (node.parent?._ancestorId) {
                // Repeater 作用域内的所有子孙（排除里面的 Repeater 组件，它本身又产生深一层的作用域）继承父级的循环信息
                if (!node._ancestorId) {
                    node._ancestorId = node.parent._ancestorId;
                }
            }
        }
        if (dataBinds[node.id]?._waFor) {
            node.forCount += 1;
        }
        node.children.map(addForCount);
    }
    return virtualRoot;
}
function dfsTree(node, fn, parent, cache = {}) {
    node.value && fn(node, parent, cache);
    node.children.map((e) => dfsTree(e, fn, node.value ? node : null, cache));
}
// dispose autorun, widget can be the virtual root widget
export function disposeWidget(widget, noRecursive = false) {
    const disposers = widget._disposers;
    disposers.map((dispose) => dispose());
    disposers.splice(0, disposers.length);
    !noRecursive && widget.children.forEach((w) => disposeWidget(w));
}
export function createInitData(widgets, dataBinds, keyPrefix = '') {
    return Object.keys(widgets).reduce((result, id) => {
        if (!isWidgetInFor(id, widgets, dataBinds)) {
            result[keyPrefix + id] = resolveWidgetData(widgets[id], id);
        }
        else {
            result[keyPrefix + id] = [];
        }
        return result;
    }, {});
}
function isWidgetInFor(id, widgets, dataBinds) {
    let curNode = widgets[id];
    let nodeId = id;
    while (curNode) {
        if (dataBinds[nodeId]?._waFor) {
            return true;
        }
        nodeId = curNode._parentId;
        curNode = widgets[nodeId];
    }
}
function mountBuiltinWigetsAPI(widget, owner) {
    // #1 builtin APIs
    widget.findWidgets = function (filter, includeInvisibleDescendants) {
        let { children = [] } = this;
        if (!includeInvisibleDescendants) {
            // include visible widgets only by default
            children = children.filter((e) => e._waIf !== false);
        }
        const matched = [];
        children.forEach((w) => {
            if (filter(w)) {
                matched.push(w);
            }
            matched.push(...w.findWidgets(filter, includeInvisibleDescendants));
        });
        return matched;
    };
    widget.getWidgetsByType = function (type, includeInvisibleDescendants) {
        return this.findWidgets((w) => w.widgetType === type, includeInvisibleDescendants);
    };
    /**
     * Similar to selectOwnerComponent of WX MP: https://developers.weixin.qq.com/miniprogram/dev/reference/api/Component.html
     */
    widget.getOwnerWidget = function () {
        return owner?._getInstance?.()?.node;
    };
    // Will be overwritten by composited component
    widget.getDom = function (fields) {
        return new Promise((resolve, reject) => {
            const query = (owner || wx).createSelectorQuery();
            query
                .select(`#${this.id}`)
                .fields(fields, (res) => {
                resolve(res);
            })
                .exec();
        });
    };
    widget.on = function (type, listener) {
        this._eventListeners.on(type, listener);
    };
    widget.off = function (type, listener) {
        this._eventListeners.off(type, listener);
    };
    widget.getConfig = () => ({});
    const lowcode = compLowcodes[widget.widgetType];
    if (lowcode) {
        const { config } = lowcode;
        widget.getConfig = () => config;
    }
    widget._getInstanceRef = () => widget._instanceRef;
    /**
     * @deprecated
     */
    widget._methods = {};
    Object.defineProperty(widget, '_userWidget', {
        value: untracked(() => {
            return new UserWidget(widget);
        }),
    });
}
/**
 * 对外（用户）的 Widget
 */
class UserWidget {
    _widget = null;
    get description() {
        const { id } = this._widget;
        return `
  使用说明：
  1. sys 命名空间下为内置方法，可通过 $w.${id}.sys.<成员> 或 $w.${id}.<成员> 访问。
      访问 id 示例: $w.${id}.id 或 $w.${id}.sys.id
  2. custom 命名空间下为用户自定义对外暴露的成员，可通过 $w.${id}.custom.<成员> 或 $w.${id}.<成员> 访问。
      访问自定义方法 hello 示例: $w.${id}.hello() 或 $w.${id}.custom.hello()
  3. 通过 $w.${id}.<成员> 访问时，如果自定义成员与内置成员重名，则自定义成员覆盖内置成员。
  4. [注意]: 请不要直接访问 _widget，它里面的成员为内部实现，随时可能进行调整
  `;
    }
    constructor(widget) {
        this._widget = widget;
        return new Proxy(this, {
            get(target, prop) {
                if (prop in target) {
                    return target[prop];
                }
                /**
                 * @important
                 * 优先 custom
                 * 会出现一些 target 时序还不存在的情况
                 * 因此 custom[prop] 先添加进依赖
                 */
                if (target.custom?.[prop] !== undefined && prop in target.custom) {
                    return target.custom[prop];
                }
                // 再尝试内置的方法和属性
                if (prop in target.sys) {
                    return target.sys[prop];
                }
                // 兼容原来的 widget。最后直接代理到 widget 上，主要是访问组件的属性
                // return target._widget[prop];
                return undefined;
            },
            /**
             * userwidget 不可写
             */
            set() {
                return false;
            },
        });
    }
    // 内置属性和方法命名空间
    get sys() {
        const widget = this._widget;
        const [module, component] = widget.widgetType?.split?.(':') || [];
        return {
            /**
             * 内置属性
             */
            get id() {
                return widget.id;
            },
            get module() {
                return module;
            },
            get component() {
                return component;
            },
            get name() {
                return widget.widgetType;
            },
            get parent() {
                return widget.parent?._userWidget;
            },
            get children() {
                return widget.children?.map((item) => item._userWidget) || [];
            },
            /**
             * 内置方法
             */
            closest(filter) {
                let { parent } = this;
                if (!filter)
                    return parent;
                while (parent) {
                    const matched = filter(parent);
                    if (matched)
                        return parent;
                    parent = parent.parent;
                }
                return null;
            },
        };
    }
    get custom() {
        const widget = this._widget;
        const userCustomMember = untracked(() => {
            const instanceRef = widget._getInstanceRef?.();
            const instance = instanceRef?.current || {};
            const { methods = {}, ...restInstance } = instance;
            return new Proxy({
                ...widget?._methods,
                ...restInstance,
                ...methods,
            }, {
                get(_, prop) {
                    if (prop in methods) {
                        return methods[prop];
                    }
                    /**
                     * 此处要保持从 ref 开始访问
                     * 因为proxy 内部如果直接从 ref.current 开始访问，刚开始是可能遇到的是空值，并且空对象兜底
                     * 那么此处实际上监听的即为兜底的空对象，非 observer 对象
                     */
                    if (prop !== 'methods' && prop in (instanceRef.current || {})) {
                        return instance[prop];
                    }
                    return widget?._methods?.[prop];
                },
            });
        });
        return userCustomMember;
    }
}
export function generateWidgetAPIContext($w = {}, widget, forContext) {
    return new Proxy($w, {
        get(target, prop) {
            // debugger;
            /**
             * for context 变量优先
             */
            const { lists = [] } = forContext;
            for (const meta of lists) {
                const map = meta.alias || {};
                if (prop in map) {
                    return map[prop];
                }
            }
            // 尝试代理同级 widget
            if (widget) {
                let { parent } = widget;
                while (parent) {
                    if (parent._descendants?.[prop]) {
                        return parent._descendants[prop]._userWidget;
                    }
                    parent = parent.parent;
                }
            }
            // 尝试代理到全局的 $w
            return target[prop];
        },
    });
}
function isRepeaterWidget(w /* : { widgetType: string; getConfig: () => { componentType?: string } } */, repeaterComponentName /* :  string */ /* 'Repeater' | 'RepeaterItem' */) {
    const { componentType } = w?.getConfig?.() || {};
    if (componentType === repeaterComponentName || w?.widgetType === `${REPEATER.MODULE_NAME}:${repeaterComponentName}`) {
        return true;
    }
}
