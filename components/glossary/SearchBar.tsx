'use client'

import { Search, X } from 'lucide-react'
import { useRef } from 'react'
import { cn } from '@/lib/utils/cn'

interface SearchBarProps {
  value: string
  onChange: (v: string) => void
  className?: string
  placeholder?: string
}

export default function SearchBar({
  value,
  onChange,
  className,
  placeholder = 'Search terms, abbreviations, tools…',
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className={cn('relative', className)}>
      <Search
        size={15}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ color: 'rgba(255,255,255,0.3)' }}
      />
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-3 rounded-xl text-sm outline-none transition-all duration-200"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 12,
          color: 'rgba(255,255,255,0.88)',
          boxShadow: 'none',
        }}
        onFocus={(e) => {
          e.currentTarget.style.border = '1px solid rgba(155,63,255,0.5)'
          e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(155,63,255,0.1)'
        }}
        onBlur={(e) => {
          e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)'
          e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      />
      {value && (
        <button
          onClick={() => { onChange(''); inputRef.current?.focus() }}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors duration-150"
          style={{ color: 'rgba(255,255,255,0.3)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
        >
          <X size={13} />
        </button>
      )}
    </div>
  )
}
