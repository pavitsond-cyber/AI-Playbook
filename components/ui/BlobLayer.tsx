'use client'

export default function BlobLayer() {
  return (
    <div
      aria-hidden
      className="hidden sm:block"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <div style={{
        position: 'absolute',
        top: '-20%', right: '-20%',
        width: '70vw', height: '70vw',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, #9B3FFF 0%, #3D0080 55%, transparent 78%)',
        filter: 'blur(180px)',
        opacity: 0.18,
        animation: 'blob-float-a 18s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%', left: '-10%',
        width: '50vw', height: '50vw',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, #6B00CC 0%, transparent 70%)',
        filter: 'blur(130px)',
        opacity: 0.12,
        animation: 'blob-float-b 22s ease-in-out infinite reverse',
      }} />
      <div style={{
        position: 'absolute',
        top: '40%', right: '15%',
        width: '30vw', height: '30vw',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, #C27FFF 0%, transparent 70%)',
        filter: 'blur(120px)',
        opacity: 0.06,
        animation: 'blob-float-c 15s ease-in-out 3s infinite',
      }} />
      <div style={{
        position: 'absolute',
        top: '20%', left: '40%',
        width: '20vw', height: '20vw',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, #9B3FFF 0%, transparent 70%)',
        filter: 'blur(120px)',
        opacity: 0.07,
        animation: 'blob-float-d 20s ease-in-out 6s infinite',
      }} />
    </div>
  )
}
