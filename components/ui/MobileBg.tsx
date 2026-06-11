export default function MobileBg() {
  return (
    <div
      aria-hidden
      className="sm:hidden"
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    >
      {/* Noise/texture layer from Figma node 163:589 */}
      <img
        src="/images/mobile-bg.jpg"
        alt=""
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
        }}
      />
      {/* Gradient overlay matching Figma node 163:590 — blur(100px) smooths the texture */}
      <div
        style={{
          position: 'absolute', inset: 0,
          backdropFilter: 'blur(100px)',
          WebkitBackdropFilter: 'blur(100px)',
          background: 'linear-gradient(176.63deg, rgb(14,20,57) 5.67%, rgba(14,20,57,0.4) 129.83%)',
        }}
      />
    </div>
  )
}
