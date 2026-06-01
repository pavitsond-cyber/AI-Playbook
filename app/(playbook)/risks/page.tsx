import PageHeader from '@/components/playbook/PageHeader'

const workflowRisks = [
  {
    workflow: 'Research synthesis',
    riskLevel: 'High',
    mainRisk: 'False pattern detection',
    whyItHappens: 'AI identifies themes based on surface-level language similarity, not semantic depth. Participants using the same word for different things get grouped. Participants using different words for the same thing get split. Frequency counts can be wrong if transcript labelling is inconsistent.',
    controls: [
      'Quote-level traceability: every insight links to a verbatim source quote with participant ID',
      'Frequency validation: AI counts are directional — spot-check at least 20% manually',
      'Contradiction prompt: explicitly ask AI to find where participants disagreed',
      'Researcher review: themes must be validated by someone who read the transcripts',
    ],
    humanReview: 'Research lead must validate all themes. Contradictions require researcher investigation — AI surfaces them, humans resolve them.',
    worstCase: 'Product direction set by a false pattern. Months of design work solving the wrong problem.',
  },
  {
    workflow: 'UX copy and product writing',
    riskLevel: 'Medium',
    mainRisk: 'Generic, off-brand, or contextually wrong copy',
    whyItHappens: 'AI copy defaults to generic consumer product patterns. It does not know Headout\'s specific voice, the product\'s emotional context, or the precise moment a user is in when they read this copy. Error messages written without understanding the specific failure can be misleading or tone-deaf.',
    controls: [
      'Brand voice checklist applied to every AI copy pass',
      'Product and journey context always included in the prompt',
      'Writer review and edit required before any copy is used',
      'Sensitive copy (rejections, errors, refunds) must be written or substantially rewritten by a human',
    ],
    humanReview: 'UX writer or content lead reviews all AI-generated copy. No AI copy ships without a human read. Sensitive flows require full human authorship.',
    worstCase: 'Off-brand copy in a high-stakes moment undermines user trust. Incorrect error message misleads users into wrong actions.',
  },
  {
    workflow: 'Product documentation (PRDs, specs)',
    riskLevel: 'Medium',
    mainRisk: 'Missing edge cases and unvalidated assumptions',
    whyItHappens: 'AI PRD generation produces structurally complete but contextually shallow documents. It does not know the technical constraints, the historical decisions, or the stakeholder dynamics. Edge cases it cannot infer from the description will be missing.',
    controls: [
      'Structured assumption extraction: explicitly ask AI to list all assumptions before treating any PRD as complete',
      'Edge case prompt: separate prompt specifically for edge cases by user flow',
      'Dependency audit: ask AI to list all implied dependencies',
      'PM/design/engineering review: required before any PRD goes to engineering',
    ],
    humanReview: 'PM owns the PRD. AI is a challenger and first-drafter, not the author. Engineering review required before scoping.',
    worstCase: 'PRD with unvalidated assumptions goes to engineering. Mid-sprint discovery requires rescoping. High cost, missed deadlines.',
  },
  {
    workflow: 'AI image generation',
    riskLevel: 'High',
    mainRisk: 'IP risk, visual inconsistency, and brand mismatch',
    whyItHappens: 'Midjourney and similar tools are trained on internet data including copyrighted work. Prompts that reference specific styles, artists, or visual identities can produce outputs that resemble protected work. Brand consistency is not built into the model — it must be enforced through art direction and review.',
    controls: [
      'Prompts must not reference specific artists, existing brands, or recognisable IP',
      'All images for commercial use reviewed by brand/art direction before use',
      'Reference imagery ≠ production-ready asset — this distinction must be enforced',
      'Reverse image search on any image before commercial use if the visual is distinctive',
    ],
    humanReview: 'Creative director or art director reviews all AI images before commercial use. Brand QA pass on any image used in marketing or product.',
    worstCase: 'AI image used in a campaign resembles a copyrighted work or identifiable real person. Legal exposure and brand damage.',
  },
  {
    workflow: 'Localization',
    riskLevel: 'High',
    mainRisk: 'Cultural mismatch, truncation, and register errors',
    whyItHappens: 'AI translation quality has improved but not uniformly across languages or markets. Register (formal vs informal), idioms, and culturally specific phrasing often fail. UI constraints (character limits) are not automatically known to the model.',
    controls: [
      'Source copy risk scan before translation — catch English-specific phrases before they go to the vendor',
      'AI translation quality review as a pre-filter before native review',
      'Character limit check with precise UI constraints',
      'Native speaker or local market manager validates all AI-flagged items before launch',
    ],
    humanReview: 'Native speaker validation required for all flagged items. Market manager final sign-off before any translated copy ships.',
    worstCase: 'Culturally inappropriate phrase ships in a high-traffic market. Reputational damage, emergency fix required.',
  },
  {
    workflow: 'Code generation',
    riskLevel: 'High',
    mainRisk: 'Plausible-looking code with hidden bugs',
    whyItHappens: 'AI code generation tools produce code that looks correct and often runs correctly in the happy path. Edge cases, concurrency issues, security vulnerabilities, and non-obvious bugs are frequently missed. The code is optimised to look right, not to be right.',
    controls: [
      'Engineering code review required for all AI-generated code going to production',
      'Tests must be written and passing before any AI-generated code ships',
      'Staging verification before production deploy',
      'Security-sensitive code (auth, payments, data access) must be written by a qualified engineer — AI assistance in these areas requires extra review',
    ],
    humanReview: 'Senior engineer review for any production code. No AI-generated code ships without a human reading it.',
    worstCase: 'AI-generated code contains a security vulnerability or data handling bug. User data or system integrity at risk.',
  },
  {
    workflow: 'Agents and internal tools',
    riskLevel: 'High',
    mainRisk: 'Unauthorised actions, wrong automation, or scope creep',
    whyItHappens: 'AI agents can take actions, not just produce text. If permissions are not carefully scoped, agents can act beyond their intended scope. Ambiguous instructions can be interpreted too broadly. Automation errors can compound silently before being detected.',
    controls: [
      'Least-privilege permissions: agents should only have access to what they absolutely need',
      'Audit logs: all agent actions must be logged and reviewable',
      'Sandboxing: test all agent workflows in a non-production environment before deploying',
      'Human approval gates: high-consequence actions should require explicit human confirmation',
      'Kill switch: every agent workflow must have a clear way to stop it immediately',
    ],
    humanReview: 'Engineering and product review before any agent workflow goes live. Regular audit log review after deployment.',
    worstCase: 'Agent acts outside its intended scope — sends unintended communications, modifies data, or triggers downstream processes that are hard to reverse.',
  },
  {
    workflow: 'Customer-facing AI features',
    riskLevel: 'Very high',
    mainRisk: 'Incorrect, harmful, or misleading output to real users',
    whyItHappens: 'AI models are not deterministic. Output quality varies by input. Edge case inputs can produce outputs that are confidently wrong. Without confidence thresholds and fallback states, incorrect AI output is presented as fact.',
    controls: [
      'Confidence thresholds: only surface AI output when confidence is above a defined threshold',
      'Fallback states: when AI cannot produce a reliable answer, show a designed fallback — not an AI guess',
      'Human escalation path: always provide a way for the user to reach a human',
      'Logging and monitoring: all customer-facing AI outputs must be logged for review and improvement',
      'Graceful degradation: the product must work correctly when the AI component fails',
    ],
    humanReview: 'Product and engineering review required before any AI component is customer-facing. QA against edge case inputs. Ongoing monitoring after launch.',
    worstCase: 'AI provides incorrect booking information, pricing, or availability to a customer. Trust damage, customer service escalation, potential legal exposure.',
  },
]

const riskLevelStyles = {
  'High': { bg: 'rgba(239,68,68,0.1)', text: '#dc2626', border: 'rgba(239,68,68,0.2)' },
  'Medium': { bg: 'rgba(234,136,12,0.1)', text: '#b45309', border: 'rgba(234,136,12,0.2)' },
  'Very high': { bg: 'rgba(239,68,68,0.18)', text: '#b91c1c', border: 'rgba(239,68,68,0.35)' },
}

const qualityBars = [
  {
    type: 'Research output',
    criteria: [
      'Every insight has a verbatim source quote with participant ID',
      'Frequency is a real count, not an estimate',
      'Observation is separated from interpretation',
      'Contradictions are surfaced and named, not averaged away',
      'Confidence level is stated for each insight',
    ],
  },
  {
    type: 'Design output',
    criteria: [
      'Solves the actual user problem — not just the stated feature request',
      'Handles at least 5 edge cases',
      'Matches existing brand and product patterns',
      'Does not create generic UI that ignores the design system',
      'Can be realistically implemented in the next sprint',
    ],
  },
  {
    type: 'Copy output',
    criteria: [
      'Specific — no generic filler or placeholder language',
      'Context-aware — written for this specific state and user moment',
      'On-brand — matches Headout voice: warm, direct, clear',
      'Useful — tells the user what to do next, not just what happened',
      'Not over-polished to the point of being vague',
    ],
  },
  {
    type: 'Image / video output',
    criteria: [
      'Visually coherent — no distorted details, faces, or text',
      'Brand-safe — does not resemble protected IP or identifiable real people',
      'Reference-safe — not derived from a recognisable copyrighted style',
      'Appropriate for the intended format and market',
      'Art-directed — someone with visual judgment has reviewed it',
    ],
  },
  {
    type: 'Code / prototype output',
    criteria: [
      'Works as expected across happy path and key edge cases',
      'Handles all defined states (loading, error, empty, success)',
      'Readable by an engineer who did not write it',
      'Reviewed by an engineer before production use',
      'Does not introduce security risks or data handling issues',
    ],
  },
]

export default function RisksPage() {
  return (
    <div className="px-5 sm:px-8 py-8 max-w-5xl mx-auto">
      <PageHeader
        title="Risk & Governance"
        description="AI risks by workflow type — not generic warnings, but specific failure modes, controls, and human review requirements for each type of AI work."
        badge="Governance"
      />

      {/* Workflow risks */}
      <div className="space-y-4 mb-14">
        {workflowRisks.map((item) => {
          const style = riskLevelStyles[item.riskLevel as keyof typeof riskLevelStyles] || riskLevelStyles['Medium']
          return (
            <div
              key={item.workflow}
              className="p-5 rounded-xl"
              style={{
                background: '#ffffff',
                border: '1px solid #e3e8ee',
                borderRadius: '12px',
                boxShadow: 'rgba(0,55,112,0.06) 0 1px 3px',
              }}
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold" style={{ color: '#0d253d' }}>{item.workflow}</h3>
                    <span
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                      style={{ background: style.bg, color: style.text, border: `1px solid ${style.border}` }}
                    >
                      {item.riskLevel} risk
                    </span>
                  </div>
                  <p className="text-sm font-medium" style={{ color: '#273951' }}>
                    Main risk: {item.mainRisk}
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed mb-4" style={{ color: '#64748d' }}>{item.whyItHappens}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-3">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: '#16a34a' }}>Controls</div>
                  <ul className="space-y-1.5">
                    {item.controls.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs" style={{ color: '#273951' }}>
                        <span className="shrink-0 mt-1.5 size-1 rounded-full" style={{ background: '#16a34a' }} />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: '#b45309' }}>Human review required</div>
                  <p className="text-xs leading-relaxed mb-3" style={{ color: '#273951' }}>{item.humanReview}</p>
                  <div
                    className="p-2.5 rounded-lg text-xs"
                    style={{ background: style.bg, border: `1px solid ${style.border}` }}
                  >
                    <span className="font-semibold" style={{ color: style.text }}>Worst case: </span>
                    <span style={{ color: '#273951' }}>{item.worstCase}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quality bars */}
      <div>
        <h2
          className="text-xs font-semibold uppercase tracking-wider mb-2"
          style={{ color: '#64748d' }}
        >
          Output quality bars
        </h2>
        <p className="text-sm mb-6" style={{ color: '#64748d' }}>
          These are the minimum criteria for AI-assisted output before it is used. If the output does not meet these bars, it needs another pass — or a human rewrite.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {qualityBars.map((qb) => (
            <div
              key={qb.type}
              className="p-4 rounded-xl"
              style={{
                background: '#ffffff',
                border: '1px solid #e3e8ee',
                borderRadius: '12px',
                boxShadow: 'rgba(0,55,112,0.06) 0 1px 3px',
              }}
            >
              <h3 className="text-sm font-semibold mb-3" style={{ color: '#0d253d' }}>{qb.type}</h3>
              <ul className="space-y-2">
                {qb.criteria.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs" style={{ color: '#273951' }}>
                    <span className="shrink-0 mt-1.5 size-1 rounded-full" style={{ background: '#533afd' }} />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
