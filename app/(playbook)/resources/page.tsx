'use client'

import { ExternalLink } from 'lucide-react'
import PageHeader from '@/components/playbook/PageHeader'

const resourceCategories = [
  {
    category: 'AI Tools',
    resources: [
      { name: 'ChatGPT', description: 'OpenAI\'s general AI assistant', link: 'https://chatgpt.com', free: true },
      { name: 'Claude', description: 'Anthropic\'s AI assistant — strong at writing and reasoning', link: 'https://claude.ai', free: true },
      { name: 'Perplexity', description: 'Source-backed AI research tool', link: 'https://perplexity.ai', free: true },
      { name: 'NotebookLM', description: 'Google\'s document-based AI research tool', link: 'https://notebooklm.google.com', free: true },
      { name: 'Midjourney', description: 'High-quality AI image generation', link: 'https://midjourney.com', free: false },
      { name: 'Cursor', description: 'AI-first code editor', link: 'https://cursor.com', free: false },
      { name: 'Gamma', description: 'AI presentation generator', link: 'https://gamma.app', free: true },
    ],
  },
  {
    category: 'Prompting Guides',
    resources: [
      { name: 'Claude Prompting Guide', description: 'Official guide to writing prompts for Claude', link: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview', free: true },
      { name: 'OpenAI Prompt Engineering', description: 'Official guide from OpenAI on prompting GPT models', link: 'https://platform.openai.com/docs/guides/prompt-engineering', free: true },
      { name: 'Prompting Fundamentals (Anthropic)', description: 'Core prompting concepts from Anthropic', link: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/prompt-fundamentals', free: true },
      { name: 'Learn Prompting', description: 'Open-source prompting guide for all models', link: 'https://learnprompting.org', free: true },
    ],
  },
  {
    category: 'AI Basics & Learning',
    resources: [
      { name: 'AI for Everyone (Coursera)', description: 'Andrew Ng\'s non-technical AI course', link: 'https://www.coursera.org/learn/ai-for-everyone', free: true },
      { name: 'Elements of AI', description: 'Free introductory AI course', link: 'https://www.elementsofai.com', free: true },
      { name: 'Anthropic\'s Claude Documentation', description: 'Technical docs for Claude API and capabilities', link: 'https://docs.anthropic.com', free: true },
      { name: '3Blue1Brown — Neural Networks', description: 'Visual explainer on how neural networks work', link: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi', free: true },
    ],
  },
  {
    category: 'AI Tools Documentation',
    resources: [
      { name: 'Cursor Docs', description: 'Documentation for the Cursor AI code editor', link: 'https://docs.cursor.com', free: true },
      { name: 'Midjourney Documentation', description: 'Official Midjourney prompt guides and parameters', link: 'https://docs.midjourney.com', free: true },
      { name: 'ElevenLabs Docs', description: 'Documentation for AI voice generation', link: 'https://elevenlabs.io/docs', free: true },
      { name: 'Runway Docs', description: 'Documentation for AI video generation', link: 'https://docs.runwayml.com', free: true },
    ],
  },
  {
    category: 'AI Safety & Ethics',
    resources: [
      { name: 'Anthropic\'s AI Safety Research', description: 'Anthropic\'s published research on AI safety', link: 'https://www.anthropic.com/research', free: true },
      { name: 'GDPR & AI Guide (ICO)', description: 'UK guidance on using AI within GDPR', link: 'https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/', free: true },
      { name: 'Partnership on AI', description: 'Resources on responsible AI development', link: 'https://partnershiponai.org', free: true },
    ],
  },
]

export default function ResourcesPage() {
  return (
    <div className="px-5 sm:px-8 py-8 max-w-5xl mx-auto">
      <PageHeader
        title="Resources"
        description="Curated links to AI tools, documentation, learning resources, and ethical guidelines."
        badge="Keep Improving It"
      />

      <div className="space-y-8">
        {resourceCategories.map((cat) => (
          <section key={cat.category}>
            <h2
              className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{ color: '#64748d' }}
            >
              {cat.category}
            </h2>
            <div
              className="rounded-xl overflow-hidden"
              style={{ border: '1px solid #e3e8ee', background: '#ffffff', boxShadow: 'rgba(0,55,112,0.08) 0 1px 3px' }}
            >
              {cat.resources.map((resource, i) => (
                <a
                  key={resource.name}
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-5 py-3.5 group transition-colors duration-100"
                  style={{
                    background: '#ffffff',
                    borderBottom: i < cat.resources.length - 1 ? '1px solid #e3e8ee' : 'none',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(83,58,253,0.03)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#ffffff' }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium transition-colors" style={{ color: '#0d253d' }}>
                        {resource.name}
                      </span>
                      {resource.free && (
                        <span
                          className="text-[10px] px-1.5 py-0.5 rounded font-medium"
                          style={{ background: 'rgba(34,197,94,0.1)', color: '#16a34a' }}
                        >
                          Free
                        </span>
                      )}
                    </div>
                    <p className="text-xs mt-0.5 truncate" style={{ color: '#64748d' }}>
                      {resource.description}
                    </p>
                  </div>
                  <ExternalLink
                    size={13}
                    className="shrink-0 ml-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: '#533afd' }}
                  />
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
