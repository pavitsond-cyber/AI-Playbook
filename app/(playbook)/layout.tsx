import SidebarNav from '@/components/nav/SidebarNav'
import MobileNavDrawer from '@/components/nav/MobileNavDrawer'

export default function PlaybookLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar - hidden on mobile */}
      <aside className="hidden lg:block fixed left-0 top-0 h-full w-60 z-20 overflow-y-auto scrollbar-hide">
        <SidebarNav />
      </aside>

      {/* Mobile nav drawer */}
      <div className="lg:hidden">
        <MobileNavDrawer />
      </div>

      {/* Main content */}
      <main className="flex-1 lg:ml-60 min-w-0 pt-14 lg:pt-0">
        {children}
      </main>
    </div>
  )
}
