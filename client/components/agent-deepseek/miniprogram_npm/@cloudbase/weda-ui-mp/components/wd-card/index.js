import handleEvents from '../../utils/handleEvents';
import { commonCompBehavior } from '../../utils/common-behavior';
import { WD_PREFIX } from '../../utils/constant';

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
    id: {
      type: String,
      value: '',
    },
    showHeader: { type: Boolean, value: true },
    showContent: { type: Boolean, value: true },
    showFooter: { type: Boolean, value: false },
    showDivider: { type: Boolean, value: true },
  },
  data: { classPrefix: WD_PREFIX, contentState: 'show' },
  lifetimes: {
    attached() {
      const { showContent } = this.properties;
      this.setData({
        contentState: showContent ? 'show' : 'hide',
      });
      this.updateWidgetAPI();
    },
  },
  methods: {
    updateWidgetAPI() {
      this.setReadonlyAttributes &&
        this.setReadonlyAttributes({
          showHeader: this.properties.showHeader,
          showContent: this.properties.showContent,
          showFooter: this.properties.showFooter,
          showDivider: this.properties.showDivider,
          contentState: this.data.contentState,
          dealContentState: this.dealContentState.bind(this),
        });
    },
    ...handleEvents([{ title: '点击', name: 'tap' }]),
    /**
     * 控制内容面板显示与隐藏，只针对于折叠模式下有效
     */
    dealContentState({ state } = {}) {
      const { contentState } = this.data;
      const stateInner = state || (contentState === 'show' ? 'hide' : 'show');
      if (stateInner === contentState) return;

      this.setData({ contentState: stateInner });
      this.updateWidgetAPI();

      if (stateInner === 'show') {
        this.triggerEvent('contentShow');
      } else {
        this.triggerEvent('contentHide');
      }
    },
  },
  observers: {
    showContent: function (showContent) {
      this.setData({ contentState: showContent ? 'show' : 'hide' });
      this.updateWidgetAPI();
    },
  },
});
