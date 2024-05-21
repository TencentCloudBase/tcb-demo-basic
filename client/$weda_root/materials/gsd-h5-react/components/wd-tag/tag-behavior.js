/**
 * 标签 / 标签选择共同的属性，保证默认值相同
 */
export default Behavior({
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
    size: {
      type: String,
      value: '',
    },
    range: {
      type: Array,
      value: [],
    },
    direction: {
      type: String,
      value: 'inline',
    },
    tagStyleType: {
      type: String,
      value: 'light',
    },
    tagStyleColor: {
      type: String,
      value: '#0052d9',
    },
    tagStyleSpace: {
      type: String,
      value: 'md',
    },
    tagStyleRadius: {
      type: null,
    },
    tagStyleWidth: {
      type: null,
    },
    tagStyleWidthType: {
      type: String,
      value: 'flex',
    },
    tagStyleWidthCols: {
      type: Number,
      value: 4,
    },
  },
});
