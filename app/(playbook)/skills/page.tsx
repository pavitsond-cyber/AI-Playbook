'use client'

import { useState } from 'react'
import { ChevronDown, Download } from 'lucide-react'
import PageHeader from '@/components/playbook/PageHeader'
import BlobLayer from '@/components/ui/BlobLayer'

interface Skill {
  name: string
  what: string           // one-line collapsed description
  whenToUse: string      // "What you provide" rows
  qualityBar: string     // "What you'll get back" description
  tools: string[]
  teams: string[]
  domain?: string        // e.g. "Design"
  // Rich content for expanded skills
  inputs?: { label: string; required: boolean }[]
  outputFields?: string[]
  auditCategories?: { name: string; desc: string }[]
  methodology?: { title: string; points: string[] }[]
  edgeCases?: string[]
  bestPractices?: string[]
  mdFile?: string        // path in /public — direct file download
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
    name: 'Research Synthesis',
    domain: 'Research & Analysis',
    what: 'Automate and enhance research synthesis — summarize, organize, and analyze data from multiple sources to deliver actionable insights for decision-making.',
    whenToUse: 'When synthesizing large amounts of research data from multiple sources. For competitive analysis, product discovery, strategy planning, or building stakeholder-ready reports.',
    qualityBar: 'Every insight must include a source reference for traceability. Actionable items must be clearly highlighted. Outputs must be concise, structured, and validated by cross-checking critical data points.',
    tools: ['Notion', 'Slack', 'Amplitude', 'Claude'],
    teams: ['Research', 'Product', 'Strategy'],
    mdFile: '/skills/research-synthesis.md',
    inputs: [
      { label: 'Research data sources — URLs, documents, datasets, or tool connectors', required: true },
      { label: 'Focus areas — specific topics, questions, or goals for the synthesis', required: true },
      { label: 'Output format: structured report, summary, brief, or visualization template', required: true },
      { label: 'Filters, date ranges, or audience specifications', required: false },
    ],
    outputFields: ['Summary', 'Actionable Insights', 'Source References', 'Synthesis Method', 'Key Findings', 'Visualizations', 'Limitations'],
    auditCategories: [
      { name: 'Source Identification', desc: 'Identify and collect from all relevant data sources — documents, databases, tools' },
      { name: 'Data Extraction', desc: 'Extract key information and categorize by relevance and topic' },
      { name: 'Cross-Analysis', desc: 'Detect patterns, anomalies, and actionable insights across datasets' },
      { name: 'Structured Output', desc: 'Format findings for the target audience — report, dashboard, brief, or presentation' },
    ],
    edgeCases: [
      'Conflicting or inconsistent data sources — provide reconciled summary and explicitly note uncertainties',
      'Large volumes of unstructured data — prioritise key findings using relevance scoring',
      'Cross-functional or multi-team inputs — normalise terminology and context for clarity',
      'Time-sensitive research — highlight recent and high-impact findings first',
      'Multi-language or international sources — ensure synthesized insights are accurate across languages',
    ],
    bestPractices: [
      'Always document source references — every insight must be traceable to its origin',
      'Highlight actionable items separately from background information',
      'Keep outputs concise and structured for stakeholder consumption — no padding',
      'Maintain consistent formatting and methodology so outputs are repeatable',
      'Cross-check critical data points to validate synthesis accuracy before sharing',
    ],
  },
  {
    name: 'Persona Researcher',
    domain: 'Research & Analysis',
    what: 'Collect, synthesize, and analyze data from multiple sources to generate structured, actionable persona profiles for product, UX, or marketing teams.',
    whenToUse: 'When building new personas from scratch or refreshing existing ones. For product discovery, UX research sprints, or marketing segmentation work.',
    qualityBar: 'Every persona must include goals, pain points, observed behaviors, and specific source references. Conflicting or incomplete data must be flagged with recommended follow-up. Outputs must be presentation-ready without further reformatting.',
    tools: ['Notion', 'Google Workspace', 'Claude'],
    teams: ['Research', 'UX', 'Product', 'Marketing'],
    mdFile: '/skills/persona-researcher.md',
    inputs: [
      { label: 'Data sources — documents, emails, meeting notes, survey responses, or tool connectors', required: true },
      { label: 'Research focus — target personas or user types to investigate', required: true },
      { label: 'Output format: persona profile, summary report, or presentation-ready document', required: true },
      { label: 'Filters by date range, user segment, or project', required: false },
    ],
    outputFields: ['Persona Name', 'User Segment', 'Goals', 'Pain Points', 'Behaviors', 'Preferences', 'Source References', 'Summary Insights', 'Actionable Recommendations'],
    auditCategories: [
      { name: 'Data Collection', desc: 'Gather and clean relevant user information from all specified sources' },
      { name: 'Pattern Analysis', desc: 'Analyze user behaviors, goals, pain points, and communication patterns' },
      { name: 'Persona Synthesis', desc: 'Construct structured persona profiles from analyzed findings' },
      { name: 'Output Formatting', desc: 'Format for presentation, stakeholder reports, or further research use' },
    ],
    edgeCases: [
      'Multiple overlapping personas in the same data — prioritize relevant segment information and separate clearly',
      'Conflicting or incomplete data — highlight uncertainty and recommend targeted follow-up research',
      'Multi-team or cross-functional data — normalize terminology and context so outputs are consistent',
      'International users or multiple languages — ensure accurate interpretation across all textual data',
    ],
    bestPractices: [
      'Anchor every persona characteristic to a specific data source — no invented traits',
      'Validate patterns across multiple data points before adding to the persona',
      'Keep persona profiles focused — one clear segment per profile avoids contradictory insights',
      'Include actionable recommendations, not just descriptive observations',
      'Review personas with the team that will use them — alignment beats accuracy in isolation',
    ],
  },
  {
    name: 'UI Audit Reporter',
    domain: 'Design',
    what: 'Audit screens for visual consistency, spacing, and design system compliance at a senior or lead level.',
    whenToUse: 'Before every significant engineering handoff. When screens need to be validated against the design system before launch.',
    qualityBar: 'Each finding must include: element, current state, expected state, location reference, design token reference, and recommendation. Prioritise as Critical / Major / Minor and group related issues to reduce redundancy.',
    tools: ['Figma', 'Design System'],
    teams: ['Product Design', 'Design Engineering'],
    mdFile: '/skills/ui-audit-reporter.md',
    inputs: [
      { label: 'Screen URL or Figma link to audit', required: true },
      { label: 'Design system reference — tokens, components, guidelines', required: true },
      { label: 'Audit scope: full screen, specific component, or specific category', required: true },
      { label: 'Platform: web desktop, web mobile, iOS, Android', required: false },
      { label: 'Previous audit findings for comparison', required: false },
      { label: 'Known design exceptions to exclude from findings', required: false },
    ],
    outputFields: ['Finding ID', 'Category', 'Severity', 'Element', 'Current State', 'Expected State', 'Location', 'Design Token Reference', 'Recommendation'],
    auditCategories: [
      { name: 'Consistency', desc: 'Components look and behave identically across screens' },
      { name: 'Spacing', desc: 'All spacing follows the design system scale' },
      { name: 'Typography', desc: 'Font sizes, weights, line heights match the type scale' },
      { name: 'Color', desc: 'Semantic colors used correctly; sufficient contrast' },
      { name: 'Components', desc: 'Standard components used; avoid custom one-offs' },
      { name: 'Accessibility', desc: 'Touch targets ≥44px; contrast ≥4.5:1; focus indicators visible' },
    ],
    methodology: [
      { title: 'Analyze Against Design System', points: ['Compare screens against tokens for color, spacing, typography, border radius, shadows', 'Flag undocumented or one-off components'] },
      { title: 'Visual Consistency Check', points: ['Ensure similar elements behave and appear identically across screens', 'Verify interaction patterns are consistent'] },
      { title: 'Spacing & Alignment', points: ['Check padding, margins, and gaps against the design system scale (4, 8, 12, 16, 24, 32, 48px)'] },
      { title: 'Typography', points: ['Confirm headings, body text, labels, captions follow the correct font size, weight, and line height'] },
      { title: 'Color Usage', points: ['Validate semantic colors (primary, destructive, muted)', 'Ensure sufficient contrast ratios for accessibility'] },
      { title: 'Responsive Behavior', points: ['Assess screen adaptation across breakpoints and platforms'] },
    ],
    edgeCases: [
      'Component not yet in design system → flag as undocumented rather than a violation',
      'Screen built on an outdated design system version → note which version the screen is built against',
      'Dark mode may have different issues than light mode → audit both and separate findings',
      'Campaign-specific deviations → verify the exceptions are documented',
      'Accessibility contrast failures caused by background images → recommend overlay solutions rather than only flagging the issue',
    ],
    bestPractices: [
      'Focus on measurable and high-impact issues rather than subjective preferences',
      'Verify consistency across multiple screens before marking a finding',
      'Include references to design tokens and system guidelines for each recommendation',
      'Always consider accessibility and responsiveness in audits',
      'Use grouped reporting to reduce redundancy and improve clarity for engineering teams',
    ],
  },
  {
    name: 'Design Handoff Documenter',
    domain: 'Design',
    what: 'Generate developer-ready specifications from design files with precise measurements, interactions, and tokens.',
    whenToUse: 'Before every engineering handoff. When developers need pixel-perfect implementation without repeated clarification rounds.',
    qualityBar: 'Every measurement must reference a design token — no arbitrary pixel values. Interactive states must cover all scenarios including error, empty, and loading. Animations must include duration and easing. The handoff should allow developers to implement fully without follow-up questions.',
    tools: ['Figma', 'Design System'],
    teams: ['Product Design', 'Design Engineering'],
    mdFile: '/skills/design-handoff-documenter.md',
    inputs: [
      { label: 'Design file URL or screenshots — Figma, Sketch, or equivalent', required: true },
      { label: 'Component scope: full page, section, or single component', required: true },
      { label: 'Design system reference — token mappings and guidelines', required: true },
      { label: 'Interaction notes or prototype links', required: false },
      { label: 'Frontend framework: React, Swift, Kotlin, Flutter', required: false },
    ],
    outputFields: ['Component Name', 'Measurements', 'Token Mappings', 'Interactive States', 'Animations', 'Responsive Behavior', 'Asset List', 'Implementation Notes'],
    auditCategories: [
      { name: 'Component Inventory', desc: 'List each unique component with token mappings' },
      { name: 'Layout Spec', desc: 'Grid, container widths, breakpoint behavior' },
      { name: 'Interaction Spec', desc: 'State changes, transitions, micro-interactions' },
      { name: 'Asset Spec', desc: 'Images, icons, illustrations, download-ready files' },
    ],
    edgeCases: [
      'Custom components not in the library → document fully and flag for inclusion',
      'Animated behaviors not obvious in static designs → provide prototype or video reference',
      'Data density variations → document behavior for extremes (1 item vs 100 items)',
      'Fonts without web licenses → flag and suggest fallbacks',
      'Third-party UI integrations → clarify boundaries of design implementation',
    ],
    bestPractices: [
      'Prioritize completeness and measurable accuracy over subjective opinions',
      'Document all edge cases including errors, empty states, and loading states',
      'Reference design tokens for all measurements and colors',
      'Provide developers with all information needed for pixel-perfect implementation',
      'Maintain clarity in responsive behavior, interactive states, and implementation details',
    ],
  },
  {
    name: 'User Flow Wireframer',
    domain: 'Design',
    what: 'Generate wireframe specifications for multi-step user journeys — happy paths, error states, and edge cases fully mapped.',
    whenToUse: 'When defining a new user journey or auditing an existing one for gaps in error handling, state coverage, or decision-point clarity.',
    qualityBar: 'Core flows should have ≤7 steps for critical tasks. Every screen must include a clear back/escape path. Error states must include recovery actions. Loading states must be specified for screens fetching data. Flows remain cohesive with consistent visual and interaction patterns.',
    tools: ['Figma'],
    teams: ['Product Design', 'Product', 'UX Research'],
    mdFile: '/skills/user-flow-wireframer.md',
    inputs: [
      { label: 'User goal — the task the user is trying to accomplish', required: true },
      { label: 'Entry points — possible starting locations (homepage, deep link, push notification)', required: true },
      { label: 'Platform: Web, iOS, Android, or cross-platform', required: true },
      { label: 'Technical or business constraints', required: false },
      { label: 'Existing patterns or design system reference', required: false },
      { label: 'Analytics data or known user behaviour', required: false },
    ],
    outputFields: ['Screen Name', 'Purpose', 'Content Blocks', 'Primary Action', 'Secondary Actions', 'State Variations', 'Data Inputs', 'Data Outputs', 'Transitions', 'Error States', 'Flow Diagram'],
    auditCategories: [
      { name: 'Screen Specification', desc: 'Name, purpose, content hierarchy, and primary CTA for each screen' },
      { name: 'State Variations', desc: 'Loading, empty, error, and success states for every screen' },
      { name: 'Transitions', desc: 'Push, modal, drawer, or inline expansion between screens' },
      { name: 'Data Dependencies', desc: 'What each screen needs from prior steps — inputs and outputs documented' },
    ],
    edgeCases: [
      'Authentication required mid-flow — preserve context during login or signup',
      'Mobile web users switching to app mid-flow — maintain state via deep links or saved progress',
      'Real-time data dependencies — handle stale or unavailable data gracefully',
      'Multiple user personas — design branching flows optimised for different user types',
      'Third-party redirects — ensure return journeys and error handling are clearly specified',
    ],
    bestPractices: [
      'Map the happy path first, then layer in error and edge states',
      'Keep critical task flows to ≤7 steps — every extra step reduces completion rates',
      'Every screen needs a clear back/escape path, no dead ends',
      'Document data dependencies between screens explicitly to avoid developer assumptions',
      'Always specify loading states for any screen that fetches data',
    ],
  },
  {
    name: 'Design Engineering',
    domain: 'Design',
    what: 'Review UI code and interactions for animation quality, responsiveness, and micro-details that make interfaces feel right — not just correct.',
    whenToUse: 'When reviewing AI-generated or human-written UI code for interaction polish. When animations feel off, buttons feel unresponsive, or transitions feel generic.',
    qualityBar: 'Every animation must have a clear reason (spatial consistency, state indication, feedback). Only animate transform and opacity. Buttons must have active states. Respect prefers-reduced-motion. Never animate from scale(0). Duration must match element type: button press 100–160ms, dropdowns 150–250ms, modals 200–500ms.',
    tools: ['Framer Motion', 'CSS', 'React'],
    teams: ['Design Engineering', 'Frontend', 'Product Design'],
    mdFile: '/skills/design-engineering.md',
    inputs: [
      { label: 'UI code or component to review — paste JSX, CSS, or describe the interaction', required: true },
      { label: 'Interaction or animation to evaluate — e.g. dropdown, button, modal, drawer', required: true },
      { label: 'Target platform: web, iOS, Android', required: false },
      { label: 'Accessibility requirements — e.g. prefers-reduced-motion support', required: false },
    ],
    outputFields: ['Before', 'After', 'Why'],
    auditCategories: [
      { name: 'Animation Decision', desc: 'Frequency-based check: should this animate at all? What is its purpose?' },
      { name: 'Easing & Duration', desc: 'Enter/Exit → ease-out · Movement → ease-in-out · Button press 100–160ms' },
      { name: 'Component Craft', desc: 'Buttons scale(0.97) on active · Popovers origin-aware · No pop-in from scale(0)' },
      { name: 'Performance', desc: 'Only animate transform and opacity — stays on GPU, no layout or paint costs' },
    ],
    edgeCases: [
      'Element animates 100+ times/day — remove animation entirely, never slow down repeated UI',
      'Animation only justification is "it looks cool" — remove it; every animation needs a functional reason',
      'Popover or dropdown appears to pop in from nowhere — use origin-aware scale from trigger point',
      'Button feels unresponsive — add transform: scale(0.97) on :active state',
      'Users with vestibular disorders — wrap non-essential motion in prefers-reduced-motion media query',
    ],
    bestPractices: [
      'Use ease-out for enters and exits — feels more responsive than ease-in',
      'Specify exact transition properties, never use transition: all',
      'Use spring animations for gesture-driven and interruptible interactions',
      'Slow-motion test every animation to catch timing issues before shipping',
      'Good defaults beat endless options — build one motion system and apply it consistently',
    ],
  },
  {
    name: 'Design Taste Frontend',
    domain: 'Frontend Design',
    what: 'Evaluate and upgrade AI-generated interfaces for layout, typography, motion, and spacing quality — anti-slop design guidance.',
    whenToUse: 'After generating a UI with an AI tool (v0, Cursor, Lovable) when the output looks generic, poorly spaced, or visually unbalanced.',
    qualityBar: 'Every evaluation must address alignment and visual balance, typographic hierarchy (scale, weight, line height), motion naturalness, and spacing clarity. Identify and remove boilerplate-looking patterns. Every suggestion must reference a specific visual principle.',
    tools: ['v0', 'Cursor', 'Figma', 'Midjourney'],
    teams: ['Design Engineering', 'Product Design', 'Frontend'],
    mdFile: '/skills/design-taste-frontend-v1.md',
    inputs: [
      { label: 'AI-generated UI — screenshot, code, or Figma link to evaluate', required: true },
      { label: 'Component or page scope — what are we improving?', required: true },
      { label: 'Target platform: web, mobile, or both', required: false },
      { label: 'Reference aesthetics or visual direction to target', required: false },
      { label: 'Frontend framework: React, Svelte, Vue, etc.', required: false },
    ],
    outputFields: ['Layout Evaluation', 'Typography Guidance', 'Motion Recommendations', 'Spacing Guidance', 'Reference Board Direction'],
    auditCategories: [
      { name: 'Layout & Alignment', desc: 'Elements well-aligned and visually balanced — no awkward spacing or misaligned columns' },
      { name: 'Typography Hierarchy', desc: 'Correct font scale, weight, and line height to establish clear reading order' },
      { name: 'Motion Quality', desc: 'Natural interaction feedback — no jarring or purposeless animations' },
      { name: 'Spacing & Density', desc: 'Reduce visual clutter, emphasize hierarchy through negative space' },
    ],
    edgeCases: [
      'Highly complex AI-generated UIs where multiple elements compete for attention — establish a clear visual priority order',
      'Components with varying proportions across responsive breakpoints — evaluate at each breakpoint',
      'Interfaces generated for web and mobile simultaneously — hierarchy often breaks; evaluate separately',
      'Text-heavy pages where hierarchy is less clear — focus on scannability over visual weight',
      'Intentional creative deviations from typical layout — evaluate purpose rather than penalise innovation',
    ],
    bestPractices: [
      'Identify the #1 thing the user should notice — make sure the visual hierarchy supports it',
      'Audit type scale first: one dominant size, one supporting size, one utility size',
      'Consistent spacing scale (4/8/16/24/32/48px) prevents visual clutter instantly',
      'Reference great work to train taste — explain why something feels good, not just that it does',
      'Pair with image generation for reference boards before handing off to Cursor or Claude Code',
    ],
  },
  {
    name: 'Visual Hierarchy Analyzer',
    domain: 'Design',
    what: 'Analyze and optimize visual hierarchy for user attention flow — ensuring designs guide attention in the right order for conversion and comprehension.',
    whenToUse: 'When a design feels visually unclear, when CTAs are not converting, or when user testing shows confusion about where to look or click.',
    qualityBar: 'Primary CTA must be the most visually prominent interactive element on screen. Key information (price, availability, ratings) must be visible without scrolling. Visual grouping must match logical grouping. Every negative finding must include a specific improvement with rationale.',
    tools: ['Figma', 'Heatmap tools'],
    teams: ['Product Design', 'UX Research', 'Growth'],
    mdFile: '/skills/visual-hierarchy-analyzer.json',
    inputs: [
      { label: 'Screen design — URL, Figma link, or description', required: true },
      { label: 'Intended attention order: what should users notice first, second, third', required: true },
      { label: 'Business goal of this page: conversion, information, or engagement', required: true },
      { label: 'Viewport to analyze: mobile, desktop, or both', required: false },
      { label: 'Eye-tracking or click heatmap data if available', required: false },
    ],
    outputFields: ['Attention Order', 'Visual Weight Map', 'Hierarchy Score', 'Mismatches', 'Grouping Analysis', 'Cognitive Load Score', 'Improvements', 'Before/After Comparison'],
    auditCategories: [
      { name: 'Size Hierarchy', desc: 'Largest elements draw attention first — are the right elements largest?' },
      { name: 'Color Hierarchy', desc: 'High-contrast and saturated colors draw attention — is color used strategically?' },
      { name: 'Spatial Hierarchy', desc: 'Elements with more whitespace appear more important — is breathing room allocated correctly?' },
      { name: 'Typography Hierarchy', desc: 'Font size, weight, and style create reading order — is the type scale effective?' },
      { name: 'Position Hierarchy', desc: 'Top-left and center get natural attention — are key elements positioned there?' },
    ],
    edgeCases: [
      'Multiple equally important CTAs competing — recommend a primary/secondary visual hierarchy',
      'Intentional hierarchy break for a promotional banner — evaluate if the disruption serves the business goal',
      'Content-heavy page (T&C, FAQ) — adjust analysis for scannability rather than conversion hierarchy',
      'Design works in isolation but fails in the context of the overall user journey — analyze relative to previous and next screens',
      'International page where text length varies — hierarchy may break with longer language translations',
    ],
    bestPractices: [
      'Focus on measurable hierarchy and attention flow — not subjective aesthetic preference',
      'Always evaluate the mobile viewport — hierarchy frequently breaks from desktop to mobile',
      'Work within existing design system patterns — recommend changes that are implementable',
      'Motion and animation are hierarchy tools — consider them as part of the attention flow',
      'Map findings to business goals — a hierarchy issue that does not affect conversion is low priority',
    ],
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
    name: 'Localization QA Agent',
    domain: 'Product / Content',
    what: 'Check translated product content for accuracy, fluency, tone, and cultural appropriateness against the source language version.',
    whenToUse: 'Before any translated copy goes to production. For new market launches, high-traffic page updates, and any content where accuracy issues could harm users.',
    qualityBar: 'Accuracy issues are critical — incorrect prices, times, or policies can harm users. Every issue must include the original text, the problem, and a suggested correction. Output must classify overall quality: Publish-ready / Needs editing / Needs retranslation.',
    tools: ['Claude'],
    teams: ['UX Writing', 'Content', 'Ops'],
    mdFile: '/skills/localization-qa-agent.md',
    inputs: [
      { label: 'Source content — original product text (usually English)', required: true },
      { label: 'Translated content — target language version to review', required: true },
      { label: 'Target language — e.g. Spanish, French, Japanese', required: true },
      { label: 'Content type: title, description, highlights, FAQs, policy', required: true },
      { label: 'Target market or region — e.g. Latin America vs Spain for Spanish', required: false },
    ],
    outputFields: ['Overall Quality', 'Accuracy Score', 'Fluency Score', 'Tone Score', 'Cultural Adaptation Score', 'Issue Type', 'Issue Severity', 'Original Text', 'Translated Text', 'Suggested Correction', 'Translation Method'],
    auditCategories: [
      { name: 'Accuracy', desc: 'Factual details correct — prices, times, locations, inclusions match source' },
      { name: 'Fluency', desc: 'Reads naturally in the target language — not machine-like or stilted' },
      { name: 'Tone', desc: 'Matches intended brand voice — enthusiastic but not hyperbolic, informative but engaging' },
      { name: 'Cultural Adaptation', desc: 'Culturally specific references handled correctly — measurements, date formats, norms' },
      { name: 'Completeness & SEO', desc: 'No content missing; target-language keywords included naturally' },
    ],
    edgeCases: [
      'Regional language differences — European vs Latin American Spanish require different localisation approaches',
      'Puns or culturally specific phrases — require full adaptation, not literal translation',
      'Translated text longer than source — may break UI layout; flag truncation risks',
      'Machine-like monotone translations — lacking engaging tone even if factually accurate',
      'Errors in source content — flag the original error but do not propagate it into the translation',
    ],
    bestPractices: [
      'Accuracy is non-negotiable — incorrect prices, times, or policies can directly harm users',
      'Assess whether translations are machine-generated or human — sets expectations for quality level',
      'Verify proper nouns carefully — some should translate (generic terms), some should not (brand names)',
      'Ensure UI text fits display constraints — translated strings are often 30–40% longer than English',
      'Never treat AI review as a substitute for native speaker sign-off on final production content',
    ],
  },
]

function buildMarkdown(skill: Skill): string {
  return `# ${skill.name}\n\n## What this skill is\n${skill.what}\n\n## When to use\n${skill.whenToUse}\n\n## Quality bar\n${skill.qualityBar}\n\n## Tools\n${skill.tools.join(', ')}\n\n## Teams\n${skill.teams.join(', ')}\n`
}

function downloadSkill(skill: Skill) {
  // If a pre-built MD file exists in /public, download it directly
  if (skill.mdFile) {
    const a = document.createElement('a')
    a.href = skill.mdFile
    a.download = skill.mdFile.split('/').pop() ?? 'skill.md'
    a.click()
    return
  }
  // Otherwise generate from data
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

function SkillRow({ skill, isOpen, onToggle }: { skill: Skill; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: isOpen ? '1px solid rgba(155,63,255,0.25)' : '1px solid rgba(255,255,255,0.07)',
        borderRadius: 14,
        overflow: 'hidden',
        transition: 'border-color 0.2s ease',
      }}
    >
      {/* ── Collapsed row ─────────────────────────────────────────────── */}
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '18px 20px',
          background: isOpen ? 'rgba(155,63,255,0.04)' : 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'background 0.15s ease',
        }}
      >
        {/* Name + description */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, flexWrap: 'wrap' as const }}>
            {skill.domain && (
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 600, color: '#FF69DB', background: 'rgba(255,105,219,0.1)', border: '1px solid rgba(255,105,219,0.2)', borderRadius: 100, padding: '2px 8px', textTransform: 'uppercase' as const, letterSpacing: '0.08em', flexShrink: 0 }}>
                {skill.domain}
              </span>
            )}
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 17,
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.3,
            }}>
              {skill.name}
            </span>
            <ChevronDown
              size={15}
              style={{
                color: isOpen ? '#C27FFF' : 'rgba(255,255,255,0.25)',
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease, color 0.2s ease',
                flexShrink: 0,
              }}
            />
          </div>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.5,
            margin: 0,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
          } as React.CSSProperties}>
            {skill.what}
          </p>
        </div>

        {/* Download button */}
        <button
          onClick={e => { e.stopPropagation(); downloadSkill(skill) }}
          title="Download as .md"
          style={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            padding: '6px 12px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: 8,
            color: 'rgba(255,255,255,0.4)',
            fontSize: 11,
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(155,63,255,0.12)'
            e.currentTarget.style.borderColor = 'rgba(155,63,255,0.25)'
            e.currentTarget.style.color = '#C27FFF'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'
            e.currentTarget.style.color = 'rgba(255,255,255,0.4)'
          }}
        >
          <Download size={11} />
          .md
        </button>
      </button>

      {/* ── Expanded dropdown ─────────────────────────────────────────── */}
      <div style={{
        maxHeight: isOpen ? '2400px' : '0px',
        overflow: 'hidden',
        transition: isOpen ? 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)' : 'none',
      }}>
        <div style={{ padding: '20px 20px 28px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: 28 }}>

          {/* ── What you provide ───────────────────────────────────────── */}
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: '#ffffff', margin: '0 0 12px' }}>What you provide</p>
            <div style={{ display: 'flex', flexDirection: 'column', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
              {(skill.inputs ?? skill.whenToUse.split(/(?<=\.)\s+/).map((s, i) => ({ label: s.trim(), required: i < 2 })).filter(x => x.label)).map((inp, i, arr) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>
                    {typeof inp === 'string' ? inp : inp.label}
                  </span>
                  {(typeof inp === 'object' ? inp.required : i < 2) && (
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500, color: '#C27FFF', background: 'rgba(155,63,255,0.12)', border: '1px solid rgba(155,63,255,0.2)', borderRadius: 100, padding: '2px 9px', flexShrink: 0, marginLeft: 12 }}>Required</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── What you'll get back ───────────────────────────────────── */}
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: '#ffffff', margin: '0 0 12px' }}>What you&apos;ll get back</p>
            <div style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>{skill.name}</span>
              </div>
              <div style={{ padding: '14px 16px' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.65, color: 'rgba(255,255,255,0.55)', margin: '0 0 12px' }}>{skill.qualityBar}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {(skill.outputFields ?? skill.tools).map(f => (
                    <span key={f} style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#C27FFF', background: 'rgba(155,63,255,0.12)', border: '1px solid rgba(155,63,255,0.2)', borderRadius: 100, padding: '3px 10px' }}>{f}</span>
                  ))}
                  {!skill.outputFields && skill.teams.map(t => (
                    <span key={t} style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 100, padding: '3px 10px' }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Audit Categories (rich skills only) ────────────────────── */}
          {skill.auditCategories && (
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: '#ffffff', margin: '0 0 12px' }}>Audit categories</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                {skill.auditCategories.map(cat => (
                  <div key={cat.name} style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 9 }}>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: '#C27FFF', margin: '0 0 5px' }}>{cat.name}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5, margin: 0 }}>{cat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Good to know / Edge cases (rich skills only) ───────────── */}
          {skill.edgeCases && (
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: '#ffffff', margin: '0 0 12px' }}>Good to know</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {skill.edgeCases.map((ec, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 14px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 9 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(155,63,255,0.5)', flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.55 }}>{ec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Tools + Teams (fallback for non-rich skills) ───────────── */}
          {!skill.outputFields && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {skill.tools.map(t => (
                <span key={t} style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#C27FFF', background: 'rgba(155,63,255,0.12)', border: '1px solid rgba(155,63,255,0.2)', borderRadius: 100, padding: '3px 10px' }}>{t}</span>
              ))}
              {skill.teams.map(t => (
                <span key={t} style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 100, padding: '3px 10px' }}>{t}</span>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default function SkillsPage() {
  const [openName, setOpenName] = useState<string | null>(null)

  const toggle = (name: string) => setOpenName(prev => prev === name ? null : name)

  return (
    <div style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
      <BlobLayer />
      <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(64px,6vw,100px) clamp(20px,4vw,48px)', maxWidth: 960, margin: '0 auto' }}>
        <PageHeader
          title="Skills"
          description="Senior-level AI skills with quality bars. Each skill is downloadable as a Markdown template."
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {skills.map(skill => (
            <SkillRow
              key={skill.name}
              skill={skill}
              isOpen={openName === skill.name}
              onToggle={() => toggle(skill.name)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
