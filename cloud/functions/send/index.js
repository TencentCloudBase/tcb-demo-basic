const cloud = require('wx-server-sdk');
cloud.init();

exports.main = async (event, context) => {
  try {
    await cloud.openapi.subscribeMessage.send({
      touser: event.userInfo.openId,
      page: 'pages/messsend/index',
      data: event.data,
      templateId: event.templateId
    });
  } catch (err) {
    console.log(err);
    return err;
  }
};