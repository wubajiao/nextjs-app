/*
 * @Description  : 表单组件
 * @Author       : wuhaidong
 * @Date         : 2024-03-18 10:34:49
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2024-03-19 18:16:06
 */
import React from 'react'
import { Form, Row } from 'antd'
import lodash from 'lodash'
import CompForm from '../CompForm'

const IlngProForm = (parmProps: any) => {
  const {
    form,
    list = [],
    initialValues = {},
    layout = 'vertical',
    ...otherProps
  } = parmProps
  const columns = lodash.cloneDeep(list).filter((v: any) => v.formItem)

  return (
    <Form
      form={form}
      layout={layout}
      initialValues={initialValues}
      {...otherProps}
    >
      <Row gutter={24}>
        {columns.map((item: any, index: any) => {
          const key = `${item.label}-${item.name}-${index}`
          return (
            <React.Fragment key={key}>{CompForm(item, form)}</React.Fragment>
          )
        })}
      </Row>
    </Form>
  )
}
export default IlngProForm
