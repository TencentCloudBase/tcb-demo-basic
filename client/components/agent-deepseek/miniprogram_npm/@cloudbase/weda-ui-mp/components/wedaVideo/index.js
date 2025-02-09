import { getTempFileURL } from '../../utils/tcb';
import handleEvents from '../../utils/handleEvents';
import { commonCompBehavior } from '../../utils/common-behavior';
import { getWedaAPI } from '../../utils/getWedaApi';
import { errorHandler } from '../../utils/error';
// component/videojs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    className: {
      type: String,
      value: '',
    },
    style: {
      type: String,
      value: '',
    },
    videoDataSource: {
      type: String,
      value: '',
    },
    posterImage: {
      type: String,
      value: '',
    },
    autoPlay: {
      type: Boolean,
      value: false,
    },
    loopPlay: {
      type: Boolean,
      value: false,
    },
    mutePlay: {
      type: Boolean,
      value: false,
    },
    controlBarStatus: {
      type: Boolean,
      value: true,
    },
    startTime: {
      type: Number,
      value: 0,
    },
    endTime: {
      type: Number,
      value: 0,
    },
    objectFit: {
      type: String,
      value: 'contain',
    },
    showCenterPlayBtn: {
      type: Boolean,
      value: true,
    },
  },
  behaviors: [commonCompBehavior],
  lifetimes: {
    attached() {
      const videoContext = wx.createVideoContext(this.data.videoId, this);
      this.setReadonlyAttributes &&
        this.setReadonlyAttributes({
          videoContext,
          play: () => videoContext.play(),
          pause: () => videoContext.pause(),
          stop: () => videoContext.stop(),
          seek: ({ position }) => videoContext.seek(position),
          playbackRate: ({ rate }) => videoContext.playbackRate(rate),
          requestFullScreen: () => videoContext.requestFullScreen(),
          exitFullScreen: () => videoContext.exitFullScreen(),
        });
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    videoId: `${new Date().getTime()}-${Math.random()}`,
    videoErrMsg: '',
    videoErrStatus: false,
    realSrc: '',
    realPosterImage: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    ...handleEvents(
      [
        {
          name: 'pause',
          title: '暂停播放',
        },
        {
          name: 'ended',
          title: '播放到末尾',
        },
        {
          name: 'fullscreenchange',
          title: '全屏切换',
        },
        {
          name: 'waiting',
          title: '视频缓冲',
        },
        {
          name: 'progress',
          title: '加载进度变化',
        },
        {
          name: 'loadedmetadata',
          title: '视频元数据加载完成',
        },
        {
          name: 'seekcomplete',
          title: '跳转到指定位置 seekcomplete',
        },
      ],
      'bind'
    ),
    bindtimeupdate(event) {
      this.triggerEvent('timeupdate', event.detail);
      const { currentTime } = event.detail;
      const { endTime, loopPlay } = this.properties;
      const videoContext = wx.createVideoContext(this.data.videoId, this);
      if (currentTime >= endTime && endTime) {
        videoContext.seek(0);
        loopPlay ? videoContext.play() : videoContext.pause();
      }
    },
    binderror(event) {
      this.triggerEvent('error', event.detail);
      const { errMsg } = event.detail;
      this.setData({
        videoErrMsg: errMsg,
        videoErrStatus: true,
      });
      console.error('binderror', event.detail);
    },
    bindplay(event) {
      this.triggerEvent('play', event.detail);
      this.setData({
        videoErrMsg: '',
        videoErrStatus: false,
      });
    },
  },
  observers: {
    videoDataSource: function () {
      const { videoDataSource = '' } = this.properties;
      let { app } = getWedaAPI();
      if (/^cloud:\/\//.test(videoDataSource)) {
        app.cloud
          .getTempFileURL(videoDataSource)
          .then((res) => {
            this.setData({ realSrc: res || '' });
          })
          .catch((e) => {
            errorHandler({
              code: 'WedaVideo.GetVideoDataSourceError',
              error: e,
            });
            this.setData({
              realSrc: videoDataSource,
            });
          });
      } else {
        this.setData({
          realSrc: videoDataSource,
        });
      }
    },
    posterImage: async function (posterImage) {
      const realPosterImage = await getTempFileURL(posterImage);
      this.setData({ realPosterImage });
    },
  },
});
