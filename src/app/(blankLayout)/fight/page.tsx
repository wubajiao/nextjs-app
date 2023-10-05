/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-09-27 12:01:56
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-09-28 17:05:18
 */
import Header from './Header'
import ContentLeft from './ContentLeft'
import styles from './page.module.scss'

function leeks() {
  return (
    <div className={styles.fightPage}>
      <Header />
      <div className={styles.content}>
        <ContentLeft />
      </div>
    </div>
  )
}

export default leeks
