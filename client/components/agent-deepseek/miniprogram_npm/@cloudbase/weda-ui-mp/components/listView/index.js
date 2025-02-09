/* eslint-disable rulesdir/no-timer*/
import { getWedaAPI } from '../../utils/getWedaApi';
import { getModelParams, getPageParams } from '../../utils/getModelParams';
import { commonCompBehavior } from '../../utils/common-behavior';
import { callDataSource } from '../../utils/tcb';
import isEqual from '../../utils/deepEqual';
import { textToString } from '../../utils/platform';

import { WdCompError } from '../../utils/error';
const LISTVIEW_MESSAGE = {
  methods_no_support: '当前组件绑定了APIs，暂不支持进行数据删除',
  deleteOne_param_error: '参数"数据标识"格式错误',
  deleteOne_success: '删除数据成功',
  deleteOne_fail: '删除数据失败',
  refresh_success: '刷新数据成功',
  refresh_fail: '刷新数据失败',
};

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
      type: null,
      // 小程序 optionalTypes 有坑
      // 在值为 undefined 可能会出现 TypeError: Cannot read property 'constructor' of undefined
      // optionalTypes: [Object],
      value: [],
    },
    orderBy: {
      type: String,
    },
    orderType: {
      type: String,
    },
    where: {
      type: Array,
      value: [],
    },
    queryCondition: {
      type: null,
      value: [],
    },
    pageSize: {
      type: Number,
      value: 5,
    },
    template: {
      type: String,
      value: 'simpleList',
    },
    pagination: {
      type: String,
      value: 'loadMoreButton',
    },
    isRecords: {
      type: Boolean,
      value: true,
    },
    isSetStatus: {
      type: Boolean,
      value: false,
    },
    isSetLoading: {
      type: Boolean,
      value: true,
    },
    emptyText: {
      type: String,
      value: '',
    },
    loadCompletedText: {
      type: String,
      value: '',
    },
    beforeDataChange: {
      type: Function,
      value: (v) => v,
    },
    refType: {
      type: String,
      value: 'listView',
    },
    enableTotal: {
      type: Boolean,
      value: false,
    },
    total: {
      type: Number,
      value: 0,
    },
    loadButtonText: {
      type: String,
    },
    loading: {
      type: Boolean,
      value: false,
    },
    selectFieldType: {
      type: String,
      value: 'main',
    },
    selectFields: {
      type: Array,
      value: [],
    },
    pageIndex: {
      type: Number,
      value: 1,
    },
    supportManyRelated: {
      type: Boolean,
      value: false,
    },
    isSupportMultipleSort: {
      type: Boolean,
      value: false,
    },
    sorter: {
      type: Array,
      value: [],
    },
  },
  data: {
    pageNo: 1,
    listTotal: 0,
    records: [],
    pageStr: '0/0',
    status: '',
    _status: '',
    isModel: true,
    isDataViewApis: false,
    isVisiableSign: false,
    loadButtonTextFinal: '',
    isSetLoadingFinal: true,
    isSetStatusFinal: false,
    delayRef: {
      current: {
        version: null,
        initTimer: null,
        statusTimer: null,
        eventTimer: null,
        exprTimer: null,
        initExpr: false,
      },
    },
    paramRef: [],
  },
  methods: {
    // 数据列表设置表达式: 区分前后端分页
    setExpression: function () {
      const { dataSourceData, enableTotal, total: _total, isRecords, pageSize, pagination } = this.properties;
      const { pageNo } = this.data;
      let records = [];
      let total = 0;
      if (Array.isArray(dataSourceData)) {
        if (enableTotal) {
          records = dataSourceData;
          total = !isNaN(parseInt(`${_total}`)) ? _total : 0;
        } else {
          const count = pageSize * pageNo;
          if (['loadMoreButton', 'bottomLoad'].includes(pagination)) {
            records = dataSourceData.slice(0, count);
          } else {
            records = dataSourceData.slice(pageSize * (pageNo - 1), count);
          }
          total = dataSourceData.length;
        }
      }
      const pageStr = this.getPageStr(total, pageNo, pageSize);
      this.data.delayRef.current.initExpr = true;
      this.setData({ records, listTotal: total, pageStr }, () =>
        this.onSuccessCb({ records, total, isTriggerEmpty: isRecords }),
      );
    },
    // 更新参数
    getQueryParams: function ({ methodName, params }) {
      if (methodName === 'wedaGetRecordsV2') {
        params.getCount = true;
        params.compatibleWithV1 = true;
        params.pageNumber = params.pageNo;
      }
      return params;
    },
    // 列表容器拉取数据
    fetchData: async function (param = {}) {
      const {
        pageNo: currentPageNo,
        records: currentRecords,
        isFetchCurrent,
        forceClear = false,
      } = Object.assign({}, this.data, param);
      const {
        datasource,
        bindConnectMetadata,
        connectorMethod,
        connectorParams,
        pageSize,
        dataSourceType,
        pagination,
        enableTotal,
      } = this.properties;

      this.setData({ pageNo: currentPageNo });

      // 分页变化事件
      this.triggerEvent('onPagingChange', {
        query: { pageNo: currentPageNo, pageSize },
      });
      if (dataSourceType === 'expression') {
        this.setData({ _status: 'loading' });
        this.data.delayRef.current.exprTimer = setTimeout(() => this.setData({ _status: '' }), 3000);
        !enableTotal && this.data.delayRef.current.initExpr && this.setExpression();
        return;
      }

      const fetchVersion = (this.data.delayRef.current.version = Date.now());
      const { isModel, isDataViewApis } = this.data;

      // tcb分页参数
      let tcbParams = getPageParams(currentPageNo, pageSize);
      let data = {};
      let dataSourceName, methodName, extra, eventDataSource;
      if (isModel) {
        dataSourceName = datasource?.name;
        extra = datasource?.extra;
        methodName = typeof extra?.methodName === 'string' ? extra?.methodName : 'wedaGetRecords';
        eventDataSource = datasource;
        const modelParams = await getModelParams({
          ...this.properties,
          supportManyRelated: methodName === 'wedaGetRecordsV2',
        });
        tcbParams = { ...tcbParams, ...modelParams };
      } else {
        dataSourceName = bindConnectMetadata?.datasource?.name;
        extra = bindConnectMetadata?.datasource?.extra;
        methodName = connectorMethod?.name;
        eventDataSource = { ...bindConnectMetadata, ...connectorMethod };
        tcbParams = { ...connectorParams, ...tcbParams };
      }

      if (!(dataSourceName && methodName)) {
        console.warn(`当前请求缺少必要参数 dataSourceName或methodName`);
        return;
      }
      // select为空时，不触发请求
      if (methodName === 'wedaGetRecordsV2' && !Object.keys(tcbParams?.select)?.length) {
        console.warn(`当前请求缺少必要参数 select`);
        return;
      }
      this.setData({ _status: 'loading' });

      // tcb 请求
      try {
        if (isFetchCurrent) {
          data = await this._fetchDataLoop(
            {
              dataSourceName,
              methodName,
              params: tcbParams,
              swr: { forceClear },
            },
            this.data.records.length,
          );
        } else {
          data = await callDataSource(
            {
              dataSourceName,
              methodName,
              params: this.getQueryParams({
                methodName,
                params: tcbParams,
              }),
              swr: { forceClear },
            },
            true,
          );
        }
        if (fetchVersion !== this.data.delayRef.current.version) return;

        // 处理数据
        let records = isDataViewApis ? [].concat(data) : data?.records || [];
        let listTotal = isDataViewApis ? 0 : Number(data?.total) || 0;
        if (['loadMoreButton', 'bottomLoad'].includes(pagination)) {
          records = [...currentRecords, ...records];
        }
        const pageStr = this.getPageStr(listTotal, currentPageNo, pageSize);
        this.setData(
          {
            records,
            listTotal,
            pageNo: currentPageNo,
            pageStr,
          },
          () =>
            this.onSuccessCb({
              records,
              total: listTotal,
              isTriggerEmpty: !isDataViewApis,
              datasource: eventDataSource,
            }),
        );
      } catch (e) {
        const obj = this.onFailCb(e);
        throw new WdCompError(`${obj?.message}`, {
          code: obj?.code,
          requestId: obj?.requestId,
          original: e?.original,
        });
      }
    },

    // 循环调用接口获取当前已加载的数据
    _fetchDataLoop: async function (param = {}, count = 0) {
      let [records, total] = [[], 0];
      try {
        const { app } = getWedaAPI();
        const { params, dataSourceName, methodName, swr } = param;
        const MAX_PAGESIZE = Math.min(1000, count);
        const loopLength = Math.ceil(count / MAX_PAGESIZE);
        for (let i = 1; i < loopLength + 1; i++) {
          const tcbParams = { ...params, pageNo: i, pageSize: MAX_PAGESIZE };
          const temp = await app?.cloud?.callDataSource({
            dataSourceName,
            methodName,
            params: this.getQueryParams({
              methodName,
              params: tcbParams,
            }),
            swr,
          });
          records = records.concat(temp.records || []);
          total = temp.total || 0;
        }
      } catch (e) {
        console.error('_fetchDataLoop: ', e);
      }
      return { records: records.slice(0, count), total };
    },

    // 分页器页码
    getPageStr: function (total, pageNo, pageSize) {
      return `${total > 0 ? pageNo : 0}/${Math.ceil(total / pageSize) || 0}`;
    },

    // 下一页
    handleNext: function () {
      if (this.data.status === 'loading' || !(this.properties.pageSize * this.data.pageNo < this.data.listTotal)) {
        return;
      }
      this.fetchData({ pageNo: this.data.pageNo + 1 });
    },

    // 上一页
    handlePre: function () {
      if (this.data.status === 'loading' || !(this.properties.pageNo > 1)) {
        return;
      }
      this.fetchData({ pageNo: this.data.pageNo - 1 });
    },

    // 加载成功(包含为空)事件
    onSuccessCb: function ({ records, total, isTriggerEmpty, datasource }) {
      const beforeDataChange = this.properties.beforeDataChange || ((v) => v);
      const isDelay = ['loadMoreButton', 'bottomLoad'].includes(this.properties.pagination);
      this.triggerEvent('onDataChange', {
        data: beforeDataChange(records),
        state: this.getContextState(),
      });
      clearTimeout(this.data.delayRef.current.exprTimer);
      if (total === 0 && isTriggerEmpty) {
        this.setData({ _status: 'empty' });
        this.triggerEvent('queryEmpty', {
          datasource,
          data: beforeDataChange([]),
        });
      } else {
        const statusCb = () => this.setData({ _status: 'success' });
        if (isDelay) {
          this.data.delayRef.current.statusTimer = setTimeout(statusCb, 300);
        } else {
          statusCb();
        }
      }
      const successCb = () => {
        this.triggerEvent('querySuccess', {
          datasource,
          data: beforeDataChange(records),
        });
      };
      if (isDelay) {
        this.data.delayRef.current.eventTimer = setTimeout(successCb, 350);
      } else {
        successCb();
      }
    },

    // 失败事件
    onFailCb: function (e) {
      this.setData({ _status: 'fail' });
      const code =
        e?.code || (this.properties.refType === 'dataView' ? 'WdDataView.QueryError' : 'WdListView.QueryError');
      const obj = {
        code,
        message: `${e?.message}`,
        requestId: e?.original?.original?.requestID,
      };
      this.setData({ errorObj: obj });
      this.triggerEvent('queryFail', {
        error: { ...obj, original: e?.original },
      });
      return obj;
    },

    // 计算上下文对象数据
    getContextState: function (state) {
      const { listTotal, pageNo } = this.data;
      let { pageSize } = this.properties;
      return { total: listTotal, pageNo, pageSize, ...state };
    },

    // 开始监听sign
    _observerSign: function () {
      setTimeout(() => {
        this.signObserver = this.createIntersectionObserver();
        this.signObserver.relativeToViewport().observe('#weda-list-view_sign', (res) => {
          this.setData({ isVisiableSign: res?.intersectionRatio > 0 });
        });
      }, 500);
    },

    // 组件刷新，查看第1页数据
    _methodRefreshFromStart: async function () {
      try {
        this._clearDelay();
        await this.fetchData({ pageNo: 1, records: [], forceClear: true });
      } catch (e) {
        wx.showToast({
          title: LISTVIEW_MESSAGE.refresh_fail,
          duration: 2000,
          icon: 'error',
        });
        throw e;
      }
    },

    // 组件刷新，查看当前页数据
    _methodRefreshKeepPage: async function () {
      try {
        this._clearDelay();
        const { pageNo, listTotal } = this.data;
        const { pageSize } = this.properties;
        if (this.properties.pagination === 'pagination') {
          const pageNoRaw = (pageNo - 1) * pageSize + 1 === listTotal ? pageNo - 1 : pageNo;
          await this.fetchData({
            pageNo: pageNoRaw,
            records: [],
            forceClear: true,
          });
        } else if (['loadMoreButton', 'bottomLoad'].includes(this.properties.pagination)) {
          await this.fetchData({
            records: [],
            isFetchCurrent: true,
            forceClear: true,
          });
        } else {
          await this._methodRefreshFromStart();
        }
      } catch (e) {
        wx.showToast({
          title: LISTVIEW_MESSAGE.refresh_fail,
          duration: 2000,
          icon: 'error',
        });
        throw e;
      }
    },

    // 组件刷新方法
    methodRefresh: async function (params) {
      try {
        if (typeof params === 'object' && params?.type === 'refreshKeepPage') {
          await this._methodRefreshKeepPage();
        } else {
          await this._methodRefreshFromStart();
        }
      } catch (error) {
        throw new WdCompError(`${error?.message}` || '', {
          code: error?.code
            ? error?.code
            : this.properties.refType === 'dataView'
            ? 'WdDataView.RefreshError'
            : 'WdListView.RefreshError',
          requestId: error?.requestId,
          original: error?.original,
        });
      }
    },

    // 组件删除单条数据
    methodDeleteOne: async function (params) {
      try {
        if (!this.data.isModel) {
          throw new WdCompError(`${LISTVIEW_MESSAGE.methods_no_support}` || '', {
            code: `${this.properties.refType === 'dataView' ? 'WdDataView' : 'WdListView'}.ActionNotSupport`,
          });
        }
        const _id = params?._id;
        if (!_id || typeof _id !== 'string') {
          throw new WdCompError(`${LISTVIEW_MESSAGE.deleteOne_param_error}` || '', {
            code: `${this.properties.refType === 'dataView' ? 'WdDataView' : 'WdListView'}.DeleteOneParamError`,
          });
        }
        const { app } = getWedaAPI();
        await app?.cloud?.callDataSource(
          {
            dataSourceName: this.properties.datasource.name,
            methodName: 'wedaDelete',
            params: { _id },
          },
          true,
        );
        await this._methodRefreshKeepPage();
      } catch (e) {
        wx.showToast({
          title: e?.message || LISTVIEW_MESSAGE.deleteOne_fail,
          duration: 2000,
          icon: 'none',
        });
        throw new WdCompError(`${e?.message}` || '', {
          code: e?.code
            ? e?.code
            : this.properties.refType === 'dataView'
            ? 'WdDataView.DeleteOneError'
            : 'WdListView.DeleteOneError',
          requestId: e?.original?.original?.requestID,
          original: e?.original,
        });
      }
    },
    _clearDelay: function () {
      clearTimeout(this.data.delayRef.current.initTimer);
      clearTimeout(this.data.delayRef.current.statusTimer);
      clearTimeout(this.data.delayRef.current.eventTimer);
      clearTimeout(this.data.delayRef.current.exprTimer);
    },
    updateWidgetAPI() {
      const { records, listTotal, pageNo, errorObj } = this.data;
      let { pageSize, datasource } = this.properties;
      this.setReadonlyAttributes &&
        this.setReadonlyAttributes({
          records,
          total: listTotal,
          pageSize,
          pageNo,
          refresh: this.methodRefresh.bind(this),
          deleteOne: this.methodDeleteOne.bind(this),
          error: errorObj,
          dataSourceVersion: datasource?.extra?.methodName === 'wedaGetRecordsV2' ? 'v2' : 'v1',
        });
    },
  },
  observers: {
    'datasource,bindConnectMetadata,connectorMethod,orderBy,orderType,selectFieldType,selectFields,pageIndex,pageSize,pagination,where,queryCondition,connectorParams,dataSourceType,sorter':
      function (...rest) {
        if (isEqual(this.data.paramRef, rest)) return;
        this.data.paramRef = rest;
        this._clearDelay();
        this.data.delayRef.current.initTimer = setTimeout(() => {
          this.fetchData({
            pageNo: this.properties.pageIndex || 1,
            records: [],
          });
        }, 500);
      },
    'dataSourceType,dataSourceData,total,enableTotal': function () {
      if (this.properties.dataSourceType === 'expression') {
        console.log('====dataSourceData====', this.data.dataSourceData);
        this.setExpression();
      }
    },
    'isVisiableSign,status': function (dIsVisiableSign, dStatus) {
      if (dIsVisiableSign && ['', 'success'].includes(dStatus) && this.properties.pagination === 'bottomLoad') {
        this.handleNext();
      }
    },
    'dataSourceType,isRecords,loadButtonText': function (dataSourceType, isRecords, loadButtonText) {
      const isModel = dataSourceType === 'data-model';
      const isDataViewApis = !isRecords && !isModel;
      const loadButtonTextFinal = textToString(loadButtonText) || '加载更多';
      this.setData({ isModel, isDataViewApis, loadButtonTextFinal });
    },
    'records,listTotal,pageNo,pageSize,errorObj': function () {
      this.updateWidgetAPI();
    },
    'dataSourceType,isSetLoading,isSetStatus': function (d, i1, i2) {
      const isSetLoadingFinal = d !== 'expression' ? i1 : true;
      const isSetStatusFinal = d !== 'expression' ? i2 : false;
      this.setData({ isSetLoadingFinal, isSetStatusFinal });
    },
    'dataSourceType,loading,_status': function (d, l, s) {
      let status = s;
      if (d === 'expression' && l) {
        status = 'loading';
      }
      this.setData({ status });
    },
  },
  lifetimes: {
    attached: function () {
      this._observerSign();
      this.updateWidgetAPI();
      this.triggerEvent('onDataChange', {
        data: [],
        state: {},
      });
    },
    detached: function () {
      this.signObserver?.disconnect();
      this.triggerEvent('onDataChange', {
        data: null,
        state: {},
      });
    },
  },
});
