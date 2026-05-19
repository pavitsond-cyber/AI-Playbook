'use client'

import { useState, useMemo } from 'react'
import PageHeader from '@/components/playbook/PageHeader'

type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced'

interface Skill {
  name: string
  helpsWith: string
  usefulFor: string[]
  tools: string[]
  difficulty: Difficulty
}

const skills: Skill[] = [
  { name: 'Prompt writing', helpsWith: 'Getting better outputs from AI tools', usefulFor: ['Everyone'], tools: ['ChatGPT', 'Claude'], difficulty: 'Beginner' },
  { name: 'Prompt refinement', helpsWith: 'Iterating on prompts to improve results', usefulFor: ['Everyone'], tools: ['ChatGPT', 'Claude'], difficulty: 'Beginner' },
  { name: 'Research synthesis', helpsWith: 'Summarizing interviews and extracting patterns', usefulFor: ['Research', 'Product', 'Design'], tools: ['ChatGPT', 'Claude', 'NotebookLM'], difficulty: 'Beginner' },
  { name: 'UX copy generation', helpsWith: 'Creating UI text options for product states', usefulFor: ['Design', 'Product'], tools: ['Claude', 'ChatGPT'], difficulty: 'Beginner' },
  { name: 'Product copy exploration', helpsWith: 'Generating multiple tone and style options', usefulFor: ['Design', 'Marketing', 'Content'], tools: ['Claude', 'ChatGPT'], difficulty: 'Beginner' },
  { name: 'PRD creation', helpsWith: 'Drafting structured product requirement documents', usefulFor: ['Product'], tools: ['Claude', 'ChatGPT'], difficulty: 'Intermediate' },
  { name: 'User story generation', helpsWith: 'Writing user stories from feature descriptions', usefulFor: ['Product', 'Engineering'], tools: ['Claude', 'ChatGPT'], difficulty: 'Beginner' },
  { name: 'Image generation', helpsWith: 'Creating visual directions and references', usefulFor: ['Brand', 'Design', 'Marketing'], tools: ['Midjourney', 'Krea', 'Nano Banana'], difficulty: 'Intermediate' },
  { name: 'Image editing', helpsWith: 'Editing and refining AI-generated images', usefulFor: ['Brand', 'Design'], tools: ['Krea', 'Midjourney'], difficulty: 'Intermediate' },
  { name: 'Video generation', helpsWith: 'Creating short video concepts and drafts', usefulFor: ['Brand', 'Marketing'], tools: ['Runway', 'Krea'], difficulty: 'Advanced' },
  { name: 'Voice generation', helpsWith: 'Creating voiceovers and audio content', usefulFor: ['Content', 'Marketing'], tools: ['ElevenLabs'], difficulty: 'Intermediate' },
  { name: 'AI-assisted coding', helpsWith: 'Creating or editing small product prototypes', usefulFor: ['Engineering', 'Design'], tools: ['Cursor', 'Claude'], difficulty: 'Intermediate' },
  { name: 'Frontend prototyping', helpsWith: 'Building fast UI prototypes', usefulFor: ['Design', 'Engineering'], tools: ['Lovable', 'Figma Make', 'Claude'], difficulty: 'Intermediate' },
  { name: 'Figma-to-code workflow', helpsWith: 'Converting Figma designs to production code', usefulFor: ['Engineering', 'Design'], tools: ['Figma Make', 'Cursor'], difficulty: 'Advanced' },
  { name: 'Data structuring', helpsWith: 'Converting raw data into structured formats', usefulFor: ['Engineering', 'Operations', 'Product'], tools: ['Claude', 'ChatGPT'], difficulty: 'Intermediate' },
  { name: 'Competitive research', helpsWith: 'Quickly analyzing competitor products and copy', usefulFor: ['Product', 'Marketing', 'Design'], tools: ['Perplexity', 'Claude'], difficulty: 'Beginner' },
  { name: 'Presentation generation', helpsWith: 'Creating slide decks from outlines or documents', usefulFor: ['Everyone'], tools: ['Gamma', 'Claude'], difficulty: 'Beginner' },
  { name: 'SEO brief generation', helpsWith: 'Creating structured SEO content briefs', usefulFor: ['Content', 'Marketing'], tools: ['Claude', 'Perplexity'], difficulty: 'Beginner' },
  { name: 'Documentation writing', helpsWith: 'Writing clear technical and process documentation', usefulFor: ['Engineering', 'Operations', 'Product'], tools: ['Claude'], difficulty: 'Beginner' },
  { name: 'Workflow automation', helpsWith: 'Automating repetitive tasks with AI', usefulFor: ['Operations', 'Engineering'], tools: ['Claude', 'ChatGPT'], difficulty: 'Advanced' },
]

const difficultyStyles: Record<Difficulty, { bg: string; text: string; label: string }> = {
  Beginner: { bg: 'rgba(34,197,94,0.12)', text: '#86efac', label: 'Beginner' },
  Intermediate: { bg: 'rgba(251,191,36,0.12)', text: '#fcd34d', label: 'Intermediate' },
  Advanced: { bg: 'rgba(239,68,68,0.12)', text: '#fca5a5', label: 'Advanced' },
}

type Filter = 'All' | Difficulty

export default function SkillsPage() {
  const [filter, setFilter] = useState<Filter>('All')

  const filtered = useMemo(() => {
    if (filter === 'All') return skills
    return skills.filter((s) => s.difficulty === filter)
  }, [filter])

  const filters: Filter[] = ['All', 'Beginner', 'Intermediate', 'Advanced']

  return (
    <div className="px-5 sm:px-8 py-8 max-w-5xl mx-auto">
      <PageHeader
        title="Skills Library"
        description="Practical AI skills for your daily work — searchable by difficulty and team."
        badge="Use AI"
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-150"
            style={{
              background: filter === f ? 'rgba(124,58,237,0.2)' : 'rgba(14,14,28,0.8)',
              border: '1px solid',
              borderColor: filter === f ? 'rgba(124,58,237,0.4)' : 'rgba(255,255,255,0.08)',
              color: filter === f ? 'rgba(167,139,250,0.9)' : 'rgba(255,255,255,0.5)',
            }}
          >
            {f === 'All' ? `All (${skills.length})` : `${f} (${skills.filter((s) => s.difficulty === f).length})`}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((skill) => {
          const diff = difficultyStyles[skill.difficulty]
          return (
            <div
              key={skill.name}
              className="flex flex-col p-4 rounded-xl transition-all duration-150"
              style={{
                background: 'rgba(14,14,28,0.8)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(124,58,237,0.25)' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-semibold text-white leading-snug flex-1 pr-2">{skill.name}</h3>
                <span
                  className="shrink-0 text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{ background: diff.bg, color: diff.text }}
                >
                  {diff.label}
                </span>
              </div>

              <p className="text-xs leading-relaxed mb-3 flex-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {skill.helpsWith}
              </p>

              {/* Tools */}
              <div className="flex flex-wrap gap-1.5 mb-2">
                {skill.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs px-2 py-0.5 rounded-md"
                    style={{ background: 'rgba(124,58,237,0.1)', color: 'rgba(167,139,250,0.8)' }}
                  >
                    {tool}
                  </span>
                ))}
              </div>

              {/* Audiences */}
              <div className="flex flex-wrap gap-1">
                {skill.usefulFor.map((team) => (
                  <span
                    key={team}
                    className="text-[10px] px-1.5 py-0.5 rounded"
                    style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.35)' }}
                  >
                    {team}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <p className="text-xs mt-6" style={{ color: 'rgba(255,255,255,0.2)' }}>
        {filtered.length} of {skills.length} skills shown
      </p>
    </div>
  )
}
