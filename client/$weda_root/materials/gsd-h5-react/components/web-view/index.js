import handleEvents from '../../utils/handleEvents';
import classNames from '../../utils/classnames';
import { commonCompBehavior } from '../../utils/common-behavior';
import { WD_PREFIX } from '../../utils/constant';
Component({
  options: {
    virtualHost: true,
  },
  behaviors: [commonCompBehavior],
  properties: {
    id: {
      type: String,
      value: '',
    },
    link: {
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
  },
  data: {},
  lifetimes: {
    attached() {
      this.updateWidgetAPI();
      this.setData({ id: this.id });
    },
  },
  methods: {
    updateWidgetAPI() {
      const { link } = this.properties;

      this.setReadonlyAttributes &&
        this.setReadonlyAttributes({
          link,
        });
    },

    ...handleEvents([
      { title: '接收网页消息', name: 'message' },
      { title: '网页加载成功', name: 'load' },
      { title: '网页加载失败', name: 'error' },
    ]),
  },
  observers: {
    className: function (className) {
      const classPrefix = WD_PREFIX;
      // 响应式css api
      const platformCss = `${classPrefix}-mp-web-view`;
      const classes = {
        [platformCss]: true,
      };
      const cls = classNames({
        ...classes,
        [className]: className,
      });
      this.setData({ cls });
    },
    link: function () {
      this.updateWidgetAPI();
    },
  },
});
