import { getConfig, getTags } from '@/lib/config'
import { PageTransition } from '@/components/page-transition'
import { Footer } from '@/app/footer'

export const revalidate = 60

export default async function TagsPage() {
  const [config, tagMap] = await Promise.all([
    getConfig(),
    getTags(),
  ])
  const tags = [...tagMap.entries()].sort((a, b) => b[1] - a[1])

  return (
    <main className="min-h-screen">
      <PageTransition>
        <section className="py-12 md:py-16 max-w-[1280px] mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 font-mono text-xs text-muted-soft mb-4">
              <span className="text-accent-emerald">$</span>
              <span className="text-muted">ls</span>
              <span className="text-primary/70">tags/</span>
            </div>
            <h1 className="font-mono text-display-sm md:text-display-md font-bold text-on-dark tracking-display-md leading-tight">
              <span className="text-primary mr-3 opacity-50">#</span>
              标签
            </h1>
            <p className="font-mono text-sm text-muted mt-3">
              <span className="text-accent-emerald">$</span>{' '}
              共 <span className="text-primary">{tags.length}</span> 个标签
            </p>
          </div>

          {/* Tag cloud */}
          <div className="flex flex-wrap gap-2">
            {tags.map(([tag, count]) => (
              <a
                key={tag}
                href={`/tags/${tag}`}
                className="tag-terminal group flex items-center gap-2 px-3 py-1.5 hover:bg-primary/5"
              >
                <span className="text-muted-soft group-hover:text-primary transition-colors">#</span>
                <span className="text-on-dark group-hover:text-primary transition-colors">{tag}</span>
                <span className="text-muted-soft text-[0.6rem]">({count})</span>
              </a>
            ))}
          </div>
        </section>
      </PageTransition>

      <Footer />
    </main>
  )
}
