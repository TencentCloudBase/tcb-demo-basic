/* eslint max-lines: [error, 800] */
import { commonCompBehavior } from '../../utils/common-behavior';
import {
  getDataSourceByName,
  callDataSource,
  callConnector,
} from '../../utils/tcb';
import equal from '../../utils/deepEqual';
import { emptyArray, noop } from '../../utils/constant';
import { isNil } from '../../utils/lodash';
import {
  convertFormDataToSubmitParams,
  convertRemoteValueToFormData,
} from './remote-value';
import { WdCompError } from '../../utils/error';
import {
  getErrorObjectFromValidateResult,
  getFormDataFromItemMap,
} from './form-utils';
import lodashGet from 'lodash.get';
import debounce from '../../utils/debounce';

const formTypeWithInitValue = ['edit', 'read'];
const debounceMs = 100;
const compMountTimeOut = 300;
const LOADING_THRESHOLD = 1000;
Component({
  options: {
    virtualHost: true,
    multipleSlots: true,
    pureDataPattern: /^_/, // 指定所有 _ 开头的数据字段为纯数据字段
  },
  behaviors: [commonCompBehavior],
  properties: {
    name: {
      type: String,
    },
    className: {
      type: String,
      value: '',
    },
    style: {
      type: String,
      value: '',
    },
    id: {
      type: String,
      value: '',
    },
    initialValues: {
      type: Object,
      value: {},
    },
    formType: {
      type: String,
      value: 'create',
    },
    _id: {
      type: String,
    },
    datasourceType: {
      type: String,
      value: 'model',
    },
    dataSourceName: {
      type: String,
      value: '',
    },
    methodGetItem: {
      type: String,
      value: '',
    },
    methodCreate: {
      type: String,
      value: '',
    },
    methodUpdate: {
      type: String,
      value: '',
    },
    paramGetItem: {
      type: Object,
      value: '',
    },
    layout: {
      type: String,
      value: 'horizontal',
    },
    value: {
      type: Object,
      value: null,
    },
  },
  methods: {
    setValue(data, setNull) {
      data = Object.freeze(JSON.parse(JSON.stringify(data)));
      // Object.entries(that.data._formItemMap).forEach(())
      Object.keys(this.data._formItemMap).forEach((name) => {
        const items = this.data._formItemMap[name];
        items.forEach((item) => {
          if (!item.setValue) {
            console.error('表单组件缺少setValue方法:', item);
            return;
          }
          if (lodashGet(data, name, null) !== null) {
            const value = lodashGet(data, name);
            item.setValue(value);
            // app.utils.set($comp.state._context, name, value);
          } else {
            setNull && item.setValue(null);
          }
        });
      });
    },
    setReadOnly(val = true) {
      Object.keys(this.data._formItemMap).forEach((name) => {
        const items = this.data._formItemMap[name];
        items.forEach((item) => {
          if (!item.setReadOnly) {
            console.error('表单组件缺少setReadOnly方法:', item);
            return;
          }
          item.setReadOnly(val);
        });
      });
    },
    async validate() {
      const validatePromise = [];
      const validateKey = [];
      const validateLabel = [];
      Object.values(this.data._formItemMap).forEach((item) => {
        if (!item) return;
        let items = item;
        if (!Array.isArray(items)) {
          items = [items];
        }
        items.forEach((item) => {
          if (item.handleValidate) {
            const validate = item.handleValidate(false);
            const { name, label } = item;

            if (validate) {
              validatePromise.push(validate);
              validateKey.push(name);
              validateLabel.push(label);
            }
          }
        });
      });
      let errorArr = await Promise.all(validatePromise);
      const errObj = {};
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      errorArr = errorArr.filter((item, index) => {
        if ((item ?? []).length) {
          // 加标题
          item.forEach((val) => {
            val.label = validateLabel[index];
          });
          errObj[validateKey[index]] = item;
        }
        return item?.length > 0;
      });
      if (Object.keys(errObj).length > 0) {
        console.error(errObj);
      }
      return Promise.resolve(errObj);
    },
    submit: debounce(async function () {
      const { formType, _id, isDisabledSubmit } = this.data;
      if (isDisabledSubmit) {
        return;
      }
      const errorObj = await this.validate();
      if (Object.keys(errorObj ?? {}).length === 0) {
        this.triggerEvent('validateSuccess', { errors: {} });
        const formData = getFormDataFromItemMap(
          this.data._formItemMap,
          formType
        );
        const extra = ['read', 'edit'].includes(formType) && _id ? { _id } : {};
        this.triggerEvent(
          'submit',
          JSON.parse(JSON.stringify({ ...extra, ...formData }))
        );
        // 流程用了
        return formData;
      } else {
        this.setData({ errors: errorObj });
        this.triggerEvent('validateFail', {
          errors: getErrorObjectFromValidateResult(errorObj),
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    }, 500),
    reset() {
      this.setValue({}, true);
    },
    clearValue() {
      this.setValue({}, true);
    },
    clearValidate() {
      Object.keys(this.data._formItemMap).forEach((name) => {
        const items = this.data._formItemMap[name];
        items.forEach((item) => {
          if (!item.clearValidate || typeof item.clearValidate !== 'function') {
            console.error('表单组件缺少clearValidate方法:', item);
            return;
          }
          item.clearValidate();
        });
      });
    },
    // 获取子表单初始值
    _initValueFormDetail: function () {
      console.log(this.data._formItemMap);
      const { _formItemMap } = this.data;
      const formDetailInitValue = {};
      Object.keys(_formItemMap ?? {}).forEach((name) => {
        const items = _formItemMap[name];
        items.forEach((item) => {
          if (item?.getConfig?.()?.componentType === 'formdetail') {
            formDetailInitValue[name] = _formItemMap[name]?.value;
          }
        });
      });
      return formDetailInitValue;
    },
    // 获取表单初始值
    _initValue: async function () {
      console.log('_initValue');
      const fetchVersion = (this.data._delayRef.current.version = Date.now());
      const {
        formType,
        datasourceType,
        dataSourceName,
        _id,
        methodGetItem,
        paramGetItem,
      } = this.properties;
      const isDataModel = ![
        'connector',
        'custom-connector',
        'expression',
      ].includes(datasourceType);
      try {
        const allSelectFields = this.getSelectFields();
        let callDb = callDataSource;
        let methodName = 'wedaGetItemV2';
        let params = _id
          ? {
              select: { $master: true, ...allSelectFields },
              filter: { where: { _id: { $eq: _id } } },
              version: 1,
            }
          : null;
        if (!isDataModel) {
          callDb = callConnector;
          methodName = methodGetItem;
          params = paramGetItem;
        }

        if (
          (datasourceType === 'expression' ||
            (formTypeWithInitValue.includes(formType) &&
              dataSourceName &&
              methodName &&
              params)) &&
          callDb
        ) {
          let initValue;
          if (datasourceType === 'expression') {
            initValue = this.data.value;
          } else {
            this.setData({ isLoadingData: true });

            initValue = await callDb({
              dataSourceName,
              methodName,
              params,
            });
          }
          const cleanInitValue = JSON.parse(JSON.stringify(initValue));
          if (this.setReadonlyAttributes) {
            this.setReadonlyAttributes({ remoteValue: cleanInitValue });
          }
          this.setData({ isLoadingData: false });
          if (
            Object.keys(initValue).length !== 0 &&
            fetchVersion === this.data._delayRef.current.version
          ) {
            const dataSourceProfile = await this.getDataSourceProfile();

            const initFormData = convertRemoteValueToFormData(
              datasourceType,
              dataSourceProfile,
              cleanInitValue
            );
            const formDetailInitValue = this._initValueFormDetail();
            const initValues = { ...formDetailInitValue, ...initFormData };
            this.setValue(initValues);
            // eslint-disable-next-line rulesdir/no-timer
            setTimeout(() => {
              this.setValue(initValues);
              this.setData({
                formData: initValues,
                initialValues: initValues,
              });
              this.triggerEvent('querySuccess', initValue);
            }, compMountTimeOut);
          }
          if (Object.keys(initValue).length === 0) {
            this.triggerEvent('queryEmpty', {});
          }
        }
      } catch (e) {
        console.error(e);
        // this._alertError();
        const obj = {
          code: e?.code || 'WdForm.QueryError',
          message: `${e?.message}`,
          requestId: e?.original?.original?.requestID,
        };
        this.setData({ errorObj: obj });
        this.triggerEvent('queryFail', {
          error: { ...obj, original: e?.original },
        });
        throw new WdCompError(`${obj?.message}` || '', {
          code: obj?.code,
          requestId: obj?.requestId,
          original: e?.original,
        });
      }
    },
    getSelectFields() {
      const fields = {};

      Object.keys(this.data._formItemMap ?? {}).forEach((name) => {
        if (!fields[name]) {
          fields[name] = new Set();
        }
        const items = this.data._formItemMap[name];
        items.forEach((item) => {
          (item.selectFields ?? [])
            .filter((t) => typeof t === 'string' && t.length > 0)
            .forEach((field) => {
              fields[name].add(field);
            });
        });
      });
      const result = Object.keys(fields).reduce((acc, k) => {
        if (fields[k].size > 0) {
          acc[k] = Array.from(fields[k]);
        }
        return acc;
      }, {});
      return Object.keys(result)
        .filter((item) => !item.includes('[')) // 避免出现 {\"select\":{\"$master\":true,\"gzjl[0].gl\":{\"name\":true}},
        .reduce((acc, key) => {
          acc[key] = result[key].reduce((fieldAcc, field) => {
            fieldAcc[field] = true;
            return fieldAcc;
          }, {});
          return acc;
        }, {});
    },
    // 查询失败提示
    _alertError: function (message = '表单容器数据查询失败') {
      wx.showToast({
        title: message,
        icon: 'none',
        duration: 2000,
      });
    },
    // 获取表单字段权限
    _initDataSourceFieldsWithAuth: async function () {
      const { datasourceType, dataSourceName } = this.properties;
      const isDataModel = ![
        'connector',
        'custom-connector',
        'expression',
      ].includes(datasourceType);
      const authValue = {
        isDataModel,
        dataSourceFields: undefined,
        dataSourceFieldsWidthAuthList: undefined,
      };
      try {
        if (isDataModel && dataSourceName) {
          const datasource = await getDataSourceByName(dataSourceName);
          // 判断是否是预览区，编辑器编辑区 dataSourceName 查询的返回一致，编辑区用的本地的数据源数据返回固定
          authValue.dataSourceFieldsWidthAuthList =
            datasource?.resourceCheckInfos
              ?.filter((item) => !item?.RelationField)
              ?.map((item) => item.ReadWrite);
          authValue.dataSourceFields = Object.keys(
            datasource?.schema?.properties || {}
          );
          this.setData({ authValue, dataSourceProfile: datasource });
          // this.triggerEvent('onInitDataSourceFieldsWithAuth', authValue);
        }
      } catch (err) {
        console.error('getDataSourceFieldsWithAuth err', err);
        this._alertError(
          `获取数据源字段权限信息失败,字段权限可能无法正确展示,错误信息:${err}`
        );
      }
    },
    updateFormContext: function () {
      if (this._attached !== true) {
        return;
      }
      const formData = getFormDataFromItemMap(
        this.data._formItemMap,
        this.data.formType
      );
      this.setData({ formData });
      this.triggerEvent('onDataChange', {
        data: JSON.parse(JSON.stringify(formData)),
      });
    },
    getDataSourceProfile: async function () {
      const { datasourceType, dataSourceName } = this.properties;
      const isDataModel = ![
        'connector',
        'custom-connector',
        'expression',
      ].includes(datasourceType);
      if (isDataModel && dataSourceName) {
        if (!isNil(this.data.dataSourceProfile)) {
          // datasourceName 不能绑变量的，所以组件级别缓存
          return this.data.dataSourceProfile;
        }
        const datasource = await getDataSourceByName(dataSourceName);
        this.setData({ dataSourceProfile: datasource });
        this.setReadonlyAttributes &&
          this.setReadonlyAttributes({ dataSourceProfile: datasource });
        return datasource;
      }
      return null;
    },
    updateWidgetAPI: function () {
      const {
        formType,
        dataSourceName,
        layout,
        errors,
        remoteValue,
        formData,
        dataSourceProfile,
        datasourceType,
        methodCreate,
        methodUpdate,
        methodGetItem,
        isDisabledSubmit,
      } = this.data;
      this.setReadonlyAttributes?.({
        formType,
        dataSourceName,
        layout,
        errors,
        remoteValue,
        value: formData,
        dataSourceProfile,
        datasourceType,
        methodCreate,
        methodUpdate,
        methodGetItem,
        isDisabledSubmit,
      });
    },
    enableSubmit() {
      this.setData({ isDisabledSubmit: false });
    },
    disableSubmit() {
      this.setData({ isDisabledSubmit: true });
    },
  },
  data: {
    _formItemMap: {},
    _historyCtx: [],
    _recoverFns: [],
    _previousFormType: null,
    _preParamGetItem: undefined,
    _preDataId: undefined,
    _delayRef: { current: { version: null, initTimer: null } },
    isLoadingData: false,
    loadingStatus: 'done',
    authValue: undefined,

    formData: {},
    params: {},
    dataSourceProfile: {},
    errorObj: {},
  },
  lifetimes: {
    attached() {
      this._attached = true;
      this._initedItemMap?.clear();
      const that = this;
      this.mountReadonlyAttributes(() => {
        return {
          getConfig() {
            return {
              componentType: 'form',
            };
          },
          initialValues: that.data.initialValues,
          addFormItem(name, w) {
            if (
              isNil(name) ||
              (typeof name === 'string' && name.length === 0)
            ) {
              // name 没设置或为空串的时候不受表单容器控制
              console.warn(
                `组件 #${w?.id} 表单key(表单输入类组件 name 属性)没设置或为空串的时候不受表单容器控制`
              );
              return noop;
            }
            if (
              Object.prototype.hasOwnProperty.call(
                that.data._formItemMap ?? {},
                name
              )
            ) {
              that.data._formItemMap[name].push(w);
            } else {
              that.data._formItemMap[name] = [w];
            }
            that.setData({
              _formItemMap: that.data._formItemMap,
            });
            return () => {
              const removedArr = that.data._formItemMap[name].filter(
                (item) => item !== w
              );
              if (removedArr.length <= 0) {
                delete that.data._formItemMap[name];
              } else {
                that.data._formItemMap[name] = removedArr;
              }
              that.setData({
                _formItemMap: that.data._formItemMap,
              });
            };
          },
          setValue: that.setValue.bind(that),
          validate: async () => {
            const errorObj = await that.validate.call(that);
            if (Object.keys(errorObj ?? {}).length === 0) {
              this.triggerEvent('validateSuccess', { errors: {} });
            } else {
              this.setData({ errors: errorObj });
              this.triggerEvent('validateFail', {
                errors: getErrorObjectFromValidateResult(
                  errorObj,
                  this.data._formItemMap
                ),
              });
              throw errorObj;
            }
            return errorObj;
          },
          submit: () => {
            return that.submit.call(that);
          },
          reset: that.reset.bind(that),
          updateFormContext: that.updateFormContext.bind(that),
          layout: that.data.layout,
          value: that.data.formData,
          clearValue: that.clearValue.bind(that),
          clearValidate: that.clearValidate.bind(that),
          dataSourceProfile: that.data.dataSourceProfile,
          enableSubmit: that.enableSubmit.bind(that),
          disableSubmit: that.disableSubmit.bind(that),
        };
      });
      this._initDataSourceFieldsWithAuth();
      // 兼容流程
      if (this.$node) {
        const $node = this.$node;
        $node.setValue = this.setValue.bind(this);
        $node.submit = this.submit.bind(this);
        $node.formItems = '为了兼容不报错';
      }

      this.updateWidgetAPI();
      this.setData({ id: this.id });
    },
    detached() {
      this._attached = false;
      this._initedItemMap = new WeakMap();
      if (this.$node) {
        const $node = this.$node;
        $node.setValue = undefined;
        $node.submit = undefined;
        $node.formItems = undefined;
      }
    },
  },
  observers: {
    'formType, _formItemMap': debounce(function (formType, formItemMap) {
      if (formType === 'read') {
        Object.values(formItemMap).forEach((item) => {
          if (!item) return;
          let items = item;
          if (!Array.isArray(items)) {
            items = [items];
          }
          items.forEach((item) => {
            const recoverFn = (val) => item.setReadOnly(val);
            recoverFn(true);
            this.data._recoverFns.push(recoverFn);
            this.setData({ _recoverFns: this.data._recoverFns });
          });
        });
      } else {
        this.data._recoverFns.forEach((fn) => fn(false));
        this.setData({ _recoverFns: [] });
      }
      this.setData({ _previousFormType: formType });
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    }, 1000),
    'formType,datasourceType,dataSourceName,_id,methodGetItem,paramGetItem,value':
      function (
        formType,
        datasourceType,
        dataSourceName,
        _id,
        methodGetItem,
        paramGetItem,
        value
      ) {
        const isDataModel = ![
          'connector',
          'custom-connector',
          'expression',
        ].includes(datasourceType);
        if (
          isDataModel &&
          formTypeWithInitValue &&
          _id &&
          !equal(_id, this.data._preDataId)
        ) {
          this.setData({ isLoadingData: true });
        }
        clearTimeout(this.data._delayRef.current.initTimer);
        // eslint-disable-next-line rulesdir/no-timer
        this.data._delayRef.current.initTimer = setTimeout(() => {
          if (!dataSourceName) {
            this.setData({ loadingStatus: 'done' });
            if (datasourceType !== 'expression') {
              return;
            }
          }
          if (isDataModel) {
            if (_id && !equal(_id, this.data._preDataId)) {
              this.setData({ _preDataId: _id });
              this._initValue();
            }
          } else {
            if (
              methodGetItem &&
              paramGetItem &&
              !equal(paramGetItem, this.data.preParamGetItem)
            ) {
              this.setData({ preParamGetItem: paramGetItem });
              this._initValue();
            }
            if (datasourceType === 'expression') {
              if (!isNil(value) && !equal(value, this.data.preValue)) {
                this.setData({ preValue: value });
                this._initValue();
              }
            }
          }
          // if (formType === 'create') {
          //   this._initValueFormDetail();
          // }
          // this._initDataSourceFieldsWithAuth();
        }, debounceMs);
      },
    '_formItemMap, authValue': function (formItemMap, authValue) {
      if (typeof authValue !== 'object') return;
      const { isDataModel, dataSourceFieldsWidthAuthList = emptyArray } =
        authValue;
      if (isDataModel) {
        Object.keys(formItemMap).forEach((name) => {
          const item = formItemMap[name];
          const fieldPermissions = dataSourceFieldsWidthAuthList.filter(
            (fieldPermission) => {
              return fieldPermission[name];
            }
          );
          if (fieldPermissions.length > 0) {
            const fieldPermission = fieldPermissions[0][name];
            if (fieldPermission === 'rw') {
              item.setVisible?.(true);
            } else if (fieldPermission === 'r') {
              item.setVisible?.(true);
              item.setReadOnly?.(true);
            } else if (fieldPermission === 'n') {
              item.setVisible?.(false);
            }
          }
        });
      }
    },
    initialValues: function (initialValues) {
      this.$instanceRef.current = this.$instanceRef.current ?? {};
      this.$instanceRef.current.initialValues = initialValues;
    },
    layout: function (layout) {
      this.$instanceRef.current = this.$instanceRef.current ?? {};
      this.$instanceRef.current.layout = layout;
    },
    formData: function (formData) {
      this.setReadonlyAttributes &&
        this.setReadonlyAttributes({
          value: formData,
        });
    },
    authValue: function (authValue) {
      this.setReadonlyAttributes &&
        this.setReadonlyAttributes({
          authValue,
        });
    },
    'dataSourceProfile, formData, formType, _id': function (
      dataSourceProfile,
      formData,
      formType,
      _id
    ) {
      const submitParams = convertFormDataToSubmitParams(
        dataSourceProfile,
        formData,
        formType,
        _id,
        Object.keys(this.data._formItemMap)
      );
      if (this.setReadonlyAttributes) {
        this.setReadonlyAttributes({ submitParams });
      }
    },

    'formType,dataSourceName,layout,errors,remoteValue,formData,dataSourceProfile,datasourceType,methodCreate,methodUpdate,methodGetItem,isDisabledSubmit':
      function () {
        this.updateWidgetAPI();
      },
    isLoadingData: function (isLoadingData) {
      if (isLoadingData === false) {
        this.setData({ loadingStatus: 'done' });
        return;
      }
      this.setData({ loadingStatus: 'loading' });
      if (this._loadingTimeoutId) {
        clearTimeout(this._loadingTimeoutId);
      }
      // eslint-disable-next-line rulesdir/no-timer -- 1 秒后仍在loading 才显示 loading
      this._loadingTimeoutId = setTimeout(() => {
        if (this.data.isLoadingData === true) {
          this.setData({
            loadingStatus: 'loading',
          });
        }
      }, LOADING_THRESHOLD);
    },
  },
});
