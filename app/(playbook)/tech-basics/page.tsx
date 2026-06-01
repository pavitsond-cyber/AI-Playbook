'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import PageHeader from '@/components/playbook/PageHeader'

const concepts = [
  {
    id: 'json',
    term: 'JSON',
    subtitle: 'JavaScript Object Notation',
    explanation: 'JSON is a structured way to store and share data. When an AI tool sends data to another system, it usually uses JSON. Think of it like a very structured way of writing a note with labelled fields.',
    example: `{
  "name": "Colosseum",
  "city": "Rome",
  "category": "Historical",
  "price_usd": 18
}`,
    realWorld: 'When Headout fetches tour data from a supplier\'s API, the supplier sends back JSON. AI tools also return structured data as JSON when you ask them to.',
  },
  {
    id: 'api',
    term: 'API',
    subtitle: 'Application Programming Interface',
    explanation: 'An API is how two pieces of software talk to each other. When you ask an AI tool a question, your app sends a request to an API endpoint, and the AI sends back a response. APIs have rules about how requests must be formatted.',
    example: `// Request
POST https://api.anthropic.com/v1/messages
{
  "model": "claude-opus-4-5",
  "messages": [{"role": "user", "content": "Summarize this"}]
}

// Response
{
  "content": [{"text": "Here's a summary..."}]
}`,
    realWorld: 'ChatGPT, Claude, and Midjourney all have APIs. Headout uses APIs to connect to booking suppliers, payment systems, and content providers.',
  },
  {
    id: 'database',
    term: 'Database',
    subtitle: 'Structured data storage',
    explanation: 'A database is an organized collection of data. Relational databases (like PostgreSQL) store data in tables with rows and columns — like a very powerful spreadsheet. You query them using SQL.',
    example: `-- Fetch all published experiences in Rome
SELECT title, price, category
FROM experiences
WHERE city = 'Rome'
  AND status = 'published'
ORDER BY price ASC;`,
    realWorld: 'Headout\'s product catalog, bookings, users, and reviews all live in databases. When you ask an AI to help analyze data, it\'s often working with exported database content.',
  },
  {
    id: 'github',
    term: 'GitHub / Version Control',
    subtitle: 'Tracking code changes',
    explanation: 'GitHub is where code lives. It tracks every change made to a codebase, who made it, and why. A "PR" (Pull Request) is how a developer proposes a change — it gets reviewed before being merged into the main codebase.',
    example: `main branch          feature branch
    |                       |
    |--- create branch ---→ |
    |                       | (make changes)
    |                       |
    |←-- pull request ------|
    | (review + merge)      |`,
    realWorld: 'Cursor and other AI coding tools integrate directly with GitHub to understand the codebase context. When engineers use AI-assisted coding, they still follow the same PR review process.',
  },
  {
    id: 'frontend-backend',
    term: 'Frontend vs Backend',
    subtitle: 'What you see vs what happens behind it',
    explanation: 'The frontend is everything the user sees and interacts with — the UI. The backend is the server-side logic, databases, and APIs that make it work. Most AI tools are backend services that frontends call via APIs.',
    example: `Frontend (React/Next.js)
  └── User clicks "Book Now"
      └── Calls backend API
          └── Backend checks availability
              └── Calls payment API
                  └── Returns confirmation
                      └── Frontend shows success`,
    realWorld: 'When you use Lovable or Figma Make to build a prototype, you\'re mostly working on the frontend. When Headout connects to AI APIs for search or recommendations, that\'s backend work.',
  },
  {
    id: 'localization',
    term: 'Localization (i18n)',
    subtitle: 'Adapting content for different markets',
    explanation: 'Localization means adapting a product for different languages and regions — not just translating text but also adjusting formats, currencies, and cultural references. "i18n" is shorthand (18 letters between i and n).',
    example: `// Same key, different languages
{
  "book_button": {
    "en": "Book Now",
    "de": "Jetzt buchen",
    "fr": "Réserver maintenant",
    "ja": "今すぐ予約"
  }
}`,
    realWorld: 'Headout operates in many markets. AI tools can help generate first-draft translations and flag culturally sensitive copy — but always needs human review, especially for marketing copy.',
  },
]

export default function TechBasicsPage() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="px-5 sm:px-8 py-8 max-w-5xl mx-auto">
      <PageHeader
        title="Tech Basics"
        description="Plain-English explanations of the technical concepts you'll encounter when working with AI."
        badge="Understand AI"
      />

      <div className="space-y-3">
        {concepts.map((concept) => {
          const isOpen = openId === concept.id
          return (
            <div
              key={concept.id}
              className="rounded-xl overflow-hidden"
              style={{
                background: '#ffffff',
                border: `1px solid ${isOpen ? 'rgba(83,58,253,0.25)' : '#e3e8ee'}`,
                borderRadius: '12px',
                boxShadow: 'rgba(0,55,112,0.08) 0 1px 3px',
              }}
            >
              <button
                onClick={() => setOpenId(isOpen ? null : concept.id)}
                className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors duration-150"
                onMouseEnter={(e) => { if (!isOpen) e.currentTarget.style.background = '#f6f9fc' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs font-bold font-mono px-2 py-0.5 rounded"
                      style={{ background: 'rgba(83,58,253,0.08)', color: '#4434d4' }}
                    >
                      {concept.term}
                    </span>
                  </div>
                  <div className="text-sm font-medium mt-1" style={{ color: '#0d253d' }}>{concept.subtitle}</div>
                </div>
                <ChevronDown
                  size={16}
                  className="shrink-0 ml-4 transition-transform duration-200"
                  style={{
                    color: '#64748d',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>

              {isOpen && (
                <div
                  className="px-5 pb-5"
                  style={{ borderTop: '1px solid #e3e8ee' }}
                >
                  <p className="pt-4 text-sm leading-relaxed mb-5" style={{ color: '#273951' }}>
                    {concept.explanation}
                  </p>

                  <div
                    className="rounded-lg px-4 py-3 mb-4 font-mono text-xs leading-relaxed whitespace-pre overflow-x-auto"
                    style={{
                      background: '#f6f9fc',
                      border: '1px solid #e3e8ee',
                      color: '#273951',
                    }}
                  >
                    {concept.example}
                  </div>

                  <div
                    className="rounded-lg px-4 py-3 text-sm"
                    style={{
                      background: 'rgba(83,58,253,0.05)',
                      border: '1px solid rgba(83,58,253,0.12)',
                      color: '#64748d',
                    }}
                  >
                    <span className="font-semibold" style={{ color: '#273951' }}>At Headout:</span>{' '}
                    {concept.realWorld}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
