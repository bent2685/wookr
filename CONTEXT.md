# Wookr

无后端博客系统，数据源为符合刮削约定的 GitHub 仓库，运行时动态获取内容。

## Language

**Post**:
仓库 `posts/` 目录下的单篇博客文章，由 frontmatter 元信息 + Markdown 正文组成。
_Avoid_: 文章、帖子

**Page**:
仓库 `pages/` 目录下的独立内容页，无 tags/category/date，本质是纯 Markdown 内容页。
_Avoid_: 页面、静态页

**Tag**:
贴在 Post 上的多值标签，用于横向归类。
_Avoid_: 标签

**Category**:
贴在 Post 上的单值分类，用于纵向归属。
_Avoid_: 分类、目录

**Featured**:
frontmatter 中 `featured: true` 标记的精选帖子，展示在首页精选区。
_Avoid_: 推荐、置顶

**Source Repo**:
开发者配置的 GitHub 仓库，是博客的唯一数据来源。
_Avoid_: 数据源、源仓库

**Scrape Protocol**:
Source Repo 必须满足的目录与文件约定，博客据此解析内容。
_Avoid_: 刮削协议、约定

**Config**:
Source Repo 根目录的 `config.yaml`，定义站点信息、数据源、导航等全局配置。
_Avoid_: 配置文件

**Custom Page Index**:
Source Repo `pages/index.json`，定义自定义页面的路由与元信息。Top Nav 的链接必须来自此处。
_Avoid_: 页面索引

## Relationships

- 一个 **Source Repo** 包含多个 **Post** 和多个 **Page**
- 一个 **Post** 拥有零或多个 **Tag**，至多一个 **Category**
- 一个 **Post** 可以是 **Featured**（`featured: true`）
- **Config** 中的 `nav` 引用 **Custom Page Index** 中定义的页面 key
- **Custom Page Index** 的 key 决定 **Page** 的路由路径

## Example dialogue

> **Dev:** "首页精选区怎么决定展示哪些帖子？"
> **Domain expert:** "帖子 frontmatter 里 `featured: true` 就是精选帖子，首页直接聚合展示。"
> **Dev:** "自定义页面能出现在导航里吗？"
> **Domain expert:** "可以，但必须先在 `pages/index.json` 里定义，然后 `config.yaml` 的 `nav` 才能引用它的 key。"

## Flagged ambiguities

- "页面" 可能指 **Page**（自定义内容页）也可能指前端路由页面——已明确：**Page** 特指仓库内自定义内容页，前端路由页面称"路由"。