import { getConfig, getPage } from '@/lib/config'
import { renderMarkdown } from '@/lib/markdown'
import { notFound } from 'next/navigation'
import { CustomPageHeader } from './custom-page-header'
import { Footer } from '@/app/footer'

export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [config, page] = await Promise.all([
    getConfig(),
    getPage(slug),
  ])
  if (!page) return { title: 'Not Found' }
  return {
    title: `${page.title} — ${config.site.title}`,
  }
}

export default async function CustomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [config, page] = await Promise.all([
    getConfig(),
    getPage(slug),
  ])
  if (!page) notFound()

  const html = await renderMarkdown(page.content)

  return (
    <main className="min-h-screen">
      <CustomPageHeader title={page.title} slug={slug} />

      <div className="max-w-[800px] mx-auto px-4 md:px-6">
        <div className="terminal-window mb-16">
          <div className="terminal-titlebar">
            <div className="flex gap-2">
              <span className="terminal-dot terminal-dot-red" />
              <span className="terminal-dot terminal-dot-yellow" />
              <span className="terminal-dot terminal-dot-green" />
            </div>
            <span className="terminal-title">
              {slug}.md — {config.site.title}
            </span>
            <div className="w-[52px]" />
          </div>
          <div
            className="prose prose-invert max-w-none text-body leading-body p-6 md:p-8"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>

      <Footer />
    </main>
  )
}
