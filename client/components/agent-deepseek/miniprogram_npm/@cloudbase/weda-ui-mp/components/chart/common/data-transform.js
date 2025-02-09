import lodashSet from 'lodash.set';
import { isNil } from '../../../utils/lodash';

export const checkIsNewData = (props) => {
  return (
    Object.keys(props.dataSource ?? {}).length === 0 &&
    Object.keys(props['dataModel'] ?? {}).length > 0
  );
};

export function transform(chartType, dataInput, chartInput) {
  if (!Array.isArray(dataInput)) {
    console.warn('Chart 数据输入值应该是数组');
    dataInput = [];
  }

  const title = {
    text: chartInput.title,
    show: chartInput.isTitle,
    left: '35%',
    top: '-1%',
    right: null,
  };
  const legend = {
    show: chartInput.isLegend,
  };

  switch (chartInput.legend) {
    case 'top':
      legend.orient = 'horizontal';
      legend.top = '6%';
      break;

    case 'left':
      legend.orient = 'vertical';
      legend.top = '30%';
      legend.left = '1%';
      break;

    case 'right':
      legend.orient = 'vertical';
      legend.top = '30%';
      legend.right = '6%';
      break;

    default:
      legend.top = '89%';
      legend.orient = 'horizontal';
      break;
  } // const numberOfYAxis = dataInput?.[0]?.YLabels.length ?? 0;
  // const sortedDataInput = dataInput.sort((a, b) => {
  //   // if (['datetime', 'date', 'time'].includes(formatType)) {
  // });
  // APIs或者变量不用前端排序
  // 是否显示空值

  const finalDataInput = (dataInput ?? [])?.filter((item) => {
    if (!chartInput.xIsCountEmpty) {
      return (
        item.XLabel['Value'] !== undefined && item.XLabel['Value'] !== null
      );
    }

    return true;
  });

  const formatter = ({ value, percent }) => {
    let val = Number(value);
    let result = '';

    if (chartInput.isUnit) {
      val = val / chartInput.unit;
    }

    result = `${val.toFixed(chartInput.decimalDigits)}${chartInput.suffix}`;
    if (chartInput.isPercent && !isNil(percent)) {
      result = `${result}(${percent}%)`;
    }
    return result;
  };

  const series = [];
  const groups = [];
  finalDataInput.forEach((eachAxis) => {
    eachAxis.YLabels.forEach((yLabel) => {
      if (yLabel.Group_Name && groups.indexOf(yLabel.Group_Name) < 0) {
        // 去重且保留顺序
        groups.push(yLabel.Group_Name);
      }
    });
  }); //

  if (chartType === 'pie' && groups.length > 0) {
    throw new Error('饼图没有分组功能');
  }

  if (groups.length <= 0) {
    finalDataInput.forEach((item) => {
      item.YLabels.forEach((eachYaxis, idx) => {
        if (!series[idx]) {
          series[idx] = {
            type: chartType,
            name:
              chartType === 'pie'
                ? undefined
                : eachYaxis.Cn_Name ?? eachYaxis.Name,
            stack: chartInput.isPile ? 'pile' : undefined,
            showSymbol:
              chartType === 'pie' ? undefined : chartInput.isSeriesShowSymbol,
            label: {
              show: chartInput.isSeriesShowSymbol, // 老逻辑这么来的
            },
            itemStyle:
              chartType === 'pie'
                ? undefined
                : {
                    color: chartInput?.setColor?.[idx % 6] ?? null,
                  },
            data:
              chartType === 'pie'
                ? [
                    {
                      value: eachYaxis.Value,
                      name: item.XLabel.Value.toString(),
                    },
                  ]
                : [eachYaxis.Value],
          };

          if (chartInput.isUnit || chartInput.isPercent) {
            series[idx].label.formatter = formatter;
          }
        } else {
          if (chartType === 'pie') {
            series[idx].data.push({
              value: eachYaxis.Value,
              name: item.XLabel.Value.toString(),
            });
          } else {
            series[idx].data.push(eachYaxis.Value);
          }
        }

        if (chartType === 'pie') {
          lodashSet(series[idx], 'label.position', 'inner');

          if (chartInput.chartType === 'pie') {
            series[idx]['radius'] = '70%';
          } else {
            series[idx]['radius'] = ['40%', '70%'];
          }
          series[idx]['emphasis'] = {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          };
        }
      });
    });
  } else {
    // 先给每个分组留位置
    groups.forEach((groupName, idx) => {
      series.push({
        type: chartType,
        name: groupName,
        stack: chartInput.isPile ? 'pile' : undefined,
        showSymbol:
          chartType === 'pie' ? undefined : chartInput.isSeriesShowSymbol,
        label: {
          show: chartInput.isSeriesShowSymbol, // 老逻辑这么来的
        },
        itemStyle:
          chartType === 'pie'
            ? undefined
            : {
                color: chartInput?.setColor?.[idx % 6] ?? null,
              },
        data: [],
      });
    }); // 然后再往data里放东西

    finalDataInput.forEach((item) => {
      item.YLabels.forEach((eachYaxis) => {
        if (eachYaxis.Group_Name) {
          series[groups.indexOf(eachYaxis.Group_Name)].data.push({
            value: eachYaxis.Value,
            name: eachYaxis.Cn_Name ?? eachYaxis.Name,
          });

          for (let i = 0; i < groups.length; i++) {
            if (groups.indexOf(eachYaxis.Group_Name) !== i) {
              series[i].data.push({
                value: null,
              });
            }
          }
        }
      });
    });
  }

  console.log(dataInput, chartInput, 'TRANSFORM');

  if (chartType === 'bar' || chartType === 'line') {
    const xAxis = {
      name: chartInput.isXaxisName ? chartInput.xAxisName : '',
      nameTextStyle: {
        align: 'center',
      },
      axisLabel: {
        show: chartInput.isXaxisAxisLabelShow,
        // 禁用默认的小屏幕自适应隐藏列
        interval: 0,
        rotate: chartInput.isXaxisAxisLabelRotate ? 30 : 0,
      },
      axisTick: {
        show: chartInput.isXaxisAxisTickShow,
      },
      // 老逻辑是这样的，但看不懂为啥
      inverse: chartInput.directionType === 'crosswise',
      type: 'category',
      data: [],
    };
    const yAxis = {
      show: chartInput.isYAxisShow,
      name: chartInput.isYAxisName ? chartInput.yAxisName : '',
      splitLine: {
        lineStyle: {
          width: chartInput.isYAxisSplitlineLinestyleWidth ? 1 : 0,
          type: chartInput.yAxisSplitlineLinestyleType,
        },
      },
      axisLabel: {
        padding: [0, -10, 0, 0],
        formatter: null,
      },
      min: chartInput.yAxisMin || null,
      max: chartInput.yAxisMax || null,
      type: 'value',
    };
    xAxis.data = finalDataInput.map((item) => {
      return item.XLabel.Value ?? null;
    });

    if (chartInput.isUnit) {
      yAxis.axisLabel.formatter = (value) => formatter({ value });
    }

    if (chartInput.directionType === 'crosswise') {
      return {
        title,
        legend,
        xAxis: yAxis,
        yAxis: xAxis,
        series,
      };
    }

    return {
      title,
      legend,
      xAxis,
      yAxis,
      series,
    };
  }

  if (chartType === 'pie') {
    const result = {
      title,
      legend,
      series,
      tooltip: {
        trigger: 'item',
      },
    };
    if (chartInput.setColor && chartInput.setColor.length > 0) {
      result['color'] = chartInput.setColor;
    }
    return result;
  }
}
