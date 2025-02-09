import classNames from '../../utils/classnames';
import handleEvents from '../../utils/handleEvents';
import { WD_TEXT_LEVEL, WD_TEXT_MAX_LINES } from '../../utils/enum';
import { convertLegacyEnum } from '../../utils/platform';
import { commonCompBehavior } from '../../utils/common-behavior';
import { WD_PREFIX } from '../../utils/constant';

Component({
  options: {
    virtualHost: true,
  },
  behaviors: [commonCompBehavior],
  properties: {
    id: {
      type: String,
      value: '',
    },
    text: {
      type: String,
      value: '',
    },
    level: {
      type: String,
      value: 'body-default',
    },
    userSelect: {
      type: Boolean,
      value: false,
    },
    inheritColor: {
      type: Boolean,
      value: false,
    },
    space: {
      type: Boolean,
      value: true,
    },
    overflow: {
      type: Boolean,
      value: false,
    },
    maxLines: {
      type: String,
      value: '',
    },
    className: {
      type: String,
      value: '',
    },
    style: {
      type: String,
      value: '',
    },
  },
  data: {
    cls: '',
    WebkitLineClamp: '',
  },
  methods: {
    updateWidgetAPI() {
      const { text, level, overflow, maxLines, space, userSelect, tips } =
        this.data;

      this.setReadonlyAttributes &&
        this.setReadonlyAttributes({
          text,
          level,
          overflow,
          maxLines,
          space,
          userSelect,
          tips,
        });
    },
    init() {
      {
        const { className, level, maxLines, overflow, inheritColor } =
          this.data;
        const PROPS_VALUE_MAP = {
          0: 'body-md',
          1: 'title-1',
          2: 'title-2',
          3: 'title-3',
          4: 'title-4',
          5: 'title-5',
          6: 'title-6',
        };
        // 兼容旧的组件样式
        let _level = PROPS_VALUE_MAP[level] || level;
        // 枚举转换
        _level = convertLegacyEnum(_level, WD_TEXT_LEVEL);
        const _maxLines = convertLegacyEnum(maxLines, WD_TEXT_MAX_LINES);

        const classPrefix = WD_PREFIX;
        const compClassName = `${classPrefix}-typography`;
        // 响应式css api
        const platformCss = `${classPrefix}-mp-typography`;
        const levelClass = {
          'title-1': `${compClassName}-display-lg`,
          'title-2': `${compClassName}-display-md`,
          'title-3': `${compClassName}-headline-lg`,
          'title-4': `${compClassName}-headline-sm`,
          'title-5': `${compClassName}-title-xl`,
          'title-6': `${compClassName}-title-lg`,
          'title-7': `${compClassName}-title-md`,
          'title-8': `${compClassName}-title-sm`,
          'title-9': `${compClassName}-title-xs`,
          'body-sm': `${compClassName}-body-sm`,
          'body-md': `${compClassName}-body-md`,
          'body-lg': `${compClassName}-body-lg`,
          0: `${compClassName}-body-md`,
          1: `${compClassName}-display-lg`,
          2: `${compClassName}-display-md`,
          3: `${compClassName}-headline-lg`,
          4: `${compClassName}-headline-sm`,
          5: `${compClassName}-title-xl`,
          6: `${compClassName}-title-lg`,
        };
        const classes = {
          [compClassName]: true,
          [levelClass[_level]]: levelClass[_level],
          // 连续字符会换行，正常英文不会强制换行
          [`${classPrefix}-g-word-break`]: true,
          // 超出隐藏多少行
          [`${classPrefix}-g-text-ellipsis-${_maxLines}`]: overflow,
          // 是否继承父级颜色
          [`${compClassName}__inherit-color`]: inheritColor,
          [platformCss]: true,
        };
        // 兼容旧的text组件溢出省略
        const maxLevel = 10;
        if (Number(maxLines) > maxLevel) {
          this.setData({ WebkitLineClamp: `-webkit-line-clamp: ${maxLines}` });
        } else {
          this.setData({ WebkitLineClamp: '' });
        }

        const cls = classNames({
          ...classes,
          [className]: className,
        });
        this.setData({ cls });
      }
    },
    ...handleEvents([{ title: '点击', name: 'tap' }]),
  },
  observers: {
    'className,level,maxLines,overflow,inheritColor': function () {
      this.init();
    },
    'text,level,overflow,maxLines,space,userSelect,tips': function () {
      this.updateWidgetAPI();
    },
  },
  lifetimes: {
    attached() {
      this.init();
      this.updateWidgetAPI();
      this.setData({ id: this.id });
    },
  },
});
