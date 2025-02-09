function checkFunc(listener) {
    if (!(listener instanceof Function)) {
        throw new Error(' The listener argument must be of type Function. ');
    }
}
export default class EventEmitter {
    listeners;
    constructor() {
        this.listeners = {};
    }
    on(eventName, listener) {
        checkFunc(listener);
        let listeners = this.listeners[eventName];
        if (!listeners) {
            this.listeners[eventName] = [listener];
        }
        else {
            listeners.push(listener);
        }
    }
    off(eventName, listener) {
        let listeners = this.listeners[eventName];
        if (listeners && listeners.length) {
            const index = listeners.indexOf(listener);
            index > -1 && listeners.splice(index, 1);
        }
    }
    emit(eventName, ...args) {
        let listeners = this.listeners[eventName] || [];
        listeners.forEach((fn) => {
            try {
                fn.call(this, ...args);
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    clear() {
        this.listeners = {};
    }
}
export class Event {
    type;
    detail;
    /**
     * 类别应当为 typeof UserWidget
     * 当前类别为 typeof $page.widgets.xxxx
     * 添加上报确定用量
     */
    currentTarget;
    target;
    /**
     * 内部实现
     * 外部不应该进行访问
     */
    _isCapturePhase;
    origin;
    originEvent;
    constructor({ type = '', detail = undefined, currentTarget = undefined, target = undefined, _isCapturePhase = false, origin, originEvent = undefined, }) {
        function proxyWrapper(target, key) {
            try {
                return new Proxy(target, {
                    get(target, p) {
                        if (p !== 'id') {
                            // reportEvent(`event.${key}.${String(p)}`);
                        }
                        return target[p];
                    },
                });
            }
            catch (e) {
                return target;
            }
        }
        this.type = type;
        this.detail = detail;
        this.currentTarget = proxyWrapper(currentTarget, 'currentTarget');
        this.target = proxyWrapper(target, 'target');
        this.origin = proxyWrapper(origin, 'origin');
        this.originEvent = originEvent;
        this._isCapturePhase = _isCapturePhase;
        return new Proxy(this, {
            get(target, prop) {
                switch (prop) {
                    case 'name': {
                        console.warn('[deprecated] event.name 将在未来版本放弃支持，请使用 event.type 替代');
                        return target.type;
                    }
                    case 'origin':
                    case 'target':
                    case 'currentTarget': {
                        return target[prop];
                        break;
                    }
                }
                return target[prop];
            },
        });
    }
}
