import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchLogs, analyzeLogsStream as analyzeLogsStreamApi } from '@/lib/api'
import type { IntermediateRequest, PipelineStep } from '@/types'

export function useLogs() {
  return useQuery({
    queryKey: ['logs'],
    queryFn: fetchLogs,
  })
}

export function useAnalyzeLogs() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeLogsStream = async (
    req: IntermediateRequest,
    onStep: (step: PipelineStep) => void,
  ) => {
    setIsAnalyzing(true)
    await analyzeLogsStreamApi(req, onStep)
    setIsAnalyzing(false)
  }

  return { analyzeLogsStream, isAnalyzing }
}
