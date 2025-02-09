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
    label: {
      type: String,
    },
    layout: {
      type: String,
    },
    multiCell: {
      type: Boolean,
      value: false,
    },
    requiredFlag: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    isFlex: true,
    cls: '',
  },
  lifetimes: {
    attached() {},
  },
  observers: {
    'layout, multiCell': function (layout, multiCell) {
      // const { } = this.properties;
      const isFlex = layout !== 'vertical';
      const cls = classNames({
        'weda-ui': true,
        'weda-formcells': true,
        'weui-cells': true,
        'weui-cells_forms': !multiCell,
        'weui-cells_checkbox': multiCell,
        'weui-flex': isFlex,
      });

      this.setData({
        isFlex: isFlex,
        cls: cls,
      });
    },
  },
});
