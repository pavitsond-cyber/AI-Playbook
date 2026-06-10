/**
 * instrumentation.ts
 * Next.js runs this file once when the server starts (dev or production).
 * We use it to download tool logos from Clearbit into /public/logos/
 * so the ToolCard component can serve them as fast local static assets.
 *
 * After the first run the files exist → subsequent starts are instant (skipped).
 */

export async function register() {
  // Only run in the Node.js runtime (not in Edge)
  if (process.env.NEXT_RUNTIME !== 'nodejs') return

  const https  = await import('https')
  const fs     = await import('fs')
  const path   = await import('path')

  const outDir = path.default.join(process.cwd(), 'public', 'logos')

  const domains = [
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

  const domainToFile = (d: string) => d.replace(/\./g, '-') + '.png'

  // Create directory
  if (!fs.default.existsSync(outDir)) {
    fs.default.mkdirSync(outDir, { recursive: true })
  }

  // Find domains that still need downloading
  const missing = domains.filter(
    d => !fs.default.existsSync(path.default.join(outDir, domainToFile(d)))
  )

  if (missing.length === 0) {
    console.log('✓  [logos] All tool logos already cached in public/logos/')
    return
  }

  console.log(`↓  [logos] Downloading ${missing.length} tool logo(s)...`)

  const download = (domain: string): Promise<void> =>
    new Promise(resolve => {
      const url      = `https://logo.clearbit.com/${domain}?size=128`
      const filename = domainToFile(domain)
      const dest     = path.default.join(outDir, filename)
      const file     = fs.default.createWriteStream(dest)

      const req = https.default.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
        const ct = res.headers['content-type'] ?? ''
        if (res.statusCode === 200 && ct.includes('image')) {
          res.pipe(file)
          file.on('finish', () => {
            file.close()
            console.log(`   ✓  ${domain}`)
            resolve()
          })
        } else {
          file.close()
          fs.default.unlink(dest, () => {})
          console.warn(`   ✗  ${domain} (${res.statusCode} / ${ct})`)
          resolve()
        }
      })

      req.on('error', err => {
        file.close()
        fs.default.unlink(dest, () => {})
        console.warn(`   ✗  ${domain} (${err.message})`)
        resolve()
      })

      req.setTimeout(12_000, () => {
        req.destroy()
        file.close()
        fs.default.unlink(dest, () => {})
        console.warn(`   ✗  ${domain} (timeout)`)
        resolve()
      })
    })

  // Download all missing logos concurrently
  await Promise.all(missing.map(download))
  console.log('✓  [logos] Done.')
}
