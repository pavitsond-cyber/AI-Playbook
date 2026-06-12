import { NextRequest, NextResponse } from 'next/server'

interface FilePayload {
  name: string
  mimeType: string
  data: string // base64
}

interface ContributeBody {
  name: string
  email: string
  category: string
  description: string
  files?: FilePayload[]
}

export async function POST(req: NextRequest) {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL
  if (!scriptUrl) {
    return NextResponse.json({ error: 'Submission endpoint not configured.' }, { status: 503 })
  }

  let body: ContributeBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { name, email, category, description } = body
  console.log(`[contribute] received files: ${(body.files ?? []).length}`)
  if (!name || !email || !category || !description) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
  }

  const payload: ContributeBody = {
    name,
    email,
    category,
    description,
    files:       body.files ?? [],
  }

  let scriptRes: Response
  try {
    scriptRes = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(payload),
    })
  } catch {
    return NextResponse.json({ error: 'Could not reach submission endpoint.' }, { status: 502 })
  }

  let json: { success: boolean; error?: string }
  try {
    json = await scriptRes.json()
  } catch {
    return NextResponse.json({ error: 'Unexpected response from submission endpoint.' }, { status: 502 })
  }

  if (!json.success) {
    return NextResponse.json({ error: json.error || 'Submission failed.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
