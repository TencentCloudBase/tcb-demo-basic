import classNames from '../../utils/classnames';
import { isNil } from '../../utils/lodash';
import { commonCompBehavior } from '../../utils/common-behavior';
import { GUTTER_VALUE } from '../../utils/constant';
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
    className: {
      type: String,
      value: '',
    },
    style: {
      type: String,
      value: '',
    },
    title: {
      type: String,
      value: '',
    },
    gutterX: {
      type: String,
      optionalTypes: [Number],
      value: '',
    },
    gutterY: {
      type: String,
      optionalTypes: [Number],
      value: '',
    },
    avoidScrollbar: {
      type: Boolean,
      value: true,
    },
  },
  data: {
    actalClassName: '',
  },
  methods: {
    updateWidgetAPI() {
      const { gutterX, gutterY } = this.properties;
      this.setReadonlyAttributes?.({
        gutterX,
        gutterY,
      });
    },
    init() {
      const {
        gutterX,
        gutterY,
        className: userClassName,
        avoidScrollbar,
      } = this.data;
      const gutterXValue =
        typeof gutterX === 'number' && !isNaN(gutterX)
          ? gutterX
          : GUTTER_VALUE.find((item) => item.gutterValue === gutterX)
              ?.styleValue || 0;
      const gutterYValue =
        typeof gutterY === 'number' && !isNaN(gutterY)
          ? gutterY
          : GUTTER_VALUE.find((item) => item.gutterValue === gutterY)
              ?.styleValue || 0;
      const actalClassName = classNames({
        'wd-grid': true,
        'wd-grid--gap': avoidScrollbar,
        [`wd-grid-gx-${gutterXValue}`]: !isNil(gutterXValue),
        // 产品要求guterX 同时间决定row一个换行的间距和 row之间的间距
        [`wd-grid-gy-${gutterYValue}`]: !isNil(gutterYValue),
        [`wd-grid-grb-${gutterYValue}`]: !isNil(gutterYValue),
        [userClassName]: userClassName,
      });
      this.setData({ actalClassName });
      this.updateWidgetAPI();
    },
  },
  observers: {
    'gutterX, gutterY, className, avoidScrollbar': function () {
      this.init();
    },
  },
  lifetimes: {
    attached() {
      this.init();
      this.updateWidgetAPI();
    },
  },
});
