import { WD_PREFIX } from '../../utils/constant';
import { textToString } from '../../utils/platform';

Component({
  options: {
    virtualHost: true,
  },
  properties: {
    version: {
      type: String,
      value: '',
    },
    readOnly: {
      type: Boolean,
      value: false,
    },
    readValue: {
      type: null,
    },
    before: {
      type: null,
    },
    after: {
      type: null,
    },
    readBeforeAfter: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    complexReadOnly: false,
    complexReadValue: '',
    complexBefore: '',
    complexAfter: '',
    item: `${WD_PREFIX}-form-item`,
  },
  observers: {
    'version,readOnly,readValue,readBeforeAfter,before,after': function (
      version,
      readOnly,
      readValue,
      readBeforeAfter,
      before,
      after
    ) {
      const complexReadOnly = readOnly && version === 'wd';
      const complexReadValue = textToString(readValue);
      const complexBefore = readBeforeAfter && textToString(before);
      const complexAfter = readBeforeAfter && textToString(after);
      this.setData({
        complexReadOnly,
        complexReadValue,
        complexBefore,
        complexAfter,
      });
    },
  },
});
