/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-09-27 17:44:05
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-11-03 23:57:03
 */
'use client'
import React, { useState, useEffect } from 'react'
import request from '@/utils/request'
import { Divider } from '@nextui-org/react'
import styles from './index.module.scss'
import Panel from '../components/Panel'
import Icon from '../components/Icon'
import Title from '../components/Title'

export default function ContentRight() {
  const [hotStocks, setHotstocks] = useState<any>([])
  const [telegrams, setTelegrams] = useState<any>([])

  useEffect(() => {
    gethotStocks()
    getTelegrams()
    const timer = setInterval(() => {
      gethotStocks()
    }, 60 * 1000)

    const timerTelegrams = setInterval(() => {
      getTelegrams()
    }, 30 * 1000)

    return () => {
      clearInterval(timer)
      clearInterval(timerTelegrams)
    }
  }, [])

  // 获取热股 - 沪深type=12
  const gethotStocks = () => {
    request
      .get(`/allStock/hotStock?size=8&type=12`)
      .then((response) => {
        const { data } = response
        setHotstocks(data?.items || [])
      })
      .catch((error) => {
        console.error(error)
      })
  }

  // 获取电报列表
  const getTelegrams = () => {
    request
      .get(`/telegram/list?pageNum=1&pageSize=20`)
      .then((response) => {
        const { data } = response
        setTelegrams(data?.list || [])
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div className={styles.contentRight}>
      <Panel className={styles.hot}>
        <Title name="热股" style={{ marginBottom: 24 }}></Title>
        {hotStocks.map((item: any, index: number) => {
          return (
            <div key={item.code} className={styles.hotItem}>
              <div className={`${styles.index} ${index < 3 && styles.up}`}>
                {index + 1}
              </div>
              <div className={styles.name}>{item.name}</div>
              <Icon
                type={item.increment > 0 ? 'arrowup' : 'arrowdown'}
                className={`${item.increment > 0 && styles.up} ${
                  item.increment < 0 && styles.down
                } ${item.increment === 0 && styles.normal}`}
              />
              <div
                className={`${styles.value} ${
                  item.increment > 0 && styles.up
                } ${item.increment < 0 && styles.down} ${
                  item.increment === 0 && styles.normal
                }`}
              >
                {item.value}
              </div>
            </div>
          )
        })}
      </Panel>
      <Panel className={styles.newsWrap}>
        <Title name="快讯"></Title>
        <div className={styles.news}>
          {telegrams.map((item: any) => {
            return (
              <div key={item.id} className={styles.newItem}>
                <div className={styles.time}>
                  {item.publishTime.slice(11, 19)}
                </div>
                <div>
                  <span className={styles.title}>【{item.title}】</span>
                  <span className={styles.content}>{item.content}</span>
                </div>
              </div>
            )
          })}
          <div></div>
        </div>
      </Panel>
    </div>
  )
}
