import { getConfig, getPostsByTag } from '@/lib/config'
import { notFound } from 'next/navigation'
import { PageTransition } from '@/components/page-transition'
import { TagPostList } from './tag-post-list'
import { Footer } from '@/app/footer'

export const revalidate = 60

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const [config, posts] = await Promise.all([
    getConfig(),
    getPostsByTag(decodedTag),
  ])
  if (posts.length === 0) notFound()

  return (
    <main className="min-h-screen">
      <PageTransition>
        <section className="py-12 md:py-16 max-w-[1280px] mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 font-mono text-xs text-muted-soft mb-4">
              <span className="text-accent-emerald">$</span>
              <a href="/" className="hover:text-primary transition-colors">~</a>
              <span>/</span>
              <a href="/tags" className="hover:text-primary transition-colors text-muted">tags</a>
              <span>/</span>
              <span className="text-primary/70">{decodedTag}</span>
            </div>
            <h1 className="font-mono text-display-sm md:text-display-md font-bold text-on-dark tracking-display-md leading-tight">
              <span className="text-primary mr-3 opacity-50">#</span>
              {decodedTag}
            </h1>
            <p className="font-mono text-sm text-muted mt-3">
              <span className="text-accent-emerald">$</span>{' '}
              共 <span className="text-primary">{posts.length}</span> 篇文章
            </p>
          </div>

          {/* Post list */}
          <TagPostList posts={posts} />
        </section>
      </PageTransition>

      <Footer />
    </main>
  )
}
