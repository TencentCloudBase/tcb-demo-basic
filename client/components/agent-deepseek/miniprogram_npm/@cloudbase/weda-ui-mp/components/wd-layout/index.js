import { commonCompBehavior } from '../../utils/common-behavior';
import { WD_PREFIX } from '../../utils/constant';

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
    template: {
      type: String,
      value: 'white',
    },
    enableHeaderSlot: {
      type: Boolean,
      value: true,
    },
    enableContentSlot: {
      type: Boolean,
      value: true,
    },
  },
  data: { classPrefix: WD_PREFIX },
  lifetimes: {},
  methods: {},
  observers: {},
});
