import { callWedaApiFn } from './request';
/**
 * @description 查询通用选项集列表 文档：https://tcloud4api.woa.com/document/product/1505/61735?!preview&!document=1
 * @private _前缀的都是内部方法，有可能调整，不推荐外部用户使用
 * @returns
 */
export async function getGeneralOptions(optionName) {
    return callWedaApiFn('DescribeGeneralOptionsDetailList', {
        OptNameList: [optionName],
        PageIndex: 1,
        PageSize: 1,
    });
}
