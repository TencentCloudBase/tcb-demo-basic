/* eslint-disable complexity */
/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import itemBehavior from '../form-field-behavior/item-behavior';
import { WD_PREFIX } from '../../utils/constant';
import { convertSize } from '../../utils/getFormLegacy';
import classNames from '../../utils/classnames';
import { commonCompBehavior } from '../../utils/common-behavior';
import formFieldBehavior from '../form-field-behavior/form-field-behavior';
import {
  dealDecimals,
  strNumAddCalc,
  isNumber,
  dealPercent,
  getPercentUnit,
} from './number';
import equal from '../../utils/deepEqual';

const getHasClearIcon = (clearable, focus, disabled, readOnly, realValue) =>
  clearable && focus && !disabled && !readOnly && isNumber(realValue);

const getRealValue = ({ value, format }) => {
  if (value === '') return null;

  const v = dealPercent(value, format === 'percent' ? 'del' : '');
  return Number(v.replace(/,/g, ''));
};

const judgeRule = ({
  value = undefined,
  max = undefined,
  min = undefined,
  resultType = 'boolean',
} = {}) => {
  let maxFit = true;
  let minFit = true;
  if (isNumber(max)) {
    maxFit = Number(value) <= max;
  }

  if (isNumber(min)) {
    minFit = Number(value) >= min;
  }

  return resultType === 'boolean' ? maxFit && minFit : { maxFit, minFit };
};

const getRuleMessage = ({
  value = undefined,
  max = undefined,
  min = undefined,
  validMsgObj = {},
} = {}) => {
  const { maxFit, minFit } = judgeRule({
    value,
    max,
    min,
    resultType: 'object',
  });

  return !maxFit ? validMsgObj.max : !minFit ? validMsgObj.min : '';
};

const getValidMsgObj = (format, max, min) => {
  const percent = format === 'percent' ? '%' : '';

  return {
    max: `请输入小于等于${max}${percent}的数值`,
    min: `请输入大于等于${min}${percent}的数值`,
  };
};

const getRules = (validMsgObj, max, min) => {
  return [
    {
      v: max,
      func: (value) => judgeRule({ value, max, min }),
      messageFunc: (value) => getRuleMessage({ value, max, min, validMsgObj }),
      message: validMsgObj.max,
    },
    {
      v: min,
      func: (value) => judgeRule({ value, max, min }),
      messageFunc: (value) => getRuleMessage({ value, max, min, validMsgObj }),
      message: validMsgObj.min,
    },
  ].filter((item) => isNumber(item.v));
};

/**
 * 可复用的输入组件
 */
Component({
  options: { virtualHost: true },
  behaviors: [itemBehavior, commonCompBehavior, formFieldBehavior],
  properties: {
    visible: {
      type: Boolean,
      value: true,
    },
    classRoot: {
      type: String,
      value: 'input-number',
    },
    thousandShow: {
      type: Boolean,
      value: false,
    },
    decimals: {},
    format: {
      type: String,
      value: 'number',
    },
    stepOption: {
      type: String,
      value: '',
    },
    step: {
      type: Number,
      value: 1,
    },
    min: {},
    max: {},
  },
  data: {
    isInit: true,
    root: '',
    classPrefix: WD_PREFIX,
    inputWrap: `${WD_PREFIX}-form-input-wrap`,
    inputCls: `${WD_PREFIX}-form-input-wrap__input`,
    inputGroup: `${WD_PREFIX}-form-input-group`,
    placeholderCls: `${WD_PREFIX}-form-input-wrap__placeholder`,
    cls: '',
    formClass: '',

    realValue: null,
    showValue: '',
    readValue: '',

    hasClearIcon: false,
    isFocus: false,

    _size: 'md',

    stepPlusDisabled: false,
    stepMinusDisabled: false,
  },
  methods: {
    updateWidgetAPI: function () {
      const {
        name,
        label,
        required,
        visible,
        disabled,
        readOnly,
        before,
        after,
        min,
        max,
        step,
        format,
        value,
      } = this.data;
      this.setReadonlyAttributes?.({
        name,
        value,
        label,
        required,
        visible,
        disabled,
        readOnly,
        before,
        after,
        min,
        max,
        step,
        format,
      });
    },
    stepAdd(e) {
      this.onRealChange(e, 'plus');
    },
    stepMinus(e) {
      this.onRealChange(e, 'minus');
    },
    onRealChange(e, type = '', { needSetData = true, value = '' } = {}) {
      const { readOnly, disabled, status, format, step } = this.properties;
      if (readOnly || disabled || (status && status !== 'edit'))
        return this.data.realValue;

      const { stepPlusDisabled, stepMinusDisabled } = this.getStepDisabled(
        null,
        this.data.realValue
      );

      if (['plus', 'minus'].includes(type)) {
        if (
          !isNumber(step) ||
          (type === 'plus' && stepPlusDisabled) ||
          (type === 'minus' && stepMinusDisabled)
        ) {
          needSetData &&
            this.setData({
              stepPlusDisabled,
              stepMinusDisabled,
            });
          return Number(value || this.data.showValue);
        }
      }

      const toShow = this.getShowValue({
        ...this.properties,
        value: value || this.data.showValue,
        type,
        needSetData,
      });
      const toReal = getRealValue({ value: toShow, format });
      const detail = { ...e.detail, value: toReal };

      if (needSetData) {
        this.changeForm(detail);
        this.triggerEvent('change', detail);
      } else {
        this.triggerEvent('input', detail);
      }

      const upDownState = this.getStepDisabled(null, toReal);

      needSetData &&
        this.setData({
          realValue: toReal,
          showValue: toShow,
          ...upDownState,
        });

      return toReal;
    },
    handleFocus: function (e) {
      const value = e.detail.value.replace(/,/g, '');
      this.triggerEvent('focus', { ...e.detail, value });
      this.setData({ isFocus: true, showValue: value });
    },
    handleBlur: function (e) {
      const toReal = this.onRealChange(e);
      this.triggerEvent('blur', { ...e.detail, value: toReal });

      this.setData({
        isFocus: false,
        showValue: this.getShowValue({
          ...this.properties,
          value: this.data.showValue,
        }),
        realValue: toReal,
      });
    },
    handleChange: function (e) {
      let value = e.detail.value;

      if (value === 'Infinity' || value === '-Infinity') {
        this.setData({ showValue: value });
        this.triggerEvent('input', { ...e.detail, value });
        return;
      }

      const reg = new RegExp(
        `^\\D*(\\d*(?:\\.\\d{0,${Math.max(0, 10000)}})?).*$`,
        'g'
      );
      value = value.replace(reg, '$1');

      if (e.detail.value.startsWith('-')) {
        value = `-${value}`;
      }

      this.setData({ showValue: value });

      this.onRealChange(e, '', { needSetData: false, value });
    },
    handleClear: function (e) {
      const detail = { ...e.detail, value: null };
      this.changeForm(detail);
      this.triggerEvent('clear', {
        ...detail,
        originValue: this.data.realValue,
      });
      this.triggerEvent('change', detail);
      this.setData({
        showValue: '',
        realValue: null,
        validateState: undefined,
        validateErrorMsg: '',
      });
    },
    handleConfirm: function (e) {
      const toReal = this.onRealChange(e);
      this.triggerEvent('confirm', { ...e.detail, value: toReal });
    },
    changeForm: function (detail) {
      this.setData({ value: detail.value });
      this.triggerEvent('changeForm', detail);
    },
    getStepDisabled: function (props, value) {
      let { readOnly, disabled, status, max, min } = {
        ...this.properties,
        ...props,
      };
      const realValue = value === undefined ? this.data.realValue : value;

      let stepPlusDisabled = false;
      let stepMinusDisabled = false;
      if (readOnly || disabled || (status && status !== 'edit')) {
        stepPlusDisabled = true;
        stepMinusDisabled = true;
      } else {
        stepPlusDisabled =
          isNumber(+realValue) && isNumber(max) && max <= +realValue;
        stepMinusDisabled =
          isNumber(+realValue) && isNumber(min) && min >= +realValue;
      }

      return { stepPlusDisabled, stepMinusDisabled };
    },
    getRealAndShowData: function (props) {
      const { readOnly, disabled, status, format, min, max } = {
        ...this.properties,
        ...props,
      };
      const toShow = this.getShowValue({
        ...{ ...this.properties, ...props },
        type: format,
      });
      const toReal = getRealValue({ value: toShow });

      const { stepPlusDisabled, stepMinusDisabled } = this.getStepDisabled(
        { readOnly, disabled, status, max, min, format },
        toReal
      );

      const readValue = `${toShow}${getPercentUnit(format)}`;

      return { toShow, toReal, stepPlusDisabled, stepMinusDisabled, readValue };
    },
    // 获取显示在输入框的值，非真实值
    getShowValue({
      value,
      thousandShow,
      decimals,
      step,
      max,
      min,
      format,
      type = '',
      needSetData = true,
    }) {
      if (value === '' && !['plus', 'minus'].includes(type)) return '';

      if (value === 'null' || value === 'undefined') return '';

      let validState = undefined;
      let validMsg = '';
      let res = `${value}`;

      if (isNumber(value) && res.includes('e')) {
        res = `${res.startsWith('-') ? '-' : ''}${res
          .replace(/^-/, '')
          .toLocaleString()}`;
      }

      res = res.replace(/ /g, '').replace(/,/g, '');

      if (res !== 'Infinity' && res !== '-Infinity') {
        if (type === 'plus') {
          res = strNumAddCalc(res, `${step}`);
        } else if (type === 'minus') {
          res = strNumAddCalc(res, `${-step}`);
        }
      }

      if (format === 'percent') {
        max = Number(dealPercent(max, 'add'));
        min = Number(dealPercent(min, 'add'));
      }

      const validMsgObj = getValidMsgObj(format, max, min);
      const rules = getRules(
        validMsgObj,
        this.properties.max,
        this.properties.min
      );

      if (isNumber(this.properties.max) && Number(res) > max) {
        validState = 'error';
        validMsg = validMsgObj.max;
        type = '';
      }

      if (isNumber(this.properties.min) && Number(res) < min) {
        validState = 'error';
        validMsg = validMsgObj.min;
        type = '';
      }

      res = dealDecimals(res, decimals, type);

      // 千分符转换
      if (thousandShow && res !== 'Infinity' && res !== '-Infinity') {
        const temp = res.split('.');
        res = `${temp[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')}${
          temp[1] ? `.${temp[1]}` : ''
        }`;
      }

      needSetData &&
        this.setData({
          validateState: validState,
          validateErrorMsg: validMsg,
          selfDefineRules: rules,
        });

      return res;
    },
  },
  observers: {
    'name,value,label,required,visible,disabled,readOnly,before,after,min,max,step,format':
      function () {
        this.updateWidgetAPI();
      },
    'disabled,readOnly,clearable,isFocus': function (
      disabled,
      readOnly,
      clearable,
      isFocus
    ) {
      const hasClearIcon = getHasClearIcon(
        clearable,
        isFocus,
        disabled,
        readOnly,
        this.data.realValue
      );
      this.setData({ hasClearIcon });
    },
    'disabled,size,wrapClassName,before,after,classRoot,className,stepOption':
      function (
        disabled,
        size,
        wrapClassName,
        before,
        after,
        classRoot,
        className,
        stepOption
      ) {
        const _size = convertSize(size);
        const { classPrefix, inputWrap } = this.data;
        const root = `${classPrefix}-${classRoot}`;
        const cls = classNames(
          root,
          inputWrap,
          this.data.inputGroup,
          wrapClassName,
          `size-width-${_size}`,
          `size-font-${_size}`,
          `size-height-${_size}`,
          `${root}-${classRoot}`,
          {
            'is-not-h5': true,
            'size-width-hundred': true,
            'is-disabled': disabled,
            [`${classPrefix}-input-number-input-number`]: true,
            [`${classPrefix}-form-input-wrap--no-border`]:
              stepOption !== 'both',
            [`${inputWrap}--no-radius-left`]: before,
            [`${inputWrap}--no-radius-right`]: after,
            [`${inputWrap}--no-radius`]: before && after,
            [`${classPrefix}-form-input-wrap`]: true,
          }
        );
        const formClass = classNames(
          className,
          `${root}--row`,
          stepOption !== 'both' ? 'input-number-step-right' : ''
        );

        this.setData({ cls, root, _size, formClass });
      },
    'inputValue,format,decimals,min,max,status,readOnly,disabled,after,before,thousandShow,step':
      function (
        inputValue,
        format,
        decimals,
        min,
        max,
        status,
        readOnly,
        disabled,
        after,
        before,
        thousandShow,
        step
      ) {
        const {
          toReal,
          toShow,
          stepPlusDisabled,
          stepMinusDisabled,
          readValue,
        } = this.getRealAndShowData({
          value: this.data.isInit
            ? isNumber(inputValue)
              ? inputValue
              : ''
            : this.data.realValue,
          format,
          decimals,
          min,
          max,
          readOnly,
          disabled,
          status,
          before,
          after,
          thousandShow,
          step,
        });

        this.setData({
          readValue,
          realValue: toReal,
          showValue: readOnly ? readValue : toShow,
          stepPlusDisabled,
          stepMinusDisabled,
        });
        this.changeForm({ value: toReal });
      },
    // 监听非输入引起的value变化，比如调用 setValue, clearValue
    value: function (value) {
      const { format } = this.properties;

      let toReal = this.data.realValue;
      let toShow = this.data.showValue;

      if (!this.data.isInit) {
        toReal = isNumber(value) ? value : null;
        toShow = this.getShowValue({
          ...this.properties,
          value: `${isNumber(value) ? value : ''}`,
          type: format,
        });
      }

      // 初始化时同步真实值到表单
      if (isNumber(toReal) && this.data.isInit) {
        this.changeForm({ value: toReal });
      }

      const readValue = `${toShow}${getPercentUnit(format)}`;

      if (this.data.isInit) {
        this.setData({ isInit: false });
      }

      // 避免和focus逻辑冲突，延后一个任务执行赋值
      // eslint-disable-next-line rulesdir/no-timer
      setTimeout(() => {
        this.setData({
          readValue,
          realValue: toReal,
          showValue: toShow,
        });
      }, 0);
    },
    inputValue: function (inputValue) {
      if (equal(inputValue, this.data._oldInputValue)) return;
      const { toReal, toShow, stepPlusDisabled, stepMinusDisabled, readValue } =
        this.getRealAndShowData({ value: inputValue });

      this.setData({
        readValue,
        realValue: toReal,
        showValue: this.data.readOnly ? readValue : toShow,
        stepPlusDisabled,
        stepMinusDisabled,
      });
      this.changeForm({ value: toReal });
      this.data._oldInputValue = inputValue;
    },
  },
  lifetimes: {
    attached: function () {
      this.updateWidgetAPI();
    },
  },
});
