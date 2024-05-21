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
    source: {
      type: String,
      value: '',
    },
    showLngLat: {
      type: Boolean,
      value: true,
    },
    showMap: {
      type: Boolean,
      value: true,
    },
    defauleShowLocation: {
      type: Boolean,
      value: true,
    },
    drag: {
      type: Boolean,
      value: true,
    },
    zoom: {
      type: Boolean,
      value: true,
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    requiredFlag: {
      type: Boolean,
      value: true,
    },
    value: {
      type: Object,
      value: {
        latitude: 39.98410411,
        longitude: 116.307503,
        poiname: '',
        detailedAddress: '',
      },
    },
    locationType: {
      type: Number,
      value: 1,
    },
    locationRange: {
      type: Number,
      value: 0,
    },
    customRange: {
      type: Number,
      value: 0,
    },
    dataSource: {
      type: Object,
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
  },
  observers: {
    label: function (label) {
      this.setReadonlyAttributes({ label });
    },
  },
});
