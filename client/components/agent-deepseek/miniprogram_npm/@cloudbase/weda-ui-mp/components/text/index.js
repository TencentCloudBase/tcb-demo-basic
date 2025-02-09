Component({
  options: {
    virtualHost: true,
  },
  properties: {
    text: {
      type: String,
      value: '',
    },
    level: {
      type: String,
      value: '0',
    },
    userSelect: {
      type: Boolean,
      value: true,
    },
    space: {
      type: Boolean,
      value: false,
    },
    className: {
      type: String,
      value: '',
    },
    style: {
      type: String,
      value: '',
    },
  },
  methods: {},
  observers: {
    level: function (level) {
      const levelName = `level_${level}`;
      if (level !== '0') {
        this.setData({ levelName });
      }
    },
  },
});
