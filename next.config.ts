import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
      },
    ],
  },
  outputFileTracingRoot: undefined,
  env: {
    GITHUB_REPO: process.env.GITHUB_REPO,
    GITHUB_BRANCH: process.env.GITHUB_BRANCH,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  },
}

export default nextConfig