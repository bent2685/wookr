import { getConfig, getPageIndex } from '@/lib/config'
import { TopNavClient } from './top-nav-client'

export async function TopNav() {
  const [config, pageIndex] = await Promise.all([
    getConfig(),
    getPageIndex().catch(() => ({})),
  ])

  const navItems = config.nav.map((key) => {
    const page = (pageIndex as Record<string, { slug: string; title: string; source: string }> | undefined)?.[key]
    return page ? { key, title: page.title, href: `/${page.slug}` } : null
  }).filter(Boolean) as { key: string; title: string; href: string }[]

  return <TopNavClient siteTitle={config.site.title} navItems={navItems} />
}
