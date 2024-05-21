import { commonCompBehavior } from '../../utils/common-behavior';
import equal from '../../utils/deepEqual';

const SELECTOR = 'weda-data-view';

Component({
  options: {
    virtualHost: true,
  },
  behaviors: [commonCompBehavior],
  properties: {
    className: {
      type: String,
      value: '',
    },
    style: {
      type: String,
      value: '',
    },
    datasource: {
      type: Object,
      value: {},
    },
    where: {
      type: Array,
      value: [],
    },
    queryCondition: {
      type: Array,
      value: [],
    },
    bindConnectMetadata: {
      type: Object,
      value: {},
    },
    connectorMethod: {
      type: Object,
      value: {},
    },
    connectorParams: {
      type: Object,
      value: {},
    },
    dataSourceType: {
      type: String,
      value: '',
    },
    dataSourceData: {
      type: Object,
      value: {},
    },
  },
  data: {
    innerBeforeDataChange: function (values) {
      return values?.[0];
    },
    _dataNullRef: { current: {} }, // 将最近的对象属性设置null后存储下来
    _oldData: undefined,
  },
  methods: {
    handleEvent: function (params) {
      const { type, detail } = params || {};
      if (type === 'onDataChange') {
        this._setDataForClear(detail?.data);
        this.triggerEvent('onDataChange', {
          ...detail,
          data: detail?.data || this.data._dataNullRef.current,
        });
      } else {
        type && this.triggerEvent(type, detail);
      }
    },
    _setDataForClear: function (data) {
      if (!equal(data, this.data._oldData)) {
        this.setData({ _oldData: data });
      }
      if (!data) return;
      let dataProcessed = {};
      try {
        dataProcessed = Object.keys(data).reduce((pre, cur) => {
          pre[cur] = null;
          return pre;
        }, {});
        dataProcessed = { ...this.data._dataNullRef.current, ...dataProcessed };
      } catch (e) {}
      this.data._dataNullRef.current = dataProcessed;
    },
    updateWidgetAPI() {
      const listViewRef = this.selectComponent(`.${SELECTOR}`);
      const refresh = () => listViewRef?.methodRefresh?.();
      const deleteOne = (params) => listViewRef?.methodDeleteOne?.(params);
      this.setReadonlyAttributes?.({
        record: this.data._oldData,
        refresh,
        deleteOne,
      });
    },
  },
  observers: {
    _oldData: function () {
      this.updateWidgetAPI();
    },
  },
  lifetimes: {
    attached: function () {
      this.updateWidgetAPI();
    },
  },
});
