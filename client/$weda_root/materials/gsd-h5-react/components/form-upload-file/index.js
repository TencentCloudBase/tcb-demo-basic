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
    labelVisible: {
      type: Boolean,
      value: true,
    },
    label: {
      type: String,
      value: '字段标题',
    },
    single: {
      type: Boolean,
      value: false,
    },
    maxSize: {
      type: Number,
      value: 10,
    },
    deleteVisible: {
      type: Boolean,
      value: true,
    },
    downloadVisible: {
      type: Boolean,
      value: true,
    },
  },
  methods: {
    change: function (e) {
      this.setData({ value: e.detail.value });
      this.triggerEvent('change', e.detail);
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
    label: function (label) {
      this.setReadonlyAttributes({ label });
    },
  },
});
