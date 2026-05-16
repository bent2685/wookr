import { getConfig, getPageIndex } from '@/lib/config'

export async function TopNav() {
  const [config, pageIndex] = await Promise.all([
    getConfig(),
    getPageIndex().catch(() => ({})),
  ])
  const navItems = config.nav.map((key) => {
    const page = (pageIndex as Record<string, { slug: string; title: string; source: string }> | undefined)?.[key]
    return page ? { key, title: page.title, href: `/${page.slug}` } : null
  }).filter(Boolean) as { key: string; title: string; href: string }[]

  return (
    <nav className="h-16 border-b border-hairline flex items-center px-6 max-w-[1280px] mx-auto w-full">
      <a href="/" className="text-on-dark font-bold text-title-lg mr-8">
        {config.site.title}
      </a>
      <div className="flex items-center gap-6">
        {navItems.map((item) => (
          <a
            key={item.key}
            href={item.href}
            className="text-nav-link font-nav-link hover:text-primary transition-colors"
          >
            {item.title}
          </a>
        ))}
      </div>
    </nav>
  )
}