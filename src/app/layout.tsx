/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-09-27 10:13:32
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-10-11 11:48:31
 */
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import StyledComponentsRegistry from '../lib/AntdRegistry'

const inter = Inter({ subsets: ['latin'] })
import './globals.css'

export const metadata: Metadata = {
  title: 'leeks App',
  description: '久财智数，韭菜科技',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* iconfont字体图标 */}
        <link href="//at.alicdn.com/t/c/font_4271386_ccfzxxlom8e.css" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}
