'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import PageHeader from '@/components/playbook/PageHeader'

const workflows = [
  {
    id: 'prd',
    title: 'How to write a PRD with AI',
    team: 'Product',
    time: '30–60 min',
    tools: ['Claude', 'ChatGPT'],
    steps: [
      { step: 1, action: 'Start with the problem', detail: 'Write 2–3 sentences describing the user problem you\'re solving. Be specific about who the user is and what they\'re trying to do.' },
      { step: 2, action: 'Dump your rough notes', detail: 'Paste any existing notes, Slack messages, or research snippets into Claude. Don\'t worry about formatting — just give it context.' },
      { step: 3, action: 'Ask for a structured PRD draft', detail: 'Prompt: "Turn these notes into a structured PRD with: problem statement, goals, user stories, success metrics, non-goals, edge cases, and open questions."' },
      { step: 4, action: 'Review and refine', detail: 'Go through each section. Edit anything that\'s wrong, add specifics Claude couldn\'t know, and remove anything that doesn\'t apply.' },
      { step: 5, action: 'Generate edge cases', detail: 'Ask: "What edge cases or failure modes am I missing from this PRD?" Add the relevant ones.' },
      { step: 6, action: 'Validate with team', detail: 'Share the draft with your engineering and design leads. Prompt Claude to help you prepare discussion questions for the review.' },
      { step: 7, action: 'Finalize', detail: 'Use Claude to tighten the language, check for consistency, and ensure the goals are measurable.' },
    ],
  },
  {
    id: 'ux-copy',
    title: 'How to generate UX copy options',
    team: 'Design / Product',
    time: '15–30 min',
    tools: ['Claude', 'ChatGPT'],
    steps: [
      { step: 1, action: 'Define the state', detail: 'Identify the specific UI state you need copy for: empty state, error, success, loading, onboarding, etc.' },
      { step: 2, action: 'Gather context', detail: 'Collect: the product name, what the user was trying to do, why they reached this state, and the desired user emotion.' },
      { step: 3, action: 'Prompt for options', detail: 'Ask Claude to generate 8–10 variants with varying tones: friendly, professional, direct, reassuring, playful.' },
      { step: 4, action: 'Specify constraints', detail: 'Add character limits: "Header: max 6 words, body: max 16 words." Ask for a blank state image alt text as well.' },
      { step: 5, action: 'Pick the best 3', detail: 'Select the 3 strongest options and ask Claude to refine each one — tightening word choice and checking brand voice.' },
      { step: 6, action: 'A/B test framing', detail: 'If you plan to test, ask Claude to make two variants that represent meaningfully different approaches.' },
      { step: 7, action: 'Get second opinions', detail: 'Share with one team member before implementing. Ask Claude to explain the rationale behind each option to help you make the case.' },
      { step: 8, action: 'Localization prep', detail: 'For global states, ask Claude to flag which phrases may not translate well or feel culturally off in German/French/Spanish markets.' },
    ],
  },
  {
    id: 'interviews',
    title: 'How to summarize user interviews',
    team: 'Research / Product',
    time: '20–45 min',
    tools: ['Claude', 'NotebookLM'],
    steps: [
      { step: 1, action: 'Prepare transcripts', detail: 'Clean up your raw transcripts. Remove interviewer questions if not needed. Label each participant (P1, P2, etc.) for reference.' },
      { step: 2, action: 'Upload to Claude or NotebookLM', detail: 'For 1–3 transcripts: use Claude. For larger sets, use NotebookLM which grounds answers in your source documents.' },
      { step: 3, action: 'Ask for theme extraction', detail: 'Prompt: "Read these transcripts and identify the top 5 themes. For each theme, provide 2–3 supporting quotes with participant IDs."' },
      { step: 4, action: 'Extract pain points', detail: 'Follow up: "What are the most frequent frustrations or pain points mentioned? Group similar ones together."' },
      { step: 5, action: 'Identify surprising insights', detail: 'Ask: "What\'s surprising, unexpected, or contradictory in these transcripts that I might have missed?"' },
    ],
  },
  {
    id: 'image-prompt',
    title: 'How to create an image-generation prompt',
    team: 'Brand / Design',
    time: '10–20 min',
    tools: ['Claude', 'Midjourney', 'Krea'],
    steps: [
      { step: 1, action: 'Define the goal', detail: 'What is the image for? Campaign asset, mood board, UI reference, or social post? The purpose shapes the prompt.' },
      { step: 2, action: 'Describe subject and scene', detail: 'Start with the main subject, then add scene details: location, time of day, weather, props, people.' },
      { step: 3, action: 'Specify style and mood', detail: 'Add photography or art style references: "cinematic", "editorial", "flat illustration", "photorealistic". Add mood words: "warm", "melancholic", "energetic".' },
      { step: 4, action: 'Add technical parameters', detail: 'Include aspect ratio (16:9, 1:1), quality (--q 2), and any negative prompts (things to exclude).' },
      { step: 5, action: 'Use Claude to refine', detail: 'Paste your rough description into Claude and ask it to rewrite it as an optimized Midjourney prompt.' },
      { step: 6, action: 'Iterate', detail: 'Generate 4 variations, pick the best, and use the "Vary (Subtle)" or "Vary (Strong)" options to refine further.' },
    ],
  },
  {
    id: 'competitor',
    title: 'How to analyze competitor pages',
    team: 'Product / Marketing',
    time: '15–30 min',
    tools: ['Perplexity', 'Claude'],
    steps: [
      { step: 1, action: 'Identify what you\'re analyzing', detail: 'Pick a specific page type: homepage, product page, checkout, pricing. Compare the same page type across competitors.' },
      { step: 2, action: 'Screenshot and paste', detail: 'Take screenshots or copy the text content of competitor pages. Paste into Claude with context about what you\'re looking for.' },
      { step: 3, action: 'Ask for structural analysis', detail: 'Prompt: "Analyze this competitor page. What is the value proposition, who is the target audience, what are the key CTAs, and how is trust built?"' },
      { step: 4, action: 'Ask Perplexity for live research', detail: 'Use Perplexity to get up-to-date information about a competitor\'s strategy, recent changes, or press coverage.' },
      { step: 5, action: 'Synthesize the findings', detail: 'Ask Claude to compare the competitors and identify: what patterns repeat, what differentiators stand out, and 3 things Headout could apply.' },
    ],
  },
  {
    id: 'internal-tool',
    title: 'How to build a small internal tool using AI',
    team: 'Engineering / Operations',
    time: '1–3 hours',
    tools: ['Claude', 'Cursor', 'Lovable'],
    steps: [
      { step: 1, action: 'Define the problem clearly', detail: 'Write a one-paragraph description of the problem. What manual process are you replacing? Who uses it? What does success look like?' },
      { step: 2, action: 'List the inputs and outputs', detail: 'What goes in? What should come out? Examples: "User pastes a URL → tool returns structured data as CSV".' },
      { step: 3, action: 'Choose your build approach', detail: 'For simple tools: use Lovable or Claude (generate HTML/JS). For complex tools with codebase integration: use Cursor.' },
      { step: 4, action: 'Generate the initial code', detail: 'Paste your problem description and ask Claude or Lovable to generate a working first version. Be specific about tech stack preferences.' },
      { step: 5, action: 'Test with real inputs', detail: 'Run 5 real examples through the tool. Note what breaks. List each bug as a clear problem statement.' },
      { step: 6, action: 'Fix bugs iteratively', detail: 'Paste each bug + relevant code back into Claude/Cursor and ask for a fix. Test after each fix before moving to the next.' },
      { step: 7, action: 'Add error handling', detail: 'Ask Claude: "What edge cases should I handle? Add appropriate error messages for each." Implement the most important ones.' },
      { step: 8, action: 'Share and document', detail: 'Write a one-paragraph usage guide (Claude can help). Share with the team. Collect feedback for improvements.' },
    ],
  },
]

export default function WorkflowsPage() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="px-5 sm:px-8 py-8 max-w-5xl mx-auto">
      <PageHeader
        title="Workflows"
        description="Step-by-step AI workflows you can follow today. Each workflow covers a real task from start to finish."
        badge="Use AI"
      />

      <div className="space-y-3">
        {workflows.map((workflow) => {
          const isOpen = openId === workflow.id
          return (
            <div
              key={workflow.id}
              className="rounded-xl overflow-hidden transition-all duration-150"
              style={{
                background: '#ffffff',
                border: `1px solid ${isOpen ? 'rgba(83,58,253,0.25)' : '#e3e8ee'}`,
                borderRadius: '12px',
                boxShadow: 'rgba(0,55,112,0.08) 0 1px 3px',
              }}
            >
              {/* Accordion header */}
              <button
                onClick={() => setOpenId(isOpen ? null : workflow.id)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <div className="flex-1">
                  <div className="text-sm font-semibold mb-1" style={{ color: '#0d253d' }}>{workflow.title}</div>
                  <div className="flex flex-wrap gap-3 text-xs" style={{ color: '#64748d' }}>
                    <span>{workflow.team}</span>
                    <span>·</span>
                    <span>{workflow.time}</span>
                    <span>·</span>
                    <span>{workflow.tools.join(', ')}</span>
                  </div>
                </div>
                <ChevronDown
                  size={16}
                  className="shrink-0 ml-4 transition-transform duration-200"
                  style={{
                    color: '#64748d',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>

              {/* Steps */}
              {isOpen && (
                <div
                  className="px-5 pb-5"
                  style={{ borderTop: '1px solid #e3e8ee', background: '#f6f9fc' }}
                >
                  <div className="pt-4 space-y-4">
                    {workflow.steps.map((step, idx) => (
                      <div key={step.step} className="flex gap-4">
                        <div
                          className="shrink-0 size-7 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                          style={{
                            background: 'rgba(83,58,253,0.1)',
                            color: '#533afd',
                            border: '1px solid rgba(83,58,253,0.2)',
                            minWidth: '28px',
                          }}
                        >
                          {step.step}
                        </div>
                        <div>
                          <div className="text-sm font-semibold mb-1" style={{ color: '#0d253d' }}>{step.action}</div>
                          <p className="text-sm leading-relaxed" style={{ color: '#64748d' }}>
                            {step.detail}
                          </p>
                          {idx < workflow.steps.length - 1 && (
                            <div className="mt-4 ml-[-20px] w-px h-4" style={{ background: '#e3e8ee' }} />
                          )}
                        </div>
                      </div>
                    ))}
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
