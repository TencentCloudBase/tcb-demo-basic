import { IActionsAPI } from '../types/common';
/**
 * 小程序下的scanCode包裹了原生的wx.scanCode
 * @param options
 * @returns
 */
export declare const scanCode: (options: any) => any;
export declare function createMpActionsAPI(options: any, api?: any): IActionsAPI;
