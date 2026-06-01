'use client'

import { useState, useMemo } from 'react'
import { ExternalLink } from 'lucide-react'
import PageHeader from '@/components/playbook/PageHeader'

type Status = 'Approved' | 'Experimental' | 'Review before use'

interface Tool {
  name: string
  maker: string
  status: Status
  bestFor: string
  avoidFor: string
  failureMode: string
  humanReview: string
  headoutWorkflow: string
  qualityBar: string
  pairsWith: string[]
  teams: string[]
  link: string
}

const tools: Tool[] = [
  {
    name: 'Claude',
    maker: 'Anthropic',
    status: 'Approved',
    bestFor: 'Long-context synthesis, PRD critique, research analysis, structured documentation, prompt chain execution',
    avoidFor: 'Live facts or real-time data without source grounding. Customer-facing copy without human review.',
    failureMode: 'Polished but under-evidenced summaries. Confident assertions without citations. Agrees too readily with flawed premises when not pushed.',
    humanReview: 'PM/design/research validation before any output is used in decisions or shipped. Especially for research synthesis — check every AI-identified insight against source quotes.',
    headoutWorkflow: 'Interview transcripts → theme extraction → opportunity map → product recommendations. PRD draft → challenge session → revised PRD.',
    qualityBar: 'Every insight must link to a source quote. Frequency counts must be numbers, not estimates. Any factual claim should be verifiable.',
    pairsWith: ['NotebookLM', 'Cursor', 'Figma Make'],
    teams: ['Product', 'Design', 'Research', 'Content', 'Ops'],
    link: 'https://claude.ai',
  },
  {
    name: 'ChatGPT',
    maker: 'OpenAI',
    status: 'Approved',
    bestFor: 'General drafting, quick ideation, one-off synthesis tasks. Strong for breadth of knowledge.',
    avoidFor: 'Long-context work (use Claude instead). High-stakes structured analysis. Anything requiring full conversation thread consistency.',
    failureMode: 'Generic output on creative tasks. Loses thread in long conversations. Over-confident on topics where it should hedge.',
    humanReview: 'Always — especially for any public-facing copy or factual content.',
    headoutWorkflow: 'Quick briefing synthesis, first-draft copy, brainstorm session output.',
    qualityBar: 'Outputs require a human edit pass before use. Not for research-grade synthesis.',
    pairsWith: ['Claude', 'Perplexity'],
    teams: ['Everyone'],
    link: 'https://chatgpt.com',
  },
  {
    name: 'NotebookLM',
    maker: 'Google',
    status: 'Approved',
    bestFor: 'Research synthesis from large document sets. Source-grounded Q&A against your own research documents.',
    avoidFor: 'Creative tasks. Anything requiring knowledge outside the documents you upload. Do not use as a general AI assistant.',
    failureMode: 'Accurate to what is in the documents but blind to what is not. Can miss the most important insight if it is not clearly stated in a source.',
    humanReview: 'Researcher must validate all themes against their own reading. Check for confirmation bias in what the AI surfaces.',
    headoutWorkflow: 'Upload 10+ interview transcripts → ask structured synthesis questions → extract patterns with source citations.',
    qualityBar: 'Every answer must cite the source document and page/section. Uncited summaries are not trustworthy.',
    pairsWith: ['Claude'],
    teams: ['Research', 'Product', 'Content'],
    link: 'https://notebooklm.google.com',
  },
  {
    name: 'Perplexity',
    maker: 'Perplexity AI',
    status: 'Approved',
    bestFor: 'Source-backed research. Competitive intelligence. Recent information that model knowledge cutoffs would miss.',
    avoidFor: 'Creative tasks. Synthesis across private documents. Deep analysis — use Claude for that.',
    failureMode: 'Sources can be low quality if not verified. Summary can cherry-pick from sources. Confident presentation of uncertain information.',
    humanReview: 'Verify sources independently for any high-stakes research. Do not cite Perplexity output — cite the underlying source.',
    headoutWorkflow: 'Competitive landscape research → collect sources → feed to Claude for deeper analysis.',
    qualityBar: 'Only use Perplexity output as a starting point. Always click through and read the primary source before relying on a claim.',
    pairsWith: ['Claude'],
    teams: ['Product', 'Research', 'Content', 'Marketing'],
    link: 'https://perplexity.ai',
  },
  {
    name: 'Cursor',
    maker: 'Anysphere',
    status: 'Approved',
    bestFor: 'AI-assisted coding in an existing codebase. Refactoring with context. Building internal tools with engineering support.',
    avoidFor: 'Design-only teams without engineering context. Security-sensitive code without engineering review. Production code without testing.',
    failureMode: 'Plausible-looking code with subtle bugs. Over-confident fixes that work in isolation but fail at edge cases. Code that is not maintainable long-term.',
    humanReview: 'Engineering code review required for anything in production. Cursor output is a first draft, not a final PR.',
    headoutWorkflow: 'Internal operations tool: describe the problem → Cursor generates first version → engineer reviews and owns → tested before deploy.',
    qualityBar: 'Production code must pass code review. Any automation must be tested with edge cases. No Cursor-generated code ships without an engineer reading it.',
    pairsWith: ['Claude'],
    teams: ['Engineering', 'Design Engineering'],
    link: 'https://cursor.com',
  },
  {
    name: 'Midjourney',
    maker: 'Midjourney',
    status: 'Approved',
    bestFor: 'Visual territory exploration. Campaign concept generation. Reference imagery for mood and direction.',
    avoidFor: 'Direct use in ads or product without art direction review. Anything requiring specific real people. Do not use as a shortcut to skip art direction.',
    failureMode: 'Visually impressive but brand-inconsistent. Incorrect hands, faces, or details at close inspection. IP risk if prompts reference specific recognisable styles.',
    humanReview: 'Brand/art direction review required before any commercial use. Reference imagery ≠ production-ready asset.',
    headoutWorkflow: 'Campaign brief → visual territory exploration (6–8 directions) → art director shortlists 2–3 → develop the selected direction.',
    qualityBar: 'Reference sets only. Final assets require art direction. Any image used in marketing must pass brand QA.',
    pairsWith: ['Claude', 'Krea'],
    teams: ['Brand Design', 'Marketing'],
    link: 'https://midjourney.com',
  },
  {
    name: 'Krea',
    maker: 'Krea AI',
    status: 'Experimental',
    bestFor: 'Real-time visual iteration. Exploring style variations quickly during creative development.',
    avoidFor: 'Production-ready assets without art direction. Fine detail work.',
    failureMode: 'Fast output does not equal quality output. Visual coherence degrades at fine detail level. Good for ideation, not for shipping.',
    humanReview: 'Art director review before any image is used beyond internal ideation.',
    headoutWorkflow: 'Use alongside Midjourney for rapid territory iteration before committing to a direction.',
    qualityBar: 'Krea output is exploration material only. Not for production.',
    pairsWith: ['Midjourney', 'Claude'],
    teams: ['Brand Design'],
    link: 'https://krea.ai',
  },
  {
    name: 'Runway',
    maker: 'Runway',
    status: 'Experimental',
    bestFor: 'Short video concept generation. Motion references and storyboard animation.',
    avoidFor: 'Production ads without full human editing and direction. Customer-facing video without QA.',
    failureMode: 'Strong first 2 seconds, quality degrades. Uncanny valley in character motion. High cost for high-quality output.',
    humanReview: 'Video editor and creative director review before any output is used externally.',
    headoutWorkflow: 'Use for concepting and direction exploration, not for production output.',
    qualityBar: 'All Runway output is reference material only until reviewed by a video editor.',
    pairsWith: ['Midjourney', 'Claude'],
    teams: ['Brand Design', 'Marketing'],
    link: 'https://runwayml.com',
  },
  {
    name: 'ElevenLabs',
    maker: 'ElevenLabs',
    status: 'Experimental',
    bestFor: 'Voiceover drafts. Testing audio concepts before expensive production.',
    avoidFor: 'Final audio without voice direction and review. Sensitive or brand-critical communications.',
    failureMode: 'Tone inconsistency across long reads. Cultural nuance often off. May not match brand voice without significant tuning.',
    humanReview: 'Voice director or content lead review before use in any external material.',
    headoutWorkflow: 'Script concept → ElevenLabs draft → voice director review → decide whether to proceed with AI voice or commission human recording.',
    qualityBar: 'ElevenLabs output is a voice test, not a final take. Final audio requires direction review.',
    pairsWith: ['Claude'],
    teams: ['Content', 'Marketing', 'Brand'],
    link: 'https://elevenlabs.io',
  },
  {
    name: 'Figma Make',
    maker: 'Figma',
    status: 'Experimental',
    bestFor: 'Quick UI layout exploration from a text prompt. Rapid first-draft wireframes.',
    avoidFor: 'Production design. Complex component systems. Anything that needs to match an existing design system.',
    failureMode: 'Generic UI patterns that ignore the existing design system. Structural layout that requires significant rework.',
    humanReview: 'Designer reviews and reworks all Figma Make output before it is used in a real design file.',
    headoutWorkflow: 'Use for initial layout exploration only. Not a substitute for design work.',
    qualityBar: 'Figma Make output is a starting point. All design decisions require a designer.',
    pairsWith: ['Claude'],
    teams: ['Product Design', 'Design Engineering'],
    link: 'https://figma.com',
  },
  {
    name: 'Lovable',
    maker: 'Lovable',
    status: 'Experimental',
    bestFor: 'Rapid prototype or internal tool MVP. Quickly testing whether an idea is worth building.',
    avoidFor: 'Production code. Anything that needs to be maintained by engineering. Complex applications.',
    failureMode: 'Works for demo, breaks at edge cases. Code is not maintainable or extensible without significant engineering work.',
    humanReview: 'Engineering review required before using any Lovable output in a real product or workflow.',
    headoutWorkflow: 'Internal tool proof-of-concept → validate the idea → rebuild properly in Cursor with engineering.',
    qualityBar: 'Lovable output is a demo, not a product. Use it to validate an idea, not to deploy.',
    pairsWith: ['Cursor', 'Claude'],
    teams: ['Design Engineering', 'Product', 'Ops'],
    link: 'https://lovable.dev',
  },
  {
    name: 'Gamma',
    maker: 'Gamma',
    status: 'Approved',
    bestFor: 'First-draft internal presentations. Quickly turning a structured outline into a deck.',
    avoidFor: 'External presentations without full redesign. Board or investor-facing materials.',
    failureMode: 'Generic template aesthetics. Over-designed slides that prioritise style over substance.',
    humanReview: 'Presenter reviews all content. Do not use Gamma slides externally without a full visual review.',
    headoutWorkflow: 'Outline key points in Claude → paste into Gamma → produce first draft → presenter rewrites and tightens content.',
    qualityBar: 'Content quality is the responsibility of the presenter. Gamma handles structure, not substance.',
    pairsWith: ['Claude'],
    teams: ['Everyone'],
    link: 'https://gamma.app',
  },
]

const statusStyles: Record<Status, { bg: string; text: string; border: string }> = {
  'Approved': { bg: 'rgba(34,197,94,0.1)', text: '#16a34a', border: 'rgba(34,197,94,0.2)' },
  'Experimental': { bg: 'rgba(234,136,12,0.1)', text: '#b45309', border: 'rgba(234,136,12,0.2)' },
  'Review before use': { bg: 'rgba(239,68,68,0.1)', text: '#dc2626', border: 'rgba(239,68,68,0.2)' },
}

const allTeams = ['All', 'Product', 'Design', 'Design Engineering', 'Engineering', 'Research', 'Brand Design', 'Marketing', 'Content', 'Ops']

export default function ToolFrameworkPage() {
  const [filter, setFilter] = useState('All')

  const filtered = useMemo(() => {
    if (filter === 'All') return tools
    return tools.filter((t) => t.teams.some((team) => team.toLowerCase().includes(filter.toLowerCase()) || filter.toLowerCase().includes(team.toLowerCase())))
  }, [filter])

  return (
    <div className="px-5 sm:px-8 py-8 max-w-5xl mx-auto">
      <PageHeader
        title="Tool Framework"
        description="Approved and experimental AI tools for Headout teams — with what they are best for, where not to use them, their failure modes, and the human review required."
        badge="Tool Framework"
      />

      <div
        className="mb-6 p-4 rounded-xl text-sm"
        style={{ background: 'rgba(83,58,253,0.05)', border: '1px solid rgba(83,58,253,0.15)' }}
      >
        <strong style={{ color: '#273951' }}>Status guide: </strong>
        <span style={{ color: '#16a34a' }}>Approved</span>
        <span style={{ color: '#64748d' }}> — cleared for team use with standard review. </span>
        <span style={{ color: '#b45309' }}>Experimental</span>
        <span style={{ color: '#64748d' }}> — use for exploration, not production output without additional review. </span>
        <span style={{ color: '#dc2626' }}>Review before use</span>
        <span style={{ color: '#64748d' }}> — check with your lead before using in a workflow.</span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {allTeams.map((team) => (
          <button
            key={team}
            onClick={() => setFilter(team)}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150"
            style={{
              background: filter === team ? '#b9b9f9' : '#f6f9fc',
              border: '1px solid',
              borderColor: filter === team ? 'rgba(83,58,253,0.3)' : '#e3e8ee',
              color: filter === team ? '#4434d4' : '#64748d',
            }}
          >
            {team}
          </button>
        ))}
      </div>

      {/* Tool cards */}
      <div className="space-y-4">
        {filtered.map((tool) => {
          const statusStyle = statusStyles[tool.status]
          return (
            <div
              key={tool.name}
              className="p-5 rounded-xl"
              style={{
                background: '#ffffff',
                border: '1px solid #e3e8ee',
                borderRadius: '12px',
                boxShadow: 'rgba(0,55,112,0.06) 0 1px 3px',
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-base font-semibold" style={{ color: '#0d253d' }}>{tool.name}</h3>
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                        style={{ background: statusStyle.bg, color: statusStyle.text, border: `1px solid ${statusStyle.border}` }}
                      >
                        {tool.status}
                      </span>
                    </div>
                    <p className="text-xs" style={{ color: '#64748d' }}>by {tool.maker}</p>
                  </div>
                </div>
                <a
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-normal shrink-0"
                  style={{ background: '#533afd', color: '#ffffff' }}
                >
                  Open <ExternalLink size={10} />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs mb-4">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#16a34a' }}>Best for at Headout</div>
                  <p style={{ color: '#273951', lineHeight: '1.5' }}>{tool.bestFor}</p>
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#dc2626' }}>Avoid for</div>
                  <p style={{ color: '#273951', lineHeight: '1.5' }}>{tool.avoidFor}</p>
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#b45309' }}>Failure mode</div>
                  <p style={{ color: '#273951', lineHeight: '1.5' }}>{tool.failureMode}</p>
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#64748d' }}>Human review needed</div>
                  <p style={{ color: '#273951', lineHeight: '1.5' }}>{tool.humanReview}</p>
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#64748d' }}>Headout workflow</div>
                  <p style={{ color: '#273951', lineHeight: '1.5' }}>{tool.headoutWorkflow}</p>
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#533afd' }}>Quality bar</div>
                  <p style={{ color: '#273951', lineHeight: '1.5' }}>{tool.qualityBar}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-3" style={{ borderTop: '1px solid #e3e8ee' }}>
                {tool.pairsWith.map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-md" style={{ background: 'rgba(83,58,253,0.08)', color: '#4434d4' }}>
                    Pairs with: {t}
                  </span>
                ))}
                {tool.teams.map((team) => (
                  <span key={team} className="text-[10px] px-2 py-0.5 rounded-md" style={{ background: '#f6f9fc', color: '#64748d', border: '1px solid #e3e8ee' }}>
                    {team}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
