'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import PageHeader from '@/components/playbook/PageHeader'

const caseStudies = [
  {
    id: 'research-synthesis',
    title: 'AI-assisted UX research synthesis',
    team: 'Research',
    tools: ['Claude', 'NotebookLM'],
    timeSaved: '~18 hrs per round',
    problem: '12 user interview transcripts from a usability study needed synthesis. Manual synthesis took 3 full days, required one researcher under time pressure, and often produced themes without surfacing contradictions between participants.',
    whyOldWorkflowBroken: 'Each transcript was read individually and highlighted in isolation. Themes were assembled in Miro without a structured frequency count. The researcher had no reliable way to surface where participants disagreed — contradictions were averaged away.',
    whereAIIntroduced: 'Step 1: All transcripts uploaded to Claude with a structured prompt for pain extraction with frequency counts. Step 2: A follow-up prompt for theme clustering by job-to-be-done. Step 3: A third prompt explicitly asking for contradictions between participants.',
    workflowBefore: 'Read transcripts individually → highlight → affinity map in Miro → write synthesis → share → revise: 3 days',
    workflowAfter: 'Label and prepare transcripts → Claude structured synthesis → researcher reviews themes → contradiction pass → validate and add context → final write-up: 6 hours',
    humanRole: 'Validated all AI-identified themes against their own reading. Investigated the two contradictions AI surfaced. Added strategic framing — which opportunities aligned with the product direction was not something AI could know.',
    whatImproved: '3 days reduced to 6 hours. Two contradictions between P3 and P7 were surfaced that were not in the original hand-coded notes. Those contradictions became the key insight that drove the design direction.',
    whatFailed: 'AI initially grouped themes too broadly. A follow-up prompt was needed to break themes into sub-themes. The first pass required a second round of prompting before it was usable.',
    whatNeededHumanJudgment: 'Why P3 and P7 contradicted each other — the reason required product and user context AI could not access. Final prioritisation of which opportunities to pursue.',
    reusablePattern: 'Batch synthesis → pain extraction with frequency → theme clustering → contradiction prompt → opportunity scoring. The contradiction prompt is the step most teams skip. It is often where the real insight is.',
    whatOthersCanLearn: 'The second prompt — asking for contradictions — adds as much value as the first. Do not stop at themes. Also: frequency counts from AI are directional but should be spot-checked.',
  },
  {
    id: 'design-qa',
    title: 'Design QA for a new booking flow',
    team: 'Product Design',
    tools: ['Claude'],
    timeSaved: '~12 hrs per release cycle',
    problem: 'A new booking flow had 34 screens. Manual design QA before engineering handoff was taking 2 full days and still missing copy inconsistencies and missing states. Engineers were finding the gaps during development — at a much higher cost to fix.',
    whyOldWorkflowBroken: 'QA was done manually by the designer and then spot-checked by the PM. No structured checklist for state coverage. No systematic way to review all screen copy for consistency at once. The scope was too large for reliable manual review.',
    whereAIIntroduced: 'All screen copy was exported into a structured document (screen name, state, copy text, character limit). Claude then ran three review passes: (1) missing state check, (2) copy consistency audit, (3) brand voice review.',
    workflowBefore: 'Designer manually reviews screens → PM spot-check → engineer finds bugs in development → designer fixes mid-sprint',
    workflowAfter: 'Designer exports copy inventory → Claude QA pass (3 prompts) → designer reviews AI findings → fixes before handoff → engineering handoff with clean copy',
    humanRole: 'Designer reviewed every AI flag — approximately 80% were valid, 20% were false positives. PM reviewed missing state findings and made scope decisions. All copy decisions were made by the designer.',
    whatImproved: '23 copy inconsistencies caught. 8 missing states identified. All before engineering handoff. 2 days of manual QA reduced to 4 hours. Zero copy bugs in the first engineering review cycle.',
    whatFailed: 'Character limit flags were based on estimated limits, not the actual pixel constraints. Some flags required a follow-up pass with precise limits. The brand voice review was occasionally over-conservative.',
    whatNeededHumanJudgment: 'Deciding which missing states were in scope for this release. Distinguishing genuine inconsistencies from intentional voice choices. All copy decisions.',
    reusablePattern: 'Export all screen copy → structure by screen + state → Claude QA pass (states, consistency, voice) → designer reviews each flag → fix before handoff. Build the prompt set once and reuse for every significant feature.',
    whatOthersCanLearn: 'The value compounds across releases. After 3 cycles, the designer knew exactly which types of issues AI would catch — and could rely on it as a first filter. Review time dropped from 4 hours to 2 hours by the third run.',
  },
  {
    id: 'localization-qa',
    title: 'Localization QA for a new market launch',
    team: 'UX Writing · Ops',
    tools: ['Claude'],
    timeSaved: '~6 hrs per market launch',
    problem: 'Expanding to a new market. Translated copy was going from the vendor directly to production with only a spot-check from the ops team. Cultural errors and truncation issues were being caught in production, not before launch.',
    whyOldWorkflowBroken: 'The review process was manual and inconsistent. Reviewers checked for obvious errors but had no systematic way to catch untranslatable phrases in the source, cultural register mismatches, or UI truncation from longer translated strings.',
    whereAIIntroduced: 'Three-stage AI review: (1) Source copy risk scan — AI flagged English phrases likely to cause localization issues before translation was reviewed. (2) Translation quality review — AI checked for accuracy, naturalness, and cultural fit. (3) Truncation check.',
    workflowBefore: 'Source copy written → sent to vendor → translation received → ops spot-check → production',
    workflowAfter: 'Source copy → AI source risk scan → vendor translation → AI translation quality review → AI truncation check → native reviewer validates AI flags → fixes → production',
    humanRole: 'Native speaker reviewed all AI-flagged items. Designer checked actual UI rendering in the target language. Market manager gave final sign-off. AI pre-screening focused native review on specific issues rather than a full re-read.',
    whatImproved: '3 culturally inappropriate phrases caught before launch. 12 UI truncation issues identified and fixed. Estimated to have prevented 2 significant post-launch incidents. Native reviewer time reduced by focusing on AI flags.',
    whatFailed: 'AI could not assess formal vs informal address register. One AI flag was a false positive — a phrase that sounded unusual but was standard in that market.',
    whatNeededHumanJudgment: 'Register and formality decisions. Cultural idioms with no equivalent. Final sign-off on any copy going to market.',
    reusablePattern: 'Source risk scan → translation quality review → truncation check → native validator. Run this as standard process for every market update, not just new launches.',
    whatOthersCanLearn: 'The source risk scan (Step 1) is underused. Most teams only review the translation. Scanning the English source first prevents a whole class of errors before they even get to the vendor.',
  },
  {
    id: 'rejection-emails',
    title: 'Personalised partner rejection emails at scale',
    team: 'Operations',
    tools: ['Claude'],
    timeSaved: '~8 hrs/week',
    problem: 'Experience partners receiving rejection decisions were getting generic, one-line emails. This led to high re-inquiry rates, low trust, and a queue of follow-up questions for the ops team.',
    whyOldWorkflowBroken: 'Rejection emails were templated. The same message regardless of the rejection reason. Partners had no actionable information about what to change. The ops team was spending time on follow-up questions that the email should have answered.',
    whereAIIntroduced: 'A structured prompt system: ops enters the specific rejection reason, the partner context, and any specific guidance. Claude drafts a personalised rejection email. Ops reviews and edits before sending.',
    workflowBefore: 'Decision made → generic template email sent → partner replies asking for details → ops responds manually: 30+ min per rejection with follow-ups',
    workflowAfter: 'Decision made → ops fills prompt inputs (2 min) → Claude draft → ops reviews and edits (5 min) → sent: 7 min per rejection, near-zero follow-ups',
    humanRole: 'Ops reviews every draft. All rejections are human-sent. The AI is drafting, not deciding. The decision and its rationale are fully owned by the ops team.',
    whatImproved: 'Re-inquiry rate dropped significantly. Partners received specific, actionable feedback. Ops handling time per rejection reduced substantially. Partner trust improved.',
    whatFailed: 'Initial drafts were occasionally over-apologetic. Required a prompt calibration pass to fix the tone. Some very complex rejections still required more time.',
    whatNeededHumanJudgment: 'The rejection decision itself. Any rejection with legal or compliance implications. Tone calibration for difficult long-term partner relationships.',
    reusablePattern: 'Structured input prompt (reason + context + guidance) → AI draft → human review and edit → send. Works for any high-volume, relationship-sensitive communication that requires personalisation but follows a consistent structure.',
    whatOthersCanLearn: 'The key is structured input. Vague inputs produce generic drafts. The quality of the AI output is directly proportional to the specificity of the rejection reason you provide.',
  },
  {
    id: 'dex-studio-scripts',
    title: 'Tour story and script generation in Dex Studio',
    team: 'Production · Ops',
    tools: ['Claude'],
    timeSaved: '~2 hrs per tour',
    problem: 'Production team creating tour scripts manually for every new experience listing. Each script required research, structuring, and writing from scratch. Quality was inconsistent. High-volume periods created a bottleneck.',
    whyOldWorkflowBroken: 'Each script was a blank-slate task. Writers had no structured starting point. Quality depended heavily on individual writer experience. Scripts for similar experience types were not reusing effective patterns.',
    whereAIIntroduced: 'A prompt system built with Headout-specific tour context: experience type, location, key features, target audience. Claude generates a structured first draft in the standard Dex Studio script format. Writer reviews, rewrites, and approves.',
    workflowBefore: 'Research experience → structure outline → write draft → review → revise → approve: 3 hours per tour',
    workflowAfter: 'Input experience details into prompt → Claude draft → writer edits and adds specifics → review → approve: 45–60 minutes per tour',
    humanRole: 'Writer reviews every draft for accuracy, tone, and experience-specific details AI cannot know. All factual claims, pricing, and logistics verified by the writer. Production team owns the final script.',
    whatImproved: 'Script production time reduced by ~60%. Quality more consistent across writers. New writers onboard faster with a first-draft starting point.',
    whatFailed: 'AI occasionally generated plausible-but-inaccurate details about specific experiences. Writers must verify every factual claim. Generic tone in first drafts required significant editing for high-priority listings.',
    whatNeededHumanJudgment: 'All factual accuracy checks. Experience-specific details and local knowledge. The final voice and tone of the published script.',
    reusablePattern: 'Structured prompt with experience context → draft in standard format → writer edits and verifies → review → approve. The key is the structured prompt — it constrains AI output to the format the team needs.',
    whatOthersCanLearn: 'The value is in the structural starting point, not the content. Writers spend their time improving a solid structure rather than building from zero. This is the right use of AI for content: draft, not final output.',
  },
]

export default function CaseStudiesPage() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="px-5 sm:px-8 py-8 max-w-5xl mx-auto">
      <PageHeader
        title="Case Studies"
        description="What actually happened when Headout teams used AI — what worked, what failed, what needed human judgment, and what other teams can reuse."
        badge="Evidence"
      />

      <div
        className="mb-8 p-4 rounded-xl text-sm"
        style={{ background: 'rgba(83,58,253,0.05)', border: '1px solid rgba(83,58,253,0.15)' }}
      >
        <strong style={{ color: '#273951' }}>These are real patterns from Headout teams.</strong>
        <span style={{ color: '#64748d' }}> The patterns, time savings, failure modes, and reusable lessons reflect what AI-assisted workflows actually produce in practice.</span>
      </div>

      <div className="space-y-3">
        {caseStudies.map((cs) => {
          const isOpen = openId === cs.id
          return (
            <div
              key={cs.id}
              className="rounded-xl overflow-hidden transition-all duration-150"
              style={{
                background: '#ffffff',
                border: `1px solid ${isOpen ? 'rgba(83,58,253,0.25)' : '#e3e8ee'}`,
                borderRadius: '12px',
                boxShadow: 'rgba(0,55,112,0.08) 0 1px 3px',
              }}
            >
              <button
                onClick={() => setOpenId(isOpen ? null : cs.id)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <div className="flex-1">
                  <div className="text-sm font-semibold mb-1" style={{ color: '#0d253d' }}>{cs.title}</div>
                  <div className="flex flex-wrap gap-3 text-xs" style={{ color: '#64748d' }}>
                    <span>{cs.team}</span>
                    <span>·</span>
                    <span>{cs.tools.join(', ')}</span>
                    <span>·</span>
                    <span style={{ color: '#16a34a' }}>{cs.timeSaved}</span>
                  </div>
                </div>
                <ChevronDown
                  size={16}
                  className="shrink-0 ml-4 transition-transform duration-200"
                  style={{ color: '#64748d', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>

              {isOpen && (
                <div style={{ borderTop: '1px solid #e3e8ee', background: '#f6f9fc' }}>
                  <div className="px-5 pt-5 pb-6 space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#64748d' }}>Problem</div>
                        <p className="text-sm leading-relaxed" style={{ color: '#273951' }}>{cs.problem}</p>
                      </div>
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#64748d' }}>Why the old workflow was broken</div>
                        <p className="text-sm leading-relaxed" style={{ color: '#273951' }}>{cs.whyOldWorkflowBroken}</p>
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#533afd' }}>Where AI was introduced</div>
                      <p className="text-sm leading-relaxed" style={{ color: '#273951' }}>{cs.whereAIIntroduced}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg" style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.12)' }}>
                        <div className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#dc2626' }}>Workflow before AI</div>
                        <p className="text-xs leading-relaxed" style={{ color: '#273951' }}>{cs.workflowBefore}</p>
                      </div>
                      <div className="p-3 rounded-lg" style={{ background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.12)' }}>
                        <div className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#16a34a' }}>Workflow after AI</div>
                        <p className="text-xs leading-relaxed" style={{ color: '#273951' }}>{cs.workflowAfter}</p>
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#64748d' }}>Human role</div>
                      <p className="text-sm leading-relaxed" style={{ color: '#273951' }}>{cs.humanRole}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-3 rounded-lg" style={{ background: '#ffffff', border: '1px solid #e3e8ee' }}>
                        <div className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#16a34a' }}>What improved</div>
                        <p className="text-xs leading-relaxed" style={{ color: '#273951' }}>{cs.whatImproved}</p>
                      </div>
                      <div className="p-3 rounded-lg" style={{ background: '#ffffff', border: '1px solid #e3e8ee' }}>
                        <div className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#dc2626' }}>What failed</div>
                        <p className="text-xs leading-relaxed" style={{ color: '#273951' }}>{cs.whatFailed}</p>
                      </div>
                      <div className="p-3 rounded-lg" style={{ background: '#ffffff', border: '1px solid #e3e8ee' }}>
                        <div className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#b45309' }}>Still needed human judgment</div>
                        <p className="text-xs leading-relaxed" style={{ color: '#273951' }}>{cs.whatNeededHumanJudgment}</p>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg" style={{ background: 'rgba(83,58,253,0.04)', border: '1px solid rgba(83,58,253,0.12)' }}>
                      <div className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: '#533afd' }}>Reusable pattern</div>
                      <p className="text-sm" style={{ color: '#273951' }}>{cs.reusablePattern}</p>
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#64748d' }}>What other teams can learn</div>
                      <p className="text-sm leading-relaxed" style={{ color: '#273951' }}>{cs.whatOthersCanLearn}</p>
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
