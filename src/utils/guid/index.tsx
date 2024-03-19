/*
 * @Descripttion : 生成GUID
 * @Author       : wuhaidong
 * @Date         : 2024-03-15 12:21:41
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2024-03-15 12:21:48
 */
const guid = () => {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return `${S4()}${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`
}
export default guid
