import { callDataSource } from '../../../utils/tcb';
import classNames from '../../../utils/classnames';
import customInfo from '../../../utils/getCustomInfo';
import { errorHandler } from '../../../utils/error';

// eslint-disable-next-line @typescript-eslint/no-var-requires
let QQMapWX = require('../../../utils/qqmap-wx-jssdk1.2/qqmap-wx-jssdk');
let qqmapsdk;

Component({
  options: {
    virtualHost: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    className: {
      type: String,
      value: '',
    },
    id: {
      Type: String,
      value: '',
    },
    style: {
      type: String,
      value: '',
    },
    label: {
      type: String,
      value: '标题',
    },
    labelVisible: {
      type: Boolean,
      value: true,
    },
    source: {
      type: String,
      value: '',
    },
    showLngLat: {
      type: Boolean,
      value: true,
    },
    showMap: {
      type: Boolean,
      value: true,
    },
    defauleShowLocation: {
      type: Boolean,
      value: true,
    },
    drag: {
      type: Boolean,
      value: true,
    },
    zoom: {
      type: Boolean,
      value: true,
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    requiredFlag: {
      type: Boolean,
      value: true,
    },
    value: {
      type: Object,
      value: {
        latitude: 39.98410411,
        longitude: 116.307503,
        poiname: '',
        detailedAddress: '',
      },
    },
    locationType: {
      type: Number,
      value: 1,
    },
    locationRange: {
      type: Number,
      value: 0,
    },
    customRange: {
      type: Number,
      value: 0,
    },
    dataSource: {
      type: Object,
    },
    layout: {
      type: String,
      value: '',
    },
    placeholder: {
      type: String,
      value: '选择地理位置',
    },
  },

  lifetimes: {
    attached: function () {
      this.setData({ id: this.id });
      const { locationType, dataSource } = this.properties;
      const getReverseGeocoder = async (location) => {
        const { isApikeyStatus } = this.data;
        let key = isApikeyStatus.apiKey
          ? isApikeyStatus.apiKey
          : await this.getApikey(dataSource.name, 'get');
        if (key) {
          qqmapsdk = new QQMapWX({
            key: key,
          });
          qqmapsdk.reverseGeocoder({
            location,
            success: ({ status, result }) => {
              if (status === 0) {
                let detailLocation = {
                  ...location,
                  poiname: result?.formatted_addresses?.recommend,
                  detailedAddress: result?.address,
                };
                let isCustomLocation = this.checkCustomLocation(
                  this.properties.value
                );
                if (isCustomLocation) {
                  this.setData({
                    currentLocations: detailLocation,
                  });
                } else {
                  this.setData({
                    location: detailLocation,
                    currentLocations: detailLocation,
                  });
                  this.setLocation(detailLocation);
                }
                if (locationType === 2 && this.data.initRef) {
                  this.changeValueFormat(detailLocation);
                  this.data.initRef = false;
                }
              }
            },
          });
        }
      };
      const drowMapMarks = (value) => {
        try {
          let { latitude, longitude } = value;
          let location = {
            latitude: Number(latitude.toFixed(6)),
            longitude: Number(longitude.toFixed(6)),
            poiname: '',
            detailedAddress: '',
          };
          // 表单为新增时回传点位信息
          let isCustomLocation = this.checkCustomLocation(
            this.properties.value
          );
          let customLocation = {
            latitude: isCustomLocation
              ? this.properties.value?.geopoint?.coordinates[1]
              : '',
            longitude: isCustomLocation
              ? this.properties.value?.geopoint?.coordinates[0]
              : '',
            poiname: this.properties.value?.address,
            detailedAddress: this.properties.value?.detailedAddress,
          };
          this.setData({
            currentLocations: location,
            currentPosition: {
              status: true,
              message: '',
            },
          });
          this.setLocation(
            isCustomLocation ? customLocation : location,
            isCustomLocation
          );
          if (!isCustomLocation) {
            locationType !== 1 && this.setData({ isAddrShow: true });
          } else {
            this.setData({
              isAddrShow: true,
            });
          }
          getReverseGeocoder(location);
        } catch (err) {
          const { comErrorInfo } = errorHandler({
            id: this.id,
            code: 'WdLocation.DrowMapMarksError',
            error: err,
          });
          this.triggerEvent('error', { error: comErrorInfo });
        }
      };
      const getCustomInfoLocation = () => {
        let customInfoLocation = customInfo.getCurrentLocation();
        if (
          !!customInfoLocation &&
          typeof customInfoLocation.then === 'function'
        ) {
          customInfoLocation
            .then((res) => {
              drowMapMarks(res);
            })
            .catch((error) => {
              this.triggerEvent('change', {
                value: {},
              });
              this.setData({
                currentPosition: {
                  status: false,
                  message: error,
                },
                currentLocations: {},
              });
              const { comErrorInfo } = errorHandler({
                id: this.id,
                code: 'WdLocation.GetCurrentLocationError',
                error,
              });
              this.triggerEvent('error', { error: comErrorInfo });
            });
        } else {
          drowMapMarks(customInfoLocation);
        }
      };

      if (locationType === 1 || locationType === 2) {
        // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
        wx.getSetting({
          success: (res) => {
            if (!res.authSetting['scope.userLocation']) {
              // 没有授权
              wx.authorize({
                scope: 'scope.userLocation',
                success: () => {
                  // 用户已经同意小程序使用定位功能，后续调用 wx.getLocation 接口不会弹窗询问
                  getCustomInfoLocation();
                },
                fail: (err) => {
                  this.setData({
                    currentPosition: {
                      status: false,
                      message: err.errMsg,
                    },
                    currentLocations: {},
                  });
                  this.triggerEvent('change', {
                    value: {},
                  });
                  const { comErrorInfo } = errorHandler({
                    id: this.id,
                    code: 'WdLocation.AuthorizeFail',
                    error: err,
                  });
                  this.triggerEvent('error', { error: comErrorInfo });
                },
              });
            } else {
              // 已经授权
              getCustomInfoLocation();
            }
          },
          fail: (err) => {
            const { comErrorInfo } = errorHandler({
              id: this.id,
              code: 'WdLocation.GetSettingFail',
              error: err,
            });
            this.triggerEvent('error', { error: comErrorInfo });
          },
        });
      }
      // 获取腾讯地图apikey
      if (dataSource?.name) {
        this.getApikey(dataSource.name);
      } else {
        this.setData({
          isApikeyStatus: {
            status: false,
            message: '请在编辑器属性区配置地图APIs',
            apiKey: '',
          },
        });
      }
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    location: {
      latitude: 39.98410411,
      longitude: 116.307503,
      poiname: '',
      detailedAddress: '',
    },
    markers: [],
    isAddrShow: false,
    currentPosition: {
      status: false,
      message: '获取当前定位中',
    },
    currentLocations: {},
    isMapChooseVisible: false,
    isApikeyStatus: {
      status: false,
      message: '地图初始化中',
      apiKey: '',
    },
    circleRadius: 0,
    cls: '',

    initRef: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async getApikey(dataSourceName, type) {
      try {
        if (!dataSourceName) {
          this.setData({
            isApikeyStatus: {
              status: false,
              message: '请在编辑器属性区配置地图APIs',
              apiKey: '',
            },
          });
          return;
        }
        const res = await callDataSource({
          dataSourceName: dataSourceName,
          methodName: 'getApiKey',
        });
        if (res.apiKey) {
          if (type === 'get') {
            return res.apiKey;
          }
          this.setData({
            isApikeyStatus: {
              status: true,
              message: '',
              apiKey: res.apiKey,
            },
          });
        }
      } catch (error) {
        this.setData({
          isApikeyStatus: {
            status: false,
            message: '获取apikey失败' + error,
            apiKey: '',
          },
        });
        const { comErrorInfo } = errorHandler({
          id: this.id,
          code: 'WdLocation.GetApikeyError',
          error,
        });
        this.triggerEvent('error', { error: comErrorInfo });
      }
    },
    chooseLocation() {
      const { currentPosition, isApikeyStatus } = this.data;
      if (this.properties.disabled || !currentPosition.status) {
        return wx.showToast({
          icon: 'none',
          title: currentPosition.status ? '已禁用' : currentPosition.message,
          duration: 2000,
        });
      }
      if (!isApikeyStatus.status) {
        return wx.showToast({
          icon: 'none',
          title: isApikeyStatus.message,
          duration: 2000,
        });
      }
      this.setData({
        isMapChooseVisible: true,
      });
    },
    changeLocation(location) {
      let isAddrShow = this.data.isAddrShow;
      if (!isAddrShow) {
        this.setData({
          isAddrShow: true,
        });
      }
      let marker = {
        id: 'weda-loc-markers',
        latitude: location.latitude,
        longitude: location.longitude,
      };
      this.setData({
        location,
        markers: [marker],
      });
      this.changeValueFormat(location);
    },
    checkCustomLocation(params) {
      if (
        !params?.address ||
        (params?.geopoint?.type && params?.geopoint?.type != 'Point')
      ) {
        return false;
      }
      return true;
    },
    setLocation(value, isCustomLocation) {
      const { locationType } = this.properties;
      const { latitude, longitude } = value;
      let marker = {
        id: 'weda-loc-markers',
        latitude,
        longitude,
      };
      this.setData({
        location: value,
        markers: locationType === 1 && !isCustomLocation ? [] : [marker],
      });
    },
    changeValueFormat(value) {
      const { latitude, longitude, poiname, detailedAddress } = value;
      let location = {
        address: poiname,
        detailedAddress,
        geopoint: {
          coordinates: [longitude, latitude],
          type: 'Point',
        },
      };
      this.triggerEvent('change', { value: location });
    },
    mapChooseOnClose() {
      this.setData({
        isMapChooseVisible: false,
      });
    },
    mapChooseOnConfirm(event) {
      this.setData({ isMapChooseVisible: false });
      const value = event.detail;
      this.changeLocation({
        ...value,
        poiname: value.address,
        detailedAddress: value.detailedAddress,
      });
    },
    handleError: function (e) {
      this.triggerEvent('error', e.detail);
    },
  },
  observers: {
    value: function (value) {
      const currentLocations = this.data.currentLocations;
      if (value || !currentLocations.latitude) {
        const {
          geopoint: { coordinates } = {},
          address: poiname,
          detailedAddress,
        } = value || {};

        if (!coordinates?.[0]) return;

        const location = {
          longitude: coordinates?.[0],
          latitude: coordinates?.[1],
          poiname,
          detailedAddress,
        };
        this.setLocation({
          longitude: location.longitude,
          latitude: location.latitude,
        });
        this.setData({ location, isAddrShow: true });
        return;
      }
      const locationType = this.properties.locationType;
      const { latitude, longitude } = currentLocations;
      let marker = {
        id: 'weda-loc-markers',
        latitude,
        longitude,
      };
      this.setData({
        location: currentLocations,
        markers: [marker],
        isAddrShow: false,
      });
      if (locationType === 2) {
        this.changeValueFormat(currentLocations);
        this.setData({
          isAddrShow: true,
        });
      }
    },
    'layout,className': function (layout, className) {
      const isFlex = layout !== 'vertical';
      const cls = classNames(
        ' weda-form-location weda-ui weda-formcells weui-cells weui-cells_form weui-cells_forms cloudbase_standard',
        {
          'weui-flex': isFlex,
          [className]: className,
        }
      );
      this.setData({ cls });
    },
  },
});
