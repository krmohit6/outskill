import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchLogs, analyzeLogsStream as analyzeLogsStreamApi } from '@/lib/api'
import { useAppStore } from '@/store/app-store'
import { DEMO_LOGS, simulateIntermediatePipeline } from '@/lib/demo-data'
import type { IntermediateRequest, PipelineStep } from '@/types'

export function useLogs() {
  const demoMode = useAppStore((s) => s.demoMode)

  return useQuery({
    queryKey: ['logs', demoMode],
    queryFn: () => (demoMode ? Promise.resolve(DEMO_LOGS) : fetchLogs()),
    retry: demoMode ? false : 2,
  })
}

export function useAnalyzeLogs() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const demoMode = useAppStore((s) => s.demoMode)

  const analyzeLogsStream = async (
    req: IntermediateRequest,
    onStep: (step: PipelineStep) => void,
  ) => {
    setIsAnalyzing(true)
    if (demoMode) {
      await simulateIntermediatePipeline(onStep)
    } else {
      await analyzeLogsStreamApi(req, onStep)
    }
    setIsAnalyzing(false)
  }

  return { analyzeLogsStream, isAnalyzing }
}
