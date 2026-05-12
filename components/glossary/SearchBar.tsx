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
        style={{ color: 'rgba(255,255,255,0.25)' }}
      />
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-3 rounded-xl text-sm text-white
          placeholder:text-white/25 outline-none transition-all duration-200"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: 'none',
        }}
        onFocus={(e) => {
          e.currentTarget.style.border = '1px solid rgba(139,92,246,0.4)'
          e.currentTarget.style.background = 'rgba(124,58,237,0.06)'
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.1)'
        }}
        onBlur={(e) => {
          e.currentTarget.style.border = '1px solid rgba(255,255,255,0.07)'
          e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      />
      {value && (
        <button
          onClick={() => { onChange(''); inputRef.current?.focus() }}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors duration-150"
          style={{ color: 'rgba(255,255,255,0.25)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}
        >
          <X size={13} />
        </button>
      )}
    </div>
  )
}
