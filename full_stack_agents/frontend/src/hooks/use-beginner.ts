import { useQuery, useMutation } from '@tanstack/react-query'
import { fetchBeginnerExamples, analyzeText } from '@/lib/api'
import { useAppStore } from '@/store/app-store'
import { DEMO_EXAMPLES, getDemoVerdict } from '@/lib/demo-data'
import type { BeginnerRequest } from '@/types'

export function useBeginnerExamples() {
  const demoMode = useAppStore((s) => s.demoMode)

  return useQuery({
    queryKey: ['beginner-examples', demoMode],
    queryFn: () =>
      demoMode ? Promise.resolve(DEMO_EXAMPLES) : fetchBeginnerExamples(),
    retry: demoMode ? false : 2,
  })
}

export function useAnalyzeText() {
  const demoMode = useAppStore((s) => s.demoMode)

  return useMutation({
    mutationFn: async (req: BeginnerRequest) => {
      if (demoMode) {
        await new Promise((r) => setTimeout(r, 1500))
        return getDemoVerdict(req.text)
      }
      return analyzeText(req)
    },
  })
}
