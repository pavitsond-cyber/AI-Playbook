import TimelinePage from '@/components/timeline/TimelinePage'
import timelineData from '@/lib/data/timeline-data.json'

export const metadata = {
  title: 'AI Timeline',
  description: 'A chronological record of AI product launches — sourced from There\'s An AI For That.',
}

export default function Page() {
  return <TimelinePage data={timelineData as any} />
}
