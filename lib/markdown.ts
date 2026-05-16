import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeKatex from 'rehype-katex'
import rehypeStringify from 'rehype-stringify'
import rehypeShiki from '@shikijs/rehype'

const LANG_MAP: Record<string, string> = {
  js: 'JavaScript',
  ts: 'TypeScript',
  tsx: 'TSX',
  jsx: 'JSX',
  py: 'Python',
  rb: 'Ruby',
  go: 'Go',
  rs: 'Rust',
  java: 'Java',
  sql: 'SQL',
  sh: 'Shell',
  bash: 'Bash',
  yaml: 'YAML',
  yml: 'YAML',
  json: 'JSON',
  md: 'Markdown',
  css: 'CSS',
  html: 'HTML',
  shellscript: 'Shell',
}

function formatLang(lang: string): string {
  const lower = lang.toLowerCase()
  if (LANG_MAP[lower]) return LANG_MAP[lower]
  return lang.charAt(0).toUpperCase() + lang.slice(1).toLowerCase()
}

function extractLangs(markdown: string): string[] {
  const langs: string[] = []
  const regex = /^```(\w+)\s*$/gm
  let match: RegExpExecArray | null
  while ((match = regex.exec(markdown)) !== null) {
    langs.push(match[1])
  }
  return langs
}

function wrapCodeBlocks(html: string, langs: string[]): string {
  let result = ''
  let searchFrom = 0
  let langIdx = 0

  while (true) {
    const preStart = html.indexOf('<pre class="shiki', searchFrom)
    if (preStart === -1) break

    result += html.slice(searchFrom, preStart)

    const preEnd = html.indexOf('</pre>', preStart)
    if (preEnd === -1) break

    const preTag = html.slice(preStart, preEnd + '</pre>'.length)

    const classMatch = preTag.match(/class="shiki\s+([^"]+)"/)
    const classes = classMatch ? classMatch[1] : ''

    const styleMatch = preTag.match(/style="([^"]+)"/)
    const style = styleMatch ? styleMatch[1] : ''

    const lang = langIdx < langs.length ? formatLang(langs[langIdx]) : ''
    langIdx++

    const codeStart = preTag.indexOf('>', preTag.indexOf('<pre'))
    const innerContent = preTag.slice(codeStart + 1, preTag.length - '</pre>'.length)

    result += `<div class="code-block"><div class="code-block-header"><span class="code-block-lang">${lang}</span><button class="code-block-copy" data-copy>复制</button></div><pre class="${classes}"${style ? ` style="${style}"` : ''} tabindex="0">${innerContent}</pre></div>`

    searchFrom = preEnd + '</pre>'.length
  }

  result += html.slice(searchFrom)
  return result
}

export async function renderMarkdown(markdown: string): Promise<string> {
  const langs = extractLangs(markdown)

  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeKatex)
    .use(rehypeShiki, {
      theme: 'github-dark',
      lazy: true,
    })
    .use(rehypeStringify, { allowDangerousHtml: true })

  const result = await processor.process(markdown)
  const html = String(result)

  return wrapCodeBlocks(html, langs)
}