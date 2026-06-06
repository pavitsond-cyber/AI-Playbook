'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'
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
  return `# ${skill.name}

## What this skill is
${skill.what}

## When to use
${skill.whenToUse}

## Quality bar
${skill.qualityBar}

## Tools
${skill.tools.join(', ')}

## Teams
${skill.teams.join(', ')}
`
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

function SkillCard({ skill }: { skill: Skill }) {
  const [btnHovered, setBtnHovered] = useState(false)

  return (
    <div
      className="dark-card skill-card"
      style={{ padding: '24px', display: 'flex', flexDirection: 'column', cursor: 'default' }}
    >
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: '#ffffff', flex: 1 }}>
          {skill.name}
        </span>
        <button
          onClick={() => downloadSkill(skill)}
          title="Download as .md"
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          style={{
            flexShrink: 0,
            background: btnHovered ? 'rgba(155,63,255,0.12)' : 'rgba(255,255,255,0.06)',
            border: `1px solid ${btnHovered ? 'rgba(155,63,255,0.25)' : 'rgba(255,255,255,0.08)'}`,
            borderRadius: 8,
            color: btnHovered ? '#C27FFF' : 'rgba(255,255,255,0.4)',
            padding: '4px 10px',
            fontSize: 11,
            fontFamily: 'var(--font-body)',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <Download size={11} />
          .md
        </button>
      </div>

      {/* What */}
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.65, color: 'rgba(255,255,255,0.45)', marginBottom: 16, flex: 1 }}>
        {skill.what}
      </p>

      {/* Use when + Quality bar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 0, fontSize: 13 }}>
        <div>
          <span style={{ fontFamily: 'var(--font-body)', fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>Use when: </span>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', fontSize: 13 }}>{skill.whenToUse}</span>
        </div>
        <div>
          <span style={{ fontFamily: 'var(--font-body)', fontWeight: 500, color: '#00CCA8' }}>Quality bar: </span>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', fontSize: 13 }}>{skill.qualityBar}</span>
        </div>
      </div>

      {/* Footer: tools + teams */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 14, marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {skill.tools.map((tool) => (
          <span
            key={tool}
            style={{
              background: 'rgba(155,63,255,0.12)',
              border: '1px solid rgba(155,63,255,0.2)',
              color: '#C27FFF',
              borderRadius: 100,
              padding: '3px 10px',
              fontSize: 11,
              fontFamily: 'var(--font-body)',
            }}
          >
            {tool}
          </span>
        ))}
        {skill.teams.map((team) => (
          <span
            key={team}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.4)',
              borderRadius: 100,
              padding: '3px 10px',
              fontSize: 11,
              fontFamily: 'var(--font-body)',
            }}
          >
            {team}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function SkillsPage() {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
      <BlobLayer />
      <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(64px,6vw,100px) clamp(20px,4vw,48px)', maxWidth: 960, margin: '0 auto' }}>
        <PageHeader
          title="Skills"
          description="Senior-level AI skills with quality bars. Each skill is downloadable as a Markdown template."
         
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
          {skills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  )
}
