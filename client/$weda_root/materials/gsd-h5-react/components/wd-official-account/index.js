/*
 * @Date: 2023-04-18 19:14:40
 * @LastEditTime: 2023-04-20 15:14:35
 * @Description: 公众号关注组件
 */
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
  },
  methods: {},
  observers: {},
});
