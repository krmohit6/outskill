import { useState } from 'react'
import { TrendingUp } from 'lucide-react'
import { useAppStore } from '@/store/app-store'
import { useAnalyzeStock } from '@/hooks/use-advanced'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { DemoBadge } from '@/components/shared/demo-badge'
import { StockSearch } from '@/components/advanced/stock-search'
import { ParallelLanes } from '@/components/advanced/parallel-lanes'
import { MetricsGrid } from '@/components/advanced/metrics-grid'
import { RecommendationBadge } from '@/components/advanced/recommendation-badge'
import { MarkdownRenderer } from '@/components/shared/markdown-renderer'
import type { AdvancedResult } from '@/types'

interface Phase {
  name: string
  status: 'idle' | 'running' | 'complete'
  elapsed: number
}

const initialPhases: Phase[] = [
  { name: 'Financial Data', status: 'idle', elapsed: 0 },
  { name: 'News Research', status: 'idle', elapsed: 0 },
  { name: 'Analysis', status: 'idle', elapsed: 0 },
  { name: 'Recommendation', status: 'idle', elapsed: 0 },
]

export function AdvancedPage() {
  const { demoMode } = useAppStore()
  const { analyzeStockStream, isAnalyzing } = useAnalyzeStock()
  const [phases, setPhases] = useState<Phase[]>(initialPhases)
  const [result, setResult] = useState<AdvancedResult | null>(null)

  const handleSearch = (stock: string) => {
    setPhases(initialPhases)
    setResult(null)
    analyzeStockStream(
      { stock, demo: demoMode },
      (event: Record<string, unknown>) => {
        if (event.type === 'phase_update') {
          setPhases((prev) =>
            prev.map((p) =>
              p.name === event.phase
                ? {
                    ...p,
                    status: event.status as Phase['status'],
                    elapsed:
                      typeof event.elapsed === 'number'
                        ? event.elapsed
                        : p.elapsed,
                  }
                : p,
            ),
          )
        } else if (event.type === 'result') {
          setResult(event.data as AdvancedResult)
          setPhases((prev) => prev.map((p) => ({ ...p, status: 'complete' })))
        }
      },
    )
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">Market Intelligence</h2>
              <DemoBadge />
            </div>
            <p className="text-sm text-muted-foreground">
              Parallel multi-agent financial analysis &mdash; data, news, and investment
              recommendations
            </p>
          </div>
        </div>
      </div>

      <StockSearch onSearch={handleSearch} isLoading={isAnalyzing} />

      <ParallelLanes phases={phases} />

      {result && (
        <div className="space-y-6">
          <MetricsGrid data={result.company_info} />

          <Card className="relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <CardHeader>
              <CardTitle className="text-lg">Financial Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <MarkdownRenderer content={result.financial_analysis} />
            </CardContent>
          </Card>

          <RecommendationBadge
            verdict={result.recommendation_verdict}
            summary={result.investment_recommendation}
          />

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between text-sm">
                <div className="space-y-0.5">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Parallel
                  </p>
                  <p className="font-bold">
                    {result.timing.parallel_time.toFixed(1)}s
                  </p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Analysis
                  </p>
                  <p className="font-bold">
                    {result.timing.analysis_time.toFixed(1)}s
                  </p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Total
                  </p>
                  <p className="font-bold">
                    {result.timing.total_time.toFixed(1)}s
                  </p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400/70">
                    Time Saved
                  </p>
                  <p className="font-bold text-emerald-400">
                    {result.timing.time_saved.toFixed(1)}s
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
