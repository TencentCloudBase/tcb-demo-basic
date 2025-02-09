import { commonCompBehavior } from '../../utils/common-behavior';
import formFieldBehavior from '../form-field-behavior/form-field-behavior';
import itemBehavior from '../form-field-behavior/item-behavior';
import { WD_PREFIX } from '../../utils/constant';
import classNames from '../../utils/classnames';
import { convertSize } from '../../utils/getFormLegacy';

Component({
  options: { virtualHost: true },
  behaviors: [itemBehavior, commonCompBehavior, formFieldBehavior],
  properties: {
    classRoot: {
      type: String,
      value: 'textarea',
    },
    counterVisible: {
      type: Boolean,
      value: true,
    },
  },
  data: {
    classPrefix: WD_PREFIX,
    cls: '',
    countCls: '',
    counter: 0,
    placeholderCls: `${WD_PREFIX}-form-input-wrap__placeholder weui-input__placeholder`,
    _size: 'md',
  },
  methods: {
    handleChange: function (e) {
      this.setData({ value: e.detail.value });
      this.triggerEvent('change', e.detail);
    },
    handleFocus: function (e) {
      this.triggerEvent('focus', e.detail);
    },
    handleBlur: function (e) {
      this.triggerEvent('blur', e.detail);
    },
    handleConfirm: function (e) {
      this.triggerEvent('confirm', e.detail);
    },
    updateWidgetAPI: function () {
      const { name, value, label, required, visible, disabled, readOnly } =
        this.data;
      this.setReadonlyAttributes?.({
        name,
        value,
        label,
        required,
        visible,
        disabled,
        readOnly,
      });
    },
    init() {
      const { disabled, size, classRoot } = this.data;
      const { classPrefix } = this.data;
      const _size = convertSize(size);
      const root = `${classPrefix}-${classRoot}`;
      const inputWrap = `${classPrefix}-form-input-wrap`;
      const textareaWrap = `${classPrefix}-form-textarea-wrap`;
      const cls = classNames(
        inputWrap,
        textareaWrap,
        `${root}-${classRoot}`,
        `size-width-${_size}`,
        `size-font-${_size}`,
        {
          'size-width-hundred': true,
          'is-disabled': disabled,
          'textarea-restriction': true,
        }
      );
      const countCls = `${textareaWrap}__label ${root}-${classRoot}__count-text`;
      this.setData({ cls, countCls, _size });
    },
  },
  observers: {
    'disabled,counterVisible,size,classRoot': function () {
      this.init();
    },
    value: function (value) {
      const counter = typeof value === 'string' ? value.length : 0;
      this.setData({ counter });
    },
    'name, value, label, required, visible, disabled, readOnly': function () {
      this.updateWidgetAPI();
    },
  },
  lifetimes: {
    attached: function () {
      this.init();
      this.updateWidgetAPI();
    },
  },
});
