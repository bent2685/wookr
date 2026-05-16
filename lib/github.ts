const BASE_URL = 'https://api.github.com'

function getToken(): string | undefined {
  return process.env.GITHUB_TOKEN
}

function headers(): HeadersInit {
  const h: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'wookr',
  }
  const token = getToken()
  if (token) {
    h.Authorization = `Bearer ${token}`
  }
  return h
}

async function request<T>(url: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${url}`, { headers: headers() })
  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText} — ${url}`)
  }
  return res.json()
}

export async function fetchFileContent(
  repo: string,
  path: string,
  branch: string,
): Promise<string> {
  const data = await request<{ content: string; encoding: string }>(
    `/repos/${repo}/contents/${path}?ref=${branch}`,
  )
  if (data.encoding === 'base64') {
    return Buffer.from(data.content.replace(/\n/g, ''), 'base64').toString('utf-8')
  }
  return data.content
}

export async function fetchDirectory(
  repo: string,
  path: string,
  branch: string,
): Promise<{ name: string; path: string; type: string }[]> {
  const data = await request<{ name: string; path: string; type: string }[]>(
    `/repos/${repo}/contents/${path}?ref=${branch}`,
  )
  return data
}

export function buildRawUrl(repo: string, branch: string, path: string): string {
  return `https://raw.githubusercontent.com/${repo}/${branch}/${path}`
}