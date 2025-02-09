/**
 * 获取文本长度
 *
 * @remarks
 * 获取传入文本的字符数
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "获取文本长度", "insertText": "Len('文本')", "subGroup": "text", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "获取传入文本的字符数" , "definition": "Len(文本):数字"}
 */
export declare function Len(text: string): number;
/**
 * 是否包含指定文本
 *
 * @remarks
 * 判断文本 1 是否包含文本 2
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "是否包含指定文本", "insertText": "Contains('文本1', '文本2')", "subGroup": "text", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "判断文本 1 是否包含文本 2" , "definition": "Contains(文本1, 文本2):布尔值"}
 */
export declare function Contains(text1: string, text2: string): boolean;
/**
 * 拆分文本
 *
 * @remarks
 * 根据传入的文本 2，将文本 1 拆分成文本数组，例如 Split("张三,李四,王五", ",")
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "拆分文本", "insertText": "Split('文本1', '文本2')", "subGroup": "text", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "根据传入的文本 2，将文本 1 拆分成文本数组，例如 Split('张三,李四,王五', ',')" , "definition": "Split(文本1,文本2):文本数组"}
 */
export declare function Split(text1: string, text2: string): string[];
/**
 * 删除开头/结尾空格和制表符
 *
 * @remarks
 * 删除文本开头和结尾的所有空格和制表符，文本中间的空格和制表符不会删除
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "删除开头/结尾空格和制表符", "insertText": "Trim('文本')", "subGroup": "text", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "删除文本开头和结尾的所有空格和制表符，文本中间的空格和制表符不会删除" , "definition": "Trim(文本):文本"}
 */
export declare function Trim(text: string): string;
/**
 * 转换为大写
 *
 * @remarks
 * 将传入的文本转为全大写文本
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "转换为大写", "insertText": "Upper('文本')", "subGroup": "text", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "将传入的文本转为全大写文本" , "definition": "Upper(文本):文本"}
 */
export declare function Upper(text: string): string;
/**
 * 转换为小写
 *
 * @remarks
 * 将传入的文本转为全小写文本
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "转换为小写", "insertText": "Lower('文本')", "subGroup": "text", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "将传入的文本转为全小写文本" , "definition": "Lower(文本):文本"}
 */
export declare function Lower(text: string): string;
/**
 * 文本拼接
 *
 * @remarks
 * 返回多个文本拼接后的新文本
 *
 * @privateForWeDa
 * {"group": "formula", "displayType": "function", "displayName": "文本拼接", "insertText": "Concat('文本1', '文本2')", "subGroup": "text", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "返回多个文本拼接后的新文本" , "definition": "Concat(文本1, [文本2,...]):文本"}
 */
export declare function Concat(...text: string[]): string;
