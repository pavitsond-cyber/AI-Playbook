'use client'

import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import PageHeader from '@/components/playbook/PageHeader'
import CopyButton from '@/components/playbook/CopyButton'
import BlobLayer from '@/components/ui/BlobLayer'
import SiteFooter from '@/components/glossary/SiteFooter'

interface PromptTemplate {
  id: string
  title: string
  description: string
  template: string
}

const prompts: PromptTemplate[] = [
  {
    id: 'problem-framing',
    title: 'Problem framing',
    description: 'Use this to clarify a vague, stakeholder-led, or solution-first problem into a clear problem statement, scope, assumptions, risks, and next step.',
    template: `Act like a product strategist helping frame a problem before solutioning.

Context:
[Describe the product, workflow, audience, user journey, or business area]

Raw problem:
[Paste the current problem statement, rough notes, stakeholder ask, or unclear brief]

Known signals:
- [Data point / research signal / user behaviour / stakeholder input]
- [Data point / research signal / user behaviour / stakeholder input]
- [Data point / research signal / user behaviour / stakeholder input]

Task:
Turn this into a clear problem framing.

Return:
1. Refined problem statement
2. Who is affected
3. Why this matters now
4. What behaviour or outcome needs to change
5. What is in scope
6. What is out of scope
7. Assumptions
8. Risks if we solve the wrong problem
9. Open questions
10. Suggested next step

Avoid:
- Jumping directly to solutions
- Generic problem statements
- Overstating impact without evidence`,
  },
  {
    id: 'opportunity-mapping',
    title: 'Opportunity mapping',
    description: 'Use this to identify meaningful opportunity areas from scattered notes, research signals, ideas, complaints, or stakeholder inputs.',
    template: `Act like a product thinker mapping opportunities from messy context.

Context:
[Paste project context, user research, product area, business goal, or stakeholder notes]

Goal:
[What outcome are we trying to influence?]

Input:
[Paste raw notes, observations, ideas, complaints, data points, or comments]

Task:
Identify meaningful opportunity areas.

Return:
1. Opportunity areas
2. User problem behind each opportunity
3. Business relevance
4. Evidence or signal supporting it
5. Possible solution directions
6. Fastest experiment to validate it
7. Risks or dependencies
8. Recommended priority

Format:
Opportunity → User problem → Evidence → Possible direction → Validation method → Priority`,
  },
  {
    id: 'idea-framing-alignment-approval',
    title: 'Idea to Stakeholder Pitch',
    description: 'Use this to shape, pitch, align, or get approval for an idea before it moves into design, build, or experimentation.',
    template: `Act like a product partner helping turn an idea into a clear, approval-ready direction.

Context:
[Describe the product area, current flow, user journey, business area, or project]

Idea or proposed direction:
[Describe the idea, design direction, feature, or change]

Current problem:
[What is not working today? Include user friction, business friction, operational friction, or strategic gap]

Audience or users affected:
[Who is affected by this problem or idea?]

Current behaviour:
[What do users, teams, or systems do today?]

Goal:
[What should improve if this idea works?]

Evidence:
[Add data, user research, user quotes, session observations, support tickets, stakeholder input, competitor references, or internal signals]

Stakeholders involved:
- [Stakeholder / team 1]
- [Stakeholder / team 2]
- [Stakeholder / team 3]

Known concerns:
- [Concern around scope, effort, risk, timeline, metrics, dependency, adoption, or confidence]
- [Concern around scope, effort, risk, timeline, metrics, dependency, adoption, or confidence]

Task:
Shape this into a clear direction that can be discussed, aligned, and approved.

Return:
1. One-line summary
2. Problem framing
3. Proposed direction
4. User value
5. Business value
6. Evidence supporting the idea
7. Points of stakeholder agreement
8. Points of tension or disagreement
9. Trade-offs
10. Risks and mitigations
11. Suggested MVP scope
12. Non-goals
13. Success metrics
14. What can be tested quickly
15. Decisions needed
16. Open questions
17. Conversation script for presenting this idea
18. One-line approval ask

Tone:
Clear, confident, collaborative, practical, and outcome-focused.

Avoid:
- Making it sound like a personal preference
- Over-selling without evidence
- Hiding unresolved tensions
- Ignoring effort or dependencies
- Using vague language like "better UX" without explaining the outcome
- Framing stakeholders as blockers`,
  },
  {
    id: 'product-critique',
    title: 'Product critique',
    description: 'Use this to evaluate a flow, screen, or journey before moving ahead, especially when you need to identify clarity gaps, friction, risks, missing states, and practical improvements.',
    template: `Act like a product reviewer evaluating a flow before it moves ahead.

Context:
[Describe the product surface, journey, or flow]

User goal:
[What is the user trying to do?]

Business goal:
[What outcome does the product need?]

Current flow:
[Paste flow / describe screens / add notes]

Task:
Review the flow across:
1. Clarity
2. User confidence
3. Information hierarchy
4. Friction
5. Decision points
6. Edge cases
7. Copy quality
8. Conversion risk
9. Implementation complexity

Return:
- What is working
- What may confuse users
- What feels unnecessary
- What is missing
- Highest-risk moments
- Suggested improvements
- Quick wins
- Larger changes worth exploring
- Final recommendation

Avoid:
- Generic UX advice
- Purely aesthetic feedback
- Recommendations without explaining impact`,
  },
  {
    id: 'ux-copy',
    title: 'UX copy',
    description: 'Use this to write clear product copy for states like empty, error, success, confirmation, warning, onboarding, or decision points.',
    template: `Act like a UX writer shaping copy for a product state.

Context:
[Describe the product surface]

User state:
[What is the user trying to do? What do they know? What may they be unsure about?]

System state:
[What is happening in the product?]

Goal:
[What should the copy help the user understand or do?]

Task:
Write clear UX copy for this state.

Required copy:
- Title
- Description
- Primary CTA
- Secondary CTA, if needed
- Error state, if relevant
- Empty state, if relevant
- Success state, if relevant

Constraints:
- Keep it clear and short
- Do not overpromise
- Do not introduce new information
- Avoid generic marketing language
- Make the next action obvious
- Use simple language

Return:
1. Recommended version
2. Shorter version
3. Warmer version
4. More direct version
5. Notes on ambiguity or risk`,
  },
  {
    id: 'research-synthesis-insight',
    title: 'Research synthesis and insight',
    description: 'Use this to turn raw research inputs into themes, insight statements, evidence, implications, opportunities, and possible next actions.',
    template: `Act like a researcher turning raw input into decision-ready insights.

Research context:
[Describe the study, product area, audience, or question]

Input:
[Paste interview notes, survey responses, observations, transcripts, session notes, or user comments]

Task:
Synthesize the input into patterns, insights, and implications.

Return:
1. Key themes
2. Repeated behaviours
3. User motivations
4. User anxieties
5. Confusing moments
6. Contradictions
7. Strong signals
8. Weak signals
9. Insight statements
10. Supporting evidence
11. Possible root causes
12. Product or design implications
13. Opportunities
14. Suggested experiments
15. Open questions
16. Confidence level for each major insight

Format:
Theme → Evidence → Interpretation → Insight → Why it matters → Possible action

Rules:
- Separate observation from interpretation
- Do not overgeneralize from one comment
- Mark assumptions clearly
- Prioritize insights that can influence decisions
- Avoid rephrasing observations as insights`,
  },
  {
    id: 'user-interview-guide',
    title: 'User interview guide',
    description: 'Use this to prepare an interview guide that reveals real behaviour, decision-making, motivations, pain points, and useful follow-up probes.',
    template: `Act like a researcher designing an interview guide.

Research goal:
[What do we need to learn?]

Target participant:
[Who are we interviewing?]

Context:
[What product, behaviour, or decision is this related to?]

Known assumptions:
- [Assumption 1]
- [Assumption 2]
- [Assumption 3]

Task:
Create an interview guide that helps validate or challenge these assumptions.

Return:
1. Interview objective
2. Participant criteria
3. Warm-up questions
4. Behaviour-based questions
5. Decision-making questions
6. Pain-point questions
7. Follow-up probes
8. Task-based prompts, if useful
9. Closing questions
10. What to listen for

Rules:
- Avoid leading questions
- Ask about past behaviour
- Avoid asking users to design the solution
- Include follow-up probes for vague answers`,
  },
  {
    id: 'survey-design',
    title: 'Survey design',
    description: 'Use this to create a survey that is easy to answer, easy to analyse, and structured to avoid weak or misleading response data.',
    template: `Act like a researcher designing a focused survey.

Research goal:
[What do we need to learn?]

Audience:
[Who will answer this?]

Context:
[Why are we running this survey?]

Task:
Create a survey that captures useful, decision-ready data.

Return:
1. Survey objective
2. Screening questions
3. Core questions
4. Multiple-choice options
5. Rating scale questions, if useful
6. Open-ended questions
7. Questions to avoid
8. How to interpret responses

Rules:
- Avoid leading questions
- Keep options mutually exclusive where possible
- Avoid double-barrelled questions
- Make answers easy to analyze
- Keep wording simple`,
  },
  {
    id: 'edge-case-finder',
    title: 'Edge case finder',
    description: 'Use this to stress-test a feature or flow before design handoff or implementation across broken states, confusing states, policy gaps, system failures, and platform differences.',
    template: `Act like a product designer stress-testing a feature.

Feature:
[Describe feature]

Flow:
[Describe user flow]

User types:
[List user types]

System rules:
[List rules, dependencies, policies, or logic]

Task:
Find edge cases that could break clarity, trust, or usability.

Explore:
1. Missing data
2. Delayed system response
3. Conflicting states
4. User misunderstanding
5. Policy mismatch
6. Permission issues
7. Error handling
8. Empty states
9. Repeated actions
10. Device or platform differences

Return:
- Edge case
- Trigger
- User impact
- Product risk
- Recommended handling
- Priority`,
  },
  {
    id: 'experiment-and-measurement',
    title: 'Experiment and measurement',
    description: 'Use this to design an experiment and define how success, failure, guardrails, segments, and decision criteria should be measured.',
    template: `Act like a product experimenter and analyst designing a test and measurement framework.

Context:
[Describe product area, feature, flow, or initiative]

Problem:
[What are we trying to improve?]

Hypothesis:
[What do we believe will happen?]

Audience:
[Who will be exposed to this?]

User behaviour we want to influence:
[Describe the behaviour change expected]

Business outcome:
[Describe the business result expected]

Known constraints:
[Add tracking, data, timeline, audience, platform, engineering, or rollout constraints]

Task:
Design the experiment and define how success should be measured.

Return:
1. Hypothesis
2. Control
3. Treatment
4. Primary metric
5. Secondary metrics
6. Guardrail metrics
7. Leading indicators
8. Lagging indicators
9. Segments to track
10. Events or data needed
11. Sample or duration considerations
12. Risks
13. What success looks like
14. What failure looks like
15. What would make us ship, iterate, or kill the idea
16. Metrics to avoid and why

Avoid:
- Vanity metrics
- Unclear success criteria
- Testing too many changes at once
- Measuring too many things
- Confusing activity with impact`,
  },
  {
    id: 'trade-off-analysis',
    title: 'Trade-off analysis',
    description: 'Use this to compare multiple directions and make a clearer recommendation across user value, business value, effort, risk, speed, reversibility, and learning value.',
    template: `Act like a decision partner evaluating multiple options.

Decision:
[Describe the decision]

Options:
1. [Option 1]
2. [Option 2]
3. [Option 3]

Context:
[Why this decision matters]

Constraints:
- [Constraint 1]
- [Constraint 2]
- [Constraint 3]

Compare across:
- User value
- Business value
- Effort
- Risk
- Speed
- Scalability
- Reversibility
- Learning value

Return:
1. Comparison table
2. Recommendation
3. Why this option is strongest
4. What we lose by choosing it
5. Risks to manage
6. What to validate before committing`,
  },
  {
    id: 'prioritisation',
    title: 'Prioritisation',
    description: 'Use this to order ideas, bugs, experiments, or features by impact, confidence, effort, risk, learning value, and strategic relevance.',
    template: `Act like a product lead prioritising a set of ideas.

Ideas:
[Paste ideas]

Goal:
[What outcome are we prioritising for?]

Constraints:
[Time / team / tech / business / launch constraints]

Prioritise using:
1. User impact
2. Business impact
3. Confidence
4. Effort
5. Risk
6. Speed to learn
7. Strategic relevance

Return:
- Must do
- Should do
- Could do
- Do later
- Do not do now

For each idea, include:
- Reason
- Risk
- Suggested next step`,
  },
  {
    id: 'prd',
    title: 'Generate PRD',
    description: 'Use this to convert a feature or initiative into a structured product requirements document with goals, non-goals, requirements, edge cases, dependencies, metrics, risks, and rollout plan.',
    template: `Act like a product partner turning a feature idea into a clear PRD.

Context:
[Describe product area and current state]

Problem:
[What problem are we solving?]

Audience:
[Who is this for?]

Goal:
[What should this improve?]

Known decisions:
[Paste existing decisions]

Open questions:
[Paste unknowns]

Task:
Create a PRD.

Return:
1. Overview
2. Problem statement
3. Goals
4. Non-goals
5. User stories
6. Functional requirements
7. Edge cases
8. Dependencies
9. Analytics and success metrics
10. Rollout plan
11. Risks
12. Open questions

Rules:
- Keep requirements testable
- Separate decisions from assumptions
- Avoid bloated scope`,
  },
  {
    id: 'implementation',
    title: 'Implementation',
    description: 'Use this to hand off a design or product change to an AI coding tool or engineer with clear scope, constraints, acceptance criteria, and boundaries.',
    template: `You are working inside this codebase as a careful design engineer.

Goal:
[Describe the change]

Context:
[Why this change is needed]

Scope:
Only update:
- [Files / components / pages]

Do not change:
- Routing
- Global styles
- Unrelated components
- Existing behaviour outside this scope

Instructions:
1. [Specific change]
2. [Specific change]
3. [Specific change]

Acceptance criteria:
- [Criteria 1]
- [Criteria 2]
- [Criteria 3]

Check for:
- Broken states
- Responsive issues
- Accessibility gaps
- Console errors
- Data or state assumptions

After implementation, return:
1. Files changed
2. Summary of changes
3. Anything that needs manual review`,
  },
  {
    id: 'launch-readiness',
    title: 'Launch readiness',
    description: 'Use this to check whether a feature, experiment, or product change is ready to go live across product, design, engineering, analytics, support, communication, risk, and rollout.',
    template: `Act like a launch owner checking whether a product change is ready to go live.

Context:
[Describe the feature, experiment, or product change]

What is launching:
[Describe the final scope]

Audience:
[Who will experience this change?]

Rollout plan:
[Describe release plan, experiment setup, or phased rollout]

Known risks:
[Paste known risks or unresolved concerns]

Task:
Create a launch readiness checklist.

Return:
1. Product readiness
2. Design readiness
3. Engineering readiness
4. Analytics readiness
5. Edge cases to verify
6. Support or ops readiness
7. Communication needed
8. Rollback plan
9. Final blockers
10. Go / no-go recommendation

Avoid:
- Treating launch as only an engineering release
- Ignoring measurement
- Ignoring support impact
- Skipping rollback or failure handling`,
  },
]

function PromptRow({ prompt, index, isOpen, onToggle }: {
  prompt: PromptTemplate
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div
      id={'prompt-' + prompt.id}
      style={{
        position: 'relative',
        background: 'rgba(255,255,255,0.03)',
        border: isOpen ? '1px solid rgba(155,63,255,0.25)' : '1px solid rgba(255,255,255,0.07)',
        borderRadius: 14,
        overflow: 'hidden',
        transition: 'border-color 0.18s ease',
      }}>
      {/* ── Header row: title + chevron (left) + Copy button (right) ─ */}
      {/* Copy button is INLINE so description below fills full width  */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          padding: '18px 18px 10px 20px',
        }}
      >
        {/* Clickable title + chevron */}
        <button
          onClick={onToggle}
          style={{
            flex: 1, minWidth: 0, display: 'inline-flex', alignItems: 'center',
            gap: 8, background: 'none', border: 'none', cursor: 'pointer',
            padding: 0, textAlign: 'left',
          }}
        >
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 20, fontWeight: 700, color: '#ffffff', lineHeight: 1.3,
          }}>
            {prompt.title}
          </span>
          <ChevronDown size={15} style={{
            color: isOpen ? '#C27FFF' : 'rgba(255,255,255,0.3)',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.22s ease, color 0.2s ease',
            flexShrink: 0,
          }} />
        </button>

        {/* Copy — stops click propagation so it doesn't toggle the card */}
        <div onClick={e => e.stopPropagation()} style={{ flexShrink: 0 }}>
          <CopyButton text={prompt.template} />
        </div>
      </div>

      {/* ── Description — full width, equal margins ───────────────── */}
      <button
        onClick={onToggle}
        style={{
          width: '100%', padding: '0 20px 18px',
          background: 'transparent', border: 'none',
          cursor: 'pointer', textAlign: 'left',
        }}
      >
        <p style={{
          fontFamily: "'halyard-text', 'DM Sans', system-ui, sans-serif",
          fontSize: 14, color: 'rgba(255,255,255,0.45)',
          lineHeight: 1.6, margin: 0, width: '100%',
        }}>
          {prompt.description}
        </p>
      </button>

      {/* ── Expanded: template ────────────────────────────────── */}
      <div style={{
        overflow: 'hidden',
        maxHeight: isOpen ? '3000px' : '0px',
        transition: isOpen
          ? 'max-height 0.38s cubic-bezier(0.4,0,0.2,1)'
          : 'max-height 0.18s ease-in',
      }}>
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '20px 20px 24px',
        }}>
          {/* Template block */}
          <div style={{
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 10,
            overflow: 'hidden',
          }}>
            <pre style={{
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: 13,
              lineHeight: 1.75,
              color: '#ffffff',
              margin: 0,
              padding: '20px',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              overflowX: 'auto',
            }}>
              {prompt.template}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

const PROMPT_TABS = ['All', 'Strategy', 'Research', 'Writing', 'Execution']

const PROMPT_TO_TAB: Record<string, string> = {
  'problem-framing': 'Strategy',
  'opportunity-mapping': 'Strategy',
  'idea-framing-alignment-approval': 'Strategy',
  'trade-off-analysis': 'Strategy',
  'prioritisation': 'Strategy',
  'product-critique': 'Research',
  'research-synthesis-insight': 'Research',
  'user-interview-guide': 'Research',
  'survey-design': 'Research',
  'ux-copy': 'Writing',
  'prd': 'Execution',
  'experiment-and-measurement': 'Execution',
  'edge-case-finder': 'Execution',
  'implementation': 'Execution',
  'launch-readiness': 'Execution',
}

export default function PromptsPage() {
  const [openId, setOpenId] = useState<string | null>(null)
  const [activePromptTab, setActivePromptTab] = useState<string>('All')
  const [displayPromptTab, setDisplayPromptTab] = useState<string>('All')
  const [fading, setFading] = useState(false)

  const toggle = (id: string) => setOpenId(prev => prev === id ? null : id)

  const switchPromptTab = (tab: string) => {
    if (tab === activePromptTab) return
    setFading(true)
    setTimeout(() => {
      setDisplayPromptTab(tab)
      setActivePromptTab(tab)
      setOpenId(null)
      setFading(false)
    }, 160)
  }

  // Deep-link handler: open the prompt whose id matches the URL hash
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (!hash) return
    // hash is like "prompt-prd" but prompt ids are like "prd" — handle both forms
    const rawId = hash.startsWith('prompt-') ? hash.slice('prompt-'.length) : hash
    const match = prompts.find(p => p.id === rawId || 'prompt-' + p.id === hash)
    if (match) {
      setOpenId(match.id)
      setTimeout(() => {
        const el = document.getElementById('prompt-' + match.id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 120)
    }
  }, [])

  const filteredPrompts = displayPromptTab === 'All'
    ? prompts
    : prompts.filter(p => PROMPT_TO_TAB[p.id] === displayPromptTab)

  return (
    <div style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
      <BlobLayer />
      <div style={{ position: 'relative', zIndex: 1, padding: '24px clamp(20px,4vw,48px) 16px', maxWidth: 960, margin: '0 auto' }}>
        <PageHeader
          title="Prompt Systems"
          description="15 reusable prompt templates for product thinking, UX writing, research, strategy, and decision-making."
        />

        {/* ── Filter tabs — exact glossary style ───────────────────────── */}
        <div style={{
          display: 'flex',
          overflowX: 'auto', scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch' as any,
          flexWrap: 'nowrap',
          marginBottom: 24,
          marginLeft: 'calc(-1 * clamp(20px,4vw,48px))',
          marginRight: 'calc(-1 * clamp(20px,4vw,48px))',
          paddingLeft: 'clamp(20px,4vw,48px)',
          paddingRight: 'clamp(20px,4vw,48px)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        } as React.CSSProperties}>
          {PROMPT_TABS.map(tab => {
            const isActive = activePromptTab === tab
            const count = tab === 'All' ? prompts.length : prompts.filter(p => PROMPT_TO_TAB[p.id] === tab).length
            return (
              <button
                key={tab}
                onClick={() => switchPromptTab(tab)}
                className="relative flex items-center gap-2 px-1 pb-3 pt-2 mr-6 text-sm font-medium transition-all duration-200 focus-visible:outline-none"
                style={{ background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0, WebkitTapHighlightColor: 'transparent', fontFamily: 'var(--font-body)' }}
              >
                <span className="transition-colors duration-200" style={{ color: isActive ? '#ffffff' : 'rgba(255,255,255,0.4)' }}>
                  {tab}
                </span>
                <span
                  className="text-xs px-1.5 py-0.5 rounded-full font-medium transition-all duration-200"
                  style={isActive
                    ? { background: '#9B3FFF', color: '#fff' }
                    : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  {count}
                </span>
                <span
                  className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                  style={{
                    background: '#9B3FFF',
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'opacity 0.2s, transform 0.2s',
                  }}
                />
              </button>
            )
          })}
        </div>

        <div style={{
          display: 'flex', flexDirection: 'column', gap: 16,
          opacity: fading ? 0 : 1,
          transform: fading ? 'translateY(6px)' : 'translateY(0px)',
          transition: fading
            ? 'opacity 0.16s ease-in, transform 0.16s ease-in'
            : 'opacity 0.26s ease-out, transform 0.26s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}>
          {filteredPrompts.map((prompt, i) => (
            <PromptRow
              key={prompt.id}
              prompt={prompt}
              index={i}
              isOpen={openId === prompt.id}
              onToggle={() => toggle(prompt.id)}
            />
          ))}
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
