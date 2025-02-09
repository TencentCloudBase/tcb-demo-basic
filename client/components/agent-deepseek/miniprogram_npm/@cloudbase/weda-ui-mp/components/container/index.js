import { commonCompBehavior } from '../../utils/common-behavior';

Component({
  behaviors: [commonCompBehavior],
  options: {
    virtualHost: true,
  },
  properties: {
    id: {
      type: String,
      value: '',
    },
    className: {
      type: String,
      value: '',
    },
    style: {
      type: String,
      value: '',
    },
    data: {
      type: Object,
      value: {},
    },
  },
  methods: {},
  observers: {
    data: function (data) {
      this.setReadonlyAttributes?.({ data });
    },
  },
});
