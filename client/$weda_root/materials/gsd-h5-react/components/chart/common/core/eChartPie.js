import EchartBase from './eChartBase';
import getConfig from '../config/pie';
/**
 * 饼状图表
 * @author loonglong
 **/
class EchartPie extends EchartBase {
  constructor() {
    super();
    const config = getConfig();
    this.config = { ...this.config, ...config };
  }
  async setSourceData({
    dataSource,
    filterData,
    setColor,
    xField,
    xStatistics,
    xIsCountEmpty,
    yField,
  }) {
    const { name = '', type = '', methodName = '' } = dataSource;
    if (name !== '') {
      const params = this.createWhere({
        filterData,
        xField,
        xStatistics,
        xIsCountEmpty,
        yField,
      });
      const arrSourData = await this.getSourceData(
        name,
        methodName,
        type,
        params
      );
      // 获取 x 轴数据
      if (arrSourData.length > 0) {
        const numPie = arrSourData[0].YLabels.length;
        if (numPie > 0) {
          const arrData = [];
          let i = 0;
          arrSourData.forEach((itemSource) => {
            const numc = setColor ? setColor.length : 0;
            const strColor = numc > 0 ? { color: setColor[i % numc] } : {};
            arrData.push({
              value: itemSource.YLabels[0].Value,
              name: itemSource.XLabel.Value,
              tooltip: {},
              itemStyle: strColor,
            });
            i = i + 1;
          });
          this.config.series[0].data = arrData;
        }
      } else {
        // this.config['series'][0].data = [];
      }
    }
  }
  setChartType({ chartType }) {
    this.config.series.length > 0 &&
      this.config.series.forEach((itemSeries) => {
        if (chartType === 'pie') {
          itemSeries.radius = '70%';
        } else {
          itemSeries.radius = ['40%', '70%'];
        }
      });
  }

  // 显示图表上的数据标签 单位，标签，小数位数，后缀
  setIsSeriesShowSymbol({
    isSeriesShowSymbol,
    isPercent,
    isUnit,
    unit,
    decimalDigits,
    suffix,
  }) {
    decimalDigits = decimalDigits < 0 ? 0 : decimalDigits;
    let show = false;
    let position = 'inner';
    let formatter = null;
    if (isSeriesShowSymbol || isPercent || isUnit) {
      formatter = '';
    }
    this.config.series[0].label.show = show;
    this.config.series[0].label.position = position;
    if (formatter === null) {
      this.config.series[0].label.normal = null;
    } else {
      this.config.series[0].label.normal.formatter = (objValue) => {
        let reData = '';
        if (isSeriesShowSymbol) {
          // 显示数值
          reData = objValue.value;
        }
        if (isUnit) {
          // 显示单位
          if (unit) {
            const objNewValue = this.getValueByUnit(objValue.value, unit);
            reData = `${objNewValue.toFixed(decimalDigits)}${suffix}`;
          } else {
            reData = `${objValue.value.toFixed(decimalDigits)}`;
          }
          this.config.series[0].data.forEach((itemData) => {
            itemData.tooltip.formatter = (objVal) => {
              const objItemData = this.getValueByUnit(objVal.value, unit);
              return `${objItemData.toFixed(decimalDigits)}${suffix}`;
            };
          });
        }
        if (isPercent) {
          // 显示百分比
          reData = `${reData}(${objValue.percent}%)`;
        }
        return reData;
      };
    }
  }
  async setOptions({
    chartType,
    isTitle,
    title,
    titleLocation,
    dataSource,
    filterData,
    setColor,
    xField,
    xStatistics,
    xIsCountEmpty,
    yField,
    isLegend,
    legend,
    isSeriesShowSymbol,
    isPercent,
    isUnit,
    unit,
    decimalDigits,
    suffix,
  }) {
    if (dataSource) {
      await this.setSourceData({
        dataSource,
        filterData,
        setColor,
        xField,
        xStatistics,
        xIsCountEmpty,
        yField,
      });
    }

    this.setChartType({ chartType });
    this.setTitle({ isTitle, title, titleLocation });
    this.setLegend({ isLegend, legend });
    this.setIsSeriesShowSymbol({
      isSeriesShowSymbol,
      isPercent,
      isUnit,
      unit,
      decimalDigits,
      suffix,
    });
  }
}

export default EchartPie;
