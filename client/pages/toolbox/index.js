// pages/toolbox/index.js — Tab「开发」
const app = getApp()

const AI_SETUP_PROMPT = '帮我把 CloudBase 接好：\n1. 打开 https://docs.cloudbase.net/skill.md，按说明完成接入。\n2. 接入完成后告诉我，并建议最相关的下一步。'
const PLUGIN_CMD = 'npx plugins add TencentCloudBase/cloudbase-plugin --yes'

Page({
  data: {
    aiSetupPrompt: AI_SETUP_PROMPT,
    pluginCmd: PLUGIN_CMD,
    steps: [
      {
        title: '把 Prompt 粘给 AI（或装 Plugin）',
        desc: '粘到 Cursor / Claude Code / CodeBuddy 等 AI IDE，AI 会自动接入；也可用下面的 Plugin 命令一键安装。'
      },
      {
        title: '用自然语言描述需求',
        desc: '例如：「做一个带登录和数据库的待办小程序」。'
      },
      {
        title: '在自己的环境里验证',
        desc: '资源落在你的云开发环境；敏感操作需你在 IDE 中确认。'
      }
    ],
    resources: [
      {
        title: '云开发文档',
        description: '能力说明、API 与最佳实践',
        navigateType: 'web',
        url: 'https://docs.cloudbase.net/'
      },
      {
        title: '小程序云开发快速开始',
        description: '从零开通环境并跑通第一个小程序',
        navigateType: 'web',
        url: 'https://docs.cloudbase.net/quick-start/mini-program/introduce'
      },
      {
        title: '云托管',
        description: '容器化后端，适合任意语言与长连接',
        navigateType: 'mini',
        appId: 'wxbd19e398fb9eb96b',
        url: '/pages/course-detail/course-detail?docid=00068c2c0106c0667f5b01d015b80d'
      },
      {
        title: 'awesome 示例仓库',
        description: '小程序 / Web 等场景代码示例',
        navigateType: 'web',
        url: 'https://github.com/TencentCloudBase/awesome-cloudbase-examples/tree/master/miniprogram'
      }
    ]
  },

  onShareAppMessage() {
    return {
      title: '云开发 · 开发指引',
      path: '/pages/toolbox/index'
    }
  },

  copyText(e) {
    const text = e.currentTarget.dataset.text
    if (!text) return
    wx.setClipboardData({
      data: text,
      success() {
        wx.showToast({ title: '已复制', icon: 'success' })
      }
    })
  },

  goAiToolkit() {
    wx.navigateTo({ url: '/pages/ai-toolkit/index' })
  },

  navigateToTool(e) {
    app.tcbNavigateTo(e)
  }
})
