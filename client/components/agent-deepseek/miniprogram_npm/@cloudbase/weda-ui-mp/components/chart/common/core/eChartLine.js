import EchartBase from './eChartBase';
import getConfig from '../config/line';
import lodashSet from 'lodash.set';

/**
 * 折线图表
 * @author loonglong
 **/
class EchartLine extends EchartBase {
  constructor() {
    super();
    const config = getConfig();
    this.config = { ...this.config, ...config };
  }
  async setSourceData({
    dataSource,
    filterData,
    xField,
    xStatistics,
    xIsCountEmpty,
    yField,
    groupKey,
    groupKeyTimeSpan,
  }) {
    xField = xField || {}; // 向前兼容
    const { name = '', type = '', methodName = '' } = dataSource;
    if (name !== '') {
      const params = this.createWhere({
        filterData,
        xField,
        xStatistics,
        xIsCountEmpty,
        yField,
        groupKey,
        groupKeyTimeSpan,
      });
      const arrSourData = await this.getSourceData(
        name,
        methodName,
        type,
        params
      );
      // 获取 x 轴数据
      const sortedXAxisData = this.sortXAxisData(arrSourData, xField.format);
      const arrXaxisData = this.setXaxis(sortedXAxisData, xField.format);
      const arrXisCountEmptyIndex = []; // 记录空值的key
      this.config.series = [];

      if (!groupKey?.name) {
        if (sortedXAxisData.length > 0) {
          const numLine = arrSourData[0].YLabels.length;
          if (numLine > 0) {
            for (let j = 0; j < numLine; j++) {
              this.config.series[j] = {
                type: 'line',
                smooth: true,
                name: '',
                connectNulls: true,
                showSymbol: true,
                label: {
                  show: true,
                },
                data: [],
              };
              sortedXAxisData.forEach((itemSource, index) => {
                this.config.series[j].name =
                  itemSource.YLabels[j]?.Cn_Name ?? itemSource.YLabels[j].Name;
                if (
                  (!itemSource.YLabels[j].Value === undefined ||
                    itemSource.YLabels[j].Value === null) &&
                  !xIsCountEmpty
                ) {
                  arrXisCountEmptyIndex.push(index);
                } else {
                  const value = itemSource.YLabels[j].Value
                    ? itemSource.YLabels[j].Value
                    : 0;
                  this.config.series[j].data.push(value);
                }
              });
            }
          }
        }
        // 处理显示空值问题
        this.setEmptyValue(xIsCountEmpty);
      } else if (groupKey?.name) {
        // 如果是分组，则这里需要特殊处理
        // 按groupKey分组存放数据值
        const objGroupKey = {}; // {'分组字段':[{value:'统计的值', dimensionality:'维度名', name:'统计的数值字段名'}]}
        sortedXAxisData.forEach((itemSourData) => {
          itemSourData.YLabels.forEach((yLabel) => {
            if (!objGroupKey[yLabel.Group_Name]) {
              objGroupKey[yLabel.Group_Name] = [];
            }
            objGroupKey[yLabel.Group_Name].push({
              value: yLabel.Value,
              dimensionality: itemSourData.XLabel.Value,
              name: yLabel.Cn_Name,
            });
          });
        });

        // 组装图表需要的数据
        const groups = [];
        sortedXAxisData.forEach((eachAxis) => {
          eachAxis.YLabels.forEach((yLabel) => {
            if (yLabel.Group_Name && groups.indexOf(yLabel.Group_Name) < 0) {
              // 去重且保留顺序
              groups.push(yLabel.Group_Name);
            }
          });
        });

        this.config.series = groups.map((groupKey) => {
          // groupKey分组字段中文名
          const serie = {
            name: groupKey,
            connectNulls: true,
            data: this.getSeriesDataGroup(arrXaxisData, objGroupKey[groupKey]),
            type: 'line',
            smooth: true,
            showSymbol: true, // 是否显示线条上数据标签
            label: {
              show: true, // 显示线条上的数据
            },
          };
          return serie;
        });
        this.config.tooltip.formatter = (params) =>
          `${params.data.dimensionality}\r\n${params.data.name}\r\n${params.seriesName}:${params.value}`;
      }
    }
  }
  setColor({ setColor }) {
    if (this.config.series.length > 0 && setColor && setColor.length > 0) {
      let i = 0;
      this.config.series.forEach((itemSeries) => {
        lodashSet(itemSeries, 'itemStyle.color', setColor[i % 6]);
        i = i + 1;
      });
    }
  }

  setChartType({ chartType }) {
    this.config.series.length > 0 &&
      this.config.series.forEach((itemSeries) => {
        itemSeries.smooth = chartType !== 'line';
      });
  }

  // 显示图表上的数据标签 单位，标签，小数位数，后缀
  setIsSeriesShowSymbol({
    isSeriesShowSymbol,
    isUnit,
    unit,
    decimalDigits,
    suffix,
  }) {
    decimalDigits = decimalDigits < 0 ? 0 : decimalDigits;
    this.config.series.length > 0 &&
      this.config.series.forEach((itemSeries) => {
        itemSeries.showSymbol = isSeriesShowSymbol;
        itemSeries.label.show = isSeriesShowSymbol;
        if (isUnit) {
          itemSeries.label.formatter = (params) => {
            const objNewValue = this.getValueByUnit(params.value, unit);
            return `${objNewValue.toFixed(decimalDigits)}${suffix}`;
          };
        }
      });
    if (isUnit) {
      this.config.yAxis.axisLabel.formatter = (value) => {
        const objNewValue = this.getValueByUnit(value, unit);
        return `${objNewValue.toFixed(decimalDigits)}${suffix}`;
      };
    } else {
      this.config.yAxis.axisLabel.formatter = null;
    }
  }
  async setOptions({
    chartType,
    setColor,
    isTitle,
    title,
    titleLocation,
    dataSource,
    filterData,
    xField,
    xStatistics,
    groupKey,
    groupKeyTimeSpan,
    xIsCountEmpty,
    yField,
    isLegend,
    legend,
    isXaxisName,
    xAxisName,
    isXaxisAxisLabelShow,
    isXaxisAxisTickShow,
    isXaxisAxisLabelRotate,
    isYAxisSplitlineLinestyleWidth,
    yAxisSplitlineLinestyleType,
    yAxisMax,
    yAxisMin,
    isYAxisName,
    yAxisName,
    isSeriesShowSymbol,
    isYAxisShow,
    isUnit,
    unit,
    decimalDigits,
    suffix,
  }) {
    if (dataSource) {
      await this.setSourceData({
        dataSource,
        filterData,
        xField,
        xStatistics,
        xIsCountEmpty,
        yField,
        groupKey,
        groupKeyTimeSpan,
      });
    }
    this.setChartType({ chartType });
    this.setColor({ setColor });
    this.setTitle({ isTitle, title, titleLocation });
    this.setLegend({ isLegend, legend });
    this.setIsXaxisAxisLabelShow({ isXaxisAxisLabelShow });
    this.setIsXaxisName({ isXaxisName, xAxisName });
    this.setIsXaxisAxisTickShow({ isXaxisAxisTickShow });
    this.setIsXaxisAxisLabelRotate({ isXaxisAxisLabelRotate, xStatistics });
    this.setIsYAxisSplitlineLinestyleWidth({
      isYAxisSplitlineLinestyleWidth,
      yAxisSplitlineLinestyleType,
    });
    this.setYAxisMaxMin({ yAxisMax, yAxisMin });
    this.setIsYAxisName({ isYAxisName, yAxisName });
    this.setIsYAxisShow({ isYAxisShow });
    this.setIsSeriesShowSymbol({
      isSeriesShowSymbol,
      isUnit,
      unit,
      decimalDigits,
      suffix,
    });
  }
}

export default EchartLine;
