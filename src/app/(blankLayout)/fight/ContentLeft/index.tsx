/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-09-27 17:44:05
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-10-11 12:05:34
 */
'use client'
import React from 'react'
import { Divider } from '@nextui-org/react'
import styles from './index.module.scss'
import Panel from '../components/Panel'
import Icon from '../components/Icon'
import Title from '../components/Title'

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
      <Panel className={`${styles.box} ${styles.boxTop} `}>
        <Title name="持仓">
          <div className={styles.right}>
            <Icon type="control" tooltipProps={{ title: '排序' }} />
            <Icon type="reload" tooltipProps={{ title: '刷新' }} />
            <Icon type="plus" tooltipProps={{ title: '添加持仓' }} />
          </div>
        </Title>
        <div className={styles.th}>
          <div>涨跌幅</div>
          <div>最新价</div>
          <div>名称</div>
          <div>持仓数</div>
          <div>持仓成本</div>
        </div>
        <div className={styles.tbody}>
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
      </Panel>
      <Panel className={`${styles.box} ${styles.boxBottom} `}>
        <Title name="自选">
          <div className={styles.right}>
            <Icon type="control" tooltipProps={{ title: '排序' }} />
            <Icon type="reload" tooltipProps={{ title: '刷新' }} />
            <Icon type="plus" tooltipProps={{ title: '添加自选' }} />
          </div>
        </Title>

        <div className={styles.th}>
          <div>涨跌幅</div>
          <div>最新价</div>
          <div>名称</div>
          <div>成交量</div>
        </div>
        <div className={styles.tbody}>
          {list.map((item) => {
            return (
              <div key={item.name} className={styles.tr}>
                <div className={item.percent > 0 ? styles.up : styles.down}>
                  {item.percent > 0 && '+'}
                  {item.percent}%
                </div>
                <div className={item.percent >= 0 ? styles.up : styles.down}>{item.current}</div>
                <div>{item.name}</div>
                <div>{item.holdNumber}手</div>
              </div>
            )
          })}
        </div>
      </Panel>
    </div>
  )
}
