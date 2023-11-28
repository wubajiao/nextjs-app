/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-09-27 14:59:23
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-11-28 23:04:51
 */
'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LoginModal from '@/components/LoginModal'
import styles from './index.module.scss'
export default function Header() {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [scroll, setScroll] = useState<boolean>(false)
  const [scrollHeight, setScrollHeight] = useState<number>(0)

  const pathname = usePathname()

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (scrollHeight > 40) {
      setScroll(true)
    } else {
      setScroll(false)
    }
  }, [scrollHeight])

  const handleScroll = () => {
    const height = window.scrollY
    setScrollHeight(height)
  }

  return (
    <div className={`${styles.header} ${scroll && styles.scroll}`}>
      <div className={styles.navWrap}>
        <div className={styles.left}>
          <Link href="/" className={styles.wrap}>
            <i className={`leeks leeks-leek ${styles.logo}`} />
            <div className={`${styles.name}`}>久财</div>
          </Link>
        </div>
        <div className={styles.right}>
          <div className={styles.nav}>
            {[
              { name: '首页', link: '/' },
              { name: '金韭导航', link: '/hao' },
              { name: '老韭作战中心', link: '/fight', target: '_blank' },
              { name: '关于', link: '/about' },
            ].map((item) => {
              return (
                <Link
                  key={item.link}
                  href={item.link}
                  // legacyBehavior
                  target={item.target ? item.target : '_self'}
                >
                  <div
                    className={`${styles.item} ${
                      pathname === item.link ? styles.active : ''
                    }`}
                  >
                    {item.name}
                  </div>
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
