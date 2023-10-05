/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-09-27 17:44:05
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-09-28 16:18:54
 */
'use client'
import React from 'react'
import { Divider } from '@nextui-org/react'
import styles from './Header.module.scss'
const list = [
  { label: '上证指数', total: 3053.22, percent: -0.7, range: -17.8 },
  { label: '深成指数', total: 3053.22, percent: 0.7, range: 17.8 },
  { label: '创业板指', total: 3053.22, percent: -0.7, range: -17.8 },
]

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <i className={`leeks leeks-leek ${styles.logo}`} />
        <div className={styles.title}> X X 作战中心</div>
      </div>
      <div className={styles.right}>
        <div className={styles.list}>
          {list.map((item) => {
            return (
              <div key={item.label} className={styles.item}>
                <div className={styles.label}>{item.label}</div>
                <div className={`${styles.total} ${item.percent > 0 ? styles.up : styles.down}`}>
                  {item.total}
                </div>
                <div className={item.percent > 0 ? styles.up : styles.down}>
                  <span className={styles.range}>{item.range}</span>
                  <span className={styles.percent}>({item.percent}%)</span>
                </div>
              </div>
            )
          })}
        </div>
        <Divider orientation="vertical" className={styles.divider} />
        <div className={styles.date}>
          <div className={styles.day}>2023.10.10</div>
          <div className={styles.time}>10:20:39</div>
        </div>
      </div>
    </div>
  )
}
