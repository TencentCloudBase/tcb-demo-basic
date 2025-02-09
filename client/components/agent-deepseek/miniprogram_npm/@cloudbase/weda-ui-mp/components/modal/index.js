import handleEvents from '../../utils/handleEvents';
import { commonCompBehavior } from '../../utils/common-behavior';

Component({
  behaviors: [commonCompBehavior],
  options: {
    virtualHost: true,
    multipleSlots: true,
  },
  properties: {
    id: {
      type: String,
      value: '',
    },
    className: {
      type: String,
      value: '',
    },
    style: {
      type: String,
      value: '',
    },
    content: {
      type: String,
      value: '',
    },
    visible: {
      type: Boolean,
      value: true,
    },
    isDefaultButton: {
      type: Boolean,
      value: true,
    },
  },
  methods: {
    ...handleEvents([
      { name: 'close', title: '窗口关闭' },
      { name: 'confirm', title: '默认按钮点击' },
    ]),
    toggle: function (targetValue) {
      if (targetValue === undefined) {
        this.setData({ isVisible: !this.data.isVisible });
      } else {
        this.setData({ isVisible: Boolean(targetValue) });
      }
    },
  },
  lifetimes: {
    attached() {
      this.setReadonlyAttributes &&
        this.setReadonlyAttributes({
          toggle: this.toggle.bind(this),
          open: this.toggle.bind(this, true),
          close: this.toggle.bind(this, false),
        });
    },
  },
  observers: {
    visible: function (visible) {
      if (visible !== this.data.isVisible) {
        this.setData({ isVisible: visible });
      }
    },
  },
});
