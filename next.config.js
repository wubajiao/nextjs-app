/*
 * @Descripttion : 
 * @Author       : wuhaidong
 * @Date         : 2023-12-29 15:49:12
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2024-01-11 11:51:59
 */
/** @type {import('next').NextConfig} */
const nextConfig = {

  // 环境变量设置
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  }

}

module.exports = nextConfig
