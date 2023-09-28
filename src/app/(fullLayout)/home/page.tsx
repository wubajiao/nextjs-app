/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-09-27 12:01:56
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-09-28 11:15:20
 */
'use client'
import React from 'react'
import { Code } from '@nextui-org/react'
function home() {
  return (
    <div className="home">
      首页
      <Code color="default">npm install @nextui-org/react</Code>
      <Code color="primary">npm install @nextui-org/react</Code>
      <Code color="secondary">npm install @nextui-org/react</Code>
      <Code color="success">npm install @nextui-org/react</Code>
      <Code color="warning">npm install @nextui-org/react</Code>
      <Code color="danger">npm install @nextui-org/react</Code>
    </div>
  )
}

export default home
