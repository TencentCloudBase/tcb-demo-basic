/* eslint-disable @typescript-eslint/no-magic-numbers */
import handleEvents from '../../utils/handleEvents';
import { commonCompBehavior } from '../../utils/common-behavior';
import { WD_PREFIX } from '../../utils/constant';

Component({
  options: { virtualHost: true },
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
    adType: {
      type: String,
      value: 'banner',
    },
    unitId: {
      type: String,
    },
    adTheme: {
      type: String,
      value: 'white',
    },
    adIntervals: {
      type: Number,
    },
    gridCount: {
      type: Number,
      value: 5,
    },
  },
  data: {
    _adType: 'banner',
    _gridCount: 5,
    _adIntervals: null,
    classPrefix: WD_PREFIX,
  },
  methods: {
    ...handleEvents([
      { name: 'load', title: '广告加载成功' },
      { name: 'error', title: '广告加载失败' },
      { name: 'close', title: '广告被关闭' },
    ]),
  },
  observers: {
    // 规范取值
    'adType,adIntervals,gridCount': function (adType, adIntervals, gridCount) {
      const _adType = ['banner', 'video', 'grid'].includes(adType)
        ? adType
        : 'banner';
      const _adIntervals =
        Number(adIntervals) >= 30 ? Number(adIntervals) : null;
      const _gridCount = gridCount == 8 ? 8 : 5;
      this.setData({ _adType, _gridCount, _adIntervals });
    },
  },
});
