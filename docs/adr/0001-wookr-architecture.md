# Wookr 架构决策

数据源为 GitHub 仓库的无后端博客。运行时通过 GitHub API 动态获取内容，1分钟缓存刷新，ISR 兜底。Markdown 渲染支持代码高亮（shiki + 自定义主题匹配 DESIGN.md）、数学公式（KaTeX）、相对路径图片自动转换为 GitHub raw URL。自定义页面机制：`pages/index.json` 定义页面路由与元信息，`config.yaml` 的 `nav` 引用其中已定义的页面 key。