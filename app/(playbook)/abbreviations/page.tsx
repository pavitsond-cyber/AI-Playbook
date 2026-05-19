'use client'

import { useState, useMemo } from 'react'
import PageHeader from '@/components/playbook/PageHeader'

const abbreviations = [
  { abbr: 'AI', full: 'Artificial Intelligence', meaning: 'Technology that enables machines to simulate human intelligence.' },
  { abbr: 'AGI', full: 'Artificial General Intelligence', meaning: 'AI that can perform any intellectual task a human can.' },
  { abbr: 'LLM', full: 'Large Language Model', meaning: 'An AI model trained to understand and generate language.' },
  { abbr: 'GPT', full: 'Generative Pre-trained Transformer', meaning: 'A type of large language model developed by OpenAI.' },
  { abbr: 'RAG', full: 'Retrieval-Augmented Generation', meaning: 'AI retrieves external information before answering.' },
  { abbr: 'MCP', full: 'Model Context Protocol', meaning: 'A way for AI models to connect with tools and external context.' },
  { abbr: 'API', full: 'Application Programming Interface', meaning: 'A way for two software systems to talk to each other.' },
  { abbr: 'JSON', full: 'JavaScript Object Notation', meaning: 'A structured format for storing and sharing data.' },
  { abbr: 'XML', full: 'Extensible Markup Language', meaning: 'A format for storing and transporting data using tags.' },
  { abbr: 'CSV', full: 'Comma-Separated Values', meaning: 'A simple file format for storing tabular data.' },
  { abbr: 'SDK', full: 'Software Development Kit', meaning: 'A set of tools for building software applications.' },
  { abbr: 'UI', full: 'User Interface', meaning: 'The visual elements users interact with in a product.' },
  { abbr: 'UX', full: 'User Experience', meaning: 'The overall experience a user has with a product.' },
  { abbr: 'QA', full: 'Quality Assurance', meaning: 'The process of testing and ensuring product quality.' },
  { abbr: 'PRD', full: 'Product Requirements Document', meaning: 'A document describing what a product should do.' },
  { abbr: 'PR', full: 'Pull Request', meaning: 'A way to propose code changes in a version control system.' },
  { abbr: 'CMS', full: 'Content Management System', meaning: 'Software for managing and publishing digital content.' },
  { abbr: 'DAM', full: 'Digital Asset Management', meaning: 'A system for organizing and distributing digital files.' },
  { abbr: 'OCR', full: 'Optical Character Recognition', meaning: 'Technology that converts images of text into editable text.' },
  { abbr: 'TTS', full: 'Text-to-Speech', meaning: 'Technology that converts written text into spoken audio.' },
  { abbr: 'STT', full: 'Speech-to-Text', meaning: 'Technology that converts spoken audio into written text.' },
  { abbr: 'NLP', full: 'Natural Language Processing', meaning: 'AI that helps computers understand and process human language.' },
  { abbr: 'ML', full: 'Machine Learning', meaning: 'A subset of AI that learns from data to improve over time.' },
  { abbr: 'GPU', full: 'Graphics Processing Unit', meaning: 'A processor used to accelerate AI model training and inference.' },
  { abbr: 'CPU', full: 'Central Processing Unit', meaning: 'The main processor in a computer that runs instructions.' },
  { abbr: 'DB', full: 'Database', meaning: 'An organized collection of structured data.' },
  { abbr: 'SQL', full: 'Structured Query Language', meaning: 'A language for managing and querying relational databases.' },
  { abbr: 'NoSQL', full: 'Not Only SQL', meaning: 'A database approach for storing unstructured or flexible data.' },
]

export default function AbbreviationsPage() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    if (!q) return abbreviations
    return abbreviations.filter(
      (a) =>
        a.abbr.toLowerCase().includes(q) ||
        a.full.toLowerCase().includes(q) ||
        a.meaning.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <div className="px-5 sm:px-8 py-8 max-w-5xl mx-auto">
      <PageHeader
        title="Abbreviations"
        description="Quick reference for common AI and technical abbreviations."
        badge="Reference"
      />

      {/* Search */}
      <div className="mb-6">
        <div
          className="flex items-center gap-2 px-4 py-3 rounded-xl"
          style={{
            background: 'rgba(14,14,28,0.8)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }}>
            <path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
          </svg>
          <input
            type="text"
            placeholder="Search abbreviations…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none placeholder-white/25"
            style={{ color: 'rgba(255,255,255,0.85)' }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs px-2 py-0.5 rounded"
              style={{ color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.05)' }}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Count */}
      {query && (
        <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>
          {filtered.length} {filtered.length === 1 ? 'result' : 'results'} for &ldquo;{query}&rdquo;
        </p>
      )}

      {/* Table */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Header row */}
        <div
          className="grid grid-cols-12 px-4 py-3 text-xs font-semibold uppercase tracking-wider"
          style={{
            background: 'rgba(14,14,28,0.9)',
            color: 'rgba(255,255,255,0.3)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="col-span-2">Abbr.</div>
          <div className="col-span-4">Full Form</div>
          <div className="col-span-6">Meaning</div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-12 text-center" style={{ color: 'rgba(255,255,255,0.3)' }}>
            <p className="text-sm">No abbreviations found for &ldquo;{query}&rdquo;</p>
          </div>
        ) : (
          filtered.map((item, i) => (
            <div
              key={item.abbr}
              className="grid grid-cols-12 px-4 py-3.5 text-sm transition-colors duration-100"
              style={{
                background: i % 2 === 0 ? 'rgba(14,14,28,0.6)' : 'rgba(14,14,28,0.3)',
                borderBottom: i < filtered.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(124,58,237,0.05)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = i % 2 === 0 ? 'rgba(14,14,28,0.6)' : 'rgba(14,14,28,0.3)' }}
            >
              <div className="col-span-2">
                <span
                  className="px-2 py-0.5 rounded-md text-xs font-bold font-mono"
                  style={{
                    background: 'rgba(124,58,237,0.12)',
                    color: 'rgba(167,139,250,0.9)',
                  }}
                >
                  {item.abbr}
                </span>
              </div>
              <div className="col-span-4 font-medium text-white/80">{item.full}</div>
              <div className="col-span-6" style={{ color: 'rgba(255,255,255,0.5)' }}>{item.meaning}</div>
            </div>
          ))
        )}
      </div>

      <p className="text-xs mt-4" style={{ color: 'rgba(255,255,255,0.2)' }}>
        {abbreviations.length} abbreviations total
      </p>
    </div>
  )
}
