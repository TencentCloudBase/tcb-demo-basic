import { errorHandler } from './error';
/**
 * 十六进制、rgba、rgb、hsl、hsla 都换算成 rgba
 */
export function colorToRgba(color, alpha = 1) {
  try {
    let r, g, b, a;
    if (color.indexOf('#') === 0) {
      // 十六进制表示法
      if (color.length === 4) {
        r = parseInt(color.substr(1, 1).repeat(2), 16);
        g = parseInt(color.substr(2, 1).repeat(2), 16);
        b = parseInt(color.substr(3, 1).repeat(2), 16);
        a = 1;
      } else {
        r = parseInt(color.substr(1, 2), 16);
        g = parseInt(color.substr(3, 2), 16);
        b = parseInt(color.substr(5, 2), 16);
        a = parseInt(color.substr(7, 2), 16);
        a = Number.isInteger(a) ? a / 100 : 1;
      }
    } else if (color.indexOf('rgb') === 0) {
      // RGB和RGBA表示法
      const match = color.match(/(\d+),\s*(\d+),\s*(\d+)(,\s*([\d.]+))?/);
      r = parseInt(match[1]);
      g = parseInt(match[2]);
      b = parseInt(match[3]);
      a = match[5] ? parseFloat(match[5]) : 1;
    } else if (color.indexOf('hsl') === 0) {
      // HSL和HSLA表示法
      const match = color.match(
        /(\d+),\s*([\d.]+)%,\s*([\d.]+)%(,\s*([\d.]+))?/
      );
      const h = parseInt(match[1]) / 360;
      const s = parseInt(match[2]) / 100;
      const l = parseInt(match[3]) / 100;
      a = match[5] ? parseFloat(match[5]) : 1;
      if (s === 0) {
        r = g = b = l;
      } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hueToRgb(p, q, h + 1 / 3);
        g = hueToRgb(p, q, h);
        b = hueToRgb(p, q, h - 1 / 3);
      }
    }
    a = a * alpha;
    return `rgba(${r},${g},${b},${a})`;
  } catch (e) {
    errorHandler({
      code: 'ColorToRgbaError',
      error: e,
    });
    return color;
  }
}

function hueToRgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

// Tag 组件背景色
export const TAG_BG_ALPHA = 0.1;

// Tag 随机颜色
export const COLORS = [
  '#0052D9',
  '#2BA471',
  '#E37318',
  '#E34D59',
  '#4D53E3',
  '#15B3E4',
  '#EAAC0E',
  '#F22789',
];
