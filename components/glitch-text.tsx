'use client'

import { useEffect, useState, useRef } from 'react'
import type { CSSProperties, ElementType } from 'react'

interface GlitchTextProps {
  text: string
  as?: ElementType
  className?: string
  style?: CSSProperties
}

export function GlitchText({ text, as: Tag = 'span', className = '', style }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true)
      timeoutRef.current = setTimeout(() => setIsGlitching(false), 200)
    }, 4000 + Math.random() * 3000)

    return () => {
      clearInterval(interval)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <Tag
      className={`glitch ${className}`}
      data-text={text}
      style={{
        ...style,
        ...(isGlitching
          ? {
              textShadow: `
                2px 0 var(--color-accent-rose),
                -2px 0 var(--color-accent-blue)
              `,
            }
          : {}),
      }}
    >
      {text}
    </Tag>
  )
}
