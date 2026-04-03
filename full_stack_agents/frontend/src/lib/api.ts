import type {
  BeginnerExample,
  BeginnerRequest,
  BeginnerResponse,
  LogFile,
  IntermediateRequest,
  PipelineStep,
  AdvancedRequest,
} from '@/types'

const BASE_URL = '/api'

export async function fetchBeginnerExamples(): Promise<BeginnerExample[]> {
  const res = await fetch(`${BASE_URL}/beginner/examples`)
  const data = await res.json()
  return data.examples
}

export async function analyzeText(req: BeginnerRequest): Promise<BeginnerResponse> {
  const res = await fetch(`${BASE_URL}/beginner/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  })
  return res.json()
}

export async function fetchLogs(): Promise<LogFile[]> {
  const res = await fetch(`${BASE_URL}/intermediate/logs`)
  const data = await res.json()
  return data.logs
}

export async function analyzeLogsStream(
  req: IntermediateRequest,
  onStep: (step: PipelineStep) => void,
): Promise<void> {
  const res = await fetch(`${BASE_URL}/intermediate/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  })

  const reader = res.body!.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() ?? ''

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = JSON.parse(line.slice(6))
        onStep(data)
      }
    }
  }
}

export async function analyzeStockStream(
  req: AdvancedRequest,
  onEvent: (data: any) => void,
): Promise<void> {
  const res = await fetch(`${BASE_URL}/advanced/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  })

  const reader = res.body!.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() ?? ''

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = JSON.parse(line.slice(6))
        onEvent(data)
      }
    }
  }
}
