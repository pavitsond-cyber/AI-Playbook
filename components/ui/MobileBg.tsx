const BP = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export default function MobileBg() {
  return (
    <div
      aria-hidden
      className="sm:hidden"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        backgroundImage: `url('${BP}/images/mobile-bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    />
  )
}
