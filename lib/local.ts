import { readdirSync, readFileSync, existsSync } from 'fs'
import { join } from 'path'

const EXAMPLE_DIR = join(process.cwd(), 'example')

function resolve(path: string): string {
  return join(EXAMPLE_DIR, path)
}

export function readFileContent(path: string): string {
  const fullPath = resolve(path)
  if (!existsSync(fullPath)) {
    throw new Error(`Local file not found: ${path}`)
  }
  return readFileSync(fullPath, 'utf-8')
}

export function readDirectory(path: string): { name: string; path: string; type: string }[] {
  const fullPath = resolve(path)
  if (!existsSync(fullPath)) {
    throw new Error(`Local directory not found: ${path}`)
  }
  return readdirSync(fullPath, { withFileTypes: true }).map((d) => ({
    name: d.name,
    path: `${path}/${d.name}`,
    type: d.isDirectory() ? 'dir' : 'file',
  }))
}

export function buildLocalUrl(postSlug: string, imagePath: string): string {
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }
  if (imagePath.startsWith('/')) {
    return `/example${imagePath}`
  }
  return `/example/posts/${postSlug}/${imagePath}`
}