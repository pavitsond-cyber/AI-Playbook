import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL
  if (!scriptUrl) {
    return NextResponse.json({ error: 'Submission endpoint not configured.' }, { status: 503 })
  }

  let body: Record<string, string>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { name, email, category, description, link, attachmentName } = body
  if (!name || !email || !category || !description) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
  }

  const payload = {
    timestamp: new Date().toISOString(),
    name,
    email,
    category,
    description,
    link: link || '',
    attachmentName: attachmentName || '',
  }

  const res = await fetch(scriptUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to write to sheet.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
