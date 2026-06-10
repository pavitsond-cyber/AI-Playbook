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
        background: copied ? '#0d2b1a' : '#f6f9fc',
        color: copied ? '#4ade80' : '#64748d',
        border: '1px solid',
        borderColor: copied ? '#166534' : '#e3e8ee',
        transition: 'background 0.18s ease, border-color 0.18s ease, color 0.18s ease',
      }}
      onMouseEnter={(e) => {
        if (!copied) {
          e.currentTarget.style.background = '#eeeeee'
          e.currentTarget.style.color = '#64748d'
          e.currentTarget.style.borderColor = '#d8d8d8'
        }
      }}
      onMouseLeave={(e) => {
        if (!copied) {
          e.currentTarget.style.background = '#f6f9fc'
          e.currentTarget.style.color = '#64748d'
          e.currentTarget.style.borderColor = '#e3e8ee'
        }
      }}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}
