import { getConfig, getPost } from '@/lib/config'
import { renderMarkdown } from '@/lib/markdown'
import { notFound } from 'next/navigation'
import { PostHeader } from './post-header'
import { Footer } from '@/app/footer'

export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const config = await getConfig()
  const post = await getPost(slug)
  if (!post) return { title: 'Not Found' }
  return {
    title: `${post.frontmatter.title} — ${config.site.title}`,
    description: post.frontmatter.excerpt,
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [config, post] = await Promise.all([
    getConfig(),
    getPost(slug),
  ])
  if (!post) notFound()

  const html = await renderMarkdown(post.content)

  return (
    <article className="min-h-screen">
      <PostHeader
        title={post.frontmatter.title}
        date={post.frontmatter.date}
        category={post.frontmatter.category}
        tags={post.frontmatter.tags}
        siteTitle={config.site.title}
      />

      <div className="max-w-[800px] mx-auto px-4 md:px-6">
        {/* Terminal window wrapper for content */}
        <div className="terminal-window mb-16">
          <div className="terminal-titlebar">
            <div className="flex gap-2">
              <span className="terminal-dot terminal-dot-red" />
              <span className="terminal-dot terminal-dot-yellow" />
              <span className="terminal-dot terminal-dot-green" />
            </div>
            <span className="terminal-title">
              {slug}.md — {config.site.title}
            </span>
            <div className="w-[52px]" />
          </div>
          <div
            className="prose prose-invert max-w-none text-body leading-body p-6 md:p-8"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>

      <Footer />
    </article>
  )
}
