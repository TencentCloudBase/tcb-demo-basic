import { validType } from './validator';
import equal from '../../utils/deepEqual';
import { errorHandler } from '../../utils/error';

import { autorun, untracked } from 'mobx';
import {
  convertStatus,
  convertRules,
  convertMethodParam,
} from '../../utils/getFormLegacy';

export default Behavior({
  behaviors: [],
  properties: {
    name: {
      type: String,
    },
    rules: {
      type: Array,
      value: [],
    },
    value: {
      type: null,
    },
    readOnly: {
      type: Boolean,
      value: false,
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    required: {
      type: Boolean,
      value: false,
    },
    requiredFlag: {
      type: Boolean,
      value: true,
    },
    labelVisible: {
      type: Boolean,
      value: true,
    },
    label: {
      type: String,
      value: '标题',
    },
    requiredMsg: {
      type: String,
      value: '该项为必填项',
    },
    layout: {
      type: String,
      value: 'auto',
    },
    validateStatus: {
      Type: String,
      value: 'success',
    },
    submitFormatter: {
      type: Object,
      value: null,
    },
    status: { type: null },
  },
  data: {
    _oldName: undefined,
    _oldValue: undefined,
    _layout: undefined,
    _validateStatus: undefined,
    _status: undefined,
    _privateRules: {},

    /** @type {'success' | 'error' | 'undefined'} */
    validateState: undefined,
    validateErrorMsg: '',
    visible: true,
    valueHistory: [],
    actualLayout: '',
    privateRules: [], // 带有前后缀+必填时，添加额外校验
    selfDefineRules: [], // 组件自定义的规则
  },
  lifetimes: {
    attached() {
      const that = this;
      this._attached = true;
      this.setReadonlyAttributes({
        value: that.data.value,
        setValue(val) {
          const value = convertMethodParam(val);
          that.setData({ value });
          // that.triggerEvent('change', {value}) 不要在非用户输入的地方触发事件
        },
        getValue: that.getValue.bind(that),
        setReadOnly: that.setReadOnly.bind(that),
        setDisabled: that.setDisabled.bind(that),
        setVisible: that.setVisible.bind(that),
        setHidden() {
          that.setVisible(false);
        },
        async handleValidate(throwError = true) {
          let finalValue = that.data.value;
          const {
            required,
            rules,
            requiredMsg,
            privateRules,
            selfDefineRules,
            label,
          } = that.data;
          const _rules = [].concat(rules, privateRules, selfDefineRules);
          if (!required && !_rules.length) return;
          if (finalValue) {
            if (typeof finalValue === 'string') {
              if (finalValue.trim) {
                finalValue = finalValue.trim();
              } else {
                finalValue = finalValue.replace(/(^\s*)|(\s*$)/g, '');
              }
            }
          }

          const validPromise = [];
          if (required) {
            if (!validType.required(finalValue)) {
              validPromise.push(
                Promise.resolve({ format: 'required', message: requiredMsg })
              );
            }
          }

          if (finalValue) {
            if (_rules.length) {
              const validResult = [];
              const isPass = _rules.some((item) => {
                if (!item.format && !item.pattern && !item.func) {
                  // console.log(item)
                  // throw new Error('验证规则必须配置 format/pattern');
                  return true;
                }
                if (item.format) {
                  const typeFunc = validType[item.format];
                  if (typeFunc && !typeFunc(String(finalValue))) {
                    // console.log("format 校验>>>>")
                    validResult.push(Promise.resolve(item));
                    return false;
                  }
                } else if (item.pattern) {
                  // 正则校验
                  // console.log("pattern 校验>>>>")
                  try {
                    let reg;
                    if (typeof item.pattern === 'string') {
                      const m = item.pattern.match(/(\/?)(.+)\1([a-z]*)/i);
                      if (
                        m[3] &&
                        !/^(?!.*?(.).*?\1)[gmixXsuUAJ]+$/.test(m[3])
                      ) {
                        reg = RegExp(item.pattern);
                      } else {
                        reg = new RegExp(m[2], m[3]);
                      }
                    } else {
                      reg = new RegExp(item.pattern);
                    }
                    if (!reg.test(String(finalValue))) {
                      validResult.push(Promise.resolve(item));
                      return false;
                    }
                  } catch (e) {}
                } else if (item.func) {
                  // 校验规则是函数的时候
                  if (!item.func(finalValue)) {
                    // 如果提示信息是通过函数动态生成，则执行
                    if (item.messageFunc) {
                      item.message = item.messageFunc(finalValue);
                    }
                    validResult.push(Promise.resolve(item));
                    return false;
                  }
                }
                return true;
              });
              if (!isPass) {
                validPromise.push(...validResult);
              }
            }
          }
          const errorArr = await Promise.all(validPromise).then((arr) => {
            return arr.filter((item) => item !== void 0);
          });

          if (errorArr.length > 0) {
            that.setData({
              validateState: 'error',
              validateErrorMsg: errorArr[0].message,
            });
            if (throwError) {
              const { compError } = errorHandler({
                code: 'VALIDATE_ERROR',
                error: errorArr,
                message: `【${label}】${errorArr[0]?.message}`,
              });
              throw compError;
            }
          } else {
            // console.log("校验成功>>>>>>>")
            that.setData({
              validateState: 'success',
              validateErrorMsg: '',
            });
          }
          return errorArr;
        },
        name: that.data.name,
        forceUpdate: () => {
          that.setData({ __forceUpdate: (that.data.__forceUpdate ?? 0) + 1 });
        },
        clearValidate: that.clearValidate.bind(that),
        clearValue: () => {
          that.setData({ value: null });
        },
      });
      Promise.resolve().then(() => {
        this._reaction = autorun(() => {
          const form = untracked(() => {
            return this.$widget?.closest(
              (w) => w.getConfig?.()?.componentType === 'form'
            );
          });

          if (
            form &&
            (this.data.layout === 'auto' || this.data.layout === '')
          ) {
            if (form.layout !== this.data.actualLayout) {
              // 在 form 里面
              this.setData({ actualLayout: form.layout });
              return;
            }
          }
        });
      });

      if (typeof this.$widget !== 'object') return;
      // const form = this.$widget.closest(
      //   (w) => w.getConfig?.()?.componentType === 'form'
      // );

      //   if (form) {
      //     // 在 form 里面
      //     this._removeFormItem = form.addFormItem(this.data.name, this.$widget);

      //     // 双向同步
      //     const val = lodashGet(form.initialValues, this.data.name);
      //     if (
      //         this.runOne !== true &&
      //       !this.data.value &&
      //       typeof form.initialValues === 'object' &&
      //       val
      //     ) {
      //       console.log('FORM SETVALUE 双向向上', form);
      //       this.setData({ value: val });
      //       this.runOne = true
      //     }
      //   }
    },
    detached() {
      this._removeFormItem && this._removeFormItem();
      // 清空嵌套表单
      this._removeFormObjItem?.();
      if (this.$widget) {
        const form = this.$widget.closest(
          (w) => w.getConfig?.()?.componentType === 'form'
        );

        form?.updateFormContext(this.data.name, undefined);
      }
      this._reaction?.();
      this._attached = false;
    },
  },
  methods: {
    getValue() {
      if (this.properties.submitFormatter !== null) {
        return this.properties.submitFormatter(this.data.value);
      }
      return this.data.value;
    },
    clearValidate() {
      this.setData({
        validateState: undefined,
        validateErrorMsg: '',
      });
    },
    setVisible(val) {
      const value = convertMethodParam(val);
      if (typeof value !== 'boolean') {
        console.warn('参数需要为boolean');
        return;
      }
      this.setData({ visible: value });
    },
    setDisabled(val) {
      const originalValue = this.data.disabled;
      const value = convertMethodParam(val);
      if (value !== originalValue) {
        this.setData({ disabled: value });
      }
      return () => {
        this.setData({
          disabled: originalValue,
        });
      };
    },
    setReadOnly(val) {
      const [originalReadOnly, originalDisabled] = [
        this.data.readOnly,
        this.data.disabled,
      ];
      const value = convertMethodParam(val);
      if (value !== originalReadOnly) {
        // 先用disabled属性来做
        this.setData({ disabled: value, readOnly: value });
      }
      return () => {
        this.setData({
          readOnly: originalReadOnly,
          disabled: originalDisabled,
        });
      };
    },
  },
  observers: {
    name: function (newName) {
      if (newName === this.data._oldName) return;
      Promise.resolve().then(() => {
        this._removeFormItem?.();
        // 清空嵌套表单
        this._removeFormObjItem?.();

        // this.$instanceRef.current = this.$instanceRef.current ?? {};
        this.setReadonlyAttributes?.({ name: newName });
        // this.$instanceRef.current.name = newName;
        this.data._oldName = newName;
        if (typeof this.$widget !== 'object') return;
        const form = this.$widget?.closest?.(
          (w) => w.getConfig?.()?.componentType === 'form'
        );

        if (form) {
          // 在 form 里面
          this._removeFormItem = form.addFormItem(this.data.name, this.$widget);
          if (!Object.prototype.hasOwnProperty.call(form?.value, newName)) {
            form?.updateFormContext(this.data.name, this.data.value);
          }
        }

        const formObj = this.$widget?.closest?.(
          (w) => w.getConfig?.()?.componentType === 'formObj'
        );

        if (formObj) {
          // 添加子组件到嵌套表单里面
          this._removeFormObjItem = formObj.addFormItem(
            this.data.name,
            this.$widget
          );
        }
      });
    },
    value: function (value) {
      if (equal(this.data._oldValue, value)) return;
      if (this.$node) {
        this.$node.value = value;
      }
      this.data._oldValue = value;
      if (this._attached === true) {
        this.data.valueHistory.push(value);
        this.$instanceRef.current = this.$instanceRef.current ?? {};
        this.$instanceRef.current.value = value;

        if (this.$widget) {
          const form = this.$widget.closest(
            (w) => w.getConfig?.()?.componentType === 'form'
          );
          const formObj = this.$widget.closest(
            (w) => w.getConfig?.()?.componentType === 'formObj'
          );
          // 有父级嵌套表单的不更新form值，父级嵌套表单会去更新
          !formObj && form?.updateFormContext(this.data.name, value);
          formObj?.valueChangeFromChild?.({
            name: `${formObj?.formObjName ? `${formObj.formObjName}.` : ''}${
              this.data.name
            }`,
            value,
          });
        }

        // console.log(this.data.name, this.data.valueHistory, 'VALUE history');
        this.data._oldValue = value;
      }
    },
    layout: function (layout) {
      if (layout === this.data._layout) return;
      Promise.resolve().then(() => {
        this.data._layout = layout;
        if (!layout || layout === 'auto') {
          const form = this.$widget.closest(
            (w) => w.getConfig?.()?.componentType === 'form'
          );

          if (form) {
            // 在 form 里面
            this.setData({ actualLayout: form.layout });
            return;
          }
        }
        this.setData({ actualLayout: layout });
      });
    },
    validateStatus: function (validateStatus) {
      if (validateStatus === this.data._validateStatus) return;
      this.data._validateStatus = validateStatus;
      this.setData({
        validateState: validateStatus,
      });
    },
    status: function (status) {
      if (status === this.data._status) return;
      this.data._status = status;
      const { disabled: _disabled, readOnly: _readOnly } = this.data;
      const statusParams = convertStatus(status, _disabled, _readOnly);
      const form = this?.$widget?.closest(
        (w) => w.getConfig?.()?.componentType === 'form'
      );
      let disabled = statusParams.disabled;
      let readOnly = statusParams.readOnly;
      if (form) {
        disabled = statusParams.disabled || form.formType === 'read';
        readOnly = statusParams.readOnly || form.formType === 'read';
      }
      this.setData({ disabled, readOnly });
    },
    'required,before,after,requiredMsg,isUnionValue': function (
      required,
      before,
      after,
      requiredMsg,
      isUnionValue
    ) {
      const newPrivateRules = {
        required,
        before,
        after,
        requiredMsg,
        isUnionValue,
      };
      if (equal(newPrivateRules, this.data._privateRules)) return;
      this.data._privateRules = newPrivateRules;
      let privateRules = convertRules(
        required,
        before,
        after,
        requiredMsg,
        isUnionValue
      );
      this.setData({ privateRules });
    },
  },
});
