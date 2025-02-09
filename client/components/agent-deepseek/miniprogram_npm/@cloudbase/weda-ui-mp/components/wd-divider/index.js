import { commonCompBehavior } from '../../utils/common-behavior';

Component({
  options: {
    virtualHost: true,
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
    type: {
      type: String,
      value: 'solid',
    },
  },
  lifetimes: {
    attached() {
      this.updateWidgetAPI();
      this.setData({ id: this.id });
    },
  },
  methods: {
    updateWidgetAPI() {
      const { type } = this.data;
      this.setReadonlyAttributes &&
        this.setReadonlyAttributes({
          type,
        });
    },
  },
  observers: {
    type: function () {
      this.updateWidgetAPI();
    },
  },
});
