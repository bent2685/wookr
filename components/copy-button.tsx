'use client'

import { useEffect } from 'react'

export function CopyButtonScript() {
  useEffect(() => {
    document.querySelectorAll('[data-copy]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const codeBlock = (btn as HTMLElement).closest('.code-block')
        const pre = codeBlock?.querySelector('pre')
        if (!pre) return
        const text = pre.textContent || ''
        await navigator.clipboard.writeText(text)
        const el = btn as HTMLElement
        const original = el.textContent || ''
        el.textContent = '✓ copied'
        el.classList.add('copied')
        setTimeout(() => {
          el.textContent = original
          el.classList.remove('copied')
        }, 2000)
      })
    })
  }, [])
  return null
}
