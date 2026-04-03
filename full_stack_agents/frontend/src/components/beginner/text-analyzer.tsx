import { Shield, Loader2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

interface TextAnalyzerProps {
  onAnalyze: (text: string) => void
  isLoading: boolean
  disabled?: boolean
  value?: string
  onValueChange?: (value: string) => void
}

export function TextAnalyzer({ onAnalyze, isLoading, disabled, value, onValueChange }: TextAnalyzerProps) {
  const text = value ?? ''

  const handleSubmit = () => {
    if (text.trim()) onAnalyze(text.trim())
  }

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <CardContent className="space-y-4 p-5">
        <Textarea
          rows={5}
          placeholder="Paste or type text to analyze for hate speech..."
          value={text}
          onChange={(e) => onValueChange?.(e.target.value)}
          className="resize-none border-white/[0.06] bg-white/[0.02] font-mono text-sm placeholder:text-muted-foreground/50"
        />
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{text.length} characters</span>
          <Button
            onClick={handleSubmit}
            disabled={!text.trim() || isLoading || disabled}
            className="min-w-[140px]"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Shield className="mr-2 h-4 w-4" />
            )}
            Scan Content
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
