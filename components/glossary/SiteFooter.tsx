export default function SiteFooter() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }} className="mt-16">
      <div className="max-w-3xl mx-auto px-5 py-8 flex flex-col sm:flex-row items-center
        justify-between gap-3">
        <div className="flex items-center gap-2">
          <div
            className="size-5 rounded-md flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              boxShadow: '0 0 8px rgba(124,58,237,0.3)',
            }}
          >
            <span className="text-white text-[9px] font-bold leading-none">H</span>
          </div>
          <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.22)' }}>
            Headout
          </span>
        </div>
        <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.15)' }}>
          Made for the Headout AI Education Session · 2026
        </p>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.12)' }}>
          Internal use only
        </p>
      </div>
    </footer>
  )
}
