import * as echarts from '../common/lib/echarts.min';
import EchartLine from '../common/core/eChartLine';
import { checkIsNewData, transform } from '../common/data-transform';
import { callDataSource } from '../../../utils/tcb';

Component({
  options: {
    virtualHost: true,
    multipleSlots: true,
  },
  properties: {
    id: {
      type: String,
      value: '',
    },
    className: {
      type: String,
      value: '',
    },
    style: {
      type: String,
      value: '',
    },
    chartType: {
      // 线条类型
      type: String,
      value: 'bight',
    },
    title: {
      // 图表标题
      type: String,
    },
    isTitle: {
      // 是否显示标题
      type: Boolean,
      value: false,
    },
    titleLocation: {
      type: String,
      value: 'top',
    },
    dataSource: {
      // 数据源
      type: Object,
    },
    dataSourceType: {
      type: String,
      value: 'data-model',
    },
    dataModel: {
      type: Object,
    },
    datasourceVariable: {
      type: Object,
    },
    connector: {
      type: Object,
    },
    connectorMethod: {
      type: Object,
    },
    connectorParams: {
      type: Object,
    },
    filterData: {
      // 数据筛选
      type: Array,
      value: [],
    },
    setColor: {
      // 设置颜色
      type: Array,
      value: [],
    },
    xField: {
      // x轴字段选择
      type: Object,
      value: {
        format: '',
        type: '', // 数据源字段 类型
        title: '', // 字段名中文
        name: '', // 字段名英文
      },
    },
    xStatistics: {
      // x轴统计维度
      type: String,
      value: '', // 统计纬度, 只有选择时间类型才有，y 年，m月，d 日，w周，h时，min 分，s秒
    },
    groupKey: {
      // x轴字段选择
      type: Object,
      value: {
        format: '',
        type: '', // 数据源字段 类型
        title: '', // 字段名中文
        name: '', // 字段名英文
      },
    },
    groupKeyTimeSpan: {
      // x轴统计维度
      type: String,
      value: '', // 统计纬度, 只有选择时间类型才有，y 年，m月，d 日，w周，h时，min 分，s秒
    },
    xIsCountEmpty: {
      // x轴 是否统计空值
      type: Boolean,
      value: false,
    },
    yField: {
      // Y轴字段，分组字段，是否分组
      type: Object,
      value: {
        numValue: [{ key: '', operationType: '' }],
        groupKey: '',
      },
    },
    isLegend: {
      // 是否显示图例
      type: Boolean,
      value: false,
    },
    legend: {
      // 图例
      type: String,
      value: 'bottom', // 左 left 右right, 上top，下 bottom
    },

    // 高级属性
    isXaxisName: {
      // 是否显示坐标轴名称
      type: Boolean,
      value: true,
    },
    xAxisName: {
      // 是否显示坐标轴名称
      type: String,
      value: '',
    },
    isXaxisAxisLabelShow: {
      // 是否显示标签
      type: Boolean,
      value: true,
    },
    isXaxisAxisTickShow: {
      // 显示X轴刻度线
      type: Boolean,
      value: true,
    },
    isXaxisAxisLabelRotate: {
      // 文字自动倾斜
      type: Boolean,
      value: false,
    },
    isYAxisShow: {
      // 是否显示 Y 轴刻度线
      type: Boolean,
      value: true,
    },
    isYAxisName: {
      // 是否显示 Y坐标轴名称
      type: Boolean,
      value: true,
    },
    isYAxisSplitlineLinestyleWidth: {
      // 是否显示网格线 ,yAxis.splitLine.lineStyle.width设置为0
      type: Boolean,
      value: true,
    },
    yAxisSplitlineLinestyleType: {
      // 网格线线条类型 solid,dashed,dotted
      type: String,
      value: 'dashed',
    },
    yAxisName: {
      // Y坐标轴名称  显示名称后需要设置居中，轴线距离属性 yAxis.nameLocation='middle' yAxis.nameGap =20
      type: String,
      value: '',
    },
    yAxisMin: {
      // Y轴刻度最小值
      type: Number,
      value: 0,
    },
    yAxisMax: {
      // Y轴刻度最大值, 切记如果为0时，则不设置
      type: Number,
      value: 0,
    },
    isSeriesShowSymbol: {
      // 是否显示数据标签 开启后 属性 series.label.show 要同时设置为true
      type: Boolean,
      value: true,
    },
    isUnit: {
      // 显示单位
      type: Boolean,
      value: false,
    },
    unit: {
      // 数字显示的单位 百分比，千分比，千，万，百万，亿，十亿
      type: String,
      value: '%',
    },
    decimalDigits: {
      // 小数位数
      type: Number,
      value: 0,
    },
    suffix: {
      // 后缀
      type: String,
      value: '',
    },
  },
  data: {
    ec: {},
    canvas_id: {
      type: String,
      value: `canvas_line_${Date.now()}_${Math.random() * 100}`,
    },
  },
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
      this.initData();
    },
    detached() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  // 以下是旧式的定义方式，可以保持对 <2.2.3 版本基础库的兼容
  attached() {
    // 在组件实例进入页面节点树时执行
    this.initData();
  },
  detached() {
    // 在组件实例被从页面节点树移除时执行
  },
  methods: {
    async getData() {
      if (this.properties.dataSourceType === 'data-model') {
        const {
          dataSourceType: var1Ignored,
          dataModel: var2Ignored,
          datasourceVariable: var3Ignored,
          connector: var4Ignored,
          connectorMethod: var5Ignored,
          connectorParams: var6Ignored,
          ...chartInput
        } = this.properties;
        if (checkIsNewData(this.properties)) {
          chartInput['dataSource'] = {
            name: this.properties['dataModel'].name,
            type: 'database',
            subType: 'database',
            methodName: 'wedaAggregateData',
          };
        }

        const objEChartLine = new EchartLine();
        await objEChartLine.setOptions(chartInput);
        const options = await objEChartLine.getOptions();
        return options ?? [];
      } else {
        if (this.properties.dataSourceType === 'variable') {
          const result = transform(
            'line',
            this.properties.datasourceVariable,
            this.properties
          );
          return result ?? [];
        } else if (this.properties.dataSourceType === 'custom-connector') {
          const { connector, connectorMethod, connectorParams } =
            this.properties;
          if (
            !(
              connector?.datasource?.name &&
              connectorMethod?.name &&
              connectorParams
            )
          ) {
            console.warn('Chart 参数不完整');
          }
          const res = await callDataSource({
            dataSourceName: connector.datasource.name,
            methodName: connectorMethod.name,
            params: connectorParams,
          });
          const result = transform('line', res.result ?? [], this.properties);
          return result ?? [];
        }
      }
    },
    initData() {
      this.setData({
        ec: {
          onInit: this.initChart.bind(this),
        },
      });
    },
    async initChart(canvas, width, height, dpr) {
      const objEchart = echarts.init(canvas, null, {
        width,
        height,
        devicePixelRatio: dpr,
      });
      canvas.setChart(objEchart);
      const options = await this.getData();
      console.log('设置前参数line', options);
      objEchart.setOption(options, true);
      this._chart = objEchart;
      return objEchart;
    },
  },
  observers: {
    // 当参数变化时
    '**': async function () {
      const canvas = this.selectComponent(`#canvas_${this.properties.id}`);
      canvas?.init();
      const options = await this.getData();
      console.log('设置前参数line', options);
      this._chart && this._chart.setOption(options, true);
    },
  },
});
