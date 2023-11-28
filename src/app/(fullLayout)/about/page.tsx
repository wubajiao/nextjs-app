/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-09-27 12:01:56
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-11-28 23:10:41
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
    src: 'https://support.qq.com/products/614357',
    icon: contactImg1,
  },
  {
    label: '客服微信',
    value: 'leeks.com',
    src: null,
    icon: contactImg2,
  },
  {
    label: '客服邮箱',
    value: 'help@leeks.com',
    src: null,
    icon: contactImg2,
  },
  {
    label: '公司地址',
    value: '去地图查看',
    src: 'https://map.baidu.com/search/%E5%88%9B%E4%B8%9A%E6%8A%95%E8%B5%84%E5%A4%A7%E5%8E%A6/@12684348.5484615,2558527.31915485,19z?querytype=s&da_src=shareurl&wd=%E5%88%9B%E4%B8%9A%E6%8A%95%E8%B5%84%E5%A4%A7%E5%8E%A6&c=340&src=0&pn=0&sug=0&l=13&b=(12656332,2560194;12717772,2589730)&from=webmap&biz_forward=%7B%22scaler%22:1,%22styles%22:%22pl%22%7D&device_ratio=1',
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
                深圳久财科技有限公司是一家专注于提供金融数据服务和数据分析的公司，致力于为用户提供专业、实时、准确、全面的数据解决方案，我们的使命是通过数据驱动和智能分析，帮助投资者做出明智的决策，实现投资长盈。
              </p>
              <p>
                作为一家创新的金融科技公司，我们拥有一支高素质的团队，由数据科学家、金融专家和技术工程师组成。我们深入了解金融市场的需求，并通过先进的技术和分析方法，提供高质量、准确可靠的数据服务。
              </p>
              <p>
                我们的数据服务涵盖多个领域，包括市场数据、交易数据、风险数据、财经快报等。我们与各大金融机构和数据供应商建立了战略合作伙伴关系，获取多样化的数据源，并通过我们的平台和API接口向客户提供实时、全面的数据支持。
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
