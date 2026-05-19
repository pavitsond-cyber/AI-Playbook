'use client'

import { useState } from 'react'
import PageHeader from '@/components/playbook/PageHeader'

const teams = [
  {
    id: 'design',
    label: 'Design',
    useCases: [
      'Generate UX copy options for empty states, error messages, and onboarding',
      'Create visual direction and mood boards with Midjourney or Krea',
      'Build rapid UI prototypes with Lovable or Figma Make',
      'Convert Figma designs to code using Figma Make + Cursor',
      'Conduct competitive design analysis by feeding competitor screenshots to Claude',
      'Generate accessibility-friendly copy alternatives',
    ],
    tools: ['Claude', 'Midjourney', 'Krea', 'Figma Make', 'Lovable', 'Cursor'],
  },
  {
    id: 'product',
    label: 'Product',
    useCases: [
      'Draft PRDs and feature specs from rough notes',
      'Generate user stories and acceptance criteria',
      'Synthesize research findings and user interview data',
      'Analyze competitor products and strategies',
      'Create presentation decks for feature reviews',
      'Write product announcements and change logs',
    ],
    tools: ['Claude', 'ChatGPT', 'Perplexity', 'NotebookLM', 'Gamma'],
  },
  {
    id: 'engineering',
    label: 'Engineering',
    useCases: [
      'Get code review suggestions and refactoring ideas',
      'Debug issues by explaining error messages to AI',
      'Write unit tests and test cases for edge cases',
      'Build small internal tools and automation scripts',
      'Generate documentation for APIs and codebase sections',
      'Convert data between formats (JSON, CSV, XML)',
    ],
    tools: ['Cursor', 'Claude', 'ChatGPT', 'Lovable'],
  },
  {
    id: 'brand-marketing',
    label: 'Brand & Marketing',
    useCases: [
      'Generate visual direction concepts and mood boards',
      'Write ad copy variants for different platforms',
      'Create campaign briefs and creative direction documents',
      'Generate image assets for social media and ads',
      'Create short promotional video concepts',
      'Generate voiceovers for promotional content',
    ],
    tools: ['Claude', 'ChatGPT', 'Midjourney', 'Krea', 'Runway', 'ElevenLabs', 'Canva AI'],
  },
  {
    id: 'operations',
    label: 'Operations',
    useCases: [
      'Automate repetitive data entry and formatting tasks',
      'Summarize long documents and meeting notes',
      'Generate process documentation and SOPs',
      'Structure and clean messy data from spreadsheets',
      'Draft internal communication and announcements',
      'Build small tools to reduce manual work',
    ],
    tools: ['Claude', 'ChatGPT', 'Notion AI', 'Cursor'],
  },
  {
    id: 'content',
    label: 'Content',
    useCases: [
      'Generate SEO briefs and content outlines',
      'Repurpose existing content for different formats',
      'Create voiceovers and audio content',
      'Translate and localize content for new markets',
      'Research topics quickly with source-backed answers',
      'Write product descriptions and listing copy',
    ],
    tools: ['Claude', 'ChatGPT', 'Perplexity', 'ElevenLabs', 'NotebookLM'],
  },
]

export default function ByTeamPage() {
  const [activeTab, setActiveTab] = useState('design')

  const activeTeam = teams.find((t) => t.id === activeTab)!

  return (
    <div className="px-5 sm:px-8 py-8 max-w-5xl mx-auto">
      <PageHeader
        title="AI by Team"
        description="Practical use cases and recommended tools for every Headout team."
        badge="Use AI"
      />

      {/* Tabs */}
      <div
        className="flex gap-1 p-1 rounded-xl mb-6 flex-wrap"
        style={{ background: 'rgba(14,14,28,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        {teams.map((team) => (
          <button
            key={team.id}
            onClick={() => setActiveTab(team.id)}
            className="px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150"
            style={{
              background: activeTab === team.id ? 'rgba(124,58,237,0.2)' : 'transparent',
              color: activeTab === team.id ? 'rgba(167,139,250,0.9)' : 'rgba(255,255,255,0.45)',
              border: '1px solid',
              borderColor: activeTab === team.id ? 'rgba(124,58,237,0.3)' : 'transparent',
            }}
          >
            {team.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div key={activeTab} className="animate-tab-fade">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Use cases */}
          <div
            className="p-5 rounded-xl"
            style={{
              background: 'rgba(14,14,28,0.8)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <h3
              className="text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              Use cases for {activeTeam.label}
            </h3>
            <ul className="space-y-3">
              {activeTeam.useCases.map((useCase, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span
                    className="shrink-0 size-1.5 rounded-full mt-2"
                    style={{ background: 'rgba(124,58,237,0.6)' }}
                  />
                  <span style={{ color: 'rgba(255,255,255,0.65)' }}>{useCase}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended tools */}
          <div
            className="p-5 rounded-xl"
            style={{
              background: 'rgba(14,14,28,0.8)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <h3
              className="text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              Recommended tools
            </h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {activeTeam.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1.5 rounded-full text-sm font-medium"
                  style={{
                    background: 'rgba(124,58,237,0.12)',
                    color: 'rgba(167,139,250,0.9)',
                    border: '1px solid rgba(124,58,237,0.15)',
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>

            <div
              className="p-4 rounded-lg text-sm"
              style={{
                background: 'rgba(124,58,237,0.05)',
                border: '1px solid rgba(124,58,237,0.1)',
                color: 'rgba(255,255,255,0.45)',
              }}
            >
              Want to go deeper? Check out the{' '}
              <a href="/skills" className="underline" style={{ color: 'rgba(167,139,250,0.7)' }}>Skills Library</a>
              {' '}and{' '}
              <a href="/tools" className="underline" style={{ color: 'rgba(167,139,250,0.7)' }}>Tool Library</a>
              {' '}for detailed guides.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
