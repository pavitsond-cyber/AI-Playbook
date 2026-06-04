import TopNav from '@/components/nav/TopNav'
import GlobalSearch from '@/components/search/GlobalSearch'
import { SearchProvider } from '@/lib/context/search-context'

export default function PlaybookLayout({ children }: { children: React.ReactNode }) {
  return (
    <SearchProvider>
      <div className="min-h-screen" style={{ background: '#f6f9fc' }}>
        <TopNav />
        <main>{children}</main>
        <GlobalSearch />
      </div>
    </SearchProvider>
  )
}
