'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArrowLeft, Search } from 'lucide-react'
import MobileSearchSheet from '@/components/search/MobileSearchSheet'
import { usePageChrome } from '@/components/nav/PageChromeContext'

export default function TopNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [searchOpen, setSearchOpen] = useState(false)
  const { dockedTitle } = usePageChrome()
  const isHome = pathname === '/'

  const goBack = () => {
    if (window.history.length > 1) {
      router.back()
      return
    }
    router.push('/')
  }

  return (
    <>
      <header
        className="playbook-page-header"
        data-docked={dockedTitle ? 'true' : 'false'}
      >
        <div className="playbook-page-header__backdrop" aria-hidden />

        <div className="playbook-page-header__content">
          {!isHome && (
            <button
              type="button"
              onClick={goBack}
              aria-label="Back"
              className="playbook-header-control playbook-header-control--frost"
            >
              <ArrowLeft size={24} strokeWidth={2} aria-hidden />
            </button>
          )}

          {!isHome && (
            <span
              aria-hidden={!dockedTitle}
              className="playbook-page-header__title"
            >
              {dockedTitle}
            </span>
          )}

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="playbook-header-control playbook-page-header__search"
          >
            <Search size={28} strokeWidth={2} aria-hidden />
          </button>
        </div>
      </header>

      <MobileSearchSheet open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
