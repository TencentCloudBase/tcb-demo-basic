import { commonCompBehavior } from '../../utils/common-behavior';
import { WD_PREFIX } from '../../utils/constant';

Component({
  options: {
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
    isMultipleSlot: {
      type: Boolean,
      value: false,
    },
    selectedIndex: {
      type: Number,
      value: 0,
    },
    list: {
      type: Array,
      value: [],
    },
    direction: {
      type: String,
      value: '',
    },
    currentIndex: {
      type: Number,
      value: 0,
    },
  },
  data: {
    classPrefix: WD_PREFIX,
    showMask: true,
    scrollId: '',
  },
  methods: {
    onItemClick: function (e) {
      if (!e.currentTarget.dataset.item.isDisabled) {
        this.triggerEvent('onCurrent', +e.currentTarget.dataset.value);
        // this.triggerEvent('change', e.currentTarget.dataset.item?.value);
      }
    },
  },
  observers: {
    currentIndex: function (currentIndex) {
      this.setData({ scrollId: `cell-${currentIndex}` });
    },
  },
});
