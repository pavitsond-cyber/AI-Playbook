export default function SiteFooter() {
  return (
    <footer style={{ borderTop: '1px solid #e3e8ee' }} className="mt-16">
      <div className="max-w-3xl mx-auto px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div
            className="size-5 rounded-md flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #533afd, #4434d4)' }}
          >
            <span className="text-white text-[9px] font-bold leading-none">AI</span>
          </div>
          <span className="text-xs font-medium" style={{ color: '#64748d' }}>
            AI Playbook
          </span>
        </div>
        <p className="text-xs text-center" style={{ color: '#a8c3de' }}>
          A practical AI reference · 2026
        </p>
        <p className="text-xs" style={{ color: '#a8c3de' }}>
          ai-playbook-pied.vercel.app
        </p>
      </div>
    </footer>
  )
}
