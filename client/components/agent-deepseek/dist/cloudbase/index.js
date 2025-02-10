import '../../index'
import { getWedaAPI, createComponent, concatClassList, px2rpx } from '@cloudbase/weda-client'
import lifeCycle from './lowcode/lifecycle'
import stateFn from './lowcode/state'
import computedFuncs from './lowcode/computed'

import _hanlderai_bot_scroll_to_bottom from './lowcode/handler/ai_bot_scroll_to_bottom' 
import _hanlderqueryRecommendQuestions from './lowcode/handler/queryRecommendQuestions' 
import _hanldergetQuestionFromUrl from './lowcode/handler/getQuestionFromUrl' 

const app = new Proxy({}, { get: function(obj, prop){ return getWedaAPI()?.app?.[prop] }});
const $app = new Proxy({}, { get: function(obj, prop){ return app[prop] }});

const handlers = {
  ai_bot_scroll_to_bottom: _hanlderai_bot_scroll_to_bottom, 
  queryRecommendQuestions: _hanlderqueryRecommendQuestions, 
  getQuestionFromUrl: _hanldergetQuestionFromUrl, 
}

const widgetProps = {
  "container22": {
    "style": {
      "top": "0px",
      "left": "0px",
      "width": "100vw",
      "height": "100vh",
      "overflow": "hidden",
      "position": "relative"
    },
    "classList": [
      "ai-bot-chat",
      "wa-comp-block-agent-ui"
    ],
    "_order": 0,
    "widgetType": "gsd-h5-react:Container"
  },
  "menuLayout1": {
    "style": {},
    "classList": [],
    "defaultOpened": true,
    "menu": {
      "menuData": []
    },
    "outerClickClosable": true,
    "template": "tab",
    "type": "tab",
    "_parentId": "container22",
    "_order": 0,
    "widgetType": "gsd-h5-react:WdMenuLayout"
  },
  "container19": {
    "style": {
      "margin": "0px",
      "display": "flex",
      "padding": "10px 40px",
      "textAlign": "center",
      "alignItems": "flex-start",
      "flexDirection": "row",
      "justifyContent": "space-between"
    },
    "classList": [],
    "data": {},
    "_parentId": "menuLayout1",
    "_order": 0,
    "widgetType": "gsd-h5-react:Container"
  },
  "image3": {
    "style": {
      "width": "100px",
      "height": "320px"
    },
    "classList": [],
    "_staticResourceAttribute": [
      "src"
    ],
    "alt": "[图片]",
    "fit": "widthFix",
    "src": "https://www.deepseek.com/_next/image?url=https%3A%2F%2Fcdn.deepseek.com%2Flogo.png&w=1920&q=75",
    "_parentId": "container19",
    "_order": 0,
    "widgetType": "gsd-h5-react:WdImage"
  },
  "text11": {
    "style": {
      "color": "rgb(54, 61, 97)",
      "opacity": 0.5
    },
    "classList": [],
    "inheritColor": true,
    "level": "body-sm",
    "maxLines": "1",
    "text": "云开发 DeepSeek 体验专区",
    "_parentId": "container19",
    "_order": 1,
    "widgetType": "gsd-h5-react:WdText"
  },
  "container3": {
    "style": {
      "height": "100%",
      "padding": "0px 0px 0px"
    },
    "classList": [],
    "data": {},
    "_parentId": "menuLayout1",
    "_order": 1,
    "widgetType": "gsd-h5-react:Container"
  },
  "container18": {
    "style": {
      "margin": "200px 0px 0px",
      "padding": "0px 40px",
      "textAlign": "center"
    },
    "classList": [],
    "data": {},
    "_parentId": "container3",
    "_order": 0,
    "widgetType": "gsd-h5-react:Container"
  },
  "image2": {
    "style": {
      "width": "200px",
      "height": "320px"
    },
    "classList": [],
    "_staticResourceAttribute": [
      "src"
    ],
    "alt": "[图片]",
    "fit": "widthFix",
    "src": "https://www.deepseek.com/_next/image?url=https%3A%2F%2Fcdn.deepseek.com%2Flogo.png&w=1920&q=75",
    "_parentId": "container18",
    "_order": 0,
    "widgetType": "gsd-h5-react:WdImage"
  },
  "text7": {
    "style": {
      "color": "#363D61"
    },
    "classList": [],
    "inheritColor": true,
    "level": "body-sm",
    "maxLines": "1",
    "text": "云开发 DeepSeek 体验专区",
    "_parentId": "container18",
    "_order": 1,
    "widgetType": "gsd-h5-react:WdText"
  },
  "text8": {
    "style": {
      "margin": "100px 0px 0px"
    },
    "classList": [],
    "inheritColor": true,
    "level": "title-7",
    "maxLines": "1",
    "text": "我是 DeepSeek，很高兴见到你！",
    "_parentId": "container18",
    "_order": 2,
    "widgetType": "gsd-h5-react:WdText"
  },
  "text10": {
    "style": {
      "fontWeight": 300
    },
    "classList": [],
    "inheritColor": true,
    "maxLines": "1",
    "text": "我可以帮你写代码、写作各种创意内容，请把你的任务交给我吧~",
    "_parentId": "container18",
    "_order": 3,
    "widgetType": "gsd-h5-react:WdText"
  },
  "scrollView1": {
    "style": {},
    "classList": [],
    "bounces": true,
    "enableBackToTop": false,
    "enableFlex": false,
    "enhanced": false,
    "fastDeceleration": false,
    "lowerThreshold": 50,
    "pagingEnabled": false,
    "refresherBackground": "#fff",
    "refresherDefaultStyle": "block",
    "refresherEnabled": false,
    "refresherThreshold": 50,
    "refresherTriggered": false,
    "scrollAnchoring": false,
    "scrollWithAnimation": false,
    "scrollX": false,
    "scrollY": true,
    "showScrollbar": false,
    "upperThreshold": 50,
    "_parentId": "container3",
    "_order": 1,
    "widgetType": "gsd-h5-react:ScrollView"
  },
  "container1": {
    "style": {
      "display": "flex",
      "padding": "20px 0px 0px",
      "alignItems": "center",
      "flexDirection": "column",
      "justifyContent": "center"
    },
    "classList": [],
    "data": {},
    "_parentId": "scrollView1",
    "_order": 0,
    "widgetType": "gsd-h5-react:Container"
  },
  "image1": {
    "style": {
      "width": "80px",
      "height": "80px",
      "borderRadius": "40px 40px"
    },
    "classList": [],
    "_staticResourceAttribute": [
      "src"
    ],
    "alt": "[图片]",
    "fit": "cover",
    "_parentId": "container1",
    "_order": 0,
    "widgetType": "gsd-h5-react:WdImage"
  },
  "text1": {
    "style": {
      "fontSize": "20px",
      "fontWeight": "bolder"
    },
    "classList": [],
    "inheritColor": true,
    "maxLines": "1",
    "_parentId": "container1",
    "_order": 1,
    "widgetType": "gsd-h5-react:WdText"
  },
  "container11": {
    "style": {
      "margin": "0px auto 0px",
      "padding": "0px 20px 20px",
      "maxWidth": "800px"
    },
    "classList": [],
    "data": {},
    "_parentId": "scrollView1",
    "_order": 1,
    "widgetType": "gsd-h5-react:Container"
  },
  "repeater1": {
    "style": {},
    "classList": [],
    "forIndex": "index_listView1",
    "forItem": "item_listView1",
    "key": "_id",
    "suffix": "listView1",
    "_parentId": "container11",
    "_order": 0,
    "widgetType": "gsd-h5-react:Repeater"
  },
  "repeater1_item": {
    "style": {},
    "classList": [],
    "_waForKey": "_id",
    "_parentId": "repeater1",
    "widgetType": "gsd-h5-react:RepeaterItem"
  },
  "container13": {
    "style": {},
    "classList": [],
    "data": {},
    "_parentId": "repeater1_item",
    "_order": 0,
    "widgetType": "gsd-h5-react:Container"
  },
  "container16": {
    "style": {
      "width": "auto",
      "position": "relative"
    },
    "classList": [],
    "data": {},
    "_parentId": "container13",
    "_order": 0,
    "widgetType": "gsd-h5-react:Container"
  },
  "card2": {
    "style": {},
    "classList": [
      "ai-bot-chat__think-card"
    ],
    "template": "collapse2",
    "_parentId": "container16",
    "_order": 0,
    "widgetType": "gsd-h5-react:WdCard"
  },
  "container12": {
    "style": {
      "width": "100%"
    },
    "classList": [],
    "data": {},
    "_parentId": "card2",
    "_order": 0,
    "widgetType": "gsd-h5-react:Container"
  },
  "text12": {
    "style": {
      "color": "rgb(96, 96, 96)",
      "fontSize": "14px",
      "fontWeight": "normal"
    },
    "classList": [],
    "level": "title-8",
    "maxLines": "1",
    "_parentId": "container12",
    "_order": 0,
    "widgetType": "gsd-h5-react:WdText"
  },
  "icon6": {
    "style": {
      "marginLeft": "0.5rem"
    },
    "classList": [],
    "size": "sm",
    "_parentId": "card2",
    "_order": 1,
    "widgetType": "gsd-h5-react:WdIcon"
  },
  "text13": {
    "style": {
      "color": "rgb(96, 96, 96)",
      "margin": "12px 0px 0px",
      "fontSize": "14px",
      "borderLeft": "2px solid #00000024",
      "fontWeight": "normal",
      "lineHeight": "165%",
      "paddingLeft": "8px"
    },
    "classList": [],
    "maxLines": "1",
    "tips": false,
    "userSelect": true,
    "_parentId": "card2",
    "_order": 0,
    "widgetType": "gsd-h5-react:WdText"
  },
  "text9": {
    "style": {
      "userSelect": "text"
    },
    "classList": [],
    "inheritColor": true,
    "maxLines": "1",
    "_parentId": "container16",
    "_order": 1,
    "widgetType": "gsd-h5-react:WdText"
  },
  "markdown1": {
    "style": {
      "padding": "0px"
    },
    "classList": [
      "agent_markdown"
    ],
    "_parentId": "container16",
    "_order": 2,
    "widgetType": "gsd-h5-react:WdMarkdown"
  },
  "card1": {
    "style": {
      "border": "unset",
      "cursor": "pointer",
      "margin": "10px 0px",
      "padding": "0px 0px 0px",
      "boxShadow": "unset",
      "borderRadius": "3px",
      "backgroundColor": "rgba(241, 242, 245, 1)"
    },
    "classList": [],
    "showDivider": false,
    "template": "collapse2",
    "_parentId": "container16",
    "_order": 3,
    "widgetType": "gsd-h5-react:WdCard"
  },
  "container9": {
    "style": {
      "width": "100%"
    },
    "classList": [],
    "data": {},
    "_parentId": "card1",
    "_order": 0,
    "widgetType": "gsd-h5-react:Container"
  },
  "container10": {
    "style": {
      "display": "flex",
      "alignItems": "center",
      "flexDirection": "row"
    },
    "classList": [],
    "data": {},
    "_parentId": "container9",
    "_order": 0,
    "widgetType": "gsd-h5-react:Container"
  },
  "icon15": {
    "style": {
      "margin": "0px 6px 0px 0px"
    },
    "classList": [],
    "_staticResourceAttribute": [
      "src"
    ],
    "size": "xs",
    "src": "https://cloudcache.tencent-cloud.com/qcloud/ui/static/static_source_business/134223d9-1cd5-4454-b6be-7fe7cb983285.svg",
    "type": "custom",
    "_parentId": "container10",
    "_order": 0,
    "widgetType": "gsd-h5-react:WdIcon"
  },
  "text5": {
    "style": {
      "color": "#13161B",
      "fontSize": "14px",
      "fontWeight": 500,
      "lineHeight": "20px"
    },
    "classList": [],
    "level": "title-8",
    "text": "基于以下文档作为参考",
    "userSelect": true,
    "_parentId": "container10",
    "_order": 1,
    "widgetType": "gsd-h5-react:WdText"
  },
  "icon5": {
    "style": {
      "marginLeft": "0.5rem"
    },
    "classList": [],
    "_staticResourceAttribute": [
      "src"
    ],
    "size": "xs",
    "_parentId": "card1",
    "_order": 1,
    "widgetType": "gsd-h5-react:WdIcon"
  },
  "repeater2": {
    "style": {},
    "classList": [],
    "forIndex": "index_repeater2",
    "forItem": "item_repeater2",
    "suffix": "repeater2",
    "_parentId": "card1",
    "_order": 0,
    "widgetType": "gsd-h5-react:Repeater"
  },
  "repeater2_item": {
    "style": {},
    "classList": [],
    "_parentId": "repeater2",
    "widgetType": "gsd-h5-react:RepeaterItem"
  },
  "unifiedLink1": {
    "style": {
      "display": "flex",
      "alignItems": "center",
      "flexDirection": "row",
      "justifyContent": "flex-start"
    },
    "classList": [],
    "params": {},
    "_parentId": "repeater2_item",
    "_order": 0,
    "widgetType": "gsd-h5-react:WdUnifiedLink"
  },
  "text20": {
    "style": {
      "color": "#000000B2",
      "fontSize": "14px",
      "fontWeight": 400,
      "lineHeight": "16.8px",
      "marginBottom": "12px",
      "textDecoration": "underline"
    },
    "classList": [],
    "level": "body-sm",
    "userSelect": true,
    "_parentId": "unifiedLink1",
    "_order": 0,
    "widgetType": "gsd-h5-react:WdText"
  },
  "container2": {
    "style": {
      "display": "flex",
      "alignItems": "center",
      "flexDirection": "row",
      "justifyContent": "space-between"
    },
    "classList": [],
    "data": {},
    "_parentId": "container16",
    "_order": 4,
    "widgetType": "gsd-h5-react:Container"
  },
  "container15": {
    "style": {
      "gap": "16px",
      "flex": 1,
      "display": "flex",
      "alignItems": "center",
      "flexDirection": "row",
      "justifyContent": "flex-start"
    },
    "classList": [],
    "data": {},
    "_parentId": "container2",
    "_order": 0,
    "widgetType": "gsd-h5-react:Container"
  },
  "container25": {
    "style": {
      "gap": "4px",
      "cursor": "pointer",
      "display": "flex",
      "alignItems": "center"
    },
    "classList": [],
    "data": {},
    "_parentId": "container15",
    "_order": 1,
    "widgetType": "gsd-h5-react:Container"
  },
  "container31": {
    "style": {
      "width": "24px",
      "cursor": "pointer",
      "height": "24px",
      "display": "flex",
      "alignItems": "center",
      "borderRadius": "12px",
      "justifyContent": "center"
    },
    "classList": [],
    "data": {},
    "_parentId": "container25",
    "_order": 0,
    "widgetType": "gsd-h5-react:Container"
  },
  "icon9": {
    "style": {},
    "classList": [],
    "_staticResourceAttribute": [
      "src"
    ],
    "name": "success",
    "size": "xs",
    "src": "https://cloudcache.tencent-cloud.com/qcloud/ui/static/static_source_business/0f3a2b30-9ed5-441d-af26-2d3ee3936a2c.svg",
    "type": "custom",
    "_parentId": "container31",
    "_order": 0,
    "widgetType": "gsd-h5-react:WdIcon"
  },
  "text15": {
    "style": {
      "fontSize": "14px"
    },
    "classList": [],
    "inheritColor": true,
    "maxLines": "1",
    "text": "复制",
    "_parentId": "container25",
    "_order": 1,
    "widgetType": "gsd-h5-react:WdText"
  },
  "container23": {
    "style": {
      "gap": "16px",
      "flex": 1,
      "display": "flex",
      "alignItems": "center",
      "flexDirection": "row",
      "justifyContent": "flex-end"
    },
    "classList": [],
    "data": {},
    "_parentId": "container2",
    "_order": 1,
    "widgetType": "gsd-h5-react:Container"
  },
  "repeater5": {
    "style": {},
    "classList": [],
    "forIndex": "index_listView1",
    "forItem": "item_listView1",
    "key": "_id",
    "suffix": "listView1",
    "_parentId": "container11",
    "_order": 1,
    "widgetType": "gsd-h5-react:Repeater"
  },
  "repeater5_item": {
    "style": {},
    "classList": [],
    "_waForKey": "_id",
    "_parentId": "repeater5",
    "widgetType": "gsd-h5-react:RepeaterItem"
  },
  "container26": {
    "style": {
      "paddingTop": "12px"
    },
    "classList": [],
    "data": {},
    "_parentId": "repeater5_item",
    "_order": 0,
    "widgetType": "gsd-h5-react:Container"
  },
  "container27": {
    "style": {
      "border": "1px solid #E9ECF1",
      "cursor": "pointer",
      "display": "inline-block",
      "padding": "4px 16px",
      "maxWidth": "100%",
      "borderRadius": "18px",
      "backgroundColor": "white"
    },
    "classList": [],
    "data": {},
    "_parentId": "container26",
    "_order": 0,
    "widgetType": "gsd-h5-react:Container"
  },
  "text19": {
    "style": {
      "color": "#000000B2",
      "fontSize": "14px",
      "maxWidth": "100%",
      "overflow": "hidden",
      "wordBreak": "break-all",
      "fontWeight": 400,
      "lineHeight": "26px",
      "whiteSpace": "nowrap",
      "textOverflow": "ellipsis"
    },
    "classList": [],
    "inheritColor": true,
    "maxLines": "1",
    "_parentId": "container27",
    "_order": 0,
    "widgetType": "gsd-h5-react:WdText"
  },
  "container28": {
    "style": {
      "width": "100%",
      "margin": "0 auto",
      "zIndex": 200,
      "maxWidth": "800px",
      "position": "relative"
    },
    "classList": [
      "ai-bot-chat__input-box"
    ],
    "data": {},
    "_parentId": "menuLayout1",
    "_order": 0,
    "widgetType": "gsd-h5-react:Container"
  },
  "textarea1": {
    "style": {},
    "classList": [
      "ai-bot-chat__textarea"
    ],
    "borderedH5": false,
    "cursorSpacing": 72,
    "focus": true,
    "label": "标题",
    "labelVisible": false,
    "maxLength": 1024,
    "name": "textarea1",
    "placeholder": "请将您遇到的问题告诉我",
    "requiredMsg": "该项为必填项",
    "status": "edit",
    "value": "",
    "_parentId": "container28",
    "_order": 0,
    "widgetType": "gsd-h5-react:WdTextarea"
  },
  "container8": {
    "style": {
      "left": "0",
      "width": "100%",
      "bottom": "28px",
      "height": "auto",
      "display": "flex",
      "padding": "0px calc(1rem + 12px)",
      "position": "absolute",
      "alignItems": "flex-end",
      "justifyContent": "space-between"
    },
    "classList": [],
    "data": {},
    "_parentId": "container28",
    "_order": 1,
    "widgetType": "gsd-h5-react:Container"
  },
  "container14": {
    "style": {
      "gap": "10px",
      "display": "flex",
      "alignItems": "center",
      "flexDirection": "row",
      "justifyContent": "center"
    },
    "classList": [],
    "data": {},
    "_parentId": "container8",
    "_order": 0,
    "widgetType": "gsd-h5-react:Container"
  },
  "container7": {
    "style": {
      "gap": "4px",
      "border": "1px solid #d2d2d2",
      "cursor": "pointer",
      "zIndex": 10,
      "display": "flex",
      "padding": "2px 8px",
      "alignItems": "center",
      "background": "#fff",
      "transition": "all 0.3s",
      "borderRadius": "999px"
    },
    "classList": [],
    "data": {},
    "_parentId": "container14",
    "_order": 0,
    "widgetType": "gsd-h5-react:Container"
  },
  "icon4": {
    "style": {},
    "classList": [],
    "_staticResourceAttribute": [
      "src"
    ],
    "name": "td:system-sum",
    "size": "xs",
    "_parentId": "container7",
    "_order": 0,
    "widgetType": "gsd-h5-react:WdIcon"
  },
  "text6": {
    "style": {
      "fontSize": "12px"
    },
    "classList": [],
    "inheritColor": true,
    "level": "body-sm",
    "maxLines": "1",
    "_parentId": "container7",
    "_order": 1,
    "widgetType": "gsd-h5-react:WdText"
  },
  "text18": {
    "style": {
      "opacity": 0.7,
      "fontSize": "12px"
    },
    "classList": [],
    "inheritColor": true,
    "maxLines": "1",
    "_parentId": "container14",
    "_order": 1,
    "widgetType": "gsd-h5-react:WdText"
  },
  "container17": {
    "style": {
      "gap": "12px",
      "display": "flex"
    },
    "classList": [],
    "data": {},
    "_parentId": "container8",
    "_order": 1,
    "widgetType": "gsd-h5-react:Container"
  },
  "icon1": {
    "style": {
      "cursor": "pointer"
    },
    "classList": [],
    "_staticResourceAttribute": [
      "src"
    ],
    "name": "td:clear",
    "_parentId": "container17",
    "_order": 0,
    "widgetType": "gsd-h5-react:WdIcon"
  },
  "icon12": {
    "style": {
      "cursor": "pointer"
    },
    "classList": [],
    "_staticResourceAttribute": [
      "src"
    ],
    "name": "success",
    "src": "https://cloudcache.tencent-cloud.com/qcloud/ui/static/static_source_business/571f3dac-cbbb-410a-bc1c-179488288059.svg",
    "type": "custom",
    "_parentId": "container17",
    "_order": 1,
    "widgetType": "gsd-h5-react:WdIcon"
  },
  "icon13": {
    "style": {
      "cursor": "not-allowed"
    },
    "classList": [],
    "_staticResourceAttribute": [
      "src"
    ],
    "name": "success",
    "src": "https://cloudcache.tencent-cloud.com/qcloud/ui/static/static_source_business/7b2d0ad1-790e-49d8-99cb-08c521eac17b.svg",
    "type": "custom",
    "_parentId": "container17",
    "_order": 2,
    "widgetType": "gsd-h5-react:WdIcon"
  },
  "icon14": {
    "style": {
      "cursor": "pointer"
    },
    "classList": [],
    "_staticResourceAttribute": [
      "src"
    ],
    "name": "success",
    "src": "https://cloudcache.tencent-cloud.com/qcloud/ui/static/static_source_business/3c33af5b-17ae-46ad-adaf-9a787b426082.svg",
    "type": "custom",
    "_parentId": "container17",
    "_order": 3,
    "widgetType": "gsd-h5-react:WdIcon"
  },
  "container4": {
    "style": {
      "zIndex": 300,
      "position": "relative",
      "textAlign": "center"
    },
    "classList": [],
    "data": {},
    "_parentId": "menuLayout1",
    "_order": 1,
    "widgetType": "gsd-h5-react:Container"
  },
  "unifiedLink2": {
    "style": {
      "margin": "0px",
      "padding": "0px"
    },
    "classList": [],
    "_parentId": "container4",
    "_order": 0,
    "widgetType": "gsd-h5-react:WdUnifiedLink"
  },
  "text3": {
    "style": {
      "color": "var(--wd-link-color-text)",
      "cursor": "pointer",
      "opacity": 0.5,
      "fontSize": "14px",
      "paddingTop": "5px",
      "paddingBottom": "10px",
      "textDecoration": "none"
    },
    "classList": [],
    "inheritColor": true,
    "maxLines": "1",
    "text": "Powered by 腾讯云开发",
    "_parentId": "unifiedLink2",
    "_order": 0,
    "widgetType": "gsd-h5-react:WdText"
  },
  "modal1": {
    "style": {},
    "classList": [],
    "closeType": [
      "mask"
    ],
    "defaultMaskShow": true,
    "defaultShow": false,
    "position": "center",
    "template": "default",
    "_parentId": "container22",
    "_order": 1,
    "widgetType": "gsd-h5-react:WdModal"
  },
  "text2": {
    "style": {
      "color": "rgba(0, 0, 0, 0.9)",
      "fontSize": "16px",
      "fontWeight": 600,
      "lineHeight": "24px"
    },
    "classList": [],
    "level": "title-7",
    "maxLines": "1",
    "text": "感谢您的宝贵反馈，我们会不断改进服务",
    "_parentId": "modal1",
    "_order": 0,
    "widgetType": "gsd-h5-react:WdText"
  },
  "icon3": {
    "style": {
      "cursor": "pointer"
    },
    "classList": [],
    "_staticResourceAttribute": [
      "src"
    ],
    "name": "success",
    "size": "xs",
    "src": "https://cloudcache.tencent-cloud.com/qcloud/ui/static/static_source_business/3f535fd9-84e1-4a6b-8f9f-8905d1f60b1b.svg",
    "type": "custom",
    "_parentId": "modal1",
    "_order": 1,
    "widgetType": "gsd-h5-react:WdIcon"
  },
  "rating1": {
    "style": {},
    "classList": [],
    "callbacks": {},
    "label": "评分",
    "labelAlign": "left",
    "layout": "horizontal",
    "name": "rating",
    "_parentId": "modal1",
    "_order": 0,
    "widgetType": "gsd-h5-react:WdRating"
  },
  "tagSelect1": {
    "style": {},
    "classList": [],
    "label": "回答内容",
    "layout": "vertical",
    "name": "tags",
    "requiredMsg": "该项为必填项",
    "size": "md",
    "status": "edit",
    "tagStyleColor": "rgba(0, 82, 217, 1)",
    "tagStyleType": "light",
    "tagStyleWidthCols": 4,
    "_parentId": "modal1",
    "_order": 1,
    "widgetType": "gsd-h5-react:WdTagSelect"
  },
  "textarea2": {
    "style": {},
    "classList": [],
    "label": "反馈建议",
    "layout": "vertical",
    "name": "comment",
    "placeholder": "请输入其他反馈建议",
    "requiredFlag": false,
    "requiredMsg": "该项为必填项",
    "status": "edit",
    "value": "",
    "_parentId": "modal1",
    "_order": 2,
    "widgetType": "gsd-h5-react:WdTextarea"
  },
  "container36": {
    "style": {
      "width": "100%",
      "display": "flex",
      "flexDirection": "row",
      "justifyContent": "flex-end"
    },
    "classList": [],
    "data": {},
    "_parentId": "modal1",
    "_order": 0,
    "widgetType": "gsd-h5-react:Container"
  },
  "button1": {
    "style": {
      "border": "1px solid rgba(220, 220, 220, 1)",
      "height": "32px",
      "padding": "5px 16px 5px 16px",
      "minHeight": "unset",
      "marginRight": "8px",
      "borderRadius": "4px"
    },
    "classList": [],
    "icon": "success",
    "size": "lg",
    "text": "取消",
    "variant": "outline",
    "_parentId": "container36",
    "_order": 0,
    "widgetType": "gsd-h5-react:WdButton"
  },
  "button4": {
    "style": {
      "height": "32px",
      "padding": "5px 16px 5px 16px",
      "minHeight": "unset",
      "marginRight": "0px",
      "borderRadius": "3px",
      "backgroundColor": "rgba(0, 82, 217, 1)"
    },
    "classList": [],
    "icon": "success",
    "size": "lg",
    "text": "提交反馈",
    "_parentId": "container36",
    "_order": 1,
    "widgetType": "gsd-h5-react:WdButton"
  }
}





const evtListeners = {"onscrollView1$scrolltolower": [
      {
          key: 'wk16hrnqmtc',
          sourceKey: 'general-func:iife',
          handler: function({event, $w, params}) { const $comp = $w.$comp; return (
({event}) => {
  $comp.dataset.state.ai_bot_ui_scroll_to_bottom = true
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
          handler: function({event, $w, params}) { const $comp = $w.$comp; return (
({event}) => {
  const scrollTop = event.detail.scrollTop;
  const scrollHeight = event.detail.scrollHeight;
  const scrollRatio = scrollTop / scrollHeight;

  // 获取上一次的滚动位置（如果存在）
  const previousScrollTop = $comp.dataset.state.ai_bot_ui_scroll_top || 0;

  // 更新滚动位置和其他状态
  $comp.dataset.state.ai_bot_ui_scroll_top = scrollTop
  $comp.dataset.state.ai_bot_ui_scroll_height = scrollHeight
  $comp.dataset.state.ai_bot_ui_scroll_ratio = scrollRatio

  // 判断是否滚动到顶部
  if (scrollTop === 0) {
    // console.log('已滚动到顶部');
  }

  // 判断是否滚动到底部
  if (scrollTop  >= scrollHeight) {
    // console.log('已滚动到底部');
  }

  // 判断是否向上滚动
  if (scrollTop + 50 < previousScrollTop + 10) {
    // console.log('向上滚动 50 px以上');
    $comp.dataset.state.ai_bot_ui_scroll_to_bottom = false
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
    ],"onicon6$tap": [
      {
          key: '',
          sourceKey: 'platform:invoke',
          handler: function({data, $w}){
                const func = $w[data?.component]?.[data.method];
                if (typeof func !== 'function') {
                  throw new Error(`调用方法失败：未找到id为${data.component}下的方法${data.method}`);
                }
                return func(data.params);
              },
          args: {
  "params": [
    {
      "component": "card2",
      "method": "dealContentState",
      "params": {}
    }
  ]
},
          argsBinds: {'params.0.params.state': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.card2.contentState === `show` ? `hide` : `show`
    )}}
        }
    ],"oncontainer10$tap": [
      {
          key: 'w0gpll936se',
          sourceKey: 'general-func:iife',
          handler: function({event, $w, params}) { const $comp = $w.$comp; return (
({event}) => {
  $w.card1.dealContentState($w.card1.contentState === `show` ? `hide` : `show`)
}
)({event}) },
          args: {
  "params": [
    {}
  ]
},
          argsBinds: {}
        }
    ],"onicon5$tap": [
      {
          key: '',
          sourceKey: 'platform:invoke',
          handler: function({data, $w}){
                const func = $w[data?.component]?.[data.method];
                if (typeof func !== 'function') {
                  throw new Error(`调用方法失败：未找到id为${data.component}下的方法${data.method}`);
                }
                return func(data.params);
              },
          args: {
  "params": [
    {
      "component": "card1",
      "method": "dealContentState",
      "params": {}
    }
  ]
},
          argsBinds: {'params.0.params.state': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.card1.contentState === `show` ? `hide` : `show`
    )}}
        }
    ],"oncontainer25$tap": [
      {
          key: 'wut8yq2dti4',
          sourceKey: 'platform:setClipboardData',
          handler: function({args}){ return $app.setClipboardData(...args)},
          args: {
  "params": [
    {}
  ]
},
          argsBinds: {'params.0.data': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      `${$w.item_listView1.content}

${JSON.parse($w.item_listView1.refs || '[]').filter(item => item.url).map((item, index) => {
  return `${index === 0 ? '回答基于以下参考文档\n' : ''}${[index + 1]}. [${item.title}](${item.url})`;
}).join('\n')}

以上回答由 AI 完成（基于微信云开发 AI 智能体）
`
    )}}
        }
    ],"oncontainer25$wut8yq2dti4_success": [
      {
          key: 'wke2wzs8uug',
          sourceKey: 'platform:showToast',
          handler: function({args}){ return $app.showToast(...args)},
          args: {
  "params": [
    {
      "duration": 3000,
      "icon": "none",
      "title": "已成功复制聊天内容"
    }
  ]
},
          argsBinds: {}
        }
    ],"oncontainer27$tap": [
      {
          key: 'wohl1yvtt3j',
          sourceKey: 'general-func:iife',
          handler: function({event, $w, params}) { const $comp = $w.$comp; return (
({ event }) => {
  const content = $w.item_listView1
  $comp.dataset.state.chatRecords =[...$comp.dataset.state.chatRecords,
    {
      "role": "user",
      "type": "text",
      "content": content,
      "bot": $comp.dataset.state.botInfo.botId
    }]
  $w.sendMessage.trigger(content)
}
)({event}) },
          args: {
  "params": [
    {}
  ]
},
          argsBinds: {}
        }
    ],"oncontainer7$tap": [
      {
          key: 'w1tz93x0esa',
          sourceKey: 'general-func:iife',
          handler: function({event, $w, params}) { const $comp = $w.$comp; return (
({event}) => {
  $comp.dataset.state.enableReason = !$comp.dataset.state.enableReason
}
)({event}) },
          args: {
  "params": [
    {}
  ]
},
          argsBinds: {}
        }
    ],"onicon1$tap": [
      {
          key: 'whqz3p3qpee',
          sourceKey: 'general-func:iife',
          handler: function({event, $w, params}) { const $comp = $w.$comp; return (
({event}) => {
  $comp.dataset.state.chatRecords = []
}
)({event}) },
          args: {
  "params": [
    {}
  ]
},
          argsBinds: {}
        }
    ],"onicon12$tap": [
      {
          key: 'wuvqtrd69gn',
          sourceKey: 'general-func:iife',
          handler: function({event, $w, params}) { const $comp = $w.$comp; return (
({event}) => {
  $comp.dataset.state.chatRecords = [...($comp.dataset.state.chatRecords || []),
  {
    "role": "user",
    "type": "text",
    "content": $w.textarea1.value,
    "bot": $comp.dataset.state.botInfo.botId
  }]
}
)({event}) },
          args: {
  "params": [
    {}
  ]
},
          argsBinds: {}
        }
    ],"onicon12$wuvqtrd69gn_success": [
      {
          key: 'wno4vtv08b5',
          sourceKey: 'platform:callQuery',
          handler: function({data, $w}){ return $w[data.id]?.[data.method](data.data)},
          args: {
  "params": [
    {
      "id": "sendMessage",
      "method": "trigger"
    }
  ]
},
          argsBinds: {}
        }
    ],"onicon14$tap": [
      {
          key: 'wearjyguv3x',
          sourceKey: 'general-func:iife',
          handler: function({event, $w, params}) { const $comp = $w.$comp; return (
({event}) => {
  $comp.dataset.state.chatStatus = 0
}
)({event}) },
          args: {
  "params": [
    {}
  ]
},
          argsBinds: {}
        }
    ],"onicon3$tap": [
      {
          key: 'wdModal500',
          sourceKey: 'platform:invoke',
          handler: function({data, $w}){
                const func = $w[data?.component]?.[data.method];
                if (typeof func !== 'function') {
                  throw new Error(`调用方法失败：未找到id为${data.component}下的方法${data.method}`);
                }
                return func(data.params);
              },
          args: {
  "params": [
    {
      "component": "modal1",
      "method": "close",
      "params": {
        "info": "icon"
      }
    }
  ]
},
          argsBinds: {}
        }
    ],"onbutton1$tap": [
      {
          key: 'wnrd0l79xxa',
          sourceKey: 'platform:invoke',
          handler: function({data, $w}){
                const func = $w[data?.component]?.[data.method];
                if (typeof func !== 'function') {
                  throw new Error(`调用方法失败：未找到id为${data.component}下的方法${data.method}`);
                }
                return func(data.params);
              },
          args: {
  "params": [
    {
      "component": "modal1",
      "method": "close",
      "params": {
        "info": ""
      }
    }
  ]
},
          argsBinds: {}
        }
    ],"onbutton4$tap": [
      {
          key: 'wscsodi8evw',
          sourceKey: 'platform:callQuery',
          handler: function({data, $w}){ return $w[data.id]?.[data.method](data.data)},
          args: {
  "params": [
    {
      "id": "submitFeedback",
      "method": "trigger"
    }
  ]
},
          argsBinds: {}
        }
    ],"onbutton4$wscsodi8evw_success": [
      {
          key: 'wjrvxp2k7vf',
          sourceKey: 'platform:showToast',
          handler: function({args}){ return $app.showToast(...args)},
          args: {
  "params": [
    {
      "duration": 1500,
      "icon": "success",
      "title": "反馈成功"
    }
  ]
},
          argsBinds: {}
        },{
          key: 'wj2iphgbkyn',
          sourceKey: 'platform:invoke',
          handler: function({data, $w}){
                const func = $w[data?.component]?.[data.method];
                if (typeof func !== 'function') {
                  throw new Error(`调用方法失败：未找到id为${data.component}下的方法${data.method}`);
                }
                return func(data.params);
              },
          args: {
  "params": [
    {
      "component": "modal1",
      "method": "close",
      "params": {}
    }
  ]
},
          argsBinds: {}
        }
    ],}

const behaviors = []

const properties = {
  "bot": {
    type: Object,
    
  },
  "llmConfig": {
    type: Object,
    
  },
}

const events = [
]



const dataBinds = {
  container22: { 'data': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      Object.assign({}, $comp.props.data)
    )}
  },
  menuLayout1: { 'style': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      {...widgetProps.menuLayout1.style, ...(
({
  backgroundImage: 'url(https://cloudcache.tencent-cloud.com/qcloud/ui/static/static_source_business/1165b9cc-50b7-4ca4-970e-428de8c3a6fb.png)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% auto',
  backgroundPosition: '0px -56px',
})
)}
    )}
  },
  container19: { '_waIf': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      !!$comp.dataset.state.chatRecords?.length
    )}
  },
  container18: { '_waIf': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      !$comp.dataset.state.chatRecords?.length
    )}
  },
  scrollView1: { 'scrollTop': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $comp.dataset.state.ai_bot_scroll_top
    )}
  },
  image1: { 'src': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $comp.dataset.state.botInfo?.avatar
    )}
  },
  text1: { 'text': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $comp.dataset.state.botInfo?.name
    )}
  },
  repeater1: { 'data': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $comp.dataset.state.chatRecords
    )}
  },
  repeater1_item: { '_waFor': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $comp.dataset.state.chatRecords
    )}
  },
  container13: { 'classList': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      concatClassList(
$w.item_listView1.role === 'user' ? 'ai-bot-chat__message-container-user' : 'ai-bot-chat__message-container-system'
, widgetProps.container13.classList)
    )},'style': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      {...widgetProps.container13.style, ...(
$w.item_listView1.role === 'user' ? {
  display: 'flex',
  justifyContent: 'flex-end'
} : {}
)}
    )}
  },
  container16: { '_waDisplay': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      !! $w.item_listView1.content
|| $w.item_listView1.reasoningContent
    )},'classList': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      concatClassList(
$w.item_listView1.role === 'user' ? 'ai-bot-chat__message-user' : 'ai-bot-chat__message-system'
, widgetProps.container16.classList)
    )},'style': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      ((display)=>{ const style = {...widgetProps.container16.style}; if(!display) {style.display = "none"}; return style })((
!! $w.item_listView1.content
|| $w.item_listView1.reasoningContent
))
    )}
  },
  card2: { '_waDisplay': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      !!$w.item_listView1.reasoningContent
    )},'style': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      ((display)=>{ const style = {...widgetProps.card2.style}; if(!display) {style.display = "none"}; return style })((
!!$w.item_listView1.reasoningContent
))
    )}
  },
  text12: { 'text': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.item_listView1.reasoningStatus === 2 ? `已深度思考（用时 ${$w.item_listView1.reasoningDuration} 秒）` : '思考中...'
    )}
  },
  icon6: { 'name': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.card2.contentState === `show` ? `chevronup` : `chevrondown`
    )}
  },
  text13: { 'text': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.item_listView1.reasoningContent
    )},'_waDisplay': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      !!$w.item_listView1.reasoningContent
    )},'style': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      ((display)=>{ const style = {...widgetProps.text13.style}; if(!display) {style.display = "none"}; return style })((
!!$w.item_listView1.reasoningContent
))
    )}
  },
  text9: { 'text': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.item_listView1.content
    )},'_waIf': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.item_listView1.role==='user'
    )}
  },
  markdown1: { 'options': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      {
  html:         false,        // 在源码中启用 HTML 标签
  xhtmlOut:     false,        // 使用 / 来闭合单标签 （比如 <br />）。
                              // 这个选项只对完全的 CommonMark 模式兼容。
  breaks:       false,        // 转换段落里的 换行符 到 <br>。
  langPrefix:   'language-',  // 给围栏代码块的 CSS 语言前缀。对于额外的高亮代码非常有用。
  linkify:      false,        // 将类似 URL 的文本自动转换为链接。

  // 启用一些语言中立的替换 + 引号美化
  typographer:  false,

  // 双 + 单引号替换对，当 typographer 启用时。
  // 或者智能引号等，可以是 String 或 Array。
  //
  // 比方说，你可以支持 '«»„“' 给俄罗斯人使用， '„“‚‘'  给德国人使用。
  quotes: '“”‘’',

}

    )},'value': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.item_listView1.content
    )},'_waIf': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.item_listView1.role!='user'
    )}
  },
  card1: { 'showContent': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      !($w.wedaContext.platforms.includes('MOBILEWEB') || $w.wedaContext.platforms.includes('MP'))
    )},'_waIf': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      ($w.item_listView1.knowledgeBase||[]).length
    )}
  },
  icon5: { 'name': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.card1.contentState === `show` ? `chevronup` : `chevrondown`
    )}
  },
  repeater2: { 'data': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.item_listView1.knowledgeBase||[]
    )}
  },
  repeater2_item: { '_waFor': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.item_listView1.knowledgeBase||[]
    )}
  },
  unifiedLink1: { 'options': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      ({
  target: '_blank'
  /**
   * 支持web端打开新窗口
   * 例如：
   * target:'_blank'
   */

  /**
   * 支持小程序端传递扩展参数
   * 例如打开其他小程序场景：
   * env_version:'develop'
   */

})
    )},'url': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.item_repeater2.url
    )}
  },
  text20: { 'text': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      `[${$w.index_repeater2 + 1}] ${$w.item_repeater2.title}`
    )}
  },
  container2: { '_waIf': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.item_listView1.role === 'assistant' && !($w.item_listView1.btnGroupShow === 'hidden')
    )}
  },
  container23: { '_waIf': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      !$w.container22.data.isPreview
    )}
  },
  repeater5: { 'data': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $comp.dataset.state.recommendQuestions.filter(item=>!!item)
    )}
  },
  repeater5_item: { '_waFor': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $comp.dataset.state.recommendQuestions.filter(item=>!!item)
    )}
  },
  text19: { 'text': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.item_listView1
    )}
  },
  container7: { '_waDisplay': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      !!$w.container22.data.llmConfig.reasonModel
    )},'style': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      ((display)=>{ const style = {...widgetProps.container7.style, ...(
$comp.dataset.state.enableReason
? {
  background: '#d0e5fe',
  borderColor: 'rgba(85,153,255,0.7)',
  color: '#0056d4'
}
: {
    borderColor: '#d2d2d2'
}
)}; if(!display) {style.display = "none"}; return style })((()=>{const $for = forItems; const $index=lists?.[0]?.currentIndex;
 return (
!!$w.container22.data.llmConfig.reasonModel
)})())
    )}
  },
  text6: { 'text': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      "深度思考" + ($w.container22.data.llmConfig.reasonModelText ? ` (${$w.container22.data.llmConfig.reasonModelText})` : '')
    )}
  },
  text18: { 'level': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      "body-sm"
    )},'text': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      `使用 ${$comp.dataset.state.enableReason ? 'DeepSeek-R1-671B' : 'DeepSeek-V3-671B'}`
    )}
  },
  icon12: { '_waIf': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      !!$w.textarea1.value && ($comp.dataset.state.chatStatus === 0 || $comp.dataset.state.chatStatus === undefined)
    )}
  },
  icon13: { '_waIf': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $comp.dataset.state.chatStatus===1||(!$w.textarea1.value&&$comp.dataset.state.chatStatus!=2)
    )}
  },
  icon14: { '_waIf': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $comp.dataset.state.chatStatus===2
    )}
  },
  container4: { 'style': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      {...widgetProps.container4.style, ...(
({
  marginTop: '-20px'
})
)}
    )}
  },
  unifiedLink2: { 'options': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      ({
  target: '_blank'
})
    )},'url': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      "https://docs.cloudbase.net/ai/introduce"
    )}
  },
  rating1: { 'value': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.modal1.openInfo.type === 'downvote' ? 1 : 5
    )},'callbacks.tooltip': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      props => {
  // return props.value + '分';
  return props.value;
}
    )}
  },
  tagSelect1: { 'range': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      ($w.modal1.openInfo.type === 'upvote' ? ['准确有效', '回答全面', '立场正确', '格式规范', '专业性强', '富有创意', '表达清晰', '值得信赖', '高效', '满意'] : ['理解错误', '未识别问题', '事实错误', '推理错误', '内容不完整', '不专业', '违法有害', '格式错误', '乱码', '内容重复']).map(item => {
  return {
    lable: item,
    value: item
  };
})
    )},'value': ($comp, lists, forItems, event, $context, $w) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      []
    )}
  },
}

const query = {
  sendMessage: { 
    ...({
  "id": "sendMessage",
  "name": "sendMessage",
  "type": "general-func",
  "trigger": "manual",
  "description": "",
  "data": {
    "params": [
      {}
    ]
  }
}),
    handler: (__data__,__params__,$comp,$w) => (
async ({
  params
}) => {
  // 获取输入框消息，params是外面传进来的，不传就使用输入框的值
  const message = params || $w.textarea1.value; // 清空输入框

  $w.textarea1.setValue({
    value: ''
  }); // 清空建议问题

  $comp.dataset.state.recommendQuestions = []; // 修改聊天状态

  $comp.dataset.state.chatStatus = 1; // 手动插入一回复消息，后面的返回都使用这条消息来实现打字机效果

  $comp.dataset.state.chatRecords = [...$comp.dataset.state.chatRecords, {
    role: "assistant",
    content: "请稍等，正在卖力思考中🤔...",
    btnGroupShow: 'hidden',
    botId: $comp.dataset.state.botInfo?.botId
  }]; // 滚动到底部

  if ($comp.dataset.state.ai_bot_ui_scroll_to_bottom) {
    $comp.handler.ai_bot_scroll_to_bottom({});
  } // 如果是智能体预览状态，走预览接口


  // const isPreview = $w.container22.data?.isPreview;
  const { isPreview, bot = {}, llmConfig } = $w.container22?.data || {};
  const record = $comp.dataset.state.chatRecords[$comp.dataset.state.chatRecords.length - 1]; // 请求参数

  const sendMessage = () => {
    if (llmConfig) {
      return  $w.ai.LLM.chat({
        provider: llmConfig.provider, 
        model: $comp.dataset.state.enableReason ? llmConfig.reasonModel : llmConfig.model, 
        temperature: llmConfig.temperature ?? 1, 
        top_p: llmConfig.top_p ?? 1,
        messages: $comp.dataset.state.chatRecords.slice(0, -1),
        stream: true,
      });
    } else {
      return isPreview
        ? $w.app.ai.bot.getPreview({
            name: bot.name,
            introduction: bot.introduction,
            agentSetting: bot.agentSetting,
            msg: message,
            knowledgeBase: bot.knowledgeBase
          })
        : $w.app.ai.bot.sendMessage({
          botId: $comp.dataset.state.botInfo?.botId,
          msg: message,
          history: $comp.dataset.state.chatRecords
        });
    }
  }

  const res = await sendMessage();
  let result = '';
  let reasoningResult = ''
  $comp.dataset.state.chatStatus = 2;

  /**
   * record.reasoningStatus 0 未思考 1 思考中 2 已思考
   */
  const reasoningStartTime = Date.now();
  record.reasoningStatus = 0;
  for await (let json of res.eventStream) {
    if (llmConfig) {
      const content = json.choices.reduce((acc, item) => acc += item.delta.content || '', '');
      const reasoningContent = json.choices.reduce((acc, item) => acc += item.delta.reasoning_content || '', '');
      result += content;
      reasoningResult += reasoningContent;

      if (reasoningContent && record.reasoningStatus === 0) {
        record.reasoningStatus = 1;
      } else if (content && record.reasoningStatus === 1) {
        record.reasoningStatus = 2;
        record.reasoningDuration = Math.round((Date.now() - reasoningStartTime) / 1000)
      }

      record.recordId = json.id;
      record.content = result;
      record.reasoningContent = reasoningResult.trim();
    } else {
      result += json.content;
      record.recordId = json.record_id;
      record.knowledgeBase = json.knowledge_meta.map(item => JSON.parse(item)).filter(i => Object.keys(i).length);
      record.content = result; // $comp.dataset.state.chatRecords = [...$comp.dataset.state.chatRecords.slice(0, $comp.dataset.state.chatRecords.length - 1), record]
    }

    if ($comp.dataset.state.ai_bot_ui_scroll_to_bottom) {
      $comp.handler.ai_bot_scroll_to_bottom({});
    }

    if ($comp.dataset.state.chatStatus != 2) {
      break;
    }
  } // 显示按钮组


  delete record.btnGroupShow; // 切回聊天状态

  $comp.dataset.state.chatStatus = 0;

  if ($comp.dataset.state.botInfo.isNeedRecommend) {
    $comp.handler.queryRecommendQuestions({
      data: {
        target: {
          botId: $comp.dataset.state.botInfo?.botId,
          message
        }
      }
    });
  }

  return true;
}
)({params:__params__,data:__data__,$comp,$w}),
    dataBinds: {},
    eventHandlers: {}
  },
  addEnterEvent: { 
    ...({
  "id": "addEnterEvent",
  "name": "addEnterEvent",
  "type": "general-func",
  "trigger": "auto",
  "description": "",
  "data": {
    "params": [
      {}
    ]
  }
}),
    handler: (__data__,__params__,$comp,$w) => (
({ params }) => {
  if ($w.wedaContext.platforms.includes('WEB')) {
    let $textarea = document?.querySelector?.('.ai-bot-chat__textarea textarea')
    let isComposing = false;
    $textarea.addEventListener('compositionstart', function () {
      isComposing = true;
    });
    $textarea.addEventListener('compositionend', function () {
      isComposing = false;
    });
    $textarea.addEventListener('keydown', function (event) {
      if (!($w.textarea1.value?.trim())?.length || [1, 2].includes($comp.dataset.state.chatStatus)) {
        return
      }
      if (event.key === 'Enter' && !event.shiftKey) {
        // 判断输入法是否正在输入中文字符
        if (!event.target.isComposing && !isComposing) {
          event.preventDefault();
          // 如果不是中文输入过程中，执行提交操作
          $comp.dataset.state.chatRecords = [...$comp.dataset.state.chatRecords,
          {
            "role": "user",
            "type": "text",
            "content": $w.textarea1.value,
            "bot": $comp.dataset.state.botInfo.botId
          }]
          $w.sendMessage.trigger()
        }
      }
    });
  }
}

)({params:__params__,data:__data__,$comp,$w}),
    dataBinds: {},
    eventHandlers: {}
  },
  submitFeedback: { 
    ...({
  "id": "submitFeedback",
  "name": "submitFeedback",
  "type": "general-func",
  "trigger": "manual",
  "description": "",
  "data": {
    "params": [
      {}
    ]
  }
}),
    handler: (__data__,__params__,$comp,$w) => (
async ({ params }) => {
  // 当前拉起反馈弹窗的聊天记录索引
  const index = $w.modal1.openInfo.index
  const type = $w.modal1.openInfo.type

  const raw = {
    "recordId": $comp.dataset.state.chatRecords[index].recordId,
    "type": type,
    "botId": $comp.dataset.state.chatRecords[index].botId,
    "comment": $w.textarea2.value,
    "rating": $w.rating1.value,
    "tags": $w.tagSelect1.value,
    "input": $comp.dataset.state.chatRecords[index - 1].content,
    "aiAnswer": $comp.dataset.state.chatRecords[index].content
  };
const res=await $w.app.ai.bot.sendFeedback({userFeedback:raw})

  const { status } = res
  if (status === 'success') {
    return true
  }
  return false
}

)({params:__params__,data:__data__,$comp,$w}),
    dataBinds: {},
    eventHandlers: {}
  },
  queryChatRecords: { 
    ...({
  "id": "queryChatRecords",
  "name": "queryChatRecords",
  "type": "general-func",
  "trigger": "manual",
  "description": "",
  "data": {
    "params": [
      {}
    ]
  }
}),
    handler: (__data__,__params__,$comp,$w) => (
async ({ params }) => {
  // 聊天记录
  const { botId } = $comp.dataset.state.botInfo
  const data =await $w.app.ai.bot.getChatRecords({
    botId,
    pageNumber: 1,
    pageSize: 20,
    sort: "desc",
  });

  const {recordList=[]}=data
  //将欢迎语作为第一条聊天记录
  $comp.dataset.state.chatRecords=[{
    role:"assistant",
    content:$comp.dataset.state.botInfo?.welcomeMessage,
    btnGroupShow:'hidden'
  },...recordList.reverse()]
}

)({params:__params__,data:__data__,$comp,$w}),
    dataBinds: {},
    eventHandlers: {}
  },
  queryBotById: { 
    ...({
  "id": "queryBotById",
  "name": "queryBotById",
  "type": "general-func",
  "trigger": "auto",
  "description": "",
  "data": {
    "params": [
      {}
    ]
  }
}),
    handler: (__data__,__params__,$comp,$w) => (
async () => {
    const {isPreview,bot={}}=$w.container22?.data||{}
  if (isPreview) {
    $comp.dataset.state.botInfo = bot
     $comp.dataset.state.recommendQuestions = bot.initQuestions
    // 将欢迎语作为第一条聊天记录
    $comp.dataset.state.chatRecords = [{
      role: "assistant",
      content: bot.welcomeMessage,
      btnGroupShow: 'hidden'
    }]
    return
  }
  // 从区块获取botId
  const botId = bot.botId
  // 如果id为空，展示提示
  if (!botId) {
    return
  }
  const data = await $w.app.ai.bot.get({ botId });

  $comp.dataset.state.botInfo = {...data, ...bot}
  // 查询聊天记录
  await $w.queryChatRecords.trigger()
  // 将初始的提示问题展示到聊天页面的最下面
  $comp.dataset.state.recommendQuestions = data.initQuestions
  // 滚动到底部
  if ($comp.dataset.state.ai_bot_ui_scroll_to_bottom) {
    setTimeout(() => {
      $comp.handler.ai_bot_scroll_to_bottom({});
    }, 500)
  }
  return true
}

)({params:__params__,data:__data__,$comp,$w}),
    dataBinds: {},
    eventHandlers: {"onqueryBotById$success": [
      {
          key: 'whsoa098nll',
          sourceKey: 'platform:callNanoFlow',
          handler: function({data, $w}){ return $w[data.id]?.trigger?.(data.data)},
          args: {
  "params": [
    {
      "data": "",
      "id": "eventflowAddMessageFromUrl"
    }
  ]
},
          argsBinds: {}
        }
    ],}
  },
}

const eventFlows = [
]

const config = {}
const datasetProfile = {
  "state": {
    "chatRecords": {
      "name": "chatRecords",
      "label": "聊天记录，包含历史聊天记录和对话记录",
      "varType": "state",
      "dataType": "array",
      "initialValue": [],
      "enableSyncLocal": false
    },
    "ai_bot_scroll_top": {
      "name": "ai_bot_scroll_top",
      "label": "",
      "varType": "state",
      "dataType": "number",
      "initialValue": 999,
      "enableSyncLocal": false
    },
    "botInfo": {
      "name": "botInfo",
      "label": "当前选中智能体信息",
      "varType": "state",
      "dataType": "object",
      "initialValue": {},
      "enableSyncLocal": false
    },
    "recommendQuestions": {
      "name": "recommendQuestions",
      "label": "建议问题",
      "varType": "state",
      "dataType": "array",
      "initialValue": [],
      "enableSyncLocal": false
    },
    "enableReason": {
      "name": "enableReason",
      "label": "",
      "varType": "state",
      "dataType": "boolean",
      "initialValue": true,
      "enableSyncLocal": true
    },
    "chatStatus": {
      "name": "chatStatus",
      "label": "0-可输入，1-待响应，2-响应中",
      "varType": "state",
      "dataType": "number",
      "initialValue": 0,
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
    "ai_bot_ui_scroll_to_bottom": {
      "name": "ai_bot_ui_scroll_to_bottom",
      "label": "",
      "varType": "state",
      "dataType": "boolean",
      "initialValue": true,
      "enableSyncLocal": false
    }
  },
  "params": {}
};

createComponent({
  key: 'block:cloudbase',
  behaviors,
  properties,
  events,
  handler: handlers,
  dataBinds,
  evtListeners,
  widgetProps,
  lifeCycle,
  stateFn,
  computedFuncs,
  config,
  datasetProfile,
  query,
  eventFlows,
  nativeMode: !!1,
})
