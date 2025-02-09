import classNames from '../../../utils/classnames';
import {
  WD_PREFIX as classPrefix,
  TAG_STYLE_TYPE,
} from '../../../utils/constant';
import { convertIconSize, convertPx } from '../../../utils/getFormLegacy';
import { convertLegacyEnum } from '../../../utils/platform';
import { WD_TAG_STYLE_TYPE } from '../../../utils/enum';
import { colorToRgba, TAG_BG_ALPHA } from '../../../utils/color';

/**
 * 标准化：标签
 */
Component({
  options: { virtualHost: true },
  properties: {
    className: {
      type: String,
      value: '',
    },
    style: {
      type: String,
      value: '',
    },
    label: {
      type: String,
    },
    size: {
      type: String,
    },
    prefixType: {
      type: String,
    },
    prefixIcon: {
      type: String,
    },
    prefixSrc: {
      type: String,
    },
    suffixType: {
      type: String,
    },
    suffixIcon: {
      type: String,
    },
    suffixSrc: {
      type: String,
    },
    tagStyleType: {
      type: String,
    },
    tagStyleRadius: {
      type: String,
    },
    tagStyleWidth: {
      type: String,
    },
    tagStyleColor: {
      type: String,
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    checked: {
      type: Boolean,
      value: false,
    },
  },
  methods: {
    handleClick: function () {
      this.triggerEvent('click');
    },
    getItemStyle: function (param = {}) {
      const {
        checked,
        tagStyleType,
        tagStyleRadius,
        tagStyleWidth,
        tagStyleColor,
        style: _style,
      } = param;
      const hasTick =
        checked &&
        ['lightTick', 'darkTick', 'outlineTick'].includes(tagStyleType);
      let color, backgroundColor, borderColor, tickColor, tickBg;
      if (checked) {
        switch (tagStyleType) {
          case 'light':
          case 'lightTick':
            color = tagStyleColor;
            backgroundColor = colorToRgba(tagStyleColor, TAG_BG_ALPHA);
            tickColor = '#FFFFFF';
            tickBg = tagStyleColor;
            break;
          case 'dark':
          case 'darkTick':
            backgroundColor = tagStyleColor;
            tickColor = tagStyleColor;
            tickBg = colorToRgba(tagStyleColor, TAG_BG_ALPHA);
            break;
          case 'outline':
          case 'outlineTick':
            color = tagStyleColor;
            borderColor = tagStyleColor;
            tickColor = '#FFFFFF';
            tickBg = tagStyleColor;
            break;
        }
      }
      const styleCss = _style ? `${_style};` : '';
      const colorCss = color ? `color:${color};` : '';
      const backgroundColorCss = backgroundColor
        ? `background-color:${backgroundColor};`
        : '';
      const borderColorCss = borderColor ? `border-color:${borderColor};` : '';
      const borderRadiusCss = tagStyleRadius
        ? `border-radius:${tagStyleRadius};`
        : '';
      const widthCss = tagStyleWidth ? `width:${tagStyleWidth};` : '';
      const itemStyle = `${styleCss}${colorCss}${backgroundColorCss}${borderColorCss}${borderRadiusCss}${widthCss}`;

      const borderBottomRightRadiusCss = tagStyleRadius
        ? `border-bottom-right-radius:${tagStyleRadius};`
        : '';
      const borderRightColorCss = tickBg ? `border-right-color:${tickBg};` : '';
      const borderLeftColorCss = tickColor
        ? `border-left-color:${tickColor};`
        : '';
      const borderBottomColor = tickColor
        ? `border-bottom-color:${tickColor};`
        : '';

      const boardStyle = `${borderRightColorCss}${borderBottomRightRadiusCss}`;
      const boardPureStyle = borderBottomRightRadiusCss;
      const tickStyle = `${borderLeftColorCss}${borderBottomColor}`;

      return { itemStyle, hasTick, boardStyle, boardPureStyle, tickStyle };
    },
  },
  data: {
    iconSize: '',
    cls: '',
    classPrefix,
    itemStyle: '',
    hasTick: false,
    boardStyle: '',
    boardPureStyle: '',
    tickStyle: '',
  },
  observers: {
    'className,style, size, disabled, tagStyleType, tagStyleColor, tagStyleRadius, tagStyleWidth, checked':
      function (
        className,
        style,
        size,
        disabled,
        _tagStyleType,
        tagStyleColor,
        _tagStyleRadius,
        _tagStyleWidth,
        checked
      ) {
        const tagStyleType = convertLegacyEnum(
          _tagStyleType,
          WD_TAG_STYLE_TYPE
        );
        const tagStyleTypeToCls = TAG_STYLE_TYPE[tagStyleType] || tagStyleType;
        const tagStyleRadius = convertPx(_tagStyleRadius);
        const tagStyleWidth = convertPx(_tagStyleWidth);
        const cls = classNames(className, `${classPrefix}-tag-item`, {
          [`${classPrefix}-tag--${size}`]: !!size,
          [`${classPrefix}-tag--${tagStyleTypeToCls}`]: !!tagStyleTypeToCls,
          'is-disabled': disabled,
          'is-selected': checked,
        });
        const { itemStyle, hasTick, boardStyle, boardPureStyle, tickStyle } =
          this.getItemStyle({
            checked,
            tagStyleType,
            tagStyleRadius,
            tagStyleWidth,
            tagStyleColor,
            style,
          });
        const iconSize = convertIconSize(size);
        this.setData({
          cls,
          iconSize,
          itemStyle,
          hasTick,
          boardStyle,
          boardPureStyle,
          tickStyle,
        });
      },
  },
});
