---
title: 你好，Wookr！
date: 2025-01-15
tags:
  - 入门
  - 介绍
category: 教程
excerpt: 欢迎来到 Wookr 博客引擎，一个由 GitHub 仓库驱动的无后端博客系统。
featured: true
---

# 你好，Wookr！

欢迎来到 **Wookr** — 一个由 GitHub 仓库驱动的无后端博客系统。

## 它是什么？

Wookr 从一个配置好的 GitHub 仓库中动态获取内容。只要你按照约定组织仓库结构，Wookr 就能自动刮削并展示你的帖子。

## 为什么选择 Wookr？

- **零后端** — 不需要数据库，不需要服务器端逻辑
- **Git 即 CMS** — 用 Git 管理内容，版本历史天然存在
- **极速** — 缓存 + ISR，1 分钟自动刷新
- **Markdown 优先** — 支持代码高亮、数学公式、GFM 扩展

## 快速开始

```bash
# 克隆项目
git clone https://github.com/example/wookr.git
cd wookr

# 安装依赖
bun install

# 配置环境变量
cp .env.example .env
# 编辑 .env，设置 GITHUB_REPO=your-name/your-blog-repo

# 启动开发服务器
bun run dev
```

就这么简单。打开浏览器访问 `http://localhost:3000`，你的博客已经运行了。

## 下一步

阅读其他帖子了解更多关于 Wookr 的功能：

- [Markdown 渲染能力](/posts/markdown-rendering) — 支持哪些 Markdown 特性
- [部署到 Vercel](/posts/deploy-to-vercel) — 一键部署
- [GitHub 即 CMS](/posts/github-as-cms) — 数据源约定详解