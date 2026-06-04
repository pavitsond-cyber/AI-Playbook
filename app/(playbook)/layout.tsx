import TopNav from '@/components/nav/TopNav'

export default function PlaybookLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: '#0A0010' }}>
      <TopNav />
      <main style={{ paddingTop: 64 }}>{children}</main>
    </div>
  )
}
