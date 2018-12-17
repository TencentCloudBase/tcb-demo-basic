const fs = require('fs');
const path = require('path');

module.exports = {
  ENV: 'xxxxxx-xxxxxx', // TCB环境ID
  MCHID: 'xxxxxxxxx',//商户id
  KEY: 'xxxxxx',
  //   CERT_FILE_CONTENT: fs.readFileSync(path.join(__dirname, './apiclient_cert.p12')),
  TIMEOUT: 10000 // 毫秒
};
