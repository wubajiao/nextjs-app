/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-09-27 12:01:56
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-12-15 14:15:04
 */
'use client'
import React from 'react'
import Image from 'next/image'
import styles from './index.module.scss'
import aboutImg from '../assets/images/about.png'
import contactImg1 from '../assets/images/contact1.png'
import contactImg2 from '../assets/images/contact2.png'
import contactImg3 from '../assets/images/contact3.png'

const contacts = [
  {
    label: '帮助&反馈',
    value: '去反馈',
    src: null, // 'https://support.qq.com/products/614357',
    icon: contactImg1,
  },
  {
    label: '客服微信',
    value: 'leeks.cn',
    src: null,
    icon: contactImg2,
  },
  {
    label: '客服邮箱',
    value: 'help@leeks.cn',
    src: null,
    icon: contactImg2,
  },
  {
    label: '公司地址',
    value: '去地图查看',
    src: 'https://map.baidu.com/poi/%E8%A5%BF%E4%B8%BD%E9%98%B3%E5%85%89%E5%B7%A5%E4%B8%9A%E5%8C%BA-%E6%96%B0%E5%81%A5%E5%85%B4%E5%B7%A5%E4%B8%9A%E5%9B%AD/@12684143.625,2571976.77,19z?uid=e6de8feb2d782820ca09f0ea&ugc_type=3&ugc_ver=1&device_ratio=1&compat=1&pcevaname=pc4.1&querytype=detailConInfo&da_src=shareurl',
    icon: contactImg3,
  },
]

function about() {
  return (
    <div className={styles.about}>
      <div className={styles.banner}>
        <div className={styles.title}>
          <div className={styles.bold}>公司介绍</div>
        </div>
      </div>
      <div className={styles.contentwrap}>
        <div className={styles.content}>
          <div className={styles.introduce}>
            <div className={styles.left}>
              <p>
                久财科技是一家专注于提供金融数据服务和数据分析的DaaS（数据即服务）型公司，致力于为用户提供专业、实时、准确、全面的数据解决方案，我们的使命是通过数据驱动和智能分析，帮助投资者做出明智的决策，实现投资长盈。
              </p>
              <p>
                作为一家创新的金融科技公司，我们拥有一支高素质的团队，由数据专家、金融专家和技术工程师组成。我们深入了解金融市场的需求，并通过先进的技术和分析方法，提供高质量、准确可靠的数据服务。
              </p>
              <p>
                我们的数据服务涵盖多个领域，包括市场数据、交易数据、风险数据、财经数据等。我们与各大金融机构和数据供应商建立了战略合作伙伴关系，获取多样化的数据源，并通过我们的平台和API接口向客户提供实时、全面的数据支持。
              </p>
              <p>
                除了数据服务，我们还提供定制化的解决方案和咨询服务，帮助客户根据其特定需求进行数据分析、模型构建和决策支持。我们与客户紧密合作，理解他们的业务目标，并为其提供量身定制的解决方案，帮助投资者在竞争激烈的金融市场中取得成功。
              </p>
            </div>
            <div className={styles.right}>
              <Image src={aboutImg} alt="" className={styles.img} />
            </div>
          </div>
          <div className={styles.title}>联系我们</div>
          <div className={styles.contact}>
            {contacts.map((item) => {
              return (
                <div key={item.label} className={styles.item}>
                  <div className={styles.left}>
                    <Image src={item.icon} alt="" width={56} />
                  </div>
                  <div className={styles.right}>
                    <div>{item.label}</div>
                    {item.src ? (
                      <a href={item.src} target="_blank">
                        <div style={{ color: '#1677ff' }}>{item.value}</div>
                      </a>
                    ) : (
                      <div>{item.value}</div>
                    )}
                  </div>
                </div>
              )
            })}
            <div></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default about
