/*
 * @Descripttion : 节流函数
 * @Author       : wuhaidong
 * @Date         : 2023-10-13 10:40:27
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-10-13 12:23:19
 */
'use client'

export default function throttle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  
  let timerId: ReturnType<typeof setTimeout> | undefined
  let lastTime = 0

  return (...args: Parameters<T>) => {
    const currentTime = Date.now()

    if (currentTime - lastTime >= delay) {
      lastTime = currentTime
      fn(...args)
    } else {
      if (timerId) {
        clearTimeout(timerId)
      }

      timerId = setTimeout(() => {
        lastTime = Date.now()
        fn(...args)
      }, delay - (currentTime - lastTime))
    }
  }
}
