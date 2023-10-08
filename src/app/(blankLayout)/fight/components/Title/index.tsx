/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-09-27 17:44:05
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-10-08 21:23:20
 */
import React from 'react'
import styles from './index.module.scss'

export default function Title({ name, children, ...otherProps }: any) {
  return (
    <div className={styles.title} {...otherProps}>
      <div className={styles.left}>{name}</div>
      {children}
    </div>
  )
}
