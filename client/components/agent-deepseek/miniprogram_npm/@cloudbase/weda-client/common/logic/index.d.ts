export interface IIfObjectParam {
    condition: boolean;
    consequent?: any;
    alternate?: any;
}
/**
 * 条件分支
 *
 * @remarks
 * 按判断条件进行逻辑比较，满足时返回一个值，不满足时返回另一个值。
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "条件分支", "insertText": "If(true, '您好', 'hello')", "subGroup": "logic", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "按判断条件进行逻辑比较，满足时返回一个值，不满足时返回另一个值。" , "definition": "If(判断条件, 满足时返回的值, 不满足时返回的值):任何类型"}
 */
export declare function If(params: IIfObjectParam): any;
export declare function If(condition: boolean, consequent?: any, alternate?: any): any;
/**
 * 是否为空
 *
 * @remarks
 * 判断传入的文本是否为空
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "是否为空", "insertText": "IsEmpty('hello')", "subGroup": "logic", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "判断传入的文本是否为空" , "definition": "IsEmpty(值):布尔值"}
 */
export declare function IsEmpty(text: string | string[]): boolean;
/**
 * 是否为null
 *
 * @remarks
 * 判断传入的字段值是否包含数据，即不为 NULL
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "是否为null", "insertText": "NotNull(null)", "subGroup": "logic", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "判断传入的字段值是否包含数据，即不为 NULL" , "definition": "NotNull(字段):布尔值"}
 */
export declare function NotNull(val: any): boolean;
/**
 * 与
 *
 * @remarks
 * 用于确定所有判断条件是否为真
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "与", "insertText": "And(true, false)", "subGroup": "logic", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "用于确定所有判断条件是否为真" , "definition": "And(判断条件1, [判断条件2,...]):布尔值"}
 */
export declare function And(...args: boolean[]): boolean;
/**
 * 或
 *
 * @remarks
 * 任意一个判断条件为真，则结果为真；所有条件为否，结果才为否
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "或", "insertText": "Or(true, false)", "subGroup": "logic", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "任意一个判断条件为真，则结果为真；所有条件为否，结果才为否" , "definition": "Or(判断条件1, [判断条件2,...]):布尔值"}
 */
export declare function Or(...args: boolean[]): boolean;
