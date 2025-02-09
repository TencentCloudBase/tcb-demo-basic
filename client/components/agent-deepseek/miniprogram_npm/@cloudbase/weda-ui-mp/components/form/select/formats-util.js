const SINGLE_FOREIGN_FORMATS = [
  'father-son',
  'related',
  'many-one',
  'one-one',
  'one-one-r',
];
/** do NOT export this array */
const formatNeedDataFetch = [...SINGLE_FOREIGN_FORMATS, 'x-enum'];
export function isSingleForeignFormat(format) {
  return SINGLE_FOREIGN_FORMATS.includes(format);
}
export function isFormatNeedFetch(format) {
  return formatNeedDataFetch.includes(format);
}
