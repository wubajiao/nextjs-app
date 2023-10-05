/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-09-27 17:44:05
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-10-05 23:31:58
 */
'use client'
import React from 'react'
import { Divider } from '@nextui-org/react'
import styles from './ContentLeft.module.scss'
import Panel from './Panel'
const list = [
  {
    name: '贵州茅台',
    current: 1842.22,
    percent: -0.71,
    range: -17.8,
    holdNumber: 20000,
    cost: 1842.22,
  },
  {
    name: '贵州茅台',
    current: 1842.22,
    percent: 0.71,
    range: 17.8,
    holdNumber: 20000,
    cost: 1842.22,
  },
  {
    name: '贵州茅台',
    current: 1842.22,
    percent: -0.72,
    range: -17.8,
    holdNumber: 20000,
    cost: 1842.22,
  },
]

export default function Header() {
  return (
    <div className={styles.contentLeft}>
      <Panel>
        <div className={styles.top}>
          <div className={styles.head}>
            <div className={styles.left}>左</div>
            <div className={styles.right}>you</div>
          </div>
          <div className={styles.tbody}>
            <div className={styles.thead}>
              <div>涨跌幅</div>
              <div>最新价</div>
              <div>名称</div>
              <div>持仓数</div>
              <div>持仓成本</div>
            </div>
            {list.map((item) => {
              return (
                <div key={item.name}>
                  <div>{item.percent}</div>
                  <div>{item.current}</div>
                  <div>{item.name}</div>
                  <div>{item.holdNumber}</div>
                  <div>{item.cost}</div>
                </div>
              )
            })}
          </div>
        </div>
      </Panel>
      <Panel>
        <div className={styles.bottom}>下</div>
      </Panel>
    </div>
  )
}
