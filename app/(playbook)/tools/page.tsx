'use client'

import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import PageHeader from '@/components/playbook/PageHeader'
import SiteFooter from '@/components/glossary/SiteFooter'
import BlobLayer from '@/components/ui/BlobLayer'

interface Tool {
  name: string
  initial: string        // short label shown in the card header badge
  description: string
  use: string
  href?: string
  badge?: string
  /* Gradient colours for the card header visual */
  gradientFrom: string
  gradientTo: string
  accentColor: string    // badge + link accent
}

interface ToolGroup {
  theme: string
  color: string
  tools: Tool[]
}

const groups: ToolGroup[] = [
  {
    theme: 'Writing & Thinking',
    color: '#9B3FFF',
    tools: [
      {
        name: 'Claude',
        initial: 'C',
        gradientFrom: '#2D1B00',
        gradientTo: '#7C3500',
        accentColor: '#FF9500',
        use: 'Long-form thinking, document analysis, structured reasoning',
        description: 'Best for deep reasoning, document review, writing briefs, and anything that needs careful nuance. Use for PRDs, research synthesis, and prompt engineering.',
        href: 'https://claude.ai',
        badge: 'Free tier',
      },
      {
        name: 'ChatGPT',
        initial: 'GPT',
        gradientFrom: '#001A14',
        gradientTo: '#004D3B',
        accentColor: '#10A37F',
        use: 'Quick answers, brainstorming, drafting',
        description: 'Strong for fast ideation, casual Q&A, and generating options quickly. GPT-4o handles images and files well.',
        href: 'https://chatgpt.com',
        badge: 'Free tier',
      },
      {
        name: 'Perplexity',
        initial: 'Px',
        gradientFrom: '#0D0A2E',
        gradientTo: '#2D1B6E',
        accentColor: '#7C6BF8',
        use: 'Real-time research with citations',
        description: 'Search-backed AI that pulls live sources. Use when you need current data, market research, or fact-checked answers you can trace back to a source.',
        href: 'https://perplexity.ai',
        badge: 'Free tier',
      },
      {
        name: 'Notion AI',
        initial: 'N',
        gradientFrom: '#111111',
        gradientTo: '#2A2A2A',
        accentColor: '#FFFFFF',
        use: 'Drafting and editing inside Notion docs',
        description: 'Useful for summarising meeting notes, rewriting copy, or generating first drafts directly in your workspace without context switching.',
        href: 'https://notion.so',
        badge: 'Paid add-on',
      },
    ],
  },
  {
    theme: 'Design & Image',
    color: '#FF69DB',
    tools: [
      {
        name: 'Midjourney',
        initial: 'MJ',
        gradientFrom: '#0A0520',
        gradientTo: '#2C1060',
        accentColor: '#8B5CF6',
        use: 'Cinematic image generation for concepts and moodboards',
        description: 'The highest-quality image model for artistic and cinematic work. Use for moodboards, visual direction, and presentation assets.',
        href: 'https://midjourney.com',
        badge: 'Paid',
      },
      {
        name: 'DALL-E 3',
        initial: 'DL',
        gradientFrom: '#200A00',
        gradientTo: '#5C1A00',
        accentColor: '#FF6B35',
        use: 'Quick image generation via ChatGPT',
        description: 'Built into ChatGPT. Best for fast, prompt-accurate images when you need something illustrative rather than photographic.',
        href: 'https://chatgpt.com',
        badge: 'Free tier',
      },
      {
        name: 'Adobe Firefly',
        initial: 'Ff',
        gradientFrom: '#1A0000',
        gradientTo: '#4D0000',
        accentColor: '#FF3B30',
        use: 'Brand-safe generative fill and image editing',
        description: 'Trained on licensed content — commercially safe. Excellent for generative fill in Photoshop and extending images within your existing design assets.',
        href: 'https://firefly.adobe.com',
        badge: 'Free tier',
      },
      {
        name: 'v0',
        initial: 'v0',
        gradientFrom: '#0A0A14',
        gradientTo: '#1A1A2E',
        accentColor: '#6366F1',
        use: 'UI generation from text prompts',
        description: 'Generates React + Tailwind UI from a prompt. Use to scaffold page layouts, components, and interaction prototypes fast before handing off to engineering.',
        href: 'https://v0.dev',
        badge: 'Free tier',
      },
    ],
  },
  {
    theme: 'Code & Build',
    color: '#00CCA8',
    tools: [
      {
        name: 'Cursor',
        initial: 'Cur',
        gradientFrom: '#001520',
        gradientTo: '#003D5C',
        accentColor: '#0EA5E9',
        use: 'AI-native code editor for product teams',
        description: 'VS Code fork with Claude and GPT-4 baked in. Tab autocomplete, inline edits, and a composer that understands your full codebase.',
        href: 'https://cursor.com',
        badge: 'Free tier',
      },
      {
        name: 'Claude Code',
        initial: 'CC',
        gradientFrom: '#1A0D00',
        gradientTo: '#4D2800',
        accentColor: '#FB923C',
        use: 'Agentic coding from the terminal',
        description: 'Reads and edits your entire codebase, runs commands, and ships multi-file changes autonomously. Best for larger refactors and feature implementation.',
        href: 'https://claude.ai/code',
        badge: 'Usage-based',
      },
      {
        name: 'GitHub Copilot',
        initial: 'GH',
        gradientFrom: '#080B0F',
        gradientTo: '#1A2033',
        accentColor: '#8B949E',
        use: 'Inline code suggestions in any editor',
        description: 'Works in VS Code, JetBrains, and more. Fast, low-friction suggestions as you type — best as a complement to Cursor rather than a replacement.',
        href: 'https://github.com/features/copilot',
        badge: 'Paid',
      },
    ],
  },
  {
    theme: 'Video & Motion',
    color: '#E8C840',
    tools: [
      {
        name: 'Runway',
        initial: 'RW',
        gradientFrom: '#180008',
        gradientTo: '#4D0020',
        accentColor: '#EC4899',
        use: 'Video generation and editing',
        description: 'Text-to-video and video editing with AI. Use for generating short clips, removing backgrounds, and producing visual assets for campaigns or demos.',
        href: 'https://runwayml.com',
        badge: 'Free tier',
      },
      {
        name: 'Pika',
        initial: 'Pk',
        gradientFrom: '#10001A',
        gradientTo: '#35004D',
        accentColor: '#C084FC',
        use: 'Fast short video generation from images',
        description: 'Turns still images into short animated video clips. Useful for animating product visuals and making social content more dynamic.',
        href: 'https://pika.art',
        badge: 'Free tier',
      },
      {
        name: 'ElevenLabs',
        initial: '11',
        gradientFrom: '#000D1A',
        gradientTo: '#002040',
        accentColor: '#38BDF8',
        use: 'Voice synthesis and audio generation',
        description: 'Realistic voice cloning and text-to-speech. Use for demo voiceovers, accessibility features, and rapid prototyping of audio-first experiences.',
        href: 'https://elevenlabs.io',
        badge: 'Free tier',
      },
    ],
  },
]

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 18,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transition: 'border-color 0.18s ease, transform 0.22s ease, box-shadow 0.22s ease',
    }}
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
        height: 140,
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
          position: 'absolute', left: 0, right: 0, bottom: 0, height: 56,
          background: 'linear-gradient(to bottom, transparent, rgba(8,0,18,0.85))',
          pointerEvents: 'none',
        }} />

        {/* Brand initial badge */}
        <div style={{
          position: 'relative', zIndex: 1,
          width: 56, height: 56, borderRadius: 16,
          background: `${tool.accentColor}22`,
          border: `1.5px solid ${tool.accentColor}55`,
          backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 0 24px ${tool.accentColor}30`,
        }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: tool.initial.length > 2 ? 13 : 17,
            fontWeight: 700,
            color: tool.accentColor,
            letterSpacing: '-0.02em',
          }}>
            {tool.initial}
          </span>
        </div>
      </div>

      {/* ── Card body ──────────────────────────────────────── */}
      <div style={{ padding: '16px 18px 18px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>

        {/* Name row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 16, fontWeight: 700, color: '#ffffff', lineHeight: 1.2,
          }}>
            {tool.name}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            {tool.badge && (
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: 11, fontWeight: 500,
                color: tool.accentColor,
                background: `${tool.accentColor}18`,
                border: `1px solid ${tool.accentColor}30`,
                borderRadius: 100,
                padding: '2px 7px',
              }}>
                {tool.badge}
              </span>
            )}
            {tool.href && (
              <a
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 26, height: 26, borderRadius: 8,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  color: 'rgba(255,255,255,0.4)',
                  textDecoration: 'none',
                  transition: 'background 0.18s ease, color 0.18s ease',
                  flexShrink: 0,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = `${tool.accentColor}18`
                  e.currentTarget.style.color = tool.accentColor
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.4)'
                }}
              >
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>

        {/* Use case */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 13, color: 'rgba(255,255,255,0.45)',
          lineHeight: 1.55, margin: 0,
        }}>
          {tool.use}
        </p>
      </div>
    </div>
  )
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
          description="18 AI tools the Headout team uses — what each one is for and when to reach for it."
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          {groups.map(group => (
            <div key={group.theme}>

              {/* Section label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: group.color, flexShrink: 0 }} />
                <h2 style={{
                  fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700,
                  textTransform: 'uppercase' as const, letterSpacing: '0.14em', color: group.color,
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
                  <ToolCard key={tool.name} tool={tool} />
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
