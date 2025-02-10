export * as clientSDK from '@cloudbase/weda-client';

clientSDK.init({
  envID: 'tcb-advanced-a656fc', // 云开发环境Id
  appConfig: {
    staticResourceDomain: 'tcb-advanced-a656fc-1257967285.tcloudbaseapp.com', // 云开发环境下静态托管域名，用于使用素材资源
  }
})