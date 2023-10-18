/*
 * @Descripttion : 防抖函数
 * @Author       : wuhaidong
 * @Date         : 2023-10-13 10:41:42
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-10-13 11:05:19
 */
'use client'

export default function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timerId: ReturnType<typeof setTimeout>

  return (...args: Parameters<T>) => {
    if (timerId) {
      clearTimeout(timerId)
    }

    timerId = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
