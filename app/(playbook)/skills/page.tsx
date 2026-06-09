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
    name: 'Extract Design System',
    domain: 'Design / Frontend',
    what: 'Reverse-engineer design tokens — colors, typography, spacing, border radius, shadows — from any public website and generate starter JSON and CSS custom properties.',
    whenToUse: 'When bootstrapping a design system from an existing website. For generating starter token files for new projects, feeding tokens into AI design-to-code workflows, or comparing visual styles from competitors.',
    qualityBar: 'Outputs a W3C-compatible tokens.json and tokens.css ready to drop into any project. Both raw.json and normalized.json must be generated. Every extracted token category must be documented with examples. Flag anything that could not be extracted and explain why.',
    tools: ['Claude', 'Cursor', 'Codex', 'CLI'],
    teams: ['Design Engineering', 'Frontend', 'Product Design'],
    mdFile: '/skills/extract-design-system.md',
    inputs: [
      { label: 'Public website URL to extract design tokens from', required: true },
      { label: 'Output directory or project path for generated files', required: true },
      { label: 'Token categories to focus on: colors, typography, spacing, radius, shadows', required: false },
      { label: 'AI agent context: Claude, Cursor, or Codex', required: false },
    ],
    outputFields: ['raw.json', 'normalized.json', 'tokens.json', 'tokens.css', 'Colors', 'Typography', 'Spacing', 'Border Radius', 'Shadows'],
    auditCategories: [
      { name: 'Colors', desc: 'Brand palette, backgrounds, text colors, border colors — full color scale extracted' },
      { name: 'Typography', desc: 'Font families, sizes, weights, and line heights across all text styles' },
      { name: 'Spacing', desc: 'Padding and margin scale — normalized to a consistent spacing system' },
      { name: 'Border Radius', desc: 'Button, card, and pill radii — all elevation levels documented' },
      { name: 'Shadows', desc: 'Box-shadow values across all elevation levels — ready for token mapping' },
    ],
    edgeCases: [
      'Dynamic or JS-rendered websites — some tokens may not be exposed in the static stylesheet; flag what could not be extracted',
      'Proprietary fonts — document the font family name but note licensing constraints for use in your project',
      'CSS-in-JS websites (Styled Components, Emotion) — extraction may be incomplete versus static stylesheets',
      'Multiple brand themes on one site — identify and extract the primary theme tokens; note secondary themes separately',
      'Tokens from third-party UI libraries — distinguish brand-specific tokens from framework defaults (e.g. MUI, Tailwind)',
    ],
    bestPractices: [
      'Always review normalized.json before using tokens directly — automated extraction can misclassify values',
      'Cross-reference extracted colors against the site\'s brand guidelines if available for accuracy',
      'Use extracted tokens as a starting point, not a final system — refine with design intent before shipping',
      'Feed tokens.json directly into Figma Variables or your project\'s design token pipeline for consistency',
      'Re-run extraction after major visual updates to keep your local tokens in sync with the source',
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
  // ─── Craft & Taste ────────────────────────────────────────────────────────
  {
    name: 'Taste Skill',
    domain: 'Craft & Taste',
    what: 'Enforce anti-slop design decisions across UI, motion quality, and frontend architecture. A senior-level filter that raises the bar on every output.',
    whenToUse: 'When reviewing AI-generated or human-produced UI that looks technically correct but feels generic, unfinished, or mediocre.',
    qualityBar: 'Every design decision must be defensible. Generic patterns are flagged. Motion without purpose is removed. Architecture shortcuts are documented as risks. Output is not done until it passes this filter.',
    tools: ['Figma', 'Cursor', 'Claude', 'CSS'],
    teams: ['Design Engineering', 'Product Design', 'Frontend'],
    mdFile: '/skills/taste-skill.md',
    inputs: [
      { label: 'UI component, screen, or codebase to review', required: true },
      { label: 'Current implementation — code or screenshots', required: true },
      { label: 'Target quality bar or reference example', required: false },
      { label: 'Brand guidelines or design system', required: false },
    ],
    outputFields: ['Anti-slop Findings', 'Motion Quality Flags', 'Architecture Recommendations', 'Quality Verdict', 'Priority List'],
    auditCategories: [
      { name: 'Design Decisions', desc: 'Every visual choice must be defensible — no defaults accepted without rationale' },
      { name: 'Motion Quality', desc: 'Purposeless animation flagged and removed; remaining motion must earn its place' },
      { name: 'Frontend Architecture', desc: 'Shortcuts and structural compromises documented with risk assessment' },
      { name: 'Visual Craft', desc: 'Typography, spacing, depth, and colour evaluated against premium standard' },
    ],
    edgeCases: [
      'AI-generated UI that looks technically correct but feels visually generic — surface why it is mediocre',
      'Over-animated interfaces where motion distracts from task completion',
      'Visually complex designs that collapse or lose hierarchy on mobile',
      'Components that pass code review but fail when placed in real content context',
      'Designs that meet every spec but still feel unfinished — document the missing quality signal',
    ],
  },
  {
    name: 'Emil Design Engineering',
    domain: 'Craft & Taste',
    what: 'Apply Emil Kowalski\'s design-engineering philosophy — production-ready frontend craft, animation precision, and the unseen details that make interfaces feel right.',
    whenToUse: 'When reviewing UI code for interaction polish — animations feel off, buttons feel unresponsive, or transitions feel generic.',
    qualityBar: 'Only animate transform and opacity. Buttons must have :active states. Popovers must be origin-aware. No scale(0) entrances. Duration matched to element type: button 100–160ms, tooltip 125–200ms, modal 200–500ms.',
    tools: ['Framer Motion', 'CSS', 'React'],
    teams: ['Design Engineering', 'Frontend', 'Product Design'],
    mdFile: '/skills/emil-design-eng.md',
    inputs: [
      { label: 'UI code or component to review (JSX/CSS)', required: true },
      { label: 'Animation or interaction to assess', required: true },
      { label: 'Target platform: web, iOS, Android', required: false },
    ],
    outputFields: ['Before', 'After', 'Why'],
    auditCategories: [
      { name: 'Animation Quality', desc: 'Easing, duration, and properties — every animation correct or removed' },
      { name: 'Interaction States', desc: 'Hover, active, focus, disabled — all states explicitly designed' },
      { name: 'Visual Polish', desc: 'Origin-aware popovers, grounded entrances, no unrealistic motion' },
      { name: 'Production Readiness', desc: 'prefers-reduced-motion respected, GPU-only properties used' },
    ],
    edgeCases: [
      'Animations running 100+ times/day — remove entirely, never slow down repeated UI',
      'Spring on hover state — use easing instead, springs are for gesture-driven motion',
      'Popover appearing to pop from nowhere — use origin-aware scale from trigger point',
      'Button with no active state — add transform: scale(0.97) on :active',
      'Safari-specific animation rendering differences — test on real device',
    ],
  },
  {
    name: 'Impeccable',
    domain: 'Craft & Taste',
    what: 'Production-grade, anti-generic frontend — the reference standard for what "done" looks like at a high bar.',
    whenToUse: 'When a component or page is ready for final review before shipping. When you need to define the quality standard for a team.',
    qualityBar: 'No placeholder states. No generic animations. No unfinished edge cases. Every pixel intentional. Every interaction considered. Empty, loading, and error states are part of done — not polish.',
    tools: ['React', 'CSS', 'Figma'],
    teams: ['Design Engineering', 'Frontend', 'Product Design'],
    mdFile: '/skills/impeccable.md',
    inputs: [
      { label: 'UI component or page to evaluate', required: true },
      { label: 'Current implementation — code or visual', required: true },
      { label: 'Design intent and user goal', required: false },
    ],
    outputFields: ['Quality Assessment', 'Generic Pattern Flags', 'Polish Recommendations', 'Production Readiness Checklist'],
    auditCategories: [
      { name: 'Completeness', desc: 'Empty, loading, error, and success states all explicitly designed and implemented' },
      { name: 'Generic Pattern Check', desc: 'Default browser styles, boilerplate animations, and placeholder content flagged' },
      { name: 'Interaction Quality', desc: 'Hover, focus, active states — all meaningful and intentional' },
      { name: 'Real Content Test', desc: 'Validated with actual content lengths, not placeholder text' },
    ],
    edgeCases: [
      'Technically correct but visually generic output — surface the specific generic patterns',
      'Components missing empty/error states — these are not optional polish, they are part of done',
      'Designs that pass visual review but fail with real content lengths',
      'Touch interactions that were never tested alongside mouse interactions',
      'Dark mode variants that were specified but never fully implemented',
    ],
  },
  {
    name: 'Soft Skill',
    domain: 'Craft & Taste',
    what: 'Premium visual design guidance for typography, spacing, depth, and animation systems — the soft qualities that separate good from exceptional.',
    whenToUse: 'When a design is functionally complete but still feels flat, tight, or unrefined. When improving visual quality without changing functionality.',
    qualityBar: 'Typography has a clear hierarchy with ≤3 distinct scales. Spacing follows a consistent scale with no deviations. Depth is earned not decorative. Motion feels inevitable, not added.',
    tools: ['Figma', 'CSS', 'Design System'],
    teams: ['Product Design', 'Design Engineering', 'Brand Design'],
    mdFile: '/skills/soft-skill.md',
    inputs: [
      { label: 'Design or component to refine', required: true },
      { label: 'Current typography and spacing system', required: true },
      { label: 'Visual direction or reference aesthetic', required: false },
    ],
    outputFields: ['Typography Refinements', 'Spacing Improvements', 'Depth & Layering Guidance', 'Animation System Recommendations'],
    auditCategories: [
      { name: 'Typography', desc: 'Scale, weight, line-height, tracking — creating clear reading order and hierarchy' },
      { name: 'Spacing Rhythm', desc: 'Consistent 4pt/8pt scale; breathing room creates perceived quality' },
      { name: 'Depth & Layering', desc: 'Shadows and blur must have a consistent light model — not decorative' },
      { name: 'Motion System', desc: 'Defined once, applied everywhere — consistent motion vocabulary' },
    ],
    edgeCases: [
      'Too many competing type sizes — establish a single dominant scale with clear support hierarchy',
      'Spacing that looks right in isolation but creates tension in full layouts',
      'Shadow directions that conflict across a single screen',
      'Motion system that is inconsistent between similar component types',
      'Premium aesthetic on information-dense screens — restraint is a feature',
    ],
  },

  // ─── Motion & Interaction ──────────────────────────────────────────────────
  {
    name: 'Animate',
    domain: 'Motion & Interaction',
    what: 'Design purposeful animation and micro-interactions that support usability and delight — not decoration.',
    whenToUse: 'When adding, reviewing, or speccing animations. When motion feels gratuitous, jarring, or purposeless.',
    qualityBar: 'Every animation must justify itself: spatial consistency, state indication, feedback, explanation, or preventing jarring changes. No animation survives "it looks cool" as its only reason.',
    tools: ['Framer Motion', 'CSS', 'GSAP'],
    teams: ['Design Engineering', 'Frontend', 'Product Design'],
    mdFile: '/skills/animate.md',
    inputs: [
      { label: 'Interaction or animation to design or review', required: true },
      { label: 'User flow context — what just happened, what comes next', required: true },
      { label: 'Platform and performance constraints', required: false },
    ],
    outputFields: ['Animation Specification', 'Micro-interaction Design', 'Timing Recommendations', 'Remove/Keep/Refine Verdict'],
    auditCategories: [
      { name: 'Purpose Check', desc: 'Every animation must have a clear reason: spatial, feedback, state, or transition' },
      { name: 'Frequency Assessment', desc: '100+/day = no animation. Frequent = reduce. Occasional = standard. Rare = optional delight' },
      { name: 'Easing & Duration', desc: 'Enter/Exit → ease-out · Movement → ease-in-out · Button 100–160ms · Modal 200–500ms' },
      { name: 'Reduced Motion', desc: 'Every animation has a prefers-reduced-motion alternative defined' },
    ],
    edgeCases: [
      'Animations that run on every user action — evaluate frequency before adding any motion',
      'State transitions where instant feedback is required — animation adds perceived latency',
      'Complex sequences that break when interrupted mid-animation',
      'Animations that look great at 60fps but degrade on mid-range hardware',
      'Onboarding animations that become annoying on second and third visits',
    ],
  },
  {
    name: '12 Principles of Animation',
    domain: 'Motion & Interaction',
    what: 'Apply Disney\'s 12 classic animation principles to web interfaces — squash & stretch, anticipation, follow-through, and the rest.',
    whenToUse: 'When animations feel mechanically correct but not natural or believable. When motion needs the physical and psychological rules that make it feel real.',
    qualityBar: 'Natural motion follows physics. Timing must match the perceived weight of the element. Exaggeration serves clarity at 10–15% beyond reality. Slow In/Slow Out applied to everything visible.',
    tools: ['Framer Motion', 'GSAP', 'CSS'],
    teams: ['Design Engineering', 'Frontend', 'Product Design'],
    mdFile: '/skills/12-principles-of-animation.md',
    inputs: [
      { label: 'Animation or interaction to evaluate', required: true },
      { label: 'Target element type and context', required: true },
      { label: 'Intended emotional feel', required: false },
    ],
    outputFields: ['Principle Evaluation', 'Violations & Fixes', 'Easing Recommendations', 'Timing Guidance'],
    auditCategories: [
      { name: 'Slow In/Slow Out', desc: 'The minimum — all visible motion uses easing, never linear' },
      { name: 'Anticipation', desc: 'Small preparation before main action increases perceived responsiveness' },
      { name: 'Follow Through', desc: 'Parts finish at different times — exits feel complete, not cut off' },
      { name: 'Timing & Weight', desc: 'Heavy elements move slower; light elements faster — duration matches perceived mass' },
    ],
    edgeCases: [
      'Principles that conflict in a single animation — document the trade-off and choose deliberately',
      'Micro-interactions too small for full principle application — apply only Slow In/Slow Out minimum',
      'High-frequency UI where anticipation adds unwanted latency',
      'Mobile devices where spring physics simulation strains CPU',
      'Exaggeration that exceeds platform conventions (iOS vs Android norms differ)',
    ],
  },
  {
    name: 'Mastering Animate Presence',
    domain: 'Motion & Interaction',
    what: 'Deep dive into Framer Motion AnimatePresence patterns — correct mount, unmount, and transition orchestration.',
    whenToUse: 'When exit animations are not firing, transitions between states feel abrupt, or AnimatePresence behaviour is unpredictable.',
    qualityBar: 'Exit animations must complete before component is removed from DOM. Key props must be stable and unique. Exit variants must be explicitly defined — not just inverted initial states.',
    tools: ['Framer Motion', 'React'],
    teams: ['Design Engineering', 'Frontend'],
    mdFile: '/skills/mastering-animate-presence.md',
    inputs: [
      { label: 'Framer Motion component with enter/exit animations', required: true },
      { label: 'React component context — conditional render, list, or routing', required: true },
      { label: 'Desired transition feel: sequential, overlapping, or staggered', required: false },
    ],
    outputFields: ['AnimatePresence Implementation', 'Mode Recommendation', 'Exit Variant Specification', 'Key Prop Strategy', 'Orchestration Pattern'],
    auditCategories: [
      { name: 'Mode Strategy', desc: 'sync = overlapping · wait = sequential · popLayout = list removal with layout shift' },
      { name: 'Key Management', desc: 'Unique stable keys are the most common source of AnimatePresence bugs' },
      { name: 'Exit Variants', desc: 'Explicit exit prop required — do not rely on inverted initial/animate' },
      { name: 'Tree Position', desc: 'AnimatePresence must be above the conditional — not around the condition' },
    ],
    edgeCases: [
      'AnimatePresence inside a conditional without a key — component never registers as leaving',
      'Nested AnimatePresence causing doubled exit animation duration',
      'Route changes where components need to share exit context across pages',
      'List items where layout shift fights exit animation timing',
      'Custom components not forwarding motion props — exits silently fail',
    ],
  },
  {
    name: 'To Spring or Not to Spring',
    domain: 'Motion & Interaction',
    what: 'Decide when to use spring physics vs. easing — the nuanced judgment that separates mid-level from senior motion work.',
    whenToUse: 'When choosing an animation approach. When a spring feels wrong but you cannot articulate why. When easing feels too mechanical.',
    qualityBar: 'Gesture-driven motion = spring. State-change motion = easing. Never spring on loading states. Never linear easing on anything visible to users.',
    tools: ['Framer Motion', 'GSAP', 'CSS'],
    teams: ['Design Engineering', 'Frontend'],
    mdFile: '/skills/to-spring-or-not-to-spring.md',
    inputs: [
      { label: 'Interaction to evaluate — describe or share code', required: true },
      { label: 'Whether motion is gesture-driven or state-driven', required: true },
      { label: 'Target feel: snappy / fluid / natural / precise', required: false },
    ],
    outputFields: ['Spring vs Easing Recommendation', 'Configuration Parameters', 'Rationale', 'Alternative if Wrong'],
    auditCategories: [
      { name: 'Use Springs When', desc: 'Gesture-driven, interruptible, physical weight needed, delight overshoot desired' },
      { name: 'Use Easing When', desc: 'State-change triggered, precise timing required, lightweight element, loading/data states' },
      { name: 'Spring Configuration', desc: 'stiffness: 300, damping: 30 as starting point — adjust for feel' },
      { name: 'Overshoot Check', desc: 'Test spring overshoot against clipping bounds and adjacent elements' },
    ],
    edgeCases: [
      'Hybrid interactions that start as gesture but end as programmatic state change',
      'Springs that overshoot into clipping bounds or parent overflow: hidden',
      'Mobile devices where spring simulation strains CPU on complex components',
      'Interrupting a spring mid-animation with a new trigger — ensure graceful transition',
      'Drawers and sheets that feel like they need springs but have content-height constraints',
    ],
  },
  {
    name: 'Make Interfaces Feel Better',
    domain: 'Motion & Interaction',
    what: 'Polish micro-interactions, typography details, and visual refinements — the small decisions users never consciously notice but definitely feel.',
    whenToUse: 'When an interface is functionally complete but feels rough, flat, or unfinished. For the final 10% that makes the difference between good and considered.',
    qualityBar: 'Hover states must be immediate. Focus indicators must be visible and intentional. Typography must be optically aligned. Every interaction must provide visible feedback. Loading skeletons must match real content dimensions.',
    tools: ['CSS', 'React', 'Figma'],
    teams: ['Design Engineering', 'Frontend', 'Product Design'],
    mdFile: '/skills/make-interfaces-feel-better.md',
    inputs: [
      { label: 'Interface or component to improve', required: true },
      { label: 'Current implementation', required: true },
      { label: 'Target quality level or reference', required: false },
    ],
    outputFields: ['Micro-interaction Improvements', 'Typography Refinements', 'Visual Detail Polish', 'Priority: Quick Wins vs Deep Work'],
    auditCategories: [
      { name: 'Hover & Focus States', desc: 'Immediate, meaningful, custom — not browser defaults or absent entirely' },
      { name: 'Typography Details', desc: 'Optical alignment, kerning, consistent scale, icon alignment to cap height' },
      { name: 'Loading States', desc: 'Skeletons must match real content shape exactly — generic rectangles do not count' },
      { name: 'Interaction Feedback', desc: 'Every user action has visible confirmation — no silent interactions' },
    ],
    edgeCases: [
      'Data tables where micro-interactions feel out of place — restraint is correct here',
      'Touch interfaces where hover states never trigger — design for tap feedback instead',
      'Accessibility requirements that override custom focus ring styles',
      'Heavy animation on hover states that stutter on mid-range hardware',
      'Skeleton loading states that are wider than the real content they replace',
    ],
  },

  // ─── Systems & Quality ─────────────────────────────────────────────────────
  {
    name: 'Shape',
    domain: 'Systems & Quality',
    what: 'Structured design interview that produces an actionable brief before any coding starts — think before you build.',
    whenToUse: 'Before starting any non-trivial design or build task. When requirements are vague, scope is unclear, or stakeholders have not aligned on success criteria.',
    qualityBar: 'A complete brief must have a falsifiable success metric. Constraints must be explicit. Open questions must be assigned to someone. Scope must define what is NOT being built.',
    tools: ['Notion', 'Figma', 'Miro'],
    teams: ['Product Design', 'Product', 'Design Engineering'],
    mdFile: '/skills/shape.md',
    inputs: [
      { label: 'Feature or problem to brief', required: true },
      { label: 'Existing context, constraints, and requirements', required: true },
      { label: 'Team context: solo, squad, or cross-functional', required: false },
    ],
    outputFields: ['Problem Statement', 'Success Criteria', 'Constraints', 'Scope (In/Out)', 'Open Questions', 'Design Principles'],
    auditCategories: [
      { name: 'User Need', desc: 'What is the user actually trying to do — not the feature being requested' },
      { name: 'Business Goal', desc: 'What does success look like for the product — measurable and falsifiable' },
      { name: 'Constraints', desc: 'Time, tech, system, regulatory — documented before design begins' },
      { name: 'Scope', desc: 'What is in, what is out, what is deferred — explicit on all three' },
    ],
    edgeCases: [
      'Feature requests that are solutions disguised as problems — reframe to the underlying need',
      'Stakeholder requirements that directly contradict each other — surface the conflict before starting',
      'Time constraints that force scope cuts — document what was cut and why',
      'Requests with no clear user need — flag before spending design time',
      'Briefs where success criteria cannot be measured with current instrumentation',
    ],
  },
  {
    name: 'Critique',
    domain: 'Systems & Quality',
    what: 'Structured UX scoring with persona checks and remediation guidance — systematic design review with actionable, documented outputs.',
    whenToUse: 'Before design review meetings. When design quality is inconsistent across a team. When reviews produce discussion but no clear actions.',
    qualityBar: 'Every score must have a specific rationale. Every P0 finding must have remediation. Persona checks must reference actual user goals. Accepted trade-offs must be documented explicitly.',
    tools: ['Figma', 'Notion'],
    teams: ['Product Design', 'UX Research', 'Product'],
    mdFile: '/skills/critique.md',
    inputs: [
      { label: 'Design or prototype to critique', required: true },
      { label: 'Target persona or user type', required: true },
      { label: 'Evaluation criteria (or uses UX heuristics by default)', required: false },
    ],
    outputFields: ['Dimension Scores (1–5)', 'Persona Check Findings', 'Priority Issue List', 'Remediation Guidance', 'Verdict: Ship / Revise / Rework'],
    auditCategories: [
      { name: 'Clarity', desc: 'Is the purpose of this screen immediately clear without instruction?' },
      { name: 'Efficiency', desc: 'Can the user complete the task with minimum steps and cognitive effort?' },
      { name: 'Feedback & Recovery', desc: 'System confirms actions; errors are preventable and recoverable' },
      { name: 'Consistency', desc: 'Matches established patterns within and across the product' },
    ],
    edgeCases: [
      'Designs optimised for one persona that break usability for another',
      'Trade-offs where fixing one dimension measurably degrades another — document the decision',
      'Designs that score well on heuristics but fail in real usability testing',
      'Context-dependent UX that changes radically between desktop and mobile',
      'P0 findings discovered late in a sprint where remediation affects scope significantly',
    ],
  },
  {
    name: 'Redesign Skill',
    domain: 'Systems & Quality',
    what: 'Audit and upgrade existing interfaces to premium quality while preserving all functionality — improvement without disruption.',
    whenToUse: 'When an existing interface needs quality improvement without a full rebuild. When upgrading legacy UI to current design standards.',
    qualityBar: 'Every change must preserve existing functionality. Accessibility improvements take priority over visual changes. No redesign ships without a regression check against existing user flows.',
    tools: ['Figma', 'CSS', 'React'],
    teams: ['Product Design', 'Design Engineering', 'Frontend'],
    mdFile: '/skills/redesign-skill.md',
    inputs: [
      { label: 'Existing interface — screenshots, code, or URL', required: true },
      { label: 'Current functionality that must be preserved', required: true },
      { label: 'Quality target or reference for the upgrade', required: false },
    ],
    outputFields: ['Quality Audit Findings', 'Redesign Recommendations', 'Before/After Comparison', 'Risk Assessment', 'Implementation Priority'],
    auditCategories: [
      { name: 'Visual Quality', desc: 'Typography, spacing, colour, depth — measured against premium standard' },
      { name: 'Interaction Quality', desc: 'Hover states, transitions, feedback — all meaningful and intentional' },
      { name: 'Consistency', desc: 'Pattern adherence across all components in scope' },
      { name: 'Accessibility', desc: 'Contrast, focus, semantic HTML — improvements first, aesthetics second' },
    ],
    edgeCases: [
      'Legacy codebases where CSS specificity makes visual changes risky without regression',
      'Users who have learned the current (even if bad) interaction patterns — migration matters',
      'Shared components used across multiple products where changes have wide blast radius',
      'Accessibility improvements that change visual weight significantly — coordinate with design',
      'Redesigns that expose underlying data model or performance issues',
    ],
  },
  {
    name: 'OKLCH Color Skill',
    domain: 'Systems & Quality',
    what: 'Build consistent, accessible, tunable color systems using OKLCH — the perceptually uniform color space for modern design systems.',
    whenToUse: 'When building or upgrading a design system color palette. When HSL-based colors look inconsistent across hues. When accessibility compliance requires systematic contrast control.',
    qualityBar: 'All interactive element color pairs must meet WCAG AA (4.5:1 text, 3:1 UI). Lightness steps must be perceptually uniform. Semantic color tokens defined separately from primitive tokens.',
    tools: ['Figma', 'CSS', 'Design System'],
    teams: ['Design Engineering', 'Product Design', 'Brand Design'],
    mdFile: '/skills/oklch-skill.md',
    inputs: [
      { label: 'Current color system or brand palette to convert', required: true },
      { label: 'Accessibility requirements — AA or AAA contrast targets', required: true },
      { label: 'Design system context: Figma tokens, CSS variables, Tailwind', required: false },
    ],
    outputFields: ['OKLCH Color Tokens', 'Accessibility Contrast Scores', 'Color Ramps (50–950)', 'CSS Custom Properties', 'Migration Guide'],
    auditCategories: [
      { name: 'Perceptual Uniformity', desc: 'Equal lightness steps look equal across all hues — no more HSL inconsistency' },
      { name: 'Accessibility', desc: 'WCAG AA/AAA compliance baked into the token generation process' },
      { name: 'Token Architecture', desc: 'Primitive tokens separated from semantic tokens — color-blue-500 ≠ color-primary' },
      { name: 'Wide Gamut Ready', desc: 'P3 display support with hex fallbacks for compatibility' },
    ],
    edgeCases: [
      'Brand colors that do not map cleanly to the OKLCH gamut — document the closest match',
      'Dark mode variants where chroma must be reduced to prevent over-saturation',
      'Components with multiple color dependencies — test cascade impact before migrating',
      'Browsers with partial OKLCH support — fallback hex strategy required',
      'Figma Variables sync — OKLCH values need conversion for Figma compatibility currently',
    ],
  },

  // ─── Accessibility ─────────────────────────────────────────────────────────
  {
    name: 'Audit and Fix',
    domain: 'Accessibility',
    what: 'Full accessibility audit and remediation workflow for WCAG issues — systematic fix implementation, not just surface scanning.',
    whenToUse: 'Before any public launch. When an accessibility audit has been flagged. When engineering needs to implement fixes from a design accessibility review.',
    qualityBar: 'All Critical and Serious issues must be resolved before launch. Focus management must be explicitly designed. All interactive elements must be keyboard operable. Every fix must be verified, not just implemented.',
    tools: ['axe', 'Lighthouse', 'VoiceOver', 'NVDA'],
    teams: ['Design Engineering', 'Frontend', 'Product Design'],
    mdFile: '/skills/audit-and-fix.md',
    inputs: [
      { label: 'URL, component, or codebase to audit', required: true },
      { label: 'WCAG target level: A, AA, or AAA', required: true },
      { label: 'Platform context: web, mobile web, or native', required: false },
      { label: 'Screen reader and browser combination to test', required: false },
    ],
    outputFields: ['WCAG Violations', 'Severity Ratings', 'Fix Recommendations', 'Code Snippets', 'Verification Method', 'Remediation Priority'],
    auditCategories: [
      { name: 'Visual Accessibility', desc: 'Color contrast for text (4.5:1 AA), UI components (3:1), and non-text elements' },
      { name: 'Keyboard & Focus', desc: 'Full keyboard navigation; visible, intentional focus indicators on every interactive element' },
      { name: 'Screen Reader Semantics', desc: 'ARIA roles, labels, and descriptions correct; reading order matches visual order' },
      { name: 'Interactive Accessibility', desc: 'Touch targets ≥44×44px; forms labeled; errors associated and descriptive' },
    ],
    edgeCases: [
      'Third-party widgets that cannot be modified — document the issue and provide a workaround',
      'Custom dropdown/combobox patterns where accessibility conflicts with design intent',
      'Dynamic content (modals, toasts, live regions) where focus management is complex',
      'International sites where screen reader support varies significantly by language',
      'Timeout and session management with implications for cognitive accessibility',
    ],
  },
  {
    name: 'WCAG Audit Patterns',
    domain: 'Accessibility',
    what: 'WCAG 2.2 audits combining automated scanning with manual verification patterns — more rigorous than automated tools alone.',
    whenToUse: 'For rigorous WCAG 2.2 compliance testing. When automated tools alone are insufficient. Before accessibility certifications or legal compliance reviews.',
    qualityBar: 'AA compliance is the minimum for public-facing products. Every criterion tested with both automated tools AND manual verification. Screen reader testing is non-negotiable. Retested after every significant UI change.',
    tools: ['axe-core', 'VoiceOver', 'NVDA', 'JAWS', 'Lighthouse'],
    teams: ['Frontend', 'Design Engineering', 'Product Design'],
    mdFile: '/skills/wcag-audit-patterns.md',
    inputs: [
      { label: 'Interface or component to audit', required: true },
      { label: 'WCAG 2.2 target level: A, AA, or AAA', required: true },
      { label: 'Screen reader and browser/OS combination to test', required: false },
      { label: 'Known assistive technology used by your users', required: false },
    ],
    outputFields: ['Automated Findings', 'Manual Check Results', 'WCAG 2.2 Criterion Reference', 'Pattern Violations', 'Remediation Guidance'],
    auditCategories: [
      { name: 'WCAG 2.2 New Criteria', desc: 'Focus Not Obscured, Target Size (24×24px min), Dragging Alternatives, Redundant Entry' },
      { name: 'Automated Detection', desc: 'axe-core / Deque scan covers ~30% of WCAG issues — always required first' },
      { name: 'Manual Verification', desc: 'Keyboard-only navigation, screen reader testing, cognitive load assessment' },
      { name: 'Regression Testing', desc: 'Accessibility test suite that runs on every significant UI change' },
    ],
    edgeCases: [
      'WCAG 2.2 criteria that conflict with patterns established for WCAG 2.1 — document the decision',
      'Complex keyboard interactions (grids, trees, comboboxes) that require bespoke ARIA patterns',
      'Components where full compliance requires significant visual redesign — escalate with evidence',
      'Timeout and session management with implications for cognitive accessibility (SC 2.2.1)',
      'International pages where screen reader + language combinations behave unexpectedly',
    ],
  },

  // ─── Performance ───────────────────────────────────────────────────────────
  {
    name: 'Fixing Motion Performance',
    domain: 'Performance',
    what: 'Fix compositor property issues, layout thrashing, and scroll-linked motion — the CPU-heavy animation problems senior engineers own.',
    whenToUse: 'When animations jank, scroll feels sluggish, or DevTools shows frame drops. When shipping motion-heavy features to users on mid-range hardware.',
    qualityBar: 'Target 60fps (16.7ms per frame) for all visible animations. Scroll-linked animations use IntersectionObserver or CSS scroll-timeline. No layout or paint triggers in animation loops. Only transform and opacity animated on GPU.',
    tools: ['Chrome DevTools', 'CSS', 'React', 'Framer Motion'],
    teams: ['Design Engineering', 'Frontend'],
    mdFile: '/skills/fixing-motion-performance.md',
    inputs: [
      { label: 'Animation or scroll interaction with performance issues', required: true },
      { label: 'Chrome DevTools performance trace or frame rate reading', required: true },
      { label: 'Current implementation (CSS or JS animation code)', required: false },
      { label: 'Target device: desktop, mid-range Android, iOS', required: false },
    ],
    outputFields: ['Performance Diagnosis', 'Compositor Property Fixes', 'Refactored Animation Code', 'Before/After Frame Rate Target', 'will-change Strategy'],
    auditCategories: [
      { name: 'Layout Thrashing', desc: 'Reading and writing DOM layout properties in the same frame — causes forced reflows' },
      { name: 'Non-Compositor Animations', desc: 'width, height, top, left, padding animate layout — replace with transform' },
      { name: 'Scroll Performance', desc: 'Passive scroll listeners + IntersectionObserver + CSS scroll-timeline' },
      { name: 'GPU Strategy', desc: 'Only transform and opacity on GPU; will-change used sparingly as a hint' },
    ],
    edgeCases: [
      'Animations that need to animate layout dimensions (size/position) — use FLIP technique instead',
      'will-change overuse creating excessive GPU memory consumption on mobile',
      'Parallax scroll effects on iOS where GPU memory is tightly constrained',
      'Hardware acceleration creating font rendering differences in Safari',
      'Scroll-linked animations that break on iOS Safari rubber-band overscroll',
    ],
  },
  {
    name: 'Overdrive',
    domain: 'Performance',
    what: 'Build advanced animations, shaders, and ambitious interaction systems — for interfaces that push beyond conventional motion design.',
    whenToUse: 'When standard CSS/JS animation is not sufficient. For WebGL effects, canvas-based systems, complex scroll orchestration, and physics simulations.',
    qualityBar: 'Ambitious animations must degrade gracefully on lower-end hardware. Performance budget defined before building. Every ambitious animation has a reduced-motion alternative. Progressive enhancement fallback built first.',
    tools: ['Three.js', 'WebGL', 'GSAP', 'Framer Motion', 'Canvas 2D'],
    teams: ['Design Engineering', 'Frontend'],
    mdFile: '/skills/overdrive.md',
    inputs: [
      { label: 'Ambitious interaction concept or visual reference', required: true },
      { label: 'Technical constraints: browser support, device targets', required: true },
      { label: 'Performance budget: target fps on what device', required: false },
    ],
    outputFields: ['Implementation Architecture', 'Technology Choice & Rationale', 'Performance Strategy', 'Progressive Enhancement Approach', 'Reduced Motion Alternative'],
    auditCategories: [
      { name: 'Technology Selection', desc: 'WebGL/Three.js, Canvas 2D, GSAP, Houdini, Web Animations API — matched to the goal' },
      { name: 'Performance Budget', desc: 'Define target fps on target device before building — not after profiling' },
      { name: 'Progressive Enhancement', desc: 'Fallback built first; ambitious version layered on top — not the other way' },
      { name: 'Accessibility', desc: 'prefers-reduced-motion alternative required; canvas content needs ARIA fallback' },
    ],
    edgeCases: [
      'WebGL shaders that are GPU-intensive on mobile — profile on real mid-range device before shipping',
      'Complex scroll orchestration that breaks on iOS Safari rubber-band and elastic scroll',
      'Canvas animations that are invisible to the accessibility tree — aria-label and fallback required',
      'WebGL not supported in enterprise browser environments — graceful degradation needed',
      'Ambitious effects that conflict with prefers-reduced-motion — the fallback must still be good',
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
