import { getConfig, getPostsByTag } from '@/lib/config'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  const [config, posts] = await Promise.all([
    getConfig(),
    getPostsByTag(decodeURIComponent(tag)),
  ])
  if (posts.length === 0) notFound()

  return (
    <main className="min-h-screen">
      <section className="py-[var(--spacing-section)] max-w-[1280px] mx-auto px-6">
        <h1 className="text-display-md font-display tracking-display-md leading-display-md text-on-dark mb-2">
          标签
        </h1>
        <p className="text-body text-muted mb-8">{decodeURIComponent(tag)}</p>
        <div className="space-y-6">
          {posts.map((post) => (
            <a
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="block bg-surface-card rounded-lg p-8 border border-hairline hover:border-hairline-strong transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <time className="text-caption text-muted">
                  {new Date(post.frontmatter.date).toLocaleDateString('zh-CN')}
                </time>
                {post.frontmatter.category && (
                  <span className="text-caption-uppercase text-primary tracking-caption-uppercase">
                    {post.frontmatter.category}
                  </span>
                )}
              </div>
              <h3 className="text-title-lg font-title-lg text-on-dark tracking-title-lg leading-title-lg">
                {post.frontmatter.title}
              </h3>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}