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
    searchOption: {
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
    chooseIndexValue: {
      type: String,
      value: '',
    },
    isTurnPages: {
      type: Boolean,
      isTurnPages: false,
    },
    pageNo: {
      type: Number,
      value: 1,
    },
    _needFetch: {
      type: Boolean,
      value: false,
    },
    ignoreCase: {
      type: Boolean,
      value: true,
    },
    staticSearchable: {
      type: Boolean,
      value: true,
    },
  },
  data: {
    height: '780rpx',
    focus: false,
    searchValue: '',
    disabledIndex: -1, // 预留参数，暂时无用
    clickIndex: 0,
    index: 0,
    status: 0,
    showOption: [],
    isFinish: false,
    currentIndex: 0,
    searchPageNo: 1,
    timeId: '',
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
    // 监听输入
    bindinput: function (event) {
      const value = event.detail.value;

      const {
        option,
        loadStatus,
        isTurnPages,
        _needFetch,
        ignoreCase,
        staticSearchable,
      } = this.properties;
      if (value === '' || value === this.data.searchValue) {
        this.setData({
          searchValue: value,
          searchPageNo: 1,
          showOption: option,
          status: loadStatus,
        });
      }
      this.setData({
        searchValue: value,
        searchPageNo: 1,
        showOption: [],
        status: 1,
      });
      const id = this.data.timeId;
      if (id !== '') {
        clearTimeout(id);
      }
      // eslint-disable-next-line rulesdir/no-timer
      const timeId = setTimeout(() => {
        if (isTurnPages && _needFetch) {
          // 接口搜索
          this.triggerEvent('_childFetchData', {
            isSearch: true,
            searchValue: value,
            pageNo: 1,
          });
        } else if (staticSearchable) {
          // 本地搜索

          const searchOption = option.filter((item) => {
            if (ignoreCase) {
              return String(item.label)
                .toLowerCase()
                .includes(value.toLowerCase());
            }
            return item.label.includes(value);
          });
          this.setData({
            showOption: searchOption,
            status: searchOption.length === 0 ? 3 : 0,
          });
        }
        this.triggerEvent('search', { value });
      }, 1000);
      this.setData({
        timeId,
      });
    },
    // 清空输入
    clear: function () {
      this.setData({
        searchValue: '',
        showOption: this.properties.option,
        status: this.properties.loadStatus,
      });
      this.triggerEvent('search', { value: '' });
    },
    // 取消
    shrink: function () {
      this.setData({
        height: '780rpx',
        focus: false,
        searchValue: '',
        showOption: this.properties.option,
        status: this.properties.loadStatus,
        index: this.data.clickIndex,
      });
    },
    // 获取焦点
    onFocus: function () {
      this.setData({
        height: '1100rpx',
        focus: true,
        index: -1,
      });
    },
    // 选中项
    onItemClick: function (e) {
      const item = e.currentTarget.dataset.value;
      if (item.disabled) return;
      this.triggerEvent('onSelectPicker', item);
    },
    // 滚动到底部
    bindscrolltolower: function () {
      if (!this.properties.isTurnPages) {
        return;
      }
      const { isFinish, searchValue, searchPageNo } = this.data;
      if (searchValue === '') {
        if (this.properties.loadStatus === 1 && isFinish) {
          this.setData({
            pageNo: this.properties.pageNo + 1,
            isFinish: false,
          });
          this.triggerEvent('_childFetchData', {
            isSearch: false,
            pageNo: this.properties.pageNo,
          });
        }
      } else {
        if (this.properties.searchStatus === 1 && isFinish) {
          this.setData({
            searchPageNo: this.data.searchPageNo + 1,
            isFinish: false,
          });
          this.triggerEvent('_childFetchData', {
            isSearch: true,
            pageNo: searchPageNo + 1,
            searchValue,
          });
        }
      }
    },
    // 重试
    onRetry: function () {
      const { pageNo, searchValue, searchPageNo } = this.data;
      if (searchValue === '') {
        if (this.properties.loadStatus === 2) {
          this.setData({
            status: 1,
          });
          this.triggerEvent('_childFetchData', {
            isSearch: false,
            pageNo: pageNo,
          });
        }
      } else {
        if (this.properties.searchStatus === 2) {
          this.setData({
            status: 1,
          });
          this.triggerEvent('_childFetchData', {
            isSearch: true,
            pageNo: searchPageNo,
            searchValue,
          });
        }
      }
    },
  },
  observers: {
    'option, loadStatus, searchOption, searchStatus, _needFetch, staticSearchable':
      function (
        option,
        loadStatus,
        searchOption,
        searchStatus,
        _needFetch,
        staticSearchable
      ) {
        if (this.data.searchValue === '') {
          // 初始化会走到这
          const { chooseIndexValue } = this.properties;
          let index = -1;
          if (chooseIndexValue !== '') {
            index = option.findIndex((item) => item.value === chooseIndexValue);
          } else {
            option.some((item, i) => {
              if (!item?.disabled) {
                index = i;
                return true;
              }
            });
          }
          this.setData({
            status: loadStatus,
            showOption: option,
            isFinish: true,
            index: index,
            clickIndex: index,
          });
        } else {
          if (_needFetch) {
            // 只有needFetch 才设置searchOption
            this.setData({
              status: searchStatus,
              showOption: searchOption,
              isFinish: true,
              index: -1,
            });
          } else if (!staticSearchable) {
            this.setData({
              status: searchStatus,
              showOption: option,
              isFinish: true,
              index: -1,
            });
          }
        }
      },
  },
});
