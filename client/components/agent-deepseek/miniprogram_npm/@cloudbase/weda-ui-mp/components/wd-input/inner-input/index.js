import itemBehavior from '../../form-field-behavior/item-behavior';
import { WD_PREFIX } from '../../../utils/constant';
import {
  converValueFix,
  convertSize,
  converInputValue,
  convertIconSize,
} from '../../../utils/getFormLegacy';
import classNames from '../../../utils/classnames';
import equal from '../../../utils/deepEqual';

/**
 * 可复用的输入组件
 */
Component({
  options: { virtualHost: true },
  behaviors: [itemBehavior],
  properties: {
    visible: {
      type: Boolean,
      value: true,
    },
    template: {
      type: String,
      value: '',
    },
    isConvert: {
      type: Boolean,
      value: true,
    },
    inputPattern: {
      type: null,
    },
  },
  data: {
    root: '',
    classPrefix: WD_PREFIX,
    inputWrap: `${WD_PREFIX}-form-input-wrap`,
    inputCls: `${WD_PREFIX}-form-input-wrap__input`,
    placeholderCls: `${WD_PREFIX}-form-input-wrap__placeholder weui-input__placeholder`,
    cls: '',
    currentInputValue: '',
    hasClearIcon: false,
    isFocus: false,
    counter: 0,

    iconSize: 'xxs',
    _size: 'md',
    _oldValue: null,
    _oldInputValue: null,
  },
  methods: {
    convertDetail: function (e) {
      const {
        before,
        after,
        type,
        isUnionValue,
        isConvert = true,
      } = this.properties;
      const value = converValueFix(
        e.detail.value,
        before,
        after,
        type,
        isUnionValue,
        isConvert
      );
      return { ...e.detail, value };
    },
    handleFocus: function (e) {
      const detail = this.convertDetail(e);
      this.triggerEvent('focus', detail);
      this.setData({ isFocus: true });
    },
    handleBlur: function (e) {
      const detail = this.convertDetail(e);
      this.triggerEvent('blur', detail);
      this.setData({ isFocus: false });
    },
    handleChange: function (e) {
      const text = e.detail.value;
      const reg = new RegExp(this.properties.inputPattern);
      if (this.properties.inputPattern && !reg.test(text)) {
        this.setData({ currentInputValue: this.data.currentInputValue });
        return;
      }
      const detail = this.convertDetail(e);
      this.setData({ currentInputValue: text });
      this.changeForm(detail);
      this.triggerEvent('change', detail);
    },
    handleClear: function (e) {
      const detail = this.convertDetail(e);
      this.changeForm(detail);
      this.triggerEvent('clear', detail);
      this.triggerEvent('change', detail);
      this.setData({ currentInputValue: '' });
    },
    handleConfirm: function (e) {
      const detail = this.convertDetail(e);
      this.triggerEvent('confirm', detail);
    },
    changeForm: function (detail) {
      this.data._oldValue = detail.value;
      this.triggerEvent('changeForm', detail);
    },
    changeInput: function () {
      const {
        inputValue,
        before,
        after,
        type,
        isUnionValue,
        isConvert = true,
      } = this.properties;
      const value = converValueFix(
        inputValue,
        before,
        after,
        type,
        isUnionValue,
        isConvert
      );
      this.setData({ currentInputValue: inputValue });
      this.changeForm({ value });
      this.data._oldInputValue = inputValue;
    },
  },
  observers: {
    'disabled,clearable,isFocus,currentInputValue': function (
      disabled,
      clearable,
      isFocus,
      currentInputValue
    ) {
      const hasClearIcon =
        clearable && isFocus && !disabled && currentInputValue?.length > 0;
      const counter =
        typeof currentInputValue === 'string' ? currentInputValue.length : 0;
      this.setData({ hasClearIcon, counter });
    },
    'disabled,size,classRoot,wrapClassName,before,after': function (
      disabled,
      size,
      classRoot,
      wrapClassName,
      before,
      after
    ) {
      const _size = convertSize(size);
      const iconSize = convertIconSize(_size);
      const { classPrefix, inputWrap } = this.data;
      const root = `${classPrefix}-${classRoot}`;
      const cls = classNames(
        inputWrap,
        wrapClassName,
        `size-width-${_size}`,
        `size-font-${_size}`,
        `size-height-${_size}`,
        `${root}-${classRoot}`,
        `${classPrefix}-form-inherit--font`,
        {
          'size-width-hundred': true,
          'is-disabled': disabled,
          [`${inputWrap}--no-radius-left`]: before,
          [`${inputWrap}--no-radius-right`]: after,
          [`${inputWrap}--no-radius`]: before && after,
        }
      );
      const countCls = `${classPrefix}-input__limit-number`;

      this.setData({ cls, root, countCls, _size, iconSize });
    },
    inputValue: function (inputValue) {
      if (equal(inputValue, this.data._oldInputValue)) return;
      this.changeInput();
    },
    'before,after,isUnionValue': function (before, after, isUnionValue) {
      const value = converValueFix(
        this.data.currentInputValue,
        before,
        after,
        this.properties.type,
        isUnionValue,
        this.properties.isConvert
      );
      this.changeForm({ value });
    },
    // 监听非输入引起的value变化，比如调用 setValue, clearValue
    value: function (value) {
      if (equal(this.data._oldValue, value)) return;
      const { before, after, isUnionValue } = this.properties;
      const currentInputValue = converInputValue(
        value,
        before,
        after,
        isUnionValue
      );
      this.setData({ currentInputValue });
      this.data._oldValue = value;
    },
  },
  lifetimes: {
    attached: function () {
      this.data._oldValue = this.properties.value;
      this.changeInput();
    },
  },
});
