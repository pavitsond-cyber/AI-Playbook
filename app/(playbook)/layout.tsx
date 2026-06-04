import TopNav from '@/components/nav/TopNav'

export default function PlaybookLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: '#f6f9fc' }}>
      <TopNav />
      <main>{children}</main>
    </div>
  )
}
