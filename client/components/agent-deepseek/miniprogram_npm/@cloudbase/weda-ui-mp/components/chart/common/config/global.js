/** 根据当前环境获取 pc 上配置，还是 H5上的配置 */
const getConfig = () => {
  const globalH5 = {
    title: {
      text: 'demo实例',
      show: true,
      left: '45%',
    },
    legend: {
      top: '83%',
    },
    tooltip: {},
  };
  return globalH5;
};
export default getConfig;
