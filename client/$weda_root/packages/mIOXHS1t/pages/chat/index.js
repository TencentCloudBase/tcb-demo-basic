import { observable } from 'mobx';
import { createPage, PAGE_ROOT_SYMBOL } from '../../../../common/weapp-page'
import { concatClassList, px2rpx } from '../../../../common/style'
import { app, $app } from '../../../../app/weapps-api'
import { $1 as handlers } from '../../app/handlers'
import lifecycle from '../../lowcode/chat/lifecycle'
const state = {}
const computed = {}
import { $page, $w } from './api'
import { widgetProps } from './data'





/** widget event listeners **/
const evtListeners = {"onicon1$tap": [
      {
          key: 'weox8avs8ib',
          sourceKey: 'chat:ai_bot_change_drawer_visibilty',
          handler: handlers.ai_bot_change_drawer_visibilty,
          args: {
  "params": [
    {
      "target": "1"
    }
  ]
},
          argsBinds: {}
        }
    ],"onimage1$tap": [
      {
          key: 'w75ea3mcxub',
          sourceKey: 'chat:ai_bot_change_detail_visibilty',
          handler: handlers.ai_bot_change_detail_visibilty,
          args: {
  "params": [
    {
      "target": "1"
    }
  ]
},
          argsBinds: {}
        }
    ],"ontext1$tap": [
      {
          key: 'wjse367q280',
          sourceKey: 'general-func:iife',
          handler: function({event, $w, params}) { return (
({event}) => {
    if($w.page.dataset.state.ai_bot_current_bot?._id) {
        $w.page.handler.ai_bot_change_detail_visibilty({data: { target: "1"}})
    }
}
)({event}) },
          args: {
  "params": [
    {}
  ]
},
          argsBinds: {}
        }
    ],"onicon2$tap": [
      {
          key: 'weox8avs8ib',
          sourceKey: 'general-func:iife',
          handler: function({event, $w, params}) { return (
({event}) => {
    if($w.page.dataset.state.ai_bot_current_bot?._id) {
        $w.page.handler.ai_bot_change_detail_visibilty({data: { target: "1"}})
    }
}
)({event}) },
          args: {
  "params": [
    {}
  ]
},
          argsBinds: {}
        }
    ],"onbutton2$tap": [
      {
          key: 'wlv4eu2pckd',
          sourceKey: 'chat:ai_bot_change_drawer_visibilty',
          handler: handlers.ai_bot_change_drawer_visibilty,
          args: {
  "params": [
    {
      "target": "1"
    }
  ]
},
          argsBinds: {}
        }
    ],"onbutton7$tap": [
      {
          key: 'wtkbxh2p040',
          sourceKey: 'general-func:iife',
          handler: function({event, $w, params}) { return (
({event}) => {
  $page.setParams({
    bot: 'ai_bot_chat'
  })
}
)({event}) },
          args: {
  "params": [
    {}
  ]
},
          argsBinds: {}
        }
    ],"onbutton8$tap": [
      {
          key: 'wbic1xwgs5j',
          sourceKey: 'platform:invoke',
          handler: function({data, $w}){ return $app.invoke({...data, component: $w[data?.component]?._widget});},
          args: {
  "params": [
    {
      "method": "open",
      "params": {
        "info": ""
      },
      "component": "modal1",
      "module": "gsd-h5-react"
    }
  ]
},
          argsBinds: {}
        }
    ],"onicon7$tap": [
      {
          key: 'wdModal2333',
          sourceKey: 'platform:invoke',
          handler: function({data, $w}){ return $app.invoke({...data, component: $w[data?.component]?._widget});},
          args: {
  "params": [
    {
      "method": "close",
      "params": {
        "info": "cancel"
      },
      "component": "modal1",
      "module": "gsd-h5-react"
    }
  ]
},
          argsBinds: {}
        }
    ],"onscrollView1$scrolltolower": [
      {
          key: 'wk16hrnqmtc',
          sourceKey: 'general-func:iife',
          handler: function({event, $w, params}) { return (
({event}) => {
  console.log('滚动到底')
  $w.page.dataset.state.ai_bot_ui_scroll_to_bottom = true
}
)({event}) },
          args: {
  "params": [
    {}
  ]
},
          argsBinds: {}
        }
    ],"onscrollView1$scroll": [
      {
          key: 'w3wu6xo0zn8',
          sourceKey: 'general-func:iife',
          handler: function({event, $w, params}) { return (
({event}) => {
  const scrollTop = event.detail.scrollTop;
  const scrollHeight = event.detail.scrollHeight;
  const scrollRatio = scrollTop / scrollHeight;

  // 获取上一次的滚动位置（如果存在）
  const previousScrollTop = $w.page.dataset.state.ai_bot_ui_scroll_top || 0;

  // 更新滚动位置和其他状态
  $w.page.dataset.state.ai_bot_ui_scroll_top = scrollTop
  $w.page.dataset.state.ai_bot_ui_scroll_height = scrollHeight
  $w.page.dataset.state.ai_bot_ui_scroll_ratio = scrollRatio

  // 判断是否滚动到顶部
  if (scrollTop === 0) {
    console.log('已滚动到顶部');
  }

  // 判断是否滚动到底部
  if (scrollTop  >= scrollHeight) {
    console.log('已滚动到底部');
  }

  // 判断是否向上滚动
  if (scrollTop + 50 < previousScrollTop + 10) {
    console.log('向上滚动 50 px以上');
    $w.page.dataset.state.ai_bot_ui_scroll_to_bottom = false
  }
}
)({event}) },
          args: {
  "params": [
    {}
  ]
},
          argsBinds: {}
        }
    ],"onbutton12$tap": [
      {
          key: 'wcpn131x20w',
          sourceKey: 'general-func:iife',
          handler: function({event, $w, params}) { return (
({event}) => {
  const i = $w.index_listView1 - 2
  const latstContent = $w.page.dataset.state.ai_bot_chat_history[i]?.content

  if (latstContent) {
    return $page.handler.ai_bot_resend_msg({
      data: {
        target: {
          content: latstContent
        }
      }
    })
  }
}
)({event}) },
          args: {
  "params": [
    {}
  ]
},
          argsBinds: {}
        }
    ],"onbutton9$tap": [
      {
          key: 'w8n3c5drhzq',
          sourceKey: 'platform:setClipboardData',
          handler: function({args}){ return $app.setClipboardData(...args)},
          args: {
  "params": [
    {}
  ]
},
          argsBinds: {'params.0.data': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      `消息id: ${$w.item_listView1._id || ''}
请求id: ${$w.item_listView1.trace_id || ''}
`
    )}}
        }
    ],"onbutton9$w8n3c5drhzq_success": [
      {
          key: 'wcpgtzvwo6r',
          sourceKey: 'platform:showToast',
          handler: function({args}){ return $app.showToast(...args)},
          args: {
  "params": [
    {
      "icon": "none",
      "title": "已成功复制相关错误定位信息",
      "duration": 1500
    }
  ]
},
          argsBinds: {}
        }
    ],"onbutton5$tap": [
      {
          key: 'w8n3c5drhzq',
          sourceKey: 'platform:setClipboardData',
          handler: function({args}){ return $app.setClipboardData(...args)},
          args: {
  "params": [
    {}
  ]
},
          argsBinds: {'params.0.data': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.item_listView1.content
    )}}
        }
    ],"onbutton5$w8n3c5drhzq_success": [
      {
          key: 'w3v5tsgcil6',
          sourceKey: 'platform:showToast',
          handler: function({args}){ return $app.showToast(...args)},
          args: {
  "params": [
    {
      "icon": "none",
      "title": "已成功复制聊天内容",
      "duration": 1500
    }
  ]
},
          argsBinds: {}
        }
    ],"onbutton4$tap": [
      {
          key: 'wquutsgf7na',
          sourceKey: 'general-func:iife',
          handler: function({event, $w, params}) { return (
({event}) => {
  const content = $w.item_listView1
  $w.textarea1.setValue({value: content})
  
  $w.page.handler.ai_bot_send_msg({data: {target: content}})
}
)({event}) },
          args: {
  "params": [
    {}
  ]
},
          argsBinds: {}
        }
    ],"onbutton13$tap": [
      {
          key: 'w6xpxym5a2f',
          sourceKey: 'general-func:iife',
          handler: function({event, $w, params}) { return (
({event}) => {
    $w.page.handler.ai_bot_stop_msg_output({})
}
)({event}) },
          args: {
  "params": [
    {}
  ]
},
          argsBinds: {}
        }
    ],"onbutton1$tap": [
      {
          key: 'wt3o96oiet9',
          sourceKey: 'chat:ai_bot_send_msg',
          handler: handlers.ai_bot_send_msg,
          args: {
  "params": [
    {}
  ]
},
          argsBinds: {'params.0.target': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.textarea1.value
    )}}
        }
    ],"onicon3$tap": [
      {
          key: 'w0hcjt9o60l',
          sourceKey: 'chat:ai_bot_change_drawer_visibilty',
          handler: handlers.ai_bot_change_drawer_visibilty,
          args: {
  "params": [
    {
      "target": "0"
    }
  ]
},
          argsBinds: {}
        }
    ],"onbutton10$tap": [
      {
          key: 'wfn6gi7hi0k',
          sourceKey: 'general-func:iife',
          handler: function({event, $w, params}) { return (
({event}) => {
   $page.setParams({
    search: $w.input1.value
   })
}
)({event}) },
          args: {
  "params": [
    {}
  ]
},
          argsBinds: {}
        }
    ],"oncontainer19$tap": [
      {
          key: 'wuzo19h45x1',
          sourceKey: 'chat:ai_bot_set_current_bot',
          handler: handlers.ai_bot_set_current_bot,
          args: {
  "params": [
    {}
  ]
},
          argsBinds: {'params.0.target': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.item_listView3
    )}}
        }
    ],"oncontainer19$wuzo19h45x1_success": [
      {
          key: 'wkdfw5r0tds',
          sourceKey: 'chat:ai_bot_change_drawer_visibilty',
          handler: handlers.ai_bot_change_drawer_visibilty,
          args: {
  "params": [
    {
      "target": "0"
    }
  ]
},
          argsBinds: {}
        }
    ],"oncontainer12$tap": [
      {
          key: 'wuzo19h45x1',
          sourceKey: 'chat:ai_bot_set_current_bot',
          handler: handlers.ai_bot_set_current_bot,
          args: {
  "params": [
    {}
  ]
},
          argsBinds: {'params.0.target': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.item_listView2
    )}}
        }
    ],"oncontainer12$wuzo19h45x1_success": [
      {
          key: 'wkdfw5r0tds',
          sourceKey: 'chat:ai_bot_change_drawer_visibilty',
          handler: handlers.ai_bot_change_drawer_visibilty,
          args: {
  "params": [
    {
      "target": "0"
    }
  ]
},
          argsBinds: {}
        }
    ],"onlistView2$onDataChange": [
      {
          key: '',
          sourceKey: ':',
          handler: ({event})=>{
      if(event.currentTarget) {
        $app.utils.set(event.currentTarget._scope, 'dataContext.data', event?.detail?.data);
        $app.utils.set(event.currentTarget._scope, 'dataContext.state', event?.detail?.state);
      }
    },
          args: {
  "params": [
    {}
  ]
},
          argsBinds: {}
        }
    ],"onicon4$tap": [
      {
          key: 'w0hcjt9o60l',
          sourceKey: 'chat:ai_bot_change_detail_visibilty',
          handler: handlers.ai_bot_change_detail_visibilty,
          args: {
  "params": [
    {
      "target": "0"
    }
  ]
},
          argsBinds: {}
        }
    ],"onbutton3$tap": [
      {
          key: 'w3uf165iqrl',
          sourceKey: 'chat:ai_bot_change_detail_visibilty',
          handler: handlers.ai_bot_change_detail_visibilty,
          args: {
  "params": [
    {
      "target": "0"
    }
  ]
},
          argsBinds: {}
        }
    ],}

const dataBinds = {
  [PAGE_ROOT_SYMBOL]: {
    'appShareMessage.title': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      `快来发现这个神奇的智能体应用，与AI互动，感受前沿技术的魅力！一起来玩转小程序吧！`
    )},'appShareMessage.params': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      [
  {
    "key": "bot",
    "value": $w.page.dataset.state.ai_bot_current_bot._id
  }
]
    )},'appShareMessage.imageUrl': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.page.dataset.state.ai_bot_avatar
    )}
  },
  menuLayout1: { 'classList': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      concatClassList(
$w.page.dataset.state.ai_bot_background ? 'ai-bot-chat__with-bg' : ''


, widgetProps.menuLayout1.classList)
    )},'style': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      {...widgetProps.menuLayout1.style, ...(
$w.page.dataset.state.ai_bot_background ? {
  backgroundImage: `url(${$w.page.dataset.state.ai_bot_background})`
} : {
  backgroundImage: 'linear-gradient(135deg, rgba(255,255,255, 0.2) 25%, rgba(255,255,255, 0.8) 75%), radial-gradient(ellipse at top left, var(--wd-color-brand-2), transparent 70%), radial-gradient(ellipse at top right, var(--wd-color-success-2), transparent 70%), radial-gradient(ellipse at bottom right, var(--wd-color-warning-2), transparent 70%), radial-gradient(ellipse at bottom left, var(--wd-color-brand-2), transparent 70%)'
}


)}
    )}
  },
  icon1: { '_waIf': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.page.dataset.params.showMenu === "1" && $w.page.dataset.state.ai_bot_current_bot?.show_sidebar !== false
    )}
  },
  image1: { 'src': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.page.dataset.state.ai_bot_current_bot.avatar
    )},'_waDisplay': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      !!$w.page.dataset.state.ai_bot_current_bot.avatar
    )},'style': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      ((display)=>{ const style = {...widgetProps.image1.style}; if(!display) {style.display = "none"}; return style })((
!!$w.page.dataset.state.ai_bot_current_bot.avatar
))
    )}
  },
  text1: { 'text': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.page.dataset.state.ai_bot_current_bot.name  || 'AI 智能体'
    )}
  },
  icon2: { '_waIf': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.page.dataset.state.ai_bot_current_bot?._id
    )}
  },
  container24: { '_waDisplay': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      !$w.page.dataset.state.ai_bot_current_bot?._id
    )},'style': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      ((display)=>{ const style = {...widgetProps.container24.style}; if(!display) {style.display = "none"}; return style })((
!$w.page.dataset.state.ai_bot_current_bot?._id
))
    )}
  },
  button11: { '_waDisplay': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      false
    )},'style': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      ((display)=>{ const style = {...widgetProps.button11.style}; if(!display) {style.display = "none"}; return style })((
false
))
    )}
  },
  scrollView1: { 'scrollTop': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.page.dataset.state.ai_bot_scroll_top
    )},'_waDisplay': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.page.dataset.state.ai_bot_current_bot?._id
    )},'style': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      ((display)=>{ const style = {...widgetProps.scrollView1.style}; if(!display) {style.display = "none"}; return style })((
$w.page.dataset.state.ai_bot_current_bot?._id
))
    )}
  },
  container9: { '_waIf': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.page.dataset.state.ai_bot_current_bot._id
    )}
  },
  repeater4: { 'data': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      [{
        role: 'assistant',
        type: 'welcome',
        content: $w.page.dataset.state.ai_bot_current_bot.welcome_message,
        bot: $w.page.dataset.state.ai_bot_current_bot._id,
      }, ...$w.page.dataset.state.ai_bot_chat_history.filter(item => item.bot === $w.page.dataset.state.ai_bot_current_bot._id)]
    )}
  },
  repeater4_item: { '_waFor': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      [{
        role: 'assistant',
        type: 'welcome',
        content: $w.page.dataset.state.ai_bot_current_bot.welcome_message,
        bot: $w.page.dataset.state.ai_bot_current_bot._id,
      }, ...$w.page.dataset.state.ai_bot_chat_history.filter(item => item.bot === $w.page.dataset.state.ai_bot_current_bot._id)]
    )}
  },
  container6: { '_waIf': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      !!$w.item_listView1.content
    )},'classList': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      concatClassList(
$w.item_listView1.role === 'user' ? 'ai-bot-chat__message-user' : 'ai-bot-chat__message-system'
, widgetProps.container6.classList)
    )}
  },
  richTextView1: { 'value': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
       ($w.page.dataset.state.ai_bot_md.render($w.item_listView1.content) || '') + 
  (($w.index_listView1 === $w.repeater4.data.length - 1 && ($w.item_listView1.role === 'assistant' && !$w.item_listView1.content && ['loading', 'sending'].includes($w.page.dataset.state.ai_bot_status))
 ) ? '$w.page.dataset.state.ai_bot_chat_history<span class="ai-bot-msg-curor"></span>' : '')
    )}
  },
  container27: { '_waIf': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.item_listView1.role === 'assistant' && $w.item_listView1.type !== 'welcome' 
    )}
  },
  button12: { '_waIf': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.item_listView1.status === 'timeout'
    )}
  },
  button9: { '_waIf': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.item_listView1.role === 'assistant' && $w.item_listView1.type !== 'welcome'
    )}
  },
  button5: { '_waIf': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.item_listView1.role === 'assistant' && $w.item_listView1.type !== 'welcome' 
    )}
  },
  container11: { '_waIf': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.index_listView1 === $w.repeater4.data.length - 1 
  && (($w.item_listView1.role === 'user' && ['loading', 'sending'].includes($w.page.dataset.state.ai_bot_status))
    || ($w.item_listView1.role === 'assistant' && !$w.item_listView1.content && ['loading', 'sending'].includes($w.page.dataset.state.ai_bot_status)))
    )}
  },
  repeater6: { 'data': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.page.dataset.state.ai_bot_recomand_questions.map(item => item.trim()).filter(item => !!item)
    )},'_waDisplay': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      ($w.page.dataset.state.ai_bot_status === 'idle')
    )},'style': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      ((display)=>{ const style = {...widgetProps.repeater6.style}; if(!display) {style.display = "none"}; return style })((
($w.page.dataset.state.ai_bot_status === 'idle')
))
    )}
  },
  repeater6_item: { '_waFor': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.page.dataset.state.ai_bot_recomand_questions.map(item => item.trim()).filter(item => !!item)
    )}
  },
  container17: { '_waDisplay': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      (
($w.page.dataset.state.ai_bot_status === 'idle')
) && (
true
)
    )},'style': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      ((display)=>{ const style = {...widgetProps.container17.style}; if(!display) {style.display = "none"}; return style })((
(
($w.page.dataset.state.ai_bot_status === 'idle')
) && (
true
)
))
    )}
  },
  button4: { 'text': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.item_listView1
    )}
  },
  container13: { '_waIf': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      ['initing'].includes($w.page.dataset.state.ai_bot_status)
    )}
  },
  container23: { '_waDisplay': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.page.dataset.params.showDetail !== '1' && $w.page.dataset.params.showDrawer !== '1'  && !!$w.page.dataset.state.ai_bot_current_bot?._id
    )},'style': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      ((display)=>{ const style = {...widgetProps.container23.style}; if(!display) {style.display = "none"}; return style })((
$w.page.dataset.params.showDetail !== '1' && $w.page.dataset.params.showDrawer !== '1'  && !!$w.page.dataset.state.ai_bot_current_bot?._id
))
    )}
  },
  button13: { '_waIf': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      (() => {
  const list = $w.page.dataset.state.ai_bot_chat_history
  const lastMsg = list[list?.length-1]
  return $w.page.dataset.state.ai_bot_status === 'loading' && lastMsg?.content?.length > 7 && lastMsg.role === 'assistant'
})()

    )}
  },
  textarea1: { '_waDisplay': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      true
    )},'style': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      ((display)=>{ const style = {...widgetProps.textarea1.style}; if(!display) {style.display = "none"}; return style })((
true
))
    )}
  },
  button1: { 'loading': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      ['loading', 'sending'].includes($w.page.dataset.state.ai_bot_status)
    )},'disabled': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      !($w.textarea1.value?.trim())?.length || ['loading', 'sending', 'initing'].includes($w.page.dataset.state.ai_bot_status)
    )}
  },
  container2: { 'style': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      {...widgetProps.container2.style, ...(
$w.page.dataset.params.showDrawer === '0' ? {
  left:  '-100vw'
} : { left: 0 }
)}
    )}
  },
  select1: { '_waDisplay': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      false
    )},'style': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      ((display)=>{ const style = {...widgetProps.select1.style}; if(!display) {style.display = "none"}; return style })((
false
))
    )}
  },
  container18: { '_waIf': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.select1.value === 'list'
    )}
  },
  button6: { '_waDisplay': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      false
    )},'style': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      ((display)=>{ const style = {...widgetProps.button6.style}; if(!display) {style.display = "none"}; return style })((
false
))
    )}
  },
  repeater1: { 'data': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.listView2.records
    )}
  },
  repeater1_item: { '_waFor': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.listView2.records
    )}
  },
  container19: { 'style': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      {...widgetProps.container19.style, ...(
$w.item_listView3._id === $w.page.dataset.state.ai_bot_current_bot._id ? {
  backgroundColor: 'var(--wd-color-brand-1)'
} : {
  backgroundColor: '#fff'
}
)}
    )}
  },
  image4: { 'src': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      `${$w.item_listView3.avatar}?imageMogr2/thumbnail/96x`
    )}
  },
  text7: { 'text': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.item_listView3.name
    )}
  },
  text10: { 'text': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.item_listView3.introduction
    )}
  },
  container4: { '_waIf': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.select1.value === 'card'
    )}
  },
  repeater3: { 'data': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.listView2.records
    )}
  },
  repeater3_item: { '_waFor': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.listView2.records
    )}
  },
  container12: { 'style': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      {...widgetProps.container12.style, ...(
// $w.item_listView2._id  === $w.page.dataset.state.ai_bot_current_bot._id ? {
//   backgroundColor: 'var(--wd-color-brand-1)'
// } : {
//   backgroundColor: '#fff'
// }
(() => {
  const map = {
    0: 'warning-1',
    1: 'success-1',
    2: 'brand-1'
  }
  const i = $w.index_listView2 % 3
  const key = map[i]
  return {
    backgroundColor: `var(--wd-color-${key})`
  }
})()
)}
    )}
  },
  image2: { 'src': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.item_listView2.avatar
    )}
  },
  text8: { 'text': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.item_listView2.name
    )}
  },
  text9: { 'text': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.item_listView2.introduction
    )}
  },
  listView2: { 'queryCondition': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      [
 {
  "$and": [
   {
    "$and": [
     {
      "enable": {
       "$eq": true
      }
     }
    ]
   },
   {
    "$or": [
     {
      "name": {
       "$search": $w.page.dataset.params.search
      }
     },
     {
      "introduction": {
       "$search": $w.page.dataset.params.search
      }
     }
    ]
   }
  ]
 }
]
    )}
  },
  container5: { 'style': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      {...widgetProps.container5.style, ...(
$w.page.dataset.params.showDetail === '0' ? {
  right: '-100vw'
} : {
  right: 0
}
)}
    )}
  },
  image3: { 'src': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.page.dataset.state.ai_bot_current_bot.avatar
    )}
  },
  text2: { 'text': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.page.dataset.state.ai_bot_current_bot.name
    )}
  },
  text4: { 'text': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.page.dataset.state.ai_bot_current_bot.introduction
    )}
  },
  tag1: { 'range': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.page.dataset.state.ai_bot_current_bot.tags.map(item => {
  return {
    label: item,
    value: item
  }
})
    )}
  },
  text18: { 'text': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.page.dataset.state.ai_bot_version
    )}
  },
}

const query = {
  query_ai_bot_agent_detail: { 
    ...({
  "id": "query_ai_bot_agent_detail",
  "name": "query_ai_bot_agent_detail",
  "type": "model",
  "trigger": "auto",
  "description": "",
  "data": {
    "params": [
      {
        "params": {
          "select": {
            "$master": true
          }
        },
        "methodName": "wedaGetItemV2",
        "dataSourceName": "ai_bot_agent_4vppq8k"
      }
    ]
  }
}),
    handler: (...args) => $app.cloud.callDataSource(...args),
    dataBinds: {'params.0.params.filter': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      {
 "where": {
  "$and": [
   {
    "$and": [
     {
      "_id": {
       "$eq": $w.page.dataset.params.bot || ''
      }
     }
    ]
   }
  ]
 },
 "relateWhere": {}
}
    )}},
    eventHandlers: {"onquery_ai_bot_agent_detail$success": [
      {
          key: 'whhb8nmwee6',
          sourceKey: 'platform:callNanoFlow',
          handler: function({data}){ return $w[data.id]?.trigger?.(data.data)},
          args: {
  "params": [
    {
      "id": "eventflow_post_query_agent_detail",
      "data": ""
    }
  ]
},
          argsBinds: {}
        }
    ],}
  },
  query_ai_bot_chat_history: { 
    ...({
  "id": "query_ai_bot_chat_history",
  "name": "query_ai_bot_chat_history",
  "type": "model",
  "trigger": "auto",
  "description": "",
  "data": {
    "params": [
      {
        "params": {
          "select": {
            "$master": true
          },
          "orderBy": [
            {
              "createdAt": "desc"
            }
          ],
          "getCount": true,
          "pageSize": 20
        },
        "methodName": "wedaGetRecordsV2",
        "dataSourceName": "ai_bot_chat_history_yhksihv"
      }
    ]
  }
}),
    handler: (...args) => $app.cloud.callDataSource(...args),
    dataBinds: {'params.0.params.filter': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      ({
 "where": {
  "$and": [
   {
    "$and": [
     {
      "bot": {
       "$eq": (() => { $w.page.handler.ai_bot_init({});return $w.page.dataset.state.ai_bot_current_bot._id })()
      }
     },
     {
      "conversation": {
       "$eq": $w.auth.currentUser.userId || undefined
      }
     }
    ]
   }
  ]
 },
 "relateWhere": {}
})
    )}},
    eventHandlers: {"onquery_ai_bot_chat_history$success": [
      {
          key: 'wu4iflk0bio',
          sourceKey: 'platform:callNanoFlow',
          handler: function({data}){ return $w[data.id]?.trigger?.(data.data)},
          args: {
  "params": [
    {
      "id": "eventflow_ai_bot_chat_history"
    }
  ]
},
          argsBinds: {}
        }
    ],}
  },
}

const eventFlows = [ { 
  ...({
  "id": "eventflow_ai_bot_chat_history"
}),
  eventHandlers: {"oneventflow_ai_bot_chat_history$eventflow_ai_bot_chat_history_start": [
      {
          key: 'w2ymgzab8e0',
          sourceKey: 'general-func:iife',
          handler: function({event, $w, params}) { return (
({ event }) => {
  const { data: { total, records } } = $w.query_ai_bot_chat_history
  // 未选中bot
  if (!$w.page.dataset.state.ai_bot_current_bot._id) {
    return
  }

  if (records[0]?.bot === $w.page.dataset.state.ai_bot_current_bot._id) {
    $w.page.dataset.state.ai_bot_chat_history = records.reverse()
  } else {
    $w.page.dataset.state.ai_bot_chat_history = []
  }

  // 推荐问题
  if ($w.page.dataset.state.ai_bot_recomand_questions?.length === 0 && $w.page.dataset.state.ai_bot_current_bot?.init_questions?.length > 0) {
    const initQuestions = $w.page.dataset.state.ai_bot_current_bot.init_questions;
    if (initQuestions.length > 3) {
      // 随机选择3个问题
      const randomQuestions = [];
      while (randomQuestions.length < 3) {
        const randomIndex = Math.floor(Math.random() * initQuestions.length);
        const question = initQuestions[randomIndex];
        if (!randomQuestions.includes(question)) {
          randomQuestions.push(question);
        }
      }
      $w.page.dataset.state.ai_bot_recomand_questions = randomQuestions;
    } else {
      $w.page.dataset.state.ai_bot_recomand_questions = initQuestions;
    }
  }
  // $w.page.dataset.state.ai_bot_recomand_questions = $w.page.dataset.state.ai_bot_current_bot.init_questions
  $w.page.dataset.state.ai_bot_status = 'idle';
  $w.page.handler.ai_bot_scroll_to_bottom({})
}
)({event}) },
          args: {
  "params": [
    {}
  ]
},
          argsBinds: {}
        }
    ],}
}, { 
  ...({
  "id": "eventflow_post_query_agent_detail"
}),
  eventHandlers: {"oneventflow_post_query_agent_detail$eventflow_post_query_agent_detail_start": [
      {
          key: 'wjcw6og9a26',
          sourceKey: 'chat:ai_bot_post_query_agent_detail_hook',
          handler: handlers.ai_bot_post_query_agent_detail_hook,
          args: {
  "params": [
    {}
  ]
},
          argsBinds: {}
        }
    ],}
},
]

const datasetProfile = {
  "state": {
    "ai_bot_avatar": {
      "name": "ai_bot_avatar",
      "label": "",
      "varType": "state",
      "dataType": "string",
      "initialValue": ""
    },
    "ai_bot_status": {
      "name": "ai_bot_status",
      "label": "",
      "varType": "state",
      "dataType": "string",
      "initialValue": "initing",
      "enableSyncLocal": false
    },
    "ai_bot_version": {
      "name": "ai_bot_version",
      "label": "",
      "varType": "state",
      "dataType": "string",
      "initialValue": "v0.1.4",
      "enableSyncLocal": false
    },
    "ai_bot_watcher": {
      "name": "ai_bot_watcher",
      "label": "用来存放实时监听的实例",
      "varType": "state",
      "dataType": "object",
      "initialValue": {},
      "enableSyncLocal": false
    },
    "ai_bot_background": {
      "name": "ai_bot_background",
      "label": "",
      "varType": "state",
      "dataType": "string",
      "initialValue": ""
    },
    "ai_bot_current_bot": {
      "name": "ai_bot_current_bot",
      "label": "",
      "varType": "state",
      "dataType": "object",
      "initialValue": {},
      "enableSyncLocal": false
    },
    "ai_bot_chat_history": {
      "name": "ai_bot_chat_history",
      "label": "",
      "varType": "state",
      "dataType": "array",
      "initialValue": [],
      "enableSyncLocal": false
    },
    "ai_bot_ui_scroll_top": {
      "name": "ai_bot_ui_scroll_top",
      "label": "",
      "varType": "state",
      "dataType": "number",
      "initialValue": 999,
      "enableSyncLocal": false
    },
    "ai_bot_last_msg_content": {
      "name": "ai_bot_last_msg_content",
      "label": "",
      "varType": "state",
      "dataType": "string",
      "initialValue": ""
    },
    "ai_bot_recomand_questions": {
      "name": "ai_bot_recomand_questions",
      "label": "",
      "varType": "state",
      "dataType": "array",
      "initialValue": [],
      "enableSyncLocal": false
    },
    "ai_bot_ui_scroll_to_bottom": {
      "name": "ai_bot_ui_scroll_to_bottom",
      "label": "",
      "varType": "state",
      "dataType": "boolean",
      "initialValue": false,
      "enableSyncLocal": false
    }
  },
  "params": {
    "bot": {
      "name": "bot",
      "varType": "params"
    },
    "debug": {
      "name": "debug",
      "varType": "params",
      "required": false,
      "initialValue": "0"
    },
    "search": {
      "name": "search",
      "varType": "params"
    },
    "showMenu": {
      "name": "showMenu",
      "varType": "params",
      "required": false,
      "initialValue": "1"
    },
    "useStream": {
      "name": "useStream",
      "varType": "params",
      "initialValue": "0"
    },
    "showDetail": {
      "name": "showDetail",
      "varType": "params",
      "initialValue": "0"
    },
    "showDrawer": {
      "name": "showDrawer",
      "varType": "params",
      "initialValue": "0"
    }
  }
}

createPage({
  app,
  pageContext: $page,
  id: 'chat',
  widgetProps,
  lifecycle,
  state,
  computed,
  evtListeners,
  dataBinds,
  handlers,
  query,
  eventFlows,
  pageAttributes: {"appShareMessage":{"enable":true,"pageId":"chat","packageName":""}},
  resetShare: true,
  datasetProfile
})
