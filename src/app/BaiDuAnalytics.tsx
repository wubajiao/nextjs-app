/*
 * @Descripttion : 百度统计
 * @Author       : wuhaidong
 * @Date         : 2023-12-21 15:28:42
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-12-21 15:31:16
 */
'use client'
import Script from 'next/script'
const BaiDuAnalytics = () => {
  return (
    <>
      <Script
        id="baidu-tongji"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          var _hmt = _hmt || [];
          (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?89261032393e59fdc3edd28d46a88756";
            var s = document.getElementsByTagName("script")[0]; 
            s.parentNode.insertBefore(hm, s);
          `,
        }}
      />
    </>
  )
}
export default BaiDuAnalytics
