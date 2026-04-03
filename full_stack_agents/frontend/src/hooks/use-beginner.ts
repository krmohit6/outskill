import { useQuery, useMutation } from '@tanstack/react-query'
import { fetchBeginnerExamples, analyzeText } from '@/lib/api'
import type { BeginnerRequest } from '@/types'

export function useBeginnerExamples() {
  return useQuery({
    queryKey: ['beginner-examples'],
    queryFn: fetchBeginnerExamples,
  })
}

export function useAnalyzeText() {
  return useMutation({
    mutationFn: (req: BeginnerRequest) => analyzeText(req),
  })
}
