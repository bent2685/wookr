import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { TopNav } from '@/components/top-nav'
import { CopyButtonScript } from '@/components/copy-button'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Wookr',
  description: 'A blog powered by GitHub repositories',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-canvas text-on-dark font-sans antialiased">
        <TopNav />
        <CopyButtonScript />
        {children}
      </body>
    </html>
  )
}