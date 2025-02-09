import classNames from '../../utils/classnames';
import handleEvents from '../../utils/handleEvents';
import { convertLegacyEnum } from '../../utils/platform';
import { WD_ICON_TYPE, WD_ICON_SIZE } from '../../utils/enum';
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
    type: {
      type: String,
      value: 'inner',
    },
    name: {
      type: String,
      value: 'success',
    },
    src: {
      type: String,
      value: '',
    },
    size: {
      type: String,
      value: 'md',
    },
    sizeSelfAdaptive: {
      type: Boolean,
      value: false,
    },
    className: {
      type: String,
      value: '',
    },
    style: {
      type: String,
      value: '',
    },
    color: {
      type: String,
      value: '',
    },
  },
  data: {
    cls: '',
    inlineStyle: '',
    fontSize: '',
    iconColor: '',
    width: '',
    height: '',
    iconType: '',
  },
  lifetimes: {
    attached() {
      this.init();
      this.updateWidgetAPI();
      this.setData({ id: this.id });
    },
  },
  methods: {
    updateWidgetAPI() {
      const { type, name, src, size } = this.data;

      this.setReadonlyAttributes &&
        this.setReadonlyAttributes({
          type,
          name,
          src,
          size,
        });
    },
    init() {
      const { className, size, name, type, color, sizeSelfAdaptive } =
        this.data;
      // 兼容旧版组件的属性值 size/color
      const remdiff = 2;
      const iconNumSize = !isNaN(Number(size))
        ? `${Number(size) / remdiff}px`
        : '';
      const fontSize =
        iconNumSize && type === 'inner' ? `font-size: ${iconNumSize}` : '';
      const width =
        iconNumSize && type === 'custom' ? `width: ${iconNumSize}` : '';
      const height =
        iconNumSize && type === 'custom' ? `height: ${iconNumSize}` : '';
      const iconColor = color ? `color: ${color} ` : '';

      // 枚举转换
      const _type = convertLegacyEnum(type, WD_ICON_TYPE);
      const _size = ['xxs'].includes(size)
        ? size
        : convertLegacyEnum(size, WD_ICON_SIZE); // 不对外暴露的size属性值

      const classPrefix = WD_PREFIX;
      const compClassName = `${classPrefix}-icon`;
      // 样式
      const isTdIcon = /td/.test(name) && _type === 'inner';
      const isLegacyIcon = !isTdIcon && _type === 'inner';
      const iconName = name?.split(':')[1];
      // 响应式css api
      const platformCss = `${classPrefix}-mp-icon`;
      const classes = {
        [`${classPrefix}-icon`]: true,
        // 旧版图标
        'wd-lcap-icon': isLegacyIcon,
        [`wd-lcap-icon-${name}`]: isLegacyIcon && name,
        // TDesign 图标
        't-icon': isTdIcon,
        [`t-icon-${iconName}`]: isTdIcon && iconName,
        // 尺寸
        [`${compClassName}--${_size}`]: !!_size,
        [platformCss]: true,
        'size-self-adaptive': sizeSelfAdaptive,
        [`wd-icon--${_type}`]: true,
        [`wd-icon--${_type}--${_size}`]: true,
      };

      const cls = classNames({
        ...classes,
        [className]: className,
      });
      this.setData({
        cls,
        fontSize,
        iconColor,
        width,
        height,
        iconType: _type,
      });
    },
    ...handleEvents([{ title: '点击', name: 'tap' }]),
  },
  observers: {
    'className,size,name,type,color,sizeSelfAdaptive': function () {
      this.init();
    },
    'type,name,src,size': function () {
      this.updateWidgetAPI();
    },
  },
});
