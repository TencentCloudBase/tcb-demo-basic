import { WD_PREFIX } from '../../../utils/constant';
/**
 * 弹窗选择器
 */
Component({
  options: { virtualHost: true },
  properties: {
    visible: {
      type: Boolean,
      value: false,
    },
    className: {
      type: String,
      value: false,
    },
  },
  data: {
    classPrefix: WD_PREFIX,
  },
  methods: {
    handleClose: function () {
      this.triggerEvent('onClose');
    },

    handleOk: function () {
      this.triggerEvent('onOk');
    },
  },
  observers: {},
  lifetimes: {},
});
