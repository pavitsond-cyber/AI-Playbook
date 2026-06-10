'use client'

import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import PageHeader from '@/components/playbook/PageHeader'
import BlobLayer from '@/components/ui/BlobLayer'

interface Tool {
  name: string
  description: string
  use: string          // one-line use case
  href?: string
  badge?: string       // label like "Free", "Paid", "Free tier"
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
        use: 'Long-form thinking, document analysis, structured reasoning',
        description: 'Anthropic\'s model. Best for deep reasoning, document review, writing briefs, and anything that needs careful nuance. Use for PRDs, research synthesis, and prompt engineering.',
        href: 'https://claude.ai',
        badge: 'Free tier',
      },
      {
        name: 'ChatGPT',
        use: 'Quick answers, brainstorming, drafting',
        description: 'OpenAI\'s assistant. Strong for fast ideation, casual Q&A, and generating options quickly. GPT-4o handles images and files well.',
        href: 'https://chatgpt.com',
        badge: 'Free tier',
      },
      {
        name: 'Perplexity',
        use: 'Real-time research with citations',
        description: 'Search-backed AI that pulls live sources. Use when you need current data, market research, or fact-checked answers you can trace back to a source.',
        href: 'https://perplexity.ai',
        badge: 'Free tier',
      },
      {
        name: 'Notion AI',
        use: 'Drafting and editing inside Notion docs',
        description: 'Built into Notion. Useful for summarising meeting notes, rewriting copy, or generating first drafts directly in your workspace without context switching.',
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
        use: 'Cinematic image generation for concepts and moodboards',
        description: 'The highest-quality image model for artistic and cinematic work. Use for moodboards, visual direction, concept exploration, and presentation assets.',
        href: 'https://midjourney.com',
        badge: 'Paid',
      },
      {
        name: 'DALL-E 3',
        use: 'Quick image generation via ChatGPT',
        description: 'Built into ChatGPT. Best for fast, prompt-accurate images when you need something illustrative rather than photographic. Good for diagrams and icons.',
        href: 'https://chatgpt.com',
        badge: 'Free tier',
      },
      {
        name: 'Adobe Firefly',
        use: 'Brand-safe generative fill and image editing',
        description: 'Trained on licensed content — commercially safe. Excellent for generative fill in Photoshop, removing objects, or extending images within your existing design assets.',
        href: 'https://firefly.adobe.com',
        badge: 'Free tier',
      },
      {
        name: 'v0 by Vercel',
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
        use: 'AI-native code editor for product teams',
        description: 'VS Code fork with Claude and GPT-4 baked in. Tab autocomplete, inline edits, and a composer that understands your full codebase. The default choice for AI-assisted development.',
        href: 'https://cursor.com',
        badge: 'Free tier',
      },
      {
        name: 'Claude Code',
        use: 'Agentic coding from the terminal',
        description: 'Anthropic\'s CLI agent. Reads and edits your entire codebase, runs commands, and ships multi-file changes autonomously. Best for larger refactors and feature implementation.',
        href: 'https://claude.ai/code',
        badge: 'Usage-based',
      },
      {
        name: 'GitHub Copilot',
        use: 'Inline code suggestions in any editor',
        description: 'Microsoft\'s code completion tool. Works in VS Code, JetBrains, and more. Fast, low-friction suggestions as you type — best as a complement to Cursor rather than a replacement.',
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
        use: 'Video generation and editing',
        description: 'Text-to-video and video editing with AI. Use for generating short clips, removing backgrounds, motion tracking, and producing visual assets for campaigns or demos.',
        href: 'https://runwayml.com',
        badge: 'Free tier',
      },
      {
        name: 'Pika',
        use: 'Fast short video generation from images',
        description: 'Turns still images into short animated video clips. Useful for animating product visuals, making social content more dynamic, or quickly prototyping motion concepts.',
        href: 'https://pika.art',
        badge: 'Free tier',
      },
      {
        name: 'ElevenLabs',
        use: 'Voice synthesis and audio generation',
        description: 'Realistic voice cloning and text-to-speech. Use for demo voiceovers, accessibility features, localised audio content, or rapid prototyping of audio-first experiences.',
        href: 'https://elevenlabs.io',
        badge: 'Free tier',
      },
    ],
  },
]

function ToolCard({ tool, groupColor }: { tool: Tool; groupColor: string }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: expanded
          ? `1px solid ${groupColor}30`
          : '1px solid rgba(255,255,255,0.07)',
        borderLeft: `2px solid ${expanded ? groupColor : groupColor + '40'}`,
        borderRadius: 14,
        overflow: 'hidden',
        transition: 'border-color 0.18s ease, background 0.18s ease',
      }}
      onMouseEnter={e => {
        if (!expanded) {
          e.currentTarget.style.background = 'rgba(255,255,255,0.045)'
          e.currentTarget.style.borderLeftColor = groupColor
        }
      }}
      onMouseLeave={e => {
        if (!expanded) {
          e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
          e.currentTarget.style.borderLeftColor = groupColor + '40'
        }
      }}
    >
      <button
        onClick={() => setExpanded(p => !p)}
        style={{
          width: '100%',
          padding: '18px 20px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'background 0.18s ease',
        }}
      >
        {/* Tool name row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 17, fontWeight: 700,
              color: '#ffffff', lineHeight: 1.3,
            }}>
              {tool.name}
            </span>

            {/* Chevron */}
            <svg
              width="14" height="14" viewBox="0 0 14 14" fill="none"
              style={{
                color: expanded ? groupColor : 'rgba(255,255,255,0.3)',
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.22s ease, color 0.18s ease',
                flexShrink: 0,
              }}
            >
              <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {tool.badge && (
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: 11, fontWeight: 500,
                color: groupColor,
                background: `${groupColor}18`,
                border: `1px solid ${groupColor}30`,
                borderRadius: 100,
                padding: '2px 8px',
                flexShrink: 0,
              }}>
                {tool.badge}
              </span>
            )}
            {tool.href && (
              <a
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 28, height: 28, borderRadius: 8,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  color: 'rgba(255,255,255,0.4)',
                  textDecoration: 'none',
                  flexShrink: 0,
                  transition: 'background 0.18s ease, border-color 0.18s ease, color 0.18s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = `${groupColor}18`
                  e.currentTarget.style.borderColor = `${groupColor}35`
                  e.currentTarget.style.color = groupColor
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.4)'
                }}
              >
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>

        {/* Use case — always visible */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 14, color: 'rgba(255,255,255,0.45)',
          lineHeight: 1.6, margin: 0,
        }}>
          {tool.use}
        </p>
      </button>

      {/* Expanded description */}
      <div
        style={{
          overflow: 'hidden',
          maxHeight: expanded ? '400px' : '0px',
          transition: expanded
            ? 'max-height 0.32s cubic-bezier(0.4,0,0.2,1)'
            : 'max-height 0.22s ease-in',
        }}
      >
        <div style={{
          padding: '0 20px 20px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: 16,
        }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 14, color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.7, margin: 0,
          }}>
            {tool.description}
          </p>
        </div>
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
        padding: 'clamp(64px,6vw,100px) clamp(20px,4vw,48px)',
        maxWidth: 960, margin: '0 auto',
      }}>
        <PageHeader
          title="Tools"
          description="18 AI tools the Headout team uses — what each one is for and when to reach for it."
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 52 }}>
          {groups.map(group => (
            <div key={group.theme}>

              {/* Section label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: group.color, flexShrink: 0 }} />
                <h2 style={{
                  fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700,
                  textTransform: 'uppercase' as const, letterSpacing: '0.14em', color: group.color,
                }}>
                  {group.theme}
                </h2>
                <div style={{ flex: 1, height: 1, background: `${group.color}20` }} />
              </div>

              {/* Tool cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {group.tools.map(tool => (
                  <ToolCard key={tool.name} tool={tool} groupColor={group.color} />
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
