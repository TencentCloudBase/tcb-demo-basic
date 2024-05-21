import getConfig from '../config/global';
import { callWedaApi, callDataSource } from '../../../../utils/tcb';
/**
 * 图表处理基类
 * @author loonglong
 **/
class EchartBase {
  constructor() {
    this.config = getConfig();
  }

  /** 获取所有配置好的图表数据 */
  getOptions() {
    return this.config;
  }

  /** 生成后台查询条件 */
  createWhere({
    filterData,
    xField,
    xStatistics,
    xIsCountEmpty,
    yField,
    groupKey = {},
    groupKeyTimeSpan = '',
  }) {
    const objReturnData = {
      value: [],
      where: [],
      dimension: {},
      group: {},
    };
    if (filterData && filterData.length > 0) {
      // 协议转化，把首字母改成大写
      objReturnData.where = filterData.map((val) => {
        let arrLogicData = val.logicData;
        if (val.logicData && val.logicData.length > 0) {
          arrLogicData = val.logicData
            .filter((v) => v.value !== undefined && v.rel !== '')
            .map((mval) => {
              return {
                Key: mval.key,
                Rel: mval.rel,
                Value: mval.value,
                Logic: mval.logic,
                Extra: {
                  Type: mval?.extra?.type,
                  Format: mval?.extra?.format,
                  IsExpression: mval.extra.isExpression,
                },
                ValueType: mval.valueType,
                Expression: mval.expression,
              };
            });
        }
        return {
          GroupLogic: val.groupLogic,
          LogicData: arrLogicData,
        };
      });
    }
    if (xField && xField.name) {
      objReturnData.dimension = {
        Key: xField.name,
      };
      if (xStatistics) {
        objReturnData.dimension.TimeSpan = xStatistics;
      } else {
        objReturnData.dimension.IsCountEmpty = xIsCountEmpty;
      }
    }
    if (yField && yField.numValue && yField.numValue.length > 0) {
      yField.numValue.forEach((itemVal) => {
        objReturnData.value.push({
          Key: itemVal.key,
          OperationType: itemVal.operationType,
        });
      });
    }

    if (yField && groupKey && groupKey.name) {
      objReturnData.group.Key = groupKey.name;
      objReturnData.group.TimeSpan = groupKeyTimeSpan;
    }
    return objReturnData;
  }

  /**
   * 从后台获取统计数据
   *
   **/
  async getSourceData(sourceName, methods, dataSourceType, params) {
    if (
      dataSourceType === 'database' &&
      (Object.keys(params?.dimension ?? {}).length <= 0 ||
        (params.value ?? []).length <= 0)
    ) {
      console.warn('charts 参数不完整');
      return [];
    }
    try {
      if (dataSourceType === 'database') {
        return await callWedaApi({
          action: 'DescribeChartData',
          data: {
            DataSourceName: sourceName,
            Value: params.value,
            Where: params.where?.filter((v) => !!v.LogicData?.length),
            Dimension: params.dimension,
            Group: params.group,
          },
        });
      }
      const res = await callDataSource({
        dataSourceName: sourceName,
        methodName: methods,
        params,
      });
      return res.result ?? [];
    } catch (err) {
      console.log('err', err);
      return [];
    }
  }

  setTitle({ isTitle, title, titleLocation }) {
    this.config.title.show = isTitle;
    this.config.title.text = title;
    switch (titleLocation) {
      case 'leftdown':
        this.config.title.top = '94%';
        this.config.title.left = '1%';
        this.config.title.right = null;
        break;
      case 'rightdown':
        this.config.title.top = '94%';
        this.config.title.left = null;
        this.config.title.right = '8%';

        break;
      case 'bottom':
        this.config.title.top = '94%';
        this.config.title.left = '35%';
        this.config.title.right = null;
        break;
      case 'lefttop':
        this.config.title.top = '0%';
        this.config.title.left = '1%';
        this.config.title.right = null;
        break;
      case 'righttop':
        this.config.title.top = '0%';
        this.config.title.left = null;
        this.config.title.right = '8%';
        break;
      default:
        this.config.title.top = '-1%';
        this.config.title.left = '35%';
        this.config.title.right = null;
        break;
    }
  }
  setLegend({ isLegend, legend = 'top' }) {
    this.config.legend.show = isLegend;
    switch (legend) {
      case 'top':
        this.config.legend.orient = 'horizontal';
        this.config.legend.x = 'center';
        this.config.legend.top = '6%';
        break;
      case 'left':
        this.config.legend.orient = 'vertical';
        this.config.legend.top = '30%';
        this.config.legend.left = '1%';
        break;
      case 'right':
        this.config.legend.orient = 'vertical';
        this.config.legend.top = '30%';
        this.config.legend.right = '-6%';
        break;
      default:
        this.config.legend.top = '87%';
        this.config.legend.orient = 'horizontal';
        this.config.legend.x = 'center';
        break;
    }
  }

  /**
   * 设置 X轴数据
   * @param { Array<object> } arrData 后台返回的数据
   * @param { string } formatType 类型 datetime：日期时间;date:日期，time：时间，其它
   */
  setXaxis(sortedXAxisData, formatType = '') {
    const xAxisData = [];
    if (sortedXAxisData.length > 0) {
      sortedXAxisData.forEach((itemSource) => {
        let value = itemSource.XLabel.Value;
        if (formatType === 'datetime') {
          value = this.formatTime(itemSource.XLabel.Value, 'dt');
        } else if (formatType === 'date') {
          value = this.formatTime(itemSource.XLabel.Value, 'd');
        } else if (formatType === 'time') {
          value = this.formatTime(itemSource.XLabel.Value, 't');
        }
        xAxisData.push(value);
      });
      this.config.xAxis.data = xAxisData;
    } else {
      this.config.xAxis.data = [];
    }
    return xAxisData;
  }

  sortXAxisData(arrData, formatType = '') {
    const xFields = [...arrData];
    if (['datetime', 'date', 'time'].includes(formatType)) {
      const monthRegex = /^(\d{4}(?:-\d{2}){0,2}) {0,1}(\d{2})$/;
      const weekRegex = /^(\d{4})W(\d+)$/;
      xFields.sort((a, b) => {
        if (a.XLabel.Value && b.XLabel.Value) {
          const monthMathcA = monthRegex.exec(a.XLabel.Value);
          const monthMatchB = monthRegex.exec(b.XLabel.Value);
          if (
            monthMatchB &&
            monthMatchB &&
            monthMathcA[1] &&
            monthMatchB[1] &&
            monthMathcA[2] &&
            monthMatchB[2]
          ) {
            // 月的 格式 YYYY-MM-DD HH
            const aDate = new Date(monthMathcA[1]).getTime();
            const bDate = new Date(monthMatchB[1]).getTime();
            const aHour = parseInt(monthMathcA[2], 10);
            const bHour = parseInt(monthMatchB[2], 10);

            if (aDate !== bDate) {
              return aDate - bDate;
            }
            return aHour - bHour;
          }

          const weekMathcA = weekRegex.exec(a.XLabel.Value);
          const weekMatchB = weekRegex.exec(b.XLabel.Value);

          if (
            weekMatchB &&
            weekMatchB &&
            weekMathcA[1] &&
            weekMatchB[1] &&
            weekMathcA[2] &&
            weekMatchB[2]
          ) {
            // 月的格式 2022W5
            const aYear = parseInt(weekMathcA[1], 10);
            const bYear = parseInt(weekMatchB[1], 10);
            const aWeek = parseInt(weekMathcA[2], 10);
            const bWeek = parseInt(weekMatchB[2], 10);
            if (aYear !== bYear) {
              return aYear - bYear;
            }
            return aWeek - bWeek;
          }

          return (
            new Date(a.XLabel.Value).getTime() -
            new Date(b.XLabel.Value).getTime()
          );
        }
        // 产品需求空值放最后
        if (!a.XLabel.Value) {
          return 1;
        }
        if (!b.XLabel.Value) {
          return -1;
        }
      });
    }

    return xFields;
  }

  /**
   * 时间轴格式化为日期，时间，日期时间
   * @param { number } time 时间戳
   * @param { string } timeType 需要格式化的类型 dt：日期时间，d：日期，t：时间
   * @returns { string } 格式化结果
   */
  formatTime(time, timeType = 'dt') {
    if (typeof time === 'undefined' || time === null) {
      return '空';
    }
    if (typeof time === 'string') {
      // 如果是字符串，代表后台返回的就是格式化的时间格式，则这里不再做格式化处理
      return time;
    }
    const date = new Date(time + 8 * 3600 * 1000);
    let startNum = 0;
    let endNum = 19;
    if (timeType === 'd') {
      startNum = 0;
      endNum = 10;
    } else if (timeType === 't') {
      startNum = 11;
      endNum = 5;
    }
    return date.toJSON().substr(startNum, endNum).replace('T', ' ');
  }

  /**
   * 当有分组字段时，该方法用于获取图表 series 里的 data值，自动补全没有的数据
   * @param { array } arrXaxisData - 维度名 eg:['张三','李四','王二']
   * @param { array } arrGroupValue - 所属当前分组的数据 eg:[{value:'统计值',name:'统计名',dimensionality:'维度名'}]
   * @returns 返回补全的数组
   **/
  getSeriesDataGroup(arrXaxisData, arrGroupValue) {
    const xNums = arrXaxisData.length;
    const arrRe = [];
    for (let i = 0; i < xNums; i++) {
      const objIsInArray = this.isInArray(arrXaxisData[i], arrGroupValue);
      if (Object.keys(objIsInArray).length > 0) {
        arrRe.push({
          value: objIsInArray.value,
          name: objIsInArray.name,
          dimensionality: arrXaxisData[i],
        });
      } else {
        arrRe.push({
          value: null,
        });
      }
    }
    return arrRe;
  }

  // 判断当前的维度名是否在该数组里
  isInArray(strDimensionality, arrGroupValue) {
    let mixStatus = {};
    if (arrGroupValue.length > 0) {
      arrGroupValue.forEach((itemGroupValue) => {
        if (strDimensionality === itemGroupValue.dimensionality) {
          mixStatus = itemGroupValue;
        }
      });
    }
    return mixStatus;
  }

  // 显示 X 轴标签名
  setIsXaxisAxisLabelShow({ isXaxisAxisLabelShow }) {
    this.config.xAxis.axisLabel.show = isXaxisAxisLabelShow;
    //  阻止自动隐藏
    this.config.xAxis.axisLabel.interval = 0;
  }
  // 显示 X 轴名
  setIsXaxisName({ isXaxisName, xAxisName }) {
    this.config.xAxis.name = isXaxisName ? xAxisName : '';
  }
  // 显示X轴刻度线
  setIsXaxisAxisTickShow({ isXaxisAxisTickShow }) {
    this.config.xAxis.axisTick = { show: isXaxisAxisTickShow };
  }
  // X 轴文字倾斜
  // X 轴文字倾斜
  setIsXaxisAxisLabelRotate({
    isXaxisAxisLabelRotate,
    xStatistics,
    angle = 30,
  }) {
    this.config.xAxis.axisLabel.rotate = isXaxisAxisLabelRotate ? angle : 0;
    if (isXaxisAxisLabelRotate || xStatistics) {
      // 如果X轴是时间类型，自动斜30度展示
      this.config.xAxis.axisLabel.rotate = angle;
    } else {
      this.config.xAxis.axisLabel.rotate = 0;
    }
  }

  // 显示网格线 及 线条类型
  setIsYAxisSplitlineLinestyleWidth({
    isYAxisSplitlineLinestyleWidth,
    yAxisSplitlineLinestyleType,
  }) {
    this.config.yAxis.splitLine = { lineStyle: {} };
    this.config.yAxis.splitLine.lineStyle.width = isYAxisSplitlineLinestyleWidth
      ? 1
      : 0;
    this.config.yAxis.splitLine.lineStyle.type = yAxisSplitlineLinestyleType;
  }
  // 显示 Y 轴刻度 最大值，最小值
  setYAxisMaxMin({ yAxisMax, yAxisMin }) {
    this.config.yAxis.min = yAxisMin ? yAxisMin : null;
    this.config.yAxis.max = yAxisMax ? yAxisMax : null;
  }
  // 显示 Y 轴名称
  setIsYAxisName({ isYAxisName, yAxisName }) {
    this.config.yAxis.name = isYAxisName ? yAxisName : '';
  }
  // 显示 Y 轴刻度线
  setIsYAxisShow({ isYAxisShow }) {
    this.config.yAxis.show = isYAxisShow;
  }

  /**
   * 当为空值时，重写xAxis, 只处理单Y轴情况
   * @param { array } arrXisCountEmptyIndex Y轴空值key记录
   * @param { boolean } xIsCountEmpty 是否统计空值
   */
  setEmptyValue(xIsCountEmpty) {
    if (!xIsCountEmpty) {
      const nonEmpty = this.config.xAxis.data.filter(
        (item) => item !== undefined && item !== null
      );
      this.config.xAxis.data = nonEmpty;
    }
  }

  /**
   * 删除数组里面不存在的键值
   * @param { array }  arrXAxis 需要处理的数组
   * @returns { array } 返回处理后的数组
   **/
  removeEmpty(arrXAxis) {
    const arrNewxAxis = [];
    if (arrXAxis.length > 0) {
      for (let i = 0; i < arrXAxis.length; i++) {
        if (arrXAxis[i]) {
          arrNewxAxis.push(arrXAxis[i]);
        }
      }
      return arrNewxAxis;
    } else {
      return arrXAxis;
    }
  }

  /**
   * 根据值 value,返回指定单位的数
   * @param {number} value 原始值
   * @param {string} unit 单位，'%'百分比，'‰'千分比, K千，W万，BW 百万，Y 亿，B 十亿
   * @returns {object} 返回对象 {value:新值，postfix:'单位'}
   **/
  getValueByUnit(value, unit) {
    value = Number(value);
    return value / unit;
  }
}

export default EchartBase;
