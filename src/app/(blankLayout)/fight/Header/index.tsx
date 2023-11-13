/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-09-27 17:44:05
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-11-09 22:30:43
 */
'use client'
import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import request from '@/utils/request'
import styles from './index.module.scss'
const example = [
  {
    f1: 2,
    f2: 3053.28,
    f3: 0.03,
    f4: 0.91,
    f6: 388556747091.5,
    f12: '000001',
    f13: 1,
    f104: 702,
    f105: 1489,
    f106: 102,
  },
  {
    f1: 2,
    f2: 10032.09,
    f3: -0.2,
    f4: -20,
    f6: 573888744682.0614,
    f12: '399001',
    f13: 0,
    f104: 690,
    f105: 2069,
    f106: 107,
  },
  {
    f1: 2,
    f2: 2018.38,
    f3: -0.23,
    f4: -4.75,
    f6: 278698584196.97,
    f12: '399006',
    f13: 0,
    f104: 306,
    f105: 994,
    f106: 25,
  },
]

const STOCKS = ['000001', '399001', '399006']

export default function Header() {
  const [list, setList] = useState<any>([])
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [weekday, setWeekday] = useState('')

  useEffect(() => {
    getRealtime()
    const timer = setInterval(() => {
      getRealtime()
    }, 6000)

    const time = setInterval(() => {
      updateTime()
    }, 1000)

    return () => {
      clearInterval(timer)
      clearInterval(time)
    }
  }, [])

  // 更新时间
  const updateTime = () => {
    const now = dayjs()
    const date = now.format('YYYY-MM-DD')
    const time = now.format(' HH:mm:ss')
    const weekday = now.format('dddd')
    const weekdayMap: any = {
      Monday: '星期一',
      Tuesday: '星期二',
      Wednesday: '星期三',
      Thursday: '星期四',
      Friday: '星期五',
      Saturday: '星期六',
      Sunday: '星期日',
    }

    const weekDayText = weekdayMap[weekday]

    setDate(date)
    setTime(time)
    setWeekday(weekDayText)
  }

  // 获取实时指数数据
  const getRealtime = () => {
    request
      .get(`/allStock/indexRealtime`, {})
      .then((response) => {
        const {
          data: { diff },
        } = response
        setList(diff)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <i className={`leeks leeks-leek ${styles.logo}`} />
        <div className={styles.title}> X X 作战中心</div>
      </div>
      <div className={styles.right}>
        <div className={styles.list}>
          {list.map((item: any) => {
            let name = ''
            switch (item.f12) {
              case `${STOCKS[0]}`:
                name = '上证指数'
                break
              case `${STOCKS[1]}`:
                name = '深成指数'
                break
              case `${STOCKS[2]}`:
                name = '创业板指'
                break
            }
            return (
              <div key={item.symbol} className={styles.item}>
                <div className={styles.label}>{name}</div>
                <div
                  className={`${styles.total} ${
                    item.f3 > 0 ? styles.up : styles.down
                  }`}
                >
                  {item.f2}
                </div>
                <div className={item.f3 > 0 ? styles.up : styles.down}>
                  <span className={styles.range}>
                    {item.f3 > 0 && '+'}
                    {item.f4}
                  </span>
                  <span className={styles.percent}>({item.f3}%)</span>
                </div>
              </div>
            )
          })}
        </div>
        <div className={styles.date}>
          <div className={styles.day}>{date}</div>
          <div className={styles.time}>{time}</div>
          <div className={styles.time}>{weekday}</div>
        </div>
      </div>
    </div>
  )
}
