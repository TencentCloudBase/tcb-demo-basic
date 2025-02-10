import { getWedaAPI } from '@cloudbase/weda-client';
const app = new Proxy({}, { get: function(obj, prop){ return getWedaAPI()?.app?.[prop] }});
const $app = new Proxy({}, { get: function(obj, prop){ return app[prop] }});
const $w = new Proxy({}, { get: function(obj, prop){ return getWedaAPI()?.$w?.[prop] }});
/**
 * 
 * 可通过 $page 获取或修改当前页面的 变量 状态 handler lifecycle 等信息
 * 可通过 app 获取或修改全局应用的 变量 状态 等信息
 * 具体可以console.info 在编辑器Console面板查看更多信息
 * 注意：该方法仅在所属的页面有效
 * 如果需要 async-await，请修改成 export default async function() {}
 * 帮助文档 https://cloud.tencent.com/document/product/1301/57912
 **/

/**
 * @param {Object} event - 事件对象
 * @param {string} event.type - 事件名
 * @param {any} event.detail - 事件携带自定义数据
 *
 * @param {Object} data
 * @param {any} data.target - 获取事件传参的数据
 **/
export default function ({ event, data }) {
  const url = window.location
  try{
      const searchParams = url.search.slice(1).split('&').map(i => ({ [i.split('=')[0]]: i.split('=')[1] }))
  const searchParamsObj = {}
  searchParams.forEach(i => {
    Object.assign(searchParamsObj, i)
  })
  const question = searchParamsObj['q']
  if (question) {
    this.$WEAPPS_COMP.__internal__?.$w?.textarea1.setValue({
      value: decodeURIComponent(question)
    });
  }
  }catch(e){
    console.log(e,'参数解析失败')
  }

}