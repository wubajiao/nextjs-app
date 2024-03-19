/*
 * @Descripttion : FormModal
 * @Author       : wuhaidong
 * @Date         : 2023-06-28 09:34:55
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2024-03-18 15:17:32
 */
import React from 'react'
import ProForm from '../ProForm'
import Modal from '../Modal'

// 参考modal组件
const FormModal = (props: any) => {
  const { formProps, loading = false, onOk, children, ...otherProps } = props
  const { form } = formProps
  const { otherList, ...newFormProps } = formProps
  const ModalProps = {
    form,
    formProps,
    loading,
    otherList,
    ...otherProps,
    onOk: (newval: any) => {
      if (onOk) {
        onOk(newval)
      }
    },
  }
  return (
    <Modal {...ModalProps}>
      <ProForm {...newFormProps} />
      {children}
    </Modal>
  )
}

export default FormModal
