import { getConfig, getPage } from '@/lib/config'
import { renderMarkdown } from '@/lib/markdown'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

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
      <article className="py-[var(--spacing-section)] max-w-[768px] mx-auto px-6">
        <h1 className="text-display-md font-display tracking-display-md leading-display-md text-on-dark mb-12">
          {page.title}
        </h1>
        <div
          className="prose prose-invert text-body leading-body font-body"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
    </main>
  )
}