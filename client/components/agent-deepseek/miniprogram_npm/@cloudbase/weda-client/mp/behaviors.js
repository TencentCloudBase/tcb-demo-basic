const ID_SEPARATOR = '-';
function getWidget(widgets, id) {
    return getDeep(widgets, id, ID_SEPARATOR);
}
function getDeep(target, key, keySeparator = '.') {
    if (key === null) {
        return target;
    }
    const keys = String(key).split(keySeparator);
    while (keys.length > 0 && target !== null && target !== undefined) {
        target = target[keys.shift()];
    }
    return keys.length === 0 ? target : undefined;
}
export const commonCompBehavior = Behavior({
    properties: {
        id: {
            type: String,
        },
    },
    lifetimes: {
        created() {
            this.$node = null;
            this.$widget = null;
            this.$instanceRef = { current: null };
        },
        attached() {
            this._getWidgetInstance();
        },
        ready() {
            this._getWidgetInstance();
        },
        detached() {
            if (this.$node?._instanceRef) {
                this.$node._instanceRef.current = null;
            }
            this.$instanceRef = null;
        },
    },
    pageLifetimes: {
        show() {
            this._getWidgetInstance();
        },
        hide() {
            this._getWidgetInstance();
        },
        resize(size) {
            this._getWidgetInstance();
        },
    },
    methods: {
        /**
         * 获取当前组件的 widget 实例
         */
        _getWidgetInstance() {
            if (!this.$node) {
                if (!this.selectOwnerComponent) {
                    console.error('Fatal error: not support selectOwnerComponent API, need 2.8.2');
                    return null;
                }
                const owner = this.selectOwnerComponent();
                if (!owner) {
                    return null;
                }
                const widgets = owner?._getInstance?.()?.widgets;
                this.$node = getWidget(widgets, this.id);
                this.$widget = this.$node?._userWidget;
                if (this.$node) {
                    if (this.$node._instanceRef && this.$node._instanceRef.current !== this.$instanceRef?.current) {
                        this.$node._instanceRef.current = this.$instanceRef?.current;
                    }
                    this.$instanceRef = this.$node._instanceRef;
                }
            }
            return this.$node;
        },
        mountReadonlyAttributes(callback) {
            if (!this.$instanceRef) {
                return;
            }
            this.$instanceRef.current = callback();
        },
        setReadonlyAttributes(obj = {}) {
            if (!this.$instanceRef) {
                return;
            }
            if (!this.$instanceRef.current) {
                this.$instanceRef.current = {};
            }
            // eslint-disable-next-line no-restricted-syntax
            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    if (/[.[]/.test(key)) {
                        console.warn('不支持设置path:', key);
                    }
                    else {
                        this.$instanceRef.current[key] = obj[key];
                    }
                }
            }
        },
    },
});
