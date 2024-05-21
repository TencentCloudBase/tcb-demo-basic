/** 根据当前环境获取 pc 上配置，还是 H5上的配置 */
const getConfig = () => {
  const barH5 = {
    xAxis: {
      name: 'X轴名',
      nameTextStyle: { align: 'center' },
      axisLabel: {
        show: true, // 刻度标签显示
        rotate: 0, // 字体倾斜
      },
      axisTick: {
        show: true, // 刻度显示
      },
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      inverse: false,
    },
    yAxis: {
      type: 'value',
      show: true, // y轴刻度线
      name: 'Y轴名',
      splitLine: {
        lineStyle: {
          width: 1, // 网格线宽度，为0则不显示
          type: 'dashed', //solid,dashed,dotted
        },
      },
      axisLabel: { padding: [0, -10, 0, 0] },
      min: null,
      max: null,
    },
    series: [
      {
        name: 'demo',
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'bar',
        itemStyle: {
          color: 'green',
        },
        smooth: true,
        showSymbol: true, //是否显示线条上数据标签
        label: {
          show: true, // 显示线条上的数据
        },
      },
    ],
  };
  return barH5;
};
export default getConfig;
