// 定位组件储存位置信息
let userLocation = null,
  getLocationPromise = null;

const getCurrentLocation = () => {
  if (userLocation) {
    return userLocation;
  }
  if (!getLocationPromise) {
    getLocationPromise = new Promise((resolve, reject) => {
      wx.getLocation({
        isHighAccuracy: true,
        type: 'gcj02',
        success: (res) => {
          getLocationPromise = null;
          userLocation = res;
          resolve(res);
          // 不知道
          // eslint-disable-next-line rulesdir/no-timer
          setTimeout(() => {
            userLocation = null;
          }, 1000 * 10);
        },
        fail: ({ errMsg }) => {
          reject(errMsg);
          getLocationPromise = null;
        },
      });
    });
  }
  return getLocationPromise;
};

module.exports.getCurrentLocation = getCurrentLocation;
