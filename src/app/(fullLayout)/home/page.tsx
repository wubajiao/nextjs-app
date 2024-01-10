/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-09-27 12:01:56
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2024-01-10 22:03:51
 */
import type { Metadata } from 'next'
import React from 'react'
import Image from 'next/image'
import styles from './index.module.scss'
import bannerImg from '../assets/images/banner.png'

export const metadata: Metadata = {
  title: '久财科技-首页',
  description: '久财科技，专业、实时、准确、全面的金融数据服务平台',
  keywords: [
    '久财科技官网',
    '久财科技首页',
    '深圳市久财科技有限公司官网',
    '深圳市久财科技官网',
  ],
}

function home() {
  return (
    <div className={styles.home}>
      <div className={styles.banner}>
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={`${styles.slogon}`}>要久财，勿韭菜</div>
            <div className={styles.tags}>
              专业、实时、准确、全面的金融数据服务平台
            </div>
            <div className={styles.action}>
              {/* <div className={styles.start}>开始使用</div> */}
              {/* <div className={styles.start}>在线体验</div> */}
            </div>
          </div>
          <div className={styles.right}>
            <Image src={bannerImg} alt="" width={600} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default home
