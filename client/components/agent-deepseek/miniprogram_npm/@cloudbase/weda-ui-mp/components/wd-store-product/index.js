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
    appid: {
      type: String,
      value: '',
    },
    productId: {
      type: String,
      value: '',
    },
    productPromotionLink: {
      type: String,
      value: '',
    },
    mediaId: {
      type: String,
      value: '',
    },
    customStyle: {
      type: Object,
    },
  },
  methods: {
    ...handleEvents([
      { title: '跳转小店成功', name: 'bindentererror' },
      { title: '跳转小店失败', name: 'bindentersuccess' },
    ]),
  },
  observers: {},
});
