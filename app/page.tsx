import { getConfig, getFeaturedPosts, getPosts } from '@/lib/config'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const config = await getConfig()
  const [featured, posts] = await Promise.all([
    getFeaturedPosts(),
    getPosts(),
  ])

  return (
    <main className="min-h-screen">
      {featured.length > 0 && (
        <section className="py-[var(--spacing-section)] max-w-[1280px] mx-auto px-6">
          <h2 className="text-display-md font-display tracking-display-md leading-stat-display text-on-dark mb-8">
            精选
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((post) => (
              <a
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="block bg-surface-card rounded-lg p-8 border border-hairline hover:border-hairline-strong transition-colors"
              >
                {post.frontmatter.cover && (
                  <div className="mb-4 aspect-video bg-surface-elevated rounded-md overflow-hidden">
                    <img
                      src={post.frontmatter.cover}
                      alt={post.frontmatter.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h3 className="text-title-md font-title-md text-on-dark tracking-title-md leading-title-md">
                  {post.frontmatter.title}
                </h3>
                {post.frontmatter.excerpt && (
                  <p className="text-body text-body mt-3 leading-body">{post.frontmatter.excerpt}</p>
                )}
                <div className="flex items-center gap-2 mt-4">
                  {post.frontmatter.tags?.map((tag) => (
                    <span key={tag} className="text-caption text-muted px-2 py-0.5 bg-surface-elevated rounded-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      <section className="py-[var(--spacing-section)] max-w-[1280px] mx-auto px-6">
        <h2 className="text-display-md font-display tracking-display-md leading-stat-display text-on-dark mb-8">
          所有文章
        </h2>
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
              {post.frontmatter.excerpt && (
                <p className="text-body text-body mt-2 leading-body">{post.frontmatter.excerpt}</p>
              )}
            </a>
          ))}
        </div>
      </section>

      <footer className="py-16 border-t border-hairline">
        <div className="max-w-[1280px] mx-auto px-6 text-center text-muted">
          <p>Powered by Wookr</p>
        </div>
      </footer>
    </main>
  )
}