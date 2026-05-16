'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  delayChildren?: number
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.08,
  delayChildren = 0.1,
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      variants={{
        ...containerVariants,
        visible: {
          ...containerVariants.visible,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  )
}
