import debounce from '../../../../../utils/debounce';
import { getCurrentLocation } from '../../../../../utils/getCustomInfo';
import { errorHandler } from '../../../../../utils/error';

// eslint-disable-next-line @typescript-eslint/no-var-requires
let QQMapWX = require('../../../../../utils/qqmap-wx-jssdk1.2/qqmap-wx-jssdk');
let qqmapsdk;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    id: {
      Type: String,
      value: '',
    },
    location: {
      type: Object,
      value: {
        latitude: 39.984104,
        longitude: 116.307503,
      },
    },
    currentLocations: {
      type: Object,
      value: {
        latitude: 39.984104,
        longitude: 116.307503,
      },
    },
    apiKey: {
      type: String,
      value: '',
    },
    circleRadius: {
      type: Number,
      value: 0,
    },
    customRange: {
      type: Number,
      value: 0,
    },
    isVisible: {
      type: Boolean,
      value: false,
    },
  },

  lifetimes: {
    attached: function () {
      this.getInitialization();
      this.setData({ id: this.id });
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    searchBoxHeight: 328,
    mapBoxHeight: wx.getSystemInfoSync().windowHeight - 328,
    isSearchFucos: false,
    searchValue: '',
    startY: 0, //滑动开始y轴位置
    lastY: 0, //滑动开始y轴位置
    markers: [],
    originMarker: {},
    circles: [],
    mapChoosedLocation: {
      latitude: 39.984104,
      longitude: 116.307503,
    },
    searchChoosedLocation: {
      latitude: 39.984104,
      longitude: 116.307503,
    },
    searchList: [],
    searchListPageSize: 1,
    searchLoadingStatus: false,
    suggestionList: [],
    suggestionChoosedLocation: null,
    isOutofrange: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getInitialization() {
      const { location, circleRadius, apiKey, customRange, currentLocations } =
        this.properties;
      // 实例化API核心类
      if (apiKey) {
        qqmapsdk = new QQMapWX({
          key: apiKey,
        });
      }
      let marker = {
        id: 'id-marker',
        latitude: location.latitude,
        longitude: location.longitude,
      };
      let originMarker = {
        id: 'origin',
        latitude: currentLocations.latitude,
        longitude: currentLocations.longitude,
        width: 70,
        height: 70,
        anchor: { x: 0.5, y: 0.4 },
        iconPath:
          'https://qcloudimg.tencent-cloud.cn/raw/cad6952cb624c02294e5ead860f9c94f.png',
      };
      let circle = {
        latitude: currentLocations.latitude,
        longitude: currentLocations.longitude,
        fillColor: '#b9cae48f',
        strokeWidth: 1,
        color: '#fff',
      };
      if (circleRadius > 0) {
        circle.radius = circleRadius;
        this.setData({
          circles: [circle],
        });
      } else if (circleRadius < 0 && customRange > 0) {
        circle.radius = customRange;
        this.setData({
          circles: [circle],
        });
      }
      this.setData({
        markers: [marker, originMarker],
        originMarker,
        mapChoosedLocation: location,
      });
      // 小程序sdk探索周边poi的api必填参数POI搜索关键字，默认用路做为关键字返回的周边结果更为全面
      this.searchLocation('路', 1, marker, this);
    },
    // 监听页面滚动事件
    handletouchmove(event) {
      let currentY = event.changedTouches[0].clientY;
      let status = currentY <= this.data.startY;
      this.setSearchBoxHeight(status);
    },
    //滑动开始事件
    handletouchstart: function (event) {
      this.data.startY = event.changedTouches[0].clientY;
    },
    setIsSearchFucos(event) {
      const { status, clear } = event.currentTarget.dataset;
      let value = {
        isSearchFucos: status,
      };
      if (!status) {
        value.searchValue = '';
      }
      if (clear) {
        this.setData({
          suggestionList: [],
        });
      }
      this.setData({
        ...value,
      });
      this.setSearchBoxHeight(status);
    },
    changeSearchValue(event) {
      const { value } = event.detail;
      this.setData({
        searchValue: value,
      });
      if (!value) {
        // https://git.woa.com/QBase/lcap/weda-ui/merge_requests/406#note_70519577
        // eslint-disable-next-line rulesdir/no-timer
        setTimeout(() => {
          this.setData({
            suggestionList: [],
          });
        }, 300);
        return;
      }
      const { latitude, longitude } = this.data.markers[1];
      this.getSuggestion(value, `${latitude},${longitude}`, this);
    },
    setSearchBoxHeight(status) {
      const { isOutofrange } = this.data;
      const windowHeight = wx.getSystemInfoSync().windowHeight;
      const boxHeight = windowHeight * 0.75;
      let searchBoxHeight = isOutofrange ? 328 - 46 : 328;
      // isOutofrange 出现超出范围提示
      if (status) {
        searchBoxHeight = isOutofrange ? boxHeight - 46 : boxHeight;
      }
      this.setData({
        searchBoxHeight,
        mapBoxHeight: status ? windowHeight - boxHeight : windowHeight - 328,
      });
    },
    handleSetSearchBoxHeight(event) {
      const { status } = event.currentTarget.dataset;
      this.setSearchBoxHeight(status);
    },
    clearSearch() {
      this.setData({
        searchValue: '',
        suggestionList: [],
      });
    },
    handleMap() {
      this.setSearchBoxHeight(false);
    },
    regionchange(event) {
      let {
        type,
        causedBy,
        detail: { centerLocation },
      } = event;
      const { circles } = this.data;
      if (type === 'begin') return;
      let marker = {
        id: 'id-marker',
        latitude: centerLocation.latitude,
        longitude: centerLocation.longitude,
      };
      this.setData({
        markers: [this.data.originMarker, marker],
        searchListPageSize: 1,
      });
      if (causedBy === 'drag') {
        this.setData({
          searchChoosedLocation: {},
        });
        this.searchLocation('路', 1, this.data.markers[1], this);
        this.setIsSearchFucos({
          currentTarget: { dataset: { clear: true, status: false } },
        });
      }
      // 计算距离
      if (circles && circles.length > 0) {
        const { radius } = circles[0];
        const distance = this.calculateDistance(
          this.data.markers[1],
          this.data.markers[0]
        );
        let isOutofrange = radius && radius < distance;
        this.setData({
          isOutofrange,
        });
        this.setSearchBoxHeight(false);
      }
    },
    searchLocation: debounce((value, page_index, location, _this) => {
      const { searchList } = _this.data;
      _this.setData({
        searchLoadingStatus: true,
      });
      if (qqmapsdk) {
        qqmapsdk.search({
          keyword: value,
          page_index,
          location,
          success: ({ status, data, count }) => {
            if (status === 0 && count != 0) {
              let list = [...searchList, ...data];
              if (page_index === 1) {
                list = data;
                // 当前位置选中
                _this.setRealLocation(location, list, _this);
              } else {
                _this.setData({
                  searchList: list,
                });
              }
            } else {
              _this.setRealLocation(location, [], _this);
            }
            _this.setData({
              searchLoadingStatus: false,
            });
          },
          fail: function (error) {
            const { comErrorInfo } = errorHandler({
              id: this.id,
              code: 'WdLocation.SearchError',
              error: error,
            });
            this.triggerEvent('error', { error: comErrorInfo });
            _this.setData({
              searchLoadingStatus: false,
            });
            _this.setRealLocation(location, [], _this);
          },
        });
      }
    }, 200),
    getSuggestion: debounce((value, location, _this) => {
      if (qqmapsdk) {
        qqmapsdk.getSuggestion({
          keyword: value,
          location,
          page_size: 20,
          success: function ({ status, data }) {
            //搜索成功后的回调
            if (status === 0) {
              _this.setData({
                suggestionList: data,
              });
            }
          },
          fail: function (error) {
            const { comErrorInfo } = errorHandler({
              id: this.id,
              code: 'WdLocation.GetSuggestionError',
              error: error,
            });
            this.triggerEvent('error', { error: comErrorInfo });
          },
        });
      }
    }, 200),
    setRealLocation(location, list, _this) {
      qqmapsdk.reverseGeocoder({
        location,
        success: ({ status, result }) => {
          if (status == 0) {
            let detailedAddress = result.address;
            let address = result?.formatted_addresses?.recommend;
            let item = {
              id: 'current-location',
              location: {
                lat: location.latitude,
                lng: location.longitude,
              },
              title: address ? address : detailedAddress,
              address: address ? address : detailedAddress,
              detailedAddress,
              latitude: location.latitude,
              longitude: location.longitude,
            };
            _this.setData({
              searchList: [item, ...list],
              searchChoosedLocation: item,
            });
          }
        },
        fail: (error) => {
          const { comErrorInfo } = errorHandler({
            id: this.id,
            code: 'WdLocation.ReverseGeocoderError',
            error: error,
          });
          this.triggerEvent('error', { error: comErrorInfo });
          let item = {
            id: 'current-location',
            location: {
              lat: location.latitude,
              lng: location.longitude,
            },
            title: '[位置]',
            address: '暂无地址信息',
            detailedAddress: '暂无地址信息',
            latitude: location.latitude,
            longitude: location.longitude,
          };
          _this.setData({
            searchList: [item],
            searchChoosedLocation: item,
          });
        },
      });
    },
    handleLocation(event) {
      const { value } = event.currentTarget.dataset;
      const { location, address, title, id } = value;
      let item = {
        id,
        latitude: location.lat,
        longitude: location.lng,
        address: title,
        detailedAddress: address,
      };
      this.setData({
        mapChoosedLocation: item,
        searchChoosedLocation: item,
        suggestionChoosedLocation: null,
      });
    },
    handleSuggestionLocation(event) {
      const { value } = event.currentTarget.dataset;
      const { location, address, title, id, _distance } = value;
      let item = {
        id,
        title,
        location,
        _distance,
        latitude: location.lat,
        longitude: location.lng,
        address: title,
        detailedAddress: address,
      };
      this.setData({
        mapChoosedLocation: item,
        searchChoosedLocation: item,
        suggestionChoosedLocation: item,
      });
    },
    scrolltolower() {
      const { searchListPageSize, searchList, isSearchFucos } = this.data;
      if (searchList.length >= 50 || isSearchFucos) {
        return;
      }
      this.searchLocation(
        '路',
        searchListPageSize + 1,
        this.data.markers[1],
        this
      );
    },
    handleConfirm() {
      const { isOutofrange, searchChoosedLocation, mapChoosedLocation } =
        this.data;
      if (isOutofrange || !searchChoosedLocation.id) {
        return;
      }
      this.setIsSearchFucos({
        currentTarget: { dataset: { clear: true, status: false } },
      });
      if (
        mapChoosedLocation.latitude !== searchChoosedLocation.latitude ||
        mapChoosedLocation.longitude !== searchChoosedLocation.longitude
      ) {
        this.setData({ mapChoosedLocation: searchChoosedLocation });
      }
      this.triggerEvent('onConfirm', searchChoosedLocation);
    },
    async handleMapControl() {
      const lc = await this.getLatestLc();
      const originMarker = Object.assign({}, this.data.originMarker, lc);
      this.setData({
        mapChoosedLocation: originMarker,
        searchChoosedLocation: {},
      });
      this.setIsSearchFucos({
        currentTarget: { dataset: { clear: true, status: false } },
      });
      this.searchLocation('路', 1, originMarker, this);
    },
    handleClose() {
      this.setIsSearchFucos({
        currentTarget: { dataset: { clear: true, status: false } },
      });
      this.setData({
        mapChoosedLocation: this.data.location,
      });
      this.triggerEvent('onClose');
    },
    calculateDistance(latlng1, latlng2) {
      let lat1 = latlng1.latitude;
      let lng1 = latlng1.longitude;
      let lat2 = latlng2.latitude;
      let lng2 = latlng2.longitude;
      var radLat1 = (lat1 * Math.PI) / 180.0;
      var radLat2 = (lat2 * Math.PI) / 180.0;
      var a = radLat1 - radLat2;
      var b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0;
      var s =
        2 *
        Math.asin(
          Math.sqrt(
            Math.pow(Math.sin(a / 2), 2) +
              Math.cos(radLat1) *
                Math.cos(radLat2) *
                Math.pow(Math.sin(b / 2), 2)
          )
        );
      s = s * 6378.137; // EARTH_RADIUS;
      s = Math.round(s * 10000) / 10000;
      return s * 1000;
    },
    bindscroll(event) {
      const { searchBoxHeight } = this.data;
      if (searchBoxHeight !== 328 && searchBoxHeight !== 282) {
        return;
      }
      if (event.detail.deltaY < 0 && event.detail.deltaY > -15) {
        this.setSearchBoxHeight(true);
      }
    },
    // 获取设备最新位置
    getLatestLc: async function () {
      let location;
      try {
        const value = await getCurrentLocation();
        const { latitude, longitude } = value;
        location = {
          latitude: Number(latitude.toFixed(6)),
          longitude: Number(longitude.toFixed(6)),
        };
      } catch (e) {
        const { comErrorInfo } = errorHandler({
          id: this.id,
          code: 'WdLocation.GetLatestLocationError',
          error: e,
        });
        this.triggerEvent('error', { error: comErrorInfo });
      }
      return location;
    },
  },
  observers: {
    'apiKey,location': function () {
      this.getInitialization();
    },
  },
});
