import { commonCompBehavior } from '../../utils/common-behavior';
import { WD_PREFIX } from '../../utils/constant';
import eventBus from './utils/index';

Component({
  options: {
    virtualHost: true,
    multipleSlots: true,
  },
  behaviors: [commonCompBehavior],
  properties: {
    className: {
      type: String,
      value: '',
    },
    style: {
      type: String,
      value: '',
    },
    menu: {
      type: Object,
      value: {},
    },
    type: {
      type: String,
      value: 'horizontal',
    },
    template: {
      type: String,
      value: 'horizontal',
    },
    defaultOpened: {
      type: Boolean,
      value: true,
    },
    selectedMenuKey: {
      type: String,
      value: '',
    },
  },
  data: {
    classPrefix: WD_PREFIX,
    visible: false,
    typeFinal: 'horizontal',
  },
  lifetimes: {
    attached() {
      this.updateWidgetAPI();
      eventBus.on('dealMenuShow', (isShow) => {
        isShow ? this.menuOpen() : this.menuClose();
      });
    },
  },
  observers: {
    'type,template': function (type, template) {
      this.setData({ typeFinal: type || template });
    },
  },
  methods: {
    updateWidgetAPI() {
      this.setReadonlyAttributes && this.setReadonlyAttributes({});
    },
    menuOpen() {
      this.setData({ visible: true });
    },
    menuClose() {
      this.setData({ visible: false });
    },
    menuClick(params) {
      this.triggerEvent('menuClick', params);
    },
  },
});
