export interface SiteConfig {
  title: string
  description: string
  author: string
}

export interface BlogConfig {
  site: SiteConfig
  nav: string[]
  posts: {
    per_page: number
  }
}

export interface PostFrontmatter {
  title: string
  date: string
  tags?: string[]
  category?: string
  excerpt?: string
  cover?: string
  draft?: boolean
  featured?: boolean
}

export interface Post {
  slug: string
  frontmatter: PostFrontmatter
  content: string
}

export interface PageEntry {
  slug: string
  title: string
  source: string
}

export interface PageIndex {
  [key: string]: PageEntry
}

export interface Page {
  slug: string
  title: string
  content: string
}

export interface GithubFile {
  name: string
  path: string
  sha: string
  size: number
  url: string
  html_url: string
  git_url: string
  download_url: string | null
  type: 'file' | 'dir'
}

export interface GithubContent {
  name: string
  path: string
  sha: string
  size: number
  url: string
  html_url: string
  git_url: string
  download_url: string | null
  type: 'file' | 'dir'
  encoding?: string
  content?: string
}