'use client'

import { useState } from 'react'
import PageHeader from '@/components/playbook/PageHeader'
import SiteFooter from '@/components/glossary/SiteFooter'
import BlobLayer from '@/components/ui/BlobLayer'

interface Tool {
  name: string
  initial: string
  description: string
  use: string
  href?: string
  badge?: string
  gradientFrom: string
  gradientTo: string
  accentColor: string
  logoDomain?: string
}

interface ToolGroup {
  theme: string
  color: string
  tools: Tool[]
}

const groups: ToolGroup[] = [
  {
    theme: 'Capture, Notes & Prompting',
    color: '#9B59FF',
    tools: [
      {
        name: 'Granola',
        initial: 'G',
        logoDomain: 'granola.ai',
        gradientFrom: '#1A0D00',
        gradientTo: '#4D2800',
        accentColor: '#F59E0B',
        badge: 'AI meeting notes',
        use: 'Capture design reviews, PM calls, research calls, decisions, and action items.',
        description: 'AI meeting notes tool for capturing design reviews, PM calls, research calls, decisions, and action items.',
        href: 'https://granola.ai',
      },
      {
        name: 'Wispr Flow',
        initial: 'WF',
        logoDomain: 'wisprflow.ai',
        gradientFrom: '#001020',
        gradientTo: '#00305C',
        accentColor: '#3B82F6',
        badge: 'Voice dictation',
        use: 'Speak long prompts, product thoughts, UX critique, research notes, and feedback instead of typing.',
        description: 'Voice dictation tool. Speak long prompts, product thoughts, UX critique, research notes, and feedback instead of typing.',
        href: 'https://wisprflow.ai',
      },
      {
        name: 'Superwhisper',
        initial: 'SW',
        logoDomain: 'superwhisper.com',
        gradientFrom: '#0D0520',
        gradientTo: '#2D1060',
        accentColor: '#8B5CF6',
        badge: 'Voice-to-text',
        use: 'Dictate prompts, docs, tickets, and design feedback quickly.',
        description: 'Voice-to-text tool. Dictate prompts, docs, tickets, and design feedback quickly.',
        href: 'https://superwhisper.com',
      },
      {
        name: 'Whisper / MacWhisper',
        initial: 'W',
        logoDomain: 'goodsnooze.gumroad.com',
        gradientFrom: '#0A0A0A',
        gradientTo: '#1F2937',
        accentColor: '#9CA3AF',
        badge: 'Transcription',
        use: 'Convert interviews, voice notes, videos, and calls into text.',
        description: 'Transcription tool. Convert interviews, voice notes, videos, and calls into text.',
        href: 'https://goodsnooze.gumroad.com/l/macwhisper',
      },
      {
        name: 'NotebookLM',
        initial: 'NB',
        logoDomain: 'notebooklm.google.com',
        gradientFrom: '#001A2E',
        gradientTo: '#003D6B',
        accentColor: '#4285F4',
        badge: 'Source-based research',
        use: 'Upload docs, PRDs, research notes, and transcripts to ask grounded questions.',
        description: 'Source-based research. Upload docs, PRDs, research notes, and transcripts to ask grounded questions.',
        href: 'https://notebooklm.google.com',
      },
      {
        name: 'Notion AI',
        initial: 'N',
        logoDomain: 'notion.so',
        gradientFrom: '#111111',
        gradientTo: '#2A2A2A',
        accentColor: '#FFFFFF',
        badge: 'Documentation',
        use: 'Clean rough notes, summarize meetings, create decision logs, and organize playbooks.',
        description: 'Documentation tool inside Notion. Clean rough notes, summarize meetings, create decision logs, and organize playbooks.',
        href: 'https://notion.so',
      },
      {
        name: 'Tana / Capacities',
        initial: 'T',
        logoDomain: 'tana.inc',
        gradientFrom: '#0A0820',
        gradientTo: '#1E1B4B',
        accentColor: '#6366F1',
        badge: 'Connected notes',
        use: 'Organize product thinking, research insights, prompts, and references.',
        description: 'Connected notes tools. Organize product thinking, research insights, prompts, and references.',
        href: 'https://tana.inc',
      },
      {
        name: 'Raycast AI',
        initial: 'R',
        logoDomain: 'raycast.com',
        gradientFrom: '#1A0800',
        gradientTo: '#4D1800',
        accentColor: '#F97316',
        badge: 'Daily AI shortcuts',
        use: 'Rewrite selected text, summarize snippets, and trigger quick AI actions.',
        description: 'Daily AI shortcuts. Rewrite selected text, summarize snippets, and trigger quick AI actions.',
        href: 'https://raycast.com',
      },
    ],
  },
  {
    theme: 'Whiteboarding, Flows & Thinking',
    color: '#4FC3F7',
    tools: [
      {
        name: 'tldraw',
        initial: 'tl',
        logoDomain: 'tldraw.com',
        gradientFrom: '#000D1A',
        gradientTo: '#003D5C',
        accentColor: '#0EA5E9',
        badge: 'Infinite canvas',
        use: 'Sketch flows, map journeys, create quick diagrams, and explain system logic visually.',
        description: 'Infinite canvas / whiteboard. Sketch flows, map journeys, create quick diagrams, and explain system logic visually.',
        href: 'https://tldraw.com',
      },
      {
        name: 'Excalidraw',
        initial: 'Ex',
        logoDomain: 'excalidraw.com',
        gradientFrom: '#0D0520',
        gradientTo: '#2D0D60',
        accentColor: '#7C3AED',
        badge: 'Hand-drawn diagrams',
        use: 'Create rough flows, product logic diagrams, workshop sketches, and wireframes.',
        description: 'Hand-drawn diagrams. Create rough flows, product logic diagrams, workshop sketches, and wireframes.',
        href: 'https://excalidraw.com',
      },
      {
        name: 'Mermaid',
        initial: 'Mm',
        logoDomain: 'mermaidchart.com',
        gradientFrom: '#001A10',
        gradientTo: '#004D2E',
        accentColor: '#10B981',
        badge: 'Text-to-diagram',
        use: 'Turn written flows into diagrams using simple text syntax.',
        description: 'Text-to-diagram. Turn written flows into diagrams using simple text syntax.',
        href: 'https://mermaid.js.org',
      },
    ],
  },
  {
    theme: 'Research & References',
    color: '#00CCA8',
    tools: [
      {
        name: 'Mobbin',
        initial: 'Mo',
        logoDomain: 'mobbin.com',
        gradientFrom: '#000814',
        gradientTo: '#001833',
        accentColor: '#3B82F6',
        badge: 'UI reference library',
        use: 'Find real product flows like checkout, onboarding, cancellation, settings, pricing, and empty states.',
        description: 'UI reference library. Find real product flows like checkout, onboarding, cancellation, settings, pricing, and empty states.',
        href: 'https://mobbin.com',
      },
      {
        name: 'Refero',
        initial: 'Rf',
        logoDomain: 'refero.design',
        gradientFrom: '#0A0A14',
        gradientTo: '#1A1A2E',
        accentColor: '#818CF8',
        badge: 'UI/UX reference library',
        use: 'Search web and mobile interface references for visual and interaction patterns.',
        description: 'UI/UX reference library. Search web and mobile interface references for visual and interaction patterns.',
        href: 'https://refero.design',
      },
      {
        name: 'Mobbin MCP',
        initial: 'MM',
        logoDomain: 'mobbin.com',
        gradientFrom: '#000D20',
        gradientTo: '#002040',
        accentColor: '#60A5FA',
        badge: 'AI-accessible UI refs',
        use: 'Let AI tools use Mobbin-style references while generating or critiquing UI.',
        description: 'AI-accessible UI references. Let AI tools use Mobbin-style references while generating or critiquing UI.',
        href: 'https://mobbin.com',
      },
      {
        name: 'Refero MCP',
        initial: 'RM',
        logoDomain: 'refero.design',
        gradientFrom: '#0A0A1A',
        gradientTo: '#1E1B4B',
        accentColor: '#A5B4FC',
        badge: 'AI-accessible UI refs',
        use: 'Let AI agents inspect product screens and flows before giving design suggestions.',
        description: 'AI-accessible UI references. Let AI agents inspect product screens and flows before giving design suggestions.',
        href: 'https://refero.design',
      },
      {
        name: 'Perplexity',
        initial: 'Px',
        logoDomain: 'perplexity.ai',
        gradientFrom: '#0D0A2E',
        gradientTo: '#2D1B6E',
        accentColor: '#7C6BF8',
        badge: 'Fast web research',
        use: 'Find product examples, recent competitor references, and market context.',
        description: 'Fast web research. Find product examples, recent competitor references, and market context.',
        href: 'https://perplexity.ai',
      },
    ],
  },
  {
    theme: 'Prompt-to-UI & Design Generation',
    color: '#FF69DB',
    tools: [
      {
        name: 'Banani',
        initial: 'Ba',
        logoDomain: 'banani.co',
        gradientFrom: '#200010',
        gradientTo: '#5C0028',
        accentColor: '#F43F5E',
        badge: 'Text-to-UI generation',
        use: 'Generate editable UI screens, wireframes, prototypes, and website layouts from prompts or PRDs.',
        description: 'Text-to-UI design generation. Generate editable UI screens, wireframes, prototypes, and website layouts from prompts or PRDs.',
        href: 'https://banani.co',
      },
      {
        name: 'Super Design',
        initial: 'SD',
        logoDomain: 'superdesign.dev',
        gradientFrom: '#080B1A',
        gradientTo: '#1A1F4D',
        accentColor: '#4F46E5',
        badge: 'AI design agent in IDE',
        use: 'Generate UI mockups, components, wireframes, and layouts inside coding tools like Cursor or VS Code.',
        description: 'AI design agent in IDE. Generate UI mockups, components, wireframes, and layouts inside coding tools like Cursor or VS Code.',
        href: 'https://superdesign.dev',
      },
      {
        name: 'Paper',
        initial: 'Pa',
        logoDomain: 'paper.design',
        gradientFrom: '#1A1000',
        gradientTo: '#4D3000',
        accentColor: '#D97706',
        badge: 'AI-friendly design surface',
        use: 'Quickly create HTML-like UI concepts and editable layouts without heavy setup.',
        description: 'AI-friendly design surface. Quickly create HTML-like UI concepts and editable layouts without heavy setup.',
        href: 'https://paper.design',
      },
      {
        name: 'v0',
        initial: 'v0',
        gradientFrom: '#0A0A14',
        gradientTo: '#1A1A2E',
        accentColor: '#6366F1',
        badge: 'Prompt-to-React UI',
        use: 'Generate React/Tailwind components and screens from plain English.',
        description: 'Prompt-to-React UI. Generate React/Tailwind components and screens from plain English.',
        href: 'https://v0.dev',
        logoDomain: 'v0.dev',
      },
      {
        name: 'Lovable',
        initial: 'Lv',
        logoDomain: 'lovable.dev',
        gradientFrom: '#180A20',
        gradientTo: '#3D1A55',
        accentColor: '#D946EF',
        badge: 'AI app prototyping',
        use: 'Build simple web apps, landing pages, dashboards, and internal tools.',
        description: 'AI app prototyping. Build simple web apps, landing pages, dashboards, and internal tools.',
        href: 'https://lovable.dev',
      },
      {
        name: 'Bolt.new',
        initial: 'Bt',
        logoDomain: 'bolt.new',
        gradientFrom: '#0A0A10',
        gradientTo: '#1A1A24',
        accentColor: '#94A3B8',
        badge: 'Browser-based app gen',
        use: 'Generate and run small web apps without local setup.',
        description: 'Browser-based app generation. Generate and run small web apps without local setup.',
        href: 'https://bolt.new',
      },
      {
        name: 'Replit Agent',
        initial: 'Re',
        logoDomain: 'replit.com',
        gradientFrom: '#1A0800',
        gradientTo: '#4D1A00',
        accentColor: '#F97316',
        badge: 'Browser coding workspace',
        use: 'Build small tools, forms, dashboards, and interactive prototypes.',
        description: 'Browser coding workspace. Build small tools, forms, dashboards, and interactive prototypes.',
        href: 'https://replit.com',
      },
      {
        name: 'Uizard',
        initial: 'Ui',
        logoDomain: 'uizard.io',
        gradientFrom: '#001A3D',
        gradientTo: '#00408C',
        accentColor: '#2563EB',
        badge: 'Prompt-to-wireframe',
        use: 'Generate rough wireframes and product concepts quickly.',
        description: 'Prompt-to-wireframe. Generate rough wireframes and product concepts quickly.',
        href: 'https://uizard.io',
      },
      {
        name: 'Galileo AI',
        initial: 'Ga',
        logoDomain: 'usegalileo.ai',
        gradientFrom: '#000A1A',
        gradientTo: '#001A40',
        accentColor: '#1D4ED8',
        badge: 'Prompt-to-interface',
        use: 'Create polished UI directions from written prompts.',
        description: 'Prompt-to-interface. Create polished UI directions from written prompts.',
        href: 'https://usegalileo.ai',
      },
      {
        name: 'Stitch',
        initial: 'St',
        logoDomain: 'stitch.withgoogle.com',
        gradientFrom: '#001A18',
        gradientTo: '#004D40',
        accentColor: '#0D9488',
        badge: 'Prompt-to-UI',
        use: 'Generate app screens and interface directions quickly.',
        description: 'Prompt-to-UI. Generate app screens and interface directions quickly.',
        href: 'https://stitch.withgoogle.com',
      },
    ],
  },
  {
    theme: 'Vibe Coding & Design-to-Code',
    color: '#FB923C',
    tools: [
      {
        name: 'Cursor',
        initial: 'Cur',
        logoDomain: 'cursor.com',
        gradientFrom: '#001520',
        gradientTo: '#003D5C',
        accentColor: '#0EA5E9',
        badge: 'AI code editor',
        use: 'Edit UI, create components, fix layout issues, explain code, and build prototypes.',
        description: 'AI code editor. Edit UI, create components, fix layout issues, explain code, and build prototypes.',
        href: 'https://cursor.com',
      },
      {
        name: 'Claude Code',
        initial: 'CC',
        logoDomain: 'claude.ai',
        gradientFrom: '#1A0D00',
        gradientTo: '#4D2800',
        accentColor: '#FB923C',
        badge: 'Agentic coding',
        use: 'Ask an agent to inspect files, make UI changes, explain code, or implement small flows.',
        description: 'Agentic coding. Ask an agent to inspect files, make UI changes, explain code, or implement small flows.',
        href: 'https://claude.ai/code',
      },
      {
        name: 'Codex',
        initial: 'Cx',
        logoDomain: 'openai.com',
        gradientFrom: '#001A0D',
        gradientTo: '#003D1F',
        accentColor: '#10B981',
        badge: 'Coding agent',
        use: 'Generate, refactor, explain, and test code from plain English.',
        description: 'Coding agent. Generate, refactor, explain, and test code from plain English.',
        href: 'https://openai.com/codex',
      },
      {
        name: 'GitHub Desktop',
        initial: 'GH',
        logoDomain: 'github.com',
        gradientFrom: '#080B0F',
        gradientTo: '#1A2033',
        accentColor: '#8B949E',
        badge: 'Beginner-friendly Git',
        use: 'Commit changes, switch branches, and create small PRs without terminal-heavy workflows.',
        description: 'Beginner-friendly Git. Commit changes, switch branches, and create small PRs without terminal-heavy workflows.',
        href: 'https://desktop.github.com',
      },
      {
        name: 'Locofy',
        initial: 'Lc',
        logoDomain: 'locofy.ai',
        gradientFrom: '#140A20',
        gradientTo: '#3D1A60',
        accentColor: '#9333EA',
        badge: 'Design-to-code',
        use: 'Convert Figma screens into front-end starting points.',
        description: 'Design-to-code. Convert Figma screens into front-end starting points.',
        href: 'https://locofy.ai',
      },
      {
        name: 'Anima',
        initial: 'An',
        logoDomain: 'animaapp.com',
        gradientFrom: '#1A0814',
        gradientTo: '#4D1833',
        accentColor: '#EC4899',
        badge: 'Design-to-code',
        use: 'Export Figma designs into HTML, React, or other code formats.',
        description: 'Design-to-code. Export Figma designs into HTML, React, or other code formats.',
        href: 'https://animaapp.com',
      },
      {
        name: 'Vercel',
        initial: 'Ve',
        logoDomain: 'vercel.com',
        gradientFrom: '#050505',
        gradientTo: '#151515',
        accentColor: '#EEEEEE',
        badge: 'Prototype deployment',
        use: 'Deploy vibe-coded prototypes and share live URLs.',
        description: 'Prototype deployment. Deploy vibe-coded prototypes and share live URLs.',
        href: 'https://vercel.com',
      },
      {
        name: 'Netlify',
        initial: 'Nt',
        logoDomain: 'netlify.com',
        gradientFrom: '#001A18',
        gradientTo: '#00404D',
        accentColor: '#00D4AA',
        badge: 'Prototype deployment',
        use: 'Publish lightweight static sites, landing pages, and front-end experiments.',
        description: 'Prototype deployment. Publish lightweight static sites, landing pages, and front-end experiments.',
        href: 'https://netlify.com',
      },
    ],
  },
  {
    theme: 'Workflow Automation & Integrations',
    color: '#E8C840',
    tools: [
      {
        name: 'n8n',
        initial: 'n8',
        logoDomain: 'n8n.io',
        gradientFrom: '#1A0800',
        gradientTo: '#4D1200',
        accentColor: '#EF4444',
        badge: 'Workflow automation',
        use: 'Create internal automations, AI workflows, alerts, summaries, and tool-to-tool handoffs.',
        description: 'Workflow automation. Create internal automations, AI workflows, alerts, summaries, and tool-to-tool handoffs.',
        href: 'https://n8n.io',
      },
      {
        name: 'Zapier',
        initial: 'Za',
        logoDomain: 'zapier.com',
        gradientFrom: '#1A0A00',
        gradientTo: '#4D2000',
        accentColor: '#FF4A00',
        badge: 'App integrations',
        use: 'Connect Slack, Gmail, Notion, Airtable, Sheets, forms, and webhooks.',
        description: 'App integrations. Connect Slack, Gmail, Notion, Airtable, Sheets, forms, and webhooks.',
        href: 'https://zapier.com',
      },
      {
        name: 'Make',
        initial: 'Mk',
        logoDomain: 'make.com',
        gradientFrom: '#120A20',
        gradientTo: '#2D1A55',
        accentColor: '#7C3AED',
        badge: 'Visual automation',
        use: 'Build multi-step automations with conditions and branching.',
        description: 'Visual automation. Build multi-step automations with conditions and branching.',
        href: 'https://make.com',
      },
      {
        name: 'Airtable',
        initial: 'At',
        logoDomain: 'airtable.com',
        gradientFrom: '#001A10',
        gradientTo: '#004D30',
        accentColor: '#059669',
        badge: 'Lightweight database',
        use: 'Create research repos, design QA trackers, prompt libraries, content trackers, and ops dashboards.',
        description: 'Lightweight database. Create research repos, design QA trackers, prompt libraries, content trackers, and ops dashboards.',
        href: 'https://airtable.com',
      },
      {
        name: 'Google Sheets',
        initial: 'GS',
        logoDomain: 'google.com',
        gradientFrom: '#001A0D',
        gradientTo: '#003D1F',
        accentColor: '#0F9D58',
        badge: 'Lightweight automation',
        use: 'Build trackers, formulas, scripts, and small internal utilities.',
        description: 'Lightweight automation. Build trackers, formulas, scripts, and small internal utilities.',
        href: 'https://sheets.google.com',
      },
      {
        name: 'Composio',
        initial: 'Co',
        logoDomain: 'composio.dev',
        gradientFrom: '#001020',
        gradientTo: '#002040',
        accentColor: '#2563EB',
        badge: 'Agent integrations',
        use: 'Let AI agents connect to tools and perform actions with approvals.',
        description: 'Agent integrations. Let AI agents connect to tools and perform actions with approvals. Better for slightly advanced users.',
        href: 'https://composio.dev',
      },
    ],
  },
  {
    theme: 'Browser Agents, UI Screening & QA',
    color: '#FF6B6B',
    tools: [
      {
        name: 'Playwright',
        initial: 'Pl',
        logoDomain: 'playwright.dev',
        gradientFrom: '#001A10',
        gradientTo: '#004D30',
        accentColor: '#00B050',
        badge: 'Browser testing',
        use: 'Open pages, click through flows, test UI states, capture screenshots, and detect broken experiences.',
        description: 'Browser testing and screenshots. Open pages, click through flows, test UI states, capture screenshots, and detect broken experiences.',
        href: 'https://playwright.dev',
      },
      {
        name: 'Browser Use',
        initial: 'BU',
        logoDomain: 'browser-use.com',
        gradientFrom: '#000D1A',
        gradientTo: '#002040',
        accentColor: '#3B82F6',
        badge: 'Browser automation',
        use: 'Let AI agents interact with websites, extract information, and test flows.',
        description: 'Browser automation for agents. Let AI agents interact with websites, extract information, and test flows.',
        href: 'https://browser-use.com',
      },
      {
        name: 'Agentation',
        initial: 'Ag',
        logoDomain: 'agentation.com',
        gradientFrom: '#0A0A10',
        gradientTo: '#1A1A28',
        accentColor: '#64748B',
        badge: 'Browser prompting',
        use: 'Prompt a browser agent to inspect, compare, and operate websites.',
        description: 'Browser prompting. Prompt a browser agent to inspect, compare, and operate websites.',
        href: 'https://agentation.com',
      },
      {
        name: 'Dialkit',
        initial: 'Dk',
        logoDomain: 'dialkit.com',
        gradientFrom: '#0A0A14',
        gradientTo: '#14141E',
        accentColor: '#6B7280',
        badge: 'Web agents',
        use: 'Run browser-based prompting and workflow execution. Best kept as experimental.',
        description: 'Browser prompting / web agents. Run browser-based prompting and workflow execution. Best kept as experimental.',
        href: 'https://dialkit.com',
      },
      {
        name: 'CleanShot X',
        initial: 'CS',
        logoDomain: 'cleanshot.com',
        gradientFrom: '#080B1A',
        gradientTo: '#1A1F3D',
        accentColor: '#6366F1',
        badge: 'Screenshot & annotation',
        use: 'Capture UI bugs, annotate issues, record short videos, and share QA notes.',
        description: 'Screenshot and annotation. Capture UI bugs, annotate issues, record short videos, and share QA notes.',
        href: 'https://cleanshot.com',
      },
      {
        name: 'Scribe',
        initial: 'Sc',
        logoDomain: 'scribehow.com',
        gradientFrom: '#001428',
        gradientTo: '#003355',
        accentColor: '#2563EB',
        badge: 'Process documentation',
        use: 'Auto-create step-by-step guides from actions.',
        description: 'Process documentation. Auto-create step-by-step guides from actions.',
        href: 'https://scribehow.com',
      },
      {
        name: 'Loom',
        initial: 'Lo',
        logoDomain: 'loom.com',
        gradientFrom: '#180A14',
        gradientTo: '#4D1833',
        accentColor: '#E11D48',
        badge: 'Async walkthroughs',
        use: 'Record design reviews, prototype demos, bug explanations, and handoff videos.',
        description: 'Async walkthroughs. Record design reviews, prototype demos, bug explanations, and handoff videos.',
        href: 'https://loom.com',
      },
      {
        name: 'Screen Studio',
        initial: 'SS',
        logoDomain: 'screen.studio',
        gradientFrom: '#080808',
        gradientTo: '#181818',
        accentColor: '#A0A0A0',
        badge: 'Polished product videos',
        use: 'Create clean product walkthroughs and demo videos.',
        description: 'Polished product videos. Create clean product walkthroughs and demo videos.',
        href: 'https://screen.studio',
      },
    ],
  },
  {
    theme: 'Visual Exploration, Imagery & Motion',
    color: '#00D4FF',
    tools: [
      {
        name: 'Krea',
        initial: 'Kr',
        logoDomain: 'krea.ai',
        gradientFrom: '#000D1A',
        gradientTo: '#001F3D',
        accentColor: '#3B82F6',
        badge: 'AI image generation',
        use: 'Create visuals, icons, style explorations, and campaign imagery.',
        description: 'AI image generation and editing. Create visuals, icons, style explorations, and campaign imagery.',
        href: 'https://krea.ai',
      },
      {
        name: 'Midjourney',
        initial: 'MJ',
        logoDomain: 'midjourney.com',
        gradientFrom: '#0A0520',
        gradientTo: '#2C1060',
        accentColor: '#8B5CF6',
        badge: 'High-quality image gen',
        use: 'Generate moodboards, visual territories, concept imagery, and campaign directions.',
        description: 'High-quality image generation. Generate moodboards, visual territories, concept imagery, and campaign directions.',
        href: 'https://midjourney.com',
      },
      {
        name: 'Runway',
        initial: 'RW',
        logoDomain: 'runwayml.com',
        gradientFrom: '#180008',
        gradientTo: '#4D0020',
        accentColor: '#EC4899',
        badge: 'AI video & motion',
        use: 'Generate short videos, motion experiments, and cinematic visual treatments.',
        description: 'AI video and motion. Generate short videos, motion experiments, and cinematic visual treatments.',
        href: 'https://runwayml.com',
      },
      {
        name: 'ElevenLabs',
        initial: '11',
        logoDomain: 'elevenlabs.io',
        gradientFrom: '#000D1A',
        gradientTo: '#002040',
        accentColor: '#38BDF8',
        badge: 'Voice generation',
        use: 'Create narration, audio mockups, and voice concepts.',
        description: 'Voice generation. Create narration, audio mockups, and voice concepts.',
        href: 'https://elevenlabs.io',
      },
      {
        name: 'Rive',
        initial: 'Rv',
        logoDomain: 'rive.app',
        gradientFrom: '#0A0510',
        gradientTo: '#200A28',
        accentColor: '#A855F7',
        badge: 'Interactive motion',
        use: 'Create production-ready interactive animations and state-based motion.',
        description: 'Interactive motion. Create production-ready interactive animations and state-based motion.',
        href: 'https://rive.app',
      },
      {
        name: 'LottieFiles',
        initial: 'LF',
        logoDomain: 'lottiefiles.com',
        gradientFrom: '#001A18',
        gradientTo: '#004040',
        accentColor: '#14B8A6',
        badge: 'Animation handoff',
        use: 'Preview, manage, and export lightweight animations.',
        description: 'Animation handoff. Preview, manage, and export lightweight animations.',
        href: 'https://lottiefiles.com',
      },
      {
        name: 'Jitter',
        initial: 'Ji',
        logoDomain: 'jitter.video',
        gradientFrom: '#100A20',
        gradientTo: '#2D1855',
        accentColor: '#7C3AED',
        badge: 'Motion design',
        use: 'Quickly animate UI, social posts, product moments, and lightweight motion concepts.',
        description: 'Motion design. Quickly animate UI, social posts, product moments, and lightweight motion concepts.',
        href: 'https://jitter.video',
      },
    ],
  },
  {
    theme: 'Presentation & Storytelling',
    color: '#FF8A65',
    tools: [
      {
        name: 'Gamma',
        initial: 'Gm',
        logoDomain: 'gamma.app',
        gradientFrom: '#0D0520',
        gradientTo: '#2D1060',
        accentColor: '#8B5CF6',
        badge: 'AI presentation builder',
        use: 'Turn rough ideas into structured decks, concept pitches, and workshop material.',
        description: 'AI presentation builder. Turn rough ideas into structured decks, concept pitches, and workshop material.',
        href: 'https://gamma.app',
      },
      {
        name: 'Tome',
        initial: 'Tm',
        logoDomain: 'tome.app',
        gradientFrom: '#0A0A0A',
        gradientTo: '#1E1E1E',
        accentColor: '#CCCCCC',
        badge: 'Narrative presentation',
        use: 'Build visual stories, concept decks, and product narratives.',
        description: 'Narrative presentation. Build visual stories, concept decks, and product narratives.',
        href: 'https://tome.app',
      },
      {
        name: 'Pitch',
        initial: 'Pi',
        logoDomain: 'pitch.com',
        gradientFrom: '#000A1A',
        gradientTo: '#001A40',
        accentColor: '#3B82F6',
        badge: 'Collaborative decks',
        use: 'Create clean team presentations and design review decks.',
        description: 'Collaborative decks. Create clean team presentations and design review decks.',
        href: 'https://pitch.com',
      },
      {
        name: 'Canva',
        initial: 'Cv',
        logoDomain: 'canva.com',
        gradientFrom: '#001A1A',
        gradientTo: '#003340',
        accentColor: '#00C4CC',
        badge: 'Design & presentation',
        use: 'Create quick social assets, event graphics, basic decks, and internal comms.',
        description: 'Lightweight design and presentation. Create quick social assets, event graphics, basic decks, and internal comms.',
        href: 'https://canva.com',
      },
      {
        name: 'Screen Studio',
        initial: 'SS',
        logoDomain: 'screen.studio',
        gradientFrom: '#080808',
        gradientTo: '#181818',
        accentColor: '#A0A0A0',
        badge: 'Product demo videos',
        use: 'Create polished walkthroughs for leadership, PMs, and engineers.',
        description: 'Product demo videos. Create polished walkthroughs for leadership, PMs, and engineers.',
        href: 'https://screen.studio',
      },
      {
        name: 'Loom',
        initial: 'Lo',
        logoDomain: 'loom.com',
        gradientFrom: '#180A14',
        gradientTo: '#4D1833',
        accentColor: '#E11D48',
        badge: 'Async storytelling',
        use: 'Explain decisions, design changes, and prototypes without scheduling meetings.',
        description: 'Async storytelling. Explain decisions, design changes, and prototypes without scheduling meetings.',
        href: 'https://loom.com',
      },
    ],
  },
]

function ToolCard({ tool }: { tool: Tool }) {
  const [logoFailed, setLogoFailed] = useState(false)

  const cardStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 18,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    transition: 'border-color 0.18s ease, transform 0.22s ease, box-shadow 0.22s ease',
    height: '100%',
    cursor: tool.href ? 'pointer' : 'default',
    textDecoration: 'none',
  }

  const inner = (
    <div
      style={cardStyle}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.5)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* ── Card header — gradient art ──────────────────────── */}
      <div style={{
        position: 'relative',
        height: 120,
        background: `linear-gradient(145deg, ${tool.gradientFrom} 0%, ${tool.gradientTo} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        overflow: 'hidden',
      }}>
        {/* Subtle radial glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${tool.accentColor}20 0%, transparent 70%)`,
        }} />
        {/* Bottom fade into card body */}
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, height: 48,
          background: 'linear-gradient(to bottom, transparent, rgba(8,0,18,0.85))',
          pointerEvents: 'none',
        }} />

        {/* Logo or initials badge */}
        {!logoFailed && tool.logoDomain ? (
          <div style={{
            position: 'relative', zIndex: 1,
            width: 52, height: 52, borderRadius: 14,
            background: 'rgba(255,255,255,0.96)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
            overflow: 'hidden',
            flexShrink: 0,
          }}>
            <img
              src={`https://logo.clearbit.com/${tool.logoDomain}`}
              width={34}
              height={34}
              alt={tool.name}
              style={{ objectFit: 'contain', display: 'block' }}
              onError={() => setLogoFailed(true)}
            />
          </div>
        ) : (
          <div style={{
            position: 'relative', zIndex: 1,
            width: 52, height: 52, borderRadius: 14,
            background: `${tool.accentColor}22`,
            border: `1.5px solid ${tool.accentColor}55`,
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 24px ${tool.accentColor}30`,
          }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: tool.initial.length > 2 ? 12 : 16,
              fontWeight: 700,
              color: tool.accentColor,
              letterSpacing: '-0.02em',
            }}>
              {tool.initial}
            </span>
          </div>
        )}
      </div>

      {/* ── Card body ──────────────────────────────────────── */}
      <div style={{ padding: '14px 16px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>

        {/* Name + badge row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 6 }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 15, fontWeight: 700, color: '#ffffff', lineHeight: 1.25,
          }}>
            {tool.name}
          </span>
          {tool.badge && (
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: 10, fontWeight: 500,
              color: tool.accentColor,
              background: `${tool.accentColor}18`,
              border: `1px solid ${tool.accentColor}30`,
              borderRadius: 100,
              padding: '2px 6px',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              marginTop: 2,
            }}>
              {tool.badge}
            </span>
          )}
        </div>

        {/* Use case */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 12, color: 'rgba(255,255,255,0.42)',
          lineHeight: 1.6, margin: 0,
        }}>
          {tool.use}
        </p>
      </div>
    </div>
  )

  if (tool.href) {
    return (
      <a
        href={tool.href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none', display: 'block' }}
      >
        {inner}
      </a>
    )
  }
  return inner
}

export default function ToolsPage() {
  return (
    <div style={{ position: 'relative', overflow: 'clip', minHeight: '100vh' }}>
      <BlobLayer />
      <div style={{
        position: 'relative', zIndex: 1,
        padding: '24px clamp(20px,4vw,48px) 16px',
        maxWidth: 1040, margin: '0 auto',
      }}>
        <PageHeader
          title="Tools"
          description="Daily AI tool stack for vibe-coding designers — 9 categories, 60+ tools."
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          {groups.map((group, gi) => (
            <div key={group.theme} className="animate-fade-up" style={{ animationDelay: `${gi * 40}ms` }}>

              {/* Section label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: group.color, flexShrink: 0 }} />
                <h2 style={{
                  fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700,
                  textTransform: 'uppercase' as const, letterSpacing: '0.14em', color: group.color,
                  margin: 0,
                }}>
                  {group.theme}
                </h2>
                <div style={{ flex: 1, height: 1, background: `${group.color}20` }} />
              </div>

              {/* Card grid — 2 cols mobile, 3-4 cols desktop */}
              <div
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                style={{ gap: 12 }}
              >
                {group.tools.map(tool => (
                  <ToolCard key={`${group.theme}-${tool.name}`} tool={tool} />
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
