'use client'

import { motion } from 'framer-motion'
import type { Post } from '@/lib/types'

interface PostListProps {
  posts: Post[]
}

export function PostList({ posts }: PostListProps) {
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
          {/* Line number */}
          <span className="font-mono text-xs text-muted-soft w-8 text-right shrink-0 pt-0.5 select-none">
            {String(i + 1).padStart(2, '0')}
          </span>

          {/* Prompt */}
          <span className="font-mono text-sm text-accent-emerald shrink-0 pt-0.5 group-hover:text-primary transition-colors">
            ❯
          </span>

          {/* Content */}
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
              {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                <>
                  <span className="text-hairline-strong text-xs">│</span>
                  <div className="flex items-center gap-1.5">
                    {post.frontmatter.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[0.6rem] text-muted-soft"
                      >
                        #{tag}
                      </span>
                    ))}
                    {post.frontmatter.tags.length > 3 && (
                      <span className="font-mono text-[0.6rem] text-muted-soft">
                        +{post.frontmatter.tags.length - 3}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>

            {post.frontmatter.excerpt && (
              <p className="font-mono text-xs text-muted mt-1.5 leading-relaxed line-clamp-1">
                {post.frontmatter.excerpt}
              </p>
            )}
          </div>

          {/* Arrow */}
          <span className="font-mono text-xs text-muted-soft group-hover:text-primary transition-colors shrink-0 pt-0.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200">
            →
          </span>
        </motion.a>
      ))}

      {/* Terminal end marker */}
      <motion.div
        className="flex items-center gap-2 py-3 px-4 font-mono text-xs text-muted-soft"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { delay: 0.3 } },
        }}
      >
        <span className="text-accent-emerald">❯</span>
        <span className="text-muted">_</span>
        <span className="inline-block w-2 h-4 bg-primary animate-[cursor-blink_1s_step-end_infinite] ml-1" />
      </motion.div>
    </motion.div>
  )
}
