export const weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

export const data = () => {
  const year = [];
  for (let i = 0; i < 500; i++) {
    year.push(1900 + i + '年');
  }
  return [
    {
      id: 'column1',
      value: [' ', ' ', ...year, ' ', ' '],
    },
    {
      id: 'column2',
      value: [
        '01月',
        '02月',
        '03月',
        '04月',
        '05月',
        '06月',
        '07月',
        '08月',
        '09月',
        '10月',
        '11月',
        '12月',
      ],
    },
  ];
};
export const dataTime = [
  {
    id: 'column1',
    value: [
      '00时',
      '01时',
      '02时',
      '03时',
      '04时',
      '05时',
      '06时',
      '07时',
      '08时',
      '09时',
      '10时',
      '11时',
      '12时',
      '13时',
      '14时',
      '15时',
      '16时',
      '17时',
      '18时',
      '19时',
      '20时',
      '21时',
      '22时',
      '23时',
      '00时',
    ],
  },
  {
    id: 'column2',
    value: [
      '00分',
      '01分',
      '02分',
      '03分',
      '04分',
      '05分',
      '06分',
      '07分',
      '08分',
      '09分',
      '10分',
      '11分',
      '12分',
      '13分',
      '14分',
      '15分',
      '16分',
      '17分',
      '18分',
      '19分',
      '20分',
      '21分',
      '22分',
      '23分',
      '24分',
      '25分',
      '26分',
      '27分',
      '28分',
      '29分',
      '30分',
      '31分',
      '32分',
      '33分',
      '34分',
      '35分',
      '36分',
      '37分',
      '38分',
      '39分',
      '40分',
      '41分',
      '42分',
      '43分',
      '44分',
      '45分',
      '46分',
      '47分',
      '48分',
      '49分',
      '50分',
      '51分',
      '52分',
      '53分',
      '54分',
      '55分',
      '56分',
      '57分',
      '58分',
      '59分',
      '00分',
    ],
  },
  {
    id: 'column3',
    value: [
      '00秒',
      '01秒',
      '02秒',
      '03秒',
      '04秒',
      '05秒',
      '06秒',
      '07秒',
      '08秒',
      '09秒',
      '10秒',
      '11秒',
      '12秒',
      '13秒',
      '14秒',
      '15秒',
      '16秒',
      '17秒',
      '18秒',
      '19秒',
      '20秒',
      '21秒',
      '22秒',
      '23秒',
      '24秒',
      '25秒',
      '26秒',
      '27秒',
      '28秒',
      '29秒',
      '30秒',
      '31秒',
      '32秒',
      '33秒',
      '34秒',
      '35秒',
      '36秒',
      '37秒',
      '38秒',
      '39秒',
      '40秒',
      '41秒',
      '42秒',
      '43秒',
      '44秒',
      '45秒',
      '46秒',
      '47秒',
      '48秒',
      '49秒',
      '50秒',
      '51秒',
      '52秒',
      '53秒',
      '54秒',
      '55秒',
      '56秒',
      '57秒',
      '58秒',
      '59秒',
    ],
  },
];

const getIndex = (index) => {
  return index < 0 ? 0 : index;
};

export const getFormatData = (data) => {
  return data < 10 ? '0' + data : data;
};
export const getLast = (index, array) => {
  return index < 0 ? array.length - 1 : index;
};

/**
 * 动态获取日期时间数组的下标
 */
export const getCurrentYearIndex = (dateTime) => {
  const year = new Date(getIOSNotNaNDate(dateTime)).getFullYear();
  return getIndex(data()[0].value.indexOf(getFormatData(year) + '年'));
};

export const getCurrentMonthIndex = (dateTime) => {
  const month = new Date(getIOSNotNaNDate(dateTime)).getMonth() + 1;
  return getIndex(data()[1].value.indexOf(getFormatData(month) + '月'));
};
export const getCurrentDayIndex = (dateTime) => {
  const month = new Date(getIOSNotNaNDate(dateTime)).getMonth() + 1;
  return getIndex(data()[1].value.indexOf(getFormatData(month) + '月'));
};

export const getCurrentHoursIndex = (dateTime) => {
  const hours = new Date(getIOSNotNaNDate(dateTime)).getHours();
  return getIndex(dataTime[0].value.indexOf(getFormatData(hours) + '时'));
};

export const getCurrentMinutesIndex = (dateTime) => {
  const minutes = new Date(getIOSNotNaNDate(dateTime)).getMinutes();
  return getIndex(dataTime[1].value.indexOf(getFormatData(minutes) + '分'));
};

export const getCurrentSecondsIndex = (dateTime) => {
  const seconds = new Date(getIOSNotNaNDate(dateTime)).getSeconds();
  return getIndex(dataTime[2].value.indexOf(getFormatData(seconds) + '秒'));
};
/**
 * 日期解析，字符串转日期
 * @param dateString 可以为2017-02-16，2017/02/16，2017.02.16
 * @returns {Date} 返回对应的日期对象
 */
export const dateParse = (dateString) => {
  var SEPARATOR_BAR = '-';
  var SEPARATOR_SLASH = '/';
  var SEPARATOR_DOT = '.';
  var dateArray;
  if (dateString.indexOf(SEPARATOR_BAR) > -1) {
    dateArray = dateString.split(SEPARATOR_BAR);
  } else if (dateString.indexOf(SEPARATOR_SLASH) > -1) {
    dateArray = dateString.split(SEPARATOR_SLASH);
  } else {
    dateArray = dateString.split(SEPARATOR_DOT);
  }
  return new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
};
/**
 * 日期比较大小
 * compareDateString大于dateString，返回1；
 * 等于返回0；
 * compareDateString小于dateString，返回-1
 * @param dateString 日期
 * @param compareDateString 比较的日期
 */
export const dateCompare = (dateString, compareDateString) => {
  //判断入参为空串情况
  if (dateString.length !== 0 && compareDateString.length === 0) {
    return -1;
  } else if (dateString.length === 0 && compareDateString.length !== 0) {
    return 1;
  } else if (dateString.length === 0 && compareDateString.length === 0) {
    return 0;
  } else if (dateString.length !== 0 && compareDateString.length !== 0) {
    var dateTime = new Date(dateString.replace(/-/g, '/')).getTime();
    var compareDateTime = new Date(
      compareDateString.replace(/-/g, '/')
    ).getTime();
    if (compareDateTime > dateTime) {
      return 1;
    } else if (compareDateTime == dateTime) {
      return 0;
    } else {
      return -1;
    }
  }
};
/**
 *获得距离当前前后某月的开始日期和结束日期
 * month 整数，负数当前之前某月，正数当月之后某月，0当月
 */
export const getMonthStartDateAndDateRange = (month = 0) => {
  const oneDayLong = 24 * 60 * 60 * 1000;
  const now = new Date();
  now.setMonth(now.getMonth() + month);
  const year = now.getFullYear();
  const monthStartDate = new Date(year, now.getMonth(), 1); // 当前月1号
  const nextMonthStartDate = new Date(year, now.getMonth() + 1, 1); // 下个月1号
  const days =
    (nextMonthStartDate.getTime() - monthStartDate.getTime()) / oneDayLong; // 计算当前月份的天数
  const monthEndDate = new Date(year, now.getMonth(), days);
  const monthRange = [monthStartDate, monthEndDate];
  return monthRange;
};
// 获取当前月的天数
export const mGetDate = (e) => {
  var date = new Date(e);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var d = new Date(year, month, 0);
  return d.getDate();
};
// 获取当前月的所有日期
export const getNowM = (e, time) => {
  let now = new Date(e);
  let current_month_num = mGetDate(e);
  let current_month = [];
  for (let i = 1; i <= current_month_num; i++) {
    let day = now.setDate(i);
    let everyDay = formatDate(day, time);
    current_month.push(everyDay);
  }
  return current_month;
};
// 格式化日期
export const formatDate = (date, time) => {
  date = new Date(date);
  let myyear = date.getFullYear();
  let mymonth = date.getMonth() + 1;
  let myweekday = date.getDate();
  let myhours = date.getHours();
  let myminutes = date.getMinutes();
  let mygetseconds = date.getSeconds();
  mymonth < 10 ? (mymonth = '0' + mymonth) : mymonth;
  myweekday < 10 ? (myweekday = '0' + myweekday) : myweekday;
  myhours < 10 ? (myhours = '0' + myhours) : myhours;
  myminutes < 10 ? (myminutes = '0' + myminutes) : myminutes;
  mygetseconds < 10 ? (mygetseconds = '0' + mygetseconds) : mygetseconds;
  if (time) return `${myyear}/${mymonth}/${myweekday}` + ` ` + time;
  return `${myyear}/${mymonth}/${myweekday} ${myhours}:${myminutes}:${mygetseconds}`;
};
export const getIOSNotNaNDate = (data) => {
  return data.replace(/-/g, '/');
};

export const getFormatDate = (data) => {
  return data.replace(new RegExp('/', 'g'), '-');
};

export const getDefaultDate = (date) => {
  if (!date) return date;
  const dateTime = Number(date);
  // 判断是否是YYYY-MM-DD HH:MM:SS
  if (isNaN(dateTime)) {
    return date;
  }
  // 转换成字符串YYYY-MM-DD HH:MM:SS
  const time = new Date(dateTime);
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDate();
  const hour = time.getHours();
  const min = time.getMinutes();
  const sec = time.getSeconds();
  return (
    year +
    '-' +
    (month < 10 ? '0' + month : month) +
    '-' +
    (day < 10 ? '0' + day : day) +
    ' ' +
    (hour < 10 ? '0' + hour : hour) +
    ':' +
    (min < 10 ? '0' + min : min) +
    ':' +
    (sec < 10 ? '0' + sec : sec)
  );
};
