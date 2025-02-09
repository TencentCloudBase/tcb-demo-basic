import { getCloudInstance, getTempFileURL } from '../../../utils/tcb';
import { transSize, randomStr } from '../../../utils/platform';
import equal from '../../../utils/deepEqual';

Component({
  options: {
    virtualHost: true,
    multipleSlots: true,
  },
  properties: {
    label: {
      type: String,
      value: '文件上传',
    },
    //是否显示标题
    labelVisible: {
      type: Boolean,
      value: true,
    },
    //单文件上传模式
    single: {
      type: Boolean,
      value: false,
    },
    defaultValue: {
      type: null,
    },
    oldValue: {
      type: null,
    },
    maxUploadCount: {
      type: Number,
      value: 9,
    },
    //单个文件最大使用限制
    maxSize: {
      type: Number,
      value: 10,
    },
    layout: {
      type: String,
      value: '',
    },
    extClass: {
      type: String,
      value: '',
    },
    tips: {
      type: Boolean,
      value: false,
    },
    status: {
      type: String,
      valve: 'success',
    },
    downloadVisible: {
      type: Boolean,
      value: true,
    },
    requiredFlag: {
      type: Boolean,
      value: false,
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    readOnly: {
      type: Boolean,
      value: false,
    },
    callbacks: {
      type: Object,
      value: null,
    },
    uploadTipText: {
      type: String,
      value: '支持批量上传',
    },
    uploadButtonText: {
      type: String,
      value: '点击上传',
    },
  },
  data: {
    maxCount: 0,
    files: [],
    urls: [],
    cloudFile: [],
    strogeUrls: [],
    singleFlag: false,

    layoutCls: '',
    showActionsheet: false,
    groups: [
      { text: '照片图库', value: 1 },
      { text: '拍照或录像', value: 2 },
      { text: '选取聊天文件', value: 3 },
    ],
  },
  methods: {
    // 批量上传文件前置事件
    handleBefore: function (files = []) {
      if (this.data.files.length + files.length > this.data.maxCount) {
        wx.showToast({
          title: `上传文件总数不能超过${this.data.maxCount}个`,
          icon: 'none',
          duration: 2000,
        });
        return false;
      }
      if (this.properties.maxSize && files.some((f) => f.size > this.properties.maxSize * 1024 * 1024)) {
        wx.showToast({
          title: `上传文件大小不能超过${this.properties.maxSize}M`,
          icon: 'none',
          duration: 2000,
        });
        return false;
      }
      if (files.some((f) => f.size > 500 * 1024 * 1024)) {
        wx.showToast({
          title: `上传文件大小不能超过500M`,
          icon: 'none',
          duration: 2000,
        });
        return false;
      }
      return true;
    },
    //上传文件过程
    uploadFile: async function () {
      //文件上传的函数，
      wx.chooseMessageFile({
        count: this.data.maxCount,
        type: 'all',
        success: async (files) => {
          await this.handleUpload(files?.tempFiles);
        },
        fail(e) {
          this.triggerEvent('error', e.detail);
        },
      });
    },
    //拍摄或从手机相册中选择图片或视频
    chooseMedia: async function (value) {
      wx.chooseMedia({
        count: this.data.maxCount,
        sourceType: value === 1 ? ['album'] : ['camera'],
        maxDuration: 60,
        success: async (files) => {
          await this.handleUpload(files?.tempFiles);
        },
        fail(e) {
          this.triggerEvent('error', e.detail);
        },
      });
    },
    getName: function (hf) {
      const uuidReg = /[0-9a-f]{8}([0-9a-f]{4}){3}[0-9a-f]{12}-/;
      const lastIndex = String(hf).lastIndexOf('/');
      const name = String(hf).slice(lastIndex + 1);
      const label = name.replace(uuidReg, '');
      return label;
    },
    handleUpload: async function (files, reload = false) {
      var _this = this;
      if (!this.handleBefore(files)) return;

      const callbacks = this.data.callbacks;
      let shouldUploadToCos = true;
      if (typeof callbacks?.beforeUpload === 'function') {
        try {
          const mgr = wx.getFileSystemManager();
          const ret = await callbacks.beforeUpload({
            tempFilePaths: files.map((f) => f.path || f.tempFilePath),
            base64Uri: files.map((f) => {
              const content = mgr.readFileSync(f.path || f.tempFilePath);
              return `data:;base64,${wx.arrayBufferToBase64(content)}`;
            }),
          });
          if (typeof ret === 'boolean') {
            shouldUploadToCos = ret;
          } else if (Array.Array(ret) && ret.every((i) => typeof i === 'string')) {
            files = ret.map((path, idx) => {
              files[idx].path = path;
            });
          }
        } catch (err) {
          console.error('上传前处理函数抛错', err);
          shouldUploadToCos = false;
        }
      }
      if (shouldUploadToCos === false) {
        return false;
      }

      const initFiles = files.map((i) => ({
        ...i,
        percent: '0',
        cloudPath: null,
        name: i?.name || this.getName(i?.tempFilePath),
        filePath: i?.path || i?.tempFilePath || null,
        size: transSize(i?.size),
        status: 'pending',
      }));
      let filelsList = reload ? this.data.files : [...this.data.files, ...initFiles];
      this.setData({
        files: filelsList,
      });
      Promise.all(
        initFiles.map(async (tempFile) => {
          return new Promise(function (resolve) {
            _this.handleUploadFile({
              _tempFile: tempFile,
              onSuccess: (res) => {
                filelsList = filelsList.map((i) => (i.filePath === res.filePath ? res : i));
                _this.triggerEvent('success', {
                  value: res.cloudPath,
                  file: res,
                });
                resolve(res);
              },
              onProgressUpdate: (res) => {
                filelsList = filelsList.map((i) => (i.filePath === res.filePath ? res : i));
                _this.setData({
                  files: filelsList,
                });
              },
              onFail: (res, error) => {
                filelsList = filelsList.map((i) => (i.filePath === res.filePath ? res : i));
                _this.triggerEvent('error', error.detail);
                resolve(res);
              },
            });
          });
        }),
      ).then((res) => {
        const result = filelsList.map((i) => res.find((j) => j.filePath === i.filePath) || i);
        const cloudPathList = result.filter((i) => i.cloudPath).map((j) => j.cloudPath);
        this.setData({
          files: result,
          urls: cloudPathList,
          cloudFile: cloudPathList,
        });
        _this.handleChange(cloudPathList);
      });
    },
    handleUploadFile: async function ({ _tempFile, onSuccess, onProgressUpdate, onFail }) {
      const tempFile = {
        ..._tempFile,
      };
      const uploadPath = 'weda-uploader';
      const cloudPath = `${uploadPath}/${randomStr()}-${tempFile.name}`;
      try {
        const tcb = await getCloudInstance();
        const uploadTask = await tcb.uploadFile({
          cloudPath: cloudPath,
          filePath: tempFile.path || tempFile.tempFilePath,
          success(res) {
            tempFile.cloudPath = res.fileID;
            tempFile.percent = 100;
            tempFile.status = 'success';
            if (onSuccess) {
              onSuccess(tempFile);
            }
          },
          fail(e) {
            tempFile.status = 'fail';
            wx.showModal({
              title: '上传失败，请重试',
              content: e.message,
              showCancel: false,
            });
            onFail(tempFile, {
              detail: e,
            });
          },
        });
        if (typeof uploadTask.onProgressUpdate === 'function') {
          uploadTask.onProgressUpdate((res) => {
            tempFile.percent = String(res.progress);
            tempFile.status = res.progress == 100 ? 'success' : 'uploading';
            tempFile.uploaded = transSize(res.totalBytesSent);
            if (onProgressUpdate) {
              onProgressUpdate(tempFile);
            }
          });
        } else {
          tempFile.percent = '100';
          tempFile.status = 'success';
          tempFile.cloudPath = uploadTask.fileID;
          onSuccess(tempFile);
        }
      } catch (e) {
        tempFile.status = 'fail';
        wx.showModal({
          title: '上传失败，请重试',
          content: e.message,
          showCancel: false,
        });
        if (onFail) {
          onFail(tempFile, e);
        }
      }
    },
    onDelete: function (e) {
      let newUrls = [];
      if (this.data.urls.length == 0) {
        this.data.cloudFile.forEach((v) => {
          if (e.target.dataset.item.cloudPath != v) {
            newUrls.push(v);
          }
        });
        this.setData({
          files: this.data.files.filter((v) => e.target.dataset.item.cloudPath !== v.cloudPath),
          urls: newUrls,
        });
      } else {
        const filelist = this.data.files.filter(
          (item) =>
            e.target.dataset.item?.path != item?.path || e.target.dataset.item?.tempFilePath != item?.tempFilePath,
        );
        newUrls = this.data.urls.filter((v) => e.target.dataset.item?.cloudPath != v);
        this.setData({
          files: filelist,
          urls: newUrls,
        });
      }
      this.handleChange(newUrls);
    },

    // change 事件
    handleChange: function (values) {
      let value = values;
      if (this.properties.single) {
        value = values[0] ?? '';
      }
      this.setData({ oldValue: value });
      this.triggerEvent('change', { value });
    },

    reload: function (e) {
      this.handleUpload([e.target.dataset.item], true);
    },
    downloadFile: async function (e) {
      const path = e.target.dataset.item?.cloudPath;

      const fileSrc = /^cloud:/.test(path) ? await getTempFileURL(path) : path;
      if (fileSrc) {
        wx.showLoading({
          title: '下载中',
          mask: true,
        });
        wx.downloadFile({
          url: fileSrc,
          success(res) {
            wx.hideLoading();
            const fileManager = wx.getFileSystemManager();
            fileManager.saveFile({
              tempFilePath: res.tempFilePath,
              success: (res) => {
                wx.hideLoading();
                wx.openDocument({
                  filePath: res.savedFilePath,
                  showMenu: true,
                  fail: function () {
                    // https://developers.weixin.qq.com/community/develop/doc/0006a6b6f2cf60404299d51ab56809?highLine=wx.openDocument
                    wx.showToast({
                      title: `该文档类型暂不支持下载`,
                      icon: 'none',
                      duration: 2000,
                    });
                  },
                });
              },
            });
          },
          fail(e) {
            wx.hideLoading();
            wx.showToast({
              title: e.errMsg,
              icon: 'none',
              duration: 2000,
            });
          },
        });
      }
    },
    onButtonTap: function () {
      this.setData({
        showActionsheet: true,
      });
    },
    onActionTap: function (e) {
      this.setData({
        showActionsheet: false,
      });
      switch (e?.detail?.value) {
        // 照片图库
        case 1:
        // 拍照或录像
        // eslint-disable-next-line no-fallthrough
        case 2:
          this.chooseMedia(e?.detail?.value);
          break;
        // 选取聊天文件
        case 3:
          this.uploadFile();
          break;
      }
    },
  },
  observers: {
    defaultValue: async function (value) {
      if (equal(this.data.oldValue, value)) {
        return;
      }
      //当单图片上传且默认值为空数组时，初次渲染更新value，以避免空串提交类型不匹配问题
      if (Array.isArray(value) && !this.data.singleFlag) {
        this.setData({
          urls: value,
        });
        this.data.singleFlag = true;
      }
      let httpFiles = [];
      if (value && JSON.stringify(value) != '[]') {
        const values = Array.isArray(value) ? value : [value];
        for (let f of values) {
          if (f.startsWith('cloud:')) {
            const hf = await getTempFileURL(f);
            const label = this.getName(hf);
            const httpFile = {
              name: label,
              cloudPath: f,
              filePath: hf,
              path: hf,
              status: 'success',
            };
            httpFiles.push(httpFile);
          }
        }
        this.setData({
          oldValue: value,
          files: httpFiles,
          cloudFile: JSON.stringify(value) != JSON.stringify(this.data.cloudFile) ? [].concat(value) : [],
        });
      } else {
        this.setData({
          oldValue: value,
          files: [],
          cloudFile: [],
        });
      }
    },
    'maxUploadCount, single': function (maxUploadCount, single) {
      const maxCount = single ? 1 : maxUploadCount;
      this.setData({
        maxCount,
      });
    },
    'layout,extClass': function (layout, extClass) {
      const temp = `weda-formcells weui-cells weui-cells_forms ${extClass}`;
      const layoutCls = layout !== 'vertical' ? ` weui-flex ${temp}` : `${temp}`;
      this.setData({ layoutCls });
    },
  },
});
