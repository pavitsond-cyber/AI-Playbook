'use client'

import { Download } from 'lucide-react'
import PageHeader from '@/components/playbook/PageHeader'

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

export default function SkillsPage() {
  return (
    <div className="px-5 sm:px-8 py-8 max-w-5xl mx-auto">
      <PageHeader
        title="Skills"
        description="Senior-level AI skills with quality bars. Each skill is downloadable as a Markdown template."
        badge="Skills"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex flex-col p-5 rounded-xl transition-all duration-150"
            style={{
              background: '#ffffff',
              border: '1px solid #e3e8ee',
              borderRadius: '12px',
              boxShadow: 'rgba(0,55,112,0.06) 0 1px 3px',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(83,58,253,0.3)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e3e8ee' }}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="text-sm font-semibold" style={{ color: '#0d253d' }}>{skill.name}</h3>
              <button
                onClick={() => downloadSkill(skill)}
                className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-medium transition-colors"
                style={{ background: '#f6f9fc', color: '#64748d', border: '1px solid #e3e8ee' }}
                title="Download as .md"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(83,58,253,0.08)'
                  e.currentTarget.style.color = '#533afd'
                  e.currentTarget.style.borderColor = 'rgba(83,58,253,0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f6f9fc'
                  e.currentTarget.style.color = '#64748d'
                  e.currentTarget.style.borderColor = '#e3e8ee'
                }}
              >
                <Download size={11} />
                .md
              </button>
            </div>

            <p className="text-xs leading-relaxed mb-3 flex-1" style={{ color: '#64748d' }}>{skill.what}</p>

            <div className="space-y-2 text-xs mb-3">
              <div>
                <span className="font-semibold" style={{ color: '#0d253d' }}>Use when: </span>
                <span style={{ color: '#64748d' }}>{skill.whenToUse}</span>
              </div>
              <div>
                <span className="font-semibold" style={{ color: '#16a34a' }}>Quality bar: </span>
                <span style={{ color: '#64748d' }}>{skill.qualityBar}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-3" style={{ borderTop: '1px solid #e3e8ee' }}>
              {skill.tools.map((tool) => (
                <span
                  key={tool}
                  className="text-[10px] px-2 py-0.5 rounded-md"
                  style={{ background: 'rgba(83,58,253,0.08)', color: '#4434d4' }}
                >
                  {tool}
                </span>
              ))}
              {skill.teams.map((team) => (
                <span
                  key={team}
                  className="text-[10px] px-2 py-0.5 rounded-md"
                  style={{ background: '#f6f9fc', color: '#64748d', border: '1px solid #e3e8ee' }}
                >
                  {team}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
