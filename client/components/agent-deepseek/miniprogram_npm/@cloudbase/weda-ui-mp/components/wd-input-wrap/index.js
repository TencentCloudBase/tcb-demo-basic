import { convertSize, convertIconSize } from '../../utils/getFormLegacy';
import classNames from '../../utils/classnames';
import { WD_PREFIX } from '../../utils/constant';

Component({
  options: {
    virtualHost: true,
  },
  properties: {
    block: {
      type: Boolean,
      value: true,
    },
    classRoot: {
      type: String,
      value: '',
    },
    wrapClassName: {
      type: String,
      value: '',
    },
    before: {
      type: String,
      value: '',
    },
    after: {
      type: String,
      value: '',
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    prefixType: {
      type: String,
      value: '',
    },
    prefixIcon: {
      type: String,
      value: '',
    },
    prefixSrc: {
      type: String,
      value: '',
    },
    suffixType: {
      type: String,
      value: '',
    },
    suffixIcon: {
      type: String,
      value: '',
    },
    suffixSrc: {
      type: String,
      value: '',
    },
    hasClearIcon: {
      type: Boolean,
      value: false,
    },
    readOnly: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    classPrefix: WD_PREFIX,
    inputWrap: `${WD_PREFIX}-form-input-wrap`,
    cls: '',
    _size: 'md',
    iconSize: 'xxs',
    root: '',
  },
  observers: {
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
      this.setData({ cls, root, _size, iconSize });
    },
  },
  methods: {
    handleClear: function () {
      this.triggerEvent('onClear');
    },
  },
});
