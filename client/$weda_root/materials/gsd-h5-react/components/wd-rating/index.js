/* eslint-disable @typescript-eslint/no-magic-numbers */
import { commonCompBehavior } from '../../utils/common-behavior';
import formFieldBehavior from '../form-field-behavior/form-field-behavior';
import { WD_PREFIX } from '../../utils/constant';
import classNames from '../../utils/classnames';
import itemBehavior from '../form-field-behavior/item-behavior';
import {
  calculateNextValue,
  calculatePercentByValueAndBoundary,
} from '../../utils/range';

Component({
  options: {
    virtualHost: true,
  },
  behaviors: [itemBehavior, commonCompBehavior, formFieldBehavior],
  properties: {
    min: {
      type: Number,
      value: 0,
    },
    max: {
      type: Number,
      value: 5,
    },
    step: {
      type: Number,
      value: 1,
    },
    icon: {
      type: String,
      value: 'td:star-filled',
    },
    iconSrc: {
      type: String,
      value: '',
    },
    backgroundIcon: {
      type: String,
      value: '',
    },
    backgroundIconSrc: {
      type: String,
      value: '',
    },
    foregroundColor: {
      type: String,
      value: '#ffcf48',
    },
    backgroundColor: {
      type: String,
      value: '#bfbfbf',
    },
    callbacks: {
      type: Object,
      value: {
        tooltip: () => {},
      },
    },
    size: {
      type: String,
      value: '',
    },
  },
  data: {
    classPrefix: WD_PREFIX,
    fullIconCls: '',
    emptyIconCls: '',
    icons: [],
    ratingCls: `${WD_PREFIX}-rating`,
    percent: 0,
    tooltipShow: false,
    tooltipOffsetX: 0,
    tooltipContent: '',
    fullIcon: {
      name: '',
      type: '',
      src: '',
    },
    emptyIcon: {
      name: '',
      type: '',
      src: '',
    },
    active: true,
    _size: 'sm',
  },
  methods: {
    onTap(e) {
      const { active } = this.data;
      if (!active) {
        return;
      }
      const mouseX = e.detail.x;
      this._triggerChangeWithMouseX(mouseX);
    },
    onTouchStart: function (e) {
      this.setData({
        tooltipShow: true,
      });
      const { active } = this.data;
      if (!active) {
        return;
      }
      const mouseX = e.touches[0]?.clientX;
      if (typeof mouseX !== 'number') {
        return;
      }
      this._triggerChangeWithMouseX(mouseX);
    },
    onTouchEnd: function () {
      this.setData({
        tooltipShow: false,
      });
    },
    onTouchCancel: function () {
      this.setData({
        tooltipShow: false,
      });
    },
    onTouchMove: function (e) {
      const { active } = this.data;
      if (!active) {
        return;
      }
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
        min,
        max,
        step,
      });
    },
    async _triggerChangeWithMouseX(mouseX) {
      const { containerLeft: left, containerRight: right } =
        await this._getRect();
      const result = calculateNextValue({
        axisLowerBound: left,
        axisHigherBound: right,
        coordinate: mouseX,
        min: this.data.min,
        max: this.data.max,
        step: this.data.step,
      });
      this.setData({
        value: result,
      });
      this.triggerEvent('change', {
        value: result,
      });
    },
    _computePercent() {
      const { value, min, max } = this.data;
      const percent =
        100 -
        calculatePercentByValueAndBoundary({
          value,
          min,
          max,
        });
      this.setData({
        percent,
      });
    },
    async _computeTooltipOffsetX() {
      const { value, min, max } = this.data;
      const { containerLeft: left, containerRight: right } =
        await this._getRect();

      const iconCount = max - min;
      const containerWidth = right - left;
      const iconWidth = containerWidth / iconCount;
      let currentIconIndex = Math.ceil(value - min) - 1;
      if (currentIconIndex < 0) {
        currentIconIndex = 0;
      }
      const result =
        -0.5 * containerWidth + (0.5 + currentIconIndex) * iconWidth;
      this.setData({
        tooltipOffsetX: result,
      });
    },
    _getRect() {
      return new Promise((res, rej) => {
        wx.createSelectorQuery()
          .in(this)
          .select(`.${this.data.classPrefix}-rating`)
          .boundingClientRect((rect) => {
            if (!rect) {
              rej();
            }
            res({
              containerLeft: rect.left,
              containerRight: rect.right,
            });
          })
          .exec();
      });
    },
    _standardizeIcon() {
      const { icon: _icon, iconSrc: _iconSrc } = this.data;
      const { icon, iconSrc, iconSource } = standardizeIconProps({
        icon: _icon,
        iconSrc: _iconSrc,
      });
      this.setData({
        fullIcon: {
          name: icon,
          src: iconSrc,
          type: iconSource,
        },
      });
    },
    _standardizeBackgroundIcon() {
      let { backgroundIcon: _icon, backgroundIconSrc: _iconSrc } = this.data;
      if (!_icon) {
        _icon = this.data.icon;
        if (_icon === '自定义图片') {
          _iconSrc = this.data.iconSrc;
        }
      }
      const { icon, iconSrc, iconSource } = standardizeIconProps({
        icon: _icon,
        iconSrc: _iconSrc,
      });
      this.setData({
        emptyIcon: {
          name: icon,
          src: iconSrc,
          type: iconSource,
        },
      });
    },
  },
  lifetimes: {
    attached() {
      this._computePercent();
      this._standardizeIcon();
      this._standardizeBackgroundIcon();
      this.updateWidgetAPI();
      this.setData({
        icons: Array.from(
          {
            length: this.data.max - this.data.min,
          },
          () => 0
        ),
      });
    },
  },
  observers: {
    'disabled, readOnly': function (disabled, readOnly) {
      this.setData({
        active: !(readOnly || disabled),
        ratingCls: classNames({
          'is-disabled': disabled,
          'is-readonly': readOnly,
          [`${this.data.classPrefix}-rating`]: true,
        }),
      });
    },
    'min, max': function (min, max) {
      this.setData({
        icons: Array.from({
          length: max - min,
        }),
      });
    },
    'min, max, value': function () {
      this._computePercent();
      this._computeTooltipOffsetX();
    },
    'name, value, label, required, visible, disabled, readOnly, min, max, step':
      function () {
        this.updateWidgetAPI();
      },
    'value, callbacks': function (value, callbacks) {
      const tooltipContent =
        callbacks?.tooltip?.({
          value,
        }) || value;

      this.setData({
        tooltipContent: tooltipContent,
      });
    },
    'icon, iconSrc': function () {
      this._standardizeIcon();
    },
    'icon, iconSrc, backgroundIcon, backgroundIconSrc': function () {
      this._standardizeBackgroundIcon();
    },
    size: function (size) {
      if (['lg', 'md', 'sm'].includes(size)) {
        this.setData({
          _size: size,
        });
      } else {
        this.setData({
          _size: 'sm',
        });
      }
    },
  },
});

const DEFAULT_ICON = 'td:star-filled';

function standardizeIconProps({ icon: _icon, iconSrc: _iconSrc }) {
  let iconSource;
  let icon;
  let iconSrc;

  if (_icon === '自定义图片') {
    if (_iconSrc) {
      iconSource = 'custom';
      icon = '';
      iconSrc = _iconSrc;
    } else {
      iconSource = 'inner';
      icon = DEFAULT_ICON;
      iconSrc = '';
    }
  } else {
    iconSource = 'inner';
    icon = _icon;
    iconSrc = '';
  }

  return {
    iconSource,
    icon,
    iconSrc,
  };
}
