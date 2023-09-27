export default function FullLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>header</div>
      <main>{children}</main>
    </>
  )
}
