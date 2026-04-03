import { FileSearch, Search, Wrench } from 'lucide-react'
import { PipelineNode } from '@/components/shared/pipeline-node'
import { cn } from '@/lib/utils'
import type { PipelineStep } from '@/types'

interface PipelineFlowProps {
  steps: PipelineStep[]
  onStepClick?: (step: number) => void
}

const stepMeta = [
  { icon: FileSearch, name: 'Log Analyzer' },
  { icon: Search, name: 'Issue Investigator' },
  { icon: Wrench, name: 'Solution Specialist' },
]

export function PipelineFlow({ steps, onStepClick }: PipelineFlowProps) {
  return (
    <div className="space-y-0">
      {steps.map((step, i) => (
        <div key={i}>
          <div
            className={cn(onStepClick && 'cursor-pointer')}
            onClick={() => onStepClick?.(i)}
          >
            <PipelineNode
              stepNumber={i + 1}
              name={stepMeta[i].name}
              status={step.status}
              icon={stepMeta[i].icon}
            />
          </div>
          {i < steps.length - 1 && (
            <div
              className={cn(
                'ml-5 w-0.5 h-8',
                steps[i + 1].status !== 'idle' || step.status === 'running' || step.status === 'complete'
                  ? 'bg-primary'
                  : 'bg-muted',
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}
