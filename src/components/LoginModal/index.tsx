/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-09-27 14:59:23
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-10-31 15:27:52
 */
'use client'
import React, { useState, useEffect } from 'react'
import { Modal, Tabs, Form, Input, Button, Row, Col, message } from 'antd'
import { useInterval } from 'ahooks'
import request from '@/utils/request'
import styles from './index.module.scss'
import { register } from 'module'

export default function LoginModal({ open, setOpen }: any) {
  const [form] = Form.useForm()
  const [registerForm] = Form.useForm()
  const [activeKey, setActiveKey] = useState('login')
  const [codeStatus, setCodeStatus] = useState(false)
  const [count, setCount] = useState(60)

  useEffect(() => {
    if (!codeStatus) return
    const timer = setInterval(() => {
      if (count === 0) {
        setCodeStatus(false)
        clearTimeout(timer)
      } else {
        setCount(count - 1)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [codeStatus, count])

  // 确认密码
  const validatePassword = (_: any, value: any) => {
    const { getFieldValue } = form

    if (value && value !== getFieldValue('password')) {
      return Promise.reject('密码不一致')
    }

    return Promise.resolve()
  }

  // 登录提交
  const handleLogin = (values: any) => {
    request
      .post(`/auth/login`, { ...values })
      .then((response) => {
        const {
          data: { token, user },
        } = response
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        setOpen(false)
        message.success('登录成功')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  // 获取验证码
  const getCode = () => {
    const { getFieldValue } = registerForm
    const email = getFieldValue('email')
    console.log('🚀 ~ file: index.tsx:54 ~ getCode ~ email:', email)
    request
      .post(`/user/sendcode`, { email })
      .then((response) => {
        message.success('获取成功')
        setCodeStatus(true)
        setCount(60)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  // 注册提交
  const handleRegister = (values: any) => {
    request
      .post(`/user/register`, { ...values })
      .then((response) => {
        message.success('注册成功，请登录')
        setActiveKey('login')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <Modal
      width={360}
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
    >
      <Tabs
        // defaultActiveKey="login"
        activeKey={activeKey}
        centered
        onChange={(key) => {
          setActiveKey(key)
          console.log('🚀 ~ file: index.tsx:39 ~ LoginModal ~ key:', key)
        }}
      >
        <Tabs.TabPane tab="登录" key="login">
          <Form layout="vertical" onFinish={handleLogin} form={form}>
            <Form.Item
              label="邮箱"
              name="email"
              rules={[
                { required: true, message: '请输入邮箱' },
                {
                  type: 'email',
                  message: '请输入有效的邮箱地址！',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%', marginTop: 30 }}
              >
                登录
              </Button>
            </Form.Item>
            <div style={{ textAlign: 'center' }}>
              没有账号？
              <span
                style={{ color: '#1890ff', cursor: 'pointer' }}
                onClick={() => setActiveKey('register')}
              >
                去注册
              </span>
            </div>
          </Form>
        </Tabs.TabPane>
        <Tabs.TabPane tab="注册" key="register">
          <Form layout="vertical" onFinish={handleRegister} form={registerForm}>
            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="密码确认"
              name="password"
              rules={[
                { required: true, message: '请确认密码' },
                ({ getFieldValue }) => ({
                  validator: validatePassword,
                }),
              ]}
              dependencies={['password']}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="邮箱"
              name="email"
              rules={[
                { required: true, message: '请输入邮箱' },
                {
                  type: 'email',
                  message: '请输入有效的邮箱地址！',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="邮箱验证码"
              name="verificationCode"
              rules={[{ required: true, message: '请输入验证码' }]}
            >
              <Input
                suffix={
                  <div
                    style={{
                      color: codeStatus ? '#999' : '#1890ff',
                      cursor: 'pointer',
                      fontSize: 13,
                    }}
                    onClick={getCode}
                  >
                    {codeStatus ? `${count}s` : '发送验证码'}
                  </div>
                }
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%', marginTop: 30 }}
              >
                注册
              </Button>
            </Form.Item>
          </Form>
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  )
}
