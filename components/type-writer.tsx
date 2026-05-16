'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

interface TypeWriterProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  onComplete?: () => void
  showCursor?: boolean
}

export function TypeWriter({
  text,
  speed = 40,
  delay = 0,
  className = '',
  onComplete,
  showCursor = true,
}: TypeWriterProps) {
  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  const startTyping = useCallback(() => {
    setHasStarted(true)
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
        setIsComplete(true)
        onComplete?.()
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed, onComplete])

  useEffect(() => {
    const timeout = setTimeout(startTyping, delay)
    return () => clearTimeout(timeout)
  }, [startTyping, delay])

  if (!hasStarted) return null

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
    >
      {displayText}
      {showCursor && !isComplete && (
        <span className="inline-block w-[0.6em] h-[1.1em] bg-primary align-middle ml-[1px] animate-[cursor-blink_1s_step-end_infinite]" />
      )}
      {showCursor && isComplete && (
        <span className="inline-block w-[0.6em] h-[1.1em] bg-primary align-middle ml-[1px] animate-[cursor-blink_1s_step-end_infinite]" />
      )}
    </motion.span>
  )
}

interface TypeWriterLinesProps {
  lines: { text: string; delay?: number }[]
  speed?: number
  className?: string
  lineClassName?: string
}

export function TypeWriterLines({
  lines,
  speed = 30,
  className = '',
  lineClassName = '',
}: TypeWriterLinesProps) {
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    if (visibleLines < lines.length) {
      const totalDelay = lines
        .slice(0, visibleLines + 1)
        .reduce((acc, line) => acc + (line.text.length * speed) + (line.delay || 0) + 200, 0)

      const timeout = setTimeout(() => {
        setVisibleLines((v) => v + 1)
      }, visibleLines === 0 ? (lines[0]?.delay || 0) : 200)

      return () => clearTimeout(timeout)
    }
  }, [visibleLines, lines, speed])

  return (
    <div className={className}>
      {lines.slice(0, visibleLines).map((line, i) => (
        <motion.div
          key={i}
          className={lineClassName}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {line.text}
        </motion.div>
      ))}
      {visibleLines < lines.length && (
        <span className="inline-block w-[0.6em] h-[1.1em] bg-primary align-middle animate-[cursor-blink_1s_step-end_infinite]" />
      )}
    </div>
  )
}
