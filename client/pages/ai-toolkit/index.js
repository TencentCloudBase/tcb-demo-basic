const AI_SETUP_PROMPT = '帮我把 CloudBase 接好：\n1. 打开 https://docs.cloudbase.net/skill.md，按说明完成接入。\n2. 接入完成后告诉我，并建议最相关的下一步。'
const AI_USE_PROMPT = '使用 CloudBase Skills 开发一个全栈 Web 应用并部署'
const PLUGIN_CMD = 'npx plugins add TencentCloudBase/cloudbase-plugin --yes'
const SKILLS_CMD = 'npx skills add tencentcloudbase/cloudbase-skills -y'
const DOCS_URL = 'https://docs.cloudbase.net/ai/cloudbase-ai-toolkit/ai-agent-plugins'
const QUICKSTART_URL = 'https://docs.cloudbase.net/quick-start/mini-program/introduce'

Page({
  data: {
    aiSetupPrompt: AI_SETUP_PROMPT,
    aiUsePrompt: AI_USE_PROMPT,
    pluginCmd: PLUGIN_CMD,
    skillsCmd: SKILLS_CMD,
    steps: [
      {
        title: '把 Prompt 粘给 AI（或装 Plugin）',
        desc: '粘到 Cursor / Claude Code / CodeBuddy 等 AI IDE，AI 会按说明自动接入；也可用下面的 Plugin 命令一键安装。'
      },
      {
        title: '对 AI 说明需求',
        desc: '例如：「用云开发做一个带登录和数据库的待办小程序」。Skills 约束写法，MCP 开通环境、部署云函数。'
      },
      {
        title: '在自己的环境里验证',
        desc: '资源落在你的云开发环境；敏感操作需你在 IDE 中确认。'
      }
    ]
  },

  onShareAppMessage() {
    return {
      title: '在 IDE 里用 AI 接云开发',
      path: '/pages/ai-toolkit/index'
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

  openDocs() {
    wx.navigateTo({
      url: `/pages/jumpto-webpage/index?url=${encodeURIComponent(DOCS_URL)}`
    })
  },

  openQuickStart() {
    wx.navigateTo({
      url: `/pages/jumpto-webpage/index?url=${encodeURIComponent(QUICKSTART_URL)}`
    })
  },

  goExperience() {
    wx.switchTab({ url: '/pages/case/index' })
  }
})
