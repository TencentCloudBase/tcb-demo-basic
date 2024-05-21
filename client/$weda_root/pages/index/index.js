import { observable } from 'mobx';
import { createPage, PAGE_ROOT_SYMBOL } from '../../common/weapp-page'
import { concatClassList, px2rpx } from '../../common/style'
import { app, $app } from '../../app/weapps-api'
import { $0 as handlers } from '../../app/handlers'
import lifecycle from '../../lowcode/index/lifecycle'
const state = {}
const computed = {}
import { $page, $w } from './api'
import { widgetProps } from './data'





/** widget event listeners **/
const evtListeners = {}

const dataBinds = {
  [PAGE_ROOT_SYMBOL]: {
    
  },
}

const query = {
}

const eventFlows = [
]

const datasetProfile = {
  "state": {}
}

createPage({
  app,
  pageContext: $page,
  id: 'index',
  widgetProps,
  lifecycle,
  state,
  computed,
  evtListeners,
  dataBinds,
  handlers,
  query,
  eventFlows,
  pageAttributes: {},
  resetShare: false,
  datasetProfile
})
