import { WD_PREFIX } from '../../utils/constant';
import { textToString } from '../../utils/platform';
import classNames from '../../utils/classnames';
import itemBehavior from '../form-field-behavior/item-behavior';
import {
  convertSize,
  convertLayout,
  convertLabelAlign,
  convertPx,
} from '../../utils/getFormLegacy';

Component({
  options: { virtualHost: true, styleIsolation: 'shared' },
  behaviors: [itemBehavior],
  data: {
    item: `${WD_PREFIX}-form-item`,
    itemWrap: `${WD_PREFIX}-form-item-wrap`,
    classPrefix: WD_PREFIX,
    labelStyle: '',
    cls: '',
    labelCls: '',
    controlWrapCls: '',
    labelRoot: '',
    root: '',
    _before: '',
    _after: '',
    _readValue: '',
  },
  methods: {},
  observers: {
    'className,labelWidth,labelAlign,labelWrap,layout,required,requiredFlag,size,classRoot,borderedH5,disabled,controlAlign':
      function (
        className,
        _labelWidth,
        _labelAlign,
        labelWrap,
        _layout,
        required,
        requiredFlag,
        _size,
        classRoot,
        borderedH5,
        disabled,
        controlAlign
      ) {
        const { item, itemWrap, classPrefix } = this.data;
        const sizeTemp = convertSize(_size);
        const size = sizeTemp === 'xs' ? 'xs' : 'lg';
        const labelAlign = convertLabelAlign(_labelAlign);
        const layout = convertLayout(_layout);
        const root = `${classPrefix}-${classRoot}`;
        const labelRoot = `${root}__label`;
        const labelWidth = convertPx(_labelWidth);
        const labelStyle = labelWidth ? `width:${labelWidth}` : '';
        const itemLayout = this.properties.isWdFormDetail
          ? `${classPrefix}-form-item--detail`
          : `${item}-`;
        const cls = classNames(
          item,
          className,
          `${classPrefix}-mp-form-item ${item}--weui item-size-height-${size} ${root}-root ${classPrefix}-mp-${classRoot}-root`,
          `${itemLayout}-layout-${layout}`,
          `${item}--label-${labelAlign}`,
          {
            'is-required': requiredFlag && required,
            'is-borderless': !borderedH5,
            [`${itemLayout}-horizontal-left`]:
              layout === 'horizontal' && labelAlign === 'left',
            [`${itemLayout}-horizontal-right`]:
              layout === 'horizontal' && labelAlign === 'right',
            [`${itemLayout}-vertical-left`]:
              layout === 'vertical' && labelAlign === 'left',
            [`${itemLayout}-vertical-right`]:
              layout === 'vertical' && labelAlign === 'right',
          }
        );
        const labelCls = classNames(`${itemWrap}__label`, labelRoot, {
          'is-nowrap': !labelWrap,
          'is-disabled': disabled,
        });
        const controlWrapCls = classNames(`${itemWrap}__control-wrap`, {
          [`${itemWrap}__control-wrap--right`]: controlAlign === 'right',
        });

        this.setData({
          labelStyle,
          cls,
          labelCls,
          labelRoot,
          root,
          controlWrapCls,
        });
      },
    'readBeforeAfter,before,after,readValue': function (
      readBeforeAfter,
      before,
      after,
      readValue
    ) {
      const _readValue = textToString(readValue);
      const _before = readBeforeAfter && textToString(before);
      const _after = readBeforeAfter && textToString(after);
      this.setData({ _readValue, _before, _after });
    },
  },
});
