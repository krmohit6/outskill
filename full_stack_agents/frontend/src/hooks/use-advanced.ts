import { useState } from 'react'
import { analyzeStockStream as analyzeStockStreamApi } from '@/lib/api'
import type { AdvancedRequest } from '@/types'

export function useAnalyzeStock() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeStockStream = async (
    req: AdvancedRequest,
    onEvent: (data: any) => void,
  ) => {
    setIsAnalyzing(true)
    await analyzeStockStreamApi(req, onEvent)
    setIsAnalyzing(false)
  }

  return { analyzeStockStream, isAnalyzing }
}
