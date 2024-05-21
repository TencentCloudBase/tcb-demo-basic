import classNames from '../../../utils/classnames';
import handleEvents from '../../../utils/handleEvents';

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
    label: {
      type: String,
      value: '标题',
    },
    labelVisible: {
      type: Boolean,
      value: true,
    },
    checked: {
      type: Boolean,
      value: false,
    },
    layout: {
      type: String,
      value: 'horizontal',
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    requiredFlag: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    cls: '',
    subCls: '',
    isFlex: true,
  },
  lifetimes: {
    attached() {
      const { className, layout, disabled } = this.properties;
      const isFlex = layout !== 'vertical';
      const cls = classNames({
        'weda-ui': true,
        'weda-switch': true,
        [className]: className,
      });
      const subCls = classNames({
        'weui-cell': true,
        'weui-cell_active': true,
        'weui-cell_switch': true,
        'weui-flex__item': isFlex,
        'weui-cell_disabled': disabled,
      });

      this.setData({ cls, subCls, isFlex });
    },
  },
  methods: {
    ...handleEvents([
      {
        name: 'change',
        title: '选中状态改变',
      },
    ]),
  },
  observers: {
    'disabled, layout': function (disabled, layout) {
      const subCls = classNames({
        'weui-cell': true,
        'weui-cell_active': true,
        'weui-cell_switch': true,
        'weui-flex__item': layout !== 'vertical',
        'weui-cell_disabled': disabled,
      });

      this.setData({
        subCls,
      });
    },
  },
});
