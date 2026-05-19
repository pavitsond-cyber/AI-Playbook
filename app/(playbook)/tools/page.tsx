'use client'

import { useState, useMemo } from 'react'
import { ExternalLink } from 'lucide-react'
import PageHeader from '@/components/playbook/PageHeader'

interface Tool {
  name: string
  maker: string
  bestFor: string
  usefulFor: string[]
  inputs: string[]
  outputs: string[]
  strength: string
  limitation: string
  link: string
}

const tools: Tool[] = [
  { name: 'ChatGPT', maker: 'OpenAI', bestFor: 'General reasoning, writing, analysis, coding support', usefulFor: ['Everyone'], inputs: ['Text', 'Files'], outputs: ['Text', 'Code'], strength: 'Versatile, widely used, strong at general tasks', limitation: 'May hallucinate; outputs need human review', link: 'https://chatgpt.com' },
  { name: 'Claude', maker: 'Anthropic', bestFor: 'Long-form reasoning, writing, analysis, structured documentation', usefulFor: ['Product', 'Design', 'Engineering', 'Research', 'Content'], inputs: ['Text', 'Files', 'Code'], outputs: ['Text', 'Code', 'Documents'], strength: 'Strong at reasoning, structure, and working with long context', limitation: 'Outputs still need factual validation', link: 'https://claude.ai' },
  { name: 'Cursor', maker: 'Anysphere', bestFor: 'AI-assisted coding, refactoring, and debugging', usefulFor: ['Engineering', 'Design'], inputs: ['Code', 'Text'], outputs: ['Code'], strength: 'Deep codebase awareness, fast iteration', limitation: 'Requires coding context to get good results', link: 'https://cursor.com' },
  { name: 'Perplexity', maker: 'Perplexity AI', bestFor: 'Research and source-backed answers', usefulFor: ['Research', 'Product', 'Content'], inputs: ['Text'], outputs: ['Text', 'Sources'], strength: 'Cites sources, good for factual research', limitation: 'Less good for creative or generative tasks', link: 'https://perplexity.ai' },
  { name: 'Midjourney', maker: 'Midjourney', bestFor: 'High-quality image generation for visual direction', usefulFor: ['Brand', 'Design', 'Marketing'], inputs: ['Text prompts'], outputs: ['Images'], strength: 'Exceptional image quality and artistic control', limitation: 'Discord-based, paid subscription required', link: 'https://midjourney.com' },
  { name: 'Krea', maker: 'Krea AI', bestFor: 'Real-time image generation and editing', usefulFor: ['Brand', 'Design'], inputs: ['Text', 'Images'], outputs: ['Images'], strength: 'Real-time generation, great for iteration', limitation: 'Subscription required', link: 'https://krea.ai' },
  { name: 'Runway', maker: 'Runway', bestFor: 'AI video generation and editing', usefulFor: ['Brand', 'Marketing', 'Content'], inputs: ['Text', 'Images', 'Video'], outputs: ['Video'], strength: 'Leading video generation quality', limitation: 'Expensive for high-quality outputs', link: 'https://runwayml.com' },
  { name: 'ElevenLabs', maker: 'ElevenLabs', bestFor: 'Voice generation and audio cloning', usefulFor: ['Content', 'Marketing'], inputs: ['Text'], outputs: ['Audio'], strength: 'Realistic voice output, multiple languages', limitation: 'Requires careful review for tone and accuracy', link: 'https://elevenlabs.io' },
  { name: 'Figma Make', maker: 'Figma', bestFor: 'Generating UI from prompts and converting designs to code', usefulFor: ['Design', 'Engineering'], inputs: ['Text', 'Figma designs'], outputs: ['UI', 'Code'], strength: 'Native Figma integration', limitation: 'Best for simple UI structures', link: 'https://figma.com' },
  { name: 'Lovable', maker: 'Lovable', bestFor: 'Building full-stack web apps with AI', usefulFor: ['Design', 'Engineering', 'Product'], inputs: ['Text descriptions'], outputs: ['Web apps', 'Code'], strength: 'Fast prototyping, full stack', limitation: 'Limited customization for complex apps', link: 'https://lovable.dev' },
  { name: 'NotebookLM', maker: 'Google', bestFor: 'Research synthesis and document-based Q&A', usefulFor: ['Research', 'Product', 'Content'], inputs: ['Documents', 'PDFs'], outputs: ['Summaries', 'Answers', 'Podcasts'], strength: 'Source-grounded answers from your documents', limitation: 'Limited to provided documents', link: 'https://notebooklm.google.com' },
  { name: 'Gamma', maker: 'Gamma', bestFor: 'AI-generated presentations and documents', usefulFor: ['Everyone'], inputs: ['Text', 'Outlines'], outputs: ['Presentations', 'Documents'], strength: 'Very fast presentation creation', limitation: 'Limited design customization', link: 'https://gamma.app' },
  { name: 'Canva AI', maker: 'Canva', bestFor: 'AI-enhanced graphic design and presentations', usefulFor: ['Brand', 'Marketing', 'Content'], inputs: ['Text', 'Images'], outputs: ['Designs', 'Presentations'], strength: 'Easy to use, many templates', limitation: 'Less precise than specialized tools', link: 'https://canva.com' },
  { name: 'Notion AI', maker: 'Notion', bestFor: 'Writing assistance and document summarization within Notion', usefulFor: ['Operations', 'Product', 'Content'], inputs: ['Text', 'Notion pages'], outputs: ['Text', 'Summaries'], strength: 'Integrated into existing Notion workflow', limitation: 'Limited to Notion context', link: 'https://notion.so' },
  { name: 'Relume', maker: 'Relume', bestFor: 'AI-generated website sitemaps and wireframes', usefulFor: ['Design', 'Product'], inputs: ['Text descriptions'], outputs: ['Sitemaps', 'Wireframes'], strength: 'Fast website structure generation', limitation: 'Output is a starting point, needs refinement', link: 'https://relume.io' },
]

const allAudiences = ['All', 'Everyone', 'Design', 'Product', 'Engineering', 'Brand', 'Marketing', 'Content', 'Research', 'Operations']

export default function ToolsPage() {
  const [filter, setFilter] = useState('All')

  const filtered = useMemo(() => {
    if (filter === 'All') return tools
    return tools.filter((t) => t.usefulFor.includes(filter))
  }, [filter])

  return (
    <div className="px-5 sm:px-8 py-8 max-w-5xl mx-auto">
      <PageHeader
        title="Tool Library"
        description="19 AI tools curated for Headout teams — what they do, who they're for, and how to use them."
        badge="Use AI"
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {allAudiences.map((audience) => (
          <button
            key={audience}
            onClick={() => setFilter(audience)}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150"
            style={{
              background: filter === audience ? 'rgba(124,58,237,0.2)' : 'rgba(14,14,28,0.8)',
              border: '1px solid',
              borderColor: filter === audience ? 'rgba(124,58,237,0.4)' : 'rgba(255,255,255,0.08)',
              color: filter === audience ? 'rgba(167,139,250,0.9)' : 'rgba(255,255,255,0.5)',
            }}
          >
            {audience}
          </button>
        ))}
      </div>

      {/* Tool cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((tool) => (
          <div
            key={tool.name}
            className="flex flex-col p-5 rounded-xl transition-all duration-150"
            style={{
              background: 'rgba(14,14,28,0.8)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '12px',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(124,58,237,0.25)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)' }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-base font-semibold text-white">{tool.name}</h3>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>by {tool.maker}</p>
              </div>
              <a
                href={tool.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 shrink-0"
                style={{
                  background: 'rgba(124,58,237,0.1)',
                  color: 'rgba(167,139,250,0.8)',
                  border: '1px solid rgba(124,58,237,0.15)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(124,58,237,0.2)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(124,58,237,0.1)' }}
              >
                Open <ExternalLink size={11} />
              </a>
            </div>

            <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.65)' }}>
              {tool.bestFor}
            </p>

            {/* Inputs / Outputs */}
            <div className="flex gap-4 mb-4 text-xs">
              <div>
                <span className="block mb-1" style={{ color: 'rgba(255,255,255,0.25)' }}>Inputs</span>
                <div className="flex flex-wrap gap-1">
                  {tool.inputs.map((i) => (
                    <span key={i} className="px-1.5 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)' }}>
                      {i}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="block mb-1" style={{ color: 'rgba(255,255,255,0.25)' }}>Outputs</span>
                <div className="flex flex-wrap gap-1">
                  {tool.outputs.map((o) => (
                    <span key={o} className="px-1.5 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)' }}>
                      {o}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Strength / Limitation */}
            <div className="space-y-1.5 mb-3 text-xs">
              <div className="flex items-start gap-2">
                <span style={{ color: '#86efac' }}>✓</span>
                <span style={{ color: 'rgba(255,255,255,0.5)' }}>{tool.strength}</span>
              </div>
              <div className="flex items-start gap-2">
                <span style={{ color: '#fca5a5' }}>⚠</span>
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>{tool.limitation}</span>
              </div>
            </div>

            {/* Audiences */}
            <div className="flex flex-wrap gap-1 mt-auto pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              {tool.usefulFor.map((team) => (
                <span
                  key={team}
                  className="text-[10px] px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(124,58,237,0.1)', color: 'rgba(167,139,250,0.7)' }}
                >
                  {team}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs mt-6" style={{ color: 'rgba(255,255,255,0.2)' }}>
        {filtered.length} of {tools.length} tools shown
      </p>
    </div>
  )
}
