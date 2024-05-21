/* eslint-disable @typescript-eslint/no-magic-numbers */
import { getWedaAPI } from '../../utils/getWedaApi';
import classNames from '../../utils/classnames';
import { commonCompBehavior } from '../../utils/common-behavior';
import { WD_PREFIX } from '../../utils/constant';
import debounce from '../../utils/debounce';

const MINUTE = 60;
const DEFAULT_TIME_STR = '--:--';

const calcTime = (num) => {
  try {
    let m = `${Math.floor(+num / MINUTE)}`;
    let s = `${Math.floor(+num % MINUTE)}`;

    if (m.length <= 1) m = `0${m}`;
    if (s.length <= 1) s = `0${s}`;

    return `${m}:${s}`;
  } catch (error) {
    return DEFAULT_TIME_STR;
  }
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
    src: {
      type: String,
      value: '',
    },
    autoplay: {
      type: Boolean,
      value: false,
    },
    loop: {
      type: Boolean,
      value: false,
    },
    playbackRate: {
      type: Number,
      value: 1.0,
    },
    startTime: {
      type: Number,
      value: 0,
    },
  },
  domObserver: null,
  readyTimer: null,
  data: {
    cls: '',
    audioInstance: null,
    currentTimeStr: '',
    durationStr: '',
    played: false,
  },
  lifetimes: {
    created() {
      this.init = debounce(this.initOrigin, 500);
    },
    attached() {
      this.init();
      this.updateWidgetAPI();
    },
    detached() {
      this.destroy();
    },
  },
  methods: {
    init() {},
    updateWidgetAPI() {
      this.setReadonlyAttributes &&
        this.setReadonlyAttributes({
          audioInstance: this.data.audioInstance,
          currentTimeStr: this.data.currentTimeStr,
          durationStr: this.data.durationStr,
          played: this.data.played,
          play: this.play.bind(this),
          pause: this.pause.bind(this),
          stop: this.stop.bind(this),
          seek: this.seek.bind(this),
          destroy: this.destroy.bind(this),
          fastForward: this.fastForward.bind(this),
          backward: this.backward.bind(this),
          init: this.init.bind(this),
        });
    },
    async getRealSrc(src) {
      if (/^cloud:\/\//.test(src)) {
        try {
          let { app } = getWedaAPI();
          const res = await app.cloud.getTempFileURL(src);
          return res || '';
        } catch (error) {
          //
        }
      }
      return src;
    },
    initOrigin: async function (
      src = this.properties.src,
      autoplay = this.properties.autoplay,
      loop = this.properties.loop,
      playbackRate = this.properties.playbackRate,
      startTime = this.properties.startTime
    ) {
      let { audioInstance } = this.data;
      if (audioInstance) {
        audioInstance.destroy();
      }

      this.setData({ played: autoplay });

      audioInstance = wx.createInnerAudioContext({
        useWebAudioImplement: false,
      });

      if (!audioInstance) return;

      audioInstance.src = await this.getRealSrc(src || '');
      audioInstance.autoplay = autoplay;
      audioInstance.loop = loop;
      audioInstance.playbackRate = playbackRate;
      audioInstance.startTime = startTime || 0;

      audioInstance.onPlay(() => {
        this.setPlayState(true);
        this.triggerEvent('play');
      });
      audioInstance.onStop(() => {
        this.setPlayState(false);
        this.triggerEvent('stop');
      });
      audioInstance.onPause(() => {
        this.setPlayState(false);
        this.triggerEvent('pause');
      });
      audioInstance.onSeeked(() => {
        this.data.audioInstance.currentTime; // // 微信奇葩规则，觉醒duration，否则获取的是0
        // eslint-disable-next-line rulesdir/no-timer
        setTimeout(() => {
          this.setData({
            currentTimeStr: calcTime(this.data.audioInstance.currentTime),
          });
          this.updateWidgetAPI();
          this.triggerEvent('seeked', {
            position: this.data.audioInstance?.currentTime,
          });
        }, 0);
      });
      audioInstance.onError((res) => {
        this.setPlayState(false);
        this.triggerEvent('error', res);
      });
      audioInstance.onEnded(() => {
        this.setPlayState(false);
        this.updateWidgetAPI();
        this.triggerEvent('ended');
      });
      audioInstance.onTimeUpdate(() => {
        this.setData({
          played: true,
          currentTimeStr: calcTime(this.data.audioInstance?.currentTime),
          durationStr: calcTime(this.data.audioInstance?.duration),
        });
        this.updateWidgetAPI();
        this.triggerEvent('timeupdate', {
          currentTime: this.data.audioInstance?.currentTime,
          duration: this.data.audioInstance?.duration,
        });
      });
      audioInstance.onCanplay(() => {
        this.data.audioInstance.duration; // 微信奇葩规则，觉醒duration，否则获取的是0
        // eslint-disable-next-line rulesdir/no-timer
        setTimeout(() => {
          this.setData({
            durationStr: calcTime(this.data.audioInstance?.duration),
          });
          this.updateWidgetAPI();
        }, 0);
      });

      this.setData({ audioInstance, currentTimeStr: calcTime(startTime) });

      // eslint-disable-next-line rulesdir/no-timer
      setTimeout(() => {
        this.triggerEvent('audioReady', { audioInstance });
      }, 0);
      this.updateWidgetAPI();
    },
    setPlayState(played) {
      this.setData({ played });
      this.updateWidgetAPI();
    },
    play() {
      this.data.audioInstance?.play();
    },
    pause() {
      this.data.audioInstance?.pause();
    },
    stop() {
      this.data.audioInstance?.stop();
      if (this.data.audioInstance?.paused) {
        // 暂停的时候触发stop，微信小程序不会自动触发onStop监听
        this.triggerEvent('stop');
      }
    },
    seek({ position } = {}) {
      if (position === undefined) return;
      this.data.audioInstance?.seek(position);
    },
    fastForward({ time } = {}) {
      this.seek({
        position: Math.min(
          this.data.audioInstance?.currentTime + time,
          this.data.audioInstance?.duration
        ),
      });
    },
    backward({ time } = {}) {
      this.seek({
        position: Math.max(this.data.audioInstance?.currentTime - time, 0),
      });
    },
    destroy() {
      this.data.audioInstance?.destroy();
      this.setData({
        audioInstance: null,
        currentTimeStr: DEFAULT_TIME_STR,
        durationStr: DEFAULT_TIME_STR,
      });
      this.updateWidgetAPI();
    },
  },
  observers: {
    className: function (className) {
      // 响应式css api
      const cls = classNames({
        [`${WD_PREFIX}-audio`]: true,
        [`${WD_PREFIX}-mp-audio`]: true,
        [className]: className,
      });

      this.setData({ cls });
    },
    'src,autoplay,loop,playbackRate,startTime': function (
      src,
      autoplay,
      loop,
      playbackRate,
      startTime
    ) {
      this.init(src, autoplay, loop, playbackRate, startTime);
    },
  },
});
