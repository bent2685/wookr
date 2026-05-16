'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface TerminalWindowProps {
  title?: string
  children: ReactNode
  className?: string
  showDots?: boolean
  animate?: boolean
}

export function TerminalWindow({
  title,
  children,
  className = '',
  showDots = true,
  animate = true,
}: TerminalWindowProps) {
  const Wrapper = animate ? motion.div : 'div'
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, y: 20, scale: 0.98 },
        whileInView: { opacity: 1, y: 0, scale: 1 },
        viewport: { once: true, margin: '-50px' },
        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
      }
    : {}

  return (
    <Wrapper className={`terminal-window ${className}`} {...wrapperProps}>
      {(title || showDots) && (
        <div className="terminal-titlebar">
          {showDots && (
            <div className="flex gap-2">
              <span className="terminal-dot terminal-dot-red" />
              <span className="terminal-dot terminal-dot-yellow" />
              <span className="terminal-dot terminal-dot-green" />
            </div>
          )}
          {title && <span className="terminal-title">{title}</span>}
          {showDots && <div className="w-[52px]" />}
        </div>
      )}
      <div className="terminal-body">{children}</div>
    </Wrapper>
  )
}
