// pages/calendar/calendar.js
import dayjs from '../../utils/dayjs.min.js';
import equal from '../../utils/deepEqual';

// import dayjs from 'dayjs'
Component({
  externalClasses: ['ext-class'],
  options: {
    virtualHost: true,
  },
  /** 传入的props */
  properties: {
    className: {
      type: String,
      value: '',
    },
    style: {
      type: String,
      value: '',
    },
    // 控制器显示隐藏
    initVisible: {
      type: String,
      value: 'true',
    },
    // 初始化日历值
    initValue: {
      type: String,
      value: '',
    },
    // 展示配置
    configData: {
      type: Array,
      value: [],
    },
    // 区分日历和时间选择
    isTimePicker: {
      type: Boolean,
      value: false,
    },
  },
  /** 页面的初始数据 */
  data: {
    // 常量
    blockName: 'weda_calendar', // 类名前缀
    minYear: 1970, // 最早选择年份
    firstDayOfWeek: 7, // 日历第一列从周日开始
    initFormat: 'YYYY-MM-DD',
    controlSectionSize: 'medium', // 操作栏控件尺寸
    week: ['一', '二', '三', '四', '五', '六', '日'], // 表头日历星期展示方式
    isShowWeekend: true, // 是否显示周末
    // 变量
    value: null,
    visible: true,
    year: 0,
    month: 0,
    datalist: [],
    headerlist: [],
    turnPages: true,

    _configData: [],
  },

  lifetimes: {
    attached: function () {
      const { initVisible, initValue } = this.properties;
      const { firstDayOfWeek, initFormat } = this.data;
      if (initVisible !== null) {
        this.setData({
          visible: initVisible,
        });
      }
      if (initValue !== null && initValue !== '') {
        const value = dayjs(initValue);
        const year = dayjs(initValue).year();
        const month = parseInt(dayjs(initValue).format('M'), 10);
        this.setData({
          value,
          year,
          month,
          datalist: this.getDateLis(
            year,
            month,
            firstDayOfWeek,
            value,
            initFormat
          ),
          headerlist: this.colHeaderList(),
        });
      } else {
        const _dayjsDate = dayjs(dayjs().format('YYYY-MM-DD'));
        const value = _dayjsDate;
        const year = _dayjsDate.year();
        const month = parseInt(_dayjsDate.format('M'), 10);
        this.setData({
          value,
          year,
          month,
          datalist: this.getDateLis(
            year,
            month,
            firstDayOfWeek,
            value,
            initFormat
          ),
          headerlist: this.colHeaderList(),
        });
      }
    },
  },
  methods: {
    init: function () {
      const { initVisible, initValue } = this.properties;
      const { firstDayOfWeek, initFormat } = this.data;
      if (initVisible !== null) {
        this.setData({
          visible: initVisible,
        });
      }
      if (initValue !== null && initValue !== '') {
        const value = dayjs(initValue);
        const year = dayjs(initValue).year();
        const month = parseInt(dayjs(initValue).format('M'), 10);
        this.setData({
          value,
          year,
          month,
          datalist: this.getDateLis(
            year,
            month,
            firstDayOfWeek,
            value,
            initFormat
          ),
          headerlist: this.colHeaderList(),
        });
      } else {
        const _dayjsDate = dayjs(dayjs().format('YYYY-MM-DD'));
        const value = _dayjsDate;
        const year = _dayjsDate.year();
        const month = parseInt(_dayjsDate.format('M'), 10);
        this.setData({
          value,
          year,
          month,
          datalist: this.getDateLis(
            year,
            month,
            firstDayOfWeek,
            value,
            initFormat
          ),
          headerlist: this.colHeaderList(),
        });
      }
    },
    initConfigData: function () {
      const { initVisible } = this.properties;
      const { firstDayOfWeek, initFormat, value, year, month } = this.data;
      if (initVisible !== null) {
        this.setData({ visible: initVisible });
      }
      if (value == null || value === '') return;
      this.setData({
        datalist: this.getDateLis(
          year,
          month,
          firstDayOfWeek,
          value,
          initFormat
        ),
        headerlist: this.colHeaderList(),
      });
    },
    // 传入参数，修改展示列表
    getDateLis: function (year, month, firstDayOfWeek, value, initFormat) {
      const datalist = this.createDateList(
        year,
        month,
        firstDayOfWeek,
        value,
        initFormat
      );
      let isCurrent = false;
      if (datalist && datalist.length > 0) {
        for (let list of datalist) {
          for (let l of list) {
            if (l.isCurrent && !isCurrent) {
              isCurrent = true;
              break;
            }
          }
        }
        if (isCurrent) {
          for (let list of datalist) {
            for (let l of list) {
              l.isNow = false;
            }
          }
        }
      }
      return this._dataList(datalist);
    },
    // 获取一个日期是周几（1~7）
    getDay: function (dt) {
      let day = dayjs(dt).day();
      if (day === 0) {
        day = 7;
      }
      return day;
    },
    // 获取日期数组
    createDateList: function (year, month, firstDayOfWeek, value, initFormat) {
      const createCellData = (belongTo, isCurrent, date, weekOrder) => {
        const day = this.getDay(date);
        return {
          mode: 'month',
          belongTo,
          isCurrent,
          day,
          weekOrder,
          date,
          formattedDate: dayjs(date).format(initFormat),
          filterDate: null,
          formattedFilterDate: null,
          isShowWeekend: true,
          dateDay: date.getDate(), // 用于展示的天，需要标记
          isNow: isCurrent
            ? false
            : dayjs().format(initFormat) === dayjs(date).format(initFormat), // 是否当天
        };
      };

      const monthFirstDay = dayjs(`${year}-${month}`);
      const rowList = [];
      let list = [];
      let weekCount = 1;

      // 添加上个月中会在本月显示的最后几天日期
      // getDay(monthFirstDay.toDate()) 获取每月第一天是周几
      const lastMonthDaysCount =
        (this.getDay(monthFirstDay.toDate()) - firstDayOfWeek + 7) % 7;
      for (let i = 0; i < lastMonthDaysCount; i++) {
        // 获取显示在当前月的日历中，上月日期数据
        // monthFirstDay.subtract(num, 'day' | 'month' | 'year') 表示以当月第一天日期为基准，在 日|月|年 数字上减去num
        const dayObj = monthFirstDay.subtract(i + 1, 'day');
        list.unshift(createCellData(-1, false, dayObj.toDate(), weekCount));
      }
      // 添加本月日期
      // 获取本月最后一天是几号
      const monthDaysCount = monthFirstDay.endOf('month').daysInMonth();
      for (let i = 0; i < monthDaysCount; i++) {
        const dayObj = monthFirstDay.add(i, 'day');
        list.push(
          createCellData(0, value?.isSame?.(dayObj), dayObj.toDate(), weekCount)
        );
        if (list.length === 7) {
          rowList.push(list);
          list = [];
          weekCount += 1;
        }
      }

      // 添加下月日期
      if (list.length) {
        // 获取当月最后一天
        const monthLastDay = dayjs(`${year}-${month}`).endOf('month');
        // 获取下月在当月日历中的天数
        const nextMonthDaysCount = 7 - list.length;
        for (let i = 0; i < nextMonthDaysCount; i++) {
          const dayObj = monthLastDay.add(i + 1, 'day');
          list.push(createCellData(1, false, dayObj.toDate(), weekCount));
        }
        rowList.push(list);
      }
      return rowList;
    },
    // 混合数据
    _dataList: function (configList) {
      const { configData } = this.properties;
      const _map = new Map();
      for (const item of configData) {
        _map.set(item.matchDate, item);
      }
      return configList.map((item) => {
        return item.reduce((res, i) => {
          if (_map.has(i.formattedDate)) {
            const _disabled = _map.get(i.formattedDate)['disabled'];
            const _marked = _map.get(i.formattedDate)['marked'];
            i['disabled'] =
              _disabled !== undefined ? JSON.parse(_disabled) : false;
            i['marked'] = _marked;
          }
          res.push(i);
          return res;
        }, []);
      });
    },
    // 表头数组
    colHeaderList: function () {
      const { week, firstDayOfWeek, isShowWeekend } = this.data;
      const list = [];
      for (let i = firstDayOfWeek; i <= 7; i++) {
        if (!isShowWeekend && i > 5) {
          break;
        }
        list.push({
          day: i,
          text: week[i - 1],
        });
      }
      if (firstDayOfWeek > 1) {
        for (let i = 1; i < firstDayOfWeek; i++) {
          if (!isShowWeekend && i > 5) {
            break;
          }
          list.push({
            day: i,
            text: week[i - 1],
          });
        }
      }
      return list;
    },
    // 上一个月
    handlePrevMonth: function () {
      this.triggerEvent('handlePrevMonth');
      if (!this.data.turnPages) {
        return;
      }
      const { year, month, firstDayOfWeek, value, initFormat } = this.data;
      const _month = month == 1 ? 12 : month - 1;
      const _year = month === 1 ? year - 1 : year;
      this.setData({
        year: _year,
        month: _month,
        datalist: this.getDateLis(
          _year,
          _month,
          firstDayOfWeek,
          value,
          initFormat
        ),
      });
    },
    // 是否支持上一页下一页翻页
    handleTurnPages: function (turnPages) {
      this.setData({
        turnPages,
      });
    },
    // 下一个月
    handleNextMonth: function () {
      this.triggerEvent('handleNextMonth');
      if (!this.data.turnPages) {
        return;
      }
      const { year, month, firstDayOfWeek, value, initFormat } = this.data;
      const _month = month == 12 ? 1 : month + 1;
      const _year = month === 12 ? year + 1 : year;
      this.setData({
        year: _year,
        month: _month,
        datalist: this.getDateLis(
          _year,
          _month,
          firstDayOfWeek,
          value,
          initFormat
        ),
      });
    },
    // 指定月份
    handleMonth: function (_year, _month) {
      const { firstDayOfWeek, value, initFormat } = this.data;
      this.setData({
        year: _year,
        month: _month,
        datalist: this.getDateLis(
          _year,
          _month,
          firstDayOfWeek,
          value,
          initFormat
        ),
      });
    },

    // 选中的天数
    onSelectDay: function (e) {
      const { day, isDisable, item } = e.currentTarget?.dataset || null;
      const disabled = e.currentTarget?.dataset?.item?.disabled || false;
      if (!disabled && !isDisable) {
        const datalist = this.data.datalist.map((data) =>
          data.map((itemDay) => {
            if (itemDay.dateDay === day && itemDay.belongTo === 0) {
              itemDay.isNow = true;
            } else {
              itemDay.isNow = false;
            }
            return itemDay;
          })
        );
        this.setData({ datalist });
        this.triggerEvent('onSelectDay', { day, item });
      }
    },
  },
  observers: {
    initValue: function () {
      this.init();
    },
    configData: function (configData) {
      if (equal(configData, this.data._configData)) return;
      this.data._configData = configData;
      this.initConfigData();
    },
    datalist: function (datalist) {
      let isCurrent = false;
      if (datalist && datalist.length > 0) {
        for (let list of datalist) {
          for (let l of list) {
            if (l.isCurrent && !isCurrent) {
              isCurrent = true;
              break;
            }
          }
        }
        if (isCurrent) {
          for (let list of datalist) {
            for (let l of list) {
              l.isNow = false;
            }
          }
        }
      }
    },
  },
});
