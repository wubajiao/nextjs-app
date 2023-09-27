/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-09-27 14:59:23
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-09-27 16:12:27
 */
import Link from 'next/link'
import styles from './index.module.scss'
export default function Header() {
  return (
    <div className={`${styles.header}`}>
      <div className={styles.navWrap}>
        <div className={styles.left}>
          <Link href="/">
            <div className={`${styles.logo}`}>leeks</div>
          </Link>
        </div>
        <div className={styles.right}>
          <div className={styles.nav}>
            {[
              { name: '首页', link: '/home' },
              { name: '韭菜导航', link: '/hao' },
              { name: '老九作战中心', link: '/fight' },
            ].map((item) => {
              return (
                <Link key={item.name} href={item.link}>
                  <div className={styles.item}>{item.name}</div>
                </Link>
              )
            })}
          </div>
          <div className={styles.login}>登录</div>
        </div>
      </div>
    </div>
  )
}
