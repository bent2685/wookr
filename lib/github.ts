const API_BASE = 'https://api.github.com'
const RAW_BASE = 'https://raw.githubusercontent.com'

function getToken(): string | undefined {
  return process.env.GITHUB_TOKEN
}

function apiHeaders(): HeadersInit {
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

async function apiRequest<T>(url: string): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, { headers: apiHeaders() })
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
  const url = `${RAW_BASE}/${repo}/${branch}/${path}`
  const res = await fetch(url, {
    headers: { 'User-Agent': 'wookr' },
    next: { revalidate: 300 },
  })
  if (!res.ok) {
    throw new Error(`GitHub raw fetch error: ${res.status} ${res.statusText} — ${url}`)
  }
  return res.text()
}

export async function fetchDirectory(
  repo: string,
  path: string,
  branch: string,
): Promise<{ name: string; path: string; type: string }[]> {
  const data = await apiRequest<{ name: string; path: string; type: string }[]>(
    `/repos/${repo}/contents/${path}?ref=${branch}`,
  )
  return data
}

export function buildRawUrl(repo: string, branch: string, path: string): string {
  return `${RAW_BASE}/${repo}/${branch}/${path}`
}
