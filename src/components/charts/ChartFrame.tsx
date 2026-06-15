import type { ReactNode } from 'react'

interface ChartFrameProps {
  title: string
  question: string
  method?: string
  takeaway: string
  /** Show the "dataset regenerated to match original scale" disclaimer */
  showDataNote?: boolean
  caption?: string
  height?: number
  children: ReactNode
}

/**
 * Narrative wrapper for every chart: Question → Data → Method → Chart → Takeaway.
 * No chart in this portfolio renders without this frame.
 */
export function ChartFrame({
  title,
  question,
  method,
  takeaway,
  showDataNote = false,
  caption,
  height = 320,
  children,
}: ChartFrameProps) {
  return (
    <figure className="my-8">
      {/* Chart title */}
      <figcaption className="mb-3">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">
          {title}
        </h3>
        {/* Question */}
        <p className="text-xs text-slate-500 dark:text-slate-400 italic leading-relaxed">
          <span className="not-italic font-mono text-indigo-500 dark:text-indigo-400 mr-1">
            Q
          </span>
          {question}
        </p>
      </figcaption>

      {/* Chart area */}
      <div
        className="rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 p-4 overflow-hidden"
        style={{ height }}
      >
        {children}
      </div>

      {/* Below-chart narrative */}
      <div className="mt-3 space-y-1.5">
        {/* Takeaway */}
        <p className="text-sm font-medium text-slate-900 dark:text-slate-100 flex items-start gap-1.5">
          <span className="text-indigo-500 dark:text-indigo-400 flex-shrink-0 mt-0.5">↗</span>
          {takeaway}
        </p>

        {/* Method */}
        {method && (
          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-start gap-1.5">
            <span className="font-mono text-slate-400 dark:text-slate-500 flex-shrink-0">M</span>
            {method}
          </p>
        )}

        {/* Caption */}
        {caption && (
          <p className="text-xs text-slate-400 dark:text-slate-500 italic">{caption}</p>
        )}

        {/* Data note */}
        {showDataNote && (
          <p className="text-xs text-amber-700 dark:text-amber-400">
            Dataset regenerated to match the original project's scale; figures are illustrative.
          </p>
        )}
      </div>
    </figure>
  )
}
