---
title: GitHub 即 CMS：数据源约定详解
date: 2025-04-05
tags:
  - GitHub
  - 约定
  - 架构
category: 教程
excerpt: 详解 Wookr 的 Scrape Protocol — 仓库需要满足的目录结构和文件约定。
---

# GitHub 即 CMS：数据源约定详解

Wookr 从 GitHub 仓库获取所有内容。仓库需要满足以下约定（我们称之为 **Scrape Protocol**）。

## 仓库结构

```
your-blog-repo/
├── config.yaml              # 必需：全局配置
├── posts/
│   ├── hello-world/
│   │   ├── index.md         # 帖子内容（frontmatter + Markdown）
│   │   └── cover.jpg        # 可选：封面图（相对路径引用）
│   ├── another-post/
│   │   └── index.md
│   └── draft-post/
│       └── index.md         # frontmatter 中 draft: true 不会被展示
└── pages/
    ├── index.json           # 必需：自定义页面索引
    ├── about.md             # 自定义页面内容
    └── links.md
```

## config.yaml

```yaml
site:
  title: My Blog
  description: A blog powered by wookr
  author: Your Name

source:
  repo: owner/repo        # GitHub 仓库（owner/repo 格式）
  branch: main            # 分支名

nav:
  - about                  # 引用 pages/index.json 中定义的页面 key
  - links

posts:
  per_page: 10            # 首页每页帖子数
```

**重要**：`nav` 中引用的页面必须先在 `pages/index.json` 中定义。

## 帖子 Frontmatter

每个帖子的 `index.md` 必须包含 frontmatter：

```yaml
---
title: 帖子标题          # 必需
date: 2025-01-01         # 必需：发布日期
tags:                    # 可选：多值标签
  - JavaScript
  - 教程
category: 技术           # 可选：单值分类
excerpt: 帖子摘要        # 可选：缺省时从正文截取
cover: ./cover.jpg       # 可选：封面图，支持相对路径或外部 URL
draft: false             # 可选：true 则不展示
featured: true           # 可选：true 则展示在首页精选区
---

帖子正文...
```

## 自定义页面

`pages/index.json` 定义页面的路由和元信息：

```json
{
  "about": {
    "slug": "about",
    "title": "关于",
    "source": "about.md"
  },
  "links": {
    "slug": "links",
    "title": "友情链接",
    "source": "links.md"
  }
}
```

- **key** 即路由路径：`about` → `/about`
- `source` 是 `pages/` 目录下的文件名
- 自定义页面本质上是纯 Markdown 内容页，没有 tags/category/date

## 图片处理

- 相对路径（如 `./cover.jpg`）自动转换为 GitHub raw URL
- 外部 URL（`https://...`）原样保留
- 帖子目录内的图片通过相对路径引用即可

## 精选机制

帖子是否出现在首页精选区，取决于 frontmatter 中的 `featured: true`。不需要在 `config.yaml` 中额外配置。