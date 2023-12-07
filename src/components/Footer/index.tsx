/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-09-27 14:59:23
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-12-07 11:44:01
 */
import styles from './index.module.scss'

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.copyright}>
          Copyright © 2023 深圳市久财科技有限公司
          {/* ｜ 粤ICP备2023112209号 */}
        </div>
      </div>
    </div>
  )
}
