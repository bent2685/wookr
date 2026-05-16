import yaml from 'js-yaml'
import * as cache from './cache'
import * as github from './github'
import * as local from './local'
import type { BlogConfig, PageIndex, PageEntry, Post, PostFrontmatter, Page } from './types'
import matter from 'gray-matter'

const CACHE_KEY_CONFIG = 'config'
const CACHE_KEY_POSTS = 'posts'
const CACHE_KEY_TAGS = 'tags'
const CACHE_KEY_CATEGORIES = 'categories'
const CACHE_KEY_PAGE_INDEX = 'page_index'
const CACHE_KEY_PAGE_PREFIX = 'page:'
const CACHE_KEY_HTML_PREFIX = 'html:'
const CACHE_KEY_MODE = 'mode'

type DataSourceMode = 'github' | 'local'

function getMode(): DataSourceMode {
  const cached = cache.get<DataSourceMode>(CACHE_KEY_MODE)
  if (cached) return cached
  const mode = process.env.GITHUB_REPO ? 'github' : 'local'
  cache.set(CACHE_KEY_MODE, mode)
  return mode
}

function getRepo(): string {
  return process.env.GITHUB_REPO!
}

function getBranch(): string {
  return process.env.GITHUB_BRANCH || 'main'
}

let configMemo: BlogConfig | null = null

export async function getConfig(): Promise<BlogConfig> {
  if (configMemo) return configMemo
  const cached = cache.get<BlogConfig>(CACHE_KEY_CONFIG)
  if (cached) {
    configMemo = cached
    return cached
  }
  const mode = getMode()
  let raw: string
  if (mode === 'local') {
    raw = local.readFileContent('config.yaml')
  } else {
    raw = await github.fetchFileContent(getRepo(), 'config.yaml', getBranch())
  }
  const config = yaml.load(raw) as BlogConfig
  cache.set(CACHE_KEY_CONFIG, config)
  configMemo = config
  return config
}

export async function getPageIndex(): Promise<PageIndex> {
  const cached = cache.get<PageIndex>(CACHE_KEY_PAGE_INDEX)
  if (cached) return cached
  const mode = getMode()
  let raw: string
  if (mode === 'local') {
    raw = local.readFileContent('pages/index.json')
  } else {
    raw = await github.fetchFileContent(getRepo(), 'pages/index.json', getBranch())
  }
  const index = JSON.parse(raw) as PageIndex
  cache.set(CACHE_KEY_PAGE_INDEX, index)
  return index
}

export async function getPosts(): Promise<Post[]> {
  const cached = cache.get<Post[]>(CACHE_KEY_POSTS)
  if (cached) return cached
  const mode = getMode()
  let dirs: { name: string; path: string; type: string }[]
  if (mode === 'local') {
    dirs = local.readDirectory('posts')
  } else {
    dirs = await github.fetchDirectory(getRepo(), 'posts', getBranch())
  }
  const postDirs = dirs.filter((d) => d.type === 'dir')
  const posts = await Promise.all(
    postDirs.map(async (d) => {
      try {
        let raw: string
        if (mode === 'local') {
          raw = local.readFileContent(`${d.path}/index.md`)
        } else {
          raw = await github.fetchFileContent(getRepo(), `${d.path}/index.md`, getBranch())
        }
        const { data, content } = matter(raw)
        const frontmatter = data as PostFrontmatter
        return { slug: d.name, frontmatter, content } satisfies Post
      } catch {
        return null
      }
    }),
  )
  const validPosts = posts.filter((p): p is Post => p !== null && !p.frontmatter.draft)
  validPosts.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
  cache.set(CACHE_KEY_POSTS, validPosts)
  return validPosts
}

export async function getPost(slug: string): Promise<Post | null> {
  const posts = await getPosts()
  return posts.find((p) => p.slug === slug) ?? null
}

export async function getFeaturedPosts(): Promise<Post[]> {
  const posts = await getPosts()
  return posts.filter((p) => p.frontmatter.featured)
}

export async function getTags(): Promise<Map<string, number>> {
  const cached = cache.get<Map<string, number>>(CACHE_KEY_TAGS)
  if (cached) return cached
  const posts = await getPosts()
  const tagMap = new Map<string, number>()
  for (const post of posts) {
    for (const tag of post.frontmatter.tags ?? []) {
      tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1)
    }
  }
  cache.set(CACHE_KEY_TAGS, tagMap)
  return tagMap
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getPosts()
  return posts.filter((p) => p.frontmatter.tags?.includes(tag))
}

export async function getCategories(): Promise<Map<string, number>> {
  const cached = cache.get<Map<string, number>>(CACHE_KEY_CATEGORIES)
  if (cached) return cached
  const posts = await getPosts()
  const catMap = new Map<string, number>()
  for (const post of posts) {
    const cat = post.frontmatter.category
    if (cat) {
      catMap.set(cat, (catMap.get(cat) ?? 0) + 1)
    }
  }
  cache.set(CACHE_KEY_CATEGORIES, catMap)
  return catMap
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const posts = await getPosts()
  return posts.filter((p) => p.frontmatter.category === category)
}

export async function getPage(slug: string): Promise<Page | null> {
  const cacheKey = `${CACHE_KEY_PAGE_PREFIX}${slug}`
  const cached = cache.get<Page>(cacheKey)
  if (cached) return cached
  const pageIndex = await getPageIndex()
  const entry = pageIndex[slug] as PageEntry | undefined
  if (!entry) return null
  const mode = getMode()
  let raw: string
  if (mode === 'local') {
    raw = local.readFileContent(`pages/${entry.source}`)
  } else {
    raw = await github.fetchFileContent(getRepo(), `pages/${entry.source}`, getBranch())
  }
  const { content } = matter(raw)
  const page: Page = { slug: entry.slug, title: entry.title, content }
  cache.set(cacheKey, page)
  return page
}

export async function getCachedHtml(key: string): Promise<string | null> {
  return cache.get<string>(`${CACHE_KEY_HTML_PREFIX}${key}`)
}

export async function setCachedHtml(key: string, html: string): Promise<void> {
  cache.set(`${CACHE_KEY_HTML_PREFIX}${key}`, html)
}

export function resolveImageUrl(postSlug: string, imagePath: string): string {
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }
  const mode = getMode()
  if (mode === 'local') {
    return local.buildLocalUrl(postSlug, imagePath)
  }
  const relativePath = imagePath.startsWith('/')
    ? imagePath.slice(1)
    : `posts/${postSlug}/${imagePath}`
  return github.buildRawUrl(getRepo(), getBranch(), relativePath)
}
