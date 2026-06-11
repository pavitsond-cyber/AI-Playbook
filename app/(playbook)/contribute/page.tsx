'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Upload, X, CheckCircle, Check, ChevronDown, Loader2 } from 'lucide-react'

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

/* ── Custom category dropdown ─────────────────────────────────────────── */
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
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`feedback-input category-trigger${error ? ' has-error' : ''}${open ? ' is-open' : ''}`}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', borderRadius: open ? '8px 8px 0 0' : 8 }}
      >
        <span style={{ color: value ? '#ffffff' : 'rgba(255,255,255,0.4)' }}>
          {value || 'Select a category'}
        </span>
        <ChevronDown
          size={16}
          color="rgba(255,255,255,0.4)"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.22s ease', flexShrink: 0 }}
        />
      </button>

      <div style={{
        position: 'absolute', left: 0, right: 0, zIndex: 50,
        background: '#0E0018',
        border: '1px solid rgba(255,255,255,0.15)',
        borderTop: 'none',
        borderRadius: '0 0 8px 8px',
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
              background: value === cat ? 'rgba(255,255,255,0.08)' : 'transparent',
              border: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)',
              color: value === cat ? '#ffffff' : 'rgba(255,255,255,0.65)',
              fontSize: 16, fontFamily: 'var(--font-body)',
              textAlign: 'left', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              transition: 'background 0.12s ease, color 0.12s ease',
            }}
            onMouseEnter={e => { if (value !== cat) { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#ffffff' } }}
            onMouseLeave={e => { if (value !== cat) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)' } }}
          >
            {cat}
            {value === cat && <Check size={14} color="rgba(255,255,255,0.7)" />}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ── Page ─────────────────────────────────────────────────────────────── */
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
    if (!form.attachment)                                     e.attachment  = 'Please attach a file.'
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/api/contribute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          category: form.category,
          description: form.description,
          link: form.link,
          attachmentName: form.attachment?.name ?? '',
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error((data as { error?: string }).error || 'Submission failed.')
      }
      setSubmitted(true)
    } catch (err) {
      setErrors({ submit: err instanceof Error ? err.message : 'Something went wrong. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setForm({ name: '', email: '', category: '', description: '', link: '', attachment: null })
    setErrors({}); setSubmitted(false)
  }

  /* ── Success state ───────────────────────────────────────────────────── */
  if (submitted) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}>
        <div style={{ maxWidth: 480, width: '100%' }}>
          <div className="feedback-done">
            <div className="feedback-done-icon">
              <CheckCircle size={20} />
            </div>
            <div>
              <h2>Submitted to Headout</h2>
              <p>Your entry has been submitted to the Headout team. We&apos;ll review it and get back to you shortly at the email you provided.</p>
            </div>
            <button
              onClick={resetForm}
              className="feedback-submit"
              style={{ width: '100%', marginTop: 8 }}
            >
              Submit another entry
            </button>
          </div>
        </div>
        <style>{CONTRIBUTE_CSS}</style>
      </div>
    )
  }

  /* ── Form ────────────────────────────────────────────────────────────── */
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ maxWidth: 840, margin: '0 auto', padding: '0 clamp(20px,4vw,48px) 80px' }}>

        {/* Hero */}
        <div className="animate-fade-up delay-75" style={{ padding: '48px 0 32px' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 12 }}>
            Contribute to the AI Playbook
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
            Share a prompt, tool, skill, or resource worth adding. Submissions are reviewed by the Headout team.
          </p>
        </div>

        {/* Form card */}
        <form onSubmit={handleSubmit} noValidate className="contribute-form feedback-form">

          {/* Name + Email — 2-col grid */}
          <div className="field-grid">
            <label className="feedback-field">
              <span className="feedback-label">Your name <span className="required">*</span></span>
              <input
                id="name" type="text" autoComplete="name" placeholder="Enter your name"
                value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                className={`feedback-input${errors.name ? ' has-error' : ''}`}
              />
              {errors.name && <span className="feedback-error">{errors.name}</span>}
            </label>

            <label className="feedback-field">
              <span className="feedback-label">Email <span className="required">*</span></span>
              <input
                id="email" type="email" autoComplete="email" placeholder="you@example.com"
                value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                className={`feedback-input${errors.email ? ' has-error' : ''}`}
              />
              {errors.email && <span className="feedback-error">{errors.email}</span>}
            </label>
          </div>

          {/* Category */}
          <label className="feedback-field">
            <span className="feedback-label">What are you submitting? <span className="required">*</span></span>
            <CategorySelect
              value={form.category}
              onChange={cat => setForm(p => ({ ...p, category: cat }))}
              error={errors.category}
            />
            {errors.category && <span className="feedback-error">{errors.category}</span>}
          </label>

          {/* Description */}
          <label className="feedback-field">
            <span className="feedback-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span>Description <span className="required">*</span></span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 300, color: form.description.length > 480 ? 'var(--glow-rose)' : 'rgba(255,255,255,0.3)', transition: 'color 0.15s ease' }}>
                {form.description.length}/500
              </span>
            </span>
            <textarea
              id="description" rows={5}
              placeholder="Tell us what this is, why it is useful, and how designers can use it."
              value={form.description} maxLength={500}
              onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              className={`feedback-input${errors.description ? ' has-error' : ''}`}
              style={{ minHeight: 120, lineHeight: 1.6 }}
            />
            {errors.description && <span className="feedback-error">{errors.description}</span>}
          </label>

          {/* Link */}
          <label className="feedback-field">
            <span className="feedback-label">Link <span className="optional">(optional)</span></span>
            <input
              id="link" type="url" placeholder="Paste a URL, if available"
              value={form.link} onChange={e => setForm(p => ({ ...p, link: e.target.value }))}
              className={`feedback-input${errors.link ? ' has-error' : ''}`}
            />
            {errors.link && <span className="feedback-error">{errors.link}</span>}
          </label>

          {/* Attachment */}
          <div className="feedback-field">
            <span className="feedback-label">Attachment <span className="required">*</span></span>
            {form.attachment ? (
              <div className="attachment-preview">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div className="attachment-icon"><Upload size={14} /></div>
                  <span className="attachment-name">{form.attachment.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => { setForm(p => ({ ...p, attachment: null })); if (fileRef.current) fileRef.current.value = '' }}
                  className="attachment-remove"
                  aria-label="Remove file"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div
                className={`attachment-dropzone${dragOver ? ' drag-over' : ''}${errors.attachment ? ' has-error' : ''}`}
                onClick={() => fileRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}
              >
                <div className="attachment-upload-icon"><Upload size={18} /></div>
                <p>Click to upload or drag and drop</p>
                <p className="attachment-hint">PDF, Markdown, TXT, DOC, DOCX</p>
              </div>
            )}
            <input ref={fileRef} type="file" accept={ACCEPTED.join(',')} style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
            {errors.attachment && <span className="feedback-error">{errors.attachment}</span>}
          </div>

          {/* Submit */}
          <div className="submit-row">
            {errors.submit && <span className="feedback-error submit-error">{errors.submit}</span>}
            <button type="submit" disabled={submitting} className="feedback-submit">
              {submitting ? (
                <><Loader2 size={16} className="spin-icon" /> Sending…</>
              ) : 'Submit entry'}
            </button>
          </div>

        </form>
      </div>

      <style>{CONTRIBUTE_CSS}</style>
    </div>
  )
}

/* ── Styles ───────────────────────────────────────────────────────────── */
const CONTRIBUTE_CSS = `
  :root {
    --glow-rose: #f692a8;
  }

  /* ── Form card ── */
  .contribute-form {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    padding: clamp(24px,4vw,48px);
    box-shadow: 0 24px 64px rgba(0,0,0,0.3);
  }

  /* ── Layout ── */
  .feedback-form {
    display: flex;
    flex-direction: column;
    gap: 28px;
  }
  .field-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 28px;
  }
  .feedback-field {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  /* ── Labels ── */
  .feedback-label {
    font-family: var(--font-display);
    font-size: 16px;
    font-weight: 500;
    color: #ffffff;
  }
  .feedback-label .optional {
    margin-left: 6px;
    font-family: var(--font-body);
    font-weight: 300;
    color: rgba(255,255,255,0.5);
    font-size: 14px;
  }
  .feedback-label .required {
    margin-left: 2px;
    color: rgba(255,255,255,0.5);
  }

  /* ── Inputs ── */
  .feedback-input {
    width: 100%;
    padding: 12px 16px;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.04);
    font-family: var(--font-body);
    font-size: 16px;
    font-weight: 300;
    color: #ffffff;
    outline: none;
    transition: border-color 0.15s ease, background-color 0.15s ease;
    box-sizing: border-box;
  }
  .feedback-input::placeholder { color: rgba(255,255,255,0.35); }
  .feedback-input:focus {
    border-color: rgba(255,255,255,0.3);
    background: rgba(255,255,255,0.06);
  }
  .feedback-input.has-error { border-color: var(--glow-rose); }
  textarea.feedback-input { resize: none; }

  /* ── Category trigger inherits feedback-input ── */
  button.feedback-input { text-align: left; cursor: pointer; }
  button.feedback-input.is-open {
    border-color: rgba(255,255,255,0.3);
    background: rgba(255,255,255,0.06);
  }

  /* ── Errors ── */
  .feedback-error {
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 300;
    color: var(--glow-rose);
  }
  .submit-error {
    align-self: stretch;
    padding: 12px 16px;
    background: rgba(246,146,168,0.08);
    border: 1px solid rgba(246,146,168,0.2);
    border-radius: 8px;
  }

  /* ── Attachment dropzone ── */
  .attachment-dropzone {
    padding: 28px 20px;
    background: rgba(255,255,255,0.03);
    border: 1px dashed rgba(255,255,255,0.12);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: all 0.15s ease;
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 300;
    color: rgba(255,255,255,0.5);
  }
  .attachment-dropzone p { margin: 0; }
  .attachment-dropzone .attachment-hint { font-size: 12px; color: rgba(255,255,255,0.25); }
  .attachment-dropzone:hover,
  .attachment-dropzone.drag-over { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.3); }
  .attachment-dropzone.has-error { border-color: var(--glow-rose); }
  .attachment-upload-icon {
    width: 40px; height: 40px; border-radius: 10px;
    background: rgba(255,255,255,0.06);
    display: flex; align-items: center; justify-content: center;
    color: rgba(255,255,255,0.4);
  }

  /* ── Attachment preview (file chosen) ── */
  .attachment-preview {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 8px;
  }
  .attachment-icon {
    width: 32px; height: 32px; border-radius: 6px;
    background: rgba(255,255,255,0.08);
    display: flex; align-items: center; justify-content: center;
    color: rgba(255,255,255,0.6);
  }
  .attachment-name {
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 300;
    color: rgba(255,255,255,0.8);
  }
  .attachment-remove {
    background: none; border: none; cursor: pointer;
    color: rgba(255,255,255,0.35); padding: 4px; border-radius: 6px;
    display: flex; transition: color 0.15s ease;
  }
  .attachment-remove:hover { color: #ffffff; }

  /* ── Submit ── */
  .submit-row {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
  }
  .feedback-submit {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 14px 32px;
    border: 0;
    border-radius: 9999px;
    background: #ffffff;
    font-family: var(--font-display);
    font-size: 16px;
    font-weight: 500;
    color: #0e1439;
    cursor: pointer;
    transition: background-color 0.15s ease;
    min-width: 160px;
  }
  .feedback-submit:hover { background: rgba(255,255,255,0.88); }
  .feedback-submit:disabled { opacity: 0.55; cursor: default; }

  /* ── Success card ── */
  .feedback-done {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    padding: 32px;
    border-radius: 16px;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.04);
  }
  .feedback-done-icon {
    display: flex; align-items: center; justify-content: center;
    width: 44px; height: 44px; border-radius: 9999px;
    background: rgba(255,255,255,0.1); color: #ffffff;
  }
  .feedback-done h2 {
    font-family: var(--font-display);
    font-size: 20px; font-weight: 500; color: #ffffff;
    margin: 0 0 6px;
  }
  .feedback-done p {
    font-family: var(--font-body);
    font-size: 15px; font-weight: 300; line-height: 1.6;
    color: rgba(255,255,255,0.6); margin: 0;
  }

  /* ── Spinner ── */
  .spin-icon { animation: spin 0.8s linear infinite; }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

  /* ── Mobile ── */
  @media (max-width: 639px) {
    .contribute-form {
      background: transparent !important;
      border: none !important;
      border-radius: 0 !important;
      box-shadow: none !important;
      padding: 0 !important;
    }
    .submit-row { align-items: stretch; }
    .feedback-submit { width: 100%; min-width: unset; }
  }
`
