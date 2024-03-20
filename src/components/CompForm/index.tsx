/*
 * @Description  : 嵌套编辑表格组件分发
 * @Author       : wuhaidong
 * @Date         : 2024-03-18 10:34:49
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2024-03-20 16:52:49
 */
import React from 'react'
import { Col } from 'antd'
import {
  Form,
  Rate,
  Input,
  InputNumber,
  Select,
  Radio,
  Checkbox,
  Switch,
  DatePicker,
  TimePicker,
  Transfer,
  TreeSelect,
  Cascader,
} from 'antd'

const Comp = (v: any, form: any) => {
  const { formItem = {}, label, name } = v
  let custom = false
  const { width } = formItem
  const {
    type = 'input',
    span = 24,
    hidden,
    display,
    rules: itemRules,
    initialValue,
    hasFeedback = false,
    noStyle = false,
    ids, // 过滤计算逻辑参数
    idsName, // 过滤计算逻辑参数
    ...formProps
  } = formItem
  const { options, disabled } = formItem
  if (
    (hidden && typeof hidden === 'function') ||
    (label && typeof label === 'function') ||
    (display && typeof display === 'function') ||
    (options && typeof options === 'function') ||
    type === 'custom' ||
    (disabled && typeof disabled === 'function') ||
    (itemRules && typeof itemRules === 'function')
  ) {
    custom = true
  }
  const newChildProps = {
    label,
    name,
    ...formItem,
  }

  if (type === 'switch') newChildProps.valuePropName = 'checked'
  if (type === 'editTable') newChildProps.valuePropName = 'dataSource'
  const newItemChild = (comp: any) => {
    const {
      valuePropName,
      label: newLable,
      rules: newRules,
      name: newName,
      span: newSpan,
    } = newChildProps
    // 此处分开是防止UI组件参数引起form报错
    const newSChildProps = {
      label: typeof newLable === 'function' ? newLable(form) : newLable,
      name: newName,
      rules: typeof newRules === 'function' ? newRules(form) : newRules,
      span: newSpan,
      valuePropName,
      initialValue,
      hasFeedback,
      hidden,
    }
    if (!newSChildProps.name) {
      delete newSChildProps.name
    }
    const newLabel = typeof newLable === 'function' ? newLable(form) : newLable
    // display是消失   hidden是隐藏 前者不纳入表单  后者纳入表单
    const displays = typeof display === 'function' ? display(form) : display
    return (
      !displays && (
        <Col
          span={span}
          hidden={typeof hidden === 'function' ? hidden(form) : hidden}
        >
          {noStyle ? (
            <Form.Item label={newLabel} noStyle={noStyle && !newLabel}>
              <Form.Item noStyle {...newSChildProps}>
                {comp}
              </Form.Item>
            </Form.Item>
          ) : (
            <Form.Item {...newSChildProps}>{comp}</Form.Item>
          )}
        </Col>
      )
    )
  }
  const compShou = () => {
    let comp: any = null
    const newLabel = typeof label === 'function' ? label(form) : label
    // 需要对调的组件 目前没有加全  根据后续需求来
    const formItemProps = {
      ...formProps,
      options: typeof options === 'function' ? options(form) : options,
      disabled: typeof disabled === 'function' ? disabled(form) : disabled,
    }
    const newFormProps = {
      ...formProps,
      disabled: typeof disabled === 'function' ? disabled(form) : disabled,
    }
    const isHidden = typeof hidden === 'function' ? hidden(form) : hidden
    const displays = typeof display === 'function' ? display(form) : display
    if (displays) return null
    if (newChildProps.display) {
      delete newChildProps.display
    }
    const { list = [] } = formItem
    switch (type) {
      case 'children':
        comp = isHidden || (
          <>
            {list.map((itemC: any, i: any) => {
              itemC.name = Array.isArray(itemC.name)
                ? itemC.name
                : [name, itemC.name]
              if (itemC.formItem?.name) {
                itemC.formItem.name = Array.isArray(itemC.formItem.name)
                  ? itemC.formItem.name
                  : [name, itemC.formItem.name]
              }
              const key = `${itemC.newLabel}-${itemC.name}-${i}`
              return (
                <React.Fragment key={key}>{Comp(itemC, form)}</React.Fragment>
              )
            })}
          </>
        )
        break
      case 'custom':
        comp = isHidden || newItemChild(formItem?.render(form) || '')
        break
      case 'switch':
        comp = newItemChild(<Switch {...newFormProps} />)
        break
      case 'radio':
        comp = newItemChild(<Radio.Group {...newFormProps} />)
        break
      case 'rate':
        comp = newItemChild(<Rate width="100%" {...newFormProps} />)
        break
      case 'checkbox':
        comp = newItemChild(<Checkbox.Group {...newFormProps} />)
        break
      case 'select':
        comp = newItemChild(
          <Select
            placeholder={`请选择${newLabel}`}
            width="100%"
            {...formItemProps}
          />
        )
        break
      case 'treeSelect':
        comp = newItemChild(
          <TreeSelect
            placeholder={`请选择${newLabel}`}
            width={width || '100%'}
            {...newFormProps}
          />
        )
        break
      case 'date':
        comp = newItemChild(<DatePicker width="100%" {...newFormProps} />)
        break
      case 'time':
        comp = newItemChild(<TimePicker width="100%" {...newFormProps} />)
        break
      case 'number':
        comp = newItemChild(
          <InputNumber
            placeholder={`请输入${newLabel}`}
            style={{ width: '100%' }}
            {...newFormProps}
          />
        )
        break
      case 'textArea':
        comp = newItemChild(
          <Input.TextArea placeholder={`请输入${newLabel}`} {...newFormProps} />
        )
        break
      case 'transfer':
        comp = newItemChild(<Transfer {...newFormProps} />)
        break
      case 'password':
        comp = newItemChild(
          <Input
            width="100%"
            placeholder={`请输入${newLabel}`}
            {...newFormProps}
            type="password"
          />
        )
        break
      case 'cascader':
        comp = newItemChild(
          <Cascader
            width="100%"
            changeOnSelect
            placeholder={`请输入${newLabel}`}
            {...newFormProps}
          />
        )
        break
      default:
        comp = newItemChild(
          <Input
            width="100%"
            placeholder={`请输入${newLabel}`}
            {...newFormProps}
          />
        )
        break
    }
    return comp
  }
  if (custom) {
    let shouldUpdate: any = true
    // 自定义hidden  回调方式
    // 监听字段 防止render过多  后续多个判断条件请在此新增逻辑
    const str = String(formItem.display)
    const splitStr = str.split('getFieldValue')
    if (splitStr?.length === 2) {
      const index1 = splitStr[1].indexOf('(')
      const index2 = splitStr[1].indexOf(')')
      const newStr = splitStr[1]
        .substring(index1 + 1, index2)
        ?.replace(/"/g, '')
      shouldUpdate = (prevValues: any, curValues: any) =>
        prevValues[newStr] !== curValues[newStr]
    }

    return (
      <Form.Item noStyle shouldUpdate={shouldUpdate}>
        {() => compShou()}
      </Form.Item>
    )
  }
  return compShou()
}

export default Comp
