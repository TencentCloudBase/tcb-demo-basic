import classNames from '../../../utils/classnames';

Component({
  options: {
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
    tips: {
      type: String,
      value: '表单提示',
    },
    type: {
      type: String,
      value: 'normal',
    },
  },
  data: {
    cls: '',
  },
  lifetimes: {
    attached() {
      const { className, type, tips } = this.properties;
      const cls = classNames('weda-ui', {
        'weda-tips': true,
        'weui-cells__tips': !!tips,
        'weui-cells__tips_warn': !!tips && type === 'warn',
        [className]: className,
      });

      this.setData({ cls });
    },
  },
});
