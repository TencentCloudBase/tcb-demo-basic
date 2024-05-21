import { getWedaAPI } from '../../utils/getWedaApi';

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
    images: {
      type: Array,
      value: [],
    },
    insideUrl: {
      type: String,
      value: '',
    },
  },
  methods: {
    changeCurrent(event) {
      const { current } = event.detail;
      this.triggerEvent('change', { current });
    },
    tapImg: (event) => {
      const { tapmode, insideurl, params, packagename } =
        event.currentTarget.dataset;
      if (tapmode === 'inside' && insideurl) {
        let paramObj =
          params &&
          params.length > 0 &&
          params.reduce((p, x) => {
            p[x.key] = x.value;
            return p;
          }, {});
        let { app } = getWedaAPI();
        app.navigateTo({
          pageId: insideurl,
          packageName: packagename || '',
          mode: 'weDa',
          params: paramObj,
        });
      }
    },
  },
});
