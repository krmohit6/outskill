import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'
import type { Components } from 'react-markdown'

interface MarkdownRendererProps {
  content: string
  className?: string
}

const components: Components = {
  h1: ({ children }) => <h1 className="text-2xl font-bold mb-4">{children}</h1>,
  h2: ({ children }) => <h2 className="text-xl font-semibold mb-3">{children}</h2>,
  h3: ({ children }) => <h3 className="text-lg font-semibold mb-2">{children}</h3>,
  h4: ({ children }) => <h4 className="text-base font-semibold mb-2">{children}</h4>,
  h5: ({ children }) => <h5 className="text-sm font-semibold mb-1">{children}</h5>,
  h6: ({ children }) => <h6 className="text-xs font-semibold mb-1">{children}</h6>,
  p: ({ children }) => <p className="mb-3 leading-relaxed">{children}</p>,
  a: ({ href, children }) => (
    <a href={href} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  ul: ({ children }) => <ul className="list-disc pl-6 mb-3 space-y-1">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-6 mb-3 space-y-1">{children}</ol>,
  li: ({ children }) => <li className="text-sm">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-primary pl-4 italic text-muted-foreground mb-3">
      {children}
    </blockquote>
  ),
  code: ({ className, children }) => {
    const isBlock = className?.includes('language-')
    if (isBlock) {
      return (
        <code className={cn('block bg-slate-800/50 rounded p-4 text-sm overflow-x-auto mb-3', className)}>
          {children}
        </code>
      )
    }
    return <code className="bg-slate-700 px-1 rounded text-sm">{children}</code>
  },
  pre: ({ children }) => <pre className="mb-3">{children}</pre>,
  table: ({ children }) => (
    <div className="overflow-x-auto mb-3">
      <table className="w-full border-collapse border border-border text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-muted">{children}</thead>,
  th: ({ children }) => <th className="border border-border px-3 py-2 text-left font-semibold">{children}</th>,
  td: ({ children }) => <td className="border border-border px-3 py-2">{children}</td>,
  hr: () => <hr className="border-border my-4" />,
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={cn('prose-invert max-w-none', className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
