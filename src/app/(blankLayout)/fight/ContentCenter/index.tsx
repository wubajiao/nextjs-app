/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-09-27 17:44:05
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-10-08 16:37:22
 */
'use client'
import React, { useRef, useEffect } from 'react'
import * as echarts from 'echarts'
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
    current: 5310,
    type: 0,
  },
  {
    name: '上涨',
    current: 9,
    type: 1,
  },
  {
    name: '涨停',
    current: 3020,
    type: 1,
  },
  {
    name: '下跌',
    current: 1890,
    type: 2,
  },
  {
    name: '跌停',
    current: 12,
    type: 2,
  },
]

const dealVolumeList = [
  {
    name: '总成交',
    current: 5310,
  },
  {
    name: '上海',
    current: 9,
    type: 1,
  },
  {
    name: '深圳',
    current: 3020,
    type: 1,
  },
  {
    name: '创业板',
    current: 1890,
    type: 2,
  },
]

export default function ContentCenter() {
  const chartRef: any = useRef()

  useEffect(() => {
    initChart()
  }, [])

  const initChart = () => {
    const myChart = echarts.init(chartRef.current, 'dark')

    const option = {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [
          '9:30',
          '10:00',
          '10:30',
          '11:00',
          '11:30',
          '13:00',
          '13:30',
          '14:00',
          '14:30',
          '15:00',
        ],
      },
      yAxis: {
        type: 'value',
      },
      legend: {
        data: ['北向资金', '沪港通', '深港通'],
        textStyle: {
          color: '#fff', // 图例文字颜色
        },
      },
      grid: {
        left: '1%',
        right: '1%',
        bottom: '1%',
        containLabel: true,
      },
      series: [
        {
          name: '北向资金',
          type: 'line',
          smooth: true,
          showSymbol: false,
          data: [100, 230, 224, 218, 135, 147, 260],
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#19e3b4' },
              { offset: 1, color: '#19e3b400' },
            ]),
          },
        },
        {
          name: '沪港通',
          type: 'line',
          smooth: true,
          showSymbol: false,
          data: [150, 250, 224, 218, 135, 147, 260],
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#0066d2' },
              { offset: 1, color: '#0066d200' },
            ]),
          },
        },
        {
          name: '深港通',
          type: 'line',
          smooth: true,
          showSymbol: false,
          data: [200, 230, 224, 218, 135, 147, 260],
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(55, 162, 255)',
              },
              {
                offset: 1,
                color: 'rgb(116, 21, 219,.5)',
              },
            ]),
          },
        },
      ],
    }
    return option && myChart.setOption(option, true)
  }

  return (
    <div className={styles.contentCenter}>
      <Panel className={styles.total}>
        {list.map((item) => {
          return (
            <div key={item.name} className={styles.card}>
              <div className={styles.label}>{item.name}</div>
              <div className={`${styles.number} ${item.current > 0 ? styles.up : styles.down}`}>
                {item.current}
              </div>
            </div>
          )
        })}
      </Panel>
      <Panel className={styles.riseFall}>
        {riseFallList.map((item) => {
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
        {dealVolumeList.map((item) => {
          return (
            <div key={item.name} className={styles.card}>
              <div className={styles.label}>{item.name}</div>
              <div className={`${styles.number}`}>{item.current}</div>
            </div>
          )
        })}
      </Panel>
      <Panel className={styles.chart}>
        <div ref={chartRef} style={{ height: '100%', width: '100%' }} />
      </Panel>
    </div>
  )
}
