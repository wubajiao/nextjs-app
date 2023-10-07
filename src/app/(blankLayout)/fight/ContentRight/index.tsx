/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-09-27 17:44:05
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-10-07 18:08:09
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
]

export default function ContentRight() {
  return (
    <div className={styles.contentRight}>
      <Panel>1</Panel>
      <Panel>2</Panel>
    </div>
  )
}
