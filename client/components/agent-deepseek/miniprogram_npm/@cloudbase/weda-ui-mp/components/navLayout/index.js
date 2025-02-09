import { getWedaAPI } from '../../utils/getWedaApi';

Component({
  options: {
    virtualHost: true,
    multipleSlots: true,
  },
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
    mobileCol: {
      type: Number,
      value: 4,
    },
    pcCol: {
      type: Number,
      value: 4,
    },
    iconSize: {
      type: String,
      value: 'default',
    },
    textColor: {
      type: String,
      value: 'rgb(0, 0, 0)"',
    },
    fontWeight: {
      type: String,
      value: 'normal',
    },
    lineHeight: {
      type: String,
      value: 'auto',
    },
    maxLines: {
      type: Number,
      value: 2,
    },
    fontSize: {
      type: Number,
      value: 14,
    },
  },
  data: {
    cls: '',
    optionList: [],
    titleStyle: '',
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
    'navOption,mobileCol': function (navOption, mobileCol) {
      let list = [];
      list.length = Math.floor(navOption.length / mobileCol);
      list.forEach((item, index) => {
        list[index] = [];
      });
      navOption.forEach((item, index) => {
        if (item.icon.includes('td:')) {
          item['tdicon'] = item.icon.split(':')[1];
        }
        const _index = Math.floor(index / mobileCol);
        if (!list[_index] || list[_index].length <= 0) {
          // 保证每个col 的数据都是有的，列入总共7个数据，那么第二行的3， 4，5数据是undefined, 占位
          list[_index] = Array.apply(null, Array(mobileCol));
        }
        list[_index][index - _index * mobileCol] = item;
      });
      const optionList = list;
      this.setData({
        optionList,
      });
    },
    'textColor,fontWeight,fontSize,lineHeight': function (
      textColor,
      fontWeight,
      fontSize,
      lineHeight
    ) {
      let titleStyle;
      // 添加文本颜色属性
      if (textColor !== '') {
        titleStyle = `color:${textColor}`;
      }

      // 添加对齐属性
      if (fontWeight !== '') {
        titleStyle = `${titleStyle};font-weight: ${fontWeight};font-size:${fontSize}px;line-height:${
          lineHeight == 'auto' ? 'normal' : lineHeight
        }`;
      }
      this.setData({ titleStyle });
    },
  },
});
