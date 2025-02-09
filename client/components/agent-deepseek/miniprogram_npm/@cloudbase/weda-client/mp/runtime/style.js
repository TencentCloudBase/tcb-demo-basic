import { toDash } from './util';
/**
 * Convert HtmlElement.style object to css declarations
 */
export function styleToCss(style) {
    const styleDeclars = []; // ['color: red;', 'background-color: green']
    for (const key in style) {
        styleDeclars.push(`${/^--/.test(key) ? key : toDash(key)}:${style[key]};`);
    }
    return styleDeclars.join('');
}
export function concatClassList(classList1 = [], classList2 = []) {
    if (!Array.isArray(classList1)) {
        classList1 = [classList1];
    }
    if (!Array.isArray(classList2)) {
        classList2 = [classList2];
    }
    return classList1.concat(classList2);
}
export function px2rpx(object) {
    let reg = /\b(\d+(\.\d+)?)px\b/g;
    for (const key in object) {
        let value = object[key];
        if (typeof value === 'string') {
            object[key] = value.replace(reg, function (item, value) {
                return `${value}rpx`;
            });
        }
    }
    return object;
}
