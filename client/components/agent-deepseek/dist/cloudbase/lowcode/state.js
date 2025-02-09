import { getWedaAPI } from '@cloudbase/weda-client';
const app = new Proxy({}, { get: function(obj, prop){ return getWedaAPI()?.app?.[prop] }});
const $app = new Proxy({}, { get: function(obj, prop){ return app[prop] }});
const $w = new Proxy({}, { get: function(obj, prop){ return getWedaAPI()?.$w?.[prop] }});
/*
* 可通过 this.$WEAPPS_COMP.state.xxx 访问这里定义的状态
* 
* 修改状态时，直接赋值即可。如：this.$WEAPPS_COMP.state.xxx = 'xxx'
* 请注意：避免在页面处于后台状态时state，页面在后台时对全局state的修改会丢失！
*/



export default function() {
  return {
    name: 'LowCode'
  }
}

