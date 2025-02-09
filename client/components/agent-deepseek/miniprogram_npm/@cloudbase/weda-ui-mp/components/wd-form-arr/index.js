/* eslint-disable @typescript-eslint/no-magic-numbers */
import itemBehavior from '../form-field-behavior/item-behavior';
import { noop } from '../../utils/constant';
import { commonCompBehavior } from '../../utils/common-behavior';
import formFieldBehavior from '../form-field-behavior/form-field-behavior';
import { isNil, deepClone } from '../../utils/lodash';
import debounce from '../../utils/debounce';
import lodashGet from 'lodash.get';
import lodashSet from 'lodash.set';

import equal from '../../utils/deepEqual';

/**
 * 获取待操作的数据路径，嵌套表单中子组件的名称是按lodashSet形式拼接的，在更新嵌套表单值时，要去除掉当前嵌套表单的路径名称
 * @param operateName 待操作的表单项名称
 * @param currentName 当前表单项名称
 * @returns
 */
const getValueName = (operateName, currentName) =>
  operateName.replace(new RegExp(`^${currentName}(\\.)?`), '');

Component({
  options: { virtualHost: true },
  behaviors: [itemBehavior, commonCompBehavior, formFieldBehavior],
  properties: {
    classRoot: {
      type: String,
      value: 'form-obj',
    },
    addDefaultValue: {
      type: null,
      value: {},
    },
    mode: {
      type: String,
      value: 'obj',
    },
  },
  data: {
    status: 'edit',
    objValue: [],
    formsItemMap: {},
  },
  lifetimes: {
    created() {
      this.updateChildValue = debounce(this.updateChildValueDebounce, 0);
    },
    attached: function () {
      const that = this;
      this.updateWidgetAPI({
        getConfig() {
          return {
            componentType: 'formObj',
          };
        },
        /**
         * 外部直接set嵌入表单的值
         * @param value
         */
        setValue(value) {
          that.change({ name: '', value }, { isUpdateParentForm: true });
        },
        add() {
          that.change({ type: 'add' }, { isUpdateParentForm: false });
        },
        remove({ index = -1 } = {}) {
          that.change(
            { type: 'remove', value: index },
            { isUpdateParentForm: false }
          );
        },
        change(params) {
          that.change(params, { isUpdateParentForm: true });
        },
        /**
         * 用于同步子组件的默认值
         * @param params
         */
        __setValueImmediate__(params) {
          that.changeByChildFormObj(params);
        },
        /**
         * 嵌套表单内部子组件值改变时，触发嵌套表单组件的值更新
         * @param params.name 子组件名称
         * @param params.value 子组件值
         */
        valueChangeFromChild(params = {}) {
          if (!params.name) return;

          // 由于是子组件值变更触发，所以嵌套表单值更新后不再次触发子组件值变更
          that.change(params, {
            isUpdateParentForm: true,
            isUpdateChildValue: false,
          });
        },
        /**
         * 收集嵌套表单内的子组件实例，以便嵌套表单值变化时，主动触发子组件值更新
         * @param childName 子组件名称
         * @param formItem 子组件$widget
         * @returns
         */
        addFormItem(childName, formItem) {
          if (
            isNil(childName) ||
            !formItem ||
            (typeof childName === 'string' && childName.length === 0)
          ) {
            // childName 没设置或为空串的时候不受表单容器控制
            console.warn(
              `组件 #${formItem?.id} 表单key(表单输入类组件 childName 属性)没设置或为空串的时候不受表单容器控制`
            );
            return noop;
          }
          const { formsItemMap } = that.data;
          if (Array.isArray(formsItemMap[childName])) {
            formsItemMap[childName].push(formItem);
          } else {
            formsItemMap[childName] = [formItem];
          }
          that.setData({ formsItemMap });
          return () => {
            const removedArr = formsItemMap[childName].filter(
              (item) => item !== formItem
            );
            if (removedArr.length <= 0) {
              delete formsItemMap[childName];
            } else {
              formsItemMap[childName] = removedArr;
            }
            that.setData({ formsItemMap });
          };
        },
      });
    },
  },
  methods: {
    sleep(cb, time = 100) {
      return new Promise((resolve) => {
        // eslint-disable-next-line rulesdir/no-timer
        setTimeout(() => {
          cb?.();
          resolve(true);
        }, time);
      });
    },
    updateWidgetAPI(apis = {}) {
      const { name, objValue, label, visible, readOnly, disabled, status } =
        this.data;
      this.setReadonlyAttributes?.({
        ...apis,
        label,
        name,
        value: objValue,
        visible,
        disabled,
        readOnly,
        status,
        formObjName: name,
        getValue() {
          return objValue;
        },
      });
    },
    // 父级普通表单对象
    getParentForm() {
      const parent = this?.$widget?.closest(
        (w) => w.getConfig?.().componentType === 'form'
      );
      return parent;
    },
    // 父级嵌套表单对象
    getParentFormObj() {
      const parent = this?.$widget?.closest(
        (w) => w.getConfig?.().componentType === 'formObj'
      );
      return parent;
    },
    /**
     * 对外触发嵌套表单的onDataChange事件
     */
    triggerOnDataChange(value) {
      this.triggerEvent('onDataChange', { data: value });
    },
    /**
     * 不在表单容器中使用时，更新子组件值
     */
    updateChildValue() {},
    updateChildValueDebounce(value) {
      Object.keys(this.data.formsItemMap).forEach((childName) => {
        let items = this.data.formsItemMap[childName];

        if (!Array.isArray(items)) {
          items = [items];
        }
        const newValue = lodashGet(
          value,
          getValueName(childName, this.data.name)
        );
        items.forEach((item) => {
          if (item?.setValue && !equal(item.value, newValue)) {
            item.setValue(newValue);
          }
        });
      });
    },
    /**
     * 更新值
     * @param params.name
     * @param params.value
     * @param params.type 'change' | 'add' | 'remove'
     * @param param1.isUpdateParentForm 是否更新父级表单，因子组件值变化调用change时不去触发父表单的更新，因为子组件自己会触发；因为外部设置了值，则触发父表单更新
     * @param param1.isUpdateChildValue 是否更新子组件值, 因子组件值变化调用change时不去触发updateChildValueWithoutForm；因为外部设置了值，则触发updateChildValueWithoutForm去更新子组件值
     * @returns
     */
    getTempValue(value) {
      if (Array.isArray(value)) {
        return value.map((i = {}) => {
          const item = {};
          Object.keys(i).forEach((j) => {
            if (j) {
              item[j] = i[j] || null;
            }
          });
          return item;
        });
      }
      return value;
    },
    change(
      params,
      { isUpdateParentForm = false, isUpdateChildValue = true } = {}
    ) {
      const { objValue, name, addDefaultValue } = this.data;
      let value = deepClone(params.value);

      // 顶层为数组类型
      if (Array.isArray(objValue)) {
        // 触发添加操作，则增加一个undefined值
        if (params.type === 'add') {
          value = deepClone(objValue);
          value.push(addDefaultValue);
        }

        // 触发删除操作，则删除对应索引的值
        if (params.type === 'remove') {
          value = deepClone(objValue);
          value = [
            ...value.slice(0, params.value),
            ...value.slice(params.value + 1),
          ];
        }
      }

      // 如果有更新标识，则按标识路径更新值
      if (params.name) {
        value = deepClone(objValue);
        lodashSet(value, getValueName(params.name, name), params.value);
      }

      const tempValue = this.getTempValue(value);

      const tempObjValue = this.getTempValue(objValue);
      if (equal(tempValue, tempObjValue)) {
        return;
      }

      this.setData({ objValue: value || [] });

      if (isUpdateChildValue) {
        // 外部设置数据，同时去更新子组件的值
        // 延迟更新，避免子组件默认值覆盖当前值
        this.sleep(() => this.updateChildValue(value));
      }

      const parentForm = this.getParentForm();
      const parentFormObj = this.getParentFormObj();

      // 不存在父级嵌套表单时，去更新父级普通表单，避免重复更新
      if (!parentFormObj && isUpdateParentForm) {
        // 触发父级普通表单值更新
        // 子组件向上同步值，不调用setValue
        // parentForm?.setValue?.({ [name]: value }, false, true);
        // 刷新父级普通表单的formData
        parentForm?.updateFormContext();
      }

      if (params.name) {
        // 触发父级嵌套表单值更新
        parentFormObj?.__setValueImmediate__?.({
          name: params.name,
          value: params.value,
        });
      } else if (parentFormObj?.formObjName) {
        // 外部直接调用formObj.setValue的情况下，触发父级嵌套表单值更新
        parentFormObj?.__setValueImmediate__?.({ name, value });
      }

      this.triggerOnDataChange(value);
    },
    /**
     * 子组件默认值变更，触发嵌套表单值更新
     * @param params.name
     * @param params.value
     */
    changeByChildFormObj(params) {
      const { objValue, name } = this.data;
      const value = deepClone(objValue);
      lodashSet(value, getValueName(params.name, name), params.value);

      const tempValue = this.getTempValue(value);

      const tempObjValue = this.getTempValue(objValue);
      if (equal(tempValue, tempObjValue)) {
        return;
      }
      this.setData({ objValue: value || [] });

      const parentFormObj = this.getParentFormObj();
      const parentForm = this.getParentForm();

      if (params.name) {
        // 判断是否将当前的name前缀加上，以便父级嵌套表单更新值
        const nameTemp = `${
          !params.name.startsWith(name) && name ? `${name}.` : ''
        }${params.name}`;
        // 将值同步给父级嵌套表单
        parentFormObj?.__setValueImmediate__?.({
          name: nameTemp,
          value: params.value,
        });
      } else if (parentFormObj?.formObjName) {
        // 外部直接调用formObj.setValue的情况下，触发父级嵌套表单值更新
        parentFormObj?.__setValueImmediate__?.({ name, value });
      }

      if (!parentFormObj && parentForm) {
        // 触发父级普通表单值更新
        // 子组件向上同步值，不调用setValue
        // parentForm?.setValue?.({ [name]: value }, false, true);
        // 刷新父级普通表单的formData
        parentForm?.updateFormContext();
      }
    },
  },
  observers: {
    'disabled, readOnly': function (disabled, readOnly) {
      if (readOnly) {
        this.setData({ status: 'readOnly' });
      } else if (disabled) {
        this.setData({ status: 'disabled' });
      } else {
        this.setData({ status: 'edit' });
      }
      this.updateWidgetAPI();
    },
    value: function (value) {
      this.setData({ objValue: value });
      this.updateWidgetAPI();
      // 避免初始化的时候，整个数组值被子组件初始值覆盖
      this.sleep(() => {
        this.change({ value }, { isUpdateParentForm: true });
      });
    },
    objValue: function () {
      this.updateWidgetAPI();
      // 更新子组件的值需要主动去调用，不被动执行
      // 如果是最顶层的嵌套表单，则去更新子组件的值，否则自己的值更新不去触发子组件值更新，因为父级普通表单会去更新
      // const parentFormObj = this.getParentFormObj();
      // if (!parentFormObj) {
      //   // this.updateChildValue(objValue);
      // }
    },
  },
});
