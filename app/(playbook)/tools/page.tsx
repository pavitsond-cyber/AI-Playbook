'use client'

import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import PageHeader from '@/components/playbook/PageHeader'
import SiteFooter from '@/components/glossary/SiteFooter'
import BlobLayer from '@/components/ui/BlobLayer'

interface Tool {
  name: string
  initial: string
  use: string
  href?: string
  accentColor: string
  logoDomain?: string
}

interface ToolGroup {
  theme: string
  tab: string
  color: string
  tools: Tool[]
}

const TABS = [
  'All', 'Capture', 'Whiteboarding', 'Research', 'MCPs',
  'Prompt-to-UI', 'Vibe Coding', 'Automation', 'QA', 'Visuals', 'Storytelling',
]

const groups: ToolGroup[] = [
  {
    theme: 'Capture, Notes & Prompting',
    tab: 'Capture',
    color: '#9B59FF',
    tools: [
      { name: 'Granola',     initial: 'G',  logoDomain: 'granola.ai',           accentColor: '#F59E0B', use: 'Capture design reviews, PM calls, research calls, decisions, and action items.',            href: 'https://granola.ai' },
      { name: 'NotebookLM',  initial: 'NB', logoDomain: 'notebooklm.google.com', accentColor: '#4285F4', use: 'Upload docs, PRDs, research notes, and transcripts to ask grounded questions.',             href: 'https://notebooklm.google.com' },
      { name: 'Notion AI',   initial: 'N',  logoDomain: 'notion.so',             accentColor: '#FFFFFF', use: 'Clean rough notes, summarize meetings, create decision logs, and organize playbooks.',      href: 'https://notion.so' },
      { name: 'Raycast AI',  initial: 'R',  logoDomain: 'raycast.com',           accentColor: '#F97316', use: 'Rewrite selected text, summarize snippets, and trigger quick AI actions.',                  href: 'https://raycast.com' },
    ],
  },
  {
    theme: 'Whiteboarding, Flows & Thinking',
    tab: 'Whiteboarding',
    color: '#4FC3F7',
    tools: [
      { name: 'tldraw',     initial: 'tl', logoDomain: 'tldraw.com',     accentColor: '#0EA5E9', use: 'Sketch flows, map journeys, create quick diagrams, and explain system logic visually.', href: 'https://tldraw.com' },
      { name: 'Excalidraw', initial: 'Ex', logoDomain: 'excalidraw.com', accentColor: '#7C3AED', use: 'Create rough flows, product logic diagrams, workshop sketches, and wireframes.',         href: 'https://excalidraw.com' },
      { name: 'Mermaid',    initial: 'Mm', logoDomain: 'mermaidchart.com', accentColor: '#10B981', use: 'Turn written flows into diagrams using simple text syntax.',                          href: 'https://mermaid.js.org' },
    ],
  },
  {
    theme: 'Research & References',
    tab: 'Research',
    color: '#00CCA8',
    tools: [
      { name: 'Mobbin', initial: 'Mo', logoDomain: 'mobbin.com',    accentColor: '#3B82F6', use: 'Find real product flows like checkout, onboarding, cancellation, settings, and empty states.', href: 'https://mobbin.com' },
      { name: 'Refero',  initial: 'Rf', logoDomain: 'refero.design', accentColor: '#818CF8', use: 'Search web and mobile interface references for visual and interaction patterns.',              href: 'https://refero.design' },
    ],
  },
  {
    theme: 'MCPs',
    tab: 'MCPs',
    color: '#C27FFF',
    tools: [
      { name: 'Mobbin MCP', initial: 'MM', logoDomain: 'mobbin.com',    accentColor: '#60A5FA', use: 'Let AI tools use Mobbin-style references while generating or critiquing UI.',                    href: 'https://mobbin.com' },
      { name: 'Refero MCP', initial: 'RM', logoDomain: 'refero.design', accentColor: '#A5B4FC', use: 'Let AI agents inspect product screens and flows before giving design suggestions.',              href: 'https://refero.design' },
    ],
  },
  {
    theme: 'Prompt-to-UI & Design Generation',
    tab: 'Prompt-to-UI',
    color: '#FF69DB',
    tools: [
      { name: 'Banani',       initial: 'Ba', logoDomain: 'banani.co',       accentColor: '#F43F5E', use: 'Generate editable UI screens, wireframes, prototypes, and website layouts from prompts or PRDs.', href: 'https://banani.co' },
      { name: 'Super Design', initial: 'SD', logoDomain: 'superdesign.dev', accentColor: '#4F46E5', use: 'Generate UI mockups, components, wireframes, and layouts inside coding tools like Cursor or VS Code.', href: 'https://superdesign.dev' },
      { name: 'Paper',        initial: 'Pa', logoDomain: 'paper.design',    accentColor: '#D97706', use: 'Quickly create HTML-like UI concepts and editable layouts without heavy setup.',                   href: 'https://paper.design' },
      { name: 'Replit Agent', initial: 'Re', logoDomain: 'replit.com',      accentColor: '#F97316', use: 'Build small tools, forms, dashboards, and interactive prototypes.',                               href: 'https://replit.com' },
      { name: 'Galileo AI',   initial: 'Ga', logoDomain: 'usegalileo.ai',   accentColor: '#1D4ED8', use: 'Create polished UI directions from written prompts.',                                              href: 'https://usegalileo.ai' },
    ],
  },
  {
    theme: 'Vibe Coding & Design-to-Code',
    tab: 'Vibe Coding',
    color: '#FB923C',
    tools: [
      { name: 'Cursor',         initial: 'Cur', logoDomain: 'cursor.com',        accentColor: '#0EA5E9', use: 'Edit UI, create components, fix layout issues, explain code, and build prototypes.',           href: 'https://cursor.com' },
      { name: 'Claude Code',    initial: 'CC',  logoDomain: 'claude.ai',          accentColor: '#FB923C', use: 'Ask an agent to inspect files, make UI changes, explain code, or implement small flows.',      href: 'https://claude.ai/code' },
      { name: 'Codex',          initial: 'Cx',  logoDomain: 'openai.com',         accentColor: '#10B981', use: 'Generate, refactor, explain, and test code from plain English.',                               href: 'https://openai.com/codex' },
      { name: 'GitHub Desktop', initial: 'GH',  logoDomain: 'github.com',         accentColor: '#8B949E', use: 'Commit changes, switch branches, and create small PRs without terminal-heavy workflows.',     href: 'https://desktop.github.com' },
      { name: 'Vercel',         initial: 'Ve',  logoDomain: 'vercel.com',         accentColor: '#EEEEEE', use: 'Deploy vibe-coded prototypes and share live URLs.',                                            href: 'https://vercel.com' },
    ],
  },
  {
    theme: 'Workflow Automation & Integrations',
    tab: 'Automation',
    color: '#E8C840',
    tools: [
      { name: 'n8n',      initial: 'n8', logoDomain: 'n8n.io',       accentColor: '#EF4444', use: 'Create internal automations, AI workflows, alerts, summaries, and tool-to-tool handoffs.', href: 'https://n8n.io' },
      { name: 'Zapier',   initial: 'Za', logoDomain: 'zapier.com',   accentColor: '#FF4A00', use: 'Connect Slack, Gmail, Notion, Airtable, Sheets, forms, and webhooks.',                    href: 'https://zapier.com' },
      { name: 'Make',     initial: 'Mk', logoDomain: 'make.com',     accentColor: '#7C3AED', use: 'Build multi-step automations with conditions and branching.',                               href: 'https://make.com' },
      { name: 'Airtable', initial: 'At', logoDomain: 'airtable.com', accentColor: '#059669', use: 'Create research repos, design QA trackers, prompt libraries, and ops dashboards.',         href: 'https://airtable.com' },
    ],
  },
  {
    theme: 'Browser Agents, UI Screening & QA',
    tab: 'QA',
    color: '#FF6B6B',
    tools: [
      { name: 'Playwright', initial: 'Pl', logoDomain: 'playwright.dev', accentColor: '#00B050', use: 'Open pages, click through flows, test UI states, and detect broken experiences.',             href: 'https://playwright.dev' },
      { name: 'Agentation', initial: 'Ag', logoDomain: 'agentation.com', accentColor: '#64748B', use: 'Prompt a browser agent to inspect, compare, and operate websites.',                           href: 'https://agentation.com' },
      { name: 'Dialkit',    initial: 'Dk', logoDomain: 'dialkit.com',    accentColor: '#6B7280', use: 'Run browser-based prompting and workflow execution.',                                          href: 'https://dialkit.com' },
      { name: 'Scribe',     initial: 'Sc', logoDomain: 'scribehow.com',  accentColor: '#2563EB', use: 'Auto-create step-by-step guides from actions.',                                               href: 'https://scribehow.com' },
    ],
  },
  {
    theme: 'Visual Exploration, Imagery & Motion',
    tab: 'Visuals',
    color: '#00D4FF',
    tools: [
      { name: 'Krea',        initial: 'Kr', logoDomain: 'krea.ai',        accentColor: '#3B82F6', use: 'Create visuals, icons, style explorations, and campaign imagery.',                                     href: 'https://krea.ai' },
      { name: 'Midjourney',  initial: 'MJ', logoDomain: 'midjourney.com', accentColor: '#8B5CF6', use: 'Generate moodboards, visual territories, concept imagery, and campaign directions.',                   href: 'https://midjourney.com' },
      { name: 'Runway',      initial: 'RW', logoDomain: 'runwayml.com',   accentColor: '#EC4899', use: 'Generate short videos, motion experiments, and cinematic visual treatments.',                          href: 'https://runwayml.com' },
      { name: 'ElevenLabs',  initial: '11', logoDomain: 'elevenlabs.io',  accentColor: '#38BDF8', use: 'Create narration, audio mockups, and voice concepts.',                                                 href: 'https://elevenlabs.io' },
      { name: 'Rive',        initial: 'Rv', logoDomain: 'rive.app',       accentColor: '#A855F7', use: 'Create production-ready interactive animations and state-based motion.',                               href: 'https://rive.app' },
      { name: 'LottieFiles', initial: 'LF', logoDomain: 'lottiefiles.com', accentColor: '#14B8A6', use: 'Preview, manage, and export lightweight animations.',                                               href: 'https://lottiefiles.com' },
      { name: 'Jitter',      initial: 'Ji', logoDomain: 'jitter.video',   accentColor: '#7C3AED', use: 'Quickly animate UI, social posts, product moments, and lightweight motion concepts.',                 href: 'https://jitter.video' },
    ],
  },
  {
    theme: 'Presentation & Storytelling',
    tab: 'Storytelling',
    color: '#FF8A65',
    tools: [
      { name: 'Gamma', initial: 'Gm', logoDomain: 'gamma.app',  accentColor: '#8B5CF6', use: 'Turn rough ideas into structured decks, concept pitches, and workshop material.',    href: 'https://gamma.app' },
      { name: 'Tome',  initial: 'Tm', logoDomain: 'tome.app',   accentColor: '#CCCCCC', use: 'Build visual stories, concept decks, and product narratives.',                       href: 'https://tome.app' },
      { name: 'Pitch', initial: 'Pi', logoDomain: 'pitch.com',  accentColor: '#3B82F6', use: 'Create clean team presentations and design review decks.',                           href: 'https://pitch.com' },
      { name: 'Canva', initial: 'Cv', logoDomain: 'canva.com',  accentColor: '#00C4CC', use: 'Create quick social assets, event graphics, basic decks, and internal comms.',      href: 'https://canva.com' },
    ],
  },
]

/* ── Tool card ────────────────────────────────────────────────────────────── */
function ToolCard({ tool, groupColor, groupTheme, showTag }: {
  tool: Tool
  groupColor: string
  groupTheme: string
  showTag: boolean
}) {
  const [logoFailed, setLogoFailed] = useState(false)
  const [hovered, setHovered] = useState(false)

  const cardInner = (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        /* Unified gradient: accent glow at top fading to dark — no header/body split */
        background: `linear-gradient(180deg, ${tool.accentColor}20 0%, rgba(8,0,18,0.94) 52%)`,
        border: `1px solid ${hovered ? tool.accentColor + '40' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 18,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        padding: '16px 16px 18px',
        height: '100%',
        cursor: 'pointer',
        transition: 'border-color 0.18s ease, transform 0.22s cubic-bezier(0,0,0.2,1), box-shadow 0.22s ease',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? `0 16px 40px rgba(0,0,0,0.5)` : 'none',
      }}
    >
      {/* Logo + hover redirect icon */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        {/* Logo */}
        {!logoFailed && tool.logoDomain ? (
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: 'rgba(255,255,255,0.95)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden', flexShrink: 0,
          }}>
            <img
              src={`https://logo.clearbit.com/${tool.logoDomain}`}
              width={26} height={26} alt={tool.name}
              style={{ objectFit: 'contain', display: 'block' }}
              onError={() => setLogoFailed(true)}
            />
          </div>
        ) : (
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: `${tool.accentColor}22`,
            border: `1px solid ${tool.accentColor}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: tool.accentColor, letterSpacing: '-0.02em', fontFamily: 'var(--font-display)' }}>
              {tool.initial}
            </span>
          </div>
        )}

        {/* Redirect icon — fades in on hover */}
        <div style={{
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.18s ease',
          width: 26, height: 26, borderRadius: 7,
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <ExternalLink size={12} color="rgba(255,255,255,0.65)" />
        </div>
      </div>

      {/* Tool name — single line, truncate */}
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: 15, fontWeight: 700, color: '#ffffff',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        lineHeight: 1.25,
      }}>
        {tool.name}
      </span>

      {/* Category tag — only in All tab, same pill style as skills domain tags */}
      {showTag && (
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: 10, fontWeight: 500,
          color: groupColor,
          background: `${groupColor}18`,
          border: `1px solid ${groupColor}30`,
          borderRadius: 100,
          padding: '2px 8px',
          textTransform: 'uppercase' as const,
          letterSpacing: '0.08em',
          alignSelf: 'flex-start',
        }}>
          {groupTheme}
        </span>
      )}

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
      <a href={tool.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
        {cardInner}
      </a>
    )
  }
  return cardInner
}

/* ── Page ─────────────────────────────────────────────────────────────────── */
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

  const filteredGroups = displayTab === 'All'
    ? groups
    : groups.filter(g => g.tab === displayTab)

  /* Flat list of tools for stagger index calculation */
  let globalIdx = 0

  return (
    <div style={{ position: 'relative', overflow: 'clip', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <BlobLayer />

      <div style={{
        position: 'relative', zIndex: 1, flex: 1,
        padding: '24px clamp(20px,4vw,48px) 16px',
        maxWidth: 1040, margin: '0 auto', width: '100%',
      }}>
        <PageHeader
          title="Tools"
          description="Daily AI tool stack for vibe-coding designers — 10 categories, 37 tools."
        />

        {/* ── Filter tabs — same style as Skills + Prompts ─────────────── */}
        <div style={{
          display: 'flex',
          overflowX: 'auto', scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'],
          flexWrap: 'nowrap',
          marginBottom: 24,
          marginLeft: 'calc(-1 * clamp(20px,4vw,48px))',
          marginRight: 'calc(-1 * clamp(20px,4vw,48px))',
          paddingLeft: 'clamp(20px,4vw,48px)',
          paddingRight: 'clamp(20px,4vw,48px)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        } as React.CSSProperties}>
          {TABS.map(tab => {
            const isActive = activeTab === tab
            return (
              <button
                key={tab}
                onClick={() => switchTab(tab)}
                className="relative flex items-center px-1 pb-3 pt-2 mr-6 text-sm font-medium focus-visible:outline-none"
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  flexShrink: 0, WebkitTapHighlightColor: 'transparent',
                  fontFamily: 'var(--font-body)',
                }}
              >
                <span style={{
                  color: isActive ? '#ffffff' : 'rgba(255,255,255,0.4)',
                  transition: 'color 0.2s ease',
                }}>
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

        {/* ── Tool grid — fade transition on tab switch ─────────────────── */}
        <div style={{
          opacity: fading ? 0 : 1,
          transform: fading ? 'translateY(6px)' : 'translateY(0)',
          transition: fading
            ? 'opacity 0.16s ease-in, transform 0.16s ease-in'
            : 'opacity 0.26s ease-out, transform 0.26s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {filteredGroups.map(group => (
              <div key={group.theme}>
                {/* Section label — pill tag style, no dot */}
                {displayTab === 'All' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 10, fontWeight: 500,
                      color: group.color,
                      background: `${group.color}18`,
                      border: `1px solid ${group.color}30`,
                      borderRadius: 100,
                      padding: '3px 10px',
                      textTransform: 'uppercase' as const,
                      letterSpacing: '0.1em',
                    }}>
                      {group.theme}
                    </span>
                    <div style={{ flex: 1, height: 1, background: `${group.color}20` }} />
                  </div>
                )}

                {/* Cards — staggered ease-out fade-up per card */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" style={{ gap: 12 }}>
                  {group.tools.map(tool => {
                    const delay = Math.min(globalIdx++ * 30, 300)
                    return (
                      <div
                        key={tool.name}
                        className="animate-fade-up"
                        style={{ animationDelay: `${delay}ms` }}
                      >
                        <ToolCard
                          tool={tool}
                          groupColor={group.color}
                          groupTheme={group.tab}
                          showTag={displayTab === 'All'}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
