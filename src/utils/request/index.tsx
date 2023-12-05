/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-10-12 11:30:09
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-12-05 18:09:18
 */
import axios from 'axios'
import { message } from 'antd'

let baseURL = '' // 你的API基本URL
if (process.env.NODE_ENV === 'development') {
  // 在开发环境下执行的代码
  baseURL = 'http://www.localhost:4000/api'
} else if (process.env.NODE_ENV === 'production') {
  // 在生产环境下执行的代码
  baseURL = 'http://192.168.110.101:4000/api'
}

// 创建一个独立的Axios实例
const instance = axios.create({
  baseURL,
  timeout: 5000, // 请求超时时间（毫秒）
})

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在请求发送前可以在这里进行一些处理，例如添加请求头
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 在这里对响应数据进行处理，然后将数据返回
    return response.data
  },
  (error) => {
    // 处理响应错误
    if (error.response) {
      const status = error.response.status
      const data = error.response.data

      // 根据HTTP状态码处理不同的错误情况
      switch (status) {
        case 401: // 未授权错误
          message.error('未授权，请先登录！')
          break
        case 403: // 禁止访问错误
          message.error('没有权限！')

          break
        case 404: // 未找到错误
          console.error('404', status, data)
          break
        case 400: // 客户端错误
          message.error(data.message)
          break
        default:
          // 处理其他HTTP错误
          console.error('HTTP Error', status, data)
          break
      }
    } else if (error.request) {
      // 处理请求被发出，但没有收到响应的情况
      console.error('No response received', error.request)
    } else {
      // 处理请求无法发送的情况
      console.error('Error', error.message)
    }

    return Promise.reject(error)
  }
)

export default instance // 导出封装好的Axios实例
