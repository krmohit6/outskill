import { cn } from '@/lib/utils'
import type { BeginnerExample } from '@/types'

interface ExampleChipsProps {
  examples: BeginnerExample[]
  onSelect: (text: string) => void
}

export function ExampleChips({ examples, onSelect }: ExampleChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {examples.map((example) => (
        <button
          key={example.id}
          onClick={() => onSelect(example.text)}
          className={cn(
            'flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors hover:bg-muted',
          )}
        >
          <span
            className={cn(
              'h-2 w-2 rounded-full',
              example.label === 'no_hate_speech' ? 'bg-emerald-400' : 'bg-red-400',
            )}
          />
          <span className="truncate max-w-[200px]">
            {example.text.length > 50 ? example.text.slice(0, 50) + '...' : example.text}
          </span>
        </button>
      ))}
    </div>
  )
}
