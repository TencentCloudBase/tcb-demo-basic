/** 根据当前环境获取 pc 上配置，还是 H5上的配置 */
const getConfig = () => {
  const pieH5 = {
    series: [
      {
        // name: 'demo',
        data: [
          { value: 820, name: '实例数据1', tooltip: {}, itemStyle: {} },
          { value: 932, name: '实例数据2', tooltip: {}, itemStyle: {} },
          { value: 901, name: '实例数据3', tooltip: {}, itemStyle: {} },
          { value: 934, name: '实例数据4', tooltip: {}, itemStyle: {} },
          { value: 1290, name: '实例数据5', tooltip: {}, itemStyle: {} },
        ],
        label: {
          show: true,
          position: 'inner',
          normal: {
            formatter: null,
            position: 'inner',
          },
        },
        type: 'pie',
        radius: '70%',
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
  return pieH5;
};
export default getConfig;
