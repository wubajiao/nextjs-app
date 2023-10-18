/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-09-27 17:44:05
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-10-13 17:57:02
 */
'use client'
import React, { useState, useEffect } from 'react'
import { message } from 'antd'
import styles from './index.module.scss'
import Panel from '../components/Panel'
import Icon from '../components/Icon'
import Title from '../components/Title'
import FormModal from './FormModal'
import throttle from '@/utils/throttle'
import debounce from '@/utils/debounce'
import request from '@/utils/request'
import * as API from '@/api/stock'

const list = [
  {
    id: 1,
    name: '贵州茅台',
    current: 1842.22,
    percent: -0.71,
    range: -17.8,
    holdNumber: 20000,
    cost: 1842.22,
  },
  {
    id: 2,
    name: '贵州茅台',
    current: 1842.22,
    percent: 0.71,
    range: 17.8,
    holdNumber: 20000,
    cost: 1842.22,
  },
]

export default function ContentLeft() {
  const [holdData, setHoldData] = useState<any>([]) // 持仓
  const [optionalData, setOptionalData] = useState<any>([]) // 自选
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [addType, setAddType] = useState<any>(null) // 1-持仓、0-自选
  useEffect(() => {
    getOptionalData()
    getHoldData()
  }, [])

  const getHoldData = () => {
    request
      .get(API.stock_hold)
      .then((response) => {
        const { data } = response
        setHoldData(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const getOptionalData = () => {
    request
      .get(API.stock)
      .then((response) => {
        const { data } = response
        setOptionalData(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const handleAdd = (item: any) => {
    request
      .post(API.stock, {
        code: item.code,
        name: item.name,
        type: addType,
      })
      .then((response) => {
        message.success('添加成功！')
        if (addType === 1) {
          getHoldData()
          getOptionalData()
        } else {
          getOptionalData()
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const handleReload = (type: any) => {
    if (type === '持仓') {
      getHoldData()
    } else {
      getOptionalData()
    }
  }

  return (
    <>
      <div className={styles.contentLeft}>
        <Panel className={`${styles.box} ${styles.boxTop} `}>
          <Title name="持仓">
            <div className={styles.right}>
              <Icon
                type="control"
                tooltipProps={{ title: '排序' }}
                // onClick={handleClick}
              />
              <Icon
                type="reload"
                tooltipProps={{ title: '刷新' }}
                onClick={() => handleReload('持仓')}
              />
              <Icon
                type="plus"
                tooltipProps={{ title: '添加持仓' }}
                onClick={() => {
                  setAddType(1)
                  setIsModalOpen(true)
                }}
              />
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
            {holdData.map((item: any) => {
              return (
                <div key={item.id} className={styles.tr}>
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
              <Icon
                type="reload"
                tooltipProps={{ title: '刷新' }}
                onClick={() => handleReload('自选')}
              />
              <Icon
                type="plus"
                tooltipProps={{ title: '添加自选' }}
                onClick={() => {
                  setAddType(0)
                  setIsModalOpen(true)
                }}
              />
            </div>
          </Title>

          <div className={styles.th}>
            <div>涨跌幅</div>
            <div>最新价</div>
            <div>名称</div>
            <div>成交量</div>
          </div>
          <div className={styles.tbody}>
            {optionalData.map((item: any) => {
              return (
                <div key={item.id} className={styles.tr}>
                  <div className={item.percent > 0 ? styles.up : styles.down}>
                    {item.percent > 0 && '+'}
                    {item.percent}%
                  </div>
                  <div className={item.percent >= 0 ? styles.up : styles.down}>
                    {item.current}
                  </div>
                  <div>{item.name}</div>
                  <div>{item.holdNumber}手</div>
                </div>
              )
            })}
          </div>
        </Panel>
      </div>
      <FormModal
        title={`添加${addType===1?'持仓': '自选'}`}
        open={isModalOpen}
        onAdd={handleAdd}
        onCancel={() => setIsModalOpen(false)}
      />
    </>
  )
}
