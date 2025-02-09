import { getCloudInstance, getTempFileURL } from '../../../utils/tcb';
import { randomStr } from '../../../utils/platform';
import { compressImage } from './compress';
import { isNil } from '../../../utils/lodash';

Component({
  options: {
    virtualHost: true,
  },
  properties: {
    maxUploadCount: {
      type: Number,
      value: 5,
    },
    title: {
      type: String,
      value: '图片上传',
    },
    tips: {
      type: String,
      value: '图片上传提示',
    },
    layout: {
      type: String,
      value: 'horizontal',
    },
    defaultValue: {
      type: null,
    },
    single: {
      type: Boolean,
      value: false,
    },
    maxSize: {
      type: Number,
      value: 10,
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
      value: true,
    },
    //图片展示形状 圆角矩形-roundedTectangle 圆形-circular 直角矩形-ectangle
    showShape: {
      type: String,
      value: 'ectangle',
    },
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
    isCompressBeforeUpload: {
      type: Boolean,
      value: false,
    },
    compressQuality: {
      type: Number,
      value: 0.7,
    },

    compressedHeight: {
      type: Number,
      value: 0,
    },
    compressedWidth: {
      type: Number,
      value: 0,
    },
    sourceType: {
      type: String,
      value: 'both',
    },
    callbacks: {
      type: Object,
      value: null,
    },
  },
  data: {
    maxCount: 0,
    cloudFile: [],
    files: [],
    urls: [],
    sourceTypeArray: [],

    singleFlag: false,
    layoutCls: '',
    _layout: '',
  },
  lifetimes: {
    attached() {
      this.setData({ uploadFile: this.uploadFile.bind(this) });
    },
  },
  methods: {
    uploadFile: async function (files) {
      try {
        // 文件上传的函数，返回一个promise
        const uploadPath = 'weda-uploader';
        const callbacks = this.data.callbacks;
        let shouldUploadToCos = true;
        let tempFilePaths = files.tempFilePaths;
        if (typeof callbacks?.beforeUpload === 'function') {
          try {
            const ret = await callbacks.beforeUpload({
              tempFilePaths: tempFilePaths,
              base64Uri: files.contents.map(
                (content) =>
                  `data:image/jpg;base64,${wx.arrayBufferToBase64(content)}`
              ),
            });
            if (typeof ret === 'boolean') {
              shouldUploadToCos = ret;
            } else if (
              Array.isArray(ret) &&
              ret.every((item) => typeof item === 'string')
            ) {
              tempFilePaths = ret;
            } else if (!isNil(ret)) {
              throw new TypeError(
                '小程序端返回值接受布尔值 / 小程序文件临时路径数组'
              );
            }
          } catch (err) {
            console.error('上传前处理函数抛错', err);
            shouldUploadToCos = false;
          }
        }
        if (shouldUploadToCos === false) {
          return {}; // weui-uploader 不是对象
        }
        const tcb = await getCloudInstance();
        const uploadPromise = tempFilePaths.map(async (tempFilePath) => {
          const fileType = tempFilePath.split('.')[1];
          const cloudPath = `${uploadPath}/${randomStr()}-${Date.now()}.${fileType}`;
          let filePath = tempFilePath;
          if (this.data.isCompressBeforeUpload) {
            try {
              filePath = await compressImage(filePath, {
                isCompressBeforeUpload: this.data.isCompressBeforeUpload,
                compressQuality: this.data.compressQuality,
                compressedHeight: this.data.compressedHeight,
                compressedWidth: this.data.compressedWidth,
              });
            } catch (err) {
              console.error(`Compress error: ${err.message}`);
            }
          }
          const uploadRes = await tcb.uploadFile({
            cloudPath,
            filePath,
          });
          return { fileID: uploadRes.fileID };
        });
        const uploadFileList = await Promise.all(uploadPromise);
        const cloudUrls = uploadFileList.map((file) => file.fileID);
        // 这里返回的东西会在uploadSuccess回调函数中获取到
        // https://github.com/wechat-miniprogram/weui-miniprogram/blob/a3630575910302e3b94e69fcef266d2b509de650/src/components/uploader/uploader.ts#L149
        // 写死的从返回值的 .urls 获取展示用的url来用。一定要将tempFilePaths透传下去，否则会重新加载然后出现闪白
        return { urls: files.tempFilePaths, cloudUrls };
      } catch (e) {
        wx.showModal({
          title: '上传失败，请重试',
          content: e.message,
          duration: 2000,
          showCancel: false,
        });
        this.uploadError(e);
      }
    },
    uploadError: function (e) {
      this.triggerEvent('error', e.detail);
    },
    uploadSuccess: async function (e) {
      const urls = e.detail.cloudUrls; // uploadFile 获取返回值
      // 小程序自带tempURL 不需要调用 tcb.getTempFileURL 获取
      this.triggerEvent('success', {
        value: this.properties.single ? urls[0] : urls,
      });
      const newUrls = [...this.data.cloudFile, ...urls];
      this.setData({
        files: this.data.files.concat(e.detail.urls.map((url) => ({ url }))),
        urls: newUrls,
      });
      this.handleChange(newUrls);
    },
    onDelete: function (e) {
      let newUrls = [];
      if (this.data.urls.length == 0) {
        this.data.cloudFile.forEach((v, index) => {
          if (e.detail.index != index) {
            newUrls.push(v);
          }
        });
        this.setData({
          files: this.data.files.filter((v, index) => e.detail.index !== index),
          urls: newUrls,
        });
      } else {
        newUrls = this.data.urls.filter((v, index) => e.detail.index !== index);
        this.setData({
          files: this.data.files.filter((v, index) => e.detail.index !== index),
          urls: newUrls,
        });
      }
      this.handleChange(newUrls, true);
    },
    handleChange: function (values, isDelete = false) {
      let value = values;
      if (this.properties.single) {
        value = values[0] ?? '';
      }
      this.triggerEvent('change', { value, isDelete });
    },
  },
  observers: {
    defaultValue: async function (value) {
      //当单图片上传且默认值为空数组时，初次渲染更新value，以避免空串提交类型不匹配问题
      if (Array.isArray(value) && !this.data.singleFlag) {
        this.setData({
          urls: value,
        });
        this.data.singleFlag = true;
      }
      if (value) {
        let httpFiles = [];
        const values = Array.isArray(value) ? value : [value];
        for (let f of values) {
          const hf = await getTempFileURL(f);
          const httpFile = { url: hf };
          httpFiles.push(httpFile);
        }
        this.setData({
          files: httpFiles,
          cloudFile: values,
        });
      } else {
        this.setData({
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
    layout: function (layout) {
      const _layout = layout !== 'vertical' ? 'horizontal' : 'vertical';
      const layoutCls =
        _layout === 'horizontal' ? 'weda-formcells weui-flex' : '';
      this.setData({ _layout, layoutCls });
    },
    sourceType: function (sourceType) {
      if (sourceType === 'both') {
        this.setData({ sourceTypeArray: ['album', 'camera'] });
      } else {
        this.setData({ sourceTypeArray: [sourceType] });
      }
    },
  },
});
