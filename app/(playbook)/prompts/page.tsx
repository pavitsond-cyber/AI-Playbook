'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import PageHeader from '@/components/playbook/PageHeader'
import CopyButton from '@/components/playbook/CopyButton'
import BlobLayer from '@/components/ui/BlobLayer'

const systems = [
  {
    id: 'prd-pressure-test',
    title: 'PRD Pressure-Testing System',
    team: 'Product',
    useCase: 'Challenge a draft PRD for assumptions, missing edge cases, and weak success metrics before engineering handoff.',
    input: 'Draft PRD (any format)',
    chain: [
      {
        label: 'Step 1 — Assumption extraction',
        prompt: `You are reviewing a PRD before engineering handoff. Your job is to pressure-test it, not polish it.

Read this PRD carefully. Extract every assumption it makes — explicit and implicit. For each assumption:
- State the assumption clearly
- Rate it: (A) Validated with user research or data, (B) Team consensus only, (C) Unstated but implied
- Explain the risk if the assumption is wrong

Format as a table: Assumption | Validation Status | Risk if Wrong

[PASTE PRD HERE]`,
      },
      {
        label: 'Step 2 — Edge case mapping',
        prompt: `Walk through every user flow described in this PRD. For each flow, identify edge cases that are not addressed:
- Error states (what happens when something fails?)
- Empty states (what does the user see when there is no content?)
- Concurrent actions (what if two things happen at once?)
- Boundary conditions (min/max values, time limits, rate limits)
- Permission states (what if the user does not have access?)
- Unexpected inputs (what if the user does something unexpected?)

List each missing edge case with: Flow → Edge Case → Why it matters → Severity (P0/P1/P2)

[PASTE PRD HERE]`,
      },
      {
        label: 'Step 3 — Success metric challenge',
        prompt: `Review the success metrics in this PRD. For each metric, answer:
1. Is it measurable right now with existing instrumentation?
2. Is it attributable to this feature specifically, or could other factors move it?
3. Does it measure what actually matters — user value — or just what is easy to track?
4. Is the target number justified, or picked arbitrarily?

For any metric that fails these tests, suggest a sharper alternative.

[PASTE PRD HERE]`,
      },
      {
        label: 'Step 4 — Dependency audit',
        prompt: `What dependencies are implied by this PRD but not explicitly listed? Include:
- Technical dependencies (APIs, services, infrastructure)
- Design dependencies (components, patterns, assets)
- Data dependencies (analytics events, data models, migrations)
- Cross-team dependencies (other squads, external vendors)
- Timeline dependencies (things that must happen before this can launch)

For each dependency: name it, identify which team or system owns it, and flag whether it is on the critical path.

[PASTE PRD HERE]`,
      },
    ],
    outputFormat: 'Annotated PRD with: assumption table, edge case log, metric review, dependency list',
    qualityBar: 'Every assumption is either validated or explicitly listed as an accepted risk. Every success metric is measurable and attributable.',
    failureModes: [
      'AI raises challenges that are irrelevant to your specific context — filter aggressively',
      'Edge cases listed may be out of scope — not everything it flags needs solving in this release',
      'AI cannot challenge assumptions it does not know are assumptions',
    ],
    humanReview: [
      'PM decides which edge cases are in-scope for this release vs deferred',
      'Engineering lead validates the dependency list',
      'PM owns the final PRD — AI challenges it, does not approve it',
    ],
    whenToUse: 'Before any significant engineering handoff. Especially for high-edge-case-density features like checkout, onboarding, and permission flows.',
  },
  {
    id: 'research-synthesis',
    title: 'UX Research Synthesis System',
    team: 'Research · Product',
    useCase: 'Extract themes, evidence, contradictions, and opportunity signals from interview transcripts or survey data.',
    input: '5–15 labelled interview transcripts or survey verbatims (P1, P2... format preferred)',
    chain: [
      {
        label: 'Step 1 — Pain extraction with frequency',
        prompt: `Read these research transcripts carefully. Your job is synthesis with evidence — not storytelling.

Extract every pain statement as a near-direct quote. Then:
- Group identical or very similar pains together
- Count how many distinct participants mentioned each pain (frequency)
- Rate severity: High (blocks task), Medium (creates friction), Low (annoyance)

Format: Pain Statement | Representative Quote | Frequency (n=X) | Severity | Participant IDs

Do not interpret yet. Only extract and group.

[PASTE TRANSCRIPTS HERE]`,
      },
      {
        label: 'Step 2 — Theme clustering by JTBD',
        prompt: `Group the pain statements from the previous step by the underlying job the user is trying to do — not by product area or feature.

For each cluster:
- Name the job to be done (verb-noun format: "book a ticket without uncertainty")
- List the pains within it
- Provide 2 representative quotes
- Note whether this job is currently met, partially met, or unmet by the product

[PASTE PAIN TABLE FROM STEP 1]`,
      },
      {
        label: 'Step 3 — Contradiction surfacing',
        prompt: `Review these transcripts for contradictions — places where participants had meaningfully different experiences, needs, or opinions.

For each contradiction:
- State what the contradiction is
- Quote both sides (with participant IDs)
- Note what might explain the difference (user segment, context, experience level)
- Flag whether this contradiction needs resolving before a design decision can be made

Do not average the contradiction away. Contradictions are often the most valuable signal.

[PASTE TRANSCRIPTS HERE]`,
      },
      {
        label: 'Step 4 — Opportunity mapping',
        prompt: `Based on the themes and pains identified, write a product opportunity statement for each cluster:

Format: "[User type] needs a way to [job to be done] without [main pain]. Current evidence: [frequency]. Team's ability to address: [High/Medium/Low and why]."

Then rank the opportunities by: (frequency × severity) ÷ implementation complexity. Explain your scoring.

[PASTE THEME CLUSTERS FROM STEP 2]`,
      },
    ],
    outputFormat: 'Pain table with evidence → theme clusters → contradiction log → ranked opportunity map',
    qualityBar: 'Every insight has a source quote with participant ID and frequency count. No insight exists without evidence. Contradictions are named, not smoothed over.',
    failureModes: [
      'AI over-clusters similar themes, losing the nuance between distinct user needs',
      'Frequency counts can be wrong if transcript labels are inconsistent',
      'Opportunity scoring uses assumed implementation complexity — always challenge this',
    ],
    humanReview: [
      'Research lead validates cluster labels against their own reading of the transcripts',
      'PM challenges opportunity scoring with product context AI does not have',
      'Contradictions require investigative follow-up — AI identifies them, humans resolve them',
    ],
    whenToUse: 'After any usability study or discovery round. Especially useful before a product planning cycle to generate a prioritised opportunity list.',
  },
  {
    id: 'design-qa',
    title: 'Design QA Review System',
    team: 'Product Design · UX Writing',
    useCase: 'Systematically review all copy, states, and consistency in a design before engineering handoff.',
    input: 'Exported screen copy inventory (screen name, state, copy text, character limit if known) + feature description',
    chain: [
      {
        label: 'Step 1 — State completeness check',
        prompt: `You are reviewing a design for completeness before engineering handoff.

For each screen listed, check whether the following states are covered:
- Default (the standard view)
- Loading (while data is fetching)
- Empty (no content available)
- Error (something went wrong — network, input, or system)
- Success (a task completed)
- Edge case states specific to this feature

List every missing state. For each: screen name → missing state → why it matters → severity (P0 = blocks launch / P1 = important / P2 = nice to have).

Feature description: [DESCRIBE FEATURE]

Screen copy inventory:
[PASTE COPY INVENTORY]`,
      },
      {
        label: 'Step 2 — Copy consistency audit',
        prompt: `Review this copy set for internal consistency:

1. Terminology consistency — is the same feature, action, or object named the same way throughout?
2. Tone consistency — does the register stay consistent across states? (Not formal in some, casual in others)
3. Tense and voice — consistently active and present-tense, or does it drift?
4. CTA patterns — are CTAs phrased consistently? ("Save" vs "Save changes" vs "Update" for the same action)

List every inconsistency found. Format: Type → Inconsistency → Screens affected → Suggested fix.

[PASTE COPY INVENTORY]`,
      },
      {
        label: 'Step 3 — Brand voice check',
        prompt: `Our copy voice: warm, direct, and specific. Avoid generic filler, passive voice, over-apology, and vague language.

Review this copy against that standard. Flag:
1. Generic or placeholder-feeling copy ("Something went wrong. Please try again.")
2. Passive constructions ("Your booking has been cancelled by the system")
3. Over-apologetic error messages ("We're so sorry, but unfortunately...")
4. Vague CTAs ("Continue", "Okay", "Submit")
5. Unnecessarily long copy where a shorter version would be clearer

For each flag: quote the copy → explain why it fails → suggest a sharper alternative.

[PASTE COPY INVENTORY]`,
      },
    ],
    outputFormat: 'Missing states list with severity → consistency issues log → brand voice flags with suggested rewrites',
    qualityBar: 'Every flag is actioned: either fixed, or explicitly marked "accepted" with a reason.',
    failureModes: [
      'AI flags intentional creative choices as inconsistencies — review every flag, do not bulk-accept',
      'Character limit violations may be based on estimates if limits are not specified',
      'Brand voice flags may be over-conservative on bold copy choices',
    ],
    humanReview: [
      'Designer validates every flag — AI helps focus attention, not replace judgment',
      'Writer reviews all brand voice flags',
      'PM decides which missing states are in scope for this release',
    ],
    whenToUse: 'Before any high-traffic flow engineering handoff. Especially effective on flows with high copy density.',
  },
  {
    id: 'landing-page-teardown',
    title: 'Landing Page Teardown System',
    team: 'Product · Marketing · Brand',
    useCase: 'Audit a landing page for structural weaknesses, copy quality, and competitive positioning gaps.',
    input: 'Page copy (pasted) or URL + page goal (conversion/trust/information) + target audience description',
    chain: [
      {
        label: 'Step 1 — Value proposition clarity check',
        prompt: `You are auditing a landing page. Start with the most critical question: does the hero communicate what this product does and why it matters within 6 seconds?

Review the hero section (headline, subheadline, and first visual area). Evaluate:
1. Is the core value proposition immediately clear — what the user gets, not what we built?
2. Who is the intended user — is it obvious from the copy?
3. What action is the user meant to take — is the next step clear and compelling?
4. What objections does a first-time visitor likely have — does the hero address any of them?

For each weakness: quote the element → explain the problem → suggest a specific fix.

Page goal: [DESCRIBE GOAL]
Target audience: [DESCRIBE AUDIENCE]

[PASTE PAGE COPY]`,
      },
      {
        label: 'Step 2 — Full page structural audit',
        prompt: `Audit the full page structure. For each section of the page:
1. Does this section move the user closer to the goal, or is it just filling space?
2. Is the hierarchy of information logical — does earlier content make later content land better?
3. Where is trust established? Where is it missing?
4. Where might a user drop off and why?

Give me a section-by-section verdict: Keep as-is / Improve / Remove. For each "Improve" or "Remove", explain why.

[PASTE PAGE COPY]`,
      },
      {
        label: 'Step 3 — Competitive positioning gap',
        prompt: `Here are 2–3 competitor pages for comparison. Compare this page's positioning:

1. What is our page saying that competitors are not? (Potential differentiation)
2. What are competitors saying that we are not? (Potential gap)
3. Where is our copy weaker — more vague, less specific, or less credible?
4. What proof points, trust signals, or specifics are competitors using that we are missing?

Be direct. Do not soften findings.

Our page: [PASTE OUR COPY]
Competitor 1: [PASTE OR DESCRIBE]
Competitor 2: [PASTE OR DESCRIBE]`,
      },
    ],
    outputFormat: 'Hero assessment → section-by-section verdict → competitive gap analysis → prioritised fix list',
    qualityBar: 'Every finding ties to the page goal. "It sounds better" is not a reason. Every recommendation has a specific fix.',
    failureModes: [
      'AI audit uses heuristics, not your actual user behaviour data — always cross-reference with analytics',
      'Competitive findings depend on the quality of competitor copy you provide',
    ],
    humanReview: [
      'Validate structural findings with real scroll and drop-off data if available',
      'Brand and copy team reviews flagged copy — bold choices may be flagged incorrectly',
      'PM or marketing lead decides what to test vs implement directly',
    ],
    whenToUse: 'Before any major campaign where a landing page is the primary conversion surface. Also useful for quarterly audits of high-traffic pages.',
  },
  {
    id: 'localization-qa',
    title: 'Localization QA System',
    team: 'UX Writing · Content · Ops',
    useCase: 'Catch cultural mismatches, truncation risks, and translation quality issues before market launch.',
    input: 'Source English copy + translated copy + target language/market + UI screenshots (if available)',
    chain: [
      {
        label: 'Step 1 — Source copy risk scan',
        prompt: `Before translation is reviewed, scan the English source copy for localization risk.

Flag any phrases that are:
1. Idiomatic or English-specific (cannot be translated literally)
2. Culturally specific to an English-speaking market
3. Wordplay, puns, or rhymes that will break in translation
4. Informal register that may not carry over in [TARGET LANGUAGE]
5. Length-sensitive — likely to become significantly longer in translation
6. Legally or culturally sensitive in [TARGET MARKET]

For each flag: quote the phrase → explain the risk → suggest a safer alternative.

Target language: [LANGUAGE]
Target market: [MARKET]

[PASTE SOURCE COPY]`,
      },
      {
        label: 'Step 2 — Translation quality review',
        prompt: `Review this translated copy for [TARGET LANGUAGE/MARKET].

Check:
1. Accuracy — does it convey the same meaning as the source?
2. Naturalness — does it sound like how a native speaker would write it for a consumer product?
3. Register — is the formality level appropriate for this market?
4. Cultural fit — are there phrases that may be confusing, off, or inappropriate in this market?
5. Length — are any translated strings significantly longer than the source (truncation risk)?

Format: String → Issue Type → Severity → Suggested fix (or "Needs native review")

Source: [PASTE SOURCE]
Translation: [PASTE TRANSLATION]`,
      },
      {
        label: 'Step 3 — UI truncation check',
        prompt: `Given these character limits, identify which translated strings are at risk of truncation.

For any string at or over the limit:
- Flag it with the character count vs limit
- Suggest a shortened alternative that preserves core meaning
- Note if the meaning is significantly impacted by the shortening

[PASTE STRINGS WITH CHARACTER LIMITS AND TRANSLATIONS]`,
      },
    ],
    outputFormat: 'Source risk report → translation quality flags → truncation risk list → native review checklist',
    qualityBar: 'Every flagged item is reviewed by a native speaker or local market manager before launch.',
    failureModes: [
      'AI cannot assess tonal nuance fully — formal/informal address requires native judgment',
      'Cultural sensitivity flags may be over-cautious or miss specific market context',
      'Character limit accuracy depends on precise limits being provided',
    ],
    humanReview: [
      'Native speaker or local market manager reviews all flagged items',
      'Designer checks actual UI in the target language for visual truncation',
      'Final approval from market manager',
    ],
    whenToUse: 'Before every new market launch and whenever high-traffic pages are updated for international markets.',
  },
  {
    id: 'brand-campaign-territory',
    title: 'Brand Campaign Territory System',
    team: 'Brand Design · Marketing',
    useCase: 'Generate and evaluate multiple visual and creative territories from a campaign brief before committing to one direction.',
    input: 'Campaign brief: objective, audience, key message, markets, formats, brand constraints, reference examples',
    chain: [
      {
        label: 'Step 1 — Territory generation',
        prompt: `You are a creative strategist helping explore campaign territory options.

Based on this brief, generate 6 distinct visual and creative territory concepts. Make them meaningfully different from each other — not variations on the same idea.

For each territory:
- Territory name (2–3 words, evocative)
- Creative idea in one sentence
- Emotional tone (what the viewer should feel)
- Visual language direction (3–4 descriptive words: colour feel, texture, spatial mood)
- Copy direction (what kind of language, structure, voice)
- Who this territory will resonate with most
- Potential risk or weakness

Brief:
[PASTE BRIEF]`,
      },
      {
        label: 'Step 2 — Midjourney prompt generation',
        prompt: `For each of the 6 territories above, write 3 Midjourney image generation prompts that would capture the visual feel of that territory.

Requirements:
- Each prompt should produce a distinct image, not variations
- Include: subject, mood, lighting, colour direction, composition style, photographic or illustrative style
- Add technical parameters: --ar 16:9 --q 2
- Do NOT reference specific artists, brands, or copyrighted styles

Format: Territory Name → Prompt 1 → Prompt 2 → Prompt 3`,
      },
      {
        label: 'Step 3 — Territory scoring against brief',
        prompt: `Score these 6 territories against the campaign brief.

For each territory, rate 1–5 on:
1. Brief alignment — does it deliver the core message?
2. Audience fit — will it resonate with the target audience?
3. Differentiation — does it stand out from the brand's typical visual language?
4. Scalability — can it work across all required formats and markets?
5. Brand safety — does it carry meaningful IP or cultural risk?

Produce a ranked list with your top 2 recommendations and a one-line rationale for each.

Brief: [PASTE BRIEF]
Territories: [PASTE TERRITORIES FROM STEP 1]`,
      },
    ],
    outputFormat: '6 creative territories → Midjourney prompts per territory → scored shortlist with recommendation',
    qualityBar: 'Territories must be genuinely distinct from each other. Visual prompts must produce different-feeling imagery. Scoring must be tied to brief criteria, not generic quality.',
    failureModes: [
      "AI may generate territories that are variations on the same 'safe' idea",
      'Scoring can bias toward brief alignment over creative differentiation',
      'Midjourney prompts may not produce the exact visual feel described without iteration',
    ],
    humanReview: [
      'Creative director selects the final territory — AI shortlist is a starting point',
      'Art direction of final assets is fully human',
      'Brand review before any territory goes to production',
    ],
    whenToUse: 'At the start of any campaign requiring multiple creative directions. When the brief has more than one viable direction and the team needs to explore before committing.',
  },
  {
    id: 'experiment-design',
    title: 'Experiment Design System',
    team: 'Product · Research',
    useCase: 'Design a rigorous A/B test or experiment with a clear hypothesis, metrics, and edge cases before running it.',
    input: 'The change being tested, why you believe it will improve a metric, current baseline data if available',
    chain: [
      {
        label: 'Step 1 — Hypothesis sharpening',
        prompt: `Sharpen this experiment hypothesis into a testable, falsifiable statement.

A good hypothesis format: "We believe that [change] will cause [measurable outcome] because [reasoning]. We will know this is true if [specific metric moves by X% in Y direction] within [timeframe]."

Current hypothesis: [PASTE YOUR HYPOTHESIS]

Evaluate the hypothesis:
1. Is it falsifiable — can a negative result clearly disprove it?
2. Is the metric specific and attributable to this change?
3. Is the reasoning mechanistic — does it explain HOW the change causes the outcome?
4. Is the timeframe long enough to reach statistical significance?

Rewrite the hypothesis to fix any weaknesses.`,
      },
      {
        label: 'Step 2 — Metric selection and guardrails',
        prompt: `For this experiment, help me define the full metric set:

1. Primary metric — the one that defines success or failure
2. Secondary metrics — directional signals to monitor
3. Guardrail metrics — metrics that should NOT move negatively (if they do, the experiment may need to be stopped)
4. Counter-metrics — things we would not want to trade off even for primary metric improvement

For each metric: what it is, how it is measured, what constitutes a meaningful change, and the risk of it moving in the wrong direction.

Experiment: [DESCRIBE WHAT YOU ARE TESTING]`,
      },
      {
        label: 'Step 3 — Experiment risk and edge cases',
        prompt: `Identify risks and edge cases in this experiment design:

1. Sample contamination — could users see both variants?
2. Novelty effect — could early positive results be driven by newness, not real value?
3. Network effects — could one variant affect users who are not in that variant?
4. Segmentation issues — are there user segments that should be excluded?
5. Instrumentation risk — are all metrics currently tracked correctly?
6. External factors — are there external events during the test window that could skew results?

For each risk: describe it, rate its likelihood (High/Medium/Low), and suggest a mitigation.

Experiment: [DESCRIBE EXPERIMENT]`,
      },
    ],
    outputFormat: 'Sharpened hypothesis → metric set with guardrails → risk and edge case log',
    qualityBar: 'Hypothesis is falsifiable and mechanistic. Primary metric is attributable. All guardrail metrics are defined before the test runs.',
    failureModes: [
      'AI sharpening may over-specify what is still an exploratory test',
      'Risk lists can be exhaustive but not all risks are equally likely — use judgment',
    ],
    humanReview: [
      'Data analyst validates instrumentation before experiment launches',
      'PM confirms the hypothesis aligns with team goals',
      'Research lead or stats-aware team member reviews sample size and significance requirements',
    ],
    whenToUse: 'Before any significant product experiment — especially for flows where errors are costly and results hard to reverse.',
  },
  {
    id: 'support-ticket-insights',
    title: 'Support Ticket Insight System',
    team: 'Product · Ops',
    useCase: 'Extract product opportunities, friction patterns, and churn signals from a batch of support tickets.',
    input: 'Exported ticket data: minimum 100 tickets with text and category. Monthly or quarterly batch.',
    chain: [
      {
        label: 'Step 1 — Classification',
        prompt: `Classify each of these support tickets into one of the following categories:
1. Broken experience (bug, error, failed action)
2. Missing feature (user expected something that does not exist)
3. Confusion (user did not understand how something works)
4. Policy or pricing complaint (not a product bug, but a policy frustration)
5. Churn signal (user expressing intent to stop using the product)
6. Other

Return: total count per category, and list of 5 representative tickets per category.

[PASTE TICKETS]`,
      },
      {
        label: 'Step 2 — Friction pattern extraction',
        prompt: `From the "broken experience", "missing feature", and "confusion" tickets, identify the top 10 recurring friction patterns.

For each pattern:
- Pattern name (describe the friction, not the feature)
- Frequency (how many tickets mention this pattern)
- 3 representative verbatim quotes
- Product area affected
- Whether this is likely a known issue or a new signal

[PASTE CLASSIFIED TICKETS FROM STEP 1]`,
      },
      {
        label: 'Step 3 — Opportunity and churn signal mapping',
        prompt: `Convert the top friction patterns into product opportunities. For each:

Opportunity statement: "[User type] is repeatedly blocked by [friction]. This generates [frequency] support contacts and suggests [product gap]. Opportunity: [one-line direction]."

Also flag the churn signals separately: for each churn-signal ticket, extract the explicit frustration and what would have to change to prevent it.

Score each opportunity: High / Medium / Low by (frequency × user impact) ÷ estimated fix complexity.

[PASTE PATTERNS FROM STEP 2]`,
      },
    ],
    outputFormat: 'Classification breakdown → friction patterns with frequency and quotes → ranked opportunity map → churn signal report',
    qualityBar: 'Every opportunity is backed by minimum 10 ticket quotes. Frequency is a real count. Churn signals are quoted verbatim.',
    failureModes: [
      'Loud complainers can skew frequency — high volume does not always mean high impact',
      'Classification may drift for ambiguous tickets — spot-check 10%',
      '"Other" category hides signal — review it manually',
    ],
    humanReview: [
      'Ops or product team validates classification on a random sample',
      'PM adds context AI cannot know: which patterns are already known? Already in the roadmap?',
      'Final prioritisation requires product judgment, not just frequency scoring',
    ],
    whenToUse: 'Run monthly or quarterly. Present the top opportunities at product review. Required input for any roadmap prioritisation cycle.',
  },
]

export default function PromptSystemsPage() {
  const [openId, setOpenId] = useState<string | null>(null)
  const [openStepId, setOpenStepId] = useState<string | null>(null)

  return (
    <div style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
      <BlobLayer />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          padding: 'clamp(64px,6vw,100px) clamp(20px,4vw,48px)',
          maxWidth: 960,
          margin: '0 auto',
        }}
      >
        <PageHeader
          title="Prompt Systems"
          description="Multi-step prompt chains for high-stakes work. Run them in sequence — each step feeds the next. Not single prompts."
         
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {systems.map((system) => {
            const isOpen = openId === system.id
            return (
              <div
                key={system.id}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: isOpen ? '1px solid rgba(155,63,255,0.25)' : '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 14,
                  overflow: 'hidden',
                  transition: 'border-color 0.2s',
                }}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : system.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    textAlign: 'left',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 17,
                        fontWeight: 700,
                        color: '#ffffff',
                        marginBottom: 4,
                      }}
                    >
                      {system.title}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 13,
                        color: 'rgba(255,255,255,0.35)',
                        display: 'flex',
                        flexWrap: 'wrap' as const,
                        gap: 6,
                      }}
                    >
                      <span>{system.team}</span>
                      <span>·</span>
                      <span>{system.chain.length} prompts in chain</span>
                    </div>
                  </div>
                  <ChevronDown
                    size={16}
                    style={{
                      flexShrink: 0,
                      marginLeft: 16,
                      color: isOpen ? '#C27FFF' : 'rgba(255,255,255,0.3)',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s, color 0.2s',
                    }}
                  />
                </button>

                {isOpen && (
                  <div
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      borderTop: '1px solid rgba(255,255,255,0.06)',
                      padding: '20px 20px 24px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 20,
                    }}
                  >
                    {/* Meta */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                      <div>
                        <div
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 11,
                            fontWeight: 500,
                            textTransform: 'uppercase' as const,
                            letterSpacing: '0.1em',
                            color: 'rgba(255,255,255,0.3)',
                            marginBottom: 4,
                          }}
                        >
                          Use case
                        </div>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, margin: 0 }}>{system.useCase}</p>
                      </div>
                      <div>
                        <div
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 11,
                            fontWeight: 500,
                            textTransform: 'uppercase' as const,
                            letterSpacing: '0.1em',
                            color: 'rgba(255,255,255,0.3)',
                            marginBottom: 4,
                          }}
                        >
                          Required input
                        </div>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, margin: 0 }}>{system.input}</p>
                      </div>
                    </div>

                    {/* Prompt chain */}
                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-body)',
                          color: '#C27FFF',
                          fontSize: 11,
                          fontWeight: 700,
                          textTransform: 'uppercase' as const,
                          letterSpacing: '0.1em',
                          marginBottom: 12,
                        }}
                      >
                        Prompt chain
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {system.chain.map((step, idx) => {
                          const stepKey = `${system.id}-${idx}`
                          const isStepOpen = openStepId === stepKey
                          return (
                            <div
                              key={idx}
                              style={{
                                border: '1px solid rgba(255,255,255,0.07)',
                                background: 'rgba(255,255,255,0.03)',
                                borderRadius: 10,
                                overflow: 'hidden',
                              }}
                            >
                              <button
                                onClick={() => setOpenStepId(isStepOpen ? null : stepKey)}
                                style={{
                                  padding: '10px 14px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  width: '100%',
                                  background: 'transparent',
                                  border: 'none',
                                  cursor: 'pointer',
                                  textAlign: 'left' as const,
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                  <span
                                    style={{
                                      width: 20,
                                      height: 20,
                                      borderRadius: '50%',
                                      fontSize: 10,
                                      fontWeight: 700,
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      flexShrink: 0,
                                      background: 'rgba(155,63,255,0.15)',
                                      color: '#C27FFF',
                                    }}
                                  >
                                    {idx + 1}
                                  </span>
                                  <span
                                    style={{
                                      fontFamily: 'var(--font-body)',
                                      fontSize: 13,
                                      fontWeight: 500,
                                      color: 'rgba(255,255,255,0.8)',
                                    }}
                                  >
                                    {step.label}
                                  </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                  <CopyButton text={step.prompt} />
                                  <ChevronDown
                                    size={14}
                                    style={{
                                      color: 'rgba(255,255,255,0.3)',
                                      transform: isStepOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                      transition: 'transform 0.2s',
                                    }}
                                  />
                                </div>
                              </button>
                              {isStepOpen && (
                                <div
                                  style={{
                                    background: 'rgba(0,0,0,0.4)',
                                    borderTop: '1px solid rgba(255,255,255,0.05)',
                                    color: 'rgba(255,255,255,0.65)',
                                    fontFamily: 'monospace',
                                    fontSize: 12,
                                    lineHeight: 1.7,
                                    padding: '14px 16px',
                                    whiteSpace: 'pre-wrap' as const,
                                  }}
                                >
                                  {step.prompt}
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Output + Quality */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                      <div
                        style={{
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.07)',
                          borderRadius: 10,
                          padding: '12px 14px',
                        }}
                      >
                        <div
                          style={{
                            color: 'rgba(255,255,255,0.3)',
                            textTransform: 'uppercase' as const,
                            letterSpacing: '0.08em',
                            fontSize: 11,
                            fontWeight: 500,
                            marginBottom: 8,
                          }}
                        >
                          Output format
                        </div>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, margin: 0 }}>{system.outputFormat}</p>
                      </div>
                      <div
                        style={{
                          background: 'rgba(0,204,168,0.06)',
                          border: '1px solid rgba(0,204,168,0.15)',
                          borderRadius: 10,
                          padding: '12px 14px',
                        }}
                      >
                        <div
                          style={{
                            color: '#00CCA8',
                            textTransform: 'uppercase' as const,
                            letterSpacing: '0.08em',
                            fontSize: 11,
                            fontWeight: 500,
                            marginBottom: 8,
                          }}
                        >
                          Quality bar
                        </div>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, margin: 0 }}>{system.qualityBar}</p>
                      </div>
                    </div>

                    {/* Failure modes + Human review */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                      <div>
                        <div
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 11,
                            fontWeight: 500,
                            textTransform: 'uppercase' as const,
                            letterSpacing: '0.1em',
                            color: '#FF69DB',
                            marginBottom: 8,
                          }}
                        >
                          Common failure modes
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {system.failureModes.map((f, i) => (
                            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
                              <span
                                style={{
                                  flexShrink: 0,
                                  marginTop: 6,
                                  width: 4,
                                  height: 4,
                                  borderRadius: '50%',
                                  background: '#FF69DB',
                                  display: 'inline-block',
                                }}
                              />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 11,
                            fontWeight: 500,
                            textTransform: 'uppercase' as const,
                            letterSpacing: '0.1em',
                            color: '#E8C840',
                            marginBottom: 8,
                          }}
                        >
                          Human review required
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {system.humanReview.map((h, i) => (
                            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
                              <span
                                style={{
                                  flexShrink: 0,
                                  marginTop: 6,
                                  width: 4,
                                  height: 4,
                                  borderRadius: '50%',
                                  background: '#E8C840',
                                  display: 'inline-block',
                                }}
                              />
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* When to use */}
                    <div
                      style={{
                        background: 'rgba(155,63,255,0.06)',
                        border: '1px solid rgba(155,63,255,0.15)',
                        borderRadius: 10,
                        padding: '12px 14px',
                      }}
                    >
                      <div
                        style={{
                          color: '#C27FFF',
                          fontSize: 11,
                          fontWeight: 700,
                          textTransform: 'uppercase' as const,
                          letterSpacing: '0.1em',
                          fontFamily: 'var(--font-body)',
                          marginBottom: 6,
                        }}
                      >
                        When to use
                      </div>
                      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, fontFamily: 'var(--font-body)', lineHeight: 1.6, margin: 0 }}>{system.whenToUse}</p>
                    </div>

                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
