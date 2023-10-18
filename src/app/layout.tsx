/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-09-27 10:13:32
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-10-11 15:31:43
 */
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import StyledComponentsRegistry from '../lib/AntdRegistry'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'leeks App',
  description: '久财智数，韭菜科技',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* iconfont字体图标 */}
        <link
          href="//at.alicdn.com/t/c/font_4271386_ccfzxxlom8e.css"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <ConfigProvider
            locale={zhCN}
            theme={{
              token: {
                // Seed Token，影响范围大
                // colorPrimary: '#00b96b',
                borderRadius: 2,
              },
            }}
          >
            {children}
          </ConfigProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
