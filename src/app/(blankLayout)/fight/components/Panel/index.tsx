/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-09-27 17:44:05
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-10-08 12:22:43
 */
import React from 'react'
import styles from './index.module.scss'

export default function Panel({ children, className }: any) {
  return <div className={`${styles.panel} ${className}`}>{children}</div>
}
