import { app, $app } from '../../app/weapps-api';
import { $page, $w } from '../../pages/index/api';
/*
* 可通过 $page 获取或修改当前页面的 变量 状态 handler lifecycle 等信息
* 可通过 app 获取或修改全局应用的 变量 状态 等信息
* 具体可以 console.info 在编辑器Console面板查看更多信息
* 如果需要 async-await，请在方法前 async
*/
export default {
  onPageLoad(query) {
    //console.log('---------> LifeCycle onPageLoad', query)
  },
  onPageShow() {
    //console.log('---------> LifeCycle onPageShow')
  },
  onPageReady() {
    //console.log('---------> LifeCycle onPageReady')
  },
  onPageHide() {
    //console.log('---------> LifeCycle onPageHide')
  },
  onPageUnload() {
    //console.log('---------> LifeCycle onPageUnload')
  },
}