/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-09-27 17:44:05
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-10-11 12:04:15
 */
import React from 'react'
import { Tooltip } from 'antd'
import styles from './index.module.scss'

export default function Icon({ type, size = 16, className, tooltipProps }: any) {
  const icon = () => (
    <i className={`leeks leeks-${type} ${styles.icon} ${className}`} style={{ fontSize: size }} />
  )
  return (
    <>
      {tooltipProps ? (
        <Tooltip color="geekblue" {...tooltipProps}>
          {icon()}
        </Tooltip>
      ) : (
        icon()
      )}
    </>
  )
}
