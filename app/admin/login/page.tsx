'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BookOpen } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Invalid email or password.')
      setLoading(false)
      return
    }

    router.push('/admin/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="size-12 rounded-2xl bg-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-600/30">
            <BookOpen size={22} className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">AI Glossary</h1>
          <p className="text-sm text-white/40 mt-1">Sign in to manage content</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-[#111111] border border-white/[0.07] rounded-2xl p-6"
        >
          {error && (
            <div className="px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/25 text-sm text-red-300">
              {error}
            </div>
          )}

          <Input
            label="Email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@headout.com"
            required
            autoComplete="email"
          />

          <Input
            label="Password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            autoComplete="current-password"
          />

          <Button type="submit" loading={loading} className="w-full mt-2" size="lg">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  )
}
