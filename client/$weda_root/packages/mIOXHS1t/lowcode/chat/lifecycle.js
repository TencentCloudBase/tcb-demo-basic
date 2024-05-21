import { app, $app } from '../../../../app/weapps-api';
import { $page, $w } from '../../pages/chat/api';
/*
* 可通过 $page 获取或修改当前页面的 变量 状态 handler lifecycle 等信息
* 可通过 app 获取或修改全局应用的 变量 状态 等信息
* 具体可以 console.info 在编辑器Console面板查看更多信息
* 如果需要 async-await，请在方法前 async
*/
export default {
  onPageLoad(query) {
    //console.log('---------> LifeCycle onPageLoad', query)
  },
  onPageShow() {
    //console.log('---------> LifeCycle onPageShow')
  },
  async onPageReady() {
    const hljs = $page.handler.ai_bot_highlight()
    const javascript = $page.handler.ai_bot_hljs_javascript()
    const css = $page.handler.ai_bot_hljs_css()
    const markdownIt = $page.handler.ai_bot_markdown_it
    //console.log('---------> LifeCycle onPageReady')
    // 绑定 enter 事件
    if ($w.wedaContext.platforms.includes('WEB')) {
      let $textarea = document?.querySelector?.('.ai-bot-chat__textarea textarea')
      $textarea.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault(); // 阻止默认行为，避免自动换行
          $page.handler.ai_bot_send_msg({
            data: {
              target: $w.textarea1.value
            }
          })
        }
      });
    }
    // markdown 处理方法
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('css', css);
    $w.page.dataset.state.ai_bot_md = markdownIt({
      // Enable HTML tags in source
      html: false,
      // Use '/' to close single tags (<br />).
      // This is only for full CommonMark compatibility.
      xhtmlOut: false,
      // Convert '\n' in paragraphs into <br>
      breaks: false,
      // CSS language prefix for fenced blocks. Can be
      // useful for external highlighters.
      langPrefix: 'language-',
      // Autoconvert URL-like text to links
      linkify: false,
      // Enable some language-neutral replacement + quotes beautification
      // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.mjs
      typographer: false,
      // Double + single quotes replacement pairs, when typographer enabled,
      // and smartquotes on. Could be either a String or an Array.
      //
      // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
      // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
      quotes: '“”‘’',
      // Highlighter function. Should return escaped HTML,
      // or '' if the source string is not changed and should be escaped externally.
      // If result starts with <pre... internal wrapper is skipped.
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return '<pre><code class="hljs">' +
              hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
              '</code></pre>';
          } catch (__) { }
        }
        return '<pre><code class="hljs">' + str + '</code></pre>';
      }
    });
    // 表名
    $w.page.dataset.state.ai_bot_db_name = (await $w.cloud.callWedaApi({
      action: 'DescribeTableName',
      data: {
        Name: 'ai_bot_chat_history_yhksihv'
      }
    })).TableName
    // 调试
    if ($w.page.dataset.params.debug === '1') {
      const targetOrigin = location.origin; // 接收消息页面的源
      // 接收方：将 JSON 字符串转换回对象
      window.addEventListener('message', async function (event) {
        if (event.origin !== targetOrigin) return;
        console.log(event.data)
        try {
          const data = JSON.parse(event.data);
          // 处理 data 对象
          if (data.method === 'update_current_bot') {
            $page.dataset.state.ai_bot_current_bot = data.botInfo
            $w.page.dataset.state.ai_bot_avatar = await $w.cloud.getTempFileURL($w.page.dataset.state.ai_bot_current_bot.avatar);
            $w.page.dataset.state.ai_bot_background = await $w.cloud.getTempFileURL($w.page.dataset.state.ai_bot_current_bot.background);
          }
        } catch (error) {
          console.error('Error parsing JSON from received message:', error);
        }
      });
    }
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    $w.listView2.refresh()
    wx.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
  },
  onPageHide() {
    //console.log('---------> LifeCycle onPageHide')
  },
  onPageUnload() {
    //console.log('---------> LifeCycle onPageUnload')
  },
}
