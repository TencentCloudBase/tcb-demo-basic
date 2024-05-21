// 必须优先初始化数据源
import '../datasources/index';
import { observable } from 'mobx'
import { createMpApp } from '@cloudbase/weda-client';
import { createComputed, formatEnum, enumOptions } from '../common/util'
import { generateDatasetQuery } from '../common/query'

import appGlobal from '../app/app-global'
import { default as cloudConfig } from '../datasources/config'
import { createDataset } from '../common/cloud-sdk'

import lodashGet from 'lodash.get';
import config from '../common/config';
import { watchAndSyncDatasetState2Local } from '../common/watch';



import state from '../lowcode/state'
import computed from '../lowcode/computed'
import common from './common'

const mainAppKey = '__weappsMainApp';
let GLOBAL_DATASET_SYNC_DISPOSES = [];





export const app = createGlboalApi()
export const $app = new Proxy({}, { get: function(obj, prop){ return app[prop] }});
export const $w = new Proxy(
  {},
  {
    get(_, prop) {
      return app.__internal__.$w?.[prop];
    },
  },
);

globalThis.__wedaGlobal__ = new Proxy({
  app,
  $w
}, {
  get(_, prop) {
    switch(prop) {
      case 'app':
      case '$app':
        return app
      case '$w':
        return $w
    }
    return undefined
  }
})

function createGlboalApi() {
  const mpApp = createMpApp({
    appConfig: {
      staticResourceDomain: config.domain,
      privatelink: cloudConfig.privatelink,
      ...({
  "id": "app-H7YuuKt5",
  "label": "AI 智能体主包",
  "envId": "tcb-advanced-a656fc",
  "envVersion": "production",
  "loginConfigVersion": "",
  "basename": "$weda_root",
  "pages": [
    {
      "id": "index",
      "type": ""
    }
  ]
})
    },
  });
  const globalAPI = Object.assign(mpApp, {
    domain: config.domain,
    pages: {},
    session: {
      //configure: sdk.configure,
      //request: sdk.request,
      //getSessionId: sdk.getSessionId,
    },
    state: observable(state),
    computed: createComputed(computed),
    common,
    ...mpApp,
    invoke(params) {
      const $page = globalAPI.utils.getCurrentPage();
      return $page.invokeComponentMethod(params)
    },
    // ... other sdk apis & apis from mp
  }) // The global api exposed to lowcode

  globalAPI.__internal__.enumOptions = enumOptions
  globalAPI.utils.formatEnum = formatEnum
  /**
   * @deprecated utils._getConfig
   */
  globalAPI.utils._getConfig = () => {
    return globalAPI.__internal__.getConfig()
  }

  let dataset = createDataset('$global', undefined, {
    appId: globalAPI.id
  })
  dataset.query = generateDatasetQuery({
  }, {
    $app: globalAPI,
    $w: globalAPI.__internal__.$w,
  })

  GLOBAL_DATASET_SYNC_DISPOSES.forEach((dispose) => {
    dispose?.();
  });
  GLOBAL_DATASET_SYNC_DISPOSES = [];
  globalAPI.dataset = dataset
  GLOBAL_DATASET_SYNC_DISPOSES = watchAndSyncDatasetState2Local(globalAPI.id, '$global', globalAPI.dataset.state);

  globalAPI.state.dataset = dataset
  globalAPI.setState = (userSetState) => {
    Object.keys(userSetState).forEach((keyPath) => {
      globalAPI.utils.set(globalAPI.dataset.state, keyPath, userSetState[keyPath]);
    });
  };

  const subPackageName = ''
  if (subPackageName) {
    // is sub app
    globalAPI.mainApp = appGlobal[mainAppKey]
    const mpApp = getApp()
    mpApp && (mpApp.subApp = globalAPI)
  } else {
    // is mainApp
    appGlobal[mainAppKey] = globalAPI
  }

  // # expose some sdk modules
  /* const sdkModsIncluded = ['flow', 'getPageOptions', 'getLaunchOptions']
  sdkModsIncluded.forEach(key => {
    globalAPI[key] = sdk[key]
  }) */

  return globalAPI
}
