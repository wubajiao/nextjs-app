/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-09-27 14:59:23
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-11-03 11:14:54
 */
'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import LoginModal from '@/components/LoginModal'

import styles from './index.module.scss'
export default function Header() {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  return (
    <div className={`${styles.header}`}>
      <div className={styles.navWrap}>
        <div className={styles.left}>
          <Link href="/">
            <div className={`${styles.logo}`}>leeks</div>
          </Link>
        </div>
        <div className={styles.right}>
          <div className={styles.nav}>
            {[
              { name: '首页', link: '/home' },
              { name: '韭菜导航', link: '/hao' },
              { name: '老九作战中心', link: '/fight', target: '_blank' },
            ].map((item) => {
              return (
                <Link
                  key={item.link}
                  href={item.link}
                  // legacyBehavior
                  target={item.target ? item.target : '_self'}
                >
                  <div className={styles.item}>{item.name}</div>
                </Link>
              )
            })}
          </div>
          <div className={styles.login} onClick={() => setModalOpen(true)}>
            登录
          </div>
        </div>
      </div>
      <LoginModal
        open={modalOpen}
        setOpen={(value: boolean) => setModalOpen(value)}
      />
    </div>
  )
}
