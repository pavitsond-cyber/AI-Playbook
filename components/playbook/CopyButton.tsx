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
      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${className}`}
      style={{
        background: copied ? 'rgba(34,197,94,0.1)' : '#f6f9fc',
        color: copied ? '#16a34a' : '#64748d',
        border: '1px solid',
        borderColor: copied ? 'rgba(34,197,94,0.3)' : '#e3e8ee',
      }}
      onMouseEnter={(e) => {
        if (!copied) {
          e.currentTarget.style.background = '#533afd'
          e.currentTarget.style.color = '#ffffff'
          e.currentTarget.style.borderColor = '#533afd'
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
