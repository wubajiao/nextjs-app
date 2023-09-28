/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-09-27 17:44:05
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-09-28 08:54:04
 */
import { title } from 'process'
import styles from './header.module.scss'
const list = [
  { label: '上证指数', total: 3053.22, percent: -0.7, range: -17.8 },
  { label: '深成指数', total: 3053.22, percent: -0.7, range: -17.8 },
  { label: '创业板指', total: 3053.22, percent: -0.7, range: -17.8 },
]

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <div className={title}> X X 作战中心</div>
      </div>
      <div className={styles.right}>
        <div className={styles.exponent}>{}</div>
        <div className={styles.time}></div>
      </div>
    </div>
  )
}
