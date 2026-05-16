import { getConfig, getCategories } from '@/lib/config'
import { PageTransition } from '@/components/page-transition'
import { Footer } from '@/app/footer'

export const revalidate = 60

export default async function CategoriesPage() {
  const [config, catMap] = await Promise.all([
    getConfig(),
    getCategories(),
  ])
  const categories = [...catMap.entries()].sort((a, b) => b[1] - a[1])

  return (
    <main className="min-h-screen">
      <PageTransition>
        <section className="py-12 md:py-16 max-w-[1280px] mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 font-mono text-xs text-muted-soft mb-4">
              <span className="text-accent-emerald">$</span>
              <span className="text-muted">ls</span>
              <span className="text-primary/70">categories/</span>
            </div>
            <h1 className="font-mono text-display-sm md:text-display-md font-bold text-on-dark tracking-display-md leading-tight">
              <span className="text-primary mr-3 opacity-50">#</span>
              分类
            </h1>
            <p className="font-mono text-sm text-muted mt-3">
              <span className="text-accent-emerald">$</span>{' '}
              共 <span className="text-primary">{categories.length}</span> 个分类
            </p>
          </div>

          {/* Category grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map(([cat, count], i) => (
              <a
                key={cat}
                href={`/categories/${cat}`}
                className="card-terminal card-terminal-glow p-6 group block"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-xs text-accent-emerald">$</span>
                  <span className="font-mono text-xs text-muted-soft">cd</span>
                </div>
                <h3 className="font-mono text-base font-semibold text-on-dark group-hover:text-primary transition-colors">
                  {cat}
                </h3>
                <div className="flex items-center gap-2 mt-3 font-mono text-xs text-muted-soft">
                  <span className="text-primary/60">{count}</span>
                  <span>篇文章</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                    →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </PageTransition>

      <Footer />
    </main>
  )
}
