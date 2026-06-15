interface GlossaryRow {
  fig: number
  chartType: string
  x: string
  y: string
  note: string
}

interface Props {
  rows: GlossaryRow[]
}

export function ChartGlossary({ rows }: Props) {
  return (
    <section className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-700/60">
      <p className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-6">
        Charts in this study
      </p>
      <div className="space-y-5">
        {rows.map(row => (
          <div key={row.fig} className="grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-0.5">
            <span className="font-mono text-xs text-indigo-500 dark:text-indigo-400 pt-0.5 flex-shrink-0">
              Fig.{row.fig}
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {row.chartType}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">
                <span className="font-mono text-slate-400 dark:text-slate-500">x </span>
                {row.x}
                <span className="mx-2 text-slate-300 dark:text-slate-600">×</span>
                <span className="font-mono text-slate-400 dark:text-slate-500">y </span>
                {row.y}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {row.note}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
