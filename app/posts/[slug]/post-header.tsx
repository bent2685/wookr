'use client'

import { motion } from 'framer-motion'

interface PostHeaderProps {
  title: string
  date: string
  category?: string
  tags?: string[]
  siteTitle: string
}

export function PostHeader({ title, date, category, tags, siteTitle }: PostHeaderProps) {
  return (
    <motion.header
      className="py-12 md:py-16 max-w-[800px] mx-auto px-4 md:px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Breadcrumb */}
      <motion.div
        className="flex items-center gap-2 font-mono text-xs text-muted-soft mb-6"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <span className="text-accent-emerald">$</span>
        <a href="/" className="hover:text-primary transition-colors">~</a>
        <span>/</span>
        <span className="text-muted">posts</span>
        <span>/</span>
        <span className="text-primary/70">{title.toLowerCase().replace(/\s+/g, '-')}</span>
      </motion.div>

      {/* Meta */}
      <motion.div
        className="flex items-center gap-3 mb-4 font-mono text-xs"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <time className="text-muted-soft">
          {new Date(date).toLocaleDateString('zh-CN')}
        </time>
        {category && (
          <>
            <span className="text-hairline-strong">│</span>
            <span className="text-primary tracking-wider uppercase text-[0.65rem]">
              [{category}]
            </span>
          </>
        )}
      </motion.div>

      {/* Title */}
      <motion.h1
        className="font-mono text-display-sm md:text-display-md font-bold text-on-dark tracking-display-md leading-tight"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <span className="text-primary mr-3 opacity-50">#</span>
        {title}
      </motion.h1>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <motion.div
          className="flex flex-wrap items-center gap-2 mt-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          {tags.map((tag) => (
            <a
              key={tag}
              href={`/tags/${tag}`}
              className="tag-terminal"
            >
              #{tag}
            </a>
          ))}
        </motion.div>
      )}

      {/* Divider */}
      <motion.div
        className="mt-8 h-px bg-gradient-to-r from-primary/30 via-hairline to-transparent"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      />
    </motion.header>
  )
}
