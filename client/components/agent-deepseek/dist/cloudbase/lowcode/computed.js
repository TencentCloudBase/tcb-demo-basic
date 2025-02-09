import { getWedaAPI } from '@cloudbase/weda-client';
const app = new Proxy({}, { get: function(obj, prop){ return getWedaAPI()?.app?.[prop] }});
const $app = new Proxy({}, { get: function(obj, prop){ return app[prop] }});
const $w = new Proxy({}, { get: function(obj, prop){ return getWedaAPI()?.$w?.[prop] }});

/*
* 可通过 this.$WEAPPS_COMP.computed.xxx 访问这里定义的计算状态
* 
*/

export default {
  name() { return 'LowCode' }
}