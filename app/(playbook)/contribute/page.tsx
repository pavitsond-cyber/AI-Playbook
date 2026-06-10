'use client'

import { useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import { Upload, X, CheckCircle, ArrowLeft } from 'lucide-react'
import BlobLayer from '@/components/ui/BlobLayer'
import SiteFooter from '@/components/glossary/SiteFooter'

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

const ACCEPTED = ['.pdf', '.md', '.txt', '.doc', '.docx']
const ACCEPTED_MIME = [
  'application/pdf',
  'text/markdown',
  'text/plain',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

export default function ContributePage() {
  const [form, setForm] = useState<FormData>({
    name: '', email: '', category: '', description: '', link: '', attachment: null,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  /* ── Validation ─────────────────────────────────────────────────────── */
  const validate = (): FormErrors => {
    const e: FormErrors = {}
    if (!form.name.trim())                               e.name        = 'Please enter your name.'
    if (!form.email.trim())                              e.email       = 'Please enter a valid email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email.'
    if (!form.category)                                  e.category    = 'Please select a category.'
    if (!form.description.trim())                        e.description = 'Please add a short description.'
    if (form.description.length > 500)                   e.description = 'Description must be 500 characters or fewer.'
    if (form.link && !/^https?:\/\/.+/.test(form.link)) e.link        = 'Please enter a valid URL starting with http:// or https://'
    return e
  }

  /* ── File handling ──────────────────────────────────────────────────── */
  const handleFile = (file: File) => {
    const ext = '.' + file.name.split('.').pop()?.toLowerCase()
    if (!ACCEPTED.includes(ext) && !ACCEPTED_MIME.includes(file.type)) {
      setErrors(prev => ({ ...prev, attachment: 'This file type is not supported.' }))
      return
    }
    setErrors(prev => ({ ...prev, attachment: undefined }))
    setForm(prev => ({ ...prev, attachment: file }))
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [])

  /* ── Submit ─────────────────────────────────────────────────────────── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setSubmitting(true)
    try {
      // Simulate async submission — replace with your API call
      await new Promise(r => setTimeout(r, 1200))
      const payload = {
        name: form.name,
        email: form.email,
        category: form.category,
        description: form.description,
        link: form.link || undefined,
        attachment: form.attachment?.name || undefined,
        submittedAt: new Date().toISOString(),
      }
      console.log('Contribution submitted:', payload)
      setSubmitted(true)
    } catch {
      setErrors({ submit: 'Something went wrong. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setForm({ name: '', email: '', category: '', description: '', link: '', attachment: null })
    setErrors({})
    setSubmitted(false)
  }

  /* ── Shared field styles ─────────────────────────────────────────────── */
  const inputStyle = (hasError?: string): React.CSSProperties => ({
    width: '100%',
    padding: '12px 16px',
    background: 'rgba(255,255,255,0.06)',
    border: `1px solid ${hasError ? '#FF4D6D' : 'rgba(255,255,255,0.1)'}`,
    borderRadius: 12,
    color: '#ffffff',
    fontSize: 15,
    fontFamily: 'var(--font-body)',
    outline: 'none',
    transition: 'border-color 0.18s ease, background 0.18s ease',
    boxSizing: 'border-box',
  })

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-body)',
    fontSize: 14,
    fontWeight: 500,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
  }

  const errorStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body)',
    fontSize: 13,
    color: '#FF4D6D',
    marginTop: 6,
  }

  const optionalStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body)',
    fontSize: 12,
    color: 'rgba(255,255,255,0.3)',
    marginLeft: 6,
  }

  /* ── Success state ───────────────────────────────────────────────────── */
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
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 24, padding: '48px 40px',
            boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'rgba(0,204,168,0.12)',
              border: '1px solid rgba(0,204,168,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px',
            }}>
              <CheckCircle size={28} color="#00CCA8" />
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800,
              color: '#ffffff', marginBottom: 12, letterSpacing: '-0.02em',
            }}>
              Entry submitted
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 15, color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.6, marginBottom: 32,
            }}>
              Thanks for contributing. We&apos;ll review it before adding it to the AI Playbook.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
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
              <Link href="/" style={{
                display: 'block', width: '100%', padding: '14px', borderRadius: 12, textAlign: 'center',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'transparent', color: 'rgba(255,255,255,0.6)', fontSize: 15,
                fontFamily: 'var(--font-body)', textDecoration: 'none',
                transition: 'background 0.18s ease, color 0.18s ease',
              }}>
                Back to playbook
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  /* ── Main form ───────────────────────────────────────────────────────── */
  return (
    <div style={{ position: 'relative', overflow: 'clip', minHeight: '100vh', background: '#0A0010' }}>
      <BlobLayer />
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <div className="animate-fade-up delay-75" style={{
          padding: '48px clamp(20px,4vw,48px) 32px',
          maxWidth: 840, margin: '0 auto',
        }}>
          <Link href="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(255,255,255,0.35)',
            textDecoration: 'none', marginBottom: 32,
            transition: 'color 0.18s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.65)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)' }}
          >
            <ArrowLeft size={14} /> Back to playbook
          </Link>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,52px)',
            fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em',
            lineHeight: 1.1, marginBottom: 12,
          }}>
            Contribute to the AI Playbook
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 16, color: 'rgba(255,255,255,0.4)',
            lineHeight: 1.6,
          }}>
            Share a prompt, tool, skill, or resource worth adding.
          </p>
        </div>

        {/* ── Form card ────────────────────────────────────────────── */}
        <div style={{
          maxWidth: 840, margin: '0 auto',
          padding: '0 clamp(20px,4vw,48px) 80px',
        }}>
          <form
            onSubmit={handleSubmit}
            noValidate
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 20,
              padding: 'clamp(24px,4vw,48px)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.3)',
            }}
          >

            {/* Two-column row: Name + Email */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, marginBottom: 24 }}>
              {/* Name */}
              <div>
                <label htmlFor="name" style={labelStyle}>
                  Your name <span style={{ color: '#FF4D6D' }}>*</span>
                </label>
                <input
                  id="name" type="text" autoComplete="name"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  onFocus={e => { e.currentTarget.style.borderColor = 'rgba(155,63,255,0.6)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
                  onBlur={e => { e.currentTarget.style.borderColor = errors.name ? '#FF4D6D' : 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
                  style={inputStyle(errors.name)}
                />
                {errors.name && <p style={errorStyle}>{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" style={labelStyle}>
                  Email <span style={{ color: '#FF4D6D' }}>*</span>
                </label>
                <input
                  id="email" type="email" autoComplete="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  onFocus={e => { e.currentTarget.style.borderColor = 'rgba(155,63,255,0.6)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
                  onBlur={e => { e.currentTarget.style.borderColor = errors.email ? '#FF4D6D' : 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
                  style={inputStyle(errors.email)}
                />
                {errors.email && <p style={errorStyle}>{errors.email}</p>}
              </div>
            </div>

            {/* Category */}
            <div style={{ marginBottom: 24 }}>
              <label htmlFor="category" style={labelStyle}>
                What are you submitting? <span style={{ color: '#FF4D6D' }}>*</span>
              </label>
              <select
                id="category"
                value={form.category}
                onChange={e => setForm(p => ({ ...p, category: e.target.value as Category }))}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(155,63,255,0.6)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
                onBlur={e => { e.currentTarget.style.borderColor = errors.category ? '#FF4D6D' : 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
                style={{
                  ...inputStyle(errors.category),
                  appearance: 'none',
                  cursor: 'pointer',
                  color: form.category ? '#ffffff' : 'rgba(255,255,255,0.35)',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 14px center',
                  paddingRight: 44,
                }}
              >
                <option value="" disabled style={{ background: '#0A0010' }}>Select a category</option>
                {['Prompt', 'Tool', 'Skill', 'Miscellaneous'].map(c => (
                  <option key={c} value={c} style={{ background: '#0A0010' }}>{c}</option>
                ))}
              </select>
              {errors.category && <p style={errorStyle}>{errors.category}</p>}
            </div>

            {/* Description */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
                <label htmlFor="description" style={{ ...labelStyle, marginBottom: 0 }}>
                  Description <span style={{ color: '#FF4D6D' }}>*</span>
                </label>
                <span style={{
                  fontFamily: 'var(--font-body)', fontSize: 12,
                  color: form.description.length > 480 ? '#FF4D6D' : 'rgba(255,255,255,0.25)',
                  transition: 'color 0.18s ease',
                }}>
                  {form.description.length}/500
                </span>
              </div>
              <textarea
                id="description"
                rows={5}
                placeholder="Tell us what this is, why it is useful, and how designers can use it."
                value={form.description}
                maxLength={500}
                onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(155,63,255,0.6)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
                onBlur={e => { e.currentTarget.style.borderColor = errors.description ? '#FF4D6D' : 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
                style={{
                  ...inputStyle(errors.description),
                  resize: 'vertical',
                  minHeight: 120,
                  lineHeight: 1.6,
                }}
              />
              {errors.description && <p style={errorStyle}>{errors.description}</p>}
            </div>

            {/* Link */}
            <div style={{ marginBottom: 24 }}>
              <label htmlFor="link" style={labelStyle}>
                Link <span style={optionalStyle}>(optional)</span>
              </label>
              <input
                id="link" type="url"
                placeholder="Paste a URL, if available"
                value={form.link}
                onChange={e => setForm(p => ({ ...p, link: e.target.value }))}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(155,63,255,0.6)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
                onBlur={e => { e.currentTarget.style.borderColor = errors.link ? '#FF4D6D' : 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
                style={inputStyle(errors.link)}
              />
              {errors.link && <p style={errorStyle}>{errors.link}</p>}
            </div>

            {/* Attachment */}
            <div style={{ marginBottom: 36 }}>
              <label style={labelStyle}>
                Attachment <span style={optionalStyle}>(optional)</span>
              </label>

              {form.attachment ? (
                /* File selected */
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 16px',
                  background: 'rgba(155,63,255,0.08)',
                  border: '1px solid rgba(155,63,255,0.25)',
                  borderRadius: 12,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 8,
                      background: 'rgba(155,63,255,0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Upload size={14} color="#C27FFF" />
                    </div>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>
                      {form.attachment.name}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setForm(p => ({ ...p, attachment: null })); if (fileRef.current) fileRef.current.value = '' }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', padding: 4, borderRadius: 6, display: 'flex', transition: 'color 0.18s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#FF4D6D' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)' }}
                    aria-label="Remove file"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                /* Drop zone */
                <div
                  onClick={() => fileRef.current?.click()}
                  onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={onDrop}
                  style={{
                    padding: '28px 20px',
                    background: dragOver ? 'rgba(155,63,255,0.1)' : 'rgba(255,255,255,0.03)',
                    border: `1px dashed ${errors.attachment ? '#FF4D6D' : dragOver ? 'rgba(155,63,255,0.5)' : 'rgba(255,255,255,0.12)'}`,
                    borderRadius: 12,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                    cursor: 'pointer',
                    transition: 'all 0.18s ease',
                  }}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: 'rgba(255,255,255,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Upload size={18} color="rgba(255,255,255,0.4)" />
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                    Click to upload or drag and drop
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.25)', margin: 0 }}>
                    PDF, Markdown, TXT, DOC, DOCX
                  </p>
                </div>
              )}

              <input
                ref={fileRef}
                type="file"
                accept={ACCEPTED.join(',')}
                style={{ display: 'none' }}
                onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
              />
              {errors.attachment && <p style={errorStyle}>{errors.attachment}</p>}
            </div>

            {/* Submit */}
            {errors.submit && (
              <p style={{ ...errorStyle, marginBottom: 16, padding: '12px 16px', background: 'rgba(255,77,109,0.08)', border: '1px solid rgba(255,77,109,0.2)', borderRadius: 10 }}>
                {errors.submit}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              style={{
                width: '100%', padding: '16px', borderRadius: 14, border: 'none',
                background: submitting ? 'rgba(155,63,255,0.5)' : '#9B3FFF',
                color: '#ffffff', fontSize: 16, fontWeight: 600,
                fontFamily: 'var(--font-body)', cursor: submitting ? 'not-allowed' : 'pointer',
                transition: 'background 0.18s ease, opacity 0.18s ease',
                opacity: submitting ? 0.8 : 1,
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={e => { if (!submitting) e.currentTarget.style.background = '#7B2FDF' }}
              onMouseLeave={e => { if (!submitting) e.currentTarget.style.background = '#9B3FFF' }}
            >
              {submitting ? 'Submitting…' : 'Submit entry'}
            </button>

          </form>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
