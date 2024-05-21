Component({
  data: {
    popStyle: '',
    arrowStyle: '',
    showStyle: '',
    selector: 'tooltip',
  },

  properties: {
    visibleArrow: {
      type: Boolean,
      value: true,
    },
    // 显示内容 String || Array
    content: {
      type: String,
      value: '',
    },
    placement: {
      type: String,
      value: 'top',
    },
    offsetX: {
      type: Number,
      value: 0,
    },
    offsetY: {
      type: Number,
      value: 0,
    },
    useContentSlot: {
      type: Boolean,
      value: false,
    },
    show: {
      type: Boolean,
      value: false,
    },
  },

  lifetimes: {
    attached() {
      this.setData({
        showStyle: this.data.show ? 'opacity: 1;' : 'opacity: 0;',
      });
      this.init();
      this.handleShow();
    },
  },

  methods: {
    init() {
      // 初始化 class
      const { placement, visibleArrow, selector } = this.data;
      if (visibleArrow) {
        let arrowClass = [
          `wd-${selector}__arrow`,
          placement === 'bottom' ||
          placement === 'bottom-start' ||
          placement === 'bottom-end'
            ? `wd-${selector}__arrow-up`
            : '',
          placement === 'left' ||
          placement === 'left-start' ||
          placement === 'left-end'
            ? `wd-${selector}__arrow-right`
            : '',
          placement === 'right' ||
          placement === 'right-start' ||
          placement === 'right-end'
            ? `wd-${selector}__arrow-left`
            : '',
          placement === 'top' ||
          placement === 'top-start' ||
          placement === 'top-end'
            ? `wd-${selector}__arrow-down`
            : '',
        ];
        arrowClass = arrowClass.join(' ');
        this.setData({ arrowClass });
      }

      Promise.all([
        this.getRect('#target').then((rect) => {
          if (!rect) return;
          this.left = rect.left;
          this.bottom = rect.bottom;
          this.width = rect.width;
          this.height = rect.height;
          this.top = rect.top;
        }),
        this.getRect('#pos').then((rect) => {
          if (!rect) return;
          this.popWidth = rect.width;
          this.popHeight = rect.height;
        }),
      ]).then(() => {
        this.control();
      });
    },

    getRect(selector) {
      return new Promise((res, rej) => {
        wx.createSelectorQuery()
          .in(this)
          .select(selector)
          .boundingClientRect((rect) => {
            if (!rect) {
              rej();
            }
            res(rect);
          })
          .exec();
      });
    },

    control() {
      const {
        placement,
        offsetX: userOffsetX,
        offsetY: userOffsetY,
      } = this.data;
      // arrow size
      const arrowSize = 9;
      // 上下位（纵轴）对应的距离左边的距离
      const verticalX = this.width / 2;
      // 上下位（纵轴）对应的距离底部的距离
      const verticalY = arrowSize + this.height + 5;
      // 左右位（横轴）对应的距离左边的距离
      const horizontalX = this.width + arrowSize + 5;
      // 左右位（横轴）对应的距离底部的距离
      const horizontalY = this.height / 2;

      const offsetX = verticalX - 17 > 0 ? 0 : verticalX - 25;
      const offsetY = horizontalY - 17 > 0 ? 0 : horizontalY - 25;

      const placements = new Map([
        // 上
        [
          'top',
          [
            `left: ${verticalX}px; bottom: ${verticalY}px; transform: translate(calc(-50% + ${userOffsetX}px), ${userOffsetY}px);`,
            'left: 50%;',
          ],
        ],
        [
          'top-start',
          [
            `left: ${offsetX}px; bottom: ${verticalY}px; transform: translate(${userOffsetX}px, ${userOffsetY}px);`,
            `left: ${
              (this.popWidth >= this.width
                ? this.width / 2
                : this.popWidth - 25) - offsetX
            }px;`,
          ],
        ],
        [
          'top-end',
          [
            `right: ${offsetX}px; bottom: ${verticalY}px; transform: translate(${userOffsetX}px, ${userOffsetY}px);`,
            `right: ${
              (this.popWidth >= this.width
                ? this.width / 2
                : this.popWidth - 25) - offsetX
            }px; transform: translate(calc(50% + ${userOffsetX}px), ${userOffsetY}px);`,
          ],
        ],
        // 下
        [
          'bottom',
          [
            `left: ${verticalX}px; top: ${verticalY}px; transform: translateX(calc(-50% + ${userOffsetX}px, ${userOffsetY}px));`,
            'left: 50%;',
          ],
        ],
        [
          'bottom-start',
          [
            `left: ${offsetX}px; top: ${verticalY}px; transform: translate(${userOffsetX}px, ${userOffsetY}px);`,
            `left: ${
              (this.popWidth >= this.width
                ? this.width / 2
                : this.popWidth - 25) - offsetX
            }px;`,
          ],
        ],
        [
          'bottom-end',
          [
            `right: ${offsetX}px; top: ${verticalY}px; transform: translate(${userOffsetX}px, ${userOffsetY}px);`,
            `right: ${
              (this.popWidth >= this.width
                ? this.width / 2
                : this.popWidth - 25) - offsetX
            }px; transform: translateX(50%);`,
          ],
        ],
        // 左
        [
          'left',
          [
            `right: ${horizontalX}px; top: ${horizontalY}px; transform: translate(${userOffsetX}px, calc(-50% + ${userOffsetY}px));`,
            'top: 50%',
          ],
        ],
        [
          'left-start',
          [
            `right: ${horizontalX}px; top: ${offsetY}px; transform: translate(${userOffsetX}px, ${userOffsetY}px);`,
            `top: ${
              (this.popHeight >= this.height
                ? this.height / 2
                : this.popHeight - 20) - offsetY
            }px;`,
          ],
        ],
        [
          'left-end',
          [
            `right: ${horizontalX}px; bottom: ${offsetY}px; transform: translate(${userOffsetX}px, ${userOffsetY}px);`,
            `bottom: ${
              (this.popHeight >= this.height
                ? this.height / 2
                : this.popHeight - 20) - offsetY
            }px; transform: translateY(50%);`,
          ],
        ],
        // 右
        [
          'right',
          [
            `left: ${horizontalX}px; top: ${horizontalY}px; transform: translate(${userOffsetX}px, calc(-50% + ${userOffsetY}px));`,
            'top: 50%',
          ],
        ],
        [
          'right-start',
          [
            `left: ${horizontalX}px; top: ${offsetY}px; transform: translate(${userOffsetX}px, ${userOffsetY}px);`,
            `top: ${
              (this.popHeight >= this.height
                ? this.height / 2
                : this.popHeight - 20) - offsetY
            }px;`,
          ],
        ],
        [
          'right-end',
          [
            `left: ${horizontalX}px; bottom: ${offsetY}px; transform: translate(${userOffsetX}px, ${userOffsetY}px);`,
            `bottom: ${
              (this.popHeight >= this.height
                ? this.height / 2
                : this.popHeight - 20) - offsetY
            }px; transform: translateY(50%);`,
          ],
        ],
      ]);

      const [popStyle, arrowStyle] = [
        placements.get(placement)[0],
        placements.get(placement)[1],
      ];

      this.setData({
        popStyle,
        arrowStyle,
      });
    },

    handleShow() {
      const { show } = this.data;
      if (show) {
        this.control();
      }
      this.setData({
        showStyle: show ? 'display: inline-block;' : 'display: none;',
      });
    },
  },

  observers: {
    show() {
      this.handleShow();
    },
    'placement, offsetX, offsetY': function () {
      this.control();
    },
  },
});
