export const TitleType = {
  LEFT: 'left',
  TOP: 'top',
  NONE: 'none',
};

export const REL_DICT = {
  equal: 'eq', // 等于
  unequal: 'neq', // 不等于
  include: 'search', // 包含
  exclude: '_exclude', // 不包含
  begin_with: '_begin_with', // 开头是
  greater: 'gt', // 大于
  greater_or_equal: 'gte', // 大于等于
  bigger_or_equal: 'gte', //大于等于
  less: 'lt', // 小于
  less_or_equal: 'lte', // 小于等于
  in: 'in', // 多选值
  not_in: 'nin', // 不在多选值
  uin: 'nin', // 不在多选值
  empty: 'empty', // 为空
  nempty: 'nempty', // 不为空
};

export const emptyArray = [];
export const noop = () => {};
export const WD_PREFIX = 'wd';
export const WEEKS = ['日', '一', '二', '三', '四', '五', '六'];

// 网格布局间距
export const ROW_GUTTER_ENUM = [
  { label: 'auto(默认继承网格布局)', value: 'auto' }, // 无效数据，仅展示
  { label: '0px(无)', value: '0px' },
  { label: '8px(超小)', value: '8px' },
  {
    label: '16px(超小)',
    value: '16px',
  },
  {
    label: '24px(小)',
    value: '24px',
  },
  {
    label: '32px(中)',
    value: '32px',
  },
  {
    label: '48px(大)',
    value: '48px',
  },
  {
    label: '60px(超大)',
    value: '60px',
  },
  {
    label: '80px(超大)',
    value: '80px',
  },
  {
    label: '100px(超大)',
    value: '100px',
  },
  {
    label: '128px(超大)',
    value: '128px',
  },
];

export const GUTTER_ENUM = [
  { label: '0px(无)', value: '0px' },
  { label: '8px(超小)', value: '8px' },
  {
    label: '16px(超小)',
    value: '16px',
  },
  {
    label: '24px(小)',
    value: '24px',
  },
  {
    label: '32px(中)',
    value: '32px',
  },
  {
    label: '48px(大)',
    value: '48px',
  },
  {
    label: '60px(超大)',
    value: '60px',
  },
  {
    label: '80px(超大)',
    value: '80px',
  },
  {
    label: '100px(超大)',
    value: '100px',
  },
  {
    label: '128px(超大)',
    value: '128px',
  },
];

export const GUTTER_VALUE = [
  { gutterValue: 'auto', styleValue: -1 },
  { gutterValue: '0px', styleValue: 0 },
  { gutterValue: '8px', styleValue: 2 },
  { gutterValue: '16px', styleValue: 3 },
  { gutterValue: '24px', styleValue: 4 },
  { gutterValue: '32px', styleValue: 5 },
  { gutterValue: '48px', styleValue: 6 },
  { gutterValue: '60px', styleValue: 7 },
  { gutterValue: '80px', styleValue: 8 },
  { gutterValue: '100px', styleValue: 9 },
  { gutterValue: '128px', styleValue: 10 },
];

// 标签间距
export const TAG_GAP = {
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
};

// 标签类型样式合并
export const TAG_STYLE_TYPE = {
  lightTick: 'light',
  darkTick: 'dark',
  outlineTick: 'outline',
};
