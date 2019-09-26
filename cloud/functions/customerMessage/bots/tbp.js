
const promise = require('bluebird')
const tencentcloud = require('tencentcloud-sdk-nodejs')

const { Credential } = tencentcloud.common
const { Client: TBPClient, Models } = tencentcloud.tbp.v20190311

promise.promisifyAll(TBPClient.prototype)

const TextProcessRequest = Models.TextProcessRequest
// const TextProcessResponse = Models.TextProcessResponse
const TextResetRequest = Models.TextResetRequest
// const TextResetResponse = Models.TextResetResponse
// const ResetRequest = Models.ResetRequest
// const ResetResponse = Models.ResetResponse
// const SlotInfo = Models.SlotInfo

const DialogStatus = {
  START: 'START',
  COUTINUE: 'COUTINUE',
  COMPLETE: 'COMPLETE',
}

class TBPBot {
  constructor(BotId, BotEnv, TerminalId) {
    this.BotId = BotId
    this.BotEnv = BotEnv
    this.TerminalId = TerminalId

    this.client = new TBPClient(new Credential(
      process.env.TENCENTCLOUD_SECRETID,
      process.env.TENCENTCLOUD_SECRETKEY,
      process.env.TENCENTCLOUD_SESSIONTOKEN
    ))
    
  }

  async textReset() {
    const params = new TextResetRequest()
    params.BotId = this.BotId
    params.BotEnv = this.BotEnv
    params.TerminalId = this.TerminalId
  
    const result = await this.client.TextResetAsync(params)
  
    return result
  }

  async textProcess(inputText) {
    const params = new TextProcessRequest()
    params.BotId = this.BotId
    params.BotEnv = this.BotEnv
    params.TerminalId = this.TerminalId
    params.InputText = inputText
    // params.SessionAttributes = ''
    const result = await this.client.TextProcessAsync(params)

    return result
  }
}

exports.DialogStatus = DialogStatus
exports.TBPBot = TBPBot
