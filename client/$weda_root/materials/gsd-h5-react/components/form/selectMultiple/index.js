import classNames from '../../../utils/classnames';
import { isNil } from '../../../utils/lodash';
import { callDataSourceApi } from '../../../utils/tcb';
import { arrayToMap } from '../../../utils/tool';
import lodashGet from 'lodash.get';

// 判断值为空，展示placeholder
export const isEmpty = (v) => {
  if (typeof v === 'string') {
    return v === '';
  } else if (Array.isArray(v)) {
    return v.length === 0;
  } else {
    return isNil(v);
  }
};

Component({
  options: {
    virtualHost: true,
  },
  properties: {
    className: {
      type: String,
      value: '',
    },
    style: {
      type: String,
      value: '',
    },
    label: {
      type: String,
      value: '标题',
    },
    labelVisible: {
      type: Boolean,
      value: true,
    },
    placeholder: {
      type: String,
      value: '请选择',
    },
    layout: {
      type: String,
      value: 'horizontal',
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    range: {
      type: Array,
      value: [],
    },
    defaultValue: {
      type: null,
    },
    requiredFlag: {
      type: Boolean,
      value: false,
    },
    format: {
      type: String,
      value: '',
    },
    dataSourceName: {
      type: String,
      value: '',
    },
    viewId: {
      type: String,
      value: '',
    },
    primaryField: {
      type: String,
      value: '',
    },
    allPickerShow: {
      type: Boolean,
      value: false,
    },
    version: {
      type: String,
      value: '',
    },
    readOnly: {
      type: Boolean,
      value: false,
    },
    ignoreCase: {
      type: Boolean,
      value: true,
    },
  },
  data: {
    cls: '',
    subCls: '',
    value: [],
    displayLabel: [],
    displayCls: 'weui-input__placeholder',
    records: [],
    loadStatus: 0,
    searchStatus: 0,
    option: [],
    searchOption: [],
    width: '100%',
    isEmpty: true,
  },
  lifetimes: {
    attached() {
      const { className, layout, disabled, range } = this.properties;
      const isFlex = layout !== 'vertical';
      const cls = classNames({
        'weda-ui': true,
        'weda-select': true,
        [className]: className,
      });
      const subCls = classNames({
        'weui-cell': true,
        'weui-cell_active': true,
        'weui-cell_form': true,
        'weui-flex__item': isFlex,
        'weui-cell_disabled': disabled,
      });

      let displayValue;

      // 默认
      this.setData({
        option: range,
        loadStatus: range.length > 0 ? 0 : -1,
      });
      this.setData({
        value: this.properties.defaultValue,
        cls,
        subCls,
        displayValue,
      });
    },
    ready() {
      // eslint-disable-next-line rulesdir/no-timer
      setTimeout(() => {
        const that = this;
        const query = wx.createSelectorQuery().in(this);
        query.select('#select-picker').boundingClientRect();
        query.exec(function (res) {
          if (res[0]?.width || res[0]?.width > 0) {
            const w = parseInt(res[0].width);
            const windowWidth = wx.getSystemInfoSync().windowWidth;
            // 35为向右偏移量margin-right，防止内容过长覆盖箭头，不减去偏移量导致表单对不齐
            that.setData({
              width: ((w - 35) * 750) / windowWidth,
            });
          }
        });
      }, 200);
    },
  },
  observers: {
    defaultValue: function () {
      this.setData({
        value: this.properties.defaultValue,
      });
    },
    'value,range': function () {
      const { range, format } = this.properties;
      if (format !== 'one-many' && format !== 'many-many') {
        this.setData({ option: range });
      }
      const { option, value } = this.data;
      const label = this.getLabels(value, option);
      const checkRange = this.getChecks(value, option);
      // 默认
      this.setData({
        option: checkRange,
        displayLabel: label,
      });
    },
    dataSourceName: function () {
      const { format, dataSourceName, primaryField } = this.properties;
      if (
        (format === 'one-many' || format === 'many-many') &&
        dataSourceName &&
        primaryField
      ) {
        this.setData({
          records: [],
          option: [],
          pageNo: 1,
        });
        this._fetchData(1);
      }
    },
    displayLabel: function (displayLabel) {
      this.setData({ isEmpty: isEmpty(displayLabel) });
    },
    option: function (options) {
      this.triggerEvent('changeOptions', { value: { options } });
    },
  },
  methods: {
    onClosePicker: function () {
      this.setData({
        allPickerShow: false,
      });
    },
    onOpenPicker: function () {
      if (this.data.disabled === true) return;
      this.setData({
        allPickerShow: true,
      });
    },
    // 最终选择的选项
    onSelectPicker: function (e) {
      if (this.data.disabled === true) return;
      if (
        e.detail.clear === 'true' ||
        e.currentTarget.dataset.clear === 'true'
      ) {
        let options = this.properties.option.map((item) => ({
          ...item,
          check: false,
        }));
        this.setData({
          displayLabel: null,
          value: null,
          allPickerShow: false,
          option: options,
        });
        this.onChange({ detail: { value: null } });
        return;
      }
      if (!e.detail.clear) {
        const value = e.detail.map((v) => v.value);
        this.setData({ value });
        this.onChange({ detail: { value } });
      }
    },
    onChange(e) {
      this.triggerEvent('change', e.detail);
    },
    // 获取数据列表：一对多，多对多
    _fetchData: async function (pageNo) {
      const { dataSourceName, primaryField } = this.properties;
      if (!dataSourceName) return;

      const { records } = this.data;
      let pageSize = 200;
      let data = await callDataSourceApi({
        dataSourceName: dataSourceName,
        methodName: 'wedaGetRecords',
        params: {
          pageNo: pageNo,
          pageSize: pageSize,
        },
      });
      const results = data?.records.map((item) => {
        return {
          ...item,
          label: item[primaryField],
          value: item._id,
        };
      });
      if (this.data.records.length === 0 && results?.length === 0) {
        // 当异常的时候，主要为了不引起records的observer变化变化设置默认值
        this.setData({
          loadStatus: -1,
        });
      } else {
        this.setData({
          records: records.concat(results || []),
          loadStatus: status,
        });
      }
      const finalRecords = records.concat(results || []);

      if (finalRecords && finalRecords.length > 0) {
        const { value } = this.data;
        const label = this.getLabels(value, finalRecords);
        const stringRange = this.getChecks(value, finalRecords);
        // 默认
        this.setData({
          option: stringRange,
          loadStatus: results.length > 0 ? 0 : -1,
          displayLabel: label,
        });
        return;
      }
      let status = 0;
      if (!results) {
        status = 2;
      } else if (results.length === 0) {
        status = 3;
      } else {
        status = results.length === 200 ? 1 : 0;
      }
    },
    _childFetchData: function (e) {
      const { pageNo } = e.detail;
      this._fetchData(pageNo);
    },
    getLabels: function (values, options) {
      let labels = values;
      if (Array.isArray(values) && Array.isArray(options)) {
        const rm = arrayToMap(options, 'value');
        labels = values.map((d) => {
          const obj = rm[d];
          return lodashGet(obj, 'text') ?? lodashGet(obj, 'label') ?? d;
        });
      }
      return labels;
    },
    getChecks: function (values, options) {
      const _values = Array.isArray(values) ? values : [];
      const _options = Array.isArray(options) ? options : [];
      const stringRange = _options.map((item) => {
        const obj = _values.find((el) => el === item.value);
        const check = !!obj;
        const value = String(item.value);
        return { ...item, value, check };
      });
      return stringRange;
    },
    onSearch(event) {
      this.triggerEvent('search', { value: event.detail.value });
    },
  },
});
