/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-09-27 10:13:32
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-09-28 16:05:25
 */
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'leeks App',
  description: '久财智数，韭菜科技',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* iconfont字体图标 */}
        <link href="//at.alicdn.com/t/c/font_4271386_86k0m41le5r.css" rel="stylesheet" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
