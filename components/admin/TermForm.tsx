'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Input from '@/components/ui/Input'

const BP = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
import Textarea from '@/components/ui/Textarea'
import Select from '@/components/ui/Select'
import TagInput from '@/components/ui/TagInput'
import Button from '@/components/ui/Button'
import DuplicateWarning from './DuplicateWarning'
import { GlossaryTerm, Category, CATEGORY_LABELS, CATEGORY_ORDER, DuplicateCheckResult } from '@/types'

interface TermFormProps {
  mode: 'create' | 'edit'
  initialData?: GlossaryTerm
}

const CATEGORY_OPTIONS = CATEGORY_ORDER.map((cat) => ({
  value: cat,
  label: CATEGORY_LABELS[cat],
}))

export default function TermForm({ mode, initialData }: TermFormProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [duplicateResult, setDuplicateResult] = useState<DuplicateCheckResult | null>(null)
  const [dismissedDuplicate, setDismissedDuplicate] = useState(false)

  const [form, setForm] = useState({
    term: initialData?.term ?? '',
    full_form: initialData?.full_form ?? '',
    short_definition: initialData?.short_definition ?? '',
    detailed_explanation: initialData?.detailed_explanation ?? '',
    category: initialData?.category ?? ('' as Category | ''),
    aliases: initialData?.aliases ?? [],
    tool_tags: initialData?.tool_tags ?? [],
    example_usage: initialData?.example_usage ?? '',
    session_relevance: initialData?.session_relevance ?? '',
    status: initialData?.status ?? 'draft',
  })

  function set(field: string, value: unknown) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  // Debounced duplicate check on term change
  const checkDuplicate = useCallback(
    async (term: string) => {
      if (!term.trim() || (mode === 'edit' && term === initialData?.term)) {
        setDuplicateResult(null)
        return
      }
      try {
        const res = await fetch(`${BP}/api/terms/check-duplicate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ term, excludeId: initialData?.id }),
        })
        const data = await res.json()
        setDuplicateResult(data)
        setDismissedDuplicate(false)
      } catch {
        // silently ignore network errors
      }
    },
    [mode, initialData?.term, initialData?.id]
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      checkDuplicate(form.term)
    }, 400)
    return () => clearTimeout(timer)
  }, [form.term, checkDuplicate])

  async function handleSubmit(status: 'draft' | 'published') {
    if (!form.term.trim()) { setError('Term name is required.'); return }
    if (!form.category) { setError('Category is required.'); return }

    setSaving(true)
    setError('')

    const payload = { ...form, status, category: form.category as Category }

    try {
      const res =
        mode === 'create'
          ? await fetch(`${BP}/api/terms`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            })
          : await fetch(`${BP}/api/terms/${initialData!.id}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            })

      if (res.status === 409) {
        const data = await res.json()
        setDuplicateResult({ isDuplicate: true, existingTerm: data.existingTerm })
        setDismissedDuplicate(false)
        setSaving(false)
        return
      }

      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? 'Something went wrong.')
        setSaving(false)
        return
      }

      router.push('/admin/dashboard')
      router.refresh()
    } catch {
      setError('Network error. Please try again.')
      setSaving(false)
    }
  }

  const showDuplicate = duplicateResult?.isDuplicate && !dismissedDuplicate

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {showDuplicate && duplicateResult?.existingTerm && (
        <DuplicateWarning
          existingTerm={duplicateResult.existingTerm}
          onDismiss={() => setDismissedDuplicate(true)}
        />
      )}

      {error && (
        <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/25 text-sm text-red-300">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Term *"
          id="term"
          value={form.term}
          onChange={(e) => set('term', e.target.value)}
          placeholder="e.g. LLM"
        />
        <Input
          label="Full Form"
          id="full_form"
          value={form.full_form}
          onChange={(e) => set('full_form', e.target.value)}
          placeholder="e.g. Large Language Model"
        />
      </div>

      <Select
        label="Category *"
        id="category"
        value={form.category}
        onChange={(e) => set('category', e.target.value)}
        options={CATEGORY_OPTIONS}
        placeholder="Select a category…"
      />

      <Textarea
        label="Short Definition"
        id="short_definition"
        value={form.short_definition}
        onChange={(e) => set('short_definition', e.target.value)}
        placeholder="One sentence — shown collapsed in the public glossary"
        rows={2}
      />

      <Textarea
        label="Detailed Explanation"
        id="detailed_explanation"
        value={form.detailed_explanation}
        onChange={(e) => set('detailed_explanation', e.target.value)}
        placeholder="Expanded explanation shown when a card is tapped"
        rows={4}
      />

      <Textarea
        label="Example Usage"
        id="example_usage"
        value={form.example_usage}
        onChange={(e) => set('example_usage', e.target.value)}
        placeholder={'"Example sentence showing the term in context."'}
        rows={2}
      />

      <TagInput
        label="Aliases"
        value={form.aliases}
        onChange={(tags) => set('aliases', tags)}
        placeholder="large language model, language model — press Enter or comma"
        hint="Alternative names or spellings used in duplicate detection"
      />

      <TagInput
        label="Related Tools"
        value={form.tool_tags}
        onChange={(tags) => set('tool_tags', tags)}
        placeholder="ChatGPT, Claude, LangChain — press Enter or comma"
      />

      <Input
        label="Session Relevance"
        id="session_relevance"
        value={form.session_relevance}
        onChange={(e) => set('session_relevance', e.target.value)}
        placeholder="Why this term matters for today's session (optional)"
      />

      <div className="flex items-center gap-3 pt-2">
        <Button
          variant="ghost"
          onClick={() => handleSubmit('draft')}
          loading={saving}
          disabled={saving}
        >
          Save as Draft
        </Button>
        <Button
          onClick={() => handleSubmit('published')}
          loading={saving}
          disabled={saving}
        >
          {mode === 'edit' && initialData?.status === 'published' ? 'Update' : 'Publish'}
        </Button>
        <Button
          variant="secondary"
          onClick={() => router.back()}
          disabled={saving}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}
