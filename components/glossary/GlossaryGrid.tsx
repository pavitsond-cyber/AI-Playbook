import GlossaryCard from './GlossaryCard'
import { GlossaryTerm } from '@/types'

interface GlossaryGridProps {
  terms: GlossaryTerm[]
}

export default function GlossaryGrid({ terms }: GlossaryGridProps) {
  return (
    <div className="space-y-2.5 card-stagger">
      {terms.map((term) => (
        <div key={term.id} className="animate-fade-up">
          <GlossaryCard term={term} />
        </div>
      ))}
    </div>
  )
}
