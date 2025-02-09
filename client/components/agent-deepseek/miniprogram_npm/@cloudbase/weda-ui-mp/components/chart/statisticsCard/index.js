import { callDataSource, callWedaApi } from '../../../utils/tcb';

const DEFAULT_VAL = 1000;

Component({
  properties: {
    className: {
      type: String,
      value: '',
    },
    style: {
      type: String,
      value: '',
    },
    dataSource: {
      // 数据源
      type: Object,
    },
    filterData: {
      // 数据筛选
      type: Array,
      value: [],
    },
    field: {
      // 字段选择
      type: Object,
    },
    operationType: {
      // 统计方式
      type: String,
    },
    label: {
      // 字段展示名称
      type: String,
      value: '今日活跃用户数',
    },
    isCountEmpty: {
      // 是否统计空值
      type: Boolean,
      value: false,
    },
    isShowUnit: {
      // 是否显示单位
      type: Boolean,
      value: true,
    },
    unit: {
      // 单位
      type: Number,
      value: 1,
    },
    decimalDigits: {
      // 小数位数
      type: Number,
      value: 0,
    },
    suffix: {
      // 后缀
      type: String,
      value: '个',
    },
  },
  data: {
    count: DEFAULT_VAL,
  },
  methods: {
    scientificToNumber: function (num) {
      const str = num;
      const reg = /^([-]?\d+\.?\d*)(e)([-|+]?\d+)$/;
      let zero = '';
      if (!reg.test(str)) {
        return num;
      }
      const arr = reg.exec(str);
      const len = Math.abs(arr[3]) - 1;
      for (let i = 0; i < len; i += 1) {
        zero += '0';
      }
      if (arr[1].indexOf('-') === 0) {
        return `-0.${zero}${arr[1].replace('-', '').replace('.', '')}`;
      }
      return `0.${zero}${arr[1].replace('.', '')}`;
    },
    padEnd: function (source, targetLength) {
      targetLength = Math.floor(targetLength); //floor if number or convert non-number to 0;
      if (source.length > targetLength) {
        return source;
      } else {
        targetLength = targetLength - source.length;
        return source + '0'.repeat(targetLength);
      }
    },
    customToFixed: function (num, digit = 0) {
      const pow = Math.pow(10, digit);
      let value = `${num}`;
      // 如果是小数，四舍五入进行转化处理确保精度正确
      if (!Number.isInteger(num)) {
        if (num > 0) {
          value = (Math.round((num + Number.EPSILON) * pow) / pow).toString();
        } else if (num < 0) {
          value = (Math.round((num - Number.EPSILON) * pow) / pow).toString();
        }
      }
      value = this.scientificToNumber(value);
      const [integer, decimal = ''] = value.split('.');
      if (digit > 0) {
        return `${integer}.${this.padEnd(decimal, digit)}`;
      }
      return integer;
    },
    addDelimiter: function (fixedString, digit) {
      let len = fixedString.length;
      let result = '';
      const decimalPoint = digit > 0 ? digit + 1 : 0;
      for (let i = len - 1; i >= 0; i--) {
        let stepFromTail = len - 1 - i;
        let char = fixedString.charAt(i);

        if (stepFromTail <= decimalPoint) {
          // 小数部分不处理
          result = char + result;
        } else {
          if ((stepFromTail - decimalPoint) % 3 === 0) {
            if (char !== '-') {
              result = ',' + result;
            }
          }
          result = char + result;
        }
      }
      return result;
    },
    formatNumber: function (val, digits = 0) {
      return isNaN(val)
        ? val
        : this.addDelimiter(this.customToFixed(val, digits), digits);
    },
    getSourceData: async function (
      dataSource,
      filterData,
      field,
      operationType,
      isCountEmpty
    ) {
      const where = filterData?.map
        ? filterData.map((val) => {
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
                  };
                });
            }
            return {
              GroupLogic: val.groupLogic,
              LogicData: arrLogicData,
            };
          })
        : [];
      const params = {
        dataSourceName: dataSource?.name,
        where: where?.filter((v) => !!v.LogicData?.length),
        value: [
          {
            Key: field?.name,
            OperationType: operationType,
            IsCountEmpty: isCountEmpty,
          },
        ],
      };
      try {
        if (dataSource?.type === 'database') {
          return await callWedaApi({
            action: 'DescribeChartCardData',
            data: params,
          });
        }
        return await callDataSource({
          dataSourceName: dataSource?.name,
          methodName: dataSource?.methodName,
        });
      } catch {
        return [];
      }
    },
    _fetchData: async function () {
      if (
        (this.properties.dataSource?.type === 'database' &&
          this.properties.field &&
          this.properties.operationType) ||
        (this.properties.dataSource &&
          this.properties.dataSource?.type !== 'database')
      ) {
        let data = await this.getSourceData(
          this.properties.dataSource,
          this.properties.filterData,
          this.properties.field,
          this.properties.operationType,
          this.properties.isCountEmpty
        );
        // APIs 返回处理
        if (this.properties.dataSource?.type !== 'database' && data?.result) {
          data = data?.result;
        }
        if (data?.length) {
          const val = isNaN(data[0]?.Value) ? 0 : data[0]?.Value;
          this.setData({
            count: this.properties.isShowUnit
              ? this.formatNumber(
                  val / this.properties.unit,
                  this.properties.decimalDigits
                )
              : val,
          });
        } else {
          // 返回数据为空 使用 0
          this.setData({
            count: this.formatNumber(0, this.properties.decimalDigits),
          });
        }
      } else {
        // 没有配置数据使用默认数据
        this.setData({
          count: this.setData({
            count: this.formatNumber(
              DEFAULT_VAL,
              this.properties.decimalDigits
            ),
          }),
        });
      }
    },
  },
  lifetimes: {
    attached() {
      this._fetchData();
    },
  },
  attached() {
    this._fetchData();
  },
  observers: {
    // 当参数变化时
    'datasource,filterData,field,operationType,label,isCountEmpty,isShowUnit,unit,decimalDigits,suffix':
      function () {
        this._fetchData();
      },
  },
});
