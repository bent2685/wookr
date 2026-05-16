import { getConfig, getPost } from '@/lib/config'
import { renderMarkdown } from '@/lib/markdown'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const config = await getConfig()
  const post = await getPost(slug)
  if (!post) return { title: 'Not Found' }
  return {
    title: `${post.frontmatter.title} — ${config.site.title}`,
    description: post.frontmatter.excerpt,
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [config, post] = await Promise.all([
    getConfig(),
    getPost(slug),
  ])
  if (!post) notFound()

  const html = await renderMarkdown(post.content)

  return (
    <article className="min-h-screen">
      <header className="py-[var(--spacing-section)] max-w-[768px] mx-auto px-6">
        <div className="flex items-center gap-3 mb-4">
          <time className="text-caption text-muted">
            {new Date(post.frontmatter.date).toLocaleDateString('zh-CN')}
          </time>
          {post.frontmatter.category && (
            <span className="text-caption-uppercase text-primary tracking-caption-uppercase">
              {post.frontmatter.category}
            </span>
          )}
        </div>
        <h1 className="text-display-md font-display tracking-display-md leading-display-md text-on-dark">
          {post.frontmatter.title}
        </h1>
        {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
          <div className="flex items-center gap-2 mt-4">
            {post.frontmatter.tags.map((tag) => (
              <a
                key={tag}
                href={`/tags/${tag}`}
                className="text-caption text-muted px-2 py-0.5 bg-surface-elevated rounded-pill hover:text-primary transition-colors"
              >
                {tag}
              </a>
            ))}
          </div>
        )}
      </header>

      <div
        className="prose prose-invert max-w-[768px] mx-auto px-6 pb-[var(--spacing-section)] text-body leading-body font-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <footer className="py-16 border-t border-hairline">
        <div className="max-w-[1280px] mx-auto px-6 text-center text-muted">
          <p>Powered by Wookr</p>
        </div>
      </footer>
    </article>
  )
}