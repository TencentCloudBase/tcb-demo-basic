import { set as lodashSet, get as lodashGet } from '../vender';
import { formatDate } from './date';
import * as Time from './time/index';
import * as Calc from './calculation/index';
import * as Text from './text/index';
import * as Logic from './logic/index';
import { ACTIONS_KEY, ROUTER_KEY, LINK_PROTOCOL } from './constants';
import { observable } from 'mobx';
import { getGeneralOptions } from './models/index';
const FunctionAPI = {
    ...Time,
    ...Calc,
    ...Text,
    ...Logic,
};
/*
根据 object对象的path路径获取值。 如果解析 value 是 undefined 会以 defaultValue 取代。
*/
export function getter(context, path, defaultValue = undefined) {
    return lodashGet(context, path, defaultValue);
}
/*
设置 object对象中对应 path 属性路径上的值，如果path不存在，则创建。 缺少的索引属性会创建为数组，而缺少的属性会创建为对象。 使用_.setWith 定制path创建
*/
export function setter(context, path, value = undefined) {
    return lodashSet(context, path, value);
}
/**
 * 判断是否是移动端
 * @returns
 */
export function isMobile() {
    // if (window.matchMedia) {
    //   return window.matchMedia('(max-width: 768px)')?.matches;
    // }
    let check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(a.substr(0, 4)))
            check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}
/**
 * 处理url链接，加入params参数
 * @tcwd/weapps-sdk 内存在实现，修改时两份实现对齐修改
 * @param url
 * @param params
 * @returns
 */
export function urlJoinParams(url, params) {
    if (!url || !params || typeof params !== 'object') {
        return url;
    }
    const separate = url.indexOf('?') === -1 ? '?' : '&';
    const tempStr = Object.keys(params)
        .map((key) => {
        let value = params[key];
        if (typeof value === 'object') {
            value = JSON.stringify(value);
        }
        if (value != undefined) {
            return `${key}=${encodeURIComponent(value)}`;
        }
        return '';
    })
        .filter((value) => value)
        .join('&');
    return `${url}${separate}${tempStr}`;
}
export function normalizePageId(pageId) {
    return pageId ? pageId.replace(/^(\.)?\//, '') : pageId;
}
export function normalizePackageName(packageName) {
    if (!packageName) {
        return packageName;
    }
    const matched = packageName.match(/packages\/(.*)?/);
    if (matched) {
        return matched[1];
    }
    return packageName;
}
/**
 * 创建应用 utils 实例
 */
export function createAppUtils(ctx, initData) {
    let loading = {};
    // 留着占位 以后更新到这里
    if (!ctx.__internal__?.enumOptions) {
        lodashSet(ctx, '__internal__.enumOptions', observable({}));
    }
    function getEnumOptions(optionName) {
        if (ctx.__internal__.enumOptions[optionName]) {
            return ctx.__internal__.enumOptions[optionName];
        }
        if (!loading[optionName]) {
            loading[optionName] = true;
            getGeneralOptions(optionName).then((data) => {
                ctx.__internal__.enumOptions[optionName] = data?.Items[0]?.Config;
            });
        }
        return '';
    }
    return {
        ...FunctionAPI,
        formatDate,
        get: getter,
        set: setter,
        formatEnum(path, optionname) {
            // 判断是单选还是多选
            let isSingle = Array.isArray(path);
            // 获取到options
            let parseOptions = getEnumOptions(optionname);
            if (parseOptions === '') {
                return !isSingle ? path : path.join(',');
            }
            let multiTmp = [];
            let value = !isSingle
                ? JSON.parse(parseOptions)?.find((item) => item?.key === path)?.value
                : JSON.parse(parseOptions)
                    ?.filter((item) => path.some((pathValue) => item?.key === pathValue))
                    .map((item) => multiTmp.push(item?.value));
            // 对多选或者单选有不同处理
            return !isSingle ? value : multiTmp?.join(',');
        },
        async getWXContext() {
            return {};
        },
        getCurrentPage() {
            return ctx.__internal__.activePage || initData?.currentPage;
        },
    };
}
/**
 * 创建应用 $w 代理
 */
export function createAPINamespace(app, env, options) {
    const { device = {
        viewport: {
            width: 0,
            height: 0,
        },
        networkType: '',
    }, } = options;
    const observableDevice = observable(device);
    const observableWedaContext = observable({
        isEditorMode: false,
        editorPlatforms: [],
        platforms: options?.platforms || [],
    });
    return new Proxy({
        get wedaContext() {
            return observableWedaContext;
        },
        get app() {
            return app;
        },
        get page() {
            return app?.__internal__?.activePage;
        },
        get auth() {
            return app.auth;
        },
        get cloud() {
            return app.cloud;
        },
        get ai() {
            return app.ai;
        },
        get device() {
            return observableDevice;
        },
        get env() {
            return env;
        },
        get utils() {
            const utils = {};
            /**
             * 暴露 resolveStaticResourceUrl
             */
            Object.defineProperty(utils, 'resolveStaticResourceUrl', {
                get() {
                    return app?.__internal__?.resolveStaticResourceUrl;
                },
            });
            Object.defineProperty(utils, 'getHomePage', {
                get() {
                    return function () {
                        const { pages = [] } = app.__internal__?.getConfig?.() || {};
                        return {
                            id: pages?.[0]?.id,
                        };
                    };
                },
            });
            [...Object.values(ACTIONS_KEY), ...Object.values(ROUTER_KEY)]
                .filter((key) => key !== ACTIONS_KEY.callProcess && key !== ACTIONS_KEY.callWorkflow)
                .forEach((key) => {
                Object.defineProperty(utils, key, {
                    get() {
                        return app[key];
                    },
                });
            });
            return utils;
        },
    }, {
        get(_, prop) {
            /**
             * 用户定义的属性优先
             */
            if (app.dataset?.query?.[prop]) {
                return app.dataset?.query?.[prop];
            }
            switch (prop) {
                case 'wedaContext':
                case 'app':
                case 'page':
                case 'auth':
                case 'cloud':
                case 'ai':
                case 'device':
                case 'env':
                case 'utils': {
                    return _[prop];
                }
                default: {
                    return FunctionAPI[prop];
                }
            }
        },
    });
}
/**
 * 将一个对象中每个key的首字母从大写变小写
 */
export const objectKeyFirstUpperToLower = (oldObj) => {
    const newObj = {};
    if (oldObj && JSON.stringify(oldObj) !== '{}' && oldObj instanceof Object) {
        Object.keys(oldObj).forEach((item) => {
            newObj[lowerFirst(item)] = oldObj[item];
        });
    }
    return newObj;
};
/**
 * 首字母转为小写
 * @param str
 * @returns
 */
export const lowerFirst = (str) => {
    return str.length ? str.substring(0, 1).toLowerCase() + str.substring(1) : '';
};
/**
 * 将一个对象中每个key的首字母从小写变大写
 */
export const objectKeyFirstLowerToUpper = (oldObj) => {
    const newObj = {};
    if (oldObj && JSON.stringify(oldObj) !== '{}' && oldObj instanceof Object) {
        Object.keys(oldObj).forEach((item) => {
            newObj[upperFirst(item)] = oldObj[item];
        });
    }
    return newObj;
};
/**
 * 首字母转为大写
 * @param str
 * @returns
 */
export const upperFirst = (str) => {
    return str.length ? str.substring(0, 1).toUpperCase() + str.substring(1) : '';
};
/**
 * 浅比较两个数组是否相等
 */
export function isSameArray(arr1, arr2) {
    if (arr1.length !== arr2.length)
        return false;
    return arr1.every((val, idx) => val === arr2[idx]);
}
const tasks = [];
/**
 * 同一个函数、同样的参数只执行一次
 */
export function execOnce(fn, ...args) {
    const task = tasks.find((task) => task[0] === fn && isSameArray(task[1], args));
    if (task)
        return task[2];
    const p = fn(...args);
    tasks.push([fn, args, p]);
    return p;
}
/**
 * 根据白名单过滤json
 */
export function filterMap(whiteList, json) {
    const newJson = {};
    Object.keys(json).forEach((key) => {
        if (whiteList.indexOf(key) > -1) {
            newJson[key] = json[key];
        }
    });
    return newJson;
}
/**
 *
 *
const sdk = SDK.getInstance(config);
new Function(){

    (function (app) {

        app.utils.Max()

    })(app)

    (function ({ Age, ABS, Timestamp , Max , state }) {

        Max(state.num1,state.num2)

    })(app.utils,$page.dataset)
}


 */
export class SDK {
    config;
    constructor(config) {
        this.config = config;
    }
    getAllMethods() {
        return {
            ...Time,
            ...Calc,
            ...Text,
            ...Logic,
            ...this.config,
        };
    }
    static _instance;
    static getInstance(config) {
        if (!SDK._instance) {
            SDK._instance = new SDK(config);
        }
        return SDK._instance;
    }
}
/**
 * 获取枚举值
 * @param param0
 * @returns
 */
export function getEnumValue({ enumOptions, optionSetName, key, } = {}, app) {
    try {
        if (enumOptions === undefined && app?.utils?.formatEnum) {
            return app.utils.formatEnum(key, optionSetName, app);
        }
        let options = enumOptions;
        // 如果非数组，则认为需要解析选项集接口的请求数据
        if (!Array.isArray(enumOptions)) {
            const optionsObj = {};
            const optionsObjRes = {};
            // 拿到选项集标识对应的选项列表
            enumOptions?.response?.data?.items?.forEach((v) => {
                optionsObj[v.name] = JSON.parse(v.config);
                optionsObjRes[v.name] = optionsObj[v.name].map((v) => ({ label: v.value, value: v.key }));
            });
            // 如果用户传入选项集标识，则找到对应的选项列表，否则返回所有选项集对象
            if (optionSetName === undefined) {
                return optionsObjRes;
            }
            else {
                options = optionsObj[optionSetName] || [];
            }
        }
        // 如果没有传入选项key值，则返回选项列表
        if (key === undefined)
            return options.map((v) => ({ label: v.value, value: v.key }));
        // 否则返回对应选项key的值
        const option = options.find((v) => v.key === key);
        return option?.value === undefined ? option?.key : option.value;
    }
    catch (error) {
        return '';
    }
}
// 解析url链接内容
const URL_REG = /^(https?|weda-page|plugin|miniprogram):\/\/([0-9.\-A-Za-z]+)?(?::(\d+))?(?:([^?#]*))?(\?[^#]*)?(#.*)?/;
export function parseURL(_url) {
    let matched = _url.match(URL_REG);
    if (!matched) {
        throw new Error('invalid request url');
    }
    const [_, protocol, origin, port, pathname, query] = matched;
    return {
        pathname: /https?:\/\//.test(protocol) ? pathname : `/${origin}${pathname}`,
        search: query,
        protocol: protocol ? `${protocol}:` : '',
    };
}
export const normalizeRouterParams = (url) => {
    const urlObj = parseURL(url);
    const protocol = urlObj.protocol?.replace(/\:/, '');
    const pathname = urlObj.pathname?.replace(/^\/\/?/, '') || '';
    const query = urlObj.search ? urlObj.search.replace(/^\?/, '') : '';
    let params = {};
    if (query) {
        params = query.split('&').reduce((acc, param) => {
            const [key, value] = param.split('=');
            acc[key] = value;
            return acc;
        }, {});
    }
    const routerParams = {
        params,
        url,
        protocol: LINK_PROTOCOL[protocol],
    };
    const reg = /(?:([^\/]*))(?:\/([^?#]*))/;
    const matched = pathname.match(reg);
    switch (protocol) {
        case 'weda-page':
            if (matched) {
                const [_, packageName, pageId] = matched;
                routerParams.packageName = packageName === 'main' ? '' : packageName;
                routerParams.pageId = pageId;
            }
            break;
        case 'miniprogram':
            if (matched) {
                const [_, appId, path] = matched;
                routerParams.appId = appId;
                routerParams.path = path;
            }
            break;
        case 'plugin':
            routerParams.path = pathname;
            break;
        default:
            break;
    }
    return routerParams;
};
/**
 * 校验数字，尝试将字符串转成数字。
 * 如果转换失败，返回 null，其他情况返回非 NaN 的数字。
 */
export function normalizeNumber(num) {
    if (typeof num === 'number') {
        if (isNaN(num)) {
            return null;
        }
        else {
            return num;
        }
    }
    if (typeof num === 'string') {
        const res = parseFloat(num);
        if (isNaN(res)) {
            return null;
        }
        else {
            return res;
        }
    }
    return null;
}
export function generateMethodsFrom$w($w) {
    const getVarValue = (varPath) => {
        if (typeof varPath !== 'string') {
            return undefined;
        }
        const [scope, varName] = varPath.split('.');
        if (scope === '$page') {
            return $w.page.dataset.state[varName];
        }
        if (scope === '$global') {
            return $w.app.dataset.state[varName];
        }
        if (scope === '$comp') {
            return $w.$comp.dataset.state[varName];
        }
    };
    const setVarValue = (varPath, value) => {
        const [scope, varName] = varPath.split('.');
        if (scope === '$page') {
            return $w.page.setState({ [varName]: value });
        }
        if (scope === '$global') {
            return $w.app.setState({ [varName]: value });
        }
        if (scope === '$comp') {
            return $w.$comp.setState({ [varName]: value });
        }
    };
    const callEventFlow = (eventFlowId, data) => {
        const eventFlow = $w[eventFlowId];
        eventFlow?.trigger(data);
    };
    const noop = () => { };
    return {
        getVarValue: $w ? getVarValue : noop,
        setVarValue: $w ? setVarValue : noop,
        callEventFlow: $w ? callEventFlow : noop,
    };
}
export class ControlledPromise {
    resolve;
    reject;
    constructor() {
        const handler = {
            resolve: (res) => { },
            reject: (e) => { },
        };
        let promise = new Promise((resolve, reject) => {
            handler.resolve = resolve;
            handler.reject = reject;
        });
        const res = Promise.resolve().then(() => {
            return promise;
        });
        res.resolve = (res) => handler.resolve(res);
        res.reject = (e) => handler.reject(e);
        return res;
    }
}
export const APP_LAUNCH_OPTIONS_PROMISE = new ControlledPromise();
