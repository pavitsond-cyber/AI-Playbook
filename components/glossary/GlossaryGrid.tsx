import GlossaryCard from './GlossaryCard'
import { GlossaryTerm } from '@/types'

interface GlossaryGridProps {
  terms: GlossaryTerm[]
  openId?: string | null
  onOpen?: (id: string | null) => void
}

export default function GlossaryGrid({ terms, openId, onOpen }: GlossaryGridProps) {
  return (
    <div className="space-y-2.5 card-stagger">
      {terms.map((term) => (
        <div key={term.id} className="animate-fade-up">
          <GlossaryCard term={term} openId={openId} onOpen={onOpen} />
        </div>
      ))}
    </div>
  )
}
