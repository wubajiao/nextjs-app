/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2023-09-27 16:26:41
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-09-27 17:50:45
 */
export default function FullLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main>{children}</main>
    </>
  )
}
