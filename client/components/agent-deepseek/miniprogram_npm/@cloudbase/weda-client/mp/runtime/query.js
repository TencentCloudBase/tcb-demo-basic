import { observable, autorun, toJS } from 'mobx';
import { createEventHandlers, getMpEventHandlerName, mergeDynamic2StaticData } from './util';
import { Event } from './event-emitter';
const QUERY_RESOURCE = {
    SQL: 'mysql-plugin',
    SQLSERVER: 'mssql-plugin',
    CLOUDCONNECTOR: 'apis-plugin',
};
const QUERY_PATH = {
    SQL: '/WeDa/Query/V1/RunPluginQuery',
    SQLSERVER: '/WeDa/Query/V1/RunPluginQuery',
    CLOUDCONNECTOR: '/WeDa/Connector/v1/RunApisQuery',
};
const KEYS = ['id', 'label', 'description', 'data', 'error', 'isFetching', 'trigger', 'reset'];
const GENERALFUNC = 'general-func';
export class Query {
    _schema = {};
    #schema;
    #context = {};
    #disposes = [];
    #dataBinds = {};
    #triggered = false;
    initPromise;
    #initedResolver = (value) => { };
    #paramsRef = observable({ current: null });
    #currentRequestKey = null;
    #observableValue = observable({ data: null, error: null, isFetching: false });
    #eventHandlerMap = {};
    #action = (data, additionalScope) => { };
    #runQueryMap = {
        sql: { QueryResource: QUERY_RESOURCE.SQL, QueryPath: QUERY_PATH.SQL },
        sqlserver: { QueryResource: QUERY_RESOURCE.SQLSERVER, QueryPath: QUERY_PATH.SQLSERVER },
        'cloud-connector': { QueryResource: QUERY_RESOURCE.CLOUDCONNECTOR, QueryPath: QUERY_PATH.CLOUDCONNECTOR },
    };
    #timer;
    constructor({ schema, context, options = {}, }) {
        const { looseError = false } = options;
        this.#schema = schema;
        this._schema = {
            trigger: schema.trigger,
        };
        this.#context = context;
        this.initPromise = new Promise((resolve) => {
            this.#initedResolver = resolve;
        });
        if (this.#schema?.trigger === 'auto') {
            this.#disposes.push(autorun((r) => {
                try {
                    const data = this.#resolveParams({}, { combainErrors: true });
                    if (this.#schema?.type === GENERALFUNC) {
                        // 因为要收集依赖，因此不能 debounce
                        this.#innerTrigger(data, {}, undefined);
                    }
                    else if (this.#triggered) {
                        this.#debounceTrigger(data);
                    }
                }
                catch (e) {
                    console.error(e);
                }
                finally {
                    this.#initedResolver(true);
                }
            }, { delay: 50 }));
        }
        else {
            this.#initedResolver(true);
        }
        this.#paramsRef.current = this.#schema.data;
        this.#dataBinds = Object.entries(this.#schema.dataBinds || {}).reduce((map, [prop, fn]) => {
            if (!/[\s+\-*/!&|%]*?SERVER\./.test(prop)) {
                map[prop] = fn;
            }
            return map;
        }, {});
        const { $w } = this.#context;
        const runQueryType = async function (data) {
            const requestData = {
                EnvId: $w.env.envId,
                Name: data.sqlTemplateId,
                Parameter: JSON.stringify(Object.entries(data.params || {}).reduce((list, [key, value]) => {
                    if (value !== undefined) {
                        let type = 'OBJECT';
                        const typeofValue = typeof value;
                        switch (typeofValue) {
                            case 'boolean': {
                                type = 'BOOLEAN';
                                break;
                            }
                            case 'number': {
                                type = 'NUMBER';
                                break;
                            }
                            case 'string': {
                                type = 'STRING';
                                break;
                            }
                            default: {
                                if (Array.isArray(value)) {
                                    type = 'ARRAY';
                                }
                                else {
                                    type = 'OBJECT';
                                }
                            }
                        }
                        list.push({
                            Key: key,
                            Type: type,
                            Value: type === 'STRING' ? value : JSON.stringify(value),
                        });
                    }
                    return list;
                }, []) || []),
            };
            const Data = await $w.cloud.callWedaApi({
                action: 'RunQuery',
                CallQuery: true,
                ...(this.#runQueryMap[this.#schema.type] || this.#runQueryMap['sql']),
                EnvId: requestData.EnvId,
                QueryName: requestData.Name,
                data: requestData,
            });
            const { ExecuteResultList = [], Total, Payload } = Data || {};
            let payload = Payload;
            try {
                if (Payload) {
                    payload = JSON.parse(Payload);
                }
            }
            catch (e) { }
            return {
                ...(this.#schema.type === 'cloud-connector'
                    ? payload
                    : {
                        records: ExecuteResultList.map((item) => JSON.parse(item)),
                        total: Total || ExecuteResultList.length,
                    }),
            };
        };
        this.#action = async function (data, additionalScope) {
            return this.#isRunQueryType
                ? runQueryType.call(this, data)
                : this.#schema.type === GENERALFUNC
                    ? context.$comp
                        ? this.#schema.handler.call(this, data, additionalScope, context.$comp, context.$w)
                        : this.#schema.handler.call(this, data, additionalScope)
                    : this.#schema.handler.call(this, data);
        };
        this.#eventHandlerMap = Object.entries(createEventHandlers(this.#schema.eventHandlers || {}, {
            looseError: looseError,
            isComposite: false,
            syncCall: false,
        })).reduce((map, [key, fn]) => {
            // map[key] = fn.bind(this);
            map[key] = fn;
            return map;
        }, {
            _getInstance: () => this.#context.$page || this.#context.$app,
        });
        return this;
    }
    get id() {
        return this.#schema?.id || '';
    }
    get label() {
        return this.#schema?.label || '';
    }
    get description() {
        return this.#schema?.description || '';
    }
    get data() {
        return this.#observableValue.data;
    }
    get error() {
        return this.#observableValue.error;
    }
    get isFetching() {
        return this.#observableValue.isFetching;
    }
    get #isRunQueryType() {
        return !!this.#runQueryMap[this.#schema.type];
    }
    async trigger(additionalScope, options = {}) {
        this.#triggered = true;
        return this.#innerTrigger(this.#resolveParams(additionalScope), additionalScope, options);
    }
    reset() {
        this.#observableValue.data = null;
        this.#observableValue.error = null;
        this.#observableValue.isFetching = false;
    }
    destroy() {
        this.#disposes.forEach((dispose) => dispose());
    }
    /**
     * 用于调试
     */
    _toSchema() {
        console.warn('调试使用，结构可能发生更改，请不要用于生产环境');
        return this.#schema;
    }
    async #innerTrigger(args, additionalScope, options = {}) {
        this.#currentRequestKey = Date.now();
        const key = this.#currentRequestKey;
        try {
            this.#observableValue.isFetching = true;
            const res = await this.#action(args?.[0], additionalScope);
            if (key === this.#currentRequestKey) {
                this.#observableValue.isFetching = false;
                this.#observableValue.data = res;
                this.#observableValue.error = null;
                this.#emit(`success`, res);
            }
            return res;
        }
        catch (e) {
            if (key === this.#currentRequestKey) {
                this.#observableValue.isFetching = false;
                this.#observableValue.data = null;
                this.#observableValue.error = e;
                this.#emit(`fail`, e);
            }
            throw e;
        }
    }
    #debounceTrigger(...args) {
        if (this.#timer) {
            clearTimeout(this.#timer);
        }
        this.#timer = setTimeout(() => {
            // @ts-ignore
            this.#innerTrigger(...args);
        }, 300);
    }
    #resolveParams(additionalScope = {}, options = {}) {
        /**
         * 这里万一其中某个字段计算失败
         * 好像会阻塞其他字段的计算
         * 从而导致 autorun 没有添加依赖
         */
        let { params = [] } = mergeDynamic2StaticData(toJS(this.#paramsRef.current), this.#dataBinds, {
            $w: this.#context.$w,
            paramsContext: additionalScope,
        }, options?.combainErrors) || {};
        return params;
    }
    async #emit(eventName, data) {
        return this.#eventHandlerMap[getMpEventHandlerName(this.id, eventName)]?.(new Event({
            type: eventName,
            detail: data,
            target: undefined,
            currentTarget: undefined,
        }));
    }
    toJSON() {
        return KEYS.reduce((obj, key) => {
            obj[key] = this[key];
            return obj;
        }, {});
    }
}
export function generateDatasetQuery(schema, context, options) {
    const result = {};
    for (const key in schema) {
        result[key] = new Query({ schema: schema[key], context, options });
    }
    return result;
}
