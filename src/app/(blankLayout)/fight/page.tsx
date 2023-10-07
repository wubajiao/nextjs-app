/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-09-27 12:01:56
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-10-06 12:40:45
 */
'use client'
import React, { useEffect } from 'react'
import Header from './Header'
import ContentLeft from './ContentLeft'
import styles from './page.module.scss'
import autofit from 'autofit.js'

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
      ignore: [],
    })
  }

  return (
    <div className={styles.fightPage}>
      <Header />
      <div className={styles.content}>
        <ContentLeft />
      </div>
    </div>
  )
}

export default Leeks
