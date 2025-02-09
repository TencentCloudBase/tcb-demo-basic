import { commonCompBehavior } from '../../utils/common-behavior';
import { WD_PREFIX } from '../../utils/constant';
import handleEvents from '../../utils/handleEvents';
Component({
  options: {
    virtualHost: true,
    multipleSlots: true,
  },
  behaviors: [commonCompBehavior],
  properties: {
    className: {
      type: String,
      value: '',
    },
    style: {
      type: String,
      value: '',
    },
    id: {
      type: String,
      value: '',
    },
    isMultipleSlot: {
      type: Boolean,
      value: false,
    },
    isSlotAuto: {
      type: Boolean,
      value: false,
    },
    selectedValue: {
      type: String,
      value: '1',
    },
    list: {
      type: Array,
      value: [],
    },
  },
  data: {
    cls: '',
    classPrefix: WD_PREFIX,
    currentIndex: 0,
    tabsData: [],
    slotKey: '1',
  },
  lifetimes: {
    attached() {
      this.updateWidgetAPI();
      this.setCurrentIndex();
    },
  },
  methods: {
    getCurrent: function (e) {
      this.setData({
        currentIndex: e.detail,
      });
      const idx = e.detail;
      this.triggerEvent('change', {
        value: this.data.tabsData?.[idx]?.value,
      });
    },
    choooseTab: function (params) {
      const value = params?.value;
      const index = this.properties.list.findIndex((i) => i.value === value);
      this.setData({
        currentIndex: index,
      });
    },
    updateWidgetAPI() {
      this.setReadonlyAttributes &&
        this.setReadonlyAttributes({
          isMultipleSlot: this.properties.isMultipleSlot,
          selectedValue: this.properties.list.find(
            (i, index) => index === this.data.currentIndex
          )?.value,
          list: this.properties.list,
          selectTab: this.choooseTab.bind(this),
        });
    },
    setCurrentIndex(selectedValue = this.properties.selectedValue) {
      const index = this.properties.list.findIndex(
        (i) => i.value === selectedValue
      );
      if (index !== this.data.currentIndex) {
        this.setData({
          currentIndex: index,
          slotKey: this.properties.list[index]?.slotKey || '1',
        });
      }
    },
    ...handleEvents([
      {
        name: 'tap',
        title: '点击',
      },
      {
        name: 'change',
        title: '类别切换',
      },
    ]),
  },
  observers: {
    'selectedValue, list': function (selectedValue) {
      this.setCurrentIndex(selectedValue);
    },
    'currentIndex, list': function (currentIndex, list) {
      const tabData = list.map((item, index) => {
        return {
          ...item,
          selected: index === currentIndex,
        };
      });
      this.setData({
        tabsData: tabData,
        slotKey: this.properties.list[currentIndex]?.slotKey || '1',
      });
      this.updateWidgetAPI();
    },
  },
});
