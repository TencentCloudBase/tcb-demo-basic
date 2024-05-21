import classNames from '../../../utils/classnames';
import { commonCompBehavior } from '../../../utils/common-behavior';

const numberRegex = /^\d{1,2}$/;
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
    alignSelf: {
      type: String,
      value: '',
    },
    widthType: {
      type: null,
      value: null,
    },
  },
  methods: {
    updateWidgetAPI() {
      const { widthType, lgWidthType } = this.properties;
      this.setReadonlyAttributes?.({
        widthType: widthType,
        lgWidthType,
      });
    },
    init() {
      const { alignSelf, widthType, className: userClassName } = this.data;
      const clsxObj = {
        'wd-grid-col': true,
        [`wd-g-align-self-${alignSelf}`]: alignSelf,
        [userClassName]: userClassName,
      };
      const style = this.properties.style;
      let exactStyle = style;
      let isTwelveAdjust = true;
      let twelveAdjustWidthType = widthType;
      if (typeof widthType === 'object' && widthType !== null) {
        twelveAdjustWidthType = widthType.value;
        isTwelveAdjust =
          widthType.type === this.data.manualCheckedType.twelveAdjust;
      }
      if (isTwelveAdjust) {
        clsxObj['wd-grid-col'] = true;
        if (twelveAdjustWidthType === 'fit-content') {
          // 适应内容
          clsxObj['wd-grid-col-auto'] = true;
        } else if (
          twelveAdjustWidthType === 'auto-fill' &&
          style &&
          style
            .split(/\s*;\s*/)
            .map((i) => i.split(/\s*:\s*/))
            .map(([k]) => k.trim())
            .filter((i) => i.length > 0)
            .indexOf('width') >= 0
        ) {
          // 自动填充，如果有宽，则设置宽生效
          clsxObj['wd-grid-col'] = false;
          exactStyle = style;
        } else if (
          // 12列调节
          typeof twelveAdjustWidthType === 'number' ||
          (typeof twelveAdjustWidthType === 'string' &&
            numberRegex.test(twelveAdjustWidthType))
        ) {
          clsxObj[`wd-grid-col-${twelveAdjustWidthType}`] = true;
        }
      } else {
        // 像素精确调节
        clsxObj['wd-grid-col'] = false;
        exactStyle = style + 'width: ' + twelveAdjustWidthType + ';';
      }
      const actualClassName = classNames(clsxObj);
      this.setData({ actualClassName, style: exactStyle });
      this.updateWidgetAPI();
    },
  },
  data: {
    actualClassName: '',
    manualCheckedType: {
      twelveAdjust: 'twelve-adjust',
      exactAdjust: 'exact-adjust',
    },
  },
  observers: {
    'alignSelf, widthType, className': function () {
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
