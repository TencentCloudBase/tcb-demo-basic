/**
 * 获取现在时间
 *
 * @remarks
 * 返回当前系统时间，通常与其他日期时间函数搭配使用
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "获取现在时间", "insertText": "Now()", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "返回当前系统时间，通常与其他日期时间函数搭配使用" , "definition": "Now():日期时间"}
 */
export declare function Now(): number;
/**
 * 获取时间戳
 *
 * @remarks
 * 根据输入的日期时间返回时间戳
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "获取时间戳", "insertText": "Timestamp(1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "根据输入的日期时间返回时间戳" , "definition": "Timestamp(日期时间):日期时间"}
 */
export declare function Timestamp(arg: number | string | Date): number;
/**
 * 获取秒数
 *
 * @remarks
 * 根据输入的日期时间返回该时间的秒数
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "获取秒数", "insertText": "Second(1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "根据输入的日期时间返回该时间的秒数" , "definition": "Second(日期时间):数字"}
 */
export declare function Second(arg: number | string | Date): number;
/**
 * 获取分钟数
 *
 * @remarks
 * 根据输入的日期时间返回该时间的分钟部分
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "获取分钟数", "insertText": "Minute(1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "根据输入的日期时间返回该时间的分钟部分" , "definition": "Minute(日期时间):数字"}
 */
export declare function Minute(arg: number | string | Date): number;
/**
 * 获取小时数
 *
 * @remarks
 * 根据输入的日期时间返回该时间的小时部分，24小时制
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "获取小时数", "insertText": "Hour(1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "根据输入的日期时间返回该时间的小时部分，24小时制" , "definition": "Hour(日期时间):数字"}
 */
export declare function Hour(arg: number | string | Date): number;
/**
 * 获取天数
 *
 * @remarks
 * 根据输入的日期时间返回该时间的日部分，范围为 1-31
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "获取天数", "insertText": "Day(1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "根据输入的日期时间返回该时间的日部分，范围为 1-31" , "definition": "Day(日期时间):数字"}
 */
export declare function Day(arg: number | string | Date): number;
/**
 * 获取星期数
 *
 * @remarks
 * 根据输入的日期时间返回该时间的星期数
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "获取星期数", "insertText": "DayOfWeek(1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "根据输入的日期时间返回该时间的星期数" , "definition": "DayOfWeek(日期时间):数字"}
 */
export declare function DayOfWeek(arg: number | string | Date): number;
/**
 * 获取月数
 *
 * @remarks
 * 根据输入的日期时间返回该时间的月份
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "获取月数", "insertText": "Month(1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "根据输入的日期时间返回该时间的月份" , "definition": "Month(日期时间):数字"}
 */
export declare function Month(arg: number | string | Date): number;
/**
 * 获取年份
 *
 * @remarks
 * 根据输入的日期时间返回该时间的年份
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "获取年份", "insertText": "Year(1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "根据输入的日期时间返回该时间的年份" , "definition": "Year(日期时间):数字"}
 */
export declare function Year(arg: number | string | Date): number;
/**
 * 使用年月日创建日期时间
 *
 * @remarks
 * 根据输入的年月日数值返回一个日期类型的数据，例如 GetDate(2017,3,24)
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "使用年月日创建日期时间", "insertText": "GetDate(2011, 7, 2)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "根据输入的年月日数值返回一个日期类型的数据，例如 GetDate(2017,3,24)" , "definition": "GetDate(数字,数字,数字):日期时间"}
 */
export declare function GetDate(year: number, month: number, day: number): number;
/**
 * 使用时间日期文本创建日期时间
 *
 * @remarks
 * 将日期时间文本根据指定格式转化为日期时间，例如 DateTimeValue("2021-12-11 01:19:12", "yyyy-MM-dd HH:mm:ss")
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "使用时间日期文本创建日期时间", "insertText": "DateTimeValue('2011-07-02', 'YYYY:MM:DD')", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "将日期时间文本根据指定格式转化为日期时间，例如 DateTimeValue('2021-12-11 01:19:12', 'yyyy-MM-dd HH:mm:ss')" , "definition": "DateTimeValue(文本, 文本):日期时间"}
 */
export declare function DateTimeValue(arg: string, val: string): number;
/**
 * 计算年龄
 *
 * @remarks
 * 根据输入的两个日期时间计算出年龄，例如 Age(Date(2017,3,24), Date(2021,3,24))
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "计算年龄", "insertText": "Age(1661334203345, 1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "根据输入的两个日期时间计算出年龄，例如 Age(Date(2017,3,24), Date(2021,3,24))" , "definition": "Age(日期时间,日期时间):数字"}
 */
export declare function Age(arg: number | string | Date, val: number | string | Date): number;
/**
 * 计算当前年龄
 *
 * @remarks
 * 计算当前年龄，例如 AgeOfNow(Date(2017,3,24))
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "计算当前年龄", "insertText": "AgeOfNow(1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "计算当前年龄，例如 AgeOfNow(Date(2017,3,24))" , "definition": "AgeOfNow(日期时间):数字"}
 */
export declare function AgeOfNow(arg: number | string | Date): number;
/**
 * 增加 X 天
 *
 * @remarks
 * 在传入的日期时间上增加 X 天，支持负数
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "增加 X 天", "insertText": "DateAdd(1661334203345, 1)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "在传入的日期时间上增加 X 天，支持负数" , "definition": "DateAdd(日期时间, 数字):日期时间"}
 */
export declare function DateAdd(arg: number | string | Date, day: number): number;
/**
 * 增加 X 月
 *
 * @remarks
 * 在传入的日期和时间上增加 X 月，支持负数
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "增加 X 月", "insertText": "MonthAdd(1661334203345, 1)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "在传入的日期和时间上增加 X 月，支持负数" , "definition": "MonthAdd(日期时间, 数字):日期时间"}
 */
export declare function MonthAdd(arg: number | string | Date, month: number): number;
/**
 * 增加 X 年
 *
 * @remarks
 * 在传入的日期和时间上增加 X 年，支持负数
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "增加 X 年", "insertText": "YearAdd(1661334203345, 1)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "在传入的日期和时间上增加 X 年，支持负数" , "definition": "YearAdd(日期时间, 数字):日期时间"}
 */
export declare function YearAdd(arg: number | string | Date, year: number): number;
/**
 * 天数差
 *
 * @remarks
 * 返回两个日期时间字段之间的天数差，如果为同一天，差数为零
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "天数差", "insertText": "DateDiff(1661334203345, 1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "返回两个日期时间字段之间的天数差，如果为同一天，差数为零" , "definition": "DateDiff(日期时间, 日期时间):数字"}
 */
export declare function DateDiff(startDay: number | string | Date, endDay: number | string | Date): number;
/**
 * 小时差
 *
 * @remarks
 * 返回两个日期时间字段之间的小时差，如果为同一小时，差数为零
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "小时差", "insertText": "HourDiff(1661334203345, 1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "返回两个日期时间字段之间的小时差，如果为同一小时，差数为零" , "definition": "HourDiff(日期时间, 日期时间):数字"}
 */
export declare function HourDiff(startDay: number | string | Date, endDay: number | string | Date): number;
/**
 * 分钟差
 *
 * @remarks
 * 返回两个日期时间字段之间的分钟差，如果为同一分钟，差数为零
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "分钟差", "insertText": "MinuteDiff(1661334203345, 1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "返回两个日期时间字段之间的分钟差，如果为同一分钟，差数为零" , "definition": "MinuteDiff(日期时间, 日期时间):数字"}
 */
export declare function MinuteDiff(startDay: number | string | Date, endDay: number | string | Date): number;
/**
 * 秒数差
 *
 * @remarks
 * 返回两个日期时间字段之间的天数差，如果为同一天，差数为零
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "秒数差", "insertText": "SecondDiff(1661334203345, 1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "返回两个日期时间字段之间的天数差，如果为同一天，差数为零" , "definition": "SecondDiff(日期时间, 日期时间):数字"}
 */
export declare function SecondDiff(startDay: number | string | Date, endDay: number | string | Date): number;
/**
 * 月数差
 *
 * @remarks
 * 返回两个日期时间字段之间的月数差，如果为同一月，差数为零
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "月数差", "insertText": "MonthDiff(1661334203345, 1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "返回两个日期时间字段之间的月数差，如果为同一月，差数为零" , "definition": "MonthDiff(日期时间, 日期时间):数字"}
 */
export declare function MonthDiff(startDay: number | string | Date, endDay: number | string | Date): number;
/**
 * 年数差
 *
 * @remarks
 * 返回两个日期时间字段之间的年数差，如果为同一年，差数为零
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "年数差", "insertText": "YearDiff(1661334203345, 1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "返回两个日期时间字段之间的年数差，如果为同一年，差数为零" , "definition": "YearDiff(日期时间, 日期时间):数字"}
 */
export declare function YearDiff(startDay: number | string | Date, endDay: number | string | Date): number;
/**
 * 日期时间格式化
 *
 * @remarks
 * 格式化日期时间为指定格式的文本，例如 DateText(Date(2017,3,24), "yyyy-MM-dd HH:mm:ss")
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "日期时间格式化", "insertText": "DateText(1661334203345, 'YYYY-MM-DD HH:mm:ss')", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "格式化日期时间为指定格式的文本，例如 DateText(Date(2017,3,24), 'yyyy-MM-dd HH:mm:ss')" , "definition": "DateText(日期时间, 文本):文本"}
 */
export declare function DateText(createdTime: number | string | Date, text: string): string;
/**
 * 时间格式化
 *
 * @remarks
 * 格式化时间为指定格式的文本，输入时间为(小时 * 60 * 60 + 分钟 * 60) * 1000计算而来，例如 TimeText(28800000, "HH:mm")
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "时间格式化", "insertText": "TimeText(28800000, 'HH:mm')", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils#.E6.97.B6.E9.97.B4.E6.97.A5.E6.9C.9F" , "description": "格式化时间为指定格式的文本，输入时间为(小时 * 60 * 60 + 分钟 * 60) * 1000计算而来，例如 TimeText(28800000, 'HH:mm')" , "definition": "TimeText(时间, 文本):文本"}
 */
export declare function TimeText(createdTime: number, text: string): string;
/**
 * 是否为今天
 *
 * @remarks
 * 判断传入的日期时间是否为今天，例如 IsToday(Date(2022,4,8))
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "是否为今天", "insertText": "IsToday(1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "判断传入的日期时间是否为今天，例如 IsToday(Date(2022,4,8))" , "definition": "IsToday(日期时间):布尔值"}
 */
export declare function IsToday(date: number | string | Date): boolean;
