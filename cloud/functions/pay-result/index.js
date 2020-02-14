const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

// 云函数入口
exports.main = async function(event) {
  console.log(event);
  let res

  try {
    res = await cloud.callFunction({
      name: 'pay-v2',
      data: {
        type: 'payorder',
        data: {
          outTradeNo: event.outTradeNo
        }
      }
    })

   console.log(res)
 } catch (e) {
   console.log(e)
 }

 if (res.result && res.result.code === 0) {
   return {
    return_code: 'SUCCESS'
   }
 } else {
  return {
    return_code: 'FAIL'
   }
 }
}