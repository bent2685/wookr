import { getConfig, getTags } from '@/lib/config'

export const dynamic = 'force-dynamic'

export default async function TagsPage() {
  const [config, tagMap] = await Promise.all([
    getConfig(),
    getTags(),
  ])
  const tags = [...tagMap.entries()].sort((a, b) => b[1] - a[1])

  return (
    <main className="min-h-screen">
      <section className="py-[var(--spacing-section)] max-w-[1280px] mx-auto px-6">
        <h1 className="text-display-md font-display tracking-display-md leading-display-md text-on-dark mb-8">
          标签
        </h1>
        <div className="flex flex-wrap gap-3">
          {tags.map(([tag, count]) => (
            <a
              key={tag}
              href={`/tags/${tag}`}
              className="px-4 py-2 bg-surface-card rounded-md border border-hairline hover:border-primary text-on-dark transition-colors"
            >
              <span className="text-body-md font-title-sm">{tag}</span>
              <span className="text-caption text-muted ml-2">{count}</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}