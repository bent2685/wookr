const CACHE_TTL = 60_000

interface CacheEntry<T> {
  data: T
  timestamp: number
}

const cache = new Map<string, CacheEntry<unknown>>()

function isExpired(timestamp: number): boolean {
  return Date.now() - timestamp > CACHE_TTL
}

export function get<T>(key: string): T | null {
  const entry = cache.get(key)
  if (!entry) return null
  if (isExpired(entry.timestamp)) {
    cache.delete(key)
    return null
  }
  return entry.data as T
}

export function set<T>(key: string, data: T): void {
  cache.set(key, { data, timestamp: Date.now() })
}

export function invalidate(key: string): void {
  cache.delete(key)
}

export function invalidateAll(): void {
  cache.clear()
}

export function keys(): string[] {
  return [...cache.keys()]
}