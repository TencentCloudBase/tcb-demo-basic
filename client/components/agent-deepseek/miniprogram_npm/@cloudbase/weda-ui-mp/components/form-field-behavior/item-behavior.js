import { WD_PREFIX } from '../../utils/constant';

/**
 * 定义表单组件属性入参，取所有组件的并集
 */
export default Behavior({
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
    name: {
      type: String,
      value: '',
    },
    value: {
      type: null,
    },
    inputValue: {
      type: String,
      value: '',
    },
    placeholder: {
      type: String,
      value: '请输入',
    },
    startPlaceholder: {
      type: String,
      value: '请选择开始时间',
    },
    endPlaceholder: {
      type: String,
      value: '请选择结束时间',
    },
    direction: {
      type: String,
      value: '',
    },
    size: {
      type: String,
      value: '',
    },
    block: {
      type: Boolean,
      value: false,
    },
    label: {
      type: String,
      value: '标题',
    },
    layout: {
      type: String,
      value: '',
    },
    labelVisible: {
      type: Boolean,
      value: true,
    },
    labelAlign: {
      type: String,
      value: '',
    },
    labelWrap: {
      type: Boolean,
      value: false,
    },
    labelWidth: {
      type: String,
      value: '',
    },
    labelTips: {
      type: String,
      value: '',
    },
    clearable: {
      type: Boolean,
      value: true,
    },
    before: {
      type: String,
      value: '',
    },
    after: {
      type: String,
      value: '',
    },
    isUnionValue: {
      type: Boolean,
      value: true,
    },
    prefixType: {
      type: String,
      value: '',
    },
    prefixIcon: {
      type: String,
      value: 'success',
    },
    prefixSrc: {
      type: String,
      value: '',
    },
    suffixType: {
      type: String,
      value: '',
    },
    suffixIcon: {
      type: String,
      value: 'success',
    },
    suffixSrc: {
      type: String,
      value: '',
    },
    extra: {
      type: String,
      value: '',
    },
    password: {
      type: Boolean,
      value: false,
    },
    type: {
      type: String,
      value: 'text',
    },
    focus: {
      type: Boolean,
      value: false,
    },
    borderedH5: {
      type: Boolean,
      value: true,
    },
    borderedPc: {
      type: Boolean,
      value: true,
    },
    isNickNameType: {
      type: Boolean,
      value: false,
    },
    maxLength: {
      type: Number,
      value: 140,
    },
    rules: {
      type: Array,
      value: [],
    },
    status: {
      type: String,
      value: 'edit',
    },
    required: {
      type: Boolean,
      value: false,
    },
    requiredFlag: {
      type: Boolean,
      value: true,
    },
    requiredMsg: {
      type: String,
      value: '该项为必填项',
    },
    wrapClassName: {
      type: String,
      value: '',
    },
    classRoot: {
      type: String,
      value: 'input',
    },
    counterVisible: {
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
    validateErrorMsg: {
      type: String,
      value: '',
    },
    validateState: {
      type: undefined,
    },
    readValue: {
      type: String,
      value: '',
    },
    controlAlign: {
      type: String,
      value: '',
    },
    format: {
      type: String,
      value: '',
    },
    range: {
      type: Array,
      value: [],
    },
    enumName: {
      type: String,
      value: '',
    },
    tipBlock: {
      type: null,
    },
    isAll: {
      type: Boolean,
      value: false,
    },
    start: {
      type: null,
    },
    end: {
      type: null,
    },
    dateFormat: {
      type: String,
      value: 'YYYY-MM-DD HH:mm:ss',
    },
    mode: {
      type: String,
      value: 'datetime',
    },
    where: {
      type: Array,
      value: [],
    },
    viewId: {
      type: String,
      value: '',
    },
    primaryField: {
      type: String,
      value: '',
    },
    dataSourceName: {
      type: String,
      value: '',
    },
    regionType: {
      type: String,
      value: 'levelThree',
    },
    source: {
      type: String,
      value: '',
    },
    showLngLat: {
      type: Boolean,
      value: false,
    },
    showMap: {
      type: Boolean,
      value: false,
    },
    defauleShowLocation: {
      type: Boolean,
      value: true,
    },
    drag: {
      type: Boolean,
      value: true,
    },
    zoom: {
      type: Boolean,
      value: true,
    },
    locationType: {
      type: Number,
      value: 1,
    },
    locationRange: {
      type: Number,
      value: 0,
    },
    customRange: {
      type: Number,
      value: 0,
    },
    dataSource: {
      type: Object,
    },
    acceptTypes: {
      type: Array,
      value: ['image/*'],
    },
    maxUploadCount: {
      type: Number,
      value: 9,
    },
    tips: {
      type: String,
      value: '图片上传提示',
    },
    single: {
      type: Boolean,
      value: false,
    },
    maxSize: {
      type: Number,
      value: 10,
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
    deleteVisible: {
      type: Boolean,
      value: true,
    },
    downloadVisible: {
      type: Boolean,
      value: true,
    },
    isWdFormDetail: {
      type: Boolean,
      value: false,
    },
    readBeforeAfter: {
      type: Boolean,
      value: true,
    },
    autoHeight: {
      type: Boolean,
      value: true,
    },
    cursorSpacing: {
      type: Number,
      value: 0,
    },
    checkType: {
      type: String,
      value: 'checkbox',
    },
    tagStyleType: {
      type: String,
      value: 'light',
    },
    tagStyleColor: {
      type: String,
      value: '#0052d9',
    },
    tagStyleSpace: {
      type: String,
      value: 'md',
    },
    tagStyleRadius: {
      type: null,
    },
    tagStyleWidth: {
      type: null,
    },
    ignoreCase: {
      type: Boolean,
      value: true,
    },
    staticSearchable: {
      type: Boolean,
      value: true,
    },
  },
  data: {
    classPrefix: WD_PREFIX,
    value: null,
    hasClearIcon: false, // 通用：输入类组件是否有清除按钮
    readValue: '', // 通用：只读值，需要每个组件自行实现
  },
  methods: {
    // 通用: 事件透传
    handleEvent: function (params) {
      const { type, detail } = params || {};
      this.triggerEvent(type, detail);
    },
    // 通用: 更改表单 context 中的 value 值
    changeForm: function (e) {
      this.setData({ value: e?.detail?.value });
    },
    // 通用: change 动作
    handleChange: function (e) {
      this.changeForm(e);
      this.triggerEvent('change', e.detail);
    },
    // 通用: clear 动作
    handleClear: function () {
      const e = { detail: { value: null, context: {} } };
      this.handleChange(e);
    },
    // 通用: 输入类挂载 widgets
    updateWidgetAPI: function () {
      const { name, value, label, required, visible, disabled, readOnly, before, after } = this.data;
      this.setReadonlyAttributes?.({
        name,
        value,
        label,
        required,
        visible,
        disabled,
        readOnly,
        before,
        after,
      });
    },
    // 点击前后缀文字/图标
    inputAdornmentClick: function (e) {
      this.triggerEvent('inputAdornmentClick', {
        type: e.currentTarget.dataset.type,
      });
    },
  },
  observers: {
    'clearable,disabled,value': function (clearable, disabled, value) {
      const truth = value != null && value !== '' && (!Array.isArray(value) || value.length !== 0);
      const hasClearIcon = !!(clearable && !disabled && truth);
      this.setData({ hasClearIcon });
    },
  },
});
