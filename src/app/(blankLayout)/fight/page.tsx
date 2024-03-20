/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-09-27 12:01:56
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2024-03-20 15:52:42
 */
'use client'
import React, { useEffect } from 'react'
import { ConfigProvider, theme } from 'antd'
import autofit from 'autofit.js'
import Header from './Header'
import ContentLeft from './ContentLeft'
import ContentCenter from './ContentCenter'
import ContentRight from './ContentRight'

import styles from './page.module.scss'

const Leeks = () => {
  useEffect(() => {
    handleAutofit()
  }, [])

  const handleAutofit = () => {
    autofit.init({
      el: '#app',
      dw: 1920,
      dh: 1080,
      resize: true,
      transition: 0,
      delay: 0,
      // ignore: ['#chart'],
    })
  }

  return (
    <div id="app" className={styles.fightPage}>
      <Header />
      <div className={styles.content}>
        <ContentLeft />
        <ContentCenter />
        <ContentRight />
      </div>
    </div>
  )
}

export default Leeks
