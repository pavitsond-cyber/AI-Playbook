'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { BookOpen, LayoutDashboard, Plus, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { createClient } from '@/lib/supabase/client'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/terms/new', label: 'New Term', icon: Plus },
]

export default function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()

  async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <nav className="flex items-center justify-between px-4 py-3 border-b border-white/[0.07] bg-[#0d0d0d]">
      <div className="flex items-center gap-2">
        <div className="size-7 rounded-lg bg-purple-600 flex items-center justify-center">
          <BookOpen size={14} className="text-white" />
        </div>
        <span className="text-sm font-semibold text-white">AI Glossary</span>
        <span className="text-xs text-white/30 font-medium px-1.5 py-0.5 rounded-md bg-white/5">
          Admin
        </span>
      </div>

      <div className="flex items-center gap-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all duration-150',
                active
                  ? 'bg-purple-600/20 text-purple-300'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              )}
            >
              <Icon size={14} />
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          )
        })}

        <button
          onClick={signOut}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm
            text-white/30 hover:text-white/70 hover:bg-white/5 transition-all duration-150 ml-1"
        >
          <LogOut size={14} />
          <span className="hidden sm:inline">Sign out</span>
        </button>
      </div>
    </nav>
  )
}
