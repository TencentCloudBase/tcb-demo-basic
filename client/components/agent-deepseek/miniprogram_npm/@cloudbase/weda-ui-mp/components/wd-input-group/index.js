import classNames from '../../utils/classnames';
import { WD_PREFIX } from '../../utils/constant';

Component({
  options: {
    virtualHost: true,
  },
  properties: {
    before: {
      type: String,
      value: '',
    },
    after: {
      type: String,
      value: '',
    },
    classRoot: {
      type: String,
      value: '',
    },
    size: {
      type: String,
      value: '',
    },
    // 传入的class
    className: {
      type: String,
      value: '',
    },
    readOnly: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    classPrefix: WD_PREFIX,
    inputGroup: `${WD_PREFIX}-form-input-group`,
    inputGroupCls: '',
    root: '',
  },
  observers: {
    'classRoot,size, className': function (classRoot, size, className) {
      const { classPrefix, inputGroup } = this.data;
      const root = `${classPrefix}-${classRoot}`;
      const inputGroupCls = classNames(
        inputGroup,
        `size-height-${size}`,
        className,
        {
          'size-width-hundred': true,
        }
      );

      this.setData({ inputGroupCls, root });
    },
  },
  methods: {
    // 点击前后缀文字/图标
    inputAdornmentClick: function (e) {
      this.triggerEvent('inputAdornmentClick', {
        type: e.currentTarget.dataset.type,
      });
    },
  },
});
