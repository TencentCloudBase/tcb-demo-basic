// 云函数入口文件
const cloud = require("wx-server-sdk");
const fetch = require("node-fetch");
const config = require("./config");
cloud.init();

const { appId, appSecret } = config;

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();

  const { action } = event;

  let at_res = await fetch(
    `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`
  ).then(res => res.json());

  let access_token = at_res.access_token;

  let msgList = await fetch(
    `https://api.weixin.qq.com/customservice/msgrecord/getmsglist?access_token=${access_token}`,
    {
      method: "post",
      body: JSON.stringify({
        starttime: Math.floor((Date.now() - 24 * 3600 * 1000) / 1000),
        endtime: Math.floor(Date.now() / 1000),
        msgid: 1,
        number: 100
      }),
      headers: { "Content-Type": "application/json" }
    }
  ).then(d => d.json());

  let res = {};

  res.openIdList = msgList.recordlist.reduce((a, item) => {
    if (a.indexOf(item.openid) === -1) {
      a.push(item.openid);
    }
    return a;
  }, []);

  res.msgList = msgList.recordlist;

  return res;
};
