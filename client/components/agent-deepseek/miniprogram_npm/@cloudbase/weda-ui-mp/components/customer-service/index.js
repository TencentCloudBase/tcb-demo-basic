import handleEvents from '../../utils/handleEvents';
import { commonCompBehavior } from '../../utils/common-behavior';

Component({
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
    showMessageCard: {
      type: Boolean,
    },
    sendMessageTitle: {
      type: String,
    },
    sendMessagePath: {
      type: String,
    },
    sendMessageImg: {
      type: String,
    },
    sessionFrom: {
      type: String,
    },
  },
  methods: {
    tap: function (e) {
      this.triggerEvent('contact', e.detail);
    },
    ...handleEvents([{ title: '打开客服会话', name: 'contact' }]),
  },
});
