'use client'

import { useState, useRef } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface TagInputProps {
  value: string[]
  onChange: (tags: string[]) => void
  placeholder?: string
  label?: string
  hint?: string
  className?: string
}

export default function TagInput({
  value,
  onChange,
  placeholder = 'Type and press Enter or comma…',
  label,
  hint,
  className,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  function addTag(raw: string) {
    const tag = raw.trim().toLowerCase()
    if (!tag || value.includes(tag)) return
    onChange([...value, tag])
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(inputValue)
      setInputValue('')
    } else if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
      onChange(value.slice(0, -1))
    }
  }

  function handleBlur() {
    if (inputValue.trim()) {
      addTag(inputValue)
      setInputValue('')
    }
  }

  function removeTag(tag: string) {
    onChange(value.filter((t) => t !== tag))
  }

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && <span className="text-sm font-medium text-white/70">{label}</span>}
      <div
        onClick={() => inputRef.current?.focus()}
        className="flex flex-wrap gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10
          focus-within:ring-2 focus-within:ring-purple-500/40 focus-within:border-purple-500/50
          transition-all duration-150 cursor-text min-h-[44px]"
      >
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg
              bg-purple-600/20 text-purple-300 text-xs border border-purple-500/20"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-purple-400 hover:text-white transition-colors"
            >
              <X size={10} />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder={value.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[120px] bg-transparent text-sm text-white
            placeholder:text-white/30 focus:outline-none"
        />
      </div>
      {hint && <p className="text-xs text-white/40">{hint}</p>}
    </div>
  )
}
