/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-10-11 12:09:33
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-10-13 16:41:13
 */
'use client'

import React, { useState } from 'react'
import { Modal, Button, Input, ConfigProvider, theme } from 'antd'
import throttle from '@/utils/throttle'
import request from '@/utils/request'

import styles from './FormModal.module.scss'

export default function FormModal({
  title = '新增',
  open,
  onAdd,
  onCancel,
}: any) {
  const [result, setResult] = useState([])

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
        afterClose={()=>setResult([])}
      >
        <Input
          className={styles.input}
          placeholder="请输入关键字查询，如：000001或上证指数"
          onChange={(e) => {
            // TODO 搜索节流优化
            const { value } = e.target
            if (value) {
              request
                .get(`/allStock/query?keyword=${value}`)
                .then((response) => {
                  const { data } = response
                  setResult(data)
                })
                .catch((error) => {
                  console.error(error)
                })
            }
          }}
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
