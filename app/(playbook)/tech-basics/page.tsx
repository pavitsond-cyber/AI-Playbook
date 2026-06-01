'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import PageHeader from '@/components/playbook/PageHeader'

const concepts = [
  {
    id: 'prompt-layers',
    title: 'Prompt layer vs orchestration layer vs model layer',
    subtitle: 'Where product and design input actually matters',
    body: 'AI systems are not one thing — they are three layers. The model layer is the underlying AI model (Claude, GPT-4, etc.) — you mostly do not control this. The orchestration layer is the system that routes requests, manages context, and connects tools — you can influence this through product design. The prompt layer is the instructions you give the model — this is where product, design, and research input has the most leverage.\n\nMost product and design teams work primarily at the prompt layer. Understanding that orchestration and model choices exist — and affect output — helps you ask the right questions when AI output is disappointing or inconsistent.',
    decisionRule: 'If AI output is consistently poor despite good prompts, the issue may be at the model or orchestration layer, not the prompt layer. Escalate to engineering.',
  },
  {
    id: 'non-determinism',
    title: 'Why AI output is non-deterministic',
    subtitle: 'The same input will not always produce the same output',
    body: 'Unlike software functions, AI models do not always return the same output for the same input. Temperature settings, model updates, and inherent stochasticity mean that running the same prompt twice can produce meaningfully different results. This is not a bug — it is a feature for creative tasks. But it is a design problem for production workflows.\n\nFor product features using AI: design for the range of outputs, not just the ideal output. What does the UI look like when the AI output is good? When it is poor? When it is completely off? These all need designed states.',
    decisionRule: 'Before deploying any AI-powered product feature, test it with 50+ inputs and review the distribution of outputs. Design for the tail, not just the median.',
  },
  {
    id: 'hallucination-product',
    title: 'How to think about hallucination in product flows',
    subtitle: 'Confident wrong answers are a design problem, not just a model problem',
    body: 'AI models can produce confident, coherent, plausible-sounding output that is factually wrong. This is called hallucination. For product teams, hallucination is not just a model limitation — it is a product design problem. The question is: where in your product flow does incorrect AI output cause harm?\n\nFor internal tools (synthesising research, drafting PRDs), hallucination risk is managed by human review. For customer-facing AI features, you need confidence thresholds, fallback states, and escalation paths. The higher the cost of being wrong, the more robust your verification path needs to be.',
    decisionRule: 'Categorise every AI-powered feature by the cost of a confident wrong answer. High cost (pricing, availability, safety information) → mandatory human review or confidence threshold. Low cost (suggested tags, draft copy) → AI output with easy correction.',
  },
  {
    id: 'latency-cost-quality',
    title: 'Latency, cost, and quality tradeoffs',
    subtitle: 'You cannot optimise for all three simultaneously',
    body: 'AI inference has three variables that are in tension: latency (how fast), cost (how expensive), and quality (how good). Using a smaller model is faster and cheaper but often lower quality. Using a larger model is slower, more expensive, but higher quality. This tradeoff is real and affects product design.\n\nFor real-time user-facing features, latency matters. For background processing (research synthesis, overnight batch jobs), latency matters less and you can use slower, higher-quality models. Understanding this tradeoff helps you make better decisions about which model to use, where to cache results, and where to use AI at all.',
    decisionRule: 'Define the latency budget, cost budget, and minimum quality bar for each AI feature before choosing a model. These three constraints will determine your architecture choices.',
  },
  {
    id: 'fallback-states',
    title: 'Fallback states for AI features',
    subtitle: 'Every AI-powered feature must have a designed failure state',
    body: 'AI services can fail: the model can return an error, confidence can be too low, output can be filtered, or the service can be unavailable. Every AI-powered feature needs a designed fallback — what the user experiences when the AI component does not produce usable output.\n\nGood fallback design: show a non-AI version of the feature, gracefully degrade to a manual workflow, or clearly communicate that AI assistance is unavailable right now. Bad fallback design: show nothing, show an error, or show a low-quality AI output as if it were reliable.',
    decisionRule: 'Before any AI feature goes to production: answer "what happens when the AI fails?" If the answer is "we have not designed for that," the feature is not ready to ship.',
  },
  {
    id: 'human-in-the-loop',
    title: 'Human-in-the-loop design',
    subtitle: 'Designing explicit checkpoints where humans review AI output',
    body: 'Human-in-the-loop (HITL) means designing AI systems where humans are explicitly involved in reviewing, correcting, or approving AI output before it affects users or decisions. The design question is: where should the human checkpoint be, what triggers it, and what action does the human take?\n\nToo many HITL checkpoints make a system slow and impractical. Too few create quality and safety risks. The right design depends on: the cost of error, the volume of outputs, the quality of the AI model, and the availability of human reviewers. High-volume, low-stakes output → spot-check. Low-volume, high-stakes output → full review.',
    decisionRule: 'Every AI-assisted workflow should explicitly name: the review step, who performs it, what they are checking for, and what happens if they reject the output.',
  },
  {
    id: 'evals',
    title: 'Evals before launch',
    subtitle: 'How to test AI output quality systematically before shipping',
    body: '"Evals" (evaluations) are systematic tests of AI output quality. Before any AI feature or workflow is deployed at scale, you should run it against a representative sample of inputs and measure: how often does it produce good output? What types of inputs cause failures? What does the failure distribution look like?\n\nFor product features: build a test set of 50–200 representative inputs, run the AI on all of them, evaluate outputs against your quality bar, and use the results to set confidence thresholds, identify edge cases, and decide whether the system is ready for production.',
    decisionRule: 'Any AI feature that touches customers should have passed an eval before launch. "We tested a few examples and it looked good" is not an eval — it is a demo.',
  },
  {
    id: 'data-privacy',
    title: 'Data privacy and permissioning',
    subtitle: 'What data can go into AI tools and what cannot',
    body: 'Public AI tools (Claude, ChatGPT, Midjourney) process your inputs on external servers. This means: any data you send to these tools leaves your environment. For most prompting tasks (drafting, synthesising) this is acceptable. For sensitive data — personal user information, unreleased product plans, financial data, credentials — it is not.\n\nData permissioning also matters for internal AI tools: if an internal AI tool has access to customer data, who has access to the tool? What does it log? How is access controlled? These questions need answers before building internal tooling.',
    decisionRule: 'Before using any AI tool with real data: check what the tool\'s data handling policy is. When in doubt, anonymise the data before sending. Never send: passwords, API keys, PII (names, emails, phone numbers), or unreleased strategic plans to public AI tools.',
  },
  {
    id: 'customer-facing-ai',
    title: 'What changes when AI enters a customer-facing workflow',
    subtitle: 'The accountability and trust implications of public AI output',
    body: 'When AI output reaches customers — whether as recommendations, copy, pricing, or answers — the accountability is yours, not the model\'s. Customers do not know or care that AI generated the output. If it is wrong, misleading, or harmful, it is a Headout failure.\n\nThis means: customer-facing AI requires a higher review bar than internal AI. Confidence thresholds, fallback states, monitoring, and escalation paths are all required. It also means: the user experience must be designed around AI uncertainty — do not present AI output with the same confidence as verified data.',
    decisionRule: 'Any AI output visible to customers must have: a verified accuracy path or a confidence threshold, a fallback if quality is low, and a way to escalate to a human if the AI output is wrong.',
  },
  {
    id: 'designer-ai-spec',
    title: 'What designers need to specify for AI features',
    subtitle: 'The design decisions that fall specifically on design — not engineering',
    body: 'Designing AI-powered features requires specifying things that traditional feature design does not: What happens when AI confidence is low? What does the AI-uncertain state look like? How is it communicated that this is AI-generated vs verified? What is the edit/correction flow? What is the fallback experience? These are design decisions, not engineering decisions.\n\nDesigners working on AI features also need to specify: loading states for AI inference (which can be 2–10+ seconds), streaming UI if the model outputs token by token, and the visual distinction between AI-generated and human-verified content.',
    decisionRule: 'Before handing off any AI feature to engineering, the design spec must include: AI-uncertain state, low-confidence fallback, error state, loading state, correction flow, and the visual treatment for AI-generated vs verified content.',
  },
]

export default function ImplBasicsPage() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="px-5 sm:px-8 py-8 max-w-5xl mx-auto">
      <PageHeader
        title="AI Implementation Basics"
        description="What senior product and design leaders need to understand about AI systems — not software fundamentals, but the decisions that affect how AI features behave, fail, and scale."
        badge="Reference"
      />

      <div
        className="mb-8 p-4 rounded-xl text-sm"
        style={{ background: 'rgba(83,58,253,0.05)', border: '1px solid rgba(83,58,253,0.15)' }}
      >
        <strong style={{ color: '#273951' }}>This section is for product, design, and research leads</strong>
        <span style={{ color: '#64748d' }}> making decisions about AI-powered features and workflows — not for engineers implementing them. The goal is sharper questions, better decisions, and fewer surprises at launch.</span>
      </div>

      <div className="space-y-3">
        {concepts.map((concept) => {
          const isOpen = openId === concept.id
          return (
            <div
              key={concept.id}
              className="rounded-xl overflow-hidden"
              style={{
                background: '#ffffff',
                border: `1px solid ${isOpen ? 'rgba(83,58,253,0.25)' : '#e3e8ee'}`,
                borderRadius: '12px',
                boxShadow: 'rgba(0,55,112,0.08) 0 1px 3px',
              }}
            >
              <button
                onClick={() => setOpenId(isOpen ? null : concept.id)}
                className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors duration-150"
                onMouseEnter={(e) => { if (!isOpen) e.currentTarget.style.background = '#f6f9fc' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
              >
                <div>
                  <div className="text-sm font-semibold mb-0.5" style={{ color: '#0d253d' }}>{concept.title}</div>
                  <div className="text-xs" style={{ color: '#64748d' }}>{concept.subtitle}</div>
                </div>
                <ChevronDown
                  size={16}
                  className="shrink-0 ml-4 transition-transform duration-200"
                  style={{ color: '#64748d', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5" style={{ borderTop: '1px solid #e3e8ee' }}>
                  <div className="pt-4 space-y-4">
                    <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: '#273951' }}>
                      {concept.body}
                    </p>
                    <div
                      className="rounded-lg px-4 py-3 text-sm"
                      style={{ background: 'rgba(83,58,253,0.05)', border: '1px solid rgba(83,58,253,0.12)' }}
                    >
                      <span className="font-semibold" style={{ color: '#533afd' }}>Decision rule: </span>
                      <span style={{ color: '#273951' }}>{concept.decisionRule}</span>
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
