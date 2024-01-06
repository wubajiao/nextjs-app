/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-09-27 14:59:23
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2024-01-06 23:26:18
 */
import styles from './index.module.scss'

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.copyright}>
          © 深圳市久财科技有限公司｜
          <a href="https://beian.miit.gov.cn/" target="_blank">
            粤ICP备2023148710号-1
          </a>
          ｜
          <a href="https://beian.mps.gov.cn/#/query/webSearch" target="_blank">
            粤公网安备44030002002003号
          </a>
        </div>
      </div>
    </div>
  )
}
