/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-09-27 17:44:05
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-10-07 17:42:59
 */
'use client'
import React from 'react'
import { Divider } from '@nextui-org/react'
import styles from './ContentLeft.module.scss'
import Panel from './components/Panel'
import Icon from './components/Icon'
import Title from './components/Title'

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
        <div className={styles.box}>
          <Title name="持仓">
            <div className={styles.right}>
              <Icon type="control" />
              <Icon type="reload" />
              <Icon type="plus" />
            </div>
          </Title>
          <div className={styles.tbody}>
            <div className={styles.th}>
              <div>涨跌幅</div>
              <div>最新价</div>
              <div>名称</div>
              <div>持仓数</div>
              <div>持仓成本</div>
            </div>
            {list.map((item) => {
              return (
                <div key={item.name} className={styles.tr}>
                  <div className={item.percent > 0 ? styles.up : styles.down}>
                    {item.percent > 0 && '+'}
                    {item.percent}%
                  </div>
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
        <div className={styles.box}>
          <Title name="自选">
            <div className={styles.right}>
              <Icon type="control" />
              <Icon type="reload" />
              <Icon type="plus" />
            </div>
          </Title>
          <div className={styles.tbody}>
            <div className={styles.th}>
              <div>涨跌幅</div>
              <div>最新价</div>
              <div>名称</div>
              <div>持仓数</div>
              <div>持仓成本</div>
            </div>
            {list.map((item) => {
              return (
                <div key={item.name} className={styles.tr}>
                  <div className={item.percent > 0 ? styles.up : styles.down}>
                    {item.percent > 0 && '+'}
                    {item.percent}%
                  </div>
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
    </div>
  )
}
