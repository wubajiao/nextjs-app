/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-09-27 17:44:05
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-10-06 12:06:36
 */
import React from 'react'
import styles from './index.module.scss'

export default function Panel({ children }: any) {
  return <div className={styles.panel}>{children}</div>
}
