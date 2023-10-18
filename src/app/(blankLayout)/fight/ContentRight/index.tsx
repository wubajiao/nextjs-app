/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-09-27 17:44:05
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-10-13 10:53:19
 */
'use client'
import React from 'react'
import { Divider } from '@nextui-org/react'
import styles from './index.module.scss'
import Panel from '../components/Panel'
import Icon from '../components/Icon'
import Title from '../components/Title'

const list = [
  {
    type: 20,
    code: 'SH601127',
    name: '赛力斯',
    value: 31232,
    increment: 356,
    rank_change: 0,
    has_exist: null,
    symbol: 'SH601127',
    percent: 10.01,
    current: 55.72,
    chg: 5.07,
    exchange: 'SH',
    stock_type: 11,
    sub_type: 'ASH',
    ad: 0,
    trade_session: null,
    current_ext: null,
    percent_ext: null,
  },
  {
    type: 20,
    code: 'SH603361',
    name: '浙江国祥',
    value: 25301,
    increment: -203,
    rank_change: 0,
    has_exist: null,
    symbol: 'SH603361',
    percent: null,
    current: null,
    chg: null,
    exchange: 'SH',
    stock_type: 11,
    sub_type: null,
    ad: 0,
    trade_session: null,
    current_ext: null,
    percent_ext: null,
  },
  {
    type: 20,
    code: 'SZ002456',
    name: '欧菲光',
    value: 17379,
    increment: 139,
    rank_change: 0,
    has_exist: null,
    symbol: 'SZ002456',
    percent: 9.97,
    current: 6.4,
    chg: 0.58,
    exchange: 'SZ',
    stock_type: 11,
    sub_type: '1',
    ad: 0,
    trade_session: null,
    current_ext: null,
    percent_ext: null,
  },
  {
    type: 20,
    code: 'SH601888',
    name: '中国中免',
    value: 12772,
    increment: 171,
    rank_change: 0,
    has_exist: null,
    symbol: 'SH601888',
    percent: -1.42,
    current: 105.97,
    chg: -1.53,
    exchange: 'SH',
    stock_type: 11,
    sub_type: 'ASH',
    ad: 0,
    trade_session: null,
    current_ext: null,
    percent_ext: null,
  },
  {
    type: 20,
    code: 'SH603496',
    name: '恒为科技',
    value: 11361,
    increment: 167,
    rank_change: 0,
    has_exist: null,
    symbol: 'SH603496',
    percent: 9.99,
    current: 29.74,
    chg: 2.7,
    exchange: 'SH',
    stock_type: 11,
    sub_type: 'ASH',
    ad: 0,
    trade_session: null,
    current_ext: null,
    percent_ext: null,
  },
  {
    type: 20,
    code: 'SZ002281',
    name: '光迅科技',
    value: 8886,
    increment: 102,
    rank_change: 0,
    has_exist: null,
    symbol: 'SZ002281',
    percent: 0.72,
    current: 32.26,
    chg: 0.23,
    exchange: 'SZ',
    stock_type: 11,
    sub_type: '1',
    ad: 0,
    trade_session: null,
    current_ext: null,
    percent_ext: null,
  },
  {
    type: 20,
    code: 'SZ300351',
    name: '永贵电器',
    value: 8740,
    increment: 0,
    rank_change: 0,
    has_exist: null,
    symbol: 'SZ300351',
    percent: 0.82,
    current: 13.46,
    chg: 0.11,
    exchange: 'SZ',
    stock_type: 11,
    sub_type: '3',
    ad: 0,
    trade_session: null,
    current_ext: null,
    percent_ext: null,
  },
  {
    type: 20,
    code: 'PDD',
    name: '拼多多',
    value: 8078,
    increment: -128,
    rank_change: 0,
    has_exist: null,
    symbol: 'PDD',
    percent: 7.4014,
    current: 105.64,
    chg: 7.28,
    exchange: 'NASDAQ',
    stock_type: 0,
    sub_type: '1536',
    ad: 0,
    trade_session: 3,
    current_ext: 106.01,
    percent_ext: 0.350246,
  },
]

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
  return (
    <div className={styles.contentRight}>
      <Panel className={styles.hot}>
        <Title name="热股" style={{ marginBottom: 24 }}></Title>
        {list.map((item, index) => {
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
