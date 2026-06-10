'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CopyButtonProps {
  text: string
  className?: string
}

export default function CopyButton({ text, className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      aria-label="Copy to clipboard"
      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium ${className}`}
      style={{
        /* Default: matches .md button dark style */
        background: copied ? '#0d2b1a' : 'rgba(255,255,255,0.05)',
        color: copied ? '#4ade80' : '#ffffff',
        border: '1px solid',
        borderColor: copied ? '#166534' : 'rgba(255,255,255,0.09)',
        transition: 'background 0.18s ease, border-color 0.18s ease, color 0.18s ease',
      }}
      onMouseEnter={(e) => {
        if (!copied) {
          e.currentTarget.style.background = 'rgba(155,63,255,0.12)'
          e.currentTarget.style.color = '#C27FFF'
          e.currentTarget.style.borderColor = 'rgba(155,63,255,0.25)'
        }
      }}
      onMouseLeave={(e) => {
        if (!copied) {
          e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
          e.currentTarget.style.color = '#ffffff'
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'
        }
      }}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}
