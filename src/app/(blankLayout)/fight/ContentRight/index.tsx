/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-09-27 17:44:05
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-11-02 21:48:55
 */
'use client'
import React, { useState, useEffect } from 'react'
import request from '@/utils/request'
import { Divider } from '@nextui-org/react'
import styles from './index.module.scss'
import Panel from '../components/Panel'
import Icon from '../components/Icon'
import Title from '../components/Title'

const news = [
  {
    title: '美乌领导人白宫会晤 讨论加强军援应对冬季防务',
    content:
      '财联社9月22日电，美国总统拜登21日在白宫与到访的乌克兰总统泽连斯基举行会晤。泽连斯基表示，自己此行取得多项“重要成果”，包括双方就加强乌克兰军事能力达成新共识、美方将在冬季加强乌克兰的防空能力、双方就扩大乌克兰粮食出口的具体方案达成一致等。美方当天宣布，向乌克兰提供价值3.25亿美元的新一轮军事安全援助。这批援助清单中主要包括“复仇者”防空系统、防空导弹、火炮弹药以及反装甲系统等。 (中新社)',
    time: '10:12:90',
    id: 1,
  },
  {
    title: '美乌领导人白宫会晤 讨论加强军援应对冬季防务',
    content:
      '财联社9月22日电，美国总统拜登21日在白宫与到访的乌克兰总统泽连斯基举行会晤。泽连斯基表示，自己此行取得多项“重要成果”，包括双方就加强乌克兰军事能力达成新共识、美方将在冬季加强乌克兰的防空能力、双方就扩大乌克兰粮食出口的具体方案达成一致等。美方当天宣布，向乌克兰提供价值3.25亿美元的新一轮军事安全援助。这批援助清单中主要包括“复仇者”防空系统、防空导弹、火炮弹药以及反装甲系统等。 (中新社)',
    time: '10:12:90',
    id: 2,
  },
  {
    title: '美乌领导人白宫会晤 讨论加强军援应对冬季防务',
    content:
      '财联社9月22日电，美国总统拜登21日在白宫与到访的乌克兰总统泽连斯基举行会晤。泽连斯基表示，自己此行取得多项“重要成果”，包括双方就加强乌克兰军事能力达成新共识、美方将在冬季加强乌克兰的防空能力、双方就扩大乌克兰粮食出口的具体方案达成一致等。美方当天宣布，向乌克兰提供价值3.25亿美元的新一轮军事安全援助。这批援助清单中主要包括“复仇者”防空系统、防空导弹、火炮弹药以及反装甲系统等。 (中新社)',
    time: '10:12:90',
    id: 3,
  },
  {
    title: '美乌领导人白宫会晤 讨论加强军援应对冬季防务',
    content:
      '财联社9月22日电，美国总统拜登21日在白宫与到访的乌克兰总统泽连斯基举行会晤。泽连斯基表示，自己此行取得多项“重要成果”，包括双方就加强乌克兰军事能力达成新共识、美方将在冬季加强乌克兰的防空能力、双方就扩大乌克兰粮食出口的具体方案达成一致等。美方当天宣布，向乌克兰提供价值3.25亿美元的新一轮军事安全援助。这批援助清单中主要包括“复仇者”防空系统、防空导弹、火炮弹药以及反装甲系统等。 (中新社)',
    time: '10:12:90',
    id: 4,
  },
  {
    title: '美乌领导人白宫会晤 讨论加强军援应对冬季防务',
    content:
      '财联社9月22日电，美国总统拜登21日在白宫与到访的乌克兰总统泽连斯基举行会晤。泽连斯基表示，自己此行取得多项“重要成果”，包括双方就加强乌克兰军事能力达成新共识、美方将在冬季加强乌克兰的防空能力、双方就扩大乌克兰粮食出口的具体方案达成一致等。美方当天宣布，向乌克兰提供价值3.25亿美元的新一轮军事安全援助。这批援助清单中主要包括“复仇者”防空系统、防空导弹、火炮弹药以及反装甲系统等。 (中新社)',
    time: '10:12:90',
    id: 5,
  },
  {
    title: '美乌领导人白宫会晤 讨论加强军援应对冬季防务',
    content:
      '财联社9月22日电，美国总统拜登21日在白宫与到访的乌克兰总统泽连斯基举行会晤。泽连斯基表示，自己此行取得多项“重要成果”，包括双方就加强乌克兰军事能力达成新共识、美方将在冬季加强乌克兰的防空能力、双方就扩大乌克兰粮食出口的具体方案达成一致等。美方当天宣布，向乌克兰提供价值3.25亿美元的新一轮军事安全援助。这批援助清单中主要包括“复仇者”防空系统、防空导弹、火炮弹药以及反装甲系统等。 (中新社)',
    time: '10:12:90',
    id: 6,
  },
]

export default function ContentRight() {
  const [hotStocks, setHotstocks] = useState<any>([])

  useEffect(() => {
    gethotStocks()
    const timer = setInterval(() => {
      gethotStocks()
    }, 60 * 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  // 获取热股 - 沪深type=12
  const gethotStocks = () => {
    request
      .get(`/allStock/hotStock?size=8&type=12`)
      .then((response) => {
        const { data } = response
        setHotstocks(data?.items || [])
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div className={styles.contentRight}>
      <Panel className={styles.hot}>
        <Title name="热股" style={{ marginBottom: 24 }}></Title>
        {hotStocks.map((item: any, index: number) => {
          return (
            <div key={item.code} className={styles.hotItem}>
              <div className={`${styles.index} ${index < 3 && styles.up}`}>
                {index + 1}
              </div>
              <div className={styles.name}>{item.name}</div>
              <Icon
                type={item.increment > 0 ? 'arrowup' : 'arrowdown'}
                className={`${item.increment > 0 && styles.up} ${
                  item.increment < 0 && styles.down
                } ${item.increment === 0 && styles.normal}`}
              />
              <div
                className={`${styles.value} ${
                  item.increment > 0 && styles.up
                } ${item.increment < 0 && styles.down} ${
                  item.increment === 0 && styles.normal
                }`}
              >
                {item.value}
              </div>
            </div>
          )
        })}
      </Panel>
      <Panel className={styles.newsWrap}>
        <Title name="快讯"></Title>
        <div className={styles.news}>
          {news.map((item) => {
            return (
              <div key={item.id} className={styles.newItem}>
                <div className={styles.left}>{item.time}</div>
                <div className={styles.right}>
                  <div className={styles.title}>【{item.title}】</div>
                  <div className={styles.content}>{item.content}</div>
                </div>
              </div>
            )
          })}
          <div></div>
        </div>
      </Panel>
    </div>
  )
}
