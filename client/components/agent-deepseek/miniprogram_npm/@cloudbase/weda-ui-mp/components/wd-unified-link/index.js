import { WD_PREFIX } from '../../utils/constant';
import classNames from '../../utils/classnames';
import { commonCompBehavior } from '../../utils/common-behavior';
import { getWedaAPI } from '../../utils/getWedaApi';

Component({
  options: {
    virtualHost: true,
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
    id: {
      type: String,
      value: '',
    },
    url: {
      type: String,
      value: '',
    },
    options: {
      type: Object,
      value: {},
    },
    params: {
      type: Object,
      value: {},
    },
  },
  data: { cls: '' },
  methods: {
    tap: function () {
      const URL_REG =
        /^(weda-page|plugin|miniprogram):\/\/([0-9.\-A-Za-z]+)(?:\/([^?#]*))?(?:\?([^#]*))?$/;
      const matched = this.data.url.match(URL_REG);
      const { app } = getWedaAPI();
      if (matched) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, protocol, packageName, pageId, query] = matched;
        if ('weda-page' === protocol) {
          // 页面参数，如果存在变量绑定，以绑定值为准
          let params = {};
          if (query) {
            params = query.split('&').reduce((acc, param) => {
              const [key, value] = param.split('=');
              acc[key] = value;
              return acc;
            }, {});
          }
          if (this.data?.params?.[pageId]) {
            params = { ...params, ...this.data?.params?.[pageId] };
          }
          app?.navigateTo({
            pageId,
            packageName: packageName === 'main' ? '' : packageName,
            mode: 'weDa',
            params,
          });
        } else {
          app?.navigateTo({
            url: this.data.url,
            options: this.data.options,
          });
        }
      } else {
        console.error(
          /https?:\/\//.test(this.data.url)
            ? '小程序不支持外部链接跳转'
            : '链接不合法'
        );
      }
    },
    updateWidgetAPI: function () {
      const { url, options } = this.data;
      this.setReadonlyAttributes &&
        this.setReadonlyAttributes({
          url,
          options,
        });
    },
  },
  observers: {
    className: function (className) {
      const classPrefix = WD_PREFIX;
      const compClassName = `${classPrefix}-link`;
      // 响应式css api
      const platformCss = `${classPrefix}-mp-link`;
      const classes = {
        [compClassName]: true,
        [platformCss]: true,
      };
      const cls = classNames({
        ...classes,
        [className]: className,
      });
      this.setData({ cls });
    },
    'url,options': function () {
      this.updateWidgetAPI();
    },
  },
  lifetimes: {
    attached() {
      this.updateWidgetAPI();
      this.setData({ id: this.id });
    },
  },
});
