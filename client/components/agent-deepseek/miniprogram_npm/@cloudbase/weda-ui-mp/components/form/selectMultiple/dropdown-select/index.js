Component({
  properties: {
    isActive: {
      type: Boolean,
      value: true,
    },
    mode: {
      type: String,
      value: 'selector',
    },
    option: {
      type: Array,
      value: [],
    },
    searchStatus: {
      type: Number,
      value: 0,
    },
    loadStatus: {
      type: Number,
      value: 0,
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    displayLabel: {
      type: Array,
      value: [],
    },
    isTurnPages: {
      type: Boolean,
      isTurnPages: false,
    },
    ignoreCase: {
      type: Boolean,
      value: true,
    },
    staticSearchable: {
      type: Boolean,
      value: true,
    },
    selectedValue: {
      type: Array,
      value: [],
    },
  },
  data: {
    height: '390px',
    focus: false,
    searchValue: '',
    disabledIndex: -1,
    status: 0,
    showOption: [],
    searchPageNo: 1,
    timeId: '',
    pageNo: 1,
    selectedCache: [], // 缓存当前选中值
  },

  lifetimes: {
    detached() {
      const id = this.data.timeId;
      if (id !== '') {
        clearTimeout(id);
      }
    },
  },
  methods: {
    cancelPicker: function (e) {
      this.triggerEvent('onSelectPicker', e.currentTarget.dataset);
    },
    isSelect: function () {
      return true;
    },
    // 监听输入
    bindinput: function (event) {
      const value = event.detail.value;
      this.setData({
        searchValue: value,
        pageNo: 1,
      });
      this.triggerEvent('search', { value });
    },
    // 清空输入
    clear: function () {
      this.setData({
        searchValue: '',
        showOption: this.properties.option,
        pageNo: 1,
      });
      this.triggerEvent('search', { value: '' });
    },
    // 取消
    shrink: function () {
      this.setData({
        height: '390px',
        focus: false,
        searchValue: '',
        pageNo: 1,
        showOption: this.properties.option,
      });
      this.triggerEvent('search', { value: '', noEvent: true });
    },
    closeModal: function () {
      const { option } = this.properties;
      this.setData({ selectedCache: option.filter((item) => item.check) });
      this.triggerEvent('onClosePicker', false);
    },
    confirmModal: function () {
      const { selectedCache } = this.data;
      this.triggerEvent('onSelectPicker', selectedCache);
      this.triggerEvent('onClosePicker', false);
    },
    // 获取焦点
    onFocus: function () {
      this.setData({
        height: '550px',
        focus: true,
      });
    },
    // 处理当前选中值
    dealSelectedValue(item) {
      const { selectedCache } = this.data;
      const index = selectedCache.findIndex((v) => v.value === item.value);
      if (index > -1) {
        return [
          ...selectedCache.slice(0, index),
          ...selectedCache.slice(index + 1),
        ];
      }

      return [...selectedCache, item];
    },
    // 选中项
    onItemClick: function (e) {
      const item = e.currentTarget.dataset.value;
      if (item.disabled) return;
      const selected = this.data.selectedCache;
      if (selected.length > 48) {
        const selectItem = selected.filter((el) => el === item.value);
        if (selectItem.length > 0) {
          this.setData({
            selectedCache: this.dealSelectedValue(item),
          });
        } else {
          wx.showToast({
            title: '最多选择50条数据',
            icon: 'none',
            duration: 2000,
          });
        }
      } else {
        this.setData({
          selectedCache: this.dealSelectedValue(item),
        });
      }
    },
    // 滚动到底部
    bindscrolltolower: function () {
      if (this.properties.loadStatus === 0) {
        const pageNo = this.data.pageNo + 1;
        this.setData({ pageNo });
        this.triggerEvent('_childFetchData', {
          pageNo,
          searchValue: this.data.searchValue,
        });
      }
    },
    // 重试
    onRetry: function () {
      const { pageNo } = this.data;
      if (this.properties.loadStatus === 2) {
        this.setData({
          status: 1,
        });
        this.triggerEvent('_childFetchData', {
          pageNo: pageNo,
          searchValue: this.data.searchValue,
        });
      }
    },
  },
  observers: {
    'option,searchValue,staticSearchable': function (
      option,
      searchValue,
      staticSearchable
    ) {
      const { ignoreCase } = this.properties;
      if (searchValue === '') {
        this.setData({
          showOption: option,
          status: option.length > 0 ? 0 : 3,
        });
      } else if (staticSearchable) {
        const searchRange = option.filter((item) => {
          if (ignoreCase) {
            return (
              String(item.label)
                .toLowerCase()
                .indexOf(searchValue.toLowerCase()) !== -1
            );
          }
          return item.label.indexOf(searchValue) !== -1;
        });
        this.setData({
          showOption: searchRange,
          status: searchRange.length > 0 ? 0 : 3,
        });
      } else {
        this.setData({
          showOption: option,
        });
      }
    },
    selectedValue: function (selectedValue) {
      const data = Array.isArray(selectedValue)
        ? selectedValue
        : [selectedValue];
      const optionMap = this.properties.option.reduce((pre, cur) => {
        pre[cur.value] = cur;
        return pre;
      }, {});
      const selectedCache = data
        .map((d) => optionMap[d])
        .filter((item) => !!item);
      this.setData({ selectedCache });
    },
  },
});
