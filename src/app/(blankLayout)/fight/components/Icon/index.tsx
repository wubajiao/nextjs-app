/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-09-27 17:44:05
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-10-08 21:26:22
 */
import React from 'react'
import styles from './index.module.scss'

export default function Icon({ type, size = 16, className }: any) {
  return (
    <i className={`leeks leeks-${type} ${styles.icon} ${className}`} style={{ fontSize: size }} />
  )
}
