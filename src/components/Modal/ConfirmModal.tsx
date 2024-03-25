/*
 * @Descripttion : 删除通用组件
 * @Author       : wuhaidong
 * @Date         : 2024-03-18 11:53:50
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2024-03-25 10:00:57
 */
import { Modal, message } from 'antd'
import _ from 'lodash'
import request from '@/utils/request'

interface ConfirmModalProps {
  record?: any // 列表行数据
  text?: string // 自定义提示语
  onOk?: Function // 成功回调函数
  url?: string // 请求接口
  getListData?: Function // 请求列表数据方法
  payload?: any // 请求体
  content?: any // 提示语
  [key: string]: any // 扩展项
}

const ConfirmModal = ({
  record,
  text,
  onOk,
  url,
  getListData,
  payload = {},
  ...otherProps
}: ConfirmModalProps) => {
  // 默认提示语
  let content = `删除后将无法恢复, 您是否确定要删除这项？`
  // 默认删除多个提示语
  if (record && record.length) {
    content = `删除后将无法恢复, 您是否确定要删除这${
      _.isArray(record) ? record.length : ''
    }项？`
  }

  Modal.confirm({
    title: '注意',
    content: text || content,
    cancelText: '取消',
    okText: '确认',
    maskClosable: false,
    centered: true,
    onOk: async () => {
      if (url) {
        request
          .patch(`${url}/${record.id}`, payload)
          .then(() => {
            message.success('操作成功')
            if (getListData) {
              getListData()
            }
          })
          .catch((error) => {
            console.error(error)
          })
      }
      if (onOk) {
        if (record) {
          onOk(_.isArray(record) ? record : [record])
        } else {
          onOk()
        }
      }
    },
    ...otherProps,
  })
}
export default ConfirmModal
