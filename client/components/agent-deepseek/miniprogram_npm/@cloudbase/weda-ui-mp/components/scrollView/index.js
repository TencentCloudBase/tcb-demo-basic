import handleEvents from '../../utils/handleEvents';

Component({
  options: {
    virtualHost: true,
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
    scrollY: {
      type: Boolean,
      value: true,
    },
    scrollX: {
      type: Boolean,
      value: false,
    },
    upperThreshold: {
      type: Number,
      value: 50,
    },
    lowerThreshold: {
      type: Number,
      value: 50,
    },
    scrollTop: {
      type: Number,
    },
    scrollLeft: {
      type: Number,
    },
    scrollIntoView: {
      type: String,
    },
    scrollWithAnimation: {
      type: Boolean,
      value: false,
    },
    enableBackToTop: {
      type: Boolean,
      value: false,
    },
    enableFlex: {
      type: Boolean,
      value: false,
    },
    scrollAnchoring: {
      type: Boolean,
      value: false,
    },
    refresherEnabled: {
      type: Boolean,
      value: false,
    },
    refresherThreshold: {
      type: Number,
      value: 50,
    },
    refresherDefaultStyle: {
      type: String,
      value: 'block',
    },
    refresherBackground: {
      type: String,
      value: '#fff',
    },
    refresherTriggered: {
      type: Boolean,
      value: false,
    },
    enhanced: {
      type: Boolean,
      value: false,
    },
    bounces: {
      type: Boolean,
      value: true,
    },
    showScrollbar: {
      type: Boolean,
      value: true,
    },
    pagingEnabled: {
      type: Boolean,
      value: false,
    },
    fastDeceleration: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    clientHeight: 0,
    clientWidth: 0,
  },
  methods: {
    getComponentClientHeight: function () {
      const that = this;
      const query = wx.createSelectorQuery().in(this);
      query.select('.g-scroll-view').boundingClientRect();
      query.exec((res) => {
        that.setData({
          clientHeight: res[0]?.height,
          clientWidth: res[0]?.width,
        });
      });
    },
    scroll: function (event) {
      const { clientHeight, clientWidth } = this.data;
      const detail = { ...event.detail, clientHeight, clientWidth };
      this.triggerEvent('scroll', detail);
    },
    ...handleEvents([
      //   { name: 'scroll', title: '滚动时触发' },
      { name: 'scrolltolower', title: '滚动到底部/右边时触发' },
      { name: 'scrolltoupper', title: '滚动到顶部/左边时触发' },
      {
        name: 'dragstart',
        title: '滑动开始事件(同时开启 enhanced 属性后生效)',
      },
      { name: 'dragging', title: '滑动事件(同时开启 enhanced 属性后生效)' },
      { name: 'dragend', title: '滑动结束事件(同时开启 enhanced 属性后生效)' },
      { name: 'refresherpulling', title: '自定义下拉刷新控件被下拉' },
      { name: 'refresherrefresh', title: '自定义下拉刷新被触发' },
      { name: 'refresherrestore', title: '自定义下拉刷新被复位' },
      { name: 'refresherabort', title: '自定义下拉刷新被中止' },
    ]),
  },
  lifetimes: {
    ready() {
      this.getComponentClientHeight();
    },
  },
});
