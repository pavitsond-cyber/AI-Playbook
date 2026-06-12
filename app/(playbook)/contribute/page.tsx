'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Check, CheckCircle, ChevronDown, Loader2, Upload, X } from 'lucide-react'
import { useDockedTitle } from '@/components/nav/PageChromeContext'

const BP = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
const CONTRIBUTE_URL = `${BP}/api/contribute`

type Category = 'Skills' | 'Prompts' | 'Tools' | 'Miscellaneous' | ''

interface FormData {
  name: string
  email: string
  category: Category
  description: string
  attachment: File | null
}

interface FormErrors {
  name?: string
  email?: string
  category?: string
  description?: string
  attachment?: string
  submit?: string
}

const CATEGORIES: Category[] = ['Skills', 'Prompts', 'Tools', 'Miscellaneous']
const ACCEPTED = ['.pdf', '.md', '.txt', '.doc', '.docx']
const ACCEPTED_MIME = [
  'application/pdf',
  'text/markdown',
  'text/plain',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]
const MAX_FILE_SIZE = 10 * 1024 * 1024

function CategorySelect({
  value,
  onChange,
  error,
}: {
  value: Category
  onChange: (value: Category) => void
  error?: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  return (
    <div ref={ref} className="category-select">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(current => !current)}
        className={`feedback-input category-trigger${error ? ' has-error' : ''}${open ? ' is-open' : ''}`}
      >
        <span className={value ? '' : 'category-placeholder'}>
          {value || 'Select a category'}
        </span>
        <ChevronDown
          size={16}
          aria-hidden
          className={open ? 'category-chevron is-open' : 'category-chevron'}
        />
      </button>

      <div
        role="listbox"
        aria-label="Contribution category"
        className={open ? 'category-options is-open' : 'category-options'}
      >
        {CATEGORIES.map(category => (
          <button
            key={category}
            type="button"
            role="option"
            aria-selected={value === category}
            onClick={() => {
              onChange(category)
              setOpen(false)
            }}
            className={value === category ? 'category-option is-selected' : 'category-option'}
          >
            {category}
            {value === category && <Check size={14} aria-hidden />}
          </button>
        ))}
      </div>
    </div>
  )
}

function encodeFile(file: File) {
  return new Promise<{ name: string; mimeType: string; data: string }>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result as string
      resolve({
        name: file.name,
        mimeType: file.type || 'application/octet-stream',
        data: dataUrl.slice(dataUrl.indexOf(',') + 1),
      })
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default function ContributePage() {
  const titleRef = useDockedTitle('Contribute to the AI Playbook')
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    category: '',
    description: '',
    attachment: null,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const validate = () => {
    const next: FormErrors = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Please enter a valid email.'
    }
    if (!form.category) next.category = 'Please select a category.'
    if (!form.description.trim()) next.description = 'Please add a short description.'
    if (form.description.length > 500) {
      next.description = 'Description must be 500 characters or fewer.'
    }
    if (!form.attachment) next.attachment = 'Please attach a file.'
    return next
  }

  const handleFile = useCallback((file: File) => {
    const extension = `.${file.name.split('.').pop()?.toLowerCase()}`
    if (!ACCEPTED.includes(extension) && !ACCEPTED_MIME.includes(file.type)) {
      setErrors(current => ({ ...current, attachment: 'This file type is not supported.' }))
      return
    }
    if (file.size > MAX_FILE_SIZE) {
      setErrors(current => ({ ...current, attachment: 'File must be 10MB or smaller.' }))
      return
    }
    setErrors(current => ({ ...current, attachment: undefined }))
    setForm(current => ({ ...current, attachment: file }))
  }, [])

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    setDragOver(false)
    const file = event.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [handleFile])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const nextErrors = validate()
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }

    setErrors({})
    setSubmitting(true)

    try {
      const files = form.attachment ? [await encodeFile(form.attachment)] : []
      const response = await fetch(CONTRIBUTE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          category: form.category,
          description: form.description.trim(),
          files,
        }),
      })
      const result = await response.json()
      if (!response.ok || !result.ok) throw new Error(result.error || 'Submission failed.')
      setSubmitted(true)
    } catch (error) {
      setErrors({
        submit: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setForm({ name: '', email: '', category: '', description: '', attachment: null })
    setErrors({})
    setSubmitted(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  if (submitted) {
    return (
      <div className="contribute-success-shell">
        <div className="feedback-done">
          <div className="feedback-done-icon">
            <CheckCircle size={20} aria-hidden />
          </div>
          <div>
            <h2>Submitted to Headout</h2>
            <p>
              Your entry has been submitted to the Headout team. We&apos;ll review it
              and get back to you shortly at the email you provided.
            </p>
          </div>
          <button type="button" onClick={resetForm} className="feedback-submit">
            Submit another entry
          </button>
        </div>
        <style>{CONTRIBUTE_CSS}</style>
      </div>
    )
  }

  return (
    <div className="contribute-page">
      <div className="contribute-container">
        <div
          ref={titleRef}
          data-page-title
          className="contribute-hero animate-fade-up delay-75"
        >
          <h1>Contribute to the AI Playbook</h1>
          <p>
            Share a prompt, tool, skill, or resource worth adding. Submissions are
            reviewed by the Headout team.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="contribute-form feedback-form">
          <div className="field-grid">
            <label className="feedback-field">
              <span className="feedback-label">
                Your name <span className="required">*</span>
              </span>
              <input
                type="text"
                autoComplete="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={event => setForm(current => ({ ...current, name: event.target.value }))}
                className={`feedback-input${errors.name ? ' has-error' : ''}`}
              />
              {errors.name && <span className="feedback-error">{errors.name}</span>}
            </label>

            <label className="feedback-field">
              <span className="feedback-label">
                Your email <span className="required">*</span>
              </span>
              <input
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={event => setForm(current => ({ ...current, email: event.target.value }))}
                className={`feedback-input${errors.email ? ' has-error' : ''}`}
              />
              {errors.email && <span className="feedback-error">{errors.email}</span>}
            </label>
          </div>

          <div className="feedback-field">
            <span className="feedback-label">
              Category <span className="required">*</span>
            </span>
            <CategorySelect
              value={form.category}
              onChange={category => setForm(current => ({ ...current, category }))}
              error={errors.category}
            />
            {errors.category && <span className="feedback-error">{errors.category}</span>}
          </div>

          <label className="feedback-field">
            <span className="feedback-label feedback-label--split">
              <span>
                Description <span className="required">*</span>
              </span>
              <span className={form.description.length > 480 ? 'character-count near-limit' : 'character-count'}>
                {form.description.length}/500
              </span>
            </span>
            <textarea
              rows={5}
              maxLength={500}
              placeholder="Tell us what this is, why it is useful, and how designers can use it."
              value={form.description}
              onChange={event => setForm(current => ({ ...current, description: event.target.value }))}
              className={`feedback-input${errors.description ? ' has-error' : ''}`}
            />
            {errors.description && <span className="feedback-error">{errors.description}</span>}
          </label>

          <div className="feedback-field">
            <span className="feedback-label">
              Attachment <span className="required">*</span>
            </span>
            {form.attachment ? (
              <div className="attachment-preview">
                <div className="attachment-details">
                  <div className="attachment-icon">
                    <Upload size={14} aria-hidden />
                  </div>
                  <span className="attachment-name">{form.attachment.name}</span>
                </div>
                <button
                  type="button"
                  className="attachment-remove"
                  aria-label="Remove file"
                  onClick={() => {
                    setForm(current => ({ ...current, attachment: null }))
                    if (fileRef.current) fileRef.current.value = ''
                  }}
                >
                  <X size={16} aria-hidden />
                </button>
              </div>
            ) : (
              <div
                role="button"
                tabIndex={0}
                className={`attachment-dropzone${dragOver ? ' drag-over' : ''}${errors.attachment ? ' has-error' : ''}`}
                onClick={() => fileRef.current?.click()}
                onKeyDown={event => {
                  if (event.key === 'Enter' || event.key === ' ') fileRef.current?.click()
                }}
                onDragOver={event => {
                  event.preventDefault()
                  setDragOver(true)
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}
              >
                <div className="attachment-upload-icon">
                  <Upload size={18} aria-hidden />
                </div>
                <p>Click to upload or drag and drop</p>
                <p className="attachment-hint">PDF, Markdown, TXT, DOC, DOCX · max 10MB</p>
              </div>
            )}
            <input
              ref={fileRef}
              type="file"
              accept={ACCEPTED.join(',')}
              hidden
              onChange={event => {
                const file = event.target.files?.[0]
                if (file) handleFile(file)
              }}
            />
            {errors.attachment && <span className="feedback-error">{errors.attachment}</span>}
          </div>

          <div className="submit-row">
            {errors.submit && (
              <span className="feedback-error submit-error">{errors.submit}</span>
            )}
            <button type="submit" disabled={submitting} className="feedback-submit">
              {submitting ? (
                <>
                  <Loader2 size={16} className="spin-icon" aria-hidden />
                  Submitting...
                </>
              ) : (
                'Submit entry'
              )}
            </button>
          </div>
        </form>
      </div>

      <style>{CONTRIBUTE_CSS}</style>
    </div>
  )
}

const CONTRIBUTE_CSS = `
  .contribute-page {
    position: relative;
    min-height: 100%;
  }

  .contribute-container {
    width: 100%;
    max-width: 840px;
    margin: 0 auto;
    padding: 0 clamp(20px, 4vw, 48px) 80px;
  }

  .contribute-hero {
    padding: 24px 0 32px;
  }

  .contribute-hero h1 {
    margin: 0 0 12px;
    color: #ffffff;
    font-family: var(--font-display);
    font-size: 38px;
    font-weight: 400;
    line-height: 1;
    letter-spacing: -0.02em;
  }

  .contribute-hero p {
    margin: 0;
    color: rgba(255,255,255,0.4);
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.6;
  }

  .contribute-form {
    padding: clamp(24px, 4vw, 48px);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    background: rgba(255,255,255,0.04);
    box-shadow: 0 24px 64px rgba(0,0,0,0.3);
  }

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

  .feedback-label {
    color: #ffffff;
    font-family: var(--font-display);
    font-size: 16px;
    font-weight: 500;
  }

  .feedback-label--split {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }

  .required {
    margin-left: 2px;
    color: rgba(255,255,255,0.5);
  }

  .character-count {
    color: rgba(255,255,255,0.3);
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 300;
    transition: color 150ms ease;
  }

  .character-count.near-limit {
    color: #f692a8;
  }

  .feedback-input {
    box-sizing: border-box;
    width: 100%;
    padding: 12px 16px;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    outline: none;
    background: rgba(255,255,255,0.04);
    color: #ffffff;
    font-family: var(--font-body);
    font-size: 16px;
    font-weight: 300;
    transition: border-color 150ms ease, background-color 150ms ease;
  }

  .feedback-input::placeholder,
  .category-placeholder {
    color: rgba(255,255,255,0.35);
  }

  .feedback-input:focus,
  .feedback-input.is-open {
    border-color: rgba(255,255,255,0.3);
    background: rgba(255,255,255,0.06);
  }

  .feedback-input.has-error {
    border-color: #f692a8;
  }

  textarea.feedback-input {
    min-height: 120px;
    resize: none;
    line-height: 1.6;
  }

  .feedback-error {
    color: #f692a8;
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 300;
  }

  .category-select {
    position: relative;
  }

  .category-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    text-align: left;
  }

  .category-trigger.is-open {
    border-radius: 8px 8px 0 0;
  }

  .category-chevron {
    flex-shrink: 0;
    color: rgba(255,255,255,0.4);
    transition: transform 220ms ease;
  }

  .category-chevron.is-open {
    transform: rotate(180deg);
  }

  .category-options {
    position: absolute;
    right: 0;
    left: 0;
    z-index: 50;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.15);
    border-top: 0;
    border-radius: 0 0 8px 8px;
    background: #0e0018;
    box-shadow: 0 16px 40px rgba(0,0,0,0.5);
    clip-path: inset(0 0 100% 0);
    pointer-events: none;
    transition: clip-path 180ms cubic-bezier(0.55,0,1,0.45);
  }

  .category-options.is-open {
    clip-path: inset(0);
    pointer-events: auto;
    transition: clip-path 220ms cubic-bezier(0.25,0.46,0.45,0.94);
  }

  .category-option {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border: 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    background: transparent;
    color: rgba(255,255,255,0.65);
    font-family: var(--font-body);
    font-size: 16px;
    text-align: left;
    cursor: pointer;
    transition: background 120ms ease, color 120ms ease;
  }

  .category-option:hover {
    background: rgba(255,255,255,0.05);
    color: #ffffff;
  }

  .category-option.is-selected {
    background: rgba(255,255,255,0.08);
    color: #ffffff;
  }

  .attachment-dropzone {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 28px 20px;
    border: 1px dashed rgba(255,255,255,0.12);
    border-radius: 8px;
    background: rgba(255,255,255,0.03);
    color: rgba(255,255,255,0.5);
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 300;
    cursor: pointer;
    transition: background 150ms ease, border-color 150ms ease;
  }

  .attachment-dropzone:hover,
  .attachment-dropzone.drag-over {
    border-color: rgba(255,255,255,0.3);
    background: rgba(255,255,255,0.06);
  }

  .attachment-dropzone.has-error {
    border-color: #f692a8;
  }

  .attachment-dropzone:focus-visible {
    outline: 2px solid rgba(255,255,255,0.4);
    outline-offset: 2px;
  }

  .attachment-dropzone p {
    margin: 0;
  }

  .attachment-hint {
    color: rgba(255,255,255,0.25);
    font-size: 12px;
  }

  .attachment-upload-icon {
    display: flex;
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background: rgba(255,255,255,0.06);
    color: rgba(255,255,255,0.4);
  }

  .attachment-preview {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border: 1px solid rgba(155,63,255,0.25);
    border-radius: 8px;
    background: rgba(155,63,255,0.08);
  }

  .attachment-details {
    display: flex;
    min-width: 0;
    align-items: center;
    gap: 10px;
  }

  .attachment-icon {
    display: flex;
    width: 32px;
    height: 32px;
    flex: 0 0 32px;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background: rgba(155,63,255,0.15);
    color: #c27fff;
  }

  .attachment-name {
    overflow: hidden;
    color: rgba(255,255,255,0.8);
    font-family: var(--font-body);
    font-size: 14px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .attachment-remove {
    display: flex;
    padding: 4px;
    border: 0;
    border-radius: 6px;
    background: transparent;
    color: rgba(255,255,255,0.4);
    cursor: pointer;
    transition: color 180ms ease;
  }

  .attachment-remove:hover {
    color: #c27fff;
  }

  .submit-row {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }

  .submit-error {
    align-self: stretch;
    padding: 12px 16px;
    border: 1px solid rgba(246,146,168,0.2);
    border-radius: 8px;
    background: rgba(246,146,168,0.08);
  }

  .feedback-submit {
    display: inline-flex;
    width: 100%;
    min-width: 160px;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 14px 32px;
    border: 0;
    border-radius: 9999px;
    background: #ffffff;
    color: #0e1439;
    font-family: var(--font-display);
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0;
    cursor: pointer;
    transition: background 180ms ease, opacity 180ms ease;
  }

  .feedback-submit:hover {
    background: rgba(255,255,255,0.9);
  }

  .feedback-submit:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }

  .spin-icon {
    animation: contribute-spin 800ms linear infinite;
  }

  .contribute-success-shell {
    display: flex;
    min-height: calc(100dvh - var(--playbook-content-top));
    align-items: center;
    justify-content: center;
    padding: 40px 24px 80px;
  }

  .feedback-done {
    display: flex;
    width: 100%;
    max-width: 480px;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    padding: 32px;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    background: rgba(255,255,255,0.04);
    box-shadow: 0 24px 64px rgba(0,0,0,0.3);
  }

  .feedback-done-icon {
    display: flex;
    width: 44px;
    height: 44px;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    background: rgba(155,63,255,0.15);
    color: #c27fff;
  }

  .feedback-done h2 {
    margin: 0 0 6px;
    color: #ffffff;
    font-family: var(--font-display);
    font-size: 24px;
    font-weight: 500;
  }

  .feedback-done p {
    margin: 0;
    color: rgba(255,255,255,0.55);
    font-family: var(--font-body);
    font-size: 15px;
    line-height: 1.6;
  }

  .feedback-done .feedback-submit {
    width: 100%;
    margin-top: 8px;
  }

  @keyframes contribute-spin {
    to { transform: rotate(360deg); }
  }

  @media (max-width: 639px) {
    .contribute-container {
      padding-right: 0;
      padding-left: 0;
    }

    .contribute-hero {
      padding-right: 20px;
      padding-left: 20px;
    }

    .contribute-form {
      padding: 0 20px;
      border: 0;
      border-radius: 0;
      background: transparent;
      box-shadow: none;
    }

    .submit-row {
      align-items: stretch;
    }

    .feedback-submit {
      width: 100%;
      min-width: 0;
    }

    .contribute-success-shell {
      padding-right: 20px;
      padding-left: 20px;
    }
  }
`
