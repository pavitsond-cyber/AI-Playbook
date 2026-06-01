import PageHeader from '@/components/playbook/PageHeader'
import CopyButton from '@/components/playbook/CopyButton'

const templates = [
  {
    id: 'term-entry',
    title: 'Term Entry Template',
    description: 'For contributing a new AI glossary term',
    category: 'Glossary',
    template: `Term: [Term name]
Full form (if abbreviation): [e.g. Large Language Model]
Category: [e.g. AI Concepts / Tools / Techniques]
Simple explanation: [1–2 sentences in plain English, no jargon]
Why it matters for Headout: [1 sentence on relevance]
Example in context: [Optional: a real-world example]
Contributed by: [Your name]`,
  },
  {
    id: 'skill-entry',
    title: 'Skill Entry Template',
    description: 'For contributing a new skill to the Skills Library',
    category: 'Skills Library',
    template: `Skill name: [e.g. "Email summarization"]
Helps with: [What task does this skill accomplish?]
Useful for: [Which teams? e.g. Operations, Product, Everyone]
Tools: [Which AI tools are used?]
Difficulty: [Beginner / Intermediate / Advanced]
How to do it: [3–5 bullet steps]
Example prompt: [Optional: a starter prompt]
Expected output: [What should the output look like?]
Contributed by: [Your name]`,
  },
  {
    id: 'prompt-entry',
    title: 'Prompt Entry Template',
    description: 'For contributing a prompt to the Prompt Library',
    category: 'Prompt Library',
    template: `Prompt title: [Short descriptive name]
Category: [UX Writing / Product / Research / Engineering / Brand]
Use case: [When would someone use this?]
Expected output: [What does a good output look like?]

Prompt:
[Paste the full prompt here. Use [brackets] for things the user should replace.]

Tips for using this prompt:
- [Tip 1]
- [Tip 2]

Contributed by: [Your name]`,
  },
  {
    id: 'workflow-template',
    title: 'Workflow Template',
    description: 'For contributing a workflow to the Workflows section',
    category: 'Workflows',
    template: `Workflow title: [e.g. "How to do X with AI"]
Team: [Which team(s) is this for?]
Time required: [e.g. 15–30 min]
Tools used: [e.g. Claude, Cursor]
Prerequisites: [Anything the user needs before starting]

Steps:
1. [Step name] — [What to do and why]
2. [Step name] — [What to do and why]
3. [Step name] — [What to do and why]
(Add as many steps as needed)

Common mistakes to avoid:
- [Mistake 1]
- [Mistake 2]

Tips for better results:
- [Tip 1]

Contributed by: [Your name]`,
  },
  {
    id: 'case-study',
    title: 'Case Study Template',
    description: 'For submitting a real case study from your team',
    category: 'Case Studies',
    template: `Case study title: [Short descriptive title]
Team: [Your team]
Date: [Month, Year]

The problem:
[What were you trying to do? What was slow, hard, or inefficient? 2–3 sentences.]

The AI approach:
[What tool(s) did you use? What prompt or workflow did you follow? 3–5 sentences.]

The prompt(s) used (if applicable):
[Paste the main prompt(s) you used]

The result:
[What did you get? How did it compare to doing it the old way?]

Time saved / improvement:
[e.g. "Cut PRD writing from 3 hours to 45 minutes" or "Generated 20 copy options in 10 minutes"]

What worked well:
- [Point 1]
- [Point 2]

What didn't work / limitations:
- [Point 1]

What others can reuse:
[What's the key takeaway for the team?]

Contributed by: [Your name]`,
  },
]

export default function TemplatesPage() {
  return (
    <div className="px-5 sm:px-8 py-8 max-w-5xl mx-auto">
      <PageHeader
        title="Templates"
        description="Copy-ready templates for contributing to the playbook. Just fill in the brackets."
        badge="Keep Improving It"
      />

      <div className="space-y-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className="rounded-xl overflow-hidden"
            style={{
              background: '#ffffff',
              border: '1px solid #e3e8ee',
              borderRadius: '12px',
              boxShadow: 'rgba(0,55,112,0.08) 0 1px 3px',
            }}
          >
            {/* Header */}
            <div
              className="flex items-start justify-between px-5 py-4"
              style={{ borderBottom: '1px solid #e3e8ee' }}
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold" style={{ color: '#0d253d' }}>{template.title}</h3>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{
                      background: '#b9b9f9',
                      color: '#4434d4',
                    }}
                  >
                    {template.category}
                  </span>
                </div>
                <p className="text-xs" style={{ color: '#64748d' }}>{template.description}</p>
              </div>
              <CopyButton text={template.template} />
            </div>

            {/* Template content */}
            <div
              className="px-5 py-4 text-xs font-mono leading-relaxed whitespace-pre-wrap overflow-x-auto"
              style={{
                background: '#f6f9fc',
                border: '1px solid #e3e8ee',
                color: '#273951',
              }}
            >
              {template.template}
            </div>
          </div>
        ))}
      </div>

      <div
        className="mt-8 p-4 rounded-xl text-sm"
        style={{
          background: 'rgba(83,58,253,0.05)',
          border: '1px solid rgba(83,58,253,0.15)',
          color: '#64748d',
        }}
      >
        After filling in a template, head to the{' '}
        <a href="/contribute" className="underline" style={{ color: '#533afd' }}>
          Contribute page
        </a>{' '}
        to submit it.
      </div>
    </div>
  )
}
