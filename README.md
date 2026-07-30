# 小程序·云开发体验

微信内的云开发体验入口：演示小程序场景下的云开发能力，并引导使用 AI 工具链。

## 打开项目

1. 用微信开发者工具打开本仓库
2. 填写 `project.config.json` 中的 `appid`
3. 编译预览

## 信息架构

| Tab | 内容 |
|-----|------|
| 首页 | 云开发定位 + 体验 / AI 入口 |
| 体验 | 用户管理、小程序码、模板消息、客服消息、微信支付 |
| 开发 | AI 接入引导（Prompt 优先 / Plugin 备选）、步骤说明、文档与示例 |

## 用 AI 接云开发

**方式一 · AI Prompt（推荐，最通用）**：把下面 Prompt 复制粘到 AI IDE（Cursor / Claude Code / CodeBuddy 等），AI 会自动按说明完成接入。

```
帮我把 CloudBase 接好：
1. 打开 https://docs.cloudbase.net/skill.md，按说明完成接入。
2. 接入完成后告诉我，并建议最相关的下一步。
```

**方式二 · Plugin 命令（一键安装）**：若环境可用，一条命令装好 MCP Server、Agent Skills 与 Hooks。

```bash
npx plugins add TencentCloudBase/cloudbase-plugin --yes
```

仅需 Skills：

```bash
npx skills add tencentcloudbase/cloudbase-skills -y
```

> 插件装不上时，直接用方式一的 Prompt 即可，AI 会自行访问文档完成接入。

文档：[AI 插件](https://docs.cloudbase.net/ai/cloudbase-ai-toolkit/ai-agent-plugins) · [小程序快速开始](https://docs.cloudbase.net/quick-start/mini-program/introduce) · [解决方案](https://cloud.tencent.com/solution/la)

## 更多示例

[awesome-cloudbase-examples · 小程序](https://github.com/TencentCloudBase/awesome-cloudbase-examples/tree/master/miniprogram)
