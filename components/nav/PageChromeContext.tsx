'use client'

import { createContext, useContext, useState, useRef, useEffect, type RefObject } from 'react'

interface PageChromeCtx {
  dockedTitle: string | null
  setDockedTitle: (t: string | null) => void
}

const PageChromeContext = createContext<PageChromeCtx>({
  dockedTitle: null,
  setDockedTitle: () => {},
})

export function PageChromeProvider({ children }: { children: React.ReactNode }) {
  const [dockedTitle, setDockedTitle] = useState<string | null>(null)
  return (
    <PageChromeContext.Provider value={{ dockedTitle, setDockedTitle }}>
      {children}
    </PageChromeContext.Provider>
  )
}

export function usePageChrome() {
  return useContext(PageChromeContext)
}

/**
 * Attach the returned ref to a div wrapping the page title (e.g. PageHeader).
 * When that element scrolls above the fixed nav, the title docks into the top bar.
 * On unmount (route change) the docked title is cleared automatically.
 */
export function useDockedTitle(title: string): RefObject<HTMLDivElement | null> {
  const { setDockedTitle } = usePageChrome()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Shrink the viewport observation area by the nav height so the dock
    // triggers the moment the title disappears behind the fixed nav bar.
    const observer = new IntersectionObserver(
      ([entry]) => {
        setDockedTitle(entry.isIntersecting ? null : title)
      },
      { rootMargin: '-64px 0px 0px 0px', threshold: 0 }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
      setDockedTitle(null)
    }
  }, [title, setDockedTitle])

  return ref
}
