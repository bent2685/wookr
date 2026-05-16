import { getConfig, getFeaturedPosts, getPosts } from '@/lib/config'
import { HeroSection } from './hero-section'
import { PostList } from './post-list'
import { Footer } from './footer'

export const revalidate = 60

export default async function Home() {
  const config = await getConfig()
  const [featured, posts] = await Promise.all([
    getFeaturedPosts(),
    getPosts(),
  ])

  return (
    <main className="min-h-screen">
      <HeroSection siteTitle={config.site.title} description={config.site.description} />

      {featured.length > 0 && (
        <section className="py-16 md:py-24 max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-primary font-mono text-sm">❯</span>
            <h2 className="font-mono text-title-lg font-bold text-on-dark tracking-tight">
              featured
            </h2>
            <span className="text-muted-soft font-mono text-xs">({featured.length})</span>
            <div className="flex-1 h-px bg-hairline ml-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((post, i) => (
              <a
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="card-terminal card-terminal-glow p-6 group block"
              >
                {post.frontmatter.cover && (
                  <div className="mb-4 aspect-video bg-surface-elevated rounded-md overflow-hidden border border-hairline">
                    <img
                      src={post.frontmatter.cover}
                      alt={post.frontmatter.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                )}
                <div className="flex items-center gap-2 mb-3 text-xs font-mono text-muted-soft">
                  <span className="text-accent-emerald">$</span>
                  <span>
                    {new Date(post.frontmatter.date).toLocaleDateString('zh-CN')}
                  </span>
                </div>
                <h3 className="font-mono text-base font-semibold text-on-dark group-hover:text-primary transition-colors leading-snug">
                  {post.frontmatter.title}
                </h3>
                {post.frontmatter.excerpt && (
                  <p className="font-mono text-xs text-muted mt-2 leading-relaxed line-clamp-2">
                    {post.frontmatter.excerpt}
                  </p>
                )}
                {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 mt-4">
                    {post.frontmatter.tags.map((tag) => (
                      <span key={tag} className="tag-terminal">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </a>
            ))}
          </div>
        </section>
      )}

      <section className="py-16 md:py-24 max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-primary font-mono text-sm">❯</span>
          <h2 className="font-mono text-title-lg font-bold text-on-dark tracking-tight">
            all posts
          </h2>
          <span className="text-muted-soft font-mono text-xs">({posts.length})</span>
          <div className="flex-1 h-px bg-hairline ml-4" />
        </div>
        <PostList posts={posts} />
      </section>

      <Footer />
    </main>
  )
}
