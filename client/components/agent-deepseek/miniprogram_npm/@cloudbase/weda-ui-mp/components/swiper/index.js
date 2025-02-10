import handleEvents from '../../utils/handleEvents';

Component({
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
    indicatorDots: {
      value: true,
      type: Boolean,
    },
    autoplay: {
      value: true,
      type: Boolean,
    },
    current: {
      value: 0,
      type: Number,
    },
    interval: {
      value: 5000,
      type: Number,
    },
    duration: {
      value: 500,
      type: Number,
    },
    circular: {
      value: true,
      type: Boolean,
    },
    vertical: {
      value: false,
      type: Boolean,
    },
    indicatorColor: {
      type: String,
      value: 'rgba(200, 200, 200, 0.9)',
    },
    indicatorActiveColor: {
      type: String,
      value: 'rgba(0, 0, 0, 0.9)',
    },
  },
  methods: {
    ...handleEvents([
      {
        name: 'change',
        title: '切换',
      },
    ]),
  },
});
