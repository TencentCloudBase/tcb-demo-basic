import classNames from '../../../utils/classnames';

Component({
  options: {
    addGlobalClass: true,
    virtualHost: true,
  },
  properties: {
    title: {
      type: String,
      value: '图片上传',
    },
    sizeType: {
      type: Array,
      value: ['original', 'compressed'],
    },
    sourceType: {
      type: Array,
      value: ['album', 'camera'],
    },
    maxSize: {
      type: Number,
      value: 5 * 1024 * 1024,
    },
    maxCount: {
      // 最多上传多少个文件
      type: Number,
      value: 1,
    },
    files: {
      // 当前的图片列表, {url, error, loading}
      type: Array,
      value: [],
      observer(newVal) {
        this.setData({
          currentFiles: newVal,
        });
      },
    },
    select: {
      // 过滤某个文件
      type: null,
      value: () => {},
    },
    upload: {
      // 返回Promise的一个文件上传的函数
      type: null,
      value: null,
    },
    tips: {
      type: String,
      value: '',
    },
    layout: {
      type: String,
      value: 'horizontal',
    },
    extClass: {
      type: String,
      value: '',
    },
    showDelete: {
      // 是否显示delete按钮
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
    //是否显示标题
    labelVisible: {
      type: Boolean,
      value: true,
    },
    //是否获取微信头像
    isChooseAvatar: {
      type: Boolean,
      value: false,
    },
    //图片展示形状 圆角矩形-roundedTectangle 圆形-circular 直角矩形-ectangle
    showShape: {
      type: String,
      value: 'ectangle',
    },
  },
  data: {
    currentFiles: [],
    showPreview: false,
    previewImageUrls: [],
    shapeClass: '',
  },
  methods: {
    previewImage(e) {
      const { index } = e.currentTarget.dataset;
      const previewImageUrls = [];
      this.data.files.forEach((item) => {
        previewImageUrls.push(item.url);
      });
      this.setData({
        previewImageUrls,
        previewCurrent: index,
        showPreview: true,
      });
    },
    onChooseAvatar(e) {
      const that = this;
      that.loading = true;
      const { avatarUrl } = e.detail;
      const mgr = wx.getFileSystemManager();
      mgr.getFileInfo({
        filePath: avatarUrl,
        success(res) {
          that.loading = false;
          if (res?.size > that.data.maxSize) {
            that.failEvent(1, 1);
          } else {
            that.commonFile([
              {
                tempFilePath: avatarUrl,
                size: res?.size,
                type: 'image',
              },
            ]);
          }
        },
        fail(e) {
          this.triggerEvent('fail', e, {});
          that.loading = false;
        },
      });
      this.triggerEvent('chooseAvatar', e.detail);
    },
    chooseImage() {
      if (this.uploading) return;
      wx.chooseMedia({
        count: this.data.maxCount - this.data.files.length,
        sizeType: this.data.sizeType,
        sourceType: this.data.sourceType,
        success: (res) => {
          // 首先检查文件大小
          let invalidIndex = -1;
          res.tempFiles.forEach((item, index) => {
            if (item.size > this.data.maxSize) {
              invalidIndex = index;
            }
          });
          if (typeof this.data.select === 'function') {
            const ret = this.data.select(res);
            if (ret === false) {
              return;
            }
          }
          if (invalidIndex >= 0) {
            this.failEvent(res.tempFiles.length, invalidIndex);
            return;
          }
          this.commonFile(res.tempFiles);
        },
        fail: (fail) => {
          if (fail.errMsg.indexOf('chooseImage:fail cancel') >= 0) {
            this.triggerEvent('cancel', {}, {});
            return;
          }
          fail.type = 2;
          this.triggerEvent('fail', fail, {});
        },
      });
    },
    commonFile: function (tempFiles) {
      // 获取文件内容
      const mgr = wx.getFileSystemManager();
      const contents = tempFiles.map((item) => {
        const fileContent = mgr.readFileSync(item?.tempFilePath);

        return fileContent;
      });
      const obj = {
        tempFilePaths: tempFiles.map((item) => item.tempFilePath),
        tempFiles: tempFiles,
        contents,
      };
      // 触发选中的事件，开发者根据内容来上传文件，上传了把上传的结果反馈到files属性里面
      this.triggerEvent('select', obj, {});
      const files = tempFiles.map((item, i) => ({
        loading: true,
        url:
          item.tempFilePaths ||
          `data:image/jpg;base64,${wx.arrayBufferToBase64(contents[i])}`,
      }));
      if (!files || !files.length) return;
      if (typeof this.data.upload === 'function') {
        const len = this.data.files.length;
        const newFiles = this.data.files.concat(files);
        this.setData({
          files: newFiles,
          currentFiles: newFiles,
        });
        this.loading = true;
        this.data
          .upload(obj)
          .then((json) => {
            this.loading = false;
            if (json.urls) {
              const oldFiles = this.data.files;
              json.urls.forEach((url, index) => {
                if (!oldFiles[len + index]) {
                  oldFiles[len + index] = {};
                }
                oldFiles[len + index].url = url;
                oldFiles[len + index].loading = false;
              });
              this.setData({
                files: oldFiles,
                currentFiles: newFiles,
              });
              this.triggerEvent('success', json, {});
            } else {
              this.triggerEvent(
                'fail',
                {
                  type: 3,
                  errMsg: 'upload file fail, urls not found',
                },
                {}
              );
            }
          })
          .catch((err) => {
            this.loading = false;
            const oldFiles = this.data.files;
            tempFiles.forEach((item, index) => {
              oldFiles[len + index].error = true;
              oldFiles[len + index].loading = false;
            });
            this.setData({
              files: oldFiles,
              currentFiles: newFiles,
            });
            this.triggerEvent(
              'fail',
              {
                type: 3,
                errMsg: 'upload file fail',
                error: err,
              },
              {}
            );
          });
      }
    },
    failEvent() {
      wx.showToast({
        icon: 'none',
        duration: 2000,
        title: `请上传不超过 ${this.data.maxSize / (1024 * 1024)}M 的图片`,
      });
    },
    deletePic(e) {
      const index = e.detail.index;
      const files = this.data.files;
      const file = files.splice(index, 1);
      this.setData({
        files,
        currentFiles: files,
      });
      this.triggerEvent('delete', { index, item: file[0] });
    },
  },
  observers: {
    showShape: function (showShape) {
      var shapeClass = '';
      switch (showShape) {
        // 圆角矩形-roundedTectangle
        case 'roundedTectangle':
          shapeClass = classNames({
            ['img-shape-rounded-tectangle']: true,
          });
          this.setData({ shapeClass });
          break;
        // 圆形-circular
        case 'circular':
          shapeClass = classNames({
            ['img-shape-circular']: true,
          });
          this.setData({ shapeClass });
          break;
        default:
          shapeClass = classNames({
            ['img-shape-ectangle']: true,
          });
          this.setData({ shapeClass });
          break;
      }
    },
  },
});
