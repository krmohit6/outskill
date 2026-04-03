import { useState } from 'react'
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
    analyzeStockStream({ stock, demo: demoMode }, (event: any) => {
      if (event.type === 'phase_update') {
        setPhases((prev) =>
          prev.map((p) =>
            p.name === event.phase
              ? { ...p, status: event.status, elapsed: event.elapsed ?? p.elapsed }
              : p,
          ),
        )
      } else if (event.type === 'result') {
        setResult(event.data)
        setPhases((prev) => prev.map((p) => ({ ...p, status: 'complete' })))
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold">Market Intelligence</h2>
        <DemoBadge />
      </div>
      <p className="text-muted-foreground">
        Parallel multi-agent financial analysis — aggregating data, news, and generating investment recommendations.
      </p>

      <StockSearch onSearch={handleSearch} isLoading={isAnalyzing} />

      <ParallelLanes phases={phases} />

      {result && (
        <div className="space-y-6">
          <MetricsGrid data={result.company_info} />

          <Card>
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
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Parallel: {result.timing.parallel_time.toFixed(1)}s</span>
                <span>Analysis: {result.timing.analysis_time.toFixed(1)}s</span>
                <span>Total: {result.timing.total_time.toFixed(1)}s</span>
                <span className="text-emerald-400">
                  Saved: {result.timing.time_saved.toFixed(1)}s
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
