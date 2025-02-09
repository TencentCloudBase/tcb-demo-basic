import classNames from '../../utils/classnames';
import handleEvents from '../../utils/handleEvents';
import { convertLegacyEnum } from '../../utils/platform';
import { getParentForm } from '../../utils/widget-api';
import {
  WD_BUTTON_THEME,
  WD_BUTTON_VARIANT,
  WD_BUTTON_SIZE,
  WD_BUTTON_ICON_TYPE,
  WD_BUTTON_ICON_POSITION,
  WD_BUTTON_TYPE,
} from '../../utils/enum';
import { commonCompBehavior } from '../../utils/common-behavior';
import { WD_PREFIX } from '../../utils/constant';

Component({
  options: {
    virtualHost: true,
    multipleSlots: true,
  },
  behaviors: [commonCompBehavior],
  properties: {
    id: {
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
    text: {
      type: String,
      value: '按钮',
    },
    variant: {
      type: String,
      value: 'base',
    },
    theme: {
      type: String,
      value: 'primary',
    },
    size: {
      type: String,
      value: 'md',
    },
    block: {
      type: Boolean,
      value: false,
    },
    loading: {
      type: Boolean,
      value: false,
    },
    icon: {
      type: String,
      value: '',
    },
    iconSrc: {
      type: String,
      value: '',
    },
    iconSource: {
      type: String,
      value: 'inner',
    },
    iconPosition: {
      type: String,
      value: 'before',
    },
    iconType: {
      type: String,
      value: 'none',
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    formType: {
      type: String,
      value: 'button',
    },
    openType: {
      type: String,
    },
    sessionFrom: {
      type: String,
    },
    sendMessageTitle: {
      type: String,
    },
    sendMessagePath: {
      type: String,
    },
    sendMessageImg: {
      type: String,
    },
    showMessageCard: {
      type: Boolean,
      value: 'false',
    },
    appParameter: {
      type: String,
    },
  },
  data: {
    cls: '',
    iconCls: '',
    textCls: '',
    _iconType: '',
    _icon: '',
    _formType: '',
  },
  methods: {
    tap: function (e) {
      let parentForm;
      switch (this.data._formType) {
        case 'submit': {
          // 调用父级表单容器的提交
          parentForm = this.$widget.closest(
            (w) => w.getConfig?.().componentType === 'form'
          );
          if (parentForm.submit) {
            parentForm.submit();
            return;
          }
          // 老逻辑兼容
          const owner = this.selectOwnerComponent();
          parentForm = getParentForm(owner, this.id);
          parentForm?.submit();
          break;
        }
        case 'reset': {
          // 调用父级表单容器的重置
          parentForm = this.$widget.closest(
            (w) => w.getConfig?.().componentType === 'form'
          );
          if (parentForm.reset) {
            parentForm.reset();
            return;
          }
          // 老逻辑兼容
          const owner = this.selectOwnerComponent();
          parentForm = getParentForm(owner, this.id);
          parentForm?.reset();
          break;
        }
        default:
          this.triggerEvent('error', e.detail);
      }
    },
    updateWidgetAPI() {
      const {
        text,
        theme,
        variant,
        size,
        block,
        disabled,
        formType,
        openType,
      } = this.data;

      this.setReadonlyAttributes &&
        this.setReadonlyAttributes({
          text,
          theme,
          variant,
          size,
          block,
          disabled,
          formType,
          openType,
        });
    },
    init() {
      const {
        className,
        size,
        variant,
        disabled,
        theme,
        iconPosition,
        block,
        iconType,
        icon,
        loading,
        formType,
        style,
        iconSource,
      } = this.data;
      const classPrefix = WD_PREFIX;
      const compClassName = `${classPrefix}-btn`;
      const textCls = `${classPrefix}-btn__text`;
      // 响应式css api
      const platformCss = `${classPrefix}-mp-btn`;
      const PROPS_VALUE_MAP = {
        size: {
          default: 'md',
          mini: 'sm',
          large: 'lg',
        },
        theme: { default: 'primary', warn: 'warning' },
      };
      //   兼容旧的组件样式
      let _size = PROPS_VALUE_MAP.size[size] || size;
      let _theme = PROPS_VALUE_MAP.theme[theme] || theme;
      let _icon = loading ? 'td:loading' : icon;
      let _iconType =
        iconType === 'none' && loading ? 'text-with-icon' : iconType;

      // 枚举转换
      _theme = convertLegacyEnum(_theme, WD_BUTTON_THEME);
      _size = convertLegacyEnum(_size, WD_BUTTON_SIZE);
      _iconType = convertLegacyEnum(_iconType, WD_BUTTON_ICON_TYPE);
      const _variant = convertLegacyEnum(variant, WD_BUTTON_VARIANT);
      const _iconPosition = convertLegacyEnum(
        iconPosition,
        WD_BUTTON_ICON_POSITION
      );
      const _formType = convertLegacyEnum(formType, WD_BUTTON_TYPE);

      const classes = {
        [`${classPrefix}-btn`]: true,
        // 颜色
        [`${compClassName}--${_theme}`]: !!_theme,
        // 类型
        [`${compClassName}--${_variant}`]: !!_variant,
        // 大小
        [`${compClassName}--${_size}`]: !!_size,
        // 禁用
        'is-disabled': disabled,
        // 占满
        [`${compClassName}--block`]: block,
        // 是否是纯图标
        [`${compClassName}--icon`]: iconType === 'icon-only',
        [platformCss]: true,
      };

      const cls = classNames({
        ...classes,
        [className]: className,
      });

      // icon样式
      const iconCls = classNames({
        [`${classPrefix}-btn__icon`]: true,
        [`${classPrefix}-btn__before-icon`]:
          iconType === 'text-with-icon' && _iconPosition === 'before',
        [`${classPrefix}-btn__after-icon`]:
          iconType === 'text-with-icon' && _iconPosition === 'after',
        [`${classPrefix}-icon--inherit`]:
          style?.fontSize && iconSource === 'inner',
      });
      this.setData({ cls, iconCls, textCls, _icon, _iconType, _formType });
    },
    ...handleEvents([
      { title: '打开客服会话', name: 'contact' },
      { title: '打开App', name: 'launchApp' },
      { title: '打开授权设置', name: 'openSetting' },
    ]),
  },
  observers: {
    'className,size,variant,disabled,theme,iconPosition,block,iconType,icon,loading,formType,style,iconSource':
      function () {
        this.init();
      },

    'text,theme,variant,size,block,disabled,formType,openType': function () {
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
