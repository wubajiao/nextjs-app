/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-09-27 10:13:32
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2024-03-20 15:10:15
 */
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '久财科技',
  description: '久财科技，专业、实时、准确、全面的金融数据服务平台',
  keywords: [
    '久财科技',
    '深圳市久财科技有限公司',
    '深圳市久财科技',
    '炒股大屏',
    '炒股大屏监控',
    '炒股监控大屏',
    '多屏合一',
    '金融数据平台',
    '股票数据',
    '股票接口',
  ],
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
          href="//at.alicdn.com/t/c/font_4271386_yyfusqnd37k.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
        {/* 360站长工具验证 */}
        {process.env.NODE_ENV === 'production' && (
          <meta
            name="360-site-verification"
            content="ea34b5a7ea3fee4c7852c47dc329b391"
          />
        )}
        {/* 搜狗搜索站长工具验证 */}
        {process.env.NODE_ENV === 'production' && (
          <meta name="sogou_site_verification" content="wumIDo1MEg" />
        )}
        {/* 生产环境再引入百度统计 */}
        {process.env.NODE_ENV === 'production' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
            var _hmt = _hmt || [];
            (function () {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?89261032393e59fdc3edd28d46a88756";
              var s = document.getElementsByTagName("script")[0];
              s.parentNode.insertBefore(hm, s);
            })();
              `,
            }}
          />
        )}
      </head>
      <body className={inter.className}>
        <AntdRegistry>
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
        </AntdRegistry>
      </body>
    </html>
  )
}
