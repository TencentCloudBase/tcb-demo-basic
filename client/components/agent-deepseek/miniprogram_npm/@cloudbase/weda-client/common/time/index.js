/* istanbul ignore file */
import { dayjs } from '../../vender';
/**
 * 获取现在时间
 *
 * @remarks
 * 返回当前系统时间，通常与其他日期时间函数搭配使用
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "获取现在时间", "insertText": "Now()", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "返回当前系统时间，通常与其他日期时间函数搭配使用" , "definition": "Now():日期时间"}
 */
export function Now() {
    const time = dayjs().valueOf();
    return time;
}
/**
 * 获取时间戳
 *
 * @remarks
 * 根据输入的日期时间返回时间戳
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "获取时间戳", "insertText": "Timestamp(1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "根据输入的日期时间返回时间戳" , "definition": "Timestamp(日期时间):日期时间"}
 */
export function Timestamp(arg) {
    let res = 0;
    try {
        res = dayjs(arg).valueOf();
    }
    catch (e) {
        throw e;
    }
    return res;
}
/**
 * 获取秒数
 *
 * @remarks
 * 根据输入的日期时间返回该时间的秒数
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "获取秒数", "insertText": "Second(1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "根据输入的日期时间返回该时间的秒数" , "definition": "Second(日期时间):数字"}
 */
export function Second(arg) {
    let res = 0;
    try {
        res = dayjs(arg).second();
    }
    catch (e) {
        throw e;
    }
    return res;
}
/**
 * 获取分钟数
 *
 * @remarks
 * 根据输入的日期时间返回该时间的分钟部分
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "获取分钟数", "insertText": "Minute(1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "根据输入的日期时间返回该时间的分钟部分" , "definition": "Minute(日期时间):数字"}
 */
export function Minute(arg) {
    let res = 0;
    try {
        res = dayjs(arg).minute();
    }
    catch (e) {
        throw e;
    }
    return res;
}
/**
 * 获取小时数
 *
 * @remarks
 * 根据输入的日期时间返回该时间的小时部分，24小时制
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "获取小时数", "insertText": "Hour(1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "根据输入的日期时间返回该时间的小时部分，24小时制" , "definition": "Hour(日期时间):数字"}
 */
export function Hour(arg) {
    let res = 0;
    try {
        res = dayjs(arg).hour();
    }
    catch (e) {
        throw e;
    }
    return res;
}
/**
 * 获取天数
 *
 * @remarks
 * 根据输入的日期时间返回该时间的日部分，范围为 1-31
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "获取天数", "insertText": "Day(1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "根据输入的日期时间返回该时间的日部分，范围为 1-31" , "definition": "Day(日期时间):数字"}
 */
export function Day(arg) {
    let res = 0;
    try {
        res = dayjs(arg).date();
    }
    catch (e) {
        throw e;
    }
    return res;
}
/**
 * 获取星期数
 *
 * @remarks
 * 根据输入的日期时间返回该时间的星期数
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "获取星期数", "insertText": "DayOfWeek(1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "根据输入的日期时间返回该时间的星期数" , "definition": "DayOfWeek(日期时间):数字"}
 */
export function DayOfWeek(arg) {
    let res = 0;
    try {
        res = dayjs(arg).isoWeekday();
    }
    catch (e) {
        throw e;
    }
    return res;
}
/**
 * 获取月数
 *
 * @remarks
 * 根据输入的日期时间返回该时间的月份
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "获取月数", "insertText": "Month(1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "根据输入的日期时间返回该时间的月份" , "definition": "Month(日期时间):数字"}
 */
export function Month(arg) {
    let res = 0;
    try {
        res = dayjs(arg).month() + 1;
    }
    catch (e) {
        throw e;
    }
    return res;
}
/**
 * 获取年份
 *
 * @remarks
 * 根据输入的日期时间返回该时间的年份
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "获取年份", "insertText": "Year(1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "根据输入的日期时间返回该时间的年份" , "definition": "Year(日期时间):数字"}
 */
export function Year(arg) {
    let date = arg;
    switch (typeof arg) {
        case 'number':
            date = new Date(arg);
            break;
        case 'string':
            date = new Date(arg);
            break;
    }
    let res = 0;
    try {
        res = date.getFullYear();
    }
    catch (e) {
        throw e;
    }
    return res;
}
/**
 * 使用年月日创建日期时间
 *
 * @remarks
 * 根据输入的年月日数值返回一个日期类型的数据，例如 GetDate(2017,3,24)
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "使用年月日创建日期时间", "insertText": "GetDate(2011, 7, 2)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "根据输入的年月日数值返回一个日期类型的数据，例如 GetDate(2017,3,24)" , "definition": "GetDate(数字,数字,数字):日期时间"}
 */
export function GetDate(year, month, day) {
    let res;
    try {
        res = dayjs({
            year,
            month: month - 1,
            day,
        }).valueOf();
    }
    catch (e) {
        throw e;
    }
    return res;
}
// /**
//  * 使用时间戳创建日期时间
//  *
//  * @remarks
//  * 将日期时间文本根据指定格式转化为日期时间，例如 DateTimeValue("2021-12-11 01:19:12", "yyyy-MM-dd HH:mm:ss")
//  *
//  * @privateForWeDa
//  * {"group": "formula", "displayType": "function", "displayName": "使用时间戳创建日期时间", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "" , "definition": ""}
//  */
// export function DateTime(arg: number): Date {
//   let res: Date;
//   try {
//     if (arg.toString().length === 10) {
//       res = dayjs.unix(arg).toDate();
//     } else {
//       res = dayjs(arg).toDate();
//     }
//   } catch (e) {
//     throw e;
//   }
//   return res;
// }
/**
 * 使用时间日期文本创建日期时间
 *
 * @remarks
 * 将日期时间文本根据指定格式转化为日期时间，例如 DateTimeValue("2021-12-11 01:19:12", "yyyy-MM-dd HH:mm:ss")
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "使用时间日期文本创建日期时间", "insertText": "DateTimeValue('2011-07-02', 'YYYY:MM:DD')", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "将日期时间文本根据指定格式转化为日期时间，例如 DateTimeValue('2021-12-11 01:19:12', 'yyyy-MM-dd HH:mm:ss')" , "definition": "DateTimeValue(文本, 文本):日期时间"}
 */
export function DateTimeValue(arg, val) {
    let res;
    try {
        res = dayjs(arg, val).valueOf();
    }
    catch (e) {
        throw e;
    }
    return res;
}
/**
 * 计算年龄
 *
 * @remarks
 * 根据输入的两个日期时间计算出年龄，例如 Age(Date(2017,3,24), Date(2021,3,24))
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "计算年龄", "insertText": "Age(1661334203345, 1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "根据输入的两个日期时间计算出年龄，例如 Age(Date(2017,3,24), Date(2021,3,24))" , "definition": "Age(日期时间,日期时间):数字"}
 */
export function Age(arg, val) {
    let res;
    let firstAge;
    let lastAge;
    try {
        firstAge = dayjs(arg).valueOf();
        lastAge = dayjs(val).valueOf();
        res = dayjs.duration(lastAge - firstAge).asYears();
        if (res >= 0) {
            // 取整
            return Math.trunc(res);
        }
        else {
            return 0;
        }
    }
    catch (e) {
        throw e;
    }
}
/**
 * 计算当前年龄
 *
 * @remarks
 * 计算当前年龄，例如 AgeOfNow(Date(2017,3,24))
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "计算当前年龄", "insertText": "AgeOfNow(1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "计算当前年龄，例如 AgeOfNow(Date(2017,3,24))" , "definition": "AgeOfNow(日期时间):数字"}
 */
export function AgeOfNow(arg) {
    let res;
    let firstAge;
    let lastAge;
    try {
        firstAge = dayjs(arg).valueOf();
        lastAge = dayjs().valueOf();
        res = dayjs.duration(lastAge - firstAge).asYears();
        if (res >= 0) {
            // 取整
            return Math.trunc(res);
        }
        else {
            return 0;
        }
    }
    catch (e) {
        throw e;
    }
}
/**
 * 增加 X 天
 *
 * @remarks
 * 在传入的日期时间上增加 X 天，支持负数
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "增加 X 天", "insertText": "DateAdd(1661334203345, 1)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "在传入的日期时间上增加 X 天，支持负数" , "definition": "DateAdd(日期时间, 数字):日期时间"}
 */
export function DateAdd(arg, day) {
    let res;
    try {
        res = dayjs(arg).add(day, 'days').valueOf();
    }
    catch (e) {
        throw e;
    }
    return res;
}
/**
 * 增加 X 月
 *
 * @remarks
 * 在传入的日期和时间上增加 X 月，支持负数
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "增加 X 月", "insertText": "MonthAdd(1661334203345, 1)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "在传入的日期和时间上增加 X 月，支持负数" , "definition": "MonthAdd(日期时间, 数字):日期时间"}
 */
export function MonthAdd(arg, month) {
    let res;
    try {
        res = dayjs(arg).add(month, 'months').valueOf();
    }
    catch (e) {
        throw e;
    }
    return res;
}
/**
 * 增加 X 年
 *
 * @remarks
 * 在传入的日期和时间上增加 X 年，支持负数
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "增加 X 年", "insertText": "YearAdd(1661334203345, 1)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "在传入的日期和时间上增加 X 年，支持负数" , "definition": "YearAdd(日期时间, 数字):日期时间"}
 */
export function YearAdd(arg, year) {
    let res;
    try {
        res = dayjs(arg).add(year, 'years').valueOf();
    }
    catch (e) {
        throw e;
    }
    return res;
}
/**
 * 天数差
 *
 * @remarks
 * 返回两个日期时间字段之间的天数差，如果为同一天，差数为零
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "天数差", "insertText": "DateDiff(1661334203345, 1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "返回两个日期时间字段之间的天数差，如果为同一天，差数为零" , "definition": "DateDiff(日期时间, 日期时间):数字"}
 */
export function DateDiff(startDay, endDay) {
    let res;
    try {
        res = dayjs(endDay).diff(dayjs(startDay), 'days');
    }
    catch (e) {
        throw e;
    }
    return Math.trunc(res);
}
/**
 * 小时差
 *
 * @remarks
 * 返回两个日期时间字段之间的小时差，如果为同一小时，差数为零
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "小时差", "insertText": "HourDiff(1661334203345, 1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "返回两个日期时间字段之间的小时差，如果为同一小时，差数为零" , "definition": "HourDiff(日期时间, 日期时间):数字"}
 */
export function HourDiff(startDay, endDay) {
    let res;
    try {
        res = dayjs(endDay).diff(dayjs(startDay), 'hours');
    }
    catch (e) {
        throw e;
    }
    return Math.trunc(res);
}
/**
 * 分钟差
 *
 * @remarks
 * 返回两个日期时间字段之间的分钟差，如果为同一分钟，差数为零
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "分钟差", "insertText": "MinuteDiff(1661334203345, 1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "返回两个日期时间字段之间的分钟差，如果为同一分钟，差数为零" , "definition": "MinuteDiff(日期时间, 日期时间):数字"}
 */
export function MinuteDiff(startDay, endDay) {
    let res;
    try {
        res = dayjs(endDay).diff(dayjs(startDay), 'minutes');
    }
    catch (e) {
        throw e;
    }
    return res;
}
/**
 * 秒数差
 *
 * @remarks
 * 返回两个日期时间字段之间的天数差，如果为同一天，差数为零
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "秒数差", "insertText": "SecondDiff(1661334203345, 1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "返回两个日期时间字段之间的天数差，如果为同一天，差数为零" , "definition": "SecondDiff(日期时间, 日期时间):数字"}
 */
export function SecondDiff(startDay, endDay) {
    let res;
    try {
        res = dayjs(endDay).diff(dayjs(startDay), 'seconds');
    }
    catch (e) {
        throw e;
    }
    return res;
}
/**
 * 月数差
 *
 * @remarks
 * 返回两个日期时间字段之间的月数差，如果为同一月，差数为零
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "月数差", "insertText": "MonthDiff(1661334203345, 1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "返回两个日期时间字段之间的月数差，如果为同一月，差数为零" , "definition": "MonthDiff(日期时间, 日期时间):数字"}
 */
export function MonthDiff(startDay, endDay) {
    let res;
    try {
        res = dayjs(endDay).diff(dayjs(startDay), 'months');
    }
    catch (e) {
        throw e;
    }
    return res;
}
/**
 * 年数差
 *
 * @remarks
 * 返回两个日期时间字段之间的年数差，如果为同一年，差数为零
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "年数差", "insertText": "YearDiff(1661334203345, 1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "返回两个日期时间字段之间的年数差，如果为同一年，差数为零" , "definition": "YearDiff(日期时间, 日期时间):数字"}
 */
export function YearDiff(startDay, endDay) {
    let res;
    try {
        res = dayjs(endDay).diff(dayjs(startDay), 'years');
    }
    catch (e) {
        throw e;
    }
    return res;
}
/**
 * 日期时间格式化
 *
 * @remarks
 * 格式化日期时间为指定格式的文本，例如 DateText(Date(2017,3,24), "yyyy-MM-dd HH:mm:ss")
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "日期时间格式化", "insertText": "DateText(1661334203345, 'YYYY-MM-DD HH:mm:ss')", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "格式化日期时间为指定格式的文本，例如 DateText(Date(2017,3,24), 'yyyy-MM-dd HH:mm:ss')" , "definition": "DateText(日期时间, 文本):文本"}
 */
export function DateText(createdTime, text) {
    let res;
    try {
        res = dayjs(createdTime).format(text);
    }
    catch (e) {
        throw e;
    }
    return res;
}
/**
 * 时间格式化
 *
 * @remarks
 * 格式化时间为指定格式的文本，输入时间为(小时 * 60 * 60 + 分钟 * 60) * 1000计算而来，例如 TimeText(28800000, "HH:mm")
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "时间格式化", "insertText": "TimeText(28800000, 'HH:mm')", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils#.E6.97.B6.E9.97.B4.E6.97.A5.E6.9C.9F" , "description": "格式化时间为指定格式的文本，输入时间为(小时 * 60 * 60 + 分钟 * 60) * 1000计算而来，例如 TimeText(28800000, 'HH:mm')" , "definition": "TimeText(时间, 文本):文本"}
 */
export function TimeText(createdTime, text) {
    let res;
    try {
        if (/Y|M|D|A|a|X|x|Z/.test(text)) {
            throw new Error('格式化时间错误，仅支持时、分、秒、毫秒格式化');
        }
        const minute = createdTime / 60000;
        const date = `2017-01-01 ${Math.floor(minute / 60)}:${minute % 60}`;
        res = dayjs(date).format(text);
    }
    catch (e) {
        throw e;
    }
    return res;
}
/**
 * 是否为今天
 *
 * @remarks
 * 判断传入的日期时间是否为今天，例如 IsToday(Date(2022,4,8))
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "是否为今天", "insertText": "IsToday(1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "判断传入的日期时间是否为今天，例如 IsToday(Date(2022,4,8))" , "definition": "IsToday(日期时间):布尔值"}
 */
export function IsToday(date) {
    let res;
    try {
        res = dayjs(date).isSame(dayjs(), 'day');
    }
    catch (e) {
        throw e;
    }
    return res;
}
