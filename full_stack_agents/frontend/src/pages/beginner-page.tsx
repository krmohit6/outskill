import { useState } from 'react'
import { useAppStore } from '@/store/app-store'
import { useBeginnerExamples, useAnalyzeText } from '@/hooks/use-beginner'
import { DemoBadge } from '@/components/shared/demo-badge'
import { TextAnalyzer } from '@/components/beginner/text-analyzer'
import { ExampleChips } from '@/components/beginner/example-chips'
import { ResultVerdict } from '@/components/beginner/result-verdict'

export function BeginnerPage() {
  const { demoMode } = useAppStore()
  const { data: examples } = useBeginnerExamples()
  const { mutateAsync, data: result, isPending } = useAnalyzeText()
  const [, setText] = useState('')

  const handleChipSelect = (text: string) => {
    setText(text)
    mutateAsync({ text, demo: demoMode })
  }

  const handleAnalyze = (text: string) => {
    mutateAsync({ text, demo: demoMode })
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold">Content Shield</h2>
        <DemoBadge />
      </div>
      <p className="text-muted-foreground">
        Single-agent hate speech detection powered by CrewAI. Analyze text content for harmful language.
      </p>

      <TextAnalyzer onAnalyze={handleAnalyze} isLoading={isPending} />

      {examples && examples.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Try an example:</p>
          <ExampleChips examples={examples} onSelect={handleChipSelect} />
        </div>
      )}

      <ResultVerdict result={result ?? null} />
    </div>
  )
}
