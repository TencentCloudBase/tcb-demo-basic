import classNames from '../../../utils/classnames';
import destr from '../../../utils/destr';
import handleEvents from '../../../utils/handleEvents';
import { callWedaApi } from '../../../utils/tcb';
import deepEqual from '../../../utils/deepEqual';

Component({
  options: {
    virtualHost: true,
  },
  properties: {
    className: {
      type: String,
      value: '',
    },
    style: {
      type: String,
      value: '',
    },
    label: {
      type: String,
      value: '标题',
    },
    labelVisible: {
      type: Boolean,
      value: true,
    },
    range: {
      type: Array,
      value: [
        { name: '多选-选项一', value: 'first', checked: true },
        { name: '多选-选项二', value: 'second', checked: false },
      ],
    },
    layout: {
      type: String,
      value: 'horizontal',
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    requiredFlag: {
      type: Boolean,
      value: false,
    },
    format: {
      type: String,
      value: '',
    },
    enumName: {
      type: String,
      value: '',
    },
    controlValue: {
      type: Array,
      value: [],
    },
  },
  data: {
    cls: '',
    subCls: '',
    isFlex: true,
    defaultRange: [],
    enumOption: [],
  },
  lifetimes: {
    attached() {
      const { className, layout, disabled, range } = this.properties;
      const isFlex = layout !== 'vertical';
      const cls = classNames({
        'weda-ui': true,
        'weda-checkbox': true,
        [className]: className,
      });
      const subCls = classNames({
        'weui-cell': true,
        'weui-cell_active': true,
        'weui-check__label': true,
        'weui-cell_disabled': disabled,
      });

      this.setData({ cls, subCls, isFlex, defaultRange: range });
    },
  },
  methods: {
    _fetchData: async function () {
      let data = await callWedaApi({
        action: 'DescribeGeneralOptionsDetailList',
        data: {
          OptNameList: [this.properties.enumName],
          PageIndex: 1,
          PageSize: 10,
        },
      });
      const config = destr(data?.Items?.[0]?.Config) ?? [];
      const enumOption = config.map((item) => {
        return {
          label: item.value,
          value: item.key,
          checked: false,
        };
      });
      this.setData({ enumOption: enumOption });
      this.handleCheckItem();
    },
    handleCheckItem() {
      const { controlValue, enumOption } = this.properties;
      const option =
        enumOption &&
        enumOption.map((item) => {
          const checked =
            controlValue && controlValue.find((val) => val === item.value);
          return {
            value: item.value,
            label: item.label,
            checked: !!checked,
          };
        });
      this.setData({ defaultRange: option });
    },

    ...handleEvents([
      {
        name: 'change',
        title: '值改变',
      },
    ]),
  },
  observers: {
    range: function (range) {
      if (
        this.properties.format !== 'x-enum' &&
        !deepEqual(range, this.data.defaultRange)
      ) {
        this.setData({ defaultRange: range });
      }
    },
    format: function (format) {
      if (format === 'x-enum' && this.properties.enumName) {
        this._fetchData();
      }
    },
  },
});
