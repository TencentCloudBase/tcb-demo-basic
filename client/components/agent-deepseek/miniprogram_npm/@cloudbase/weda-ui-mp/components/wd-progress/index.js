import { commonCompBehavior } from '../../utils/common-behavior';
import formFieldBehavior from '../form-field-behavior/form-field-behavior';
import { WD_PREFIX } from '../../utils/constant';
import itemBehavior from '../form-field-behavior/item-behavior';
import {
  calculateNextValue,
  calculatePercentByValueAndBoundary,
} from '../../utils/range';

Component({
  options: {
    virtualHost: true,
    multipleSlots: true,
  },
  behaviors: [itemBehavior, commonCompBehavior, formFieldBehavior],
  properties: {
    showPercent: {
      type: Boolean,
      value: false,
    },
    min: {
      type: Number,
      value: 0,
    },
    max: {
      type: Number,
      value: 100,
    },
    step: {
      type: Number,
      value: 1,
    },
  },
  data: {
    classPrefix: WD_PREFIX,
    percent: 0,
  },
  methods: {
    onTap: function (e) {
      const mouseX = e.detail.x;
      this._triggerChangeWithMouseX(mouseX);
    },
    onTouchStart: function (e) {
      const mouseX = e.touches[0]?.clientX;
      if (typeof mouseX !== 'number') {
        return;
      }
      this._triggerChangeWithMouseX(mouseX);
    },
    onTouchMove: function (e) {
      const mouseX = e.touches[0]?.clientX;
      if (typeof mouseX !== 'number') {
        return;
      }
      this._triggerChangeWithMouseX(mouseX);
    },
    updateWidgetAPI: function () {
      const {
        name,
        value,
        label,
        required,
        visible,
        disabled,
        readOnly,
        showPercent,
        min,
        max,
        step,
      } = this.data;
      this.setReadonlyAttributes?.({
        name,
        value,
        label,
        required,
        visible,
        disabled,
        readOnly,
        showPercent,
        min,
        max,
        step,
      });
    },
    _triggerChangeWithMouseX(mouseX) {
      this._getRectX().then(({ left, right }) => {
        const result = calculateNextValue({
          axisLowerBound: left,
          axisHigherBound: right,
          coordinate: mouseX,
          min: this.data.min,
          max: this.data.max,
          step: this.data.step,
        });
        this.setData({ value: result });
        this.triggerEvent('change', { value: result });
      });
    },
    _computePercent() {
      const { value, min, max } = this.data;
      const percent = calculatePercentByValueAndBoundary({ value, min, max });
      this.setData({ percent });
    },
    _getRectX() {
      return new Promise((res, rej) => {
        wx.createSelectorQuery()
          .in(this)
          .select(`.${this.data.classPrefix}-progress`)
          .boundingClientRect((rect) => {
            if (!rect) {
              rej();
            }
            res({ left: rect.left, right: rect.right });
          })
          .exec();
      });
    },
  },
  lifetimes: {
    attached() {
      this.updateWidgetAPI();
      this._computePercent();
    },
  },
  observers: {
    'value, min, max': function () {
      this._computePercent();
    },
    'name, value, label, required, visible, disabled, readOnly, showPercent, min, max, step':
      function () {
        this.updateWidgetAPI();
      },
  },
});
