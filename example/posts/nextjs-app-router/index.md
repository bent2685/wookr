---
title: Next.js App Router 实践笔记
date: 2025-02-20
tags:
  - Next.js
  - React
  - 前端
category: 技术
excerpt: 在 Wookr 中，我们使用了 Next.js App Router 的 Server Components 和动态路由来实现博客的核心功能。
featured: true
---

# Next.js App Router 实践笔记

Wookr 基于 Next.js App Router 构建。本文分享几个关键实践。

## Server Components 优先

所有页面默认使用 Server Components，数据获取在服务端完成：

```tsx
// app/posts/[slug]/page.tsx
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()
  const html = await renderMarkdown(post.content)
  return <article dangerouslySetInnerHTML={{ __html: html }} />
}
```

## 动态渲染 + 缓存

页面标记为 `force-dynamic`，每次请求服务端渲染，配合内存缓存实现 1 分钟 TTL：

```ts
export const dynamic = 'force-dynamic'
```

## 路由结构

```
app/
├── page.tsx                    # 首页
├── posts/[slug]/page.tsx       # 帖子详情
├── tags/page.tsx               # 标签列表
├── tags/[tag]/page.tsx         # 标签筛选
├── categories/page.tsx         # 分类列表
├── categories/[category]/page.tsx  # 分类筛选
└── [slug]/page.tsx             # 自定义页面
```

## 类型安全

所有数据模型都有 TypeScript 类型定义，从 `PostFrontmatter` 到 `BlogConfig`：

```ts
interface PostFrontmatter {
  title: string
  date: string
  tags?: string[]
  category?: string
  excerpt?: string
  cover?: string
  draft?: boolean
  featured?: boolean
}
```

这使得开发过程中的错误在编译期就能被发现。