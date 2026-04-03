import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface RecommendationBadgeProps {
  verdict: string
  summary?: string
}

function getVerdictStyles(verdict: string) {
  const upper = verdict.toUpperCase()
  if (upper.includes('BUY')) return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
  if (upper.includes('SELL')) return 'bg-red-500/10 text-red-400 border-red-500/30'
  return 'bg-amber-500/10 text-amber-400 border-amber-500/30'
}

export function RecommendationBadge({ verdict, summary }: RecommendationBadgeProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', duration: 0.5 }}
      className="flex flex-col items-center gap-3 py-6"
    >
      <div
        className={cn(
          'rounded-xl border px-8 py-4 text-center',
          getVerdictStyles(verdict),
        )}
      >
        <p className="text-3xl font-bold">{verdict}</p>
      </div>
      {summary && (
        <p className="max-w-md text-center text-sm text-muted-foreground">{summary}</p>
      )}
    </motion.div>
  )
}
