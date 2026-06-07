'use client'

import { useState } from 'react'
import { ChevronDown, Download } from 'lucide-react'
import PageHeader from '@/components/playbook/PageHeader'
import BlobLayer from '@/components/ui/BlobLayer'

interface Skill {
  name: string
  what: string
  whenToUse: string
  qualityBar: string
  tools: string[]
  teams: string[]
}

const skills: Skill[] = [
  {
    name: 'AI workflow design',
    what: 'Design a reusable AI-assisted workflow for a recurring team task. Includes: input spec, prompt chain, review step, output format, and quality bar.',
    whenToUse: 'When a task recurs frequently enough to be worth systematising. When output quality is inconsistent across team members doing the same task.',
    qualityBar: 'Every workflow has an owner, a review step, a defined output format, and a quality rubric. If any of these are missing, it is not a workflow — it is a one-off.',
    tools: ['Claude', 'Notion'],
    teams: ['Product', 'Design', 'Research', 'Ops', 'Brand'],
  },
  {
    name: 'AI output evaluation',
    what: 'Build rubrics and checklists to evaluate AI output quality for a specific task type. Define what passing looks like and what failure looks like before the workflow runs.',
    whenToUse: 'Before scaling any AI workflow to the full team. When AI output quality is inconsistent and the team cannot agree on what "good" looks like.',
    qualityBar: 'The rubric should be specific enough that two people using it independently would rate the same output consistently. If it is open to interpretation, it is not finished.',
    tools: ['Claude'],
    teams: ['Research', 'Design', 'Product', 'Brand', 'Content'],
  },
  {
    name: 'Context engineering',
    what: 'Write prompts that give AI the specific product, user, or task context needed to produce high-quality output. The difference between generic AI output and useful output is almost always context.',
    whenToUse: 'Any time AI output feels generic or off-target. When a prompt works once but fails on similar inputs.',
    qualityBar: 'A well-engineered prompt should produce consistently useful output across similar inputs, not just occasionally. If it works 3 out of 10 times, the context is not sufficient.',
    tools: ['Claude', 'ChatGPT'],
    teams: ['Everyone'],
  },
  {
    name: 'AI-assisted research synthesis with evidence grading',
    what: 'Extract themes, frequency counts, and contradictions from research data. Assign confidence levels to each insight based on evidence quality and frequency.',
    whenToUse: 'After any research round with 5+ interviews or a significant dataset. Before any product planning or prioritisation cycle.',
    qualityBar: 'Every insight must have: a source quote with participant ID, a frequency count, and a confidence level. Insights without evidence are hypotheses, not findings.',
    tools: ['Claude', 'NotebookLM'],
    teams: ['Research', 'Product', 'Design'],
  },
  {
    name: 'AI-powered design QA',
    what: 'Use AI to systematically review a design for missing states, copy inconsistencies, brand voice issues, and edge cases before engineering handoff.',
    whenToUse: 'Before every significant engineering handoff. Especially on flows with high copy density or many edge case states.',
    qualityBar: 'Every AI flag is reviewed by the designer. Each finding is either fixed or explicitly accepted with a reason. Zero unexplored flags.',
    tools: ['Claude'],
    teams: ['Product Design', 'UX Writing'],
  },
  {
    name: 'AI-assisted product critique',
    what: 'Use a structured prompt chain to pressure-test a PRD, product decision, or feature spec for unvalidated assumptions, missing edge cases, and weak success metrics.',
    whenToUse: 'Before engineering handoff on any significant feature. As a pre-review step before the PM presents to leadership.',
    qualityBar: 'Every assumption is either validated or explicitly listed as a known risk. Every success metric is measurable and attributable. All critical dependencies are named.',
    tools: ['Claude'],
    teams: ['Product'],
  },
  {
    name: 'AI for localization at scale',
    what: 'Build a QA system for translated copy that catches cultural mismatches, truncation risks, and translation quality issues before market launch.',
    whenToUse: 'Before any translated copy goes to production. For new market launches and high-traffic page updates.',
    qualityBar: 'Every AI-flagged item is reviewed by a native speaker or local market manager. AI pre-screening does not replace human market review.',
    tools: ['Claude'],
    teams: ['UX Writing', 'Content', 'Ops'],
  },
  {
    name: 'AI creative direction systems',
    what: 'Use AI to rapidly explore and evaluate multiple visual or creative territories from a brief before committing to one direction. AI expands the option space; humans make the creative decisions.',
    whenToUse: 'At the start of any campaign requiring creative direction. When a brief has multiple viable directions and the team needs to explore before committing.',
    qualityBar: "Territories must be genuinely distinct. AI scoring is a starting point — the creative director's judgment is the final call. No territory goes to production without art direction review.",
    tools: ['Claude', 'Midjourney', 'Krea'],
    teams: ['Brand Design', 'Marketing'],
  },
  {
    name: 'AI governance for product teams',
    what: 'Define the quality bars, review processes, data handling rules, and ownership structure for AI use across a team. A governance model answers: who owns what, what can be automated, and what requires human sign-off.',
    whenToUse: 'When a team is moving from individual AI use to team-level workflows. Before any AI output reaches a customer-facing surface.',
    qualityBar: 'A complete governance model names: the workflow owner, the reviewer, the quality bar, the failure mode, and the escalation path for each workflow type.',
    tools: ['Claude'],
    teams: ['Product', 'Design', 'Research', 'Ops'],
  },
  {
    name: 'AI-assisted experimentation planning',
    what: 'Use AI to sharpen hypotheses, define complete metric sets with guardrails, and identify experiment risks before a test runs.',
    whenToUse: 'Before any A/B test or significant product experiment. Especially for experiments where errors are costly.',
    qualityBar: 'The hypothesis is falsifiable and mechanistic. The primary metric is attributable. All guardrail metrics are defined before launch.',
    tools: ['Claude'],
    teams: ['Product', 'Research'],
  },
  {
    name: 'AI adoption strategy',
    what: 'Build a plan for moving a team from individual prompting to quality-controlled systems. Includes: identifying high-value use cases, building shared workflows, defining quality bars, and establishing review processes.',
    whenToUse: 'When a team lead or director wants to move from ad-hoc AI use to a systematic operating model.',
    qualityBar: 'An adoption strategy is not a training plan. It is a workflow plan — specific workflows, named owners, quality bars, and a timeline. Training follows workflow design, not the other way around.',
    tools: ['Claude'],
    teams: ['Leads', 'Directors'],
  },
]

function buildMarkdown(skill: Skill): string {
  return `# ${skill.name}\n\n## What this skill is\n${skill.what}\n\n## When to use\n${skill.whenToUse}\n\n## Quality bar\n${skill.qualityBar}\n\n## Tools\n${skill.tools.join(', ')}\n\n## Teams\n${skill.teams.join(', ')}\n`
}

function downloadSkill(skill: Skill) {
  const content = buildMarkdown(skill)
  const filename = skill.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '.md'
  const blob = new Blob([content], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function SkillRow({ skill, isOpen, onToggle }: { skill: Skill; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: isOpen ? '1px solid rgba(155,63,255,0.25)' : '1px solid rgba(255,255,255,0.07)',
        borderRadius: 14,
        overflow: 'hidden',
        transition: 'border-color 0.2s ease',
      }}
    >
      {/* ── Collapsed row ─────────────────────────────────────────────── */}
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '18px 20px',
          background: isOpen ? 'rgba(155,63,255,0.04)' : 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'background 0.15s ease',
        }}
      >
        {/* Name + description */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 17,
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.3,
            }}>
              {skill.name}
            </span>
            <ChevronDown
              size={15}
              style={{
                color: isOpen ? '#C27FFF' : 'rgba(255,255,255,0.25)',
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease, color 0.2s ease',
                flexShrink: 0,
              }}
            />
          </div>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.5,
            margin: 0,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
          } as React.CSSProperties}>
            {skill.what}
          </p>
        </div>

        {/* Download button */}
        <button
          onClick={e => { e.stopPropagation(); downloadSkill(skill) }}
          title="Download as .md"
          style={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            padding: '6px 12px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: 8,
            color: 'rgba(255,255,255,0.4)',
            fontSize: 11,
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(155,63,255,0.12)'
            e.currentTarget.style.borderColor = 'rgba(155,63,255,0.25)'
            e.currentTarget.style.color = '#C27FFF'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'
            e.currentTarget.style.color = 'rgba(255,255,255,0.4)'
          }}
        >
          <Download size={11} />
          .md
        </button>
      </button>

      {/* ── Expanded dropdown — mirrors headout-agent-skills layout ──── */}
      <div style={{
        maxHeight: isOpen ? '800px' : '0px',
        overflow: 'hidden',
        transition: isOpen ? 'max-height 0.35s cubic-bezier(0.4,0,0.2,1)' : 'none',
      }}>
        <div style={{
          padding: '20px 20px 24px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}>

          {/* ── What you provide ───────────────────────────────────────── */}
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: '#ffffff', margin: '0 0 12px' }}>
              What you provide
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
              {skill.whenToUse
                .split(/(?<=\.)\s+/)
                .map(s => s.trim())
                .filter(Boolean)
                .map((item, i, arr) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                    background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
                  }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                      {item}
                    </span>
                    {i < 2 && (
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500, color: '#C27FFF', background: 'rgba(155,63,255,0.12)', border: '1px solid rgba(155,63,255,0.2)', borderRadius: 100, padding: '2px 9px', flexShrink: 0, marginLeft: 12 }}>
                        Key input
                      </span>
                    )}
                  </div>
                ))}
            </div>
          </div>

          {/* ── What you'll get back ───────────────────────────────────── */}
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: '#ffffff', margin: '0 0 12px' }}>
              What you&apos;ll get back
            </p>
            <div style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, overflow: 'hidden' }}>
              {/* Output label */}
              <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>
                  {skill.name}
                </span>
              </div>
              {/* Quality bar as field description */}
              <div style={{ padding: '14px 16px' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.65, color: 'rgba(255,255,255,0.55)', margin: '0 0 12px' }}>
                  {skill.qualityBar}
                </p>
                {/* Output fields as chips — mirrors the column header chips on the reference */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {skill.tools.map(tool => (
                    <span key={tool} style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#C27FFF', background: 'rgba(155,63,255,0.12)', border: '1px solid rgba(155,63,255,0.2)', borderRadius: 100, padding: '3px 10px' }}>
                      {tool}
                    </span>
                  ))}
                  {skill.teams.map(team => (
                    <span key={team} style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 100, padding: '3px 10px' }}>
                      {team}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default function SkillsPage() {
  const [openName, setOpenName] = useState<string | null>(null)

  const toggle = (name: string) => setOpenName(prev => prev === name ? null : name)

  return (
    <div style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
      <BlobLayer />
      <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(64px,6vw,100px) clamp(20px,4vw,48px)', maxWidth: 960, margin: '0 auto' }}>
        <PageHeader
          title="Skills"
          description="Senior-level AI skills with quality bars. Each skill is downloadable as a Markdown template."
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {skills.map(skill => (
            <SkillRow
              key={skill.name}
              skill={skill}
              isOpen={openName === skill.name}
              onToggle={() => toggle(skill.name)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
