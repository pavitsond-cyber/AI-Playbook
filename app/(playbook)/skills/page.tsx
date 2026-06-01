'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import PageHeader from '@/components/playbook/PageHeader'

interface SeniorSkill {
  name: string
  what: string
  whenToUse: string
  qualityBar: string
  tools: string[]
  teams: string[]
}

const seniorSkills: SeniorSkill[] = [
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
    what: 'Write prompts that give AI the specific company, product, user, or task context needed to produce high-quality, Headout-relevant output. The difference between generic AI output and useful output is almost always context.',
    whenToUse: 'Any time AI output feels generic or off-target. When a prompt works once but fails on similar inputs.',
    qualityBar: 'A well-engineered prompt should produce consistently useful output across similar inputs, not just occasionally. If it works 3 out of 10 times, the context is not sufficient.',
    tools: ['Claude', 'ChatGPT'],
    teams: ['Everyone'],
  },
  {
    name: 'AI-assisted research synthesis with evidence grading',
    what: 'Extract themes, frequency counts, and contradictions from research data. Assign confidence levels to each insight based on evidence quality and frequency.',
    whenToUse: 'After any research round with 5+ interviews or a significant data set. Before any product planning or prioritisation cycle.',
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
    qualityBar: 'Territories must be genuinely distinct. AI scoring is a starting point — the creative director\'s judgment is the final call. No territory goes to production without art direction review.',
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
    whenToUse: 'Before any A/B test or significant product experiment. Especially for checkout, onboarding, or conversion experiments where errors are costly.',
    qualityBar: 'The hypothesis is falsifiable and mechanistic. The primary metric is attributable. All guardrail metrics are defined before launch.',
    tools: ['Claude'],
    teams: ['Product', 'Research'],
  },
  {
    name: 'AI tool selection',
    what: 'Choose the right AI tool for a specific task based on: the type of output required, data sensitivity, quality bar, failure modes, and team context.',
    whenToUse: 'Before committing to a tool for a team workflow. When evaluating whether an existing tool is the right fit for a new use case.',
    qualityBar: 'Tool choice is justified by task fit, not familiarity. The decision includes what the tool should NOT be used for and what review is required.',
    tools: ['Multiple'],
    teams: ['Everyone'],
  },
  {
    name: 'AI adoption strategy',
    what: 'Build a plan for moving a team from individual prompting (Level 1) to quality-controlled systems (Level 3+). Includes: identifying high-value use cases, building shared workflows, defining quality bars, and establishing review processes.',
    whenToUse: 'When a team lead or director wants to move from ad-hoc AI use to a systematic operating model.',
    qualityBar: 'An adoption strategy is not a training plan. It is a workflow plan — specific workflows, named owners, quality bars, and a timeline. Training follows workflow design, not the other way around.',
    tools: ['Claude'],
    teams: ['Leads', 'Directors'],
  },
  {
    name: 'Human-in-the-loop system design',
    what: 'Design AI-assisted product features or internal workflows with explicit human checkpoints where required. Define confidence thresholds, fallback states, and escalation paths.',
    whenToUse: 'When designing any customer-facing AI feature. When building internal automation that affects high-stakes decisions.',
    qualityBar: 'Every human checkpoint has a clear trigger condition (when it activates), a defined action (what the human does), and a time bound (when it must resolve).',
    tools: ['Claude'],
    teams: ['Product', 'Design', 'Engineering'],
  },
  {
    name: 'AI quality bar creation',
    what: 'Define what "good" AI output looks like for a specific task type — in enough detail that two people could independently evaluate the same output and agree. Output types: research, copy, design, images, code.',
    whenToUse: 'Before deploying any AI workflow to the team. When output quality complaints arise after a workflow is running.',
    qualityBar: 'The quality bar is task-specific, not generic ("must be accurate" is not a quality bar). It lists specific pass/fail criteria.',
    tools: ['Claude'],
    teams: ['Everyone'],
  },
]

const foundationalSkills = [
  'Prompt writing and refinement',
  'UX copy generation',
  'Product copy exploration',
  'User story generation',
  'Basic research summarisation',
  'Basic image generation (Midjourney, Krea)',
  'Image editing and variation',
  'AI voice generation (ElevenLabs)',
  'Basic text summarisation',
  'Brainstorming with AI',
  'Competitor research with Perplexity',
  'Basic presentation generation (Gamma)',
  'Documentation drafting',
]

export default function SkillsPage() {
  const [foundationalOpen, setFoundationalOpen] = useState(false)

  return (
    <div className="px-5 sm:px-8 py-8 max-w-5xl mx-auto">
      <PageHeader
        title="Skills"
        description="Senior-level AI skills for leads, PMs, designers, researchers, and ops — the capabilities that create team leverage, not just individual time savings."
        badge="Workflow Systems"
      />

      {/* Senior skills */}
      <div className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: '#64748d' }}>
          Senior skills
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {seniorSkills.map((skill) => (
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
              <h3 className="text-sm font-semibold mb-2" style={{ color: '#0d253d' }}>{skill.name}</h3>
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

      {/* Foundational skills — assumed knowledge */}
      <div>
        <button
          onClick={() => setFoundationalOpen(!foundationalOpen)}
          className="w-full flex items-center justify-between px-5 py-4 rounded-xl transition-all duration-150"
          style={{
            background: '#f6f9fc',
            border: '1px solid #e3e8ee',
            borderRadius: '12px',
          }}
        >
          <div className="text-left">
            <div className="text-sm font-semibold" style={{ color: '#0d253d' }}>Foundational AI usage — assumed knowledge</div>
            <div className="text-xs mt-0.5" style={{ color: '#64748d' }}>Table-stakes skills not covered in depth here. If you are new to these, start here before the senior skills.</div>
          </div>
          <ChevronDown
            size={16}
            className="shrink-0 ml-4 transition-transform duration-200"
            style={{ color: '#64748d', transform: foundationalOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </button>

        {foundationalOpen && (
          <div
            className="mt-2 px-5 py-4 rounded-xl"
            style={{ background: '#f6f9fc', border: '1px solid #e3e8ee', borderRadius: '12px' }}
          >
            <div className="flex flex-wrap gap-2">
              {foundationalSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-full text-xs"
                  style={{ background: '#ffffff', border: '1px solid #e3e8ee', color: '#64748d' }}
                >
                  {skill}
                </span>
              ))}
            </div>
            <p className="text-xs mt-4" style={{ color: '#a8c3de' }}>
              These skills are entry-level. If your team is only here, move to the senior skills above to create real leverage.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
