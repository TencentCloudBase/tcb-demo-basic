import {
  data,
  dataTime,
  getCurrentHoursIndex,
  getCurrentMinutesIndex,
  getCurrentMonthIndex,
  getCurrentSecondsIndex,
  getCurrentYearIndex,
  formatDate,
  dateCompare,
  getNowM,
  getIOSNotNaNDate,
  getFormatDate,
  getDefaultDate,
} from './dataUtils';
import destr from '../../../../utils/destr';
// 时分秒
const dataTimeList = [dataTime[0].value, dataTime[1].value, dataTime[2].value];
// 年月日
const dataList = [data()[0].value, data()[1].value];
const date = new Date();

// 顶部显示年月日
const showData = (yearIndex, monthIndex) => {
  let showData =
    dataList[0][yearIndex] + dataList[1][monthIndex] + date.getDate();
  return showData.replace('年', '/').replace('月', '/');
};
const defaultShowData = (yearIndex, monthIndex, startDateTime, endDateTime) => {
  if (startDateTime.length > 0) {
    return getIOSNotNaNDate(startDateTime.split(' ')[0]);
  } else if (startDateTime.length === 0 && endDateTime.length > 0) {
    return getIOSNotNaNDate(endDateTime.split(' ')[0]);
  } else if (startDateTime.length === 0 && endDateTime.length === 0) {
    return showData(yearIndex, monthIndex);
  }
};

// 顶部显示的时分秒
const showDataTime = (hourIndex, minutesIndex, secondsIndex) => {
  let showDataTime =
    dataTimeList[0][hourIndex] +
    dataTimeList[1][minutesIndex] +
    dataTimeList[2][secondsIndex];
  return showDataTime.replace('时', ':').replace('分', ':').replace('秒', '');
};

// 顶部箭头部位显示的年月，不包含日
const arrowData = (yearIndex, monthIndex) => {
  const arrow = dataList[0][yearIndex] + dataList[1][monthIndex];
  return arrow;
};

Component({
  options: {},
  properties: {
    isActive: {
      type: Boolean,
      value: true,
    },
    isSelectYearMonth: {
      type: Boolean,
      value: false,
    },
    times: {
      type: Array,
      value: [],
    },
    showDate: {
      type: String,
      value: '',
    },
    showDateTime: {
      type: String,
      value: '',
    },
    arrowData: {
      type: String,
      value: '',
    },
    defaultSelectValue: {
      type: Array,
      value: [],
    },
    isArrowOpen: {
      type: Boolean,
      value: false,
    },
    startDateTime: {
      type: String,
      value: '',
    },
    endDateTime: {
      type: String,
      value: '',
    },
    defaultDateTime: {
      type: String,
      value: '',
    },
  },
  data: {
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    calendarConfigData: [{ matchDate: '', disabled: false }],
    times: dataList,
    currentIndex: [],
    yearIndex: 0,
    monthIndex: 0,
    hourIndex: 0,
    minutesIndex: 0,
    secondsIndex: 0,
    pagShowDate: '',
  },

  lifetimes: {
    attached() {
      const { startDateTime, endDateTime, defaultDateTime } = this.properties;
      const start = getDefaultDate(startDateTime);
      const end = getDefaultDate(endDateTime);
      const defaultDate = getDefaultDate(defaultDateTime);
      this.setData({
        startDateTime: start,
        endDateTime: end,
        defaultDateTime: defaultDate,
      });
    },
  },
  methods: {
    iniDate() {
      const { isActive, startDateTime, endDateTime, defaultDateTime } =
        this.properties;
      const { yearIndex, monthIndex, hourIndex, minutesIndex, secondsIndex } =
        this.data;
      const showDate =
        defaultDateTime && defaultDateTime.length > 0
          ? defaultDateTime.split(' ')[0]
          : defaultShowData(yearIndex, monthIndex, startDateTime, endDateTime);
      const DataTime =
        defaultDateTime && defaultDateTime.length > 0
          ? defaultDateTime.split(' ')[1]
          : showDataTime(hourIndex, minutesIndex, secondsIndex);
      //弹窗初始赋值
      this.setData({
        times: dataList,
        day: date.getDate(),
        showDate: showDate,
        showDateTime: DataTime,
        arrowData: arrowData(yearIndex, monthIndex, startDateTime, endDateTime),
        defaultSelectValue: isActive
          ? [hourIndex, monthIndex, secondsIndex]
          : [yearIndex, monthIndex],
      });
      if (startDateTime.length !== 0 || endDateTime.length !== 0) {
        this.dateLimit(getIOSNotNaNDate(showDate), DataTime);
      }
    },

    //年月日时分秒禁用限制
    dateLimit: function (showDate, showDateTime, mode = 'date') {
      const currentDateTime = showDate + ' ' + showDateTime;
      let startDateTime = '';
      let endDateTime = '';
      if (mode == 'date') {
        startDateTime =
          this.properties.startDateTime.length > 0
            ? this.properties.startDateTime.split(' ')[0] + ' 00:00:00'
            : this.properties.startDateTime;
        endDateTime =
          this.properties.endDateTime.length > 0
            ? this.properties.endDateTime.split(' ')[0] + ' 23:59:59'
            : this.properties.endDateTime;
      } else {
        startDateTime = this.properties.startDateTime;
        endDateTime = this.properties.endDateTime;
      }
      const monthAllDaysList = getNowM(currentDateTime, showDateTime);
      const calendarConfigData = [];
      const monthStartDate = formatDate(
        new Date(
          new Date(showDate).getFullYear(),
          new Date(showDate).getMonth(),
          1
        )
      );
      const nextMonthStartDate = formatDate(
        new Date(
          new Date(showDate).getFullYear(),
          new Date(showDate).getMonth() + 1,
          1
        )
      );
      //当展示为日历且开始年月日小于结束年月日时
      if (
        dateCompare(startDateTime, endDateTime) !== -1 &&
        (startDateTime.length > 0 || endDateTime.length > 0)
      ) {
        //当结束日期小于本月或当开始日期大于本月，当前月均不可选
        if (
          dateCompare(endDateTime, monthStartDate) !== -1 ||
          dateCompare(nextMonthStartDate, startDateTime) !== -1
        ) {
          monthAllDaysList.map((day) =>
            calendarConfigData.push({
              matchDate: getFormatDate(day.split(' ')[0]),
              disabled: true,
            })
          );
          //当开始日期小于当前月且结束日期在当前月时，结束日期后时间不可选
        } else if (
          dateCompare(startDateTime, monthStartDate) !== -1 &&
          dateCompare(endDateTime, nextMonthStartDate) !== -1
        ) {
          monthAllDaysList.map((day) => {
            if (dateCompare(endDateTime, day) === 1) {
              calendarConfigData.push({
                matchDate: getFormatDate(day.split(' ')[0]),
                disabled: true,
              });
            }
          });
          //开始日期与结束日期均在当前月
        } else if (
          dateCompare(endDateTime, nextMonthStartDate) !== -1 &&
          dateCompare(monthStartDate, startDateTime) !== -1
        ) {
          monthAllDaysList.map((day) => {
            if (
              dateCompare(startDateTime, day) === -1 ||
              dateCompare(day, endDateTime) === -1
            ) {
              calendarConfigData.push({
                matchDate: getFormatDate(day.split(' ')[0]),
                disabled: true,
              });
            }
          });
          //开始日期在当前月且结束如期不在当前月时
        } else if (
          dateCompare(monthStartDate, startDateTime) !== -1 &&
          dateCompare(nextMonthStartDate, endDateTime) !== -1
        ) {
          monthAllDaysList.map((day) => {
            if (dateCompare(day, startDateTime) === 1) {
              calendarConfigData.push({
                matchDate: getFormatDate(day.split(' ')[0]),
                disabled: true,
              });
            }
          });
        }
      } else if (endDateTime.length == 0 && startDateTime.length > 0) {
        monthAllDaysList.map((day) => {
          if (dateCompare(day, startDateTime) === 1) {
            calendarConfigData.push({
              matchDate: getFormatDate(day.split(' ')[0]),
              disabled: true,
            });
          }
        });
      }
      this.setData({
        calendarConfigData: destr(calendarConfigData),
      });
    },

    // 最终确定选择的时间
    onAllTimePicker: function (e) {
      const { startDateTime, endDateTime } = this.properties;
      const pickerDateTime = this.data.showDate + ' ' + this.data.showDateTime;

      if (
        dateCompare(startDateTime, pickerDateTime) !== -1 &&
        (dateCompare(pickerDateTime, endDateTime) !== -1 ||
          endDateTime.length == 0)
      ) {
        const isCancel = JSON.parse(e.currentTarget.dataset.cancel);
        const showData = !isCancel
          ? getFormatDate(this.data.showDate + ' ' + this.data.showDateTime)
          : getFormatDate(this.properties.defaultDateTime);
        this.triggerEvent('onAllTimePicker', {
          show: false,
          confirm: true,
          data: showData,
          dateTamp: new Date(showData.replace(/-/g, '/')).getTime(),
        });
      } else {
        const startLimittText = startDateTime
          ? `最早可选日期时间为:\n${startDateTime}\n`
          : '';
        const endLimitText = endDateTime
          ? `最晚可选日期时间为:\n${endDateTime}`
          : '';
        const contentText =
          startDateTime.length > 0 && endDateTime.length > 0
            ? `可选日期时间范围:\n ${startDateTime}\n~\n${endDateTime}`
            : startLimittText + endLimitText;
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: contentText,
        });
      }
    },
    //取消选择
    cancelPicker: function () {
      this.triggerEvent('onAllTimePicker', {
        show: false,
        confirm: false,
      });
    },
    // 年月日、时分秒切换
    onCheckTime: function () {
      const { currentIndex, isActive } = this.data;
      this.setData({
        isSelectYearMonth: isActive,
        isActive: !this.data.isActive,
        isArrowOpen: false,
        times: this.data.isActive ? dataTimeList : dataList,
        defaultSelectValue: !this.data.isActive
          ? [currentIndex[0], currentIndex[1]]
          : [currentIndex[2], currentIndex[3], currentIndex[4]],
      });
    },
    // 日历组件选择的天数
    onSelectDay: function (e) {
      const { item } = e?.detail || {};
      this.setData({
        showDate: getIOSNotNaNDate(item?.formattedDate),
      });
    },
    // 点击箭头展开时候选择的年月
    onClickYearMonthArrow: function () {
      const {
        isActive,
        isSelectYearMonth,
        currentIndex,
        showDate,
        showDateTime,
      } = this.data;
      this.setData({
        isSelectYearMonth: !isActive ? true : !isSelectYearMonth,
        isArrowOpen: !isActive ? true : !isSelectYearMonth,
        times: dataList,
        isActive: true,
        defaultSelectValue: [currentIndex[0], currentIndex[1]],
      });
      if (isActive && isSelectYearMonth) {
        this.dateLimit(showDate, showDateTime);
        // 获取指定年月日的时间值
        const year = parseInt(dataList[0][currentIndex[0]].replace('年', ''));
        const month = parseInt(dataList[1][currentIndex[1]].replace('月', ''));
        let calendar = this.selectComponent('#calendar');
        calendar.handleMonth(year, month);
      }
    },
    // 下一个月
    handleNextMonth: function () {
      const { currentIndex, showDateTime } = this.data;
      let calendar = this.selectComponent('#calendar');
      if (
        currentIndex[0] === dataList[0].length - 1 &&
        currentIndex[1] === dataList[1].length - 1
      ) {
        calendar.handleTurnPages(false);
        return;
      }
      calendar.handleTurnPages(true);
      if (currentIndex[1] == 11) {
        currentIndex[1] = 0;
        ++currentIndex[0];
      } else {
        ++currentIndex[1];
      }
      this.setData({
        arrowData: arrowData(currentIndex[0], currentIndex[1]),
      });
      this.dateLimit(showData(currentIndex[0], currentIndex[1]), showDateTime);
    },
    // 上一个月
    handlePrevMonth: function () {
      const { currentIndex, showDateTime } = this.data;
      let calendar = this.selectComponent('#calendar');
      if (currentIndex[0] === 0 && currentIndex[1] === 0) {
        calendar.handleTurnPages(false);
        return;
      }
      calendar.handleTurnPages(true);
      if (currentIndex[1] == 0) {
        currentIndex[1] = 11;
        --currentIndex[0];
      } else {
        --currentIndex[1];
      }
      this.setData({
        arrowData: arrowData(currentIndex[0], currentIndex[1]),
      });
      this.dateLimit(showData(currentIndex[0], currentIndex[1]), showDateTime);
    },
    // 监听picker的滑动选中日期
    bindChange: function (e) {
      const { currentIndex } = this.data;
      const result = e.detail.value;
      let showDate = this.data.showDate;
      let showDateTime = this.data.showDateTime;
      let arrow = this.data.arrowData;
      // 极端情况如果没滑动结束，就切换，bindChange可能会监听不准确，出现越界undefined
      if (
        result.length === 2 &&
        (!showData(result[0], result[1]).includes('undefined') ||
          !arrowData(result[0], result[1]).includes('undefined'))
      ) {
        showDate = showData(result[0], result[1]);
        arrow = arrowData(result[0], result[1]);
        currentIndex[0] = result[0];
        currentIndex[1] = result[1];
      } else if (
        result.length === 3 &&
        !showDataTime(result[0], result[1], result[2]).includes('undefined')
      ) {
        showDateTime = showDataTime(result[0], result[1], result[2]);
        currentIndex[2] = result[0];
        currentIndex[3] = result[1];
        currentIndex[4] = result[2];
      }
      this.setData({
        arrowData: arrow,
        showDate,
        showDateTime,
        defaultSelectValue: this.data.isActive
          ? [currentIndex[0], currentIndex[1]]
          : [currentIndex[2], currentIndex[3], currentIndex[4]],
      });
    },
  },
  observers: {
    'startDateTime, endDateTime': function (startDateTime, endDateTime) {
      this.setData({
        startDate: startDateTime.split(' ')[0],
        endDate: endDateTime.split(' ')[0],
        startTime: startDateTime.split(' ')[1],
        endTime: endDateTime.split(' ')[1],
      });
    },
    showDate: function (showDate) {
      this.setData({
        pageShowDate: getFormatDate(showDate),
      });
    },

    defaultDateTime: function (defaultDateTime) {
      const currentDate = formatDate(new Date());
      const { startDateTime, endDateTime } = this.properties;
      defaultDateTime = defaultDateTime
        ? defaultDateTime
        : startDateTime
        ? startDateTime
        : endDateTime
        ? endDateTime
        : currentDate;
      const yearIndex = getCurrentYearIndex(defaultDateTime);
      const monthIndex = getCurrentMonthIndex(defaultDateTime);
      const hourIndex = getCurrentHoursIndex(defaultDateTime);
      const minutesIndex = getCurrentMinutesIndex(defaultDateTime);
      const secondsIndex = getCurrentSecondsIndex(defaultDateTime);
      // 当前选中状态的年月日、时分秒对应的下标
      const currentIndex = [
        yearIndex,
        monthIndex,
        hourIndex,
        minutesIndex,
        secondsIndex,
      ];
      this.setData({
        currentIndex,
        yearIndex,
        monthIndex,
        hourIndex,
        minutesIndex,
        secondsIndex,
      });
      this.iniDate();
    },
  },
});
