'use client'

import { useEffect, useRef } from 'react'

export default function BlobLayer() {
  const aRef = useRef<HTMLDivElement>(null)
  const bRef = useRef<HTMLDivElement>(null)
  const cRef = useRef<HTMLDivElement>(null)
  const dRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (aRef.current) aRef.current.style.transform = `translateY(${y * -0.12}px)`
      if (bRef.current) bRef.current.style.transform = `translateY(${y * 0.08}px)`
      if (cRef.current) cRef.current.style.transform = `translateY(${y * -0.18}px)`
      if (dRef.current) dRef.current.style.transform = `translateY(${y * 0.14}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <div ref={aRef} style={{
        position: 'absolute',
        top: '-20%', right: '-20%',
        width: '70vw', height: '70vw',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, #FF00CC 0%, #6B00CC 50%, transparent 75%)',
        filter: 'blur(120px)',
        opacity: 0.35,
        animation: 'blob-float-a 18s ease-in-out infinite',
        willChange: 'transform',
      }} />
      <div ref={bRef} style={{
        position: 'absolute',
        bottom: '-10%', left: '-10%',
        width: '50vw', height: '50vw',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, #9B3FFF 0%, transparent 70%)',
        filter: 'blur(90px)',
        opacity: 0.30,
        animation: 'blob-float-b 22s ease-in-out infinite reverse',
        willChange: 'transform',
      }} />
      <div ref={cRef} style={{
        position: 'absolute',
        top: '40%', right: '15%',
        width: '30vw', height: '30vw',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, #FFB3EC 0%, transparent 70%)',
        filter: 'blur(80px)',
        opacity: 0.20,
        animation: 'blob-float-c 15s ease-in-out 3s infinite',
        willChange: 'transform',
      }} />
      <div ref={dRef} style={{
        position: 'absolute',
        top: '20%', left: '40%',
        width: '20vw', height: '20vw',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, #CC00AA 0%, transparent 70%)',
        filter: 'blur(100px)',
        opacity: 0.25,
        animation: 'blob-float-d 20s ease-in-out 6s infinite',
        willChange: 'transform',
      }} />
    </div>
  )
}
