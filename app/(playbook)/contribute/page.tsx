'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { Upload, X, CheckCircle, Check, ChevronDown, Loader2, ArrowLeft } from 'lucide-react'
import BlobLayer from '@/components/ui/BlobLayer'

type Category = 'Prompt' | 'Tool' | 'Skill' | 'Miscellaneous' | ''

interface FormData {
  name: string
  email: string
  category: Category
  description: string
  link: string
  attachment: File | null
}

interface FormErrors {
  name?: string
  email?: string
  category?: string
  description?: string
  link?: string
  attachment?: string
  submit?: string
}

const CATEGORIES: Category[] = ['Prompt', 'Tool', 'Skill', 'Miscellaneous']
const ACCEPTED = ['.pdf', '.md', '.txt', '.doc', '.docx']
const ACCEPTED_MIME = [
  'application/pdf', 'text/markdown', 'text/plain',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

/* ── Custom dropdown ──────────────────────────────────────────────────── */
function CategorySelect({
  value, onChange, error,
}: { value: Category; onChange: (v: Category) => void; error?: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', padding: '12px 44px 12px 16px',
          background: open ? 'rgba(155,63,255,0.08)' : 'rgba(255,255,255,0.06)',
          border: `1px solid ${error ? '#9B3FFF' : open ? 'rgba(155,63,255,0.6)' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: open ? '12px 12px 0 0' : 12,
          color: value ? '#ffffff' : 'rgba(255,255,255,0.35)',
          fontSize: 15, fontFamily: 'var(--font-body)',
          textAlign: 'left', cursor: 'pointer',
          transition: 'all 0.18s ease',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxSizing: 'border-box',
        }}
      >
        <span>{value || 'Select a category'}</span>
        <ChevronDown
          size={16}
          color="rgba(255,255,255,0.4)"
          style={{
            position: 'absolute', right: 14,
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.22s ease',
            flexShrink: 0,
          }}
        />
      </button>

      {/* Panel */}
      <div style={{
        position: 'absolute', left: 0, right: 0, zIndex: 50,
        background: '#0E0018',
        border: '1px solid rgba(155,63,255,0.35)',
        borderTop: 'none',
        borderRadius: '0 0 12px 12px',
        overflow: 'hidden',
        clipPath: open ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)',
        transition: open
          ? 'clip-path 0.22s cubic-bezier(0.25,0.46,0.45,0.94)'
          : 'clip-path 0.18s cubic-bezier(0.55,0,1,0.45)',
        pointerEvents: open ? 'auto' : 'none',
        boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
      }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            type="button"
            onClick={() => { onChange(cat); setOpen(false) }}
            style={{
              width: '100%', padding: '12px 16px',
              background: value === cat ? 'rgba(155,63,255,0.15)' : 'transparent',
              border: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)',
              color: value === cat ? '#C27FFF' : 'rgba(255,255,255,0.75)',
              fontSize: 15, fontFamily: 'var(--font-body)',
              textAlign: 'left', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              transition: 'background 0.12s ease, color 0.12s ease',
            }}
            onMouseEnter={e => {
              if (value !== cat) {
                e.currentTarget.style.background = 'rgba(155,63,255,0.08)'
                e.currentTarget.style.color = '#ffffff'
              }
            }}
            onMouseLeave={e => {
              if (value !== cat) {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'rgba(255,255,255,0.75)'
              }
            }}
          >
            {cat}
            {value === cat && <Check size={14} color="#9B3FFF" />}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function ContributePage() {
  const [form, setForm] = useState<FormData>({
    name: '', email: '', category: '', description: '', link: '', attachment: null,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const validate = (): FormErrors => {
    const e: FormErrors = {}
    if (!form.name.trim())                                    e.name        = 'Please enter your name.'
    if (!form.email.trim())                                   e.email       = 'Please enter a valid email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email       = 'Please enter a valid email.'
    if (!form.category)                                       e.category    = 'Please select a category.'
    if (!form.description.trim())                             e.description = 'Please add a short description.'
    if (form.description.length > 500)                        e.description = 'Description must be 500 characters or fewer.'
    if (form.link && !/^https?:\/\/.+/.test(form.link))      e.link        = 'Please enter a valid URL (https://…)'
    if (!form.attachment)                                      e.attachment  = 'Please attach a file.'
    return e
  }

  const handleFile = (file: File) => {
    const ext = '.' + file.name.split('.').pop()?.toLowerCase()
    if (!ACCEPTED.includes(ext) && !ACCEPTED_MIME.includes(file.type)) {
      setErrors(p => ({ ...p, attachment: 'This file type is not supported.' }))
      return
    }
    setErrors(p => ({ ...p, attachment: undefined }))
    setForm(p => ({ ...p, attachment: file }))
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false)
    const f = e.dataTransfer.files[0]; if (f) handleFile(f)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setSubmitting(true)
    try {
      await new Promise(r => setTimeout(r, 1400))
      // TODO: replace with real API — e.g. fetch('https://formspree.io/f/YOUR_ID', { method:'POST', ... })
      console.log('Contribution:', { ...form, attachment: form.attachment?.name, submittedAt: new Date().toISOString() })
      setSubmitted(true)
    } catch {
      setErrors({ submit: 'Something went wrong. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setForm({ name: '', email: '', category: '', description: '', link: '', attachment: null })
    setErrors({}); setSubmitted(false)
  }

  /* Shared styles */
  const inputStyle = (hasError?: string): React.CSSProperties => ({
    width: '100%', padding: '12px 16px',
    background: 'rgba(255,255,255,0.06)',
    border: `1px solid ${hasError ? '#9B3FFF' : 'rgba(255,255,255,0.1)'}`,
    borderRadius: 12, color: '#ffffff', fontSize: 15,
    fontFamily: 'var(--font-body)', outline: 'none',
    transition: 'border-color 0.18s ease, background 0.18s ease',
    boxSizing: 'border-box' as const,
  })
  const focusIn  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'rgba(155,63,255,0.6)'
    e.currentTarget.style.background  = 'rgba(155,63,255,0.06)'
  }
  const focusOut = (err?: string) => (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = err ? '#9B3FFF' : 'rgba(255,255,255,0.1)'
    e.currentTarget.style.background  = 'rgba(255,255,255,0.06)'
  }
  const lbl: React.CSSProperties = { display: 'block', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.8)', marginBottom: 8 }
  const err: React.CSSProperties = { fontFamily: 'var(--font-body)', fontSize: 13, color: '#C27FFF', marginTop: 6 }
  const req = <span style={{ color: '#ffffff', marginLeft: 2 }}>*</span>

  /* ── Success ─────────────────────────────────────────────────────────── */
  if (submitted) {
    return (
      <div style={{ position: 'relative', overflow: 'clip', minHeight: '100vh', background: '#0A0010' }}>
        <BlobLayer />
        <div style={{
          position: 'relative', zIndex: 1,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          minHeight: 'calc(100vh - 64px)', padding: '80px 24px',
        }}>
          <div style={{
            maxWidth: 480, width: '100%', textAlign: 'center',
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 24, padding: '48px 40px',
            boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'rgba(155,63,255,0.12)', border: '1px solid rgba(155,63,255,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px',
            }}>
              <CheckCircle size={28} color="#9B3FFF" />
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: '#ffffff', marginBottom: 12, letterSpacing: '-0.02em' }}>
              Submitted to Headout
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, marginBottom: 32 }}>
              Your entry has been submitted to the Headout team. We&apos;ll review it and get back to you shortly at the email you provided.
            </p>
            <button
              onClick={resetForm}
              style={{
                width: '100%', padding: '14px', borderRadius: 12, border: 'none',
                background: '#9B3FFF', color: '#ffffff', fontSize: 15, fontWeight: 600,
                fontFamily: 'var(--font-body)', cursor: 'pointer',
                transition: 'background 0.18s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#7B2FDF' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#9B3FFF' }}
            >
              Submit another entry
            </button>
          </div>
        </div>
      </div>
    )
  }

  /* ── Form ────────────────────────────────────────────────────────────── */
  return (
    <div style={{ position: 'relative', overflow: 'clip', minHeight: '100vh', background: '#0A0010' }}>
      <BlobLayer />
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Hero */}
        <div className="animate-fade-up delay-75" style={{ padding: '48px clamp(20px,4vw,48px) 32px', maxWidth: 840, margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 12 }}>
            Contribute to the AI Playbook
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
            Share a prompt, tool, skill, or resource worth adding. Submissions are reviewed by the Headout team.
          </p>
        </div>

        {/* Form card — bordered on desktop, edge-to-edge on mobile */}
        <div style={{ maxWidth: 840, margin: '0 auto', padding: '0 0 80px' }}>
          <form onSubmit={handleSubmit} noValidate
            className="contribute-form"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 'clamp(24px,4vw,48px)', boxShadow: '0 24px 64px rgba(0,0,0,0.3)' }}>

            {/* Name + Email */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 24, marginBottom: 24 }}>
              <div>
                <label htmlFor="name" style={lbl}>Your name {req}</label>
                <input id="name" type="text" autoComplete="name" placeholder="Enter your name"
                  value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  onFocus={focusIn} onBlur={focusOut(errors.name)} style={inputStyle(errors.name)} />
                {errors.name && <p style={err}>{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" style={lbl}>Email {req}</label>
                <input id="email" type="email" autoComplete="email" placeholder="you@example.com"
                  value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  onFocus={focusIn} onBlur={focusOut(errors.email)} style={inputStyle(errors.email)} />
                {errors.email && <p style={err}>{errors.email}</p>}
              </div>
            </div>

            {/* Category */}
            <div style={{ marginBottom: 24 }}>
              <label style={lbl}>What are you submitting? {req}</label>
              <CategorySelect value={form.category} onChange={cat => setForm(p => ({ ...p, category: cat }))} error={errors.category} />
              {errors.category && <p style={err}>{errors.category}</p>}
            </div>

            {/* Description */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
                <label htmlFor="description" style={{ ...lbl, marginBottom: 0 }}>Description {req}</label>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: form.description.length > 480 ? '#9B3FFF' : 'rgba(255,255,255,0.25)', transition: 'color 0.18s ease' }}>
                  {form.description.length}/500
                </span>
              </div>
              <textarea id="description" rows={5}
                placeholder="Tell us what this is, why it is useful, and how designers can use it."
                value={form.description} maxLength={500}
                onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                onFocus={focusIn} onBlur={focusOut(errors.description)}
                style={{ ...inputStyle(errors.description), resize: 'vertical', minHeight: 120, lineHeight: 1.6 }} />
              {errors.description && <p style={err}>{errors.description}</p>}
            </div>

            {/* Link — no "(optional)" label */}
            <div style={{ marginBottom: 24 }}>
              <label htmlFor="link" style={lbl}>Link</label>
              <input id="link" type="url" placeholder="Paste a URL, if available"
                value={form.link} onChange={e => setForm(p => ({ ...p, link: e.target.value }))}
                onFocus={focusIn} onBlur={focusOut(errors.link)} style={inputStyle(errors.link)} />
              {errors.link && <p style={err}>{errors.link}</p>}
            </div>

            {/* Attachment */}
            <div style={{ marginBottom: 36 }}>
              <label style={lbl}>Attachment</label>
              {form.attachment ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(155,63,255,0.08)', border: '1px solid rgba(155,63,255,0.25)', borderRadius: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(155,63,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Upload size={14} color="#C27FFF" />
                    </div>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>{form.attachment.name}</span>
                  </div>
                  <button type="button" onClick={() => { setForm(p => ({ ...p, attachment: null })); if (fileRef.current) fileRef.current.value = '' }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', padding: 4, borderRadius: 6, display: 'flex', transition: 'color 0.18s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#C27FFF' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)' }}
                    aria-label="Remove file"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div onClick={() => fileRef.current?.click()}
                  onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={onDrop}
                  style={{ padding: '28px 20px', background: dragOver ? 'rgba(155,63,255,0.08)' : 'rgba(255,255,255,0.03)', border: `1px dashed ${errors.attachment ? '#9B3FFF' : dragOver ? 'rgba(155,63,255,0.5)' : 'rgba(255,255,255,0.12)'}`, borderRadius: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer', transition: 'all 0.18s ease' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Upload size={18} color="rgba(255,255,255,0.4)" />
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(255,255,255,0.5)', margin: 0 }}>Click to upload or drag and drop</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.25)', margin: 0 }}>PDF, Markdown, TXT, DOC, DOCX</p>
                </div>
              )}
              <input ref={fileRef} type="file" accept={ACCEPTED.join(',')} style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
              {errors.attachment && <p style={err}>{errors.attachment}</p>}
            </div>

            {/* Submit row — right-aligned on desktop, full-width on mobile */}
            <div className="submit-row" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
              {errors.submit && (
                <p style={{ ...err, alignSelf: 'stretch', padding: '12px 16px', background: 'rgba(155,63,255,0.08)', border: '1px solid rgba(155,63,255,0.2)', borderRadius: 10, margin: 0 }}>
                  {errors.submit}
                </p>
              )}
              <button
                type="submit"
                disabled={submitting}
                style={{
                  padding: '14px 32px', borderRadius: 12, border: 'none',
                  background: submitting ? 'rgba(155,63,255,0.5)' : '#9B3FFF',
                  color: '#ffffff', fontSize: 15, fontWeight: 600,
                  fontFamily: 'var(--font-body)', cursor: submitting ? 'not-allowed' : 'pointer',
                  transition: 'background 0.18s ease',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  textAlign: 'center',
                  opacity: submitting ? 0.8 : 1,
                  letterSpacing: '-0.01em', minWidth: 160,
                }}
                onMouseEnter={e => { if (!submitting) e.currentTarget.style.background = '#7B2FDF' }}
                onMouseLeave={e => { if (!submitting) e.currentTarget.style.background = '#9B3FFF' }}
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} style={{ animation: 'spin 0.8s linear infinite' }} />
                    Submitting…
                  </>
                ) : 'Submit entry'}
              </button>
            </div>

          </form>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        select option { background: #0E0018; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.25); }
        input:focus, textarea:focus { outline: none; }
        /* Mobile: no card — full-width, no border, no shadow, no radius */
        @media (max-width: 639px) {
          .contribute-form {
            background: transparent !important;
            border: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            padding: 0 20px !important;
          }
          .submit-row {
            align-items: stretch !important;
          }
          .submit-row button[type="submit"] {
            width: 100% !important;
            min-width: unset !important;
          }
        }
      `}</style>
    </div>
  )
}
