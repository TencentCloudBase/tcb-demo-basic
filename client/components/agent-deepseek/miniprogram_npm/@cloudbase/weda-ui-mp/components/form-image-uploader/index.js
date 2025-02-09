import handleEvents from '../../utils/handleEvents';
import { commonCompBehavior } from '../../utils/common-behavior';
import formFieldBehavior from '../form-field-behavior/form-field-behavior';

Component({
  options: {
    virtualHost: true,
  },
  behaviors: [commonCompBehavior, formFieldBehavior],
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
    maxUploadCount: {
      type: Number,
      value: 5,
    },
    title: {
      type: String,
      value: '图片上传',
    },
    tips: {
      type: String,
      value: '图片上传提示',
    },
    single: {
      type: Boolean,
      value: false,
    },
    maxSize: {
      type: Number,
      value: 10,
    },
    //是否获取微信头像
    isChooseAvatar: {
      type: Boolean,
      value: false,
    },
    //图片展示形状 圆角矩形-roundedTectangle 圆形-circular 直角矩形-ectangle
    showShape: {
      type: String,
      value: 'ectangle',
    },
    labelVisible: {
      type: Boolean,
      value: true,
    },
    label: {
      type: String,
      value: '字段标题',
    },
  },
  methods: {
    change: function (e) {
      this.triggerEvent('change', e.detail);
      this.setData({ value: e.detail.value });
    },
    ...handleEvents([
      {
        title: '上传成功',
        name: 'success',
      },
      {
        title: '上传失败',
        name: 'error',
      },
    ]),
  },
  observers: {
    title: function (label) {
      this.setReadonlyAttributes({ label });
    },
  },
});
