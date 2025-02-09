import classNames from '../../../utils/classnames';
import dayjs from '../../../utils/dayjs.min.js';
import { getRegionTree, buildDisplayValue, provinces, cities, regions, getAreaKey } from './region/index';
import destr from '../../../utils/destr';
import deepEqual from '../../../utils/deepEqual';
import { callDataSourceApi, callWedaApi } from '../../../utils/tcb';
import { getWhereList } from '../../../utils/platform';
import { isFormatNeedFetch, isSingleForeignFormat } from './formats-util';

const STATUS_CLOSED = -1;
const STATUS_LOADING = 1;
const STATUS_FAILED = 2;
const STATUS_EMPTY = 3;

Component({
  options: {
    virtualHost: true,
    pureDataPattern: /^__/,
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
    mode: {
      type: String,
      value: 'selector',
    },
    dateMode: {
      type: String,
      value: 'day',
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    regionType: {
      type: String,
      value: '',
    },
    range: {
      type: Array,
      value: [],
    },
    defaultValue: {
      type: null,
    },
    startTime: {
      type: String,
      optionalTypes: [Number],
    },
    endTime: {
      type: String,
      optionalTypes: [Number],
    },
    defaultTime: {
      type: String,
      optionalTypes: [Number],
    },
    startDate: {
      type: String,
      optionalTypes: [Number],
    },
    endDate: {
      type: String,
      optionalTypes: [Number],
    },
    defaultDate: {
      type: String,
      optionalTypes: [Number],
    },
    defaultRegion: {
      type: Array,
    },
    defaultMutiRegion: {
      type: String,
      value: '',
    },
    separator: {
      type: String,
      value: ',',
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
    enumName: {
      type: String,
      value: '',
    },
    where: {
      type: Array,
      value: [],
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
    staticSearchable: {
      type: Boolean,
      value: true,
    },
  },
  data: {
    cls: '',
    subCls: '',
    selectRange: [],
    start: '',
    end: '',
    value: '',
    displayValue: '',
    //省市级联动数据
    multiArray: [[{ value: '地区数据加载中，请关闭弹窗后重试' }]],
    defaultArea: '北京市,北京市,东城区',
    multiIndex: [0, 0, 0], // 默认的下标
    isSearch: false,
    records: [],
    searchRecords: [],
    loadStatus: 0,
    searchStatus: 0,
    option: [],
    searchOption: [],
    whereEffected: [],
    chooseIndexValue: '',
    chooseIndexLable: '',
    isTurnPages: false,
    pageNo: 1,
    width: '100%',
    prevWhere: null,
  },
  lifetimes: {
    attached() {
      const {
        className,
        layout,
        disabled,
        mode,
        range,
        startTime,
        endTime,
        startDate,
        endDate,
        dateMode,
        defaultDate,
        format,
      } = this.properties;
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

      let selectRange, start, end, displayValue;

      switch (mode) {
        case 'selector': {
          if (isFormatNeedFetch(format)) {
            selectRange = this.data.option.map((item) => item.label);
          } else {
            selectRange = range.map((item) => item.label);
          }
          if (isSingleForeignFormat(format)) {
            this.setData({
              isTurnPages: true,
            });
          } else if (format === 'x-enum') {
            this.setData({
              isTurnPages: false,
            });
          } else {
            // 默认
            this.setData({
              option: range,
              loadStatus: range.length > 0 ? 0 : STATUS_CLOSED,
            });
          }
          break;
        }
        case 'time': {
          start = startTime ? this.converTime2Dayjs(startTime).format('HH:mm') : undefined;
          end = endTime ? this.converTime2Dayjs(endTime).format('HH:mm') : undefined;
          break;
        }
        case 'date': {
          start = this._coverNumber2Date(startDate, dateMode);
          end = this._coverNumber2Date(endDate, dateMode);
          displayValue = this._coverNumber2Date(defaultDate, dateMode);
          break;
        }
        default: {
          break;
        }
      }
      this.setData({
        cls,
        subCls,
        selectRange,
        start,
        end,
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
    'defaultValue, defaultTime, defaultRegion,defaultMutiRegion,defaultDate,option,regionType': function (
      defaultValue,
      defaultTime,
      defaultRegion,
      defaultMutiRegion,
      defaultDate,
      option,
      regionType,
    ) {
      const { range, mode, separator, placeholder, dateMode, format } = this.properties;

      if (
        deepEqual(
          {
            defaultValue,
            defaultTime,
            defaultRegion,
            defaultMutiRegion,
            defaultDate,
            option,
            range,
            mode,
            separator,
            placeholder,
            dateMode,
            format,
            regionType,
          },
          this.data.__prev,
        )
      ) {
        return;
      }

      let value, displayValue;
      switch (mode) {
        case 'selector': {
          // TODO: == 故意的
          if (!isFormatNeedFetch(format)) {
            const index = range.findIndex((item) => item.value == defaultValue);
            // 小程序picker组件，value值表示选择了 range 中的第几个（下标从 0 开始），类型为number
            value = index < 0 ? 0 : index;
            displayValue = index < 0 ? defaultValue : range[index].label;
            // 更新选中值
            this.setData({
              chooseIndexValue: index < 0 ? defaultValue : range[index].value,
              chooseIndexLable: displayValue,
            });
          } else {
            const { chooseIndexValue } = this.data;
            const currentValue = defaultValue;
            const index = option.findIndex((item) => item.value == currentValue);
            if (
              !chooseIndexValue &&
              this.data.option.length > 0 &&
              index === -1 &&
              defaultValue &&
              defaultValue.length > 0
            ) {
              // 没查找到，接口查找
              this._fetchData(
                [
                  {
                    _id: {
                      $eq: defaultValue,
                    },
                  },
                ],
                1,
                true,
              );
              // 再次判断
              if (this.data.chooseIndexValue && this.data.chooseIndexValue.length > 0) {
                // 找到了
                displayValue = this.data.chooseIndexLable;
              }
            } else {
              value = index < 0 ? 0 : index;
              displayValue = index < 0 ? currentValue : option[index].label;
            }
            // 更新value
            this.setData({
              chooseIndexValue: currentValue,
              chooseIndexLable: displayValue,
            });
          }
          break;
        }
        case 'date': {
          value = this._coverNumber2Date(defaultDate, dateMode);
          displayValue = this._coverNumber2Date(defaultDate, dateMode, true);
          break;
        }
        case 'time': {
          value = defaultTime == null || defaultTime === '' ? '' : this.converTime(`${defaultTime}`);
          displayValue = value;
          break;
        }
        case 'region': {
          value = defaultRegion;
          displayValue = defaultRegion.join(separator);
          break;
        }
        case 'mutiRegion': {
          displayValue = defaultMutiRegion || '';
          this.getProvince(displayValue);
          break;
        }
        default: {
          break;
        }
      }
      const data = { displayValue };
      if (mode !== 'mutiRegion') {
        data.value = value;
      }
      this.setData(data);
      this.setData({
        __prev: {
          defaultValue,
          defaultTime,
          defaultRegion,
          defaultMutiRegion,
          defaultDate,
          option,
          range,
          mode,
          separator,
          placeholder,
          dateMode,
          format,
          regionType,
        },
      });
    },
    range: function (range) {
      // 防止range在不改变的情况下重新对option赋值，导致触发option的observer改变选中值
      if (JSON.stringify(this.data.oldRange) === JSON.stringify(range)) return;
      this.data.oldRange = range;
      const { mode, format } = this.properties;
      let selectRange = '';
      switch (mode) {
        case 'selector': {
          if (!isFormatNeedFetch(format)) {
            selectRange = range.map((item) => item.label);
            const stringRange = range.map((item) => ({
              ...item,
              value: String(item.value),
            }));
            // 默认
            this.setData({
              option: stringRange,
              loadStatus: range.length > 0 ? 0 : STATUS_CLOSED,
            });
          }
          break;
        }
        default: {
          break;
        }
      }
      if (selectRange != '') {
        this.setData({
          selectRange,
        });
      }
    },
    enumName: function (enumName) {
      if (this.properties.format === 'x-enum' && enumName) {
        this._fetchEnumData();
      }
    },
    where: function (where) {
      if (deepEqual(where, this.data.prevWhere)) {
        return;
      }
      const whereEffected = [].concat(getWhereList(where));
      this.setData({ whereEffected });
      const { format, dataSourceName, viewId } = this.properties;
      if (
        isSingleForeignFormat(format) &&
        dataSourceName &&
        viewId &&
        !this.data.isSearch // 防止多次执行对搜索影响
      ) {
        this.setData({
          records: [],
          option: [],
          pageNo: 1,
        });
        this._fetchData(whereEffected, 1);
      }
      this.setData({
        prevWhere: where,
      });
    },
    records: function (records) {
      const { primaryField } = this.properties;
      if (records && records.length !== 0 && primaryField) {
        const option = records.map((item) => {
          return {
            label: item[primaryField] || item._id,
            value: item._id,
            name: item[primaryField] || item._id,
          };
        });
        this.setData({ selectRange: option.map((item) => item.label), option });
      } else {
        this.setData({
          selectRange: [].map((item) => item.label),
          option: [],
        });
      }
    },
    searchRecords: function (searchRecords) {
      const { primaryField } = this.properties;
      if (searchRecords && searchRecords.length !== 0 && primaryField) {
        const option = searchRecords.map((item) => {
          return {
            label: item[primaryField] || item._id,
            value: item._id,
            name: item[primaryField] || item._id,
          };
        });
        this.setData({ searchOption: option });
      }
    },
    format: function (format) {
      this.setData({
        formatNeedFetch: isFormatNeedFetch(format),
      });
    },
    option: function (options) {
      this.triggerEvent('changeOptions', { value: { options } });
    },
    'format,defaultValue': function (format, defaultValue) {
      if (isFormatNeedFetch(format)) {
        this._fetchData(defaultValue ? [{ _id: { $eq: defaultValue } }] : [], 1, false);
      }
    },
  },
  methods: {
    // 最终选择的日期时间
    onAllTimePicker: function (e) {
      const show = e.currentTarget.dataset.show === undefined ? e.detail.show : e.currentTarget.dataset.show;
      if (!show && e?.detail?.confirm) this.triggerEvent('change', { value: e.detail.dateTamp });
      this.setData({
        allPickerShow: typeof show === 'boolean' ? show : JSON.parse(show),
        value: e.detail.data,
      });
    },
    // 最终选择的选项
    onSelectPicker: function (e) {
      if (this.data.disabled === true) {
        return;
      }
      if (e.detail?.label) {
        this.setData({
          chooseIndexLable: e.detail.label,
          value: e.detail.label,
        });
      }
      if (e.detail?.value) {
        this.setData({
          chooseIndexValue: e.detail.value,
        });
      }
      if (e.detail?.clear === 'true') {
        this.setData({
          chooseIndexValue: null,
          chooseIndexLable: null,
          value: null,
          displayValue: '',
        });
      }
      const { displayValue, chooseIndexLable, allPickerShow } = this.data;
      this.setData({
        allPickerShow: !allPickerShow,
        displayValue: chooseIndexLable === '' ? displayValue : chooseIndexLable,
      });
      const { isSearch, option, searchOption, chooseIndexValue } = this.data;
      if (chooseIndexValue && chooseIndexLable !== displayValue) {
        const index = (isSearch ? searchOption : option)?.findIndex((item) => item.value === chooseIndexValue);
        this.onChange({ detail: { value: index < 0 ? 0 : index } });
      } else if (e.detail?.clear === 'true') {
        this.onChange({ detail: { value: null } });
      }
      if (searchOption.length <= 0 && (this.data.dataSourceName?.length > 0 || isFormatNeedFetch(this.data.format))) {
        // this.setData({ isSearch: true });
        const param = [
          {
            [this.properties.primaryField]: {
              $search: '',
            },
          },
        ];
        this._fetchData(param, 1);
      }
    },
    // 获取数据列表：关联关系和主子明细
    _fetchData: async function (param, pageNo, isUpdate = false) {
      const { dataSourceName, viewId, records, searchRecords } = this.properties;

      if (!dataSourceName) return;
      let pageSize = 50;
      let data = await callDataSourceApi({
        dataSourceName: dataSourceName,
        viewId: viewId,
        methodName: 'wedaGetRecords',
        params: {
          where: [{ $and: [...this.data.whereEffected, ...param] }],
          pageNo: pageNo,
          pageSize: pageSize,
        },
      });
      const results = data?.records;
      console.log(results, param, 'Records');
      if (isUpdate && results && results.length > 0) {
        this.setData({
          chooseIndexLable: results[0][this.properties.primaryField] || results[0]._id,
          chooseIndexValue: results[0]._id,
          displayValue: results[0][this.properties.primaryField] || results[0]._id,
        });
        return;
      }
      let status = 0;
      if (!results) {
        status = STATUS_FAILED;
      } else if (results.length === 0) {
        status = STATUS_EMPTY;
      }
      const isSearch = this.data.isSearch;
      if (this.data.records.length === 0 && results?.length === 0) {
        // 当异常的时候，主要为了不引起records的observer变化变化设置默认值
        this.setData(isSearch ? { searchStatus: status } : { loadStatus: STATUS_CLOSED });
      } else {
        this.setData(
          isSearch
            ? {
                searchRecords: searchRecords.concat(
                  (results ?? []).filter((item) => searchRecords.findIndex((r) => r._id === item._id) < 0) || [],
                ),
                records: records.concat(
                  (results ?? []).filter((item) => records.findIndex((r) => r._id === item._id) < 0) || [],
                ),
                searchStatus: status,
              }
            : {
                searchRecords: searchRecords.concat(
                  (results ?? []).filter((item) => searchRecords.findIndex((r) => r._id === item._id) < 0) || [],
                ),
                records: records.concat(
                  (results ?? []).filter((item) => records.findIndex((r) => r._id === item._id) < 0) || [],
                ),
                loadStatus: status,
              },
        );
      }
    },
    _childFetchData: function (data) {
      const { isSearch, pageNo, searchValue } = data.detail;
      this.setData({
        isSearch,
      });
      if (isSearch) {
        if (pageNo === 1) {
          this.setData({
            searchRecords: [],
            searchOption: [],
            searchStatus: STATUS_LOADING,
          });
        }
        const param = [{ [this.properties.primaryField]: { $search: searchValue } }];
        this._fetchData(param, pageNo);
      } else {
        if (pageNo === 1) {
          this.setData({
            records: [],
            option: [],
            loadStatus: STATUS_LOADING,
          });
        }
        this.setData({
          pageNo,
        });
        this._fetchData(this.data.whereEffected, pageNo);
      }
    },
    //获取省
    async getProvince(defaultValue) {
      const { regionType, defaultMutiRegion } = this.properties;
      const { defaultArea, multiIndex } = this.data;
      const provinceValue = (defaultValue || defaultArea).split(',')[0];
      const changeData = await getRegionTree(defaultMutiRegion || '');
      //限制渲染时change事件触发，否则会有初始数据被覆盖问题
      if (changeData?.result.length > 0 && !deepEqual(changeData.value, defaultMutiRegion)) {
        this.triggerEvent('change', changeData);
      }
      var provinceList = [...provinces];
      var provinceArr = provinces.map((item) => {
        return { value: item.Value, code: item.Code };
      }); //保存省级名称
      this.setData({
        multiArray: [destr(JSON.stringify(provinceArr))],
        provinceList, //保存省级原始数据
        provinceArr, //省级所有的名称
      });
      const index = getAreaKey(provinceList, provinceValue);
      multiIndex.splice(0, 1, index);
      this.setData({
        multiIndex,
      });
      var defaultCode = this.data.provinceList[index].Code; // 使用第一项/默认值项当作参数获取市级数据
      this.setData({
        currnetProvinceKey: defaultCode, // 保存在当前的省级key
      });
      if (regionType != 'levelOne') {
        this.getCity(this.data.provinceList[index], defaultValue); // 获取市级数据
      }
    },
    getCity(provinceInfo, defaultValue) {
      // 获取市级数据
      const { regionType } = this.properties;
      const { defaultArea, multiIndex } = this.data;
      const cityValue = (defaultValue || defaultArea).split(',')[1];
      const code = provinceInfo.Code;
      const value = provinceInfo.Value;
      var cityNull = true; //判断省级下是否存在市，如不存在，默认显示省
      this.setData({
        currnetProvinceKey: code, // 保存当前选择的市级code
      });
      var cityArr = [];
      var cityList = [];
      cities.forEach((item) => {
        if (item.Code.substr(0, 2) == code.substr(0, 2)) {
          cityNull = false;
          cityArr.push({ value: item.Value, code: item.Code });
          cityList.push(item);
        }
      });
      if (cityNull) {
        cityArr.push({ value, code });
        cityList.push(provinceInfo);
      }
      this.setData({
        cityList, // 保存下市级原始数据
        cityArr, // 市级所有的名称
      });
      if (regionType == 'levelTwo') {
        const cityData = [this.data.provinceArr, cityArr];
        this.setData({
          multiArray: destr(JSON.stringify(cityData)),
        });
      }
      const index = getAreaKey(cityList, cityValue);
      // 滚动不触发，统一在滚动事件处理交互
      if (defaultValue) {
        multiIndex.splice(1, 1, index);
        this.setData({
          multiIndex,
        });
      }
      var defaultCode = cityList[index]?.Code;
      this.setData({
        currnetCityKey: defaultCode, // 存下当前选择的城市key
      });
      if (regionType == 'levelThree') {
        this.getRegion(cityList[index], defaultValue);
      }
    },
    getRegion(cityInfo, defaultValue) {
      const { defaultArea, multiIndex } = this.data;
      const regionValue = (defaultValue || defaultArea).split(',')[2];
      const code = cityInfo.Code;
      const value = cityInfo.Value;
      var regionNull = true; //判断市级下是否存在区，如不存在，默认显示市
      this.setData({
        currnetCityKey: code, // 更新当前选择的市级key
      });
      var regionList = [];
      var regionArr = [];
      regions.forEach((item) => {
        if (cityInfo.Type == 1 && cityInfo.CentralCity) {
          if (item.Code.substr(0, 2) == code.substr(0, 2)) {
            regionNull = false;
            regionArr.push({ value: item.Value, code: item.Code });
            regionList.push(item);
          }
        } else {
          if (item.Code.substr(0, 4) == code.substr(0, 4)) {
            regionNull = false;
            regionArr.push({ value: item.Value, code: item.Code });
            regionList.push(item);
          }
        }
      });
      if (regionNull) {
        regionList = [].push(cityInfo);
        regionArr = [{ value, code }];
      }
      const threeRegion = [this.data.provinceArr, this.data.cityArr, regionArr];
      this.setData({
        multiArray: destr(JSON.stringify(threeRegion)),
        regionList,
        regionArr,
      });
      const index = getAreaKey(regionList, regionValue);
      if (defaultValue) {
        multiIndex.splice(2, 1, index);
        this.setData({
          multiIndex,
        });
      }
      var defaultCode = regionList[index]?.Code;
      this.setData({
        currnetRegionKey: defaultCode, // 存下当前选择的城市key
      });
    },
    columnchange(e) {
      // 滚动选择器 触发的事件
      const { regionType } = this.properties;
      var column = e.detail.column; // 当前改变的列
      var data = {
        multiIndex: destr(JSON.stringify(this.data.multiIndex)),
        multiArray: destr(JSON.stringify(this.data.multiArray)),
      };
      data.multiIndex[column] = e.detail.value; // 第几列改变了就是对应multiIndex的第几个，更新它
      switch (
        column // 处理不同的逻辑
      ) {
        case 0: // 第一列更改 就是省级的更改
          if (regionType != 'levelOne') this.getCity(this.data.provinceList[e.detail.value]); // 获取当前key下面的市级数据
          data.multiIndex[1] = 0; // 将市默认选择第一个
          data.multiIndex[2] = 0; //第一列滚动时，市区默认选中第一个
          break;
        case 1: // 市发生变化
          this.getRegion(this.data.cityList[e.detail.value]); // 获取区
          data.multiIndex[2] = 0; // 区默认为第一个
          break;
      }
      this.setData({ multiIndex: data.multiIndex });
    },
    // 获取通用选项集列表
    _fetchEnumData: async function () {
      let data = await callWedaApi({
        action: 'DescribeGeneralOptionsDetailList',
        data: {
          OptNameList: [this.properties.enumName],
          PageIndex: 1,
          PageSize: 10,
        },
      });
      const config = destr(data?.Items?.[0]?.Config) ?? [];
      const option = config.map((item) => {
        return {
          label: item.value,
          value: item.key,
          name: item.value,
        };
      });
      this.setData({
        selectRange: option.map((item) => item.label),
        option,
        searchOption: option,
        loadStatus: option.length > 0 ? 0 : STATUS_CLOSED,
      });
    },

    onChange(e) {
      const { range, mode, separator, regionType, dateMode, format } = this.properties;
      let displayValue;
      switch (mode) {
        case 'selector': {
          if (!isFormatNeedFetch(format)) {
            const data = e.detail?.value != null ? range[e.detail.value] : { label: null, value: null };
            this.triggerEvent('change', { ...data, value: data.value, context: { option: data } });
            displayValue = data.label;
          } else {
            const { isSearch, searchOption, option } = this.data;
            const opt = isSearch ? searchOption : option;
            const data = e.detail?.value != null ? opt[e.detail.value] : { label: null, value: null };
            this.triggerEvent('change', { ...data, value: data.value, context: { option: data } });

            displayValue = this.properties.displayValue;
          }
          break;
        }
        case 'date':
        case 'time': {
          const value = e.detail.value;
          let day, timeSnap;
          if (mode === 'date') {
            const dateValue = this._coverDateModeValue(value, dateMode);
            day = this.converDate2Dayjs(dateValue);
            timeSnap = day.valueOf();
          } else {
            day = this.converTime2Dayjs(value);
            timeSnap = (day.hour() * 60 * 60 + day.minute() * 60) * 1000;
          }
          this.triggerEvent('change', { value: timeSnap });
          displayValue = e.detail.value;
          break;
        }
        case 'region': {
          this.triggerEvent('change', e.detail);
          displayValue = e.detail.value.join(separator);
          break;
        }
        case 'mutiRegion': {
          this.setData({
            step: 1,
            multiIndex: e.detail.value, // 更新下标字段
          });
          const value = buildDisplayValue(this.data.multiArray, this.data.multiIndex, regionType);
          displayValue = value?.value;
          this.triggerEvent('change', value);
          break;
        }
        default: {
          break;
        }
      }
      this.setData({ displayValue });
    },
    onCancel(e) {
      this.triggerEvent('cancel', e.detail);
    },
    converTime(time) {
      return this.converTime2Dayjs(time).format('HH:mm');
    },
    converTime2Dayjs(time) {
      const regexp = time.match(/^(\d{2}):(\d{2})$/);
      if (regexp && regexp[1] < 24 && regexp[2] < 60) {
        return dayjs().hour(regexp[1]).minute(regexp[2]);
      } else if (typeof time === 'string' && /^-?[0-9]*$/.test(time)) {
        const timeSnap = Number(time);
        let day;
        try {
          day = dayjs()
            .hour(Math.floor(timeSnap / 3600000) % 24)
            .minute(Math.floor((timeSnap % 3600000) / 60000));
        } catch (e) {
          day = dayjs(Number(time));
        }
        return day;
      } else {
        return dayjs(time);
      }
    },
    converDate2Dayjs(d) {
      if (typeof d === 'string' && /^-?[0-9]*$/.test(d)) {
        return dayjs(Number(d));
      }
      return dayjs(d);
    },
    // 将原始 number 类型值转成 YYYY-MM-DD 格式
    _coverNumber2Date(d, dateMode = 'day', isDisplay = false) {
      const day = d && this.converDate2Dayjs(d);
      if (!day) return undefined;
      let dayStr;
      if (dateMode === 'year') {
        dayStr = day.format('YYYY') + (isDisplay ? '' : '-01-01');
      } else if (dateMode === 'month') {
        dayStr = day.format('YYYY-MM') + (isDisplay ? '' : '-01');
      } else if (dateMode === 'day') {
        dayStr = day.format('YYYY-MM-DD');
      } else {
        dayStr = day.format('YYYY-MM-DD HH:mm:ss');
      }
      return dayStr;
    },
    // 将组件 onChange 返回的值，根据年/月/日模式，补齐返回 YYYY-MM-DD 格式
    _coverDateModeValue(d, dateMode = 'day') {
      if (dateMode === 'year' && /^\d{4}$/.test(d)) {
        return `${d}-01-01`;
      } else if (dateMode === 'month' && /^\d{4}-\d{2}$/.test(d)) {
        return `${d}-01`;
      } else {
        return d;
      }
    },
    onSearch(event) {
      this.triggerEvent('search', { value: event.detail.value });
    },
  },
});
