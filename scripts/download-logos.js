/**
 * download-logos.js
 * Run once:  node scripts/download-logos.js
 *
 * Downloads every tool logo from Clearbit and saves it to
 * /public/logos/<domain>.png  (dots in domain become dashes in filename)
 *
 * After this runs, the ToolCard component will automatically serve
 * the local files instead of making Clearbit requests on every page load.
 */

const https = require('https')
const fs    = require('fs')
const path  = require('path')

const OUT_DIR = path.join(__dirname, '..', 'public', 'logos')

const tools = [
  'granola.ai',
  'notebooklm.google.com',
  'notion.so',
  'raycast.com',
  'tldraw.com',
  'excalidraw.com',
  'mermaidchart.com',
  'mobbin.com',
  'refero.design',
  'banani.co',
  'superdesign.dev',
  'paper.design',
  'replit.com',
  'usegalileo.ai',
  'cursor.com',
  'claude.ai',
  'openai.com',
  'github.com',
  'vercel.com',
  'n8n.io',
  'zapier.com',
  'make.com',
  'airtable.com',
  'playwright.dev',
  'agentation.com',
  'dialkit.com',
  'scribehow.com',
  'krea.ai',
  'midjourney.com',
  'runwayml.com',
  'elevenlabs.io',
  'rive.app',
  'lottiefiles.com',
  'jitter.video',
  'gamma.app',
  'tome.app',
  'pitch.com',
  'canva.com',
]

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true })

const domainToFilename = (domain) => domain.replace(/\./g, '-') + '.png'

let done = 0

function download(domain) {
  const url      = `https://logo.clearbit.com/${domain}?size=128`
  const filename = domainToFilename(domain)
  const dest     = path.join(OUT_DIR, filename)

  const file = fs.createWriteStream(dest)
  https.get(url, (res) => {
    if (res.statusCode === 200) {
      res.pipe(file)
      file.on('finish', () => {
        file.close()
        console.log(`✓  ${domain}  →  public/logos/${filename}`)
        if (++done === tools.length) console.log('\nAll logos downloaded.')
      })
    } else {
      fs.unlink(dest, () => {})
      console.warn(`✗  ${domain}  (status ${res.statusCode} — fallback to initials)`)
      if (++done === tools.length) console.log('\nDone.')
    }
  }).on('error', (err) => {
    fs.unlink(dest, () => {})
    console.warn(`✗  ${domain}  (${err.message})`)
    if (++done === tools.length) console.log('\nDone.')
  })
}

console.log(`Downloading ${tools.length} logos to public/logos/ ...\n`)
tools.forEach(download)
