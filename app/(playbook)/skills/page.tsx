'use client'

import { useState } from 'react'
import { ChevronDown, Download } from 'lucide-react'
import PageHeader from '@/components/playbook/PageHeader'
import BlobLayer from '@/components/ui/BlobLayer'

interface Skill {
  name: string
  what: string           // one-line collapsed description
  whenToUse: string      // "What you provide" rows
  qualityBar: string     // "What you'll get back" description
  tools: string[]
  teams: string[]
  domain?: string        // e.g. "Design"
  // Rich content for expanded skills
  inputs?: { label: string; required: boolean }[]
  outputFields?: string[]
  auditCategories?: { name: string; desc: string }[]
  methodology?: { title: string; points: string[] }[]
  edgeCases?: string[]
  bestPractices?: string[]
  mdFile?: string        // path in /public — direct file download
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
    name: 'UI Audit Reporter',
    domain: 'Design',
    what: 'Audit screens for visual consistency, spacing, and design system compliance at a senior or lead level.',
    whenToUse: 'Before every significant engineering handoff. When screens need to be validated against the design system before launch.',
    qualityBar: 'Each finding must include: element, current state, expected state, location reference, design token reference, and recommendation. Prioritise as Critical / Major / Minor and group related issues to reduce redundancy.',
    tools: ['Figma', 'Design System'],
    teams: ['Product Design', 'Design Engineering'],
    mdFile: '/skills/ui-audit-reporter.md',
    inputs: [
      { label: 'Screen URL or Figma link to audit', required: true },
      { label: 'Design system reference — tokens, components, guidelines', required: true },
      { label: 'Audit scope: full screen, specific component, or specific category', required: true },
      { label: 'Platform: web desktop, web mobile, iOS, Android', required: false },
      { label: 'Previous audit findings for comparison', required: false },
      { label: 'Known design exceptions to exclude from findings', required: false },
    ],
    outputFields: ['Finding ID', 'Category', 'Severity', 'Element', 'Current State', 'Expected State', 'Location', 'Design Token Reference', 'Recommendation'],
    auditCategories: [
      { name: 'Consistency', desc: 'Components look and behave identically across screens' },
      { name: 'Spacing', desc: 'All spacing follows the design system scale' },
      { name: 'Typography', desc: 'Font sizes, weights, line heights match the type scale' },
      { name: 'Color', desc: 'Semantic colors used correctly; sufficient contrast' },
      { name: 'Components', desc: 'Standard components used; avoid custom one-offs' },
      { name: 'Accessibility', desc: 'Touch targets ≥44px; contrast ≥4.5:1; focus indicators visible' },
    ],
    methodology: [
      { title: 'Analyze Against Design System', points: ['Compare screens against tokens for color, spacing, typography, border radius, shadows', 'Flag undocumented or one-off components'] },
      { title: 'Visual Consistency Check', points: ['Ensure similar elements behave and appear identically across screens', 'Verify interaction patterns are consistent'] },
      { title: 'Spacing & Alignment', points: ['Check padding, margins, and gaps against the design system scale (4, 8, 12, 16, 24, 32, 48px)'] },
      { title: 'Typography', points: ['Confirm headings, body text, labels, captions follow the correct font size, weight, and line height'] },
      { title: 'Color Usage', points: ['Validate semantic colors (primary, destructive, muted)', 'Ensure sufficient contrast ratios for accessibility'] },
      { title: 'Responsive Behavior', points: ['Assess screen adaptation across breakpoints and platforms'] },
    ],
    edgeCases: [
      'Component not yet in design system → flag as undocumented rather than a violation',
      'Screen built on an outdated design system version → note which version the screen is built against',
      'Dark mode may have different issues than light mode → audit both and separate findings',
      'Campaign-specific deviations → verify the exceptions are documented',
      'Accessibility contrast failures caused by background images → recommend overlay solutions rather than only flagging the issue',
    ],
    bestPractices: [
      'Focus on measurable and high-impact issues rather than subjective preferences',
      'Verify consistency across multiple screens before marking a finding',
      'Include references to design tokens and system guidelines for each recommendation',
      'Always consider accessibility and responsiveness in audits',
      'Use grouped reporting to reduce redundancy and improve clarity for engineering teams',
    ],
  },
  {
    name: 'Design Handoff Documenter',
    domain: 'Design',
    what: 'Generate developer-ready specifications from design files with precise measurements, interactions, and tokens.',
    whenToUse: 'Before every engineering handoff. When developers need pixel-perfect implementation without repeated clarification rounds.',
    qualityBar: 'Every measurement must reference a design token — no arbitrary pixel values. Interactive states must cover all scenarios including error, empty, and loading. Animations must include duration and easing. The handoff should allow developers to implement fully without follow-up questions.',
    tools: ['Figma', 'Design System'],
    teams: ['Product Design', 'Design Engineering'],
    mdFile: '/skills/design-handoff-documenter.md',
    inputs: [
      { label: 'Design file URL or screenshots — Figma, Sketch, or equivalent', required: true },
      { label: 'Component scope: full page, section, or single component', required: true },
      { label: 'Design system reference — token mappings and guidelines', required: true },
      { label: 'Interaction notes or prototype links', required: false },
      { label: 'Frontend framework: React, Swift, Kotlin, Flutter', required: false },
    ],
    outputFields: ['Component Name', 'Measurements', 'Token Mappings', 'Interactive States', 'Animations', 'Responsive Behavior', 'Asset List', 'Implementation Notes'],
    auditCategories: [
      { name: 'Component Inventory', desc: 'List each unique component with token mappings' },
      { name: 'Layout Spec', desc: 'Grid, container widths, breakpoint behavior' },
      { name: 'Interaction Spec', desc: 'State changes, transitions, micro-interactions' },
      { name: 'Asset Spec', desc: 'Images, icons, illustrations, download-ready files' },
    ],
    edgeCases: [
      'Custom components not in the library → document fully and flag for inclusion',
      'Animated behaviors not obvious in static designs → provide prototype or video reference',
      'Data density variations → document behavior for extremes (1 item vs 100 items)',
      'Fonts without web licenses → flag and suggest fallbacks',
      'Third-party UI integrations → clarify boundaries of design implementation',
    ],
    bestPractices: [
      'Prioritize completeness and measurable accuracy over subjective opinions',
      'Document all edge cases including errors, empty states, and loading states',
      'Reference design tokens for all measurements and colors',
      'Provide developers with all information needed for pixel-perfect implementation',
      'Maintain clarity in responsive behavior, interactive states, and implementation details',
    ],
  },
  {
    name: 'User Flow Wireframer',
    domain: 'Design',
    what: 'Generate wireframe specifications for multi-step user journeys — happy paths, error states, and edge cases fully mapped.',
    whenToUse: 'When defining a new user journey or auditing an existing one for gaps in error handling, state coverage, or decision-point clarity.',
    qualityBar: 'Core flows should have ≤7 steps for critical tasks. Every screen must include a clear back/escape path. Error states must include recovery actions. Loading states must be specified for screens fetching data. Flows remain cohesive with consistent visual and interaction patterns.',
    tools: ['Figma'],
    teams: ['Product Design', 'Product', 'UX Research'],
    mdFile: '/skills/user-flow-wireframer.md',
    inputs: [
      { label: 'User goal — the task the user is trying to accomplish', required: true },
      { label: 'Entry points — possible starting locations (homepage, deep link, push notification)', required: true },
      { label: 'Platform: Web, iOS, Android, or cross-platform', required: true },
      { label: 'Technical or business constraints', required: false },
      { label: 'Existing patterns or design system reference', required: false },
      { label: 'Analytics data or known user behaviour', required: false },
    ],
    outputFields: ['Screen Name', 'Purpose', 'Content Blocks', 'Primary Action', 'Secondary Actions', 'State Variations', 'Data Inputs', 'Data Outputs', 'Transitions', 'Error States', 'Flow Diagram'],
    auditCategories: [
      { name: 'Screen Specification', desc: 'Name, purpose, content hierarchy, and primary CTA for each screen' },
      { name: 'State Variations', desc: 'Loading, empty, error, and success states for every screen' },
      { name: 'Transitions', desc: 'Push, modal, drawer, or inline expansion between screens' },
      { name: 'Data Dependencies', desc: 'What each screen needs from prior steps — inputs and outputs documented' },
    ],
    edgeCases: [
      'Authentication required mid-flow — preserve context during login or signup',
      'Mobile web users switching to app mid-flow — maintain state via deep links or saved progress',
      'Real-time data dependencies — handle stale or unavailable data gracefully',
      'Multiple user personas — design branching flows optimised for different user types',
      'Third-party redirects — ensure return journeys and error handling are clearly specified',
    ],
    bestPractices: [
      'Map the happy path first, then layer in error and edge states',
      'Keep critical task flows to ≤7 steps — every extra step reduces completion rates',
      'Every screen needs a clear back/escape path, no dead ends',
      'Document data dependencies between screens explicitly to avoid developer assumptions',
      'Always specify loading states for any screen that fetches data',
    ],
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
  // If a pre-built MD file exists in /public, download it directly
  if (skill.mdFile) {
    const a = document.createElement('a')
    a.href = skill.mdFile
    a.download = skill.mdFile.split('/').pop() ?? 'skill.md'
    a.click()
    return
  }
  // Otherwise generate from data
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, flexWrap: 'wrap' as const }}>
            {skill.domain && (
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 600, color: '#FF69DB', background: 'rgba(255,105,219,0.1)', border: '1px solid rgba(255,105,219,0.2)', borderRadius: 100, padding: '2px 8px', textTransform: 'uppercase' as const, letterSpacing: '0.08em', flexShrink: 0 }}>
                {skill.domain}
              </span>
            )}
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

      {/* ── Expanded dropdown ─────────────────────────────────────────── */}
      <div style={{
        maxHeight: isOpen ? '2400px' : '0px',
        overflow: 'hidden',
        transition: isOpen ? 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)' : 'none',
      }}>
        <div style={{ padding: '20px 20px 28px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: 28 }}>

          {/* ── What you provide ───────────────────────────────────────── */}
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: '#ffffff', margin: '0 0 12px' }}>What you provide</p>
            <div style={{ display: 'flex', flexDirection: 'column', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
              {(skill.inputs ?? skill.whenToUse.split(/(?<=\.)\s+/).map((s, i) => ({ label: s.trim(), required: i < 2 })).filter(x => x.label)).map((inp, i, arr) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>
                    {typeof inp === 'string' ? inp : inp.label}
                  </span>
                  {(typeof inp === 'object' ? inp.required : i < 2) && (
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500, color: '#C27FFF', background: 'rgba(155,63,255,0.12)', border: '1px solid rgba(155,63,255,0.2)', borderRadius: 100, padding: '2px 9px', flexShrink: 0, marginLeft: 12 }}>Required</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── What you'll get back ───────────────────────────────────── */}
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: '#ffffff', margin: '0 0 12px' }}>What you&apos;ll get back</p>
            <div style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>{skill.name}</span>
              </div>
              <div style={{ padding: '14px 16px' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.65, color: 'rgba(255,255,255,0.55)', margin: '0 0 12px' }}>{skill.qualityBar}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {(skill.outputFields ?? skill.tools).map(f => (
                    <span key={f} style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#C27FFF', background: 'rgba(155,63,255,0.12)', border: '1px solid rgba(155,63,255,0.2)', borderRadius: 100, padding: '3px 10px' }}>{f}</span>
                  ))}
                  {!skill.outputFields && skill.teams.map(t => (
                    <span key={t} style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 100, padding: '3px 10px' }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Audit Categories (rich skills only) ────────────────────── */}
          {skill.auditCategories && (
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: '#ffffff', margin: '0 0 12px' }}>Audit categories</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                {skill.auditCategories.map(cat => (
                  <div key={cat.name} style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 9 }}>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 700, color: '#C27FFF', margin: '0 0 4px' }}>{cat.name}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5, margin: 0 }}>{cat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Good to know / Edge cases (rich skills only) ───────────── */}
          {skill.edgeCases && (
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: '#ffffff', margin: '0 0 12px' }}>Good to know</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {skill.edgeCases.map((ec, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 14px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 9 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(155,63,255,0.5)', flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.55 }}>{ec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Tools + Teams (fallback for non-rich skills) ───────────── */}
          {!skill.outputFields && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {skill.tools.map(t => (
                <span key={t} style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#C27FFF', background: 'rgba(155,63,255,0.12)', border: '1px solid rgba(155,63,255,0.2)', borderRadius: 100, padding: '3px 10px' }}>{t}</span>
              ))}
              {skill.teams.map(t => (
                <span key={t} style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 100, padding: '3px 10px' }}>{t}</span>
              ))}
            </div>
          )}

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
