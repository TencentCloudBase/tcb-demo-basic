/* eslint-disable @typescript-eslint/no-magic-numbers */
import { commonCompBehavior } from '../../utils/common-behavior';
import tagBehavior from './tag-behavior';
import { convertLegacyEnum } from '../../utils/platform';
import { isObj } from '../../utils/tool';
import { WD_TAG_DIRECTION, WD_INPUT_SIZE } from '../../utils/enum';
import { WD_PREFIX as classPrefix, TAG_GAP } from '../../utils/constant';
import { COLORS } from '../../utils/color';
import classNames from '../../utils/classnames';
import isEqual from '../../utils/deepEqual';
import { convertPx } from '../../utils/getFormLegacy';

/**
 * 标准化：标签
 */
Component({
  options: { virtualHost: true },
  behaviors: [tagBehavior, commonCompBehavior],
  properties: {
    isFormField: {
      type: Boolean,
      value: false,
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    value: {
      type: null,
    },
    multiple: {
      type: Boolean,
      value: true,
    },
    tagSameColor: {
      type: Boolean,
      value: true,
    },
    colors: {
      type: Array,
      value: COLORS,
    },
  },
  data: {
    tagCls: '',
    tagSize: 'md',
    processedRange: [],
    processedRangeExtra: [], // 在 range 上加属性，避免污染原始对象
    tagStyle: '',
    tagStyleWidthNew: '',
  },
  methods: {
    handleClick: function (e) {
      const item = e.currentTarget?.dataset?.item;
      this.triggerEvent('click', { item });
    },
    updateWidgetAPI: function () {
      const { processedRange: range } = this.data;
      this.setReadonlyAttributes?.({ range });
    },
    init() {
      {
        const {
          size: _size,
          direction: _direction,
          className: _className,
          style,
          tagStyleWidth,
          tagStyleWidthType,
          tagStyleWidthCols,
          tagStyleSpace,
        } = this.data;
        const isFixed = tagStyleWidthType === 'fixed';
        const tagSize = convertLegacyEnum(_size, WD_INPUT_SIZE, 'md');
        const direction = convertLegacyEnum(_direction, WD_TAG_DIRECTION);
        const tagCls = classNames(
          _className,
          `${classPrefix}-tag--${direction}`,
          `${classPrefix}-tag-root`,
          `${classPrefix}-mp-tag-root`,
          {
            [`${classPrefix}-tag--hundred`]: isFixed,
            [`${classPrefix}-tag--fixed`]: isFixed,
          }
        );
        const gap = TAG_GAP[tagStyleSpace] || convertPx(tagStyleSpace);
        const gapCss = gap ? `gap:${gap};` : '';
        const tagStyle = `${gapCss}${style || ''}`;
        let tagStyleWidthNew = tagStyleWidth;
        if (isFixed) {
          const gapNew = gap ?? '0px';
          const count =
            typeof tagStyleWidthCols === 'number' && tagStyleWidthCols > 1
              ? tagStyleWidthCols
              : 1;
          tagStyleWidthNew = `calc((100% - ${gapNew} * ${
            count - 1
          }) / ${count})`;
        }
        this.setData({ tagCls, tagStyle, tagSize, tagStyleWidthNew });
      }
    },
  },
  observers: {
    'size,direction,className,style,tagStyleWidth,tagStyleWidthType,tagStyleWidthCols,tagStyleSpace':
      function () {
        this.init();
      },
    range: function (_range) {
      const list = Array.isArray(_range) ? _range : [];
      const processedRange = list.filter((item) => isObj(item));
      this.setData({ processedRange }, () => this.updateWidgetAPI());
    },
    'processedRange, disabled, isFormField, multiple, value, tagStyleColor, colors, tagSameColor':
      function (
        processedRange,
        disabled,
        isFormField,
        multiple,
        value,
        tagStyleColor,
        colors,
        tagSameColor
      ) {
        // 1、加禁用
        const getDisabled = (item) => {
          if (!isFormField) return false;
          return disabled || item.disabled;
        };
        // 2、加选中
        const getChecked = (item) => {
          if (!isFormField) return true;
          if (multiple) {
            return (
              Array.isArray(value) && value.some((d) => isEqual(d, item.value))
            );
          }
          return isEqual(value, item.value);
        };
        // 3、加自定义颜色
        const colorList = [...colors];
        const colorMap = new Map();
        const getColor = (item) => {
          if (!isFormField) {
            if (tagSameColor && colorMap.has(item.value))
              return colorMap.get(item.value);
            let color = item.color;
            if ([undefined, 'auto'].includes(color)) {
              color = colorList.shift() || tagStyleColor;
            }
            !colorMap.has(item.value) && colorMap.set(item.value, color);
            return color;
          }
          return tagStyleColor;
        };
        const processedRangeExtra = processedRange.map((item) => ({
          ...item,
          disabled: getDisabled(item),
          checked: getChecked(item),
          color: getColor(item),
        }));
        this.setData({ processedRangeExtra });
      },
  },
  lifetimes: {
    attached: function () {
      this.init();
      this.updateWidgetAPI();
    },
  },
});
