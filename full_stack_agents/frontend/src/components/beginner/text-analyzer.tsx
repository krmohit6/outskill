import { useState } from 'react'
import { Shield, Loader2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

interface TextAnalyzerProps {
  onAnalyze: (text: string) => void
  isLoading: boolean
  disabled?: boolean
}

export function TextAnalyzer({ onAnalyze, isLoading, disabled }: TextAnalyzerProps) {
  const [text, setText] = useState('')

  const handleSubmit = () => {
    if (text.trim()) onAnalyze(text.trim())
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <Textarea
          rows={5}
          placeholder="Paste or type text to analyze for hate speech..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{text.length} characters</span>
          <Button
            onClick={handleSubmit}
            disabled={!text.trim() || isLoading || disabled}
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
