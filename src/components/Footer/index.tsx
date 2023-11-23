/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-09-27 14:59:23
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-11-22 15:09:56
 */
import styles from './index.module.scss'

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.copyright}>
          Copyright © 2023 深圳久财 ｜ 粤ICP备2023112209号
        </div>
      </div>
    </div>
  )
}
