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
        style={{ color: '#a8c3de' }}
      />
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-3 rounded-xl text-sm outline-none transition-all duration-200"
        style={{
          background: '#f6f9fc',
          border: '1px solid #e3e8ee',
          color: '#0d253d',
          boxShadow: 'none',
        }}
        onFocus={(e) => {
          e.currentTarget.style.border = '1px solid #533afd'
          e.currentTarget.style.background = '#ffffff'
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(83,58,253,0.1)'
        }}
        onBlur={(e) => {
          e.currentTarget.style.border = '1px solid #e3e8ee'
          e.currentTarget.style.background = '#f6f9fc'
          e.currentTarget.style.boxShadow = 'none'
        }}
      />
      {value && (
        <button
          onClick={() => { onChange(''); inputRef.current?.focus() }}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors duration-150"
          style={{ color: '#64748d' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#0d253d')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#64748d')}
        >
          <X size={13} />
        </button>
      )}
    </div>
  )
}
