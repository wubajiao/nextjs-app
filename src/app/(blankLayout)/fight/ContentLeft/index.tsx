/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-09-27 17:44:05
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2024-03-20 16:00:44
 */
'use client'
import React, { useState, useEffect } from 'react'
import { message, Form } from 'antd'
import FormModal from '@/components/FormModal'
import { useInterval } from 'ahooks'
import styles from './index.module.scss'
import Panel from '../components/Panel'
import Icon from '../components/Icon'
import Title from '../components/Title'
import AddStockFormModal from './AddStockFormModal'
import throttle from '@/utils/throttle'
import debounce from '@/utils/debounce'
import request from '@/utils/request'
import { columns } from './common'
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
  const [form] = Form.useForm() // 筛选表单
  const [holdData, setHoldData] = useState<any>([]) // 持仓
  const [holdRealData, setHoldRealData] = useState<any>([]) // 持仓实时
  const [optionalData, setOptionalData] = useState<any>([]) // 自选
  const [optionalRealData, setOptionalRealData] = useState<any>([]) // 自选实时
  const [isModalOpen, setIsModalOpen] = useState(false) // 添加股票弹框
  const [addType, setAddType] = useState<any>(null) // 1-持仓、0-自选
  const [stockEditOpen, setStockEditOpen] = useState(false) // 持仓编辑弹框
  const [confirmLoading, setConfirmLoading] = useState(false) // 表单弹窗确认loading
  const [editDetailSpinLoading, setEditDetailSpinLoading] =
    useState<boolean>(false) // 编辑loading

  useEffect(() => {
    getOptionalData()
    getHoldData()
  }, [])

  useEffect(() => {
    if (!optionalData.length) return
    getOptionalRealData(optionalData, 'optional')
  }, [optionalData])

  useEffect(() => {
    if (!holdData.length) return
    getOptionalRealData(holdData, 'hold')
  }, [holdData])

  // 定时刷新持仓 / 自选
  useInterval(() => {
    if (holdData.length) {
      getOptionalRealData(holdData, 'hold')
    }

    if (optionalData.length) {
      getOptionalRealData(optionalData, 'optional')
    }
  }, 80000)

  // 获取持仓列表
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

  // 获取自选列表
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

  // 自选和实时股票列表数据结合
  const getCurrentRealtime = (list: any, realList: any) => {
    const newData: any = []
    list.forEach((item: any, i: number) => {
      let newItem = {}
      for (let i = 0; i < realList.length; i++) {
        if (realList[i]?.symbol.includes(item.code)) {
          newItem = {
            ...item,
            ...realList[i],
          }
          newData.push(newItem)
        }
      }
    })

    return newData
  }

  // 自选实时数据
  const getOptionalRealData = (listData: any, type = 'optional') => {
    let symbolString = ''
    listData.forEach((item: any, i: number) => {
      let string = `${item.exchange.toUpperCase()}${item.code}` // 转为大写
      symbolString = `${symbolString}${i !== 0 ? ',' : ''}${string}`
    })
    request
      .get(`${API.realtime}?symbol=${symbolString}`)
      .then((realResponse) => {
        const realData = realResponse.data
        const concatData = getCurrentRealtime(listData, realData)
        if (type === 'optional') {
          setOptionalRealData(concatData)
        } else {
          setHoldRealData(concatData)
        }
      })
  }

  const handleAdd = (item: any) => {
    request
      .post(API.stock, {
        code: item.code,
        name: item.name,
        exchange: item.exchange,
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

  // 自选/持仓刷新
  const handleReload = (type: any) => {
    if (type === '持仓') {
      getHoldData()
    } else {
      getOptionalData()
    }
  }

  // 持仓编辑保存
  const onOk = async (payload: any) => {
    console.log('🚀 ~ onOk ~ payload:', payload)

    getHoldData()
    setStockEditOpen(false)
  }

  // 持仓编辑弹框
  const formModalProps = {
    title: '持仓设置',
    themeType: 'dark',
    open: stockEditOpen,
    loading: editDetailSpinLoading,
    confirmLoading,
    setEditDetailSpinLoading,
    setConfirmLoading,
    formProps: {
      form,
      name: 'stockEdit',
      list: columns({}),
    },
    onCancel: () => {
      setStockEditOpen(false)
    },
    onOk,
  }

  return (
    <>
      <div className={styles.contentLeft}>
        <Panel className={`${styles.box} ${styles.boxTop} `}>
          <Title name="持仓">
            <div className={styles.right}>
              <Icon
                type="sort"
                tooltipProps={{ title: '升序/降序/不排序' }}
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
            {holdRealData.map((item: any) => {
              return (
                <div key={item.id} className={styles.tr}>
                  <div className={item.percent > 0 ? styles.up : styles.down}>
                    {item.percent > 0 && '+'}
                    {item.percent?.toFixed(2)}%
                  </div>
                  <div>{item.current}</div>
                  <div>{item.name}</div>
                  <div>{item.holdNumber || ' --'}</div>
                  <div>{item.cost || ' --'}</div>
                  <section className={styles.actionWrap}>
                    <section className={styles.action}>
                      <Icon
                        type="moneycollect"
                        tooltipProps={{ title: '持仓设置' }}
                        onClick={() => {
                          setStockEditOpen(true)
                        }}
                      />
                      <Icon
                        type="delete"
                        tooltipProps={{ title: '删除' }}
                        onClick={() => {}}
                      />
                      <Icon
                        type="arrowup"
                        tooltipProps={{ title: '上移' }}
                        onClick={() => handleReload('持仓')}
                      />
                      <Icon
                        type="arrowdown"
                        tooltipProps={{ title: '下移' }}
                        onClick={() => {}}
                      />
                      <Icon
                        type="vertical-align-top"
                        tooltipProps={{ title: '置顶' }}
                        onClick={() => {}}
                      />
                    </section>
                  </section>
                </div>
              )
            })}
          </div>
          <FormModal {...formModalProps} />
        </Panel>
        <Panel className={`${styles.box} ${styles.boxBottom} `}>
          <Title name="自选">
            <div className={styles.right}>
              <Icon type="sort" tooltipProps={{ title: '升序/降序/不排序' }} />
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
            {optionalRealData.map((item: any) => {
              const volume = Math.floor(item?.volume / 100)
              return (
                <div key={item.id} className={styles.tr}>
                  <div className={item.percent > 0 ? styles.up : styles.down}>
                    {item.percent > 0 && '+'}
                    {item.percent?.toFixed(2)}%
                  </div>
                  <div className={item.percent >= 0 ? styles.up : styles.down}>
                    {item.current}
                  </div>
                  <div>{item.name}</div>
                  <div>{volume}手</div>
                </div>
              )
            })}
          </div>
        </Panel>
      </div>
      <AddStockFormModal
        title={`添加${addType === 1 ? '持仓' : '自选'}`}
        open={isModalOpen}
        onAdd={handleAdd}
        onCancel={() => setIsModalOpen(false)}
      />
    </>
  )
}
