import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { AgentInfo } from '@/types'

interface AgentCardProps {
  agentInfo: AgentInfo
  isActive?: boolean
}

export function AgentCard({ agentInfo, isActive }: AgentCardProps) {
  if (!agentInfo) return null

  return (
    <motion.div
      animate={
        isActive
          ? { boxShadow: '0 0 15px rgba(6,182,212,0.3)' }
          : { boxShadow: '0 0 0px rgba(0,0,0,0)' }
      }
      transition={{ duration: 0.3 }}
    >
      <Card className={cn(isActive && 'ring-2 ring-primary/50')}>
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm">{agentInfo.role}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 space-y-1">
          <p className="text-xs text-muted-foreground">{agentInfo.goal}</p>
          <p className="text-xs text-muted-foreground italic">{agentInfo.backstory}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
