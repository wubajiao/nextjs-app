/*
 * @Descripttion : Modal
 * @Author       : wuhaidong
 * @Date         : 2024-03-18 12:16:14
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2024-03-19 22:29:24
 */
import React, { useState, useRef } from 'react'
import { Modal, Spin, message } from 'antd'
import Draggable from 'react-draggable'
import request from '@/utils/request'
import { initFormData } from '@/utils/dataFormat'
import './index.scss'

const ModalCustom = (props: any) => {
  const [disabled, setDisabled] = useState(true)
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 })
  const draggleRef = useRef<HTMLDivElement>(null)
  const {
    form,
    onOk,
    url = '', // 自动化请求必传url 参数默认为form表单  ；如需自定义及特殊业务请用onOk
    payload, // 请求参数   ，默认值为form，可由外部传入特殊参数
    success = true,
    footer,
    onCancel,
    formProps = {},
    setLoading, // 确认按钮的loading  必传
    setVisible, // 弹窗的显隐藏
    onSuccess,
    getListData = null, // 确定请求后的更新数据方法
    width = 800,
    okButtonProps,
    title = 'add',
    className = '',
    centered = true,
    closable = true,
    okText = '保存',
    setConfirmLoading,
    cancelText = '关闭',
    isLoading = true, // 弹窗列表需要设置为false
    maskClosable = false,
    confirmLoading = false,
    validateList = [],
    setEditDetailSpinLoading,
    ...otherProps
  } = props

  // otherList 其他表单数组  比如自定义编辑表单配置列数组
  const { list = [], otherList = [] } = formProps
  const newList = [...list, ...otherList]
  const stylesProps = {
    body: {
      maxHeight: 'calc(100vh - 180px)',
      minHeight: 400,
      overflowY: 'auto',
      padding: '20px',
    },
    ...otherProps.styles,
  }

  const titleChange = () => {
    let text = ''
    switch (title) {
      case 'add':
        text = '新增'
        break
      case 'edit':
        text = '编辑'
        break
      case 'detail':
        text = '详情'
        break
      case 'handle':
        text = '处理'
        break
      case 'check':
        text = '验收'
        break
      default:
        text = title
        break
    }
    return text
  }

  const onStart = (event: any, uiData: any) => {
    const { clientWidth, clientHeight } = window.document.documentElement
    const targetRect = draggleRef.current?.getBoundingClientRect()
    if (!targetRect) {
      return
    }
    const obj = {
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    }
    setBounds(obj)
  }
  // 结合react-draggable实现modal头部拖拽
  const titleHtml = (
    <div
      style={{
        width: '100%',
        cursor: 'move',
      }}
      onMouseOver={() => {
        if (disabled) {
          setDisabled(false)
        }
      }}
      onMouseOut={() => {
        setDisabled(true)
      }}
      onFocus={() => {}}
      onBlur={() => {}}
    >
      {titleChange()}
    </div>
  )
  const handleCancel = () => {
    if (onCancel) {
      onCancel()
      return
    }
    if (setVisible) {
      setVisible(false)
    }
    if (setEditDetailSpinLoading) {
      setEditDetailSpinLoading(false)
    }
    if (setConfirmLoading) {
      setConfirmLoading(false)
    }
  }
  const handleOk = async () => {
    if (form) {
      try {
        const val: any = await form.validateFields()
        // console.log('🚀 ~ handleOk ~ val:', val)
        if (validateList.length) {
          await Promise.all(
            validateList.map((item: any) => item.validateFields())
          )
        }
        const newval = initFormData(val, newList)
        if (url) {
          if (setConfirmLoading) {
            setConfirmLoading(true)
          }
          try {
            request
              .patch(url, { ...payload })
              .then((response) => {
                if (setVisible) {
                  setVisible(false)
                }
                if (getListData) {
                  getListData()
                }
                if (onSuccess) {
                  onSuccess()
                }
              })
              .catch((error) => {
                console.error(error)
              })
          } finally {
            if (setConfirmLoading) {
              setConfirmLoading(false)
            }
          }

          return
        }
        if (onOk) {
          onOk(newval)
          return
        }
      } catch (err: any) {
        setTimeout(() => {
          const errorList = (document as any).querySelectorAll(
            '.ant-form-item-has-error'
          )
          errorList[0]?.scrollIntoView({
            block: 'center',
            behavior: 'smooth',
          })
          const { errorFields = [] } = err
          for (let index = 0; index < errorFields.length; index++) {
            if (errorFields[index]?.name?.length === 3) {
              const { name = [] } = errorFields[index]
              const { label = '' } = newList.find(
                (v: any) => v.name === name[0]
              )
              if (name[1] >= 1) {
                message.warning(`请完善${label}${name[1] + 1}信息！`)
              }
              break
            }
          }
        }, 400)
      }
      return
    }
    onOk()
  }
  const handleClose = () => {
    if (form) {
      form?.resetFields()
    }
    if (setConfirmLoading) {
      setConfirmLoading(false)
    }
  }
  const { children, loading = false } = otherProps
  const spinProps = {
    spinning: loading,
  }
  return (
    <section onClick={(e) => e.stopPropagation()}>
      <Modal
        width={width}
        destroyOnClose
        footer={footer}
        onOk={handleOk}
        okText={okText}
        title={titleHtml}
        centered={centered}
        closable={closable}
        className={`leeks-modal ${className}`}
        cancelText={cancelText}
        onCancel={handleCancel}
        afterClose={handleClose}
        maskClosable={maskClosable}
        okButtonProps={okButtonProps}
        confirmLoading={confirmLoading}
        styles={stylesProps}
        {...otherProps}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        {isLoading ? <Spin {...spinProps}>{children}</Spin> : children}
      </Modal>
    </section>
  )
}

export default ModalCustom
