import { app, $app, $w } from '../app/weapps-api';
/*
* 可通过 app.state.xxx 访问这里定义的状态
* 
* 修改状态时，直接赋值即可。如：$app.state.xxx = 'xxx'
* 请注意：避免在页面处于后台状态时state，页面在后台时对全局state的修改会丢失！
*/


export default {
  name: 'LowCode'
}

/* 在这里定义页面变量。
*  页面变量区别于 state 的是：页面变量不会作响应处理，不可被绑定
*  
*  在 common 中使用的例子：import { data } from '../state'
*/
export const data = {

}


