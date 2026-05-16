---
title: 部署 Wookr 到 Vercel、Cloudflare Pages 和自建服务器
date: 2025-05-01
tags:
  - 部署
  - Vercel
  - Cloudflare
category: 运维
excerpt: 介绍如何将 Wookr 博客部署到不同平台，包括环境变量的配置方法。
---

# 部署 Wookr

Wookr 支持多种部署方式。本文介绍三种常见方案。

## 环境变量

无论哪种部署方式，以下环境变量是必需的：

| 变量 | 说明 | 示例 |
|------|------|------|
| `GITHUB_REPO` | GitHub 仓库地址 | `owner/repo` |
| `GITHUB_BRANCH` | 仓库分支 | `main` |
| `GITHUB_TOKEN` | GitHub Personal Access Token | `ghp_xxxx` |

> `GITHUB_TOKEN` 是可选的。未认证时 GitHub API 限制为 60 次/小时，认证后为 5000 次/小时。由于 Wookr 有 1 分钟缓存，建议至少配置 Token。

## 部署到 Vercel

最简单的方式：

```bash
# 1. Fork 或 clone Wookr
# 2. 在 Vercel Dashboard 导入项目
# 3. 添加环境变量
# 4. 部署
```

Vercel 会自动识别 Next.js 项目，零配置部署。

### GitHub Actions 自动注入

如果你使用 Vercel 官方 GitHub Integration，可以在仓库设置中添加 `GITHUB_TOKEN` 作为 Secret，Vercel 会在构建时自动注入。

## 部署到 Cloudflare Pages

```bash
# 构建
bun run build

# Cloudflare Pages 需要 standalone output
# 在 next.config.ts 中添加:
# output: 'export'  # 注意：需要静态导出模式
```

然后在 Cloudflare Pages 设置中添加环境变量即可。

## 自建服务器

```bash
# 构建
bun run build

# 启动
bun run start

# 或使用 PM2
pm2 start bun -- run start
```

建议在服务器上使用 systemd 或 PM2 管理进程：

```ini
# /etc/systemd/system/wookr.service
[Unit]
Description=Wookr Blog
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/wookr
ExecStart=/usr/bin/bun run start
Environment=GITHUB_REPO=owner/repo
Environment=GITHUB_BRANCH=main
Environment=GITHUB_TOKEN=ghp_your_token

[Install]
WantedBy=multi-user.target
```

## Caddy 反向代理

```Caddyfile
yourdomain.com {
    reverse_proxy localhost:3000
}
```

Caddy 会自动申请和管理 HTTPS 证书。

## 总结

| 平台 | 难度 | 费用 | 备注 |
|------|------|------|------|
| Vercel | ⭐ | 免费额度 | 推荐，零配置 |
| Cloudflare Pages | ⭐⭐ | 免费额度 | 需要 standalone 模式 |
| 自建服务器 | ⭐⭐⭐ | 服务器费用 | 完全控制 |