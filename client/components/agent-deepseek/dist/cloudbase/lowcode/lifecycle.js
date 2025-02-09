import { getWedaAPI } from '@cloudbase/weda-client';
const app = new Proxy({}, { get: function(obj, prop){ return getWedaAPI()?.app?.[prop] }});
const $app = new Proxy({}, { get: function(obj, prop){ return app[prop] }});
const $w = new Proxy({}, { get: function(obj, prop){ return getWedaAPI()?.$w?.[prop] }});
export default {
  onAttached() {
    //console.log('---------> LifeCycle onAttached')
  },
  onDetached() {
    //console.log('---------> LifeCycle onDetached')
  },
}