'use client'

import { motion } from 'framer-motion'
import type { Post } from '@/lib/types'

interface TagPostListProps {
  posts: Post[]
}

export function TagPostList({ posts }: TagPostListProps) {
  return (
    <motion.div
      className="space-y-1"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.06 },
        },
      }}
    >
      {posts.map((post, i) => (
        <motion.a
          key={post.slug}
          href={`/posts/${post.slug}`}
          className="group flex items-start gap-3 py-3 px-4 rounded-md hover:bg-surface-card/50 transition-all duration-200 border border-transparent hover:border-hairline"
          variants={{
            hidden: { opacity: 0, x: -16 },
            visible: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
            },
          }}
        >
          <span className="font-mono text-xs text-muted-soft w-8 text-right shrink-0 pt-0.5 select-none">
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="font-mono text-sm text-accent-emerald shrink-0 pt-0.5 group-hover:text-primary transition-colors">
            ❯
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-3 flex-wrap">
              <h3 className="font-mono text-sm font-semibold text-on-dark group-hover:text-primary transition-colors truncate">
                {post.frontmatter.title}
              </h3>
              {post.frontmatter.category && (
                <span className="font-mono text-[0.65rem] text-primary/70 tracking-wider uppercase">
                  [{post.frontmatter.category}]
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 mt-1">
              <time className="font-mono text-xs text-muted-soft">
                {new Date(post.frontmatter.date).toLocaleDateString('zh-CN')}
              </time>
            </div>
          </div>
          <span className="font-mono text-xs text-muted-soft group-hover:text-primary transition-colors shrink-0 pt-0.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200">
            →
          </span>
        </motion.a>
      ))}
    </motion.div>
  )
}
