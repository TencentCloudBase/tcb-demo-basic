import { getWedaAPI } from '../../utils/getWedaApi';

Component({
  properties: {
    className: {
      type: String,
      value: '',
    },
    style: {
      type: String,
      value: '',
    },
    navOption: { type: Array, value: [] },
    titleVisible: {
      type: Boolean,
      value: true,
    },
    titleColor: {
      type: String,
      value: '',
    },
    titleFontWeight: {
      type: String,
      value: '',
    },
    titleFontSize: {
      type: Number,
      value: 14,
    },
    titleLineHeight: {
      type: String,
      value: '',
    },
    titleMaxLines: {
      type: Number,
      value: 1,
    },
    desColor: {
      type: String,
      value: '',
    },
    desFontWeight: {
      type: String,
      value: '',
    },
    desVisible: {
      type: Boolean,
      value: true,
    },
    desFontSize: {
      type: Number,
      value: 14,
    },
    desLineHeight: {
      type: String,
      value: '',
    },
    desMaxLines: {
      type: Number,
      value: 1,
    },
    buttonVisible: {
      type: Boolean,
      value: true,
    },
    buttonText: {
      type: String,
      value: '',
    },
    ColMobile: {
      type: Number,
      value: 2,
    },
    iconWidthSize: {
      type: String,
      value: '100',
    },
    iconHeightSize: {
      type: String,
      value: '100',
    },
    textAlign: {
      type: String,
      value: 'left',
    },
    titleStyle: {
      type: String,
      value: '',
    },
    desStyle: {
      type: String,
      value: '',
    },
  },

  /** 页面的初始数据 */
  data: {
    optionList: [],
    percentageVisible: true,
    iconStyle: '',
  },
  methods: {
    navigaTo: function (itemInfo) {
      const item = itemInfo?.currentTarget?.dataset?.item;
      if (item.tapStatus == 'inside') {
        const paramObj = {};
        if (item.withParams && item?.params) {
          for (let info of item.params) {
            paramObj[info.key] = info.value;
          }
        }
        item.paramObj = paramObj;
        let { app } = getWedaAPI();
        app.navigateTo({
          mode: 'weDa',
          pageId: item?.insideUrl,
          packageName: item?.packageName || '',
          params:
            item?.withParams && item?.params.length > 0 ? item.paramObj : null,
        });
      }
    },
  },
  observers: {
    'iconWidthSize,iconHeightSize,ColMobile': function (
      iconWidthSize,
      iconHeightSize,
      ColMobile
    ) {
      let standardHeight = ColMobile === 1 ? '200' : '98';
      const numReg = /^\d+$/;
      let width = numReg.test(iconWidthSize)
        ? iconWidthSize + 'px'
        : iconWidthSize;

      let height = numReg.test(iconHeightSize)
        ? iconHeightSize + 'px' //纯数字
        : iconHeightSize.indexOf('%') == -1
        ? iconHeightSize
        : (Number(standardHeight) * parseInt(iconHeightSize)) / 100 + 'px';
      let iconStyle = `width: ${width}; height: ${height}`;
      this.setData({ iconStyle });
    },

    'navOption,ColMobile': function (navOption, ColMobile) {
      let list = [];
      list.length = Math.floor(navOption.length / ColMobile);
      list.forEach((item, index) => {
        list[index] = [];
      });
      navOption.forEach((item, index) => {
        const _index = Math.floor(index / ColMobile);
        if (!list[_index] || list[_index].length <= 0) {
          // 保证每个col 的数据都是有的，列入总共7个数据，那么第二行的3， 4，5数据是undefined, 占位
          list[_index] = Array.apply(null, Array(ColMobile));
        }
        list[_index][index - _index * ColMobile] = item;
      });
      const optionList = list;
      this.setData({
        optionList,
      });
    },
    'titleMaxLines,titleColor,titleFontWeight,titleFontSize,textAlign,titleLineHeight':
      function (
        titleMaxLines,
        titleColor,
        titleFontWeight,
        titleFontSize,
        textAlign,
        titleLineHeight
      ) {
        let titleStyle = this.properties.titleStyle;
        titleStyle = `
      -webkit-line-clamp:${titleMaxLines ? titleMaxLines : 'revert'};
      color: ${titleColor};
      font-weight: ${titleFontWeight};
      font-size: ${titleFontSize}px;
      text-align: ${textAlign};
      line-height: ${titleLineHeight == 'auto' ? 'normal' : titleLineHeight};
      `;
        this.setData({ titleStyle });
      },
    'desMaxLines,desColor,desFontWeight,desFontSize,textAlign,desLineHeight':
      function (
        desMaxLines,
        desColor,
        desFontWeight,
        desFontSize,
        textAlign,
        desLineHeight
      ) {
        let desStyle = this.properties.desStyle;
        desStyle = `
      -webkit-line-clamp:${desMaxLines ? desMaxLines : 'revert'};
      color: ${desColor};
      font-weight: ${desFontWeight};
      font-size: ${desFontSize}px;
      text-align: ${textAlign};
      line-height: ${desLineHeight == 'auto' ? 'normal' : desLineHeight};
      `;
        this.setData({ desStyle });
      },
  },
});
