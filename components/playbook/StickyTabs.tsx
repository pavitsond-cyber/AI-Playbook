'use client'

import { useEffect, useRef, useState } from 'react'

interface StickyTabsProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export default function StickyTabs({ children, className = '', style }: StickyTabsProps) {
  const markerRef = useRef<HTMLDivElement>(null)
  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    const update = () => {
      const marker = markerRef.current
      const header = document.querySelector<HTMLElement>('.playbook-page-header')
      if (!marker || !header) return

      header.dataset.hasStickyTabs = 'true'
      const nextStuck = marker.getBoundingClientRect().top <= header.getBoundingClientRect().bottom
      header.dataset.tabsStuck = nextStuck ? 'true' : 'false'
      setStuck(current => current === nextStuck ? current : nextStuck)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    document.addEventListener('scroll', update, true)
    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('scroll', update)
      document.removeEventListener('scroll', update, true)
      window.removeEventListener('resize', update)
      const header = document.querySelector<HTMLElement>('.playbook-page-header')
      header?.removeAttribute('data-tabs-stuck')
      header?.removeAttribute('data-has-sticky-tabs')
    }
  }, [])

  return (
    <>
      <div ref={markerRef} className="playbook-sticky-tabs__marker" aria-hidden />
      <div
        className={`playbook-sticky-tabs ${className}`.trim()}
        data-stuck={stuck ? 'true' : 'false'}
        style={style}
      >
        {children}
      </div>
    </>
  )
}
