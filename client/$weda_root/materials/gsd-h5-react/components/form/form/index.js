import {
  getDataSourceByName,
  callDataSource,
  callConnector,
} from '../../../utils/tcb';
import equal from '../../../utils/deepEqual';
const formTypeWithInitValue = ['edit', 'read'];

Component({
  options: {
    multipleSlots: true,
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
    formType: {
      type: String,
      value: '',
    },
    datasourceType: {
      type: String,
      value: '',
    },
    _id: {
      type: String,
      value: '',
    },
    dataSourceName: {
      type: String,
      value: '',
    },
    methodGetItem: {
      type: String,
      value: '',
    },
    paramGetItem: {
      type: Object,
      value: '',
    },
  },
  lifetimes: {
    attached: function () {
      this._initDataSourceFieldsWithAuth();
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  data: {
    preParamGetItem: undefined,
    preDataId: undefined,
    delayRef: { current: { version: null, initTimer: null } },
  },
  methods: {
    // 获取表单初始值
    _initValue: async function () {
      const fetchVersion = (this.data.delayRef.current.version = Date.now());
      const {
        formType,
        datasourceType,
        dataSourceName,
        _id,
        methodGetItem,
        paramGetItem,
      } = this.properties;
      const isDataModel = !['connector', 'custom-connector'].includes(
        datasourceType
      );
      try {
        let callDb = callDataSource;
        let methodName = 'wedaGetItem';
        let params = _id ? { _id } : null;
        if (!isDataModel) {
          callDb = callConnector;
          methodName = methodGetItem;
          params = paramGetItem;
        }
        if (
          formTypeWithInitValue.includes(formType) &&
          dataSourceName &&
          methodName &&
          params &&
          callDb
        ) {
          const initValue = await callDb({
            dataSourceName,
            methodName,
            params,
          });
          if (
            Object.keys(initValue).length !== 0 &&
            fetchVersion === this.data.delayRef.current.version
          ) {
            this.triggerEvent('onInitValue', initValue);
          }
        }
      } catch (e) {
        this._alertError();
      }
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
      const isDataModel = !['connector', 'custom-connector'].includes(
        datasourceType
      );
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
          this.triggerEvent('onInitDataSourceFieldsWithAuth', authValue);
        } else {
          // 表单元素 if 默认是 false，需要通过onInitDataSourceFieldsWithAuth设置为true
          this.triggerEvent('onInitDataSourceFieldsWithAuth', { isDataModel });
        }
      } catch (err) {
        console.log('getDataSourceFieldsWithAuth err', err);
        this.triggerEvent('onInitDataSourceFieldsWithAuth', authValue);
        this._alertError(
          `获取数据源字段权限信息失败,字段权限可能无法正确展示,错误信息:${err}`
        );
      }
    },
  },
  observers: {
    'formType,datasourceType,dataSourceName,_id,methodGetItem,paramGetItem':
      function (
        formType,
        datasourceType,
        dataSourceName,
        _id,
        methodGetItem,
        paramGetItem
      ) {
        clearTimeout(this.data.delayRef.current.initTimer);
        // eslint-disable-next-line rulesdir/no-timer
        this.data.delayRef.current.initTimer = setTimeout(() => {
          const isDataModel = !['connector', 'custom-connector'].includes(
            datasourceType
          );
          if (!dataSourceName) return;
          if (isDataModel) {
            if (_id && !equal(_id, this.data.preDataId)) {
              this.setData({ preDataId: _id });
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
          }
          // 因编辑器render时序问题暂不上线
          this._initDataSourceFieldsWithAuth();
        }, 100);
      },
  },
});
