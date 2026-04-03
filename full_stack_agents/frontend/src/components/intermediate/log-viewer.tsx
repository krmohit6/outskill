import { cn } from '@/lib/utils'

interface LogViewerProps {
  content: string
  highlightLine?: number
}

const levelColors: Record<string, string> = {
  '[INFO]': 'text-slate-400',
  '[WARNING]': 'text-amber-400',
  '[ERROR]': 'text-red-400',
  '[CRITICAL]': 'text-purple-400',
}

function getLineColor(line: string): string {
  for (const [level, color] of Object.entries(levelColors)) {
    if (line.includes(level)) return color
  }
  return 'text-slate-300'
}

export function LogViewer({ content, highlightLine }: LogViewerProps) {
  const lines = content.split('\n')

  return (
    <div className="bg-slate-950 rounded-lg border border-slate-800 p-4 font-mono text-xs overflow-auto max-h-[400px]">
      {lines.map((line, i) => (
        <div
          key={i}
          className={cn(
            'leading-6',
            highlightLine === i && 'bg-primary/10',
          )}
        >
          <span className="inline-block w-8 text-right text-slate-600 select-none mr-3">
            {i + 1}
          </span>
          <span className={getLineColor(line)}>{line}</span>
        </div>
      ))}
    </div>
  )
}
