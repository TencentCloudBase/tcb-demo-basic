import { eq, isNull } from '../../vender';
export function If(arg1, arg2, arg3) {
    let [condition, consequent, alternate] = [arg1, arg2, arg3];
    if (typeof arg1 === 'object') {
        if (Object.prototype.hasOwnProperty.call(arg1, 'condition')) {
            condition = arg1.condition;
            consequent = arg1.consequent;
            alternate = arg1.alternate;
        }
    }
    else if (arguments.length < 3) {
        alternate = false;
        consequent = arguments.length < 2 ? true : consequent;
    }
    return condition ? consequent : alternate;
}
/**
 * 是否为空
 *
 * @remarks
 * 判断传入的文本是否为空
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "是否为空", "insertText": "IsEmpty('hello')", "subGroup": "logic", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "判断传入的文本是否为空" , "definition": "IsEmpty(值):布尔值"}
 */
export function IsEmpty(text) {
    let val;
    if (Array.isArray(text)) {
        if (text.length > 0) {
            val = text.every((v) => {
                return eq(v, '');
            });
        }
        else {
            val = true;
        }
    }
    else {
        val = eq(text, '');
    }
    return val;
}
/**
 * 是否为null
 *
 * @remarks
 * 判断传入的字段值是否包含数据，即不为 NULL
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "是否为null", "insertText": "NotNull(null)", "subGroup": "logic", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "判断传入的字段值是否包含数据，即不为 NULL" , "definition": "NotNull(字段):布尔值"}
 */
export function NotNull(val) {
    return isNull(val);
}
/**
 * 与
 *
 * @remarks
 * 用于确定所有判断条件是否为真
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "与", "insertText": "And(true, false)", "subGroup": "logic", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "用于确定所有判断条件是否为真" , "definition": "And(判断条件1, [判断条件2,...]):布尔值"}
 */
export function And(...args) {
    let val;
    try {
        val = args.every((i) => {
            return i;
        });
    }
    catch (e) {
        throw e;
    }
    return val;
}
/**
 * 或
 *
 * @remarks
 * 任意一个判断条件为真，则结果为真；所有条件为否，结果才为否
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "或", "insertText": "Or(true, false)", "subGroup": "logic", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "任意一个判断条件为真，则结果为真；所有条件为否，结果才为否" , "definition": "Or(判断条件1, [判断条件2,...]):布尔值"}
 */
export function Or(...args) {
    let val;
    try {
        val = args.some((i) => {
            return i;
        });
    }
    catch (e) {
        throw e;
    }
    return val;
}
