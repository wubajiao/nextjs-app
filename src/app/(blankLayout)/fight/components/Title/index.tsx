/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-09-27 17:44:05
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-10-06 12:13:02
 */
import React from 'react'
import styles from './index.module.scss'

export default function Title({ name, children }: any) {
  return (
    <div className={styles.title}>
      <div className={styles.left}>{name}</div>
      {children}
    </div>
  )
}
