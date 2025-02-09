import { IAppAPI, IRouterAPI, IDevice, IEnv, IActionsAPI, IRouterParams } from '../types/common';
import * as Logic from './logic/index';
export declare function getter(context: any, path: any, defaultValue?: any): any;
export declare function setter(context: any, path: any, value?: any): any;
/**
 * 判断是否是移动端
 * @returns
 */
export declare function isMobile(): boolean;
/**
 * 处理url链接，加入params参数
 * @tcwd/weapps-sdk 内存在实现，修改时两份实现对齐修改
 * @param url
 * @param params
 * @returns
 */
export declare function urlJoinParams(url: any, params: any): any;
export declare function normalizePageId(pageId: any): any;
export declare function normalizePackageName(packageName?: string): string;
/**
 * 创建应用 utils 实例
 */
export declare function createAppUtils<T>(ctx: Omit<IAppAPI<T>, 'utils' | keyof IActionsAPI | keyof IRouterAPI>, initData?: any): {
    formatDate: any;
    get: typeof getter;
    set: typeof setter;
    formatEnum(path: any, optionname: any): any;
    getWXContext(): Promise<{}>;
    getCurrentPage(): any;
    If(params: Logic.IIfObjectParam): any;
    If(condition: boolean, consequent?: any, alternate?: any): any;
    IsEmpty(text: string | string[]): boolean;
    NotNull(val: any): boolean;
    And(...args: boolean[]): boolean;
    Or(...args: boolean[]): boolean;
    Len(text: string): number;
    Contains(text1: string, text2: string): boolean;
    Split(text1: string, text2: string): string[];
    Trim(text: string): string;
    Upper(text: string): string;
    Lower(text: string): string;
    Concat(...text: string[]): string;
    ABS(num: number): number;
    Min(...args: number[]): number;
    Max(...args: number[]): number;
    Average(...args: number[]): number;
    Floor(num: number): number;
    Ceiling(num: number): number;
    Round(num: number): number;
    Sum(...args: number[]): number;
    Rand(num: number): number;
    Now(): number;
    Timestamp(arg: string | number | Date): number;
    Second(arg: string | number | Date): number;
    Minute(arg: string | number | Date): number;
    Hour(arg: string | number | Date): number;
    Day(arg: string | number | Date): number;
    DayOfWeek(arg: string | number | Date): number;
    Month(arg: string | number | Date): number;
    Year(arg: string | number | Date): number;
    GetDate(year: number, month: number, day: number): number;
    DateTimeValue(arg: string, val: string): number;
    Age(arg: string | number | Date, val: string | number | Date): number;
    AgeOfNow(arg: string | number | Date): number;
    DateAdd(arg: string | number | Date, day: number): number;
    MonthAdd(arg: string | number | Date, month: number): number; /**
     * 同一个函数、同样的参数只执行一次
     */
    YearAdd(arg: string | number | Date, year: number): number;
    DateDiff(startDay: string | number | Date, endDay: string | number | Date): number;
    HourDiff(startDay: string | number | Date, endDay: string | number | Date): number;
    MinuteDiff(startDay: string | number | Date, endDay: string | number | Date): number;
    SecondDiff(startDay: string | number | Date, endDay: string | number | Date): number;
    MonthDiff(startDay: string | number | Date, endDay: string | number | Date): number;
    YearDiff(startDay: string | number | Date, endDay: string | number | Date): number;
    DateText(createdTime: string | number | Date, text: string): string;
    TimeText(createdTime: number, text: string): string;
    IsToday(date: string | number | Date): boolean;
};
/**
 * 创建应用 $w 代理
 */
export declare function createAPINamespace<T>(app: IAppAPI<T>, env: IEnv, options?: {
    device?: IDevice;
    platforms?: ('WEB' | 'MOBILEWEB' | 'PCWEB' | 'MP' | 'MOBILE')[];
}): {
    readonly wedaContext: {
        isEditorMode: boolean;
        editorPlatforms: any[];
        platforms: ("WEB" | "MOBILEWEB" | "PCWEB" | "MP" | "MOBILE")[];
    } & import("mobx").IObservableObject;
    readonly app: IAppAPI<T>;
    readonly page: any;
    readonly auth: T;
    readonly cloud: any;
    readonly ai: any;
    readonly device: (IDevice | {
        viewport: {
            width: number;
            height: number;
        };
        networkType: "";
    }) & import("mobx").IObservableObject;
    readonly env: IEnv;
    readonly utils: {};
};
/**
 * 将一个对象中每个key的首字母从大写变小写
 */
export declare const objectKeyFirstUpperToLower: (oldObj: object) => object;
/**
 * 首字母转为小写
 * @param str
 * @returns
 */
export declare const lowerFirst: (str: string) => string;
/**
 * 将一个对象中每个key的首字母从小写变大写
 */
export declare const objectKeyFirstLowerToUpper: (oldObj: object) => object;
/**
 * 首字母转为大写
 * @param str
 * @returns
 */
export declare const upperFirst: (str: string) => string;
/**
 * 浅比较两个数组是否相等
 */
export declare function isSameArray(arr1: any[], arr2: any[]): boolean;
/**
 * 同一个函数、同样的参数只执行一次
 */
export declare function execOnce<T extends (...args: any[]) => any>(fn: T, ...args: any[]): ReturnType<T>;
/**
 * 根据白名单过滤json
 */
export declare function filterMap(whiteList: Array<string>, json: {
    [key: string]: any;
}): {};
interface Config {
    mpAppId: string;
    appId: string;
    openId: string;
}
/**
 *
 *
const sdk = SDK.getInstance(config);
new Function(){

    (function (app) {

        app.utils.Max()

    })(app)

    (function ({ Age, ABS, Timestamp , Max , state }) {

        Max(state.num1,state.num2)

    })(app.utils,$page.dataset)
}


 */
export declare class SDK {
    private config;
    constructor(config: Config);
    getAllMethods(): {
        mpAppId: string;
        appId: string;
        openId: string;
        If(params: Logic.IIfObjectParam): any;
        If(condition: boolean, consequent?: any, alternate?: any): any;
        IsEmpty(text: string | string[]): boolean;
        NotNull(val: any): boolean;
        And(...args: boolean[]): boolean;
        Or(...args: boolean[]): boolean;
        Len(text: string): number;
        Contains(text1: string, text2: string): boolean;
        Split(text1: string, text2: string): string[];
        Trim(text: string): string;
        Upper(text: string): string;
        Lower(text: string): string;
        Concat(...text: string[]): string;
        ABS(num: number): number;
        Min(...args: number[]): number;
        Max(...args: number[]): number;
        Average(...args: number[]): number;
        Floor(num: number): number;
        Ceiling(num: number): number;
        Round(num: number): number;
        Sum(...args: number[]): number;
        Rand(num: number): number;
        Now(): number;
        Timestamp(arg: string | number | Date): number;
        Second(arg: string | number | Date): number;
        Minute(arg: string | number | Date): number;
        Hour(arg: string | number | Date): number;
        Day(arg: string | number | Date): number;
        DayOfWeek(arg: string | number | Date): number;
        Month(arg: string | number | Date): number;
        Year(arg: string | number | Date): number;
        GetDate(year: number, month: number, day: number): number;
        DateTimeValue(arg: string, val: string): number;
        Age(arg: string | number | Date, val: string | number | Date): number;
        AgeOfNow(arg: string | number | Date): number;
        DateAdd(arg: string | number | Date, day: number): number;
        MonthAdd(arg: string | number | Date, month: number): number; /**
         * 同一个函数、同样的参数只执行一次
         */
        YearAdd(arg: string | number | Date, year: number): number;
        DateDiff(startDay: string | number | Date, endDay: string | number | Date): number;
        HourDiff(startDay: string | number | Date, endDay: string | number | Date): number;
        MinuteDiff(startDay: string | number | Date, endDay: string | number | Date): number;
        SecondDiff(startDay: string | number | Date, endDay: string | number | Date): number;
        MonthDiff(startDay: string | number | Date, endDay: string | number | Date): number;
        YearDiff(startDay: string | number | Date, endDay: string | number | Date): number;
        DateText(createdTime: string | number | Date, text: string): string;
        TimeText(createdTime: number, text: string): string;
        IsToday(date: string | number | Date): boolean;
    };
    static _instance: any;
    static getInstance(config: Config): any;
}
/**
 * 获取枚举值
 * @param param0
 * @returns
 */
export declare function getEnumValue({ enumOptions, optionSetName, key, }?: {
    enumOptions?: {
        key: any;
        value: any;
    }[] | {
        response?: {
            data?: {
                items?: any;
            };
        };
    };
    optionSetName?: string;
    key?: any;
}, app?: any): any;
export declare function parseURL(_url: string): {
    pathname: string;
    search: string;
    protocol: string;
};
export declare const normalizeRouterParams: (url: any) => IRouterParams;
/**
 * 校验数字，尝试将字符串转成数字。
 * 如果转换失败，返回 null，其他情况返回非 NaN 的数字。
 */
export declare function normalizeNumber(num: unknown): number;
export declare function generateMethodsFrom$w($w: any): {
    getVarValue: (varPath: unknown) => any;
    setVarValue: (varPath: string, value: unknown) => any;
    callEventFlow: (eventFlowId: string, data: unknown) => void;
};
export declare class ControlledPromise<T> {
    resolve: (value: T) => void;
    reject: (e: any) => void;
    constructor();
}
export declare const APP_LAUNCH_OPTIONS_PROMISE: ControlledPromise<unknown>;
export {};
