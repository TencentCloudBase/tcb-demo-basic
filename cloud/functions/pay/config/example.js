const fs = require('fs');
const path = require('path');
const CERT_PATH = path.join(__dirname, './apiclient_cert.p12')

module.exports = {
  ENV: 'xxxxxx-xxxxxx', // TCB环境ID
  MCHID: 'xxxxxxxxx',//商户id
  KEY: 'xxxxxx',
  CERT_FILE_CONTENT: fs.existsSync(CERT_PATH) ? fs.readFileSync(CERT_PATH) : null,
  TIMEOUT: 10000 // 毫秒
};
