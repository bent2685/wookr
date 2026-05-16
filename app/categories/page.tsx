import { getConfig, getCategories } from '@/lib/config'

export const dynamic = 'force-dynamic'

export default async function CategoriesPage() {
  const [config, catMap] = await Promise.all([
    getConfig(),
    getCategories(),
  ])
  const categories = [...catMap.entries()].sort((a, b) => b[1] - a[1])

  return (
    <main className="min-h-screen">
      <section className="py-[var(--spacing-section)] max-w-[1280px] mx-auto px-6">
        <h1 className="text-display-md font-display tracking-display-md leading-display-md text-on-dark mb-8">
          分类
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(([cat, count]) => (
            <a
              key={cat}
              href={`/categories/${cat}`}
              className="block bg-surface-card rounded-lg p-8 border border-hairline hover:border-primary transition-colors"
            >
              <h3 className="text-title-lg font-title-lg text-on-dark tracking-title-lg leading-title-lg">{cat}</h3>
              <p className="text-caption text-muted mt-2">{count} 篇文章</p>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}