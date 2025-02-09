import { randomStr } from '../../utils/platform';
import { commonCompBehavior } from '../../utils/common-behavior';
import { WD_INPUT_LAYOUT } from '../../utils/enum';

import formFieldBehavior from '../form-field-behavior/form-field-behavior';
import itemBehavior from '../form-field-behavior/item-behavior';

import equal from '../../utils/deepEqual';
Component({
  options: {
    virtualHost: true,
  },
  behaviors: [itemBehavior, commonCompBehavior, formFieldBehavior],
  properties: {
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
    name: {
      type: String,
      value: '',
    },
    value: { type: Array, value: [] },
    isPureArray: { type: Boolean, value: false },
    disabled: { type: Boolean, value: false },
    readOnly: { type: Boolean, value: false },
    fieldAuth: { type: String, value: 'rw' },
    hasInitValue: { type: Boolean, value: false },
    isWdFormDetail: { type: Boolean, value: false },
    label: {
      type: String,
      value: '',
    },
    classRoot: {
      type: String,
      value: 'form-detail',
    },
  },
  data: {
    contextData: [],
    childFormItem: [],
    preValue: [],
    isAuthVisible: true,
    isDisabled: false,
    _layout: 'vertical',
  },
  observers: {
    value: function (value) {
      this.setFormDetailValue(value);
    },
    fieldAuth: function (fieldAuth) {
      this.setData({
        isAuthVisible: fieldAuth !== 'n',
        isDisabled: !fieldAuth?.includes('w') || this.data.disabled,
      });
    },
    disabled: function (disabled) {
      this.setData({
        isDisabled: !this.data.fieldAuth?.includes('w') || disabled,
      });
    },
    'name,value,label,visible,readOnly,disabled,preValue': function () {
      this.updateWidgetAPI();
    },
    layout: function (layout) {
      const _layout =
        WD_INPUT_LAYOUT.find((item) => item.value === layout)?.value ||
        'vertical';
      this.setData({ _layout });
    },
  },
  methods: {
    setFormDetailValue(value) {
      const childFormItem = this.getChildFormItem(value);
      this.setData({ childFormItem });
      if (!equal(value, this.data.preValue) && childFormItem.length > 0) {
        this.init(value, childFormItem);
        this.setData({ preValue: value });
        const { name } = this.data;
        const parent = this.getParentForm();
        // eslint-disable-next-line rulesdir/no-timer
        setTimeout(() => {
          // 子表单值变化时，若form值不同步，则主动同步（默认值为变量的情况）
          if (value && !equal(parent?.value?.[name], value)) {
            parent.setValue({ [name]: value });
          }
        }, 300);
      }
    },
    init(value, childFormItem) {
      const { name, isPureArray } = this.data;

      const initialValues = value?.map((i, index) => {
        let item = {};
        if (isPureArray) {
          item['arrayItem'] = { name: `${name}[${index}]`, value: i };
        } else {
          item = { ...i };
          childFormItem.forEach((j) => {
            const key = `${name}[${index}].${j}`;
            const val = i[j] || null;
            item[j] = { name: key, value: val };
          });
        }

        item.index = index;
        item._id = randomStr();
        return item;
      });
      console.log('formdetail', value, initialValues);
      this.setData({ contextData: initialValues });
      this.triggerEvent('onDataChange', {
        data: initialValues,
      });
    },
    reorderContext(data, name) {
      const { isPureArray } = this.data;
      return data.map((i, index) => {
        const item = { ...i };
        Object.keys(i).forEach((j) => {
          if (item[j]?.name) {
            item[j].name = isPureArray
              ? `${name}[${index}]`
              : `${name}[${index}].${j}`;
          }
        });
        item.index = index;
        return item;
      });
    },
    newContextItem(childFormItem, name) {
      const { isPureArray } = this.data;
      const mock = { index: 0, _id: randomStr() };
      childFormItem?.forEach((i) => {
        mock[i] = {
          name: isPureArray ? `${name}[0]` : `${name}[0].${i}`,
          value: '',
        };
      });
      return mock;
    },
    onChange(type, params) {
      if (
        this.data.disabled ||
        this.data.readOnly ||
        !this.data.fieldAuth.includes('w')
      ) {
        return;
      }
      const { contextData } = this.data;
      let data;
      try {
        data = JSON.parse(JSON.stringify(contextData));
      } catch (e) {}
      data = Array.isArray(data) ? data : [];
      const { name } = this.data;
      switch (type) {
        case 'add': {
          let childFormItem = this.data.childFormItem;
          if (this?.$widget?.closest) {
            childFormItem = this.getChildFormItem();
            this.setData({ childFormItem });
          }
          const mock = this.newContextItem(childFormItem, name);
          data.push({ ...mock, _id: randomStr() });
          data = this.reorderContext(data, name);
          break;
        }
        case 'remove': {
          data.splice(params.index, 1);
          data = this.reorderContext(data, name);
          break;
        }
        case 'change': {
          data = data.map((i) => {
            const item = { ...i };
            for (const [key, subItem] of Object.entries(item)) {
              if (params.name === subItem?.name) {
                item[key].value = params?.value;
              }
            }
            return item;
          });
          break;
        }
        default: {
          break;
        }
      }
      if (!equal(data, contextData)) {
        this.setData({ contextData: data });
        this.updateFormDetailValue(data);
        this.triggerEvent('onDataChange', {
          data,
        });
      }
    },
    updateFormDetailValue(contextData) {
      // 更新子表单value值
      const { isPureArray, childFormItem } = this.data;
      const value = isPureArray
        ? contextData?.map((i) => i?.arrayItem?.value || '')
        : contextData?.map((i) => {
            const item = {};

            childFormItem?.forEach((j) => {
              item[j] = i[j]?.value;
            });
            return item;
          });
      this.setData({ preValue: value });
      // 更新properties值
      if (this.$node) {
        this.$node.value = value;
      }
    },
    // 获取父表单容器
    getParentForm() {
      const parent = this?.$widget?.closest(
        (w) => w.getConfig?.().componentType === 'form'
      );
      return parent;
    },
    updateWidgetAPI(apis = {}) {
      const { name, preValue, label, visible, readOnly, disabled } = this.data;
      const that = this;
      this.setReadonlyAttributes &&
        this.setReadonlyAttributes({
          ...apis,
          name,
          value: preValue,
          label,
          visible,
          readOnly,
          disabled,
          isTableView: false,
          setValue(val) {
            that.setFormDetailValue(val);
          },
        });
    },
    // 获取明细组件子项初始值
    getChildFormItem(value) {
      let childFormItem = [];
      try {
        const { isPureArray, name, value: defaultValue } = this.data;
        value = value || defaultValue;
        const parent = this.getParentForm();
        let fieldSchema = null;
        if ('model' === parent?.datasourceType) {
          fieldSchema = parent?.dataSourceProfile?.schema?.properties?.[name];
        } else if (
          ['connector', 'custom-connector'].includes(parent?.datasourceType)
        ) {
          const method =
            parent?.methodCreate ||
            parent?.methodUpdate ||
            parent?.methodGetItem;
          const inParams = parent?.dataSourceProfile?.methods?.find(
            (i) => i.name === method
          )?.inParams;
          fieldSchema = inParams?.properties?.[name];
        }
        childFormItem = fieldSchema?.items?.properties
          ? Object.keys(fieldSchema?.items?.properties)
          : [];

        // 兼容旧的子表单，form上取不到schema信息，取value值兜底
        if (!childFormItem?.length) {
          childFormItem = value?.[0] ? Object.keys(value[0]) : [];
        }

        // 纯数组，默认key值为'arrayItem'
        if (isPureArray) {
          childFormItem = ['arrayItem'];
        }
      } catch (e) {}
      return childFormItem;
    },
  },
  lifetimes: {
    attached: function () {
      this.updateWidgetAPI({
        getConfig: () => {
          return {
            componentType: 'formdetail',
          };
        },
        addition: () => {
          this.onChange('add', null);
        },
        remove: (params) => {
          this.onChange('remove', params);
        },
        change: (params) => {
          this.onChange('change', params);
        },
      });
      this.setData({ id: this.id });
      const { value } = this.data;
      const childFormItem = this.getChildFormItem(value);

      this.setData({ childFormItem });
      // 只有存在初始值的时候,才初始化明细单项
      if (this.data.hasInitValue || this.data.isWdFormDetail) {
        this.init(value, childFormItem);
        this.setData({ preValue: value });
      } else {
        this.triggerEvent('onDataChange', {
          data: [],
        });
      }
    },
    detached: function () {
      this.triggerEvent('onDataChange', {
        data: [],
      });
    },
  },
});
