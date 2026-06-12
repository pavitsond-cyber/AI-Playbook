'use client'

import { useState, useEffect } from 'react'
import { ExternalLink } from 'lucide-react'
import PageHeader from '@/components/playbook/PageHeader'
import StickyTabs from '@/components/playbook/StickyTabs'

/* Stable slug matching the id= on each card in the search index */
function toolSlug(name: string) {
  return 'tool-' + name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '')
}

const BP = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

/* ────────────────────────────────────────────────────────────────────────────
   Data types
──────────────────────────────────────────────────────────────────────────── */
interface Tool {
  name: string
  initial: string
  use: string
  href?: string
  accentColor: string
  logoDomain?: string
  localLogo?: string
}

interface ToolGroup {
  theme: string
  tab: string    /* one of the 4 content tab keys below */
  color: string
  tools: Tool[]
}

/* ── 7 tabs: All + 6 categories ──────────────────────────────────────────── */
const TABS = ['All', 'Organize', 'Brainstorm', 'Reference', 'Create & Build', 'Audio & Visuals', 'MCP']

const A = (f: string) => `${BP}/Assets/${f}`   /* shorthand for Assets path */

/* ── Tool groups — each tagged with one of the 6 content tabs ────────────── */
const groups: ToolGroup[] = [
  {
    theme: 'Organize', tab: 'Organize', color: '#9B59FF',
    tools: [
      { name: 'Granola',    initial: 'G',  localLogo: A('Granola.jpg'),          accentColor: '#F59E0B', use: 'Capture design reviews, PM calls, research calls, decisions, and action items.',        href: 'https://granola.ai' },
      { name: 'NotebookLM', initial: 'NB', localLogo: A('Notebook LLM.jpg'),     accentColor: '#4285F4', use: 'Upload docs, PRDs, research notes, and transcripts to ask grounded questions.',         href: 'https://notebooklm.google.com' },
      { name: 'Notion AI',  initial: 'N',  localLogo: A('Notion.jpg'),           accentColor: '#FFFFFF', use: 'Clean rough notes, summarize meetings, create decision logs, and organize playbooks.',  href: 'https://notion.so' },
      { name: 'Airtable',   initial: 'At', localLogo: A('Airtable.jpg'),         accentColor: '#059669', use: 'Create research repos, design QA trackers, prompt libraries, and ops dashboards.',      href: 'https://airtable.com' },
      { name: 'Scribe',     initial: 'Sc', localLogo: A('scribe.jpg'),           accentColor: '#2563EB', use: 'Auto-create step-by-step guides from actions.',                                         href: 'https://scribehow.com' },
    ],
  },
  {
    theme: 'Brainstorm', tab: 'Brainstorm', color: '#4FC3F7',
    tools: [
      { name: 'Excalidraw', initial: 'Ex', localLogo: A('Excalidraw.jpg'),       accentColor: '#7C3AED', use: 'Create rough flows, product logic diagrams, workshop sketches, and wireframes.',        href: 'https://excalidraw.com' },
      { name: 'tldraw',     initial: 'tl', localLogo: A('tldraw.jpg'),           accentColor: '#0EA5E9', use: 'Sketch flows, map journeys, create quick diagrams, and explain system logic visually.', href: 'https://tldraw.com' },
      { name: 'Mermaid',    initial: 'Mm', localLogo: A('Mermaid.jpg'),          accentColor: '#10B981', use: 'Turn written flows into diagrams using simple text syntax.',                            href: 'https://mermaid.js.org' },
    ],
  },
  {
    theme: 'Reference', tab: 'Reference', color: '#00CCA8',
    tools: [
      { name: 'Mobbin', initial: 'Mo', localLogo: A('mobbin.jpg'), accentColor: '#3B82F6', use: 'Find real product flows like checkout, onboarding, cancellation, settings, and empty states.', href: 'https://mobbin.com' },
      { name: 'Refero', initial: 'Rf', localLogo: A('Refero.jpg'), accentColor: '#818CF8', use: 'Search web and mobile interface references for visual and interaction patterns.',              href: 'https://refero.design' },
    ],
  },
  {
    theme: 'Create & Build', tab: 'Create & Build', color: '#FF69DB',
    tools: [
      { name: 'Banani',         initial: 'Ba',  localLogo: A('Banani.jpg'),         accentColor: '#F43F5E', use: 'Generate editable UI screens, wireframes, prototypes, and website layouts from prompts or PRDs.', href: 'https://banani.co' },
      { name: 'Galileo AI',     initial: 'Ga',  localLogo: A('Galelio.jpg'),        accentColor: '#1D4ED8', use: 'Create polished UI directions from written prompts.',                                            href: 'https://usegalileo.ai' },
      { name: 'Krea',           initial: 'Kr',  localLogo: A('Krea.jpg'),           accentColor: '#3B82F6', use: 'Create visuals, icons, style explorations, and campaign imagery.',                              href: 'https://krea.ai' },
      { name: 'Midjourney',     initial: 'MJ',  localLogo: A('Midjourney.jpg'),     accentColor: '#8B5CF6', use: 'Generate moodboards, visual territories, concept imagery, and campaign directions.',            href: 'https://midjourney.com' },
      { name: 'Gamma',          initial: 'Gm',  localLogo: A('Gamma.jpg'),          accentColor: '#8B5CF6', use: 'Turn rough ideas into structured decks, concept pitches, and workshop material.',               href: 'https://gamma.app' },
      { name: 'Pitch',          initial: 'Pi',  logoDomain: 'pitch.com',            accentColor: '#3B82F6', use: 'Create clean team presentations and design review decks.',                                      href: 'https://pitch.com' },
      { name: 'Tome',           initial: 'To',  localLogo: A('Tome.jpg'),           accentColor: '#FF4DFF', use: 'Create AI-powered presentations and visual narratives.',                                        href: 'https://tome.app' },
      { name: 'Paper',          initial: 'Pa',  localLogo: A('Paper.jpg'),          accentColor: '#D97706', use: 'Quickly create HTML-like UI concepts and editable layouts without heavy setup.',                href: 'https://paper.design' },
      { name: 'Super Design',   initial: 'SD',  localLogo: A('Super design.jpg'),   accentColor: '#4F46E5', use: 'Generate UI mockups, components, and layouts inside coding tools like Cursor or VS Code.',     href: 'https://superdesign.dev' },
      { name: 'Claude Code',    initial: 'CC',  localLogo: A('Claude.jpg'),         accentColor: '#FB923C', use: 'Ask an agent to inspect files, make UI changes, explain code, or implement small flows.',      href: 'https://claude.ai/code' },
      { name: 'Codex',          initial: 'Cx',  localLogo: A('Codex.jpg'),          accentColor: '#10B981', use: 'Generate, refactor, explain, and test code from plain English.',                               href: 'https://openai.com/codex' },
      { name: 'Cursor',         initial: 'Cur', localLogo: A('Cursor.jpg'),         accentColor: '#0EA5E9', use: 'Edit UI, create components, fix layout issues, explain code, and build prototypes.',           href: 'https://cursor.com' },
      { name: 'Replit Agent',   initial: 'Re',  localLogo: A('replit.jpg'),         accentColor: '#F97316', use: 'Build small tools, forms, dashboards, and interactive prototypes.',                            href: 'https://replit.com' },
      { name: 'GitHub Desktop', initial: 'GH',  localLogo: A('Github.jpg'),         accentColor: '#8B949E', use: 'Commit changes, switch branches, and create small PRs without terminal-heavy workflows.',     href: 'https://desktop.github.com' },
      { name: 'Playwright',     initial: 'Pl',  localLogo: A('Playwright.jpg'),     accentColor: '#00B050', use: 'Open pages, click through flows, test UI states, and detect broken experiences.',             href: 'https://playwright.dev' },
      { name: 'Vercel',         initial: 'Ve',  localLogo: A('Vercel.jpg'),         accentColor: '#EEEEEE', use: 'Deploy vibe-coded prototypes and share live URLs.',                                            href: 'https://vercel.com' },
      { name: 'Make',           initial: 'Mk',  localLogo: A('Make.jpg'),           accentColor: '#7C3AED', use: 'Build multi-step automations with conditions and branching.',                                  href: 'https://make.com' },
      { name: 'n8n',            initial: 'n8',  localLogo: A('N8N.jpg'),            accentColor: '#EF4444', use: 'Create internal automations, AI workflows, alerts, summaries, and tool-to-tool handoffs.',    href: 'https://n8n.io' },
      { name: 'Zapier',         initial: 'Za',  localLogo: A('zapier.jpg'),         accentColor: '#FF4A00', use: 'Connect Slack, Gmail, Notion, Airtable, Sheets, forms, and webhooks.',                       href: 'https://zapier.com' },
      { name: 'Raycast AI',     initial: 'R',   localLogo: A('Raycast.jpg'),        accentColor: '#F97316', use: 'Rewrite selected text, summarize snippets, and trigger quick AI actions.',                   href: 'https://raycast.com' },
      { name: 'Agentation',     initial: 'Ag',  localLogo: A('Agentation.jpg'),     accentColor: '#64748B', use: 'Prompt a browser agent to inspect, compare, and operate websites.',                          href: 'https://agentation.com' },
    ],
  },
  {
    theme: 'Audio & Visuals', tab: 'Audio & Visuals', color: '#00D4FF',
    tools: [
      { name: 'Jitter',      initial: 'Ji', localLogo: A('Jitter.jpg'),      accentColor: '#7C3AED', use: 'Quickly animate UI, social posts, product moments, and lightweight motion concepts.',    href: 'https://jitter.video' },
      { name: 'LottieFiles', initial: 'LF', localLogo: A('lottie.jpg'),      accentColor: '#14B8A6', use: 'Preview, manage, and export lightweight animations.',                                    href: 'https://lottiefiles.com' },
      { name: 'Rive',        initial: 'Rv', localLogo: A('Rive.jpg'),        accentColor: '#A855F7', use: 'Create production-ready interactive animations and state-based motion.',                  href: 'https://rive.app' },
      { name: 'Runway',      initial: 'RW', localLogo: A('Runway.jpg'),      accentColor: '#EC4899', use: 'Generate short videos, motion experiments, and cinematic visual treatments.',            href: 'https://runwayml.com' },
      { name: 'ElevenLabs',  initial: '11', localLogo: A('Eleven labs.jpg'), accentColor: '#38BDF8', use: 'Create narration, audio mockups, and voice concepts.',                                   href: 'https://elevenlabs.io' },
    ],
  },
  {
    theme: 'MCP', tab: 'MCP', color: '#7C3AED',
    tools: [
      { name: 'Mobbin MCP', initial: 'MM', localLogo: A('mobbin.jpg'), accentColor: '#60A5FA', use: 'Let AI tools use Mobbin-style references while generating or critiquing UI.',            href: 'https://mobbin.com' },
      { name: 'Refero MCP', initial: 'RM', localLogo: A('Refero.jpg'), accentColor: '#A5B4FC', use: 'Let AI agents inspect product screens and flows before giving design suggestions.', href: 'https://refero.design' },
    ],
  },
]

/* ────────────────────────────────────────────────────────────────────────────
   Logo loading — 2 levels: Clearbit → Google favicon → initials
   No local files required — loads directly from CDN on every page view.
──────────────────────────────────────────────────────────────────────────── */
type LogoState = 'clearbit' | 'favicon' | 'initials'

/* ────────────────────────────────────────────────────────────────────────────
   Tool card
──────────────────────────────────────────────────────────────────────────── */
function ToolCard({ tool }: { tool: Tool }) {
  const [logoState, setLogoState] = useState<LogoState>('clearbit')
  const [hovered, setHovered]     = useState(false)

  const clearbitUrl = tool.logoDomain ? `https://logo.clearbit.com/${tool.logoDomain}` : null
  const faviconUrl  = tool.logoDomain ? `https://www.google.com/s2/favicons?domain=${tool.logoDomain}&sz=64` : null
  const logoSrc     = logoState === 'clearbit' ? clearbitUrl : logoState === 'favicon' ? faviconUrl : null

  const cardInner = (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: `linear-gradient(180deg, ${tool.accentColor}28 0%, rgba(8,0,18,0.46) 52%)`,
        border: `1px solid ${hovered ? tool.accentColor + '40' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 14,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        padding: '16px 16px 18px',
        flex: 1,
        cursor: 'pointer',
        transition: 'border-color 0.18s ease, transform 0.22s cubic-bezier(0,0,0.2,1), box-shadow 0.22s ease',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? '0 16px 40px rgba(0,0,0,0.5)' : 'none',
      }}
    >
      {/* Logo + redirect icon row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>

        {/* Logo */}
        {tool.localLogo ? (
          <img
            src={tool.localLogo}
            alt={tool.name}
            style={{
              width: 38, height: 38, borderRadius: 10,
              objectFit: 'cover', flexShrink: 0, display: 'block',
            }}
          />
        ) : logoSrc ? (
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: '#ffffff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden', flexShrink: 0,
          }}>
            <img
              src={logoSrc}
              width={26} height={26} alt={tool.name}
              style={{ objectFit: 'contain', display: 'block' }}
              onError={() =>
                setLogoState(prev => prev === 'clearbit' ? 'favicon' : 'initials')
              }
            />
          </div>
        ) : (
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: '#ffffff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: tool.accentColor, fontFamily: 'var(--font-display)' }}>
              {tool.initial}
            </span>
          </div>
        )}

        {/* Redirect icon:
            mobile  — always visible (no hover on touch)
            desktop — hidden until hover                  */}
        <div
          className="tool-redirect-icon"
          style={{
            opacity: hovered ? 1 : 0,      /* desktop: hidden until hover */
            transition: 'opacity 0.18s ease, background 0.18s ease',
            width: 26, height: 26, borderRadius: 7,
            background: hovered ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}
        >
          <ExternalLink size={12} color="rgba(255,255,255,0.75)" />
        </div>
      </div>

      {/* Tool name — single line, truncate if needed */}
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: 15, fontWeight: 700, color: '#ffffff',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        lineHeight: 1.25,
      }}>
        {tool.name}
      </span>

      {/* Description */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 12, color: 'rgba(255,255,255,0.42)',
        lineHeight: 1.6, margin: 0,
      }}>
        {tool.use}
      </p>
    </div>
  )

  if (tool.href) {
    return (
      <a href={tool.href} target="_blank" rel="noopener noreferrer"
        style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}>
        {cardInner}
      </a>
    )
  }
  return cardInner
}

/* ────────────────────────────────────────────────────────────────────────────
   Page
──────────────────────────────────────────────────────────────────────────── */
export default function ToolsPage() {
  const [activeTab, setActiveTab]   = useState('All')
  const [displayTab, setDisplayTab] = useState('All')
  const [fading, setFading]         = useState(false)

  const switchTab = (tab: string) => {
    if (tab === activeTab) return
    setFading(true)
    setTimeout(() => {
      setDisplayTab(tab)
      setActiveTab(tab)
      setFading(false)
    }, 160)
  }

  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return
    setDisplayTab('All')
    setActiveTab('All')
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = document.getElementById(hash.slice(1))
        if (!el) return
        const y = el.getBoundingClientRect().top + window.scrollY - 100
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
      })
    })
  }, [])

  /* Filter groups by active tab */
  const visibleGroups = displayTab === 'All'
    ? groups
    : groups.filter(g => g.tab === displayTab)

  /* Flat, deduplicated, alphabetically sorted list of all visible tools */
  const flatTools = Array.from(
    new Map(
      visibleGroups
        .flatMap(g => g.tools)
        .map(t => [t.name, t])
    ).values()
  ).sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }))

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

      {/* ── Page header ── */}
      <div style={{ padding: '24px clamp(20px,4vw,48px) 0', maxWidth: 960, margin: '0 auto', width: '100%' }}>
        <PageHeader
          title="Tools"
          description="Our AI tool shelf"
        />
      </div>

      {/* ── Tab bar — sticks directly below the frosted navigation ── */}
      <StickyTabs style={{ marginTop: 8 }}>
        <div className="playbook-sticky-tabs__track" style={{ maxWidth: 960, margin: '0 auto', padding: '0 clamp(20px,4vw,48px)' }}>
          <div style={{ display: 'flex', flexWrap: 'nowrap', gap: 24 }}>
            {TABS.map(tab => {
              const isActive = activeTab === tab
              return (
                <button
                  key={tab}
                  onClick={() => switchTab(tab)}
                  className="relative flex items-center text-sm font-medium focus-visible:outline-none"
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    flexShrink: 0, WebkitTapHighlightColor: 'transparent',
                    fontFamily: 'var(--font-body)', padding: '20px 0',
                  }}
                >
                  <span style={{ color: isActive ? '#ffffff' : 'rgba(255,255,255,0.4)', transition: 'color 0.2s ease' }}>
                    {tab}
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
        </div>
      </StickyTabs>

      {/* ── Tool grid ── */}
      <div style={{ maxWidth: 960, margin: '0 auto', width: '100%', padding: '24px clamp(20px,4vw,48px) 48px' }}>
        <div style={{
          opacity: fading ? 0 : 1,
          transform: fading ? 'translateY(6px)' : 'translateY(0)',
          transition: fading
            ? 'opacity 0.16s ease-in, transform 0.16s ease-in'
            : 'opacity 0.26s ease-out, transform 0.26s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}>
          <div className="grid grid-cols-2 sm:grid-cols-3" style={{ gap: 12 }}>
            {flatTools.map((tool, i) => (
              <div
                key={tool.name}
                id={toolSlug(tool.name)}
                className="animate-fade-up"
                style={{ animationDelay: `${Math.min(i * 30, 300)}ms` }}
              >
                <ToolCard tool={tool} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
