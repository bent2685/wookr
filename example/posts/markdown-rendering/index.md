---
title: Markdown 渲染能力一览
date: 2025-03-10
tags:
  - Markdown
  - 代码高亮
  - 数学公式
category: 功能
excerpt: Wookr 的 Markdown 渲染管线支持代码高亮、数学公式、GFM 扩展等丰富的内容格式。
featured: true
---

# Markdown 渲染能力一览

Wookr 使用 unified + remark + rehype 管线渲染 Markdown，支持以下特性。

## 代码高亮

使用 Shiki 引擎，CSS 变量主题与设计系统完美融合：

```typescript
function fibonacci(n: number): number[] {
  const result: number[] = [0, 1]
  for (let i = 2; i < n; i++) {
    result.push(result[i - 1] + result[i - 2])
  }
  return result
}

console.log(fibonacci(10))
```

Python 示例：

```python
def quicksort(arr: list[int]) -> list[int]:
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)
```

SQL 也能高亮：

```sql
SELECT
  posts.id,
  posts.title,
  COUNT(tags.id) AS tag_count
FROM posts
LEFT JOIN tags ON tags.post_id = posts.id
WHERE posts.draft = false
GROUP BY posts.id
ORDER BY posts.date DESC
LIMIT 10;
```

## 数学公式

行内公式：质能方程 $E = mc^2$，欧拉恒等式 $e^{i\pi} + 1 = 0$。

块级公式：

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

傅里叶变换：

$$
\hat{f}(\xi) = \int_{-\infty}^{\infty} f(x) e^{-2\pi i x \xi} dx
$$

## GFM 扩展

### 表格

| 功能 | 状态 | 说明 |
|------|------|------|
| 代码高亮 | ✅ | Shiki CSS 变量主题 |
| 数学公式 | ✅ | KaTeX 渲染 |
| GFM 表格 | ✅ | remark-gfm |
| 自动锚点 | ✅ | rehype-slug |
| 删除线 | ✅ | GFM 扩展 |

### 任务列表

- [x] Markdown 解析
- [x] 代码高亮
- [x] 数学公式
- [ ] 搜索功能（计划中）
- [ ] 评论系统（计划中）

### 删除线

这段文字中~~错误的部分~~会显示删除线。

## 图片

支持相对路径和外部 URL：

```markdown
![封面](./cover.jpg)          # 仓库内相对路径，自动转为 GitHub raw URL
![截图](https://example.com/img.png)  # 外部 URL 原样保留
```

## 引用与列表

> 好的设计是尽可能少的设计。
> — Dieter Rams

1. 第一步：配置环境变量
2. 第二步：确保仓库结构符合约定
3. 第三步：启动开发服务器

就这么简单。