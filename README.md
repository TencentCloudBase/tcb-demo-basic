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
| 开发 | AI 插件安装引导、步骤说明、文档与示例 |

## 用 AI 接云开发（IDE）

```bash
npx plugins add TencentCloudBase/cloudbase-plugin --yes
```

仅需 Skills：

```bash
npx skills add tencentcloudbase/cloudbase-skills -y
```

文档：[AI 插件](https://docs.cloudbase.net/ai/cloudbase-ai-toolkit/ai-agent-plugins) · [小程序快速开始](https://docs.cloudbase.net/quick-start/mini-program/introduce) · [解决方案](https://cloud.tencent.com/solution/la)

## 更多示例

[awesome-cloudbase-examples · 小程序](https://github.com/TencentCloudBase/awesome-cloudbase-examples/tree/master/miniprogram)
