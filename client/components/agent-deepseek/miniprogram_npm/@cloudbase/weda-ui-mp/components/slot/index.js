import { WD_PREFIX } from '../../utils/constant';

Component({
  options: {
    virtualHost: true,
  },
  properties: {
    name: {
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
  },
  data: {
    classPrefix: WD_PREFIX,
  },
  methods: {},
});
