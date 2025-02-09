import { autorun } from 'mobx';
import { touchObj, throttle } from './util';
import { resolveWidgetData } from './widget';
import { getDatapatch } from './data-patch';
export default {
    // Attention, must be called at the end of attached or page load to make sure user init take effect
    initMergeRenderer(widgets, dataFactory = {}) {
        this.flushPendingData = throttle(this.flushPendingData.bind(this), 18);
        for (const id in widgets) {
            const props = widgets[id];
            dataFactory[id] = () => resolveWidgetData(props, id);
        }
        const disposers = [];
        for (const k in dataFactory) {
            const disposer = autorun((r) => {
                this.requestRender({ [k]: dataFactory[k]() });
            });
            disposers.push(disposer);
        }
        this.flushPendingData(); // Prepare data for first paint
        return disposers;
    },
    // setData merging
    pendingData: null,
    _settingData: false,
    _flushId: null,
    flushPendingData() {
        if (!this.pendingData || this._settingData) {
            return;
        }
        const patch = getDatapatch(this.data, this.pendingData);
        this.pendingData = null;
        const label = `setData ${this.is} ${this.id}(${Object.keys(patch).join(',')})`;
        if (Object.keys(patch).length < 1) {
            return;
        }
        this._settingData = true;
        const lastUpdateTime = Date.now();
        this._flushId = lastUpdateTime;
        /**
         * 兜底逻辑，当长时间 setData 没有返回时
         * 直接抛弃，扭转 pending 状态
         */
        setTimeout(() => {
            if (this._flushId === lastUpdateTime && this._settingData) {
                this._settingData = false;
                this.flushPendingData();
            }
        }, 100);
        this.setData(patch, () => {
            /* <% if(debug) {%>
            const elapsedTime = Date.now() - lastUpdateTime;
            if(elapsedTime > 16) {
              console.warn(label, elapsedTime)
            }else {
              console.info(label, elapsedTime)
            }<%} %> */
            this._settingData = false;
            this.flushPendingData();
        });
    },
    requestRender(data) {
        if (!this._pageActive) {
            // The callback of wx.chooseLocation occured when page is inactive
            console.warn(`Attention, you're updating widgets(${Object.keys(data).join(',')}) of inactive page(${this.is})`);
        }
        if (!this.pendingData) {
            this.pendingData = {};
        }
        wx.nextTick(this.flushPendingData);
        touchObj(data); // Touch all props to monitor data deeply, FIXME
        Object.assign(this.pendingData, data);
    },
};
