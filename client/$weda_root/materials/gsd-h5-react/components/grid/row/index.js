import classNames from '../../../utils/classnames';
import { isNil } from '../../../utils/lodash';
import { commonCompBehavior } from '../../../utils/common-behavior';
import { GUTTER_VALUE } from '../../../utils/constant';
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
    alignItems: {
      type: String,
      value: '',
    },
    gutterX: {
      type: String,
      optionalTypes: [Number],
      value: 'auto',
    },
    colCount: {
      type: Number,
      value: 3,
    },
  },
  methods: {
    updateWidgetAPI() {
      const { gutterX, alignItems, colCount } = this.properties;
      this.setReadonlyAttributes?.({
        gutterX,
        alignItems,
        colCount,
      });
    },
    init() {
      const { alignItems, className: userClassName, gutterX } = this.data;
      const gutterXValue =
        typeof gutterX === 'number' && !isNaN(gutterX)
          ? gutterX
          : GUTTER_VALUE.find((item) => item.gutterValue === gutterX)
              ?.styleValue || 0;
      const actualClassName = classNames({
        'wd-grid-row': true,
        [`wd-grid-gx-${gutterXValue}`]:
          gutterXValue != -1 && !isNil(gutterXValue) && !isNil(gutterX),
        [`wd-g-align-items-${alignItems}`]: alignItems,
        [userClassName]: userClassName,
      });
      this.setData({ actualClassName });
      this.updateWidgetAPI();
    },
  },
  data: {
    actualClassName: '',
  },
  observers: {
    'alignItems, className, gutterX': function () {
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
