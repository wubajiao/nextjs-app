/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-09-27 17:44:05
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-11-01 22:40:53
 */
'use client'
import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import request from '@/utils/request'
import styles from './index.module.scss'
const example = [
  {
    symbol: 'SZ399001',
    current: 9863.8,
    percent: -0.65,
    chg: -64.19,
    timestamp: 1698735864000,
    volume: 45425317677,
    amount: 532043957570,
    market_capital: 31399821792788,
    float_market_capital: 10718549912440.8,
    turnover_rate: 2.02,
    amplitude: 1.13,
    open: 9924.72,
    last_close: 9927.99,
    high: 9927.45,
    low: 9814.98,
    avg_price: 9863.8,
    trade_volume: null,
    side: null,
    is_trade: false,
    level: 3,
    trade_session: null,
    trade_type: null,
    current_year_percent: -10.46,
    trade_unique_id: null,
    type: 12,
    bid_appl_seq_num: null,
    offer_appl_seq_num: null,
    volume_ext: null,
    traded_amount_ext: null,
    trade_type_v2: null,
    yield_to_maturity: null,
  },
  {
    symbol: 'SH000001',
    current: 3018.77,
    percent: -0.09,
    chg: -2.78,
    timestamp: 1698735600000,
    volume: 31985996700,
    amount: 386277226427.2,
    market_capital: 46803360556178.23,
    float_market_capital: 25239885076364.88,
    turnover_rate: 0.74,
    amplitude: 0.54,
    open: 3019.65,
    last_close: 3021.55,
    high: 3023,
    low: 3006.61,
    avg_price: 3018.77,
    trade_volume: null,
    side: null,
    is_trade: false,
    level: 3,
    trade_session: null,
    trade_type: null,
    current_year_percent: -2.28,
    trade_unique_id: null,
    type: 12,
    bid_appl_seq_num: null,
    offer_appl_seq_num: null,
    volume_ext: null,
    traded_amount_ext: null,
    trade_type_v2: null,
    yield_to_maturity: null,
  },
  {
    symbol: 'SZ395004',
    current: 0,
    percent: 0,
    chg: 0,
    timestamp: 1698735870000,
    volume: 15886551014,
    amount: 244733927546,
    market_capital: null,
    float_market_capital: null,
    turnover_rate: null,
    amplitude: null,
    open: null,
    last_close: 0,
    high: null,
    low: null,
    avg_price: 0,
    trade_volume: 0,
    side: 0,
    is_trade: false,
    level: 1,
    trade_session: null,
    trade_type: null,
    current_year_percent: 0,
    trade_unique_id: '15886551014',
    type: 12,
    bid_appl_seq_num: null,
    offer_appl_seq_num: null,
    volume_ext: null,
    traded_amount_ext: null,
    trade_type_v2: null,
    yield_to_maturity: null,
  },
]

const STOCKS = ['SH000001', 'SZ399001', 'SZ399006']

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

  // 获取
  const getRealtime = () => {
    request
      .get(
        `/allStock/realtime?symbol=${STOCKS[0]},${STOCKS[1]},${STOCKS[2]}`,
        {}
      )
      .then((response) => {
        const { data } = response
        setList(data)
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
            switch (item.symbol) {
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
                    item.percent > 0 ? styles.up : styles.down
                  }`}
                >
                  {item.current}
                </div>
                <div className={item.percent > 0 ? styles.up : styles.down}>
                  <span className={styles.range}>{item.chg}</span>
                  <span className={styles.percent}>({item.percent}%)</span>
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
