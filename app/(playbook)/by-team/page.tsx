'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import PageHeader from '@/components/playbook/PageHeader'

const teams = [
  {
    id: 'product-design',
    name: 'Product Design',
    tagline: 'Leverage: edge cases, design QA, and research-to-design translation',
    highestLeverage: [
      'Edge-case mapping — AI can surface 10× more edge cases than a manual review of the same design',
      'Design QA — systematic review of copy completeness, state coverage, and brand voice before handoff',
      'Research-to-opportunity — turn interview themes into a prioritised opportunity map for the next design sprint',
      'Funnel teardown — identify missing states, copy inconsistencies, and friction across a user flow',
    ],
    repeatableWorkflows: [
      'Design QA loop: Export screen copy inventory → Claude reviews for missing states, copy issues, character limits → designer reviews each flag',
      'Edge case generation: Feature description → AI generates exhaustive edge case list → designer and PM triage what is in scope',
      'Research synthesis → design direction: Interview themes + opportunity scores → top 3 directions to explore',
    ],
    doNotAutomate: [
      'Final design decisions and visual judgment',
      'Interaction choreography and motion design',
      'User empathy and research interpretation',
      'Accessibility decisions requiring real-user context',
    ],
    qualityBar: 'Every design QA flag is reviewed by the designer — no finding is applied without judgment. Edge case lists are starting points, not requirements.',
    tools: ['Claude', 'Figma Make'],
    humanReviewer: 'Senior Designer / Design Lead',
    riskLevel: 'Medium — copy errors can ship; missed edge cases create bugs and support load',
    headoutExample: 'Design QA for a new booking flow: AI flagged 23 copy inconsistencies and 8 missing states before engineering handoff. 2 days of manual QA reduced to 4 hours.',
  },
  {
    id: 'brand-design',
    name: 'Brand Design',
    tagline: 'Leverage: territory exploration, brand consistency, asset scale',
    highestLeverage: [
      'Visual territory exploration — generate 6–8 distinct visual directions from a brief before manual refinement',
      'Campaign system generation — from brief to 3 developed territories in one structured session',
      'Brand consistency audit — systematically score a batch of assets against defined brand criteria',
      'Asset adaptation — AI helps scale copy direction and brief writing across formats and markets',
    ],
    repeatableWorkflows: [
      'Territory exploration: Campaign brief → Claude generates 8 territories → Midjourney references → art director shortlists 2–3 → develop selected direction',
      'Brand QA batch: Upload asset set + brand rubric → AI scores each asset against criteria → creative director reviews flags',
      'Copy/visual alignment: AI reviews whether the copy direction and visual direction are telling the same story',
    ],
    doNotAutomate: [
      'Final creative direction — AI expands the option set; art director makes the call',
      'Brand evolution decisions',
      'Campaign narrative and strategic framing',
      'Any asset going to market without art direction review',
    ],
    qualityBar: 'All AI-generated reference imagery is exploration material only. No asset goes to market without art direction review and brand QA.',
    tools: ['Midjourney', 'Krea', 'Claude'],
    humanReviewer: 'Creative Director / Art Director',
    riskLevel: 'Medium–high — IP risk from image generation; brand consistency degrades at scale without review',
    headoutExample: 'LEGOLAND Dubai campaign: AI generated 8 visual territories in a single session. Creative director shortlisted 2 for development. Territory exploration time reduced from 3 days to 4 hours.',
  },
  {
    id: 'ux-writing-content',
    name: 'UX Writing & Content',
    tagline: 'Leverage: error states, localization QA, and systematic copy review',
    highestLeverage: [
      'Error state library — systematise all error, empty, and loading states across the product into a consistent set',
      'Localization pre-screening — catch cultural issues, untranslatable phrases, and truncation before market launch',
      'Voice and tone audit — systematic review of all product copy for brand consistency',
      'Content gap analysis — identify missing copy for user flows, edge states, and market-specific pages',
    ],
    repeatableWorkflows: [
      'Error state generation: Screen context + user journey state → 6 copy variants → writer selects and edits best 2 → tone review pass',
      'Localization pre-check: English copy → AI flags untranslatable phrases, length risks, cultural issues → native reviewer validates',
      'Copy audit: Export all product copy → AI scores against brand voice criteria → writer reviews and prioritises findings',
    ],
    doNotAutomate: [
      'Voice decisions — what Headout should sound like is always a human judgment call',
      'Sensitive copy — errors for lost bookings, refunds, rejections, and complaints',
      'Trust-critical flows — copy affecting user confidence and security',
      'Culturally sensitive copy without a native reviewer',
    ],
    qualityBar: 'All AI-generated copy requires a writer edit pass before use. No AI copy ships without a human read.',
    tools: ['Claude'],
    humanReviewer: 'UX Writer / Content Lead',
    riskLevel: 'Medium — off-brand copy degrades trust; cultural errors can cause market incidents',
    headoutExample: 'Localization QA for a new market launch: AI flagged 3 culturally inappropriate phrases and 12 UI truncation issues before launch.',
  },
  {
    id: 'product-pm',
    name: 'Product / PM',
    tagline: 'Leverage: PRD quality, decision clarity, and research-to-roadmap',
    highestLeverage: [
      'PRD pressure-testing — challenge assumptions, edge cases, and success metrics before engineering picks it up',
      'Decision memos — turn scattered Slack threads and meeting notes into a structured 1-page decision brief',
      'Support-to-roadmap synthesis — convert ticket complaint patterns into a ranked product opportunity list',
      'Experiment design — sharpen hypotheses and define complete metric sets with guardrails before a test runs',
    ],
    repeatableWorkflows: [
      'PRD review: Draft PRD → Claude challenge session (assumptions, edge cases, metrics, dependencies) → PM revises → team review',
      'Opportunity map: Interview themes + support ticket patterns + NPS data → ranked opportunity list → roadmap input',
      'Decision memo: Meeting notes + Slack context dump → Claude structures into 1-page brief → PM reviews and finalises',
    ],
    doNotAutomate: [
      'Final product decisions and prioritisation — AI can inform, not decide',
      'Stakeholder alignment — AI can prepare materials, not build trust',
      'The strategic framing of what the team should build and why',
      'Accountability for product outcomes',
    ],
    qualityBar: 'PRD challenge output is a list of questions and risks — not verdicts. PM reviews every finding and makes the call.',
    tools: ['Claude', 'NotebookLM', 'Perplexity'],
    humanReviewer: 'PM / Product Lead',
    riskLevel: 'Medium — poor PRDs cause engineering rework; unresolved assumptions become expensive later',
    headoutExample: 'AI-assisted PRD review for a checkout flow redesign: surfaced 5 unvalidated assumptions and 12 missing edge cases before scoping. Prevented a significant engineering revision mid-sprint.',
  },
  {
    id: 'research',
    name: 'Research',
    tagline: 'Leverage: synthesis scale, evidence grading, and contradiction surfacing',
    highestLeverage: [
      'Synthesis at scale — synthesise 15 interviews in the time it takes to carefully read 3',
      'Evidence grading — each insight gets a frequency count, participant IDs, and a confidence level',
      'Contradiction surfacing — AI identifies where participants disagreed; researcher investigates why',
      'Research repository tagging — tag archived research for future discoverability at the team level',
    ],
    repeatableWorkflows: [
      'Interview synthesis: Labelled transcripts → pain extraction with frequency → theme clustering → opportunity map with evidence',
      'Contradiction discovery: Full transcript set → AI lists all meaningful contradictions → researcher investigates each',
      'Repository tagging: Upload past research documents → AI assigns topic and JTBD tags → researcher validates',
    ],
    doNotAutomate: [
      'Research design — what to ask, who to ask, what to observe',
      'Interpretation of contradictions — the reason two participants disagree is often the most valuable insight',
      'Strategic framing of findings for a product audience',
      'The decision about which opportunities should drive the product direction',
    ],
    qualityBar: 'Every AI-identified insight must have: source quotes with participant IDs, a frequency count, and a confidence level. Insights without evidence are hypotheses.',
    tools: ['Claude', 'NotebookLM'],
    humanReviewer: 'Research Lead / Senior Researcher',
    riskLevel: 'High — false patterns or missed contradictions in research lead to wrong product bets',
    headoutExample: 'Usability study synthesis: 12 transcripts synthesised in 6 hours instead of 3 days. AI surfaced a contradiction between P3 and P7 that became the key insight for the design direction.',
  },
  {
    id: 'ops',
    name: 'Operations',
    tagline: 'Leverage: SOP documentation, support classification, data structuring',
    highestLeverage: [
      'SOP generation — turn tribal process knowledge into documented, reviewable standard operating procedures',
      'Support ticket classification — tag, cluster, and prioritise incoming issues at scale',
      'Supplier data normalisation — structure messy supplier data into clean, usable formats',
      'Contract extraction — extract key terms, dates, and obligations from contract documents',
    ],
    repeatableWorkflows: [
      'SOP drafting: Interview process owner → Claude drafts SOP → ops reviews, adds gaps → approved and published',
      'Ticket insight report: Weekly batch → AI clusters by theme and frequency → ops and product review output',
      'Contract extraction: Upload contracts → AI extracts parties, dates, obligations, renewal terms → ops validates against source',
    ],
    doNotAutomate: [
      'Final supplier or partner decisions',
      'Sensitive customer communications',
      'Decisions involving commercial negotiation or legal commitment',
      'Any action that creates a financial or legal obligation',
    ],
    qualityBar: 'Extracted data must be validated against source documents before acting on it. AI classification requires spot-checking.',
    tools: ['Claude', 'NotebookLM'],
    humanReviewer: 'Ops Lead',
    riskLevel: 'Medium — incorrect extraction or classification can cause process errors and downstream confusion',
    headoutExample: 'Supplier data normalisation: 3 months of inconsistent supplier spreadsheets structured and cleaned. Prep time reduced from 2 days to 3 hours.',
  },
  {
    id: 'design-engineering',
    name: 'Design Engineering',
    tagline: 'Leverage: prototype velocity, component docs, visual QA',
    highestLeverage: [
      'Prototype acceleration — go from a Figma spec to a working coded prototype in hours, not days',
      'Component documentation — auto-generate API documentation from existing component code',
      'Visual QA — systematic comparison of implementation against design spec to catch discrepancies early',
      'Bug reproduction — quickly draft reproduction cases and isolate the likely cause',
    ],
    repeatableWorkflows: [
      'Rapid prototype: Figma spec + requirements → Cursor → working HTML/React prototype → design and PM validation → iterate',
      'Component docs: Code file → Claude generates documentation → engineer reviews and publishes',
      'Design/code gap check: Design spec + implementation screenshots → AI flags discrepancies → engineer prioritises fixes',
    ],
    doNotAutomate: [
      'Architecture decisions — require engineering judgment and long-term system thinking',
      'Production code without engineering code review',
      'Security-sensitive implementations',
      'Accessibility without testing with real users and assistive technology',
    ],
    qualityBar: 'All AI-generated code is reviewed by an engineer before production use. Prototype code is for validation, not shipping.',
    tools: ['Cursor', 'Claude', 'Figma Make', 'Lovable'],
    humanReviewer: 'Senior Engineer / Design Engineer',
    riskLevel: 'High — code bugs in production; prototype-quality code shipped without review is a recurring risk',
    headoutExample: 'Internal ops tool: AI-assisted prototype in Cursor in 2 hours. Concept validated with ops team. Rebuilt properly by engineering in 3 days. Saves 4 hours/week of manual data entry.',
  },
]

export default function ByTeamPage() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="px-5 sm:px-8 py-8 max-w-5xl mx-auto">
      <PageHeader
        title="AI by Team"
        description="AI leverage maps for every Headout team — highest-value opportunities, repeatable workflows, what not to automate, quality bars, and real examples."
        badge="Evidence"
      />

      <div className="space-y-3">
        {teams.map((team) => {
          const isOpen = openId === team.id
          return (
            <div
              key={team.id}
              className="rounded-xl overflow-hidden transition-all duration-150"
              style={{
                background: '#ffffff',
                border: `1px solid ${isOpen ? 'rgba(83,58,253,0.25)' : '#e3e8ee'}`,
                borderRadius: '12px',
                boxShadow: 'rgba(0,55,112,0.08) 0 1px 3px',
              }}
            >
              <button
                onClick={() => setOpenId(isOpen ? null : team.id)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <div className="flex-1">
                  <div className="text-sm font-semibold mb-0.5" style={{ color: '#0d253d' }}>{team.name}</div>
                  <div className="text-xs" style={{ color: '#64748d' }}>{team.tagline}</div>
                </div>
                <ChevronDown
                  size={16}
                  className="shrink-0 ml-4 transition-transform duration-200"
                  style={{ color: '#64748d', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>

              {isOpen && (
                <div style={{ borderTop: '1px solid #e3e8ee', background: '#f6f9fc' }}>
                  <div className="px-5 pt-5 pb-6 space-y-6">

                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: '#533afd' }}>Highest-leverage opportunities</div>
                      <ul className="space-y-1.5">
                        {team.highestLeverage.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#273951' }}>
                            <span className="shrink-0 mt-1.5 size-1.5 rounded-full" style={{ background: '#533afd', opacity: 0.7 }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: '#64748d' }}>Repeatable workflows</div>
                      <div className="space-y-2">
                        {team.repeatableWorkflows.map((wf, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs p-3 rounded-lg" style={{ background: '#ffffff', border: '1px solid #e3e8ee', color: '#273951', lineHeight: '1.5' }}>
                            <span className="shrink-0 mt-1 size-1.5 rounded-full" style={{ background: '#64748d' }} />
                            {wf}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: '#dc2626' }}>Do not automate</div>
                        <ul className="space-y-1.5">
                          {team.doNotAutomate.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs" style={{ color: '#273951' }}>
                              <span className="shrink-0 mt-1.5 size-1 rounded-full" style={{ background: '#dc2626' }} />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-3 rounded-lg" style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.15)' }}>
                        <div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: '#16a34a' }}>Quality bar</div>
                        <p className="text-xs leading-relaxed" style={{ color: '#273951' }}>{team.qualityBar}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: '#64748d' }}>Tools</div>
                        <div className="flex flex-wrap gap-1">
                          {team.tools.map((t) => (
                            <span key={t} className="px-2 py-0.5 rounded-md" style={{ background: 'rgba(83,58,253,0.08)', color: '#4434d4' }}>{t}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: '#64748d' }}>Human reviewer</div>
                        <p style={{ color: '#273951' }}>{team.humanReviewer}</p>
                      </div>
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: '#64748d' }}>Risk level</div>
                        <p style={{ color: '#273951' }}>{team.riskLevel}</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg" style={{ background: 'rgba(83,58,253,0.04)', border: '1px solid rgba(83,58,253,0.12)' }}>
                      <div className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: '#533afd' }}>Headout example</div>
                      <p className="text-sm" style={{ color: '#273951' }}>{team.headoutExample}</p>
                    </div>

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
