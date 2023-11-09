/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-09-27 17:44:05
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-11-09 16:08:48
 */
'use client'
import React, { useEffect, useState } from 'react'
import request from '@/utils/request'
import NP from 'number-precision'
import styles from './index.module.scss'
import Panel from '../components/Panel'

const list = [
  {
    name: '今日盈亏',
    current: 1842.22,
    percent: -0.71,
  },
  {
    name: '总资产',
    current: 1842.22,
    percent: -0.71,
  },
  {
    name: '净资产',
    current: 1842.22,
    percent: -0.71,
  },
  {
    name: '总负债',
    current: -1842.22,
    percent: -0.71,
  },
]

const riseFallList = [
  {
    name: '全部',
    current: '--',
    type: 0,
    key: 'all',
  },
  {
    name: '上涨',
    current: '--',
    type: 1,
    key: 'up',
  },
  {
    name: '涨停',
    current: '--',
    type: 1,
    key: 't',
  },
  {
    name: '下跌',
    current: '--',
    type: 2,
    key: 'down',
  },
  {
    name: '跌停',
    current: '--',
    type: 2,
    key: 'b',
  },
]

const marketFlowList = [
  { label: '今日主力净流入', value: '--' },
  { label: '今日超大单净流入', value: '--' },
  { label: '今日大单净流入', value: '--' },
  { label: '今日中单净流入', value: '--' },
  { label: '今日小单净流入', value: '--' },
]

export default function ContentCenter() {
  const [riseFall, setRiseFall] = useState<any>([]) // 涨跌数汇总
  const [transactionVolume, setTransactionVolume] = useState<any>([]) // 指数成交额
  const [fundDirection, setFundDirection] = useState<any>([]) // 北上南下资金
  const [marketFlow, setMarketFlow] = useState<any>([]) // 大盘资金流向

  useEffect(() => {
    getRiseFall()
    getTransactionVolume()
    getFundDirection()
    getMarketFlow()
    const timer = setInterval(() => {
      getRiseFall()
      getTransactionVolume()
      getFundDirection()
      getMarketFlow()
    }, 60 * 1000)

    return () => clearInterval(timer)
  }, [])

  // 获取涨跌幅数据
  const getRiseFall = () => {
    request
      .get(`/allStock/upDownNumber`)
      .then((response) => {
        const { data } = response
        const object = data[0] || {}
        let newList = []
        for (let i = 0; i < riseFallList.length; i++) {
          let current = 0
          if (riseFallList[i].key === 'all') {
            current = object.up + object.down + object.r0
          } else {
            current = object[riseFallList[i].key]
          }
          let item = {
            ...riseFallList[i],
            current,
          }
          newList.push(item)
        }
        setRiseFall(newList)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  // 获取股指成交额
  const getTransactionVolume = () => {
    request
      .get(`/allStock/batch?symbol=SH000001,SZ399001,SZ399006,SH000688`)
      .then((response) => {
        const {
          data: { items },
        } = response

        let newList = []
        let total = 0
        for (let i = 0; i < items.length; i++) {
          newList.push(items[i].quote)
          total = total + items[i].quote.amount
        }

        newList.unshift({ name: '总交易额', amount: total })

        setTransactionVolume(newList)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  // 获取北上/南下资金流向
  const getFundDirection = () => {
    request
      .get(`/allStock/hsgtDate`)
      .then((response) => {
        const { data } = response
        setFundDirection(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  // 获取大盘资金流向
  const getMarketFlow = () => {
    request
      .get(`/allStock/marketFlow`)
      .then((response) => {
        const {
          data: { klines },
        } = response
        const flowString = klines[klines.length - 1]
        const flowArray = flowString.split(',')
        const result = marketFlowList.map((item, index) => {
          let value = '--'
          switch (index) {
            case 0:
              value = flowArray[1]
              break
            case 1:
              value = flowArray[5]
              break
            case 2:
              value = flowArray[4]
              break
            case 3:
              value = flowArray[3]
              break
            case 4:
              value = flowArray[2]
              break
          }

          return {
            label: item.label,
            value,
          }
        })
        setMarketFlow(result)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div className={styles.contentCenter}>
      <Panel className={styles.total}>
        {list.map((item) => {
          return (
            <div key={item.name} className={styles.card}>
              <div className={styles.label}>{item.name}</div>
              <div
                className={`${styles.number} ${
                  item.current > 0 ? styles.up : styles.down
                }`}
              >
                {item.current}
              </div>
            </div>
          )
        })}
      </Panel>
      <Panel className={styles.riseFall}>
        {riseFall.map((item: any) => {
          return (
            <div key={item.name} className={styles.card}>
              <div className={styles.label}>{item.name}</div>
              <div
                className={`${styles.number} ${item.type === 1 && styles.up} ${
                  item.type === 2 && styles.down
                }`}
              >
                {item.current}
              </div>
            </div>
          )
        })}
      </Panel>
      <Panel className={styles.dealVolume}>
        {transactionVolume.map((item: any) => {
          return (
            <div key={item.name} className={styles.card}>
              <div className={styles.label}>{item.name}</div>
              <div className={`${styles.number}`}>
                {NP.round(NP.divide(item.amount, 100000000), 2)}亿
              </div>
            </div>
          )
        })}
      </Panel>
      <Panel className={styles.fundDirection}>
        {fundDirection.map((item: any) => {
          return (
            <div key={item.BOARD_TYPE} className={styles.item}>
              <div className={styles.top}>
                <span style={{ marginRight: 6 }}>{item.BOARD_TYPE}</span>
                <span>{item.FUNDS_DIRECTION}</span>
              </div>
              <div>{NP.round(NP.divide(item.dayNetAmtIn, 10000), 2)}亿</div>
            </div>
          )
        })}
      </Panel>
      <Panel className={`${styles.dealVolume} ${styles.marketFlow}`}>
        {marketFlow.map((item: any) => {
          return (
            <div key={item.name} className={styles.card}>
              <div className={styles.label}>{item.label}</div>
              <div
                className={`${styles.number} ${
                  item.value > 0 ? styles.up : styles.down
                }`}
              >
                {NP.round(NP.divide(item.value, 100000000), 2)}亿
              </div>
            </div>
          )
        })}
      </Panel>
    </div>
  )
}
