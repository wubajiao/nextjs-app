/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-10-11 12:09:33
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-10-30 11:26:50
 */
'use client'

import React, { useState } from 'react'
import { Modal, Button, Input, ConfigProvider, theme } from 'antd'
import { useThrottleEffect } from 'ahooks'
import request from '@/utils/request'

import styles from './FormModal.module.scss'

export default function FormModal({
  title = '新增',
  open,
  onAdd,
  onCancel,
}: any) {
  const [result, setResult] = useState([])
  const [value, setValue] = useState<any>(null)

  useThrottleEffect(
    () => {
      if (!value) return
      request
        .get(`/allStock/query?keyword=${value}`)
        .then((response) => {
          const { data } = response
          setResult(data)
        })
        .catch((error) => {
          console.error(error)
        })
    },
    [value],
    {
      wait: 1500,
    }
  )

  return (
    <ConfigProvider
      theme={{
        // 1. 单独使用暗色算法
        algorithm: theme.darkAlgorithm,
      }}
    >
      <Modal
        className={styles.modal}
        footer={null}
        title={title}
        open={open}
        onCancel={onCancel}
        okButtonProps={{ type: 'primary', danger: true }}
        afterClose={() => setResult([])}
      >
        <Input
          className={styles.input}
          value={value}
          placeholder="请输入关键字查询，如：000001或上证指数"
          onChange={(e) => setValue(e.target.value)}
        />
        <div className={styles.result}>
          {result.map((item: any) => {
            return (
              <div
                key={item.id}
                className={styles.item}
                onClick={() => {
                  onAdd(item)
                }}
              >
                <span>
                  {item.exchange}
                  {item.code}
                </span>
                <span className={styles.divider}>|</span>
                <span>{item.name}</span>
              </div>
            )
          })}
        </div>
      </Modal>
    </ConfigProvider>
  )
}
