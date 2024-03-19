import _ from 'lodash'
import dayjs from 'dayjs'

const childrenMomentValue = (lists: any, keys: any, initList: any) => {
  const newlists = _.cloneDeep(lists)
  const { formItem = {} } =
    _.cloneDeep(initList).find((v: any) => v.name === keys) || {}
  const { columns = [] } = formItem
  const data = columns.map((v: any) => ({
    ...v,
    ...(v.formItem || v.tableItem || {}),
  }))

  newlists.forEach((item: any, i: any) => {
    if (Object.prototype.toString.call(item) === '[object Object]') {
      Object.keys(item).forEach((key: any) => {
        newlists[i][key] = MomentValue({
          keyVal: item[key],
          key,
          data,
          initList: newlists,
          newval: item,
        })
      })
    }
  })
  return newlists
}

// 递归处理时间格式 参数 val当前值  key 字段名  data 当前为找format的数组源
const MomentValue = ({ keyVal, key, data, initList, newval }: any) => {
  if (dayjs.isDayjs(keyVal)) {
    const { type = 'date', format } =
      data.find((v: any) => v.name === key) || {}
    if (type === 'date') {
      return dayjs(keyVal).format(format || 'YYYY-MM-DD HH:mm:ss')
    }
    if (type === 'time') {
      return dayjs(keyVal).format(format || 'HH:mm:ss')
    }
  }
  if (
    Array.isArray(keyVal) &&
    keyVal.length === 2 &&
    !dayjs.isDayjs(keyVal[0]) &&
    !dayjs.isDayjs(keyVal[1])
  ) {
    const { cutName = null } = data.find((v: any) => v.name === key) || {}
    if (cutName?.length === 2) {
      const [start, end] = cutName
      const [keyValStart, keyValEnd] = keyVal
      newval[start] = keyValStart
      newval[end] = keyValEnd
      delete newval[key]
      return
    }
  }
  if (
    Array.isArray(keyVal) &&
    keyVal.length === 2 &&
    dayjs.isDayjs(keyVal[0]) &&
    dayjs.isDayjs(keyVal[1])
  ) {
    const {
      type = 'date',
      format = null,
      cutName = null,
    } = data.find((v: any) => v.name === key) || {}
    if (type === 'rangeDate') {
      const x = dayjs(keyVal[0]).format(format || 'YYYY-MM-DD HH:mm:ss')
      const y = dayjs(keyVal[1]).format(format || 'YYYY-MM-DD HH:mm:ss')
      if (cutName?.length === 2) {
        const [start, end] = cutName
        newval[start] = x
        newval[end] = y
        delete newval[key]
        return
      }
      return [x, y]
    }
    if (type === 'rangeTime') {
      const x = dayjs(keyVal[0]).format(format || 'HH:mm:ss')
      const y = dayjs(keyVal[1]).format(format || 'HH:mm:ss')
      if (cutName?.length === 2) {
        const [start, end] = cutName
        newval[start] = x
        newval[end] = y
        delete newval[key]
        return
      }
      return [x, y]
    }
  }
  if (Array.isArray(keyVal)) {
    const { ids, idsName } = data.find((v: any) => v.name === key) || {}
    if (ids === true) {
      return keyVal?.map((v: any) => v.id) || []
    }
    if (idsName) {
      newval[idsName] = keyVal?.map((v: any) => v.id) || []
      delete newval[key]
      return
    }
  }
  if (Array.isArray(keyVal) && keyVal.length) {
    return childrenMomentValue(keyVal, key, initList)
  }

  return keyVal
}

// initData  处理数据对象 initList 配置列表数据
export const initFormData = (initData: any, initList: any, type = 'from') => {
  console.log('🚀 ~ initFormData ~ initList:', initList)
  console.log('🚀 ~ initFormData ~ initData:', initData)
  const newval = _.cloneDeep(initData)
  let data = _.cloneDeep(initList)
  // 合并formItem searchItem
  data.forEach((v: any, i: any) => {
    if (type === 'filter') {
      data[i].formItem = {
        ...(v.searchItem || {}),
      }
    } else {
      data[i].formItem = {
        ...(v.formItem || {}),
      }
    }
  })
  data = data.filter(
    (v: any) =>
      v.formItem &&
      (v.formItem.type === 'date' ||
        v.formItem.type === 'rangeDate' ||
        v.formItem.type === 'time' ||
        v.formItem.ids ||
        v.formItem.idsName ||
        v.formItem.type === 'rangeTime')
  )
  data = data.map((v: any) => ({ ...v, ...(v.formItem || {}) }))
  Object.keys(newval).forEach((key) => {
    newval[key] = MomentValue({
      keyVal: newval[key],
      key,
      data,
      initList,
      newval,
    })
  })
  return newval
}
