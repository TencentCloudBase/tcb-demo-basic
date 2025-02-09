import classNames from '../../utils/classnames';
import { commonCompBehavior } from '../../utils/common-behavior';
import { WD_PREFIX } from '../../utils/constant';

Component({
  options: {
    virtualHost: true,
    multipleSlots: true,
  },
  behaviors: [commonCompBehavior],
  properties: {
    className: {
      type: String,
      value: '',
    },
    style: {
      type: String,
      value: '',
    },
    id: {
      type: String,
      value: '',
    },
    defaultShow: {
      type: Boolean,
      value: false,
    },
    position: {
      type: String,
      value: 'bottom',
    },
    closeType: {
      type: Array,
      value: ['mask'],
    },
    defaultMaskShow: {
      type: Boolean,
      value: true,
    },
    template: {
      type: String,
      value: 'default',
    },
  },
  data: {
    cls: '',
    styleMain: '',
    styleShow: '',
    classPrefix: WD_PREFIX,
    modalMaskClasses: '', // 遮罩层样式
    modalBdClasses: '', // 主体内容样式
    modalFtClasses: '', // 按扭区样式
    isBdShow: true, // 弹窗主体内容显示控制
    isMaskShow: false, // 弹窗遮罩层显示控制
    maskPreToShow: false, // 弹窗遮罩层预显示控制，为了动画
    openInfo: null,
    closeInfo: null,
  },
  lifetimes: {
    attached() {
      this.updateWidgetAPI();
    },
  },
  methods: {
    updateWidgetAPI() {
      this.setReadonlyAttributes &&
        this.setReadonlyAttributes({
          open: this.onOpen.bind(this),
          close: this.onClose.bind(this),
          modalState: this.data.isBdShow ? 'open' : 'close',
          openInfo: this.data.openInfo,
          closeInfo: this.data.closeInfo,
        });
    },
    /**
     * 控制弹窗打开/关闭
     * @param {Boolean} isOpen
     */
    dealShow(isOpen, params) {
      let setImmediately = {
        maskPreToShow: true,
        isMaskShow: !isOpen,
        isBdShow: isOpen,
      };

      if (!isOpen) {
        setImmediately = {
          isBdShow: isOpen,
          isMaskShow: !isOpen,
          maskPreToShow: false,
        };
      }

      this.setData(setImmediately);

      this.triggerEvent(isOpen ? 'open' : 'close', params);
    },
    /**
     * 关闭弹窗
     */
    onClose(params) {
      this.dealShow(false, params);
      this.setData({ closeInfo: params?.info || params });
    },
    /**
     * 开启弹窗
     */
    onOpen(params) {
      this.dealShow(true, params);
      this.setData({ openInfo: params?.info || params });
    },
    /**
     * 点击遮罩层
     */
    maskClick() {
      if (this.data.closeType.includes('mask')) {
        this.onClose();
      }
    },
  },
  observers: {
    'style,className,position,isMaskShow,defaultMaskShow,isBdShow': function (
      style,
      className,
      position,
      isMaskShow,
      defaultMaskShow,
      isBdShow
    ) {
      const defaultWidth = { center: 'calc(100% - 4.57rem)', bottom: '100%' }[
        position
      ];
      const styleShow = `width: ${defaultWidth};` + style;
      const styleMain = style?.match(/(display:).*?(;)/g)?.join('');

      // 响应式css api
      const cls = classNames({
        [`${WD_PREFIX}-modal`]: true,
        [`${WD_PREFIX}-modal-center`]: position === 'center',
        [`${WD_PREFIX}-mp-modal`]: true,
        [`${WD_PREFIX}-mp-modal-hide`]: !isBdShow,
        [className]: className,
      });
      // 遮罩层样式
      const modalMaskClasses = classNames({
        [`${WD_PREFIX}-modal-mask`]: true,
        [`${WD_PREFIX}-modal-mask__fadein`]: true,
        [`${WD_PREFIX}-modal-mask__fadeout`]: isMaskShow,
        [`${WD_PREFIX}-modal-mask__hide`]: !defaultMaskShow,
      });
      // 主体内容样式
      const modalBdClasses = classNames({
        'weda-modal-new': true,
        [`${WD_PREFIX}-modal-bd`]: true,
        [`${WD_PREFIX}-modal-bd__toggle`]: isBdShow,
        [`${WD_PREFIX}-modal-bd__box`]:
          !defaultMaskShow && position === 'center',
      });

      this.setData({
        styleMain,
        styleShow,
        cls,
        modalMaskClasses,
        modalBdClasses,
      });
    },
    defaultShow: function (defaultShow) {
      this.dealShow(defaultShow);
    },
    'isBdShow,openInfo,closeInfo': function () {
      this.updateWidgetAPI();
    },
    template: function (template) {
      const modalFtClasses = classNames({
        [`${WD_PREFIX}-modal-bd__ft-text-btn`]: ['confirm', 'notice'].includes(
          template
        ),
        [`${WD_PREFIX}-modal-bd__ft-text-btn--vertical`]: template === 'notice',
      });
      this.setData({ modalFtClasses });
    },
  },
});
