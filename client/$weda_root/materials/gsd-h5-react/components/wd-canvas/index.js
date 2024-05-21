import classNames from '../../utils/classnames';
import { commonCompBehavior } from '../../utils/common-behavior';
import { WD_PREFIX } from '../../utils/constant';
import handleEvents from '../../utils/handleEvents';

/**
 * 兼容小程序旧版的2D画布函数
 * @param ctx
 * @returns
 */
const generateCtx2D = (ctx) => {
  if (!ctx) return;

  const setLineDash = ctx.setLineDash.bind(ctx);

  ctx.setFillStyle = function (val) {
    ctx.fillStyle = val;
  };
  ctx.setFontSize = function (val) {
    ctx.font = `${val}px`;
  };
  ctx.setGlobalAlpha = function (val) {
    ctx.globalAlpha = val;
  };
  ctx.setLineCap = function (val) {
    ctx.lineCap = val;
  };
  ctx.setLineDash = function (pattern, offset) {
    setLineDash(pattern);
    ctx.lineDashOffset = offset;
  };
  ctx.setLineJoin = function (val) {
    ctx.lineJoin = val;
  };
  ctx.setLineWidth = function (val) {
    ctx.lineWidth = val;
  };
  ctx.setMiterLimit = function (val) {
    ctx.miterLimit = val;
  };
  ctx.setShadow = function (offsetX, offsetY, blur, color) {
    ctx.shadowOffsetX = offsetX;
    ctx.shadowOffsetY = offsetY;
    ctx.shadowBlur = blur;
    ctx.shadowColor = color;
  };
  ctx.setStrokeStyle = function (val) {
    ctx.strokeStyle = val;
  };
  ctx.setTextAlign = function (val) {
    ctx.textAlign = val;
  };
  ctx.setTextBaseline = function (val) {
    ctx.textBaseline = val;
  };
  ctx.draw = () => {};

  return ctx;
};
const generateCtxWebgl = (ctx) => {
  return ctx;
};

const READY_TIME = 500;
// canvas默认宽高
const CANVAS_DEFAULT = {
  width: 300,
  height: 150,
};

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
    type: {
      type: String,
      value: '2d',
    },
    disableScroll: {
      type: Boolean,
      value: false,
    },
    code: {
      type: Object,
      value: () => ({}),
    },
  },
  domObserver: null,
  readyTimer: null,
  data: {
    cls: '',
    styleMain: '',
    canvasInstance: null,
    canvasCtx: null,
    isCanvasReady: false,
    canvasId: null,
    canvasStyle: CANVAS_DEFAULT,
  },
  lifetimes: {
    attached() {
      this.setData({ canvasId: this.id });
      this.observeModuleExpose();
      this.updateWidgetAPI();
    },
    detached() {
      this.domObserver && this.domObserver.disconnect();
    },
  },
  methods: {
    updateWidgetAPI() {
      this.setReadonlyAttributes &&
        this.setReadonlyAttributes({
          code: this.properties.code,
          type: this.properties.type,
          disableScroll: this.properties.disableScroll,
          canvasInstance: this.data.canvasInstance,
          canvasCtx: this.data.canvasCtx,
        });
    },
    /**
     * 根据初始化代码绘制canvas
     */
    async canvasInit(init, canvasCtx, canvasInstance, canvasStyle) {
      try {
        // 执行初始化函数前恢复默认宽高，清空画布
        canvasInstance.width = canvasStyle.width;
        canvasInstance.height = canvasStyle.height;
        await init?.(canvasCtx, canvasInstance);
        this.triggerEvent('canvasReady', { canvasInstance, canvasCtx });
      } catch (error) {
        //
      }
    },
    // 监听模块曝光
    observeModuleExpose() {
      this.domObserver && this.domObserver.disconnect();
      this.domObserver = wx.createIntersectionObserver(this);
      this.domObserver.relativeToViewport().observe(`#${this.id}`, (res) => {
        // 模块曝光
        if (res.intersectionRatio) {
          this.setData({ isCanvasReady: true });
          this.init();
        }
      });
    },
    getCanvasRectInfo() {
      return new Promise((resolve) => {
        const query = wx.createSelectorQuery().in(this);
        query.select(`#${this.id}`).boundingClientRect();
        query.selectViewport().scrollOffset();
        query.exec(function (res) {
          resolve({ ...res?.[1], ...res?.[0] });
        });
      });
    },
    init(id = this.id, type = this.properties.type) {
      wx.createSelectorQuery()
        .in(this)
        .select(`#${id || this.id}`)
        .fields({ node: true, size: true })
        .exec(async (res) => {
          if (!res?.[0]?.node) return;
          const canvas = res[0].node;

          const { pixelRatio: dpr } = await wx.getSystemInfo();
          canvas.width = res[0].width * dpr;
          canvas.height = res[0].height * dpr;
          canvas.dpr = dpr;
          canvas.getCanvasRectInfo = this.getCanvasRectInfo.bind(this);

          this.setData({
            canvasStyle: { width: canvas.width, height: canvas.height },
          });

          const ctx = canvas.getContext(type);
          const ctxRes =
            { '2d': generateCtx2D, webgl: generateCtxWebgl }[type]?.(ctx) || {};
          const data = { canvasInstance: canvas, canvasCtx: ctxRes };

          this.domObserver && this.domObserver.disconnect();
          this.setData(data);
        });
    },
    ...handleEvents([
      { title: '手指触摸开始', name: 'touchstart' },
      { title: '手指触摸移动', name: 'touchmove' },
      { title: '手指触摸结束', name: 'touchend' },
      { title: '手指触摸被打断', name: 'touchcancel' },
      { title: '手指/鼠标长按', name: 'longtap' },
      { title: '错误', name: 'error' },
    ]),
  },
  observers: {
    'style,className': function (style, className) {
      // 响应式css api
      const cls = classNames({
        [`${WD_PREFIX}-canvas`]: true,
        [`${WD_PREFIX}-mp-canvas`]: true,
        [className]: className,
      });
      const styleMain = style;

      this.setData({ cls, styleMain });
    },
    'type,disableScroll,canvasInstance,canvasCtx': function () {
      this.updateWidgetAPI();
    },
    'id,type': function (id, type) {
      if (!this.data.isCanvasReady) return;

      this.setData({ canvasId: id });
      this.init(id, type);
    },
    'code,canvasStyle,canvasInstance,canvasCtx': function (
      code,
      canvasStyle,
      canvasInstance,
      canvasCtx
    ) {
      this.readyTimer && clearTimeout(this.readyTimer);
      if (!canvasCtx || !canvasInstance) return;

      // 如果初始化代码不是函数，则直接执行canvasReady
      if (typeof code?.init !== 'function') {
        // eslint-disable-next-line rulesdir/no-timer
        this.readyTimer = setTimeout(() => {
          this.triggerEvent('canvasReady', { canvasInstance, canvasCtx });
        }, READY_TIME);
        return;
      }

      this.canvasInit(code?.init, canvasCtx, canvasInstance, canvasStyle);
    },
  },
});
