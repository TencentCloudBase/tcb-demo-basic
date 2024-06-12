// pages/login/components/input.ts
Component({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
    multipleSlots: true,
  },
  behaviors: ['wx://form-field'],

  /**
   * 组件的属性列表
   */
  properties: {
    style: {
      type: String,
      value: '',
    },
    type: String,
    placeholder: String,
    maxlength: { type: Number, value: 140 },
    defaultValue: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    name: '',
  },
  lifetimes: {
    attached: function () {
      if (this.properties.defaultValue) {
        this.setData({ value: this.properties.defaultValue });
      }
      // 在组件实例进入页面节点树时执行
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    focus(e) {
      this.triggerEvent('focus', e.detail);
    },
    blur(e) {
      this.triggerEvent('blur', e.detail);
    },
    setValue(e) {
      this.setData({
        value: e.detail.value,
      });
      this.triggerEvent('change', e.detail);
    },
  },
});
