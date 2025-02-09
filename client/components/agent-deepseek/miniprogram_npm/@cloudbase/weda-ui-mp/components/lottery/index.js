import { getTempFileURL } from '../../utils/tcb';
import { commonCompBehavior } from '../../utils/common-behavior';

Component({
  behaviors: [commonCompBehavior],

  /** 页面的初始数据 */
  data: {
    lotteryList: [
      {
        src: '',
        desc: '',
        actived: true,
        selected: false,
      },
      {
        src: '',
        desc: '',
        actived: false,
        selected: false,
      },
      {
        src: '',
        desc: '',
        actived: false,
        selected: true,
      },
      {
        src: '',
        desc: '',
        actived: false,
        selected: false,
      },
      {
        src: '',
        desc: '',
        actived: false,
        selected: false,
      },
      {
        src: '',
        desc: '',
        actived: false,
        selected: false,
      },
      {
        src: '',
        desc: '',
        actived: false,
        selected: false,
      },
      {
        src: '',
        desc: '',
        actived: false,
        selected: false,
      },
    ],
    dotList: [
      {
        single: true,
        position: 'left-top',
        direction: '',
        list: [],
      },
      {
        single: true,
        position: 'left-bottom',
        direction: '',
        list: [],
      },
      {
        single: true,
        position: 'right-top',
        direction: '',
        list: [],
      },
      {
        single: true,
        position: 'right-bottom',
        direction: '',
        list: [],
      },
      {
        single: false,
        position: 'top',
        direction: 'horizontal',
        list: ['1', '2', '3', '4', '5'],
      },
      {
        single: false,
        position: 'bottom',
        direction: 'horizontal',
        list: ['1', '2', '3', '4', '5'],
      },
      {
        single: false,
        position: 'left',
        direction: 'vertical',
        list: ['1', '2', '3', '4', '5'],
      },
      {
        single: false,
        position: 'right',
        direction: 'vertical',
        list: ['1', '2', '3', '4', '5'],
      },
    ],
    btnActived: false,
    clickLotteryEnable: true,
    checkedIndex: -1,
  },
  options: {
    virtualHost: true,
  },
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
    prizeResult: {
      type: String,
      value: '',
    },
    enablePrize: {
      value: true,
      type: Boolean,
    },
    prizeList: {
      type: Array,
      value: [],
    },
  },
  lifetimes: {
    attached() {
      this.setReadonlyAttributes &&
        this.setReadonlyAttributes({
          start: this.start.bind(this),
        });
    },
  },
  methods: {
    start() {
      this.clickLotteryButton({}, true);
    },
    clickLotteryButton: function (_, force) {
      const { lotteryList } = this.data;
      const { prizeResult, enablePrize, clickLotteryEnable } = this.properties;
      //触发外部事件
      this.triggerEvent('clickLotteryButton', {});

      //是否正在抽奖
      if (clickLotteryEnable) {
        this.setData({
          clickLotteryEnable: false,
        });
      } else if (!force) {
        return;
      }
      //支持抽奖
      if (!enablePrize && !force) {
        return;
      }
      //动画旋转次数
      let count = 0;
      //是否超时
      let isTimeout = false;
      // 开启循环抽奖
      // eslint-disable-next-line rulesdir/no-timer
      let intervalId = setInterval(() => {
        //再次获取抽奖结果
        let prizeResultNew = this.properties.prizeResult;
        if (
          prizeResultNew == null ||
          (!this.properties.enablePrize && !force)
        ) {
          //如果是禁止，立马停止
          clearInterval();
          this.setData({
            clickLotteryEnable: true,
          });
          return;
        }
        //触发抽奖动画
        let index = count % lotteryList.length;
        let tempList = [];
        lotteryList.forEach((item, i) => {
          if (index === i) {
            item.actived = true;
          } else {
            item.actived = false;
          }
          item.selected = false;
          tempList.push(item);
          //如果超时，则终止
          if (isTimeout) {
            let reg = /^\+?[1-9]\d*$/;
            if (!reg.test(prizeResult)) {
              isTimeout = false;
              clearInterval(intervalId);
              wx.showToast({
                title: '网络异常',
                icon: 'none',
              });
            }
            if (index === parseInt(prizeResultNew) - 1) {
              isTimeout = false;
              this.setData({
                checkedIndex: index,
              });
              clearInterval(intervalId);
              // eslint-disable-next-line rulesdir/no-timer
              setTimeout(() => {
                this.triggerEvent('finishLottery', {
                  prize: prizeResultNew,
                  result: lotteryList[i],
                });
                // // 延迟显示的视觉效果更好，否则看不清结果就弹出dialog盖住了
              }, 600);
            }
            // eslint-disable-next-line rulesdir/no-timer
            setTimeout(() => {
              //防止暴力点击误触，影响抽奖可用次数结果，延迟1.5s，才可点击
              this.setData({
                clickLotteryEnable: true,
              });
            }, 1500);
          }
        });
        let checkedIndex = this.data.checkedIndex;
        this.setData({
          btnActived: checkedIndex < 0,
          lotteryList:
            checkedIndex < 0
              ? tempList
              : tempList.map((item, index) => {
                  if (index === checkedIndex) {
                    item.selected = true;
                  } else {
                    item.selected = false;
                  }
                  item.actived = false;
                  return item;
                }),
        });
        //设置默认数据
        this.setData({
          checkedIndex: -1,
        });
        count++;
      }, 150);
      // 控制超时
      // eslint-disable-next-line rulesdir/no-timer
      setTimeout(() => {
        isTimeout = true;
      }, 3000);
    },
  },
  observers: {
    prizeList: async function (prizeList) {
      //获取初始化默认数据，数据不足8条设置默认，超过8条获取前8条
      let list = [];
      for (let i = 0; i < 8; i++) {
        if (i < prizeList.length) {
          let prize = prizeList[i];
          list.push({
            idx: i + 1,
            selected: false,
            actived: false,
            desc: prize.title,
            src: prize.image,
          });
        } else {
          list.push({
            idx: i + 1,
            selected: false,
            actived: false,
            desc: '',
            src: '',
          });
        }
      }
      // cloudId
      const realList = await Promise.all(
        list.map(async (item) => {
          const src = await getTempFileURL(item.src);
          return { ...item, src };
        })
      );
      this.setData({
        lotteryList: realList,
      });
    },
  },
});
